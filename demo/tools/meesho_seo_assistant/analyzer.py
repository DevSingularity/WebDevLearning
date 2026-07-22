from __future__ import annotations

from collections import Counter, defaultdict
from statistics import mean

from .models import KeywordStat, Listing, MyListing
from .text import density, keyword_counter, normalize_text, tokenize

GENERIC_SINGLE_WORDS = {
    "wear",
    "style",
    "stylish",
    "comfortable",
    "soft",
    "elegant",
    "latest",
    "quality",
    "use",
}


class ListingAnalyzer:
    def __init__(self, competitors: list[Listing], my_listing: MyListing) -> None:
        self.competitors = sorted(competitors, key=lambda item: item.rank or 9999)
        self.my_listing = my_listing

    def keyword_stats(self, limit: int = 80) -> list[KeywordStat]:
        total = Counter()
        competitor_presence: dict[str, set[int]] = defaultdict(set)
        rank_positions: dict[str, list[int]] = defaultdict(list)
        field_sources: dict[str, set[str]] = defaultdict(set)

        for listing in self.competitors:
            fields = {
                "title": listing.title,
                "description": listing.description,
                "bullets": " ".join(listing.bullet_points),
                "tags": " ".join(listing.tags + list(listing.attributes.values())),
                "category": listing.category,
            }
            for field_name, text in fields.items():
                counts = keyword_counter(text)
                for keyword, count in counts.items():
                    total[keyword] += count
                    competitor_presence[keyword].add(listing.rank)
                    rank_positions[keyword].append(listing.rank)
                    field_sources[keyword].add(field_name)

        scored_keywords = sorted(
            [keyword for keyword in total if self._useful_keyword(keyword)],
            key=lambda keyword: (
                len(competitor_presence[keyword]),
                total[keyword],
                -mean(rank_positions[keyword]),
                len(keyword.split()),
            ),
            reverse=True,
        )

        stats: list[KeywordStat] = []
        for keyword in scored_keywords[:limit]:
            presence = len(competitor_presence[keyword])
            stats.append(
                KeywordStat(
                    keyword=keyword,
                    frequency=total[keyword],
                    competitor_count=presence,
                    avg_rank=round(mean(rank_positions[keyword]), 2),
                    field_sources=", ".join(sorted(field_sources[keyword])),
                    intent_bucket=self._intent_bucket(presence),
                )
            )
        return stats

    def compare(self, stats: list[KeywordStat]) -> dict[str, object]:
        my_text = self._my_full_text()
        my_tokens = set(tokenize(my_text))
        top_keywords = [item.keyword for item in stats[:30]]
        present = [keyword for keyword in top_keywords if self._keyword_present(keyword, my_text, my_tokens)]
        missing = [keyword for keyword in top_keywords if keyword not in present]
        overused = [
            keyword
            for keyword in present
            if len(keyword.split()) <= 2 and density(my_text, keyword) > 0.065
        ]

        return {
            "present_keywords": present,
            "missing_keywords": missing[:20],
            "overused_keywords": overused[:10],
            "score": self.score(stats, present, missing, overused),
            "title_feedback": self.title_feedback(stats),
            "description_feedback": self.description_feedback(stats),
            "price_feedback": self.price_feedback(),
            "ranking_reasons": self.ranking_reasons(),
            "recommended_title": self.rewrite_title(stats),
            "recommended_description": self.rewrite_description(stats),
            "suggested_tags": self.suggest_tags(stats),
            "long_tail_keywords": self.long_tail_keywords(stats),
        }

    def score(
        self,
        stats: list[KeywordStat],
        present: list[str] | None = None,
        missing: list[str] | None = None,
        overused: list[str] | None = None,
    ) -> int:
        if present is None or missing is None or overused is None:
            comparison = self.compare(stats)
            return int(comparison["score"])

        title = normalize_text(self.my_listing.title)
        description = normalize_text(self.my_listing.description)
        top_15 = [item.keyword for item in stats[:15]]
        title_hits = sum(1 for keyword in top_15[:8] if keyword in title)
        description_hits = sum(1 for keyword in top_15 if keyword in description)
        coverage = len(present) / max(1, len(present) + len(missing))
        length_score = 1.0 if 45 <= len(self.my_listing.title) <= 150 else 0.65
        density_penalty = min(0.2, len(overused) * 0.04)
        score = 100 * (
            0.35 * coverage
            + 0.20 * (title_hits / max(1, min(8, len(top_15))))
            + 0.20 * (description_hits / max(1, len(top_15)))
            + 0.15 * length_score
            + 0.10 * self._commercial_completeness()
            - density_penalty
        )
        return max(0, min(100, round(score)))

    def title_feedback(self, stats: list[KeywordStat]) -> list[str]:
        feedback: list[str] = []
        title = normalize_text(self.my_listing.title)
        if len(self.my_listing.title) < 45:
            feedback.append("Title is short; add material, use case, style, and 1-2 high-evidence keywords.")
        if len(self.my_listing.title) > 150:
            feedback.append("Title is long; remove repeated generic terms and keep the strongest phrase first.")
        for keyword in [item.keyword for item in stats[:8]]:
            if keyword not in title:
                feedback.append(f"Consider adding '{keyword}' if it truthfully describes the product.")
                break
        return feedback or ["Title structure is broadly aligned with competitor keyword patterns."]

    def description_feedback(self, stats: list[KeywordStat]) -> list[str]:
        description = normalize_text(self.my_listing.description)
        feedback: list[str] = []
        if len(description) < 180:
            feedback.append("Description is thin; add fabric/material, fit, occasion, care, package, and benefits.")
        if not self.my_listing.bullet_points:
            feedback.append("Add short bullets for material, pattern, size/fit, occasion, and care.")
        missing = [item.keyword for item in stats[:12] if item.keyword not in description]
        if missing:
            feedback.append(f"Blend in missing competitor terms naturally: {', '.join(missing[:5])}.")
        return feedback

    def price_feedback(self) -> str:
        prices = [listing.price for listing in self.competitors if listing.price]
        if not prices or not self.my_listing.price:
            return "Price comparison unavailable; add your listing price and collect competitor prices."
        avg_price = mean(prices)
        if self.my_listing.price > avg_price * 1.15:
            return f"Your price is above the competitor average of Rs {avg_price:.0f}; justify it with quality, combo value, or offers."
        if self.my_listing.price < avg_price * 0.85:
            return f"Your price is below the competitor average of Rs {avg_price:.0f}; use value terms without looking low quality."
        return f"Your price is close to the competitor average of Rs {avg_price:.0f}."

    def ranking_reasons(self) -> list[str]:
        reasons: list[str] = []
        top = self.competitors[:10]
        if not top:
            return ["No competitor data available yet."]
        avg_rating = mean([item.rating for item in top if item.rating] or [0])
        avg_reviews = mean([item.reviews for item in top if item.reviews] or [0])
        avg_images = mean([item.image_count for item in top if item.image_count] or [0])
        if avg_rating:
            reasons.append(f"Top listings average {avg_rating:.1f} rating, which can support ranking and conversion.")
        if avg_reviews:
            reasons.append(f"Top listings average about {avg_reviews:.0f} reviews/ratings, giving them stronger social proof.")
        if avg_images:
            reasons.append(f"Top detail pages average about {avg_images:.0f} images; richer image sets may improve conversion.")
        category_terms = Counter(tokenize(" ".join(item.category for item in top))).most_common(5)
        if category_terms:
            reasons.append("Frequent category signals: " + ", ".join(term for term, _ in category_terms) + ".")
        return reasons

    def rewrite_title(self, stats: list[KeywordStat]) -> str:
        brand = self.my_listing.brand.strip()
        strongest = [item.keyword.title() for item in stats if len(item.keyword.split()) >= 2][:4]
        base = strongest[:3] or [self.my_listing.title]
        parts = [brand] if brand else []
        parts.extend(base)
        title = " | ".join(dict.fromkeys(part for part in parts if part))
        if len(title) < 45 and self.my_listing.category:
            title = f"{title} for {self.my_listing.category}".strip()
        return title[:150].strip(" |")

    def rewrite_description(self, stats: list[KeywordStat]) -> str:
        keywords = [item.keyword for item in stats if len(item.keyword.split()) >= 2][:8]
        title_subject = self.my_listing.title or "This product"
        material_terms = ", ".join(keywords[:3])
        use_terms = ", ".join(keywords[3:6])
        return (
            f"{title_subject} is designed for shoppers looking for {material_terms}. "
            f"It keeps the copy natural while covering important search terms such as {use_terms}. "
            "Highlight the real fabric, pattern, size/fit, occasion, care instructions, and package contents. "
            "Use the strongest keyword once in the opening line and support it with specific product benefits, "
            "not repeated phrases."
        )

    def suggest_tags(self, stats: list[KeywordStat]) -> list[str]:
        tags = []
        for item in stats:
            if len(tags) >= 12:
                break
            if (
                item.intent_bucket in {"high-volume", "medium-volume"}
                and len(item.keyword) <= 35
                and (len(item.keyword.split()) > 1 or "tags" in item.field_sources or "category" in item.field_sources)
            ):
                tags.append(item.keyword)
        return tags

    def long_tail_keywords(self, stats: list[KeywordStat]) -> list[str]:
        return [
            item.keyword
            for item in stats
            if len(item.keyword.split()) >= 3 and item.intent_bucket in {"medium-volume", "niche"}
        ][:20]

    def _intent_bucket(self, competitor_count: int) -> str:
        competitor_total = max(1, len(self.competitors))
        share = competitor_count / competitor_total
        if share >= 0.45:
            return "high-volume"
        if share >= 0.18:
            return "medium-volume"
        return "niche"

    def _useful_keyword(self, keyword: str) -> bool:
        parts = keyword.split()
        if len(parts) == 1 and keyword in GENERIC_SINGLE_WORDS:
            return False
        if len(parts) > 1 and all(part in GENERIC_SINGLE_WORDS for part in parts):
            return False
        return True

    def _my_full_text(self) -> str:
        return " ".join(
            [
                self.my_listing.title,
                self.my_listing.description,
                " ".join(self.my_listing.bullet_points),
                " ".join(self.my_listing.tags),
                self.my_listing.category,
            ]
        )

    def _keyword_present(self, keyword: str, text: str, tokens: set[str]) -> bool:
        if " " in keyword:
            return keyword in normalize_text(text)
        return keyword in tokens

    def _commercial_completeness(self) -> float:
        signals = [
            bool(self.my_listing.price),
            bool(self.my_listing.category),
            len(self.my_listing.description) >= 180,
            bool(self.my_listing.bullet_points),
            bool(self.my_listing.tags),
        ]
        return sum(signals) / len(signals)

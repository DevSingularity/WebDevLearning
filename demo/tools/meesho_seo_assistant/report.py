from __future__ import annotations

import csv
from pathlib import Path

from .models import KeywordStat, Listing, MyListing


def write_reports(
    out_dir: Path,
    competitors: list[Listing],
    my_listing: MyListing,
    keyword_stats: list[KeywordStat],
    comparison: dict[str, object],
) -> None:
    out_dir.mkdir(parents=True, exist_ok=True)
    write_keyword_csv(out_dir / "keyword_frequency.csv", keyword_stats)
    write_competitor_csv(out_dir / "competitor_summary.csv", competitors)
    (out_dir / "report.md").write_text(
        build_markdown_report(competitors, my_listing, keyword_stats, comparison),
        encoding="utf-8",
    )


def write_keyword_csv(path: Path, stats: list[KeywordStat]) -> None:
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=["keyword", "frequency", "competitor_count", "avg_rank", "field_sources", "intent_bucket"],
        )
        writer.writeheader()
        for item in stats:
            writer.writerow(
                {
                    "keyword": item.keyword,
                    "frequency": item.frequency,
                    "competitor_count": item.competitor_count,
                    "avg_rank": item.avg_rank,
                    "field_sources": item.field_sources,
                    "intent_bucket": item.intent_bucket,
                }
            )


def write_competitor_csv(path: Path, competitors: list[Listing]) -> None:
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=["rank", "title", "price", "rating", "reviews", "image_count", "category", "url"],
        )
        writer.writeheader()
        for item in competitors:
            writer.writerow(
                {
                    "rank": item.rank,
                    "title": item.title,
                    "price": item.price or "",
                    "rating": item.rating or "",
                    "reviews": item.reviews or "",
                    "image_count": item.image_count or "",
                    "category": item.category,
                    "url": item.url,
                }
            )


def build_markdown_report(
    competitors: list[Listing],
    my_listing: MyListing,
    stats: list[KeywordStat],
    comparison: dict[str, object],
) -> str:
    lines = [
        "# Meesho Listing Optimization Report",
        "",
        "## Overall Optimization Score",
        "",
        f"**{comparison['score']}/100**",
        "",
        "## Recommended Optimized Title",
        "",
        str(comparison["recommended_title"]),
        "",
        "## Recommended Optimized Description",
        "",
        str(comparison["recommended_description"]),
        "",
        "## Competitor Keyword Analysis",
        "",
        "| Keyword | Frequency | Competitors | Avg Rank | Sources | Intent |",
        "| --- | ---: | ---: | ---: | --- | --- |",
    ]

    for item in stats[:30]:
        lines.append(
            f"| {item.keyword} | {item.frequency} | {item.competitor_count} | "
            f"{item.avg_rank} | {item.field_sources} | {item.intent_bucket} |"
        )

    lines.extend(
        [
            "",
            "## My Listing vs Competitors",
            "",
            f"Current title: {my_listing.title}",
            "",
            "Missing keywords: " + _comma_list(comparison["missing_keywords"]),
            "",
            "Overused or unnecessary words: " + _comma_list(comparison["overused_keywords"]),
            "",
            "Suggested tags/attributes: " + _comma_list(comparison["suggested_tags"]),
            "",
            "Additional long-tail keywords: " + _comma_list(comparison["long_tail_keywords"]),
            "",
            "## Structure Improvements",
            "",
        ]
    )

    for item in comparison["title_feedback"]:
        lines.append(f"- {item}")
    for item in comparison["description_feedback"]:
        lines.append(f"- {item}")
    lines.append(f"- {comparison['price_feedback']}")

    lines.extend(["", "## Why Competitors May Rank Higher", ""])
    for item in comparison["ranking_reasons"]:
        lines.append(f"- {item}")

    lines.extend(["", "## Top Competitors", ""])
    for listing in competitors[:10]:
        metrics = []
        if listing.price:
            metrics.append(f"Rs {listing.price:.0f}")
        if listing.rating:
            metrics.append(f"{listing.rating:.1f} rating")
        if listing.reviews:
            metrics.append(f"{listing.reviews} reviews")
        lines.append(f"- #{listing.rank}: {listing.title} ({', '.join(metrics) or 'metrics unavailable'})")

    lines.extend(
        [
            "",
            "## Priority Actions",
            "",
            "1. Put the strongest truthful high-frequency phrase near the start of the title.",
            "2. Add missing material, style, occasion, and category terms to the description naturally.",
            "3. Convert repeated words into specific attributes instead of repeating the same keyword.",
            "4. Add or improve images if top competitors show richer image coverage.",
            "5. Review price and offer positioning against the competitor average.",
        ]
    )
    return "\n".join(lines) + "\n"


def _comma_list(value: object) -> str:
    items = list(value) if isinstance(value, list) else []
    return ", ".join(str(item) for item in items) if items else "None found"

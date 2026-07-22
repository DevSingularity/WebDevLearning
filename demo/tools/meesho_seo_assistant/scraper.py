from __future__ import annotations

import re
import time
from dataclasses import dataclass
from urllib.parse import quote_plus, urljoin

from .models import Listing
from .text import parse_count, parse_price, parse_rating


@dataclass(slots=True)
class ScrapeOptions:
    limit: int = 30
    max_pages: int = 2
    delay_seconds: float = 1.5
    headless: bool = True
    include_details: bool = False


class MeeshoScraper:
    base_url = "https://www.meesho.com"

    def __init__(self, options: ScrapeOptions | None = None) -> None:
        self.options = options or ScrapeOptions()

    def search_url(self, term: str) -> str:
        return f"{self.base_url}/search?q={quote_plus(term)}&searchType=manual"

    def scrape_search(self, term: str) -> list[Listing]:
        try:
            from playwright.sync_api import TimeoutError as PlaywrightTimeoutError
            from playwright.sync_api import sync_playwright
        except ImportError as exc:
            raise RuntimeError(
                "Playwright is required for live scraping. Install requirements.txt and run "
                "`python -m playwright install chromium`."
            ) from exc

        listings: list[Listing] = []
        seen_urls: set[str] = set()

        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=self.options.headless)
            context = browser.new_context(
                viewport={"width": 1366, "height": 900},
                user_agent=(
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36"
                ),
            )
            page = context.new_page()

            for page_number in range(1, self.options.max_pages + 1):
                url = self.search_url(term)
                if page_number > 1:
                    url = f"{url}&page={page_number}"

                page.goto(url, wait_until="domcontentloaded", timeout=45_000)
                self._wait_for_dynamic_content(page, PlaywrightTimeoutError)

                for _ in range(4):
                    page.mouse.wheel(0, 900)
                    time.sleep(self.options.delay_seconds)

                for candidate in self._extract_cards(page, term, seen_urls, len(listings)):
                    listings.append(candidate)
                    if len(listings) >= self.options.limit:
                        break

                if len(listings) >= self.options.limit:
                    break
                time.sleep(self.options.delay_seconds)

            if self.options.include_details:
                for listing in listings:
                    self._enrich_detail_page(context, listing)
                    time.sleep(self.options.delay_seconds)

            context.close()
            browser.close()

        return listings

    def _wait_for_dynamic_content(self, page, timeout_error: type[Exception]) -> None:
        selectors = [
            'a[href*="/p/"]',
            '[data-testid*="product"]',
            'div:has-text("₹")',
        ]
        for selector in selectors:
            try:
                page.wait_for_selector(selector, timeout=10_000)
                return
            except timeout_error:
                continue

    def _extract_cards(self, page, term: str, seen_urls: set[str], existing_count: int) -> list[Listing]:
        cards = page.locator('a[href*="/p/"], a[href*="/pl/"]').all()
        listings: list[Listing] = []

        for card in cards:
            try:
                href = card.get_attribute("href") or ""
                url = urljoin(self.base_url, href)
                if not href or url in seen_urls:
                    continue
                text = re.sub(r"\s+", " ", card.inner_text(timeout=2_000)).strip()
            except Exception:
                continue

            title = self._guess_title(text)
            if not title:
                continue

            seen_urls.add(url)
            listings.append(
                Listing(
                    rank=existing_count + len(listings) + 1,
                    title=title,
                    url=url,
                    price=parse_price(text),
                    rating=parse_rating(text),
                    reviews=self._guess_reviews(text),
                    offer_text=self._guess_offer(text),
                    source_search_term=term,
                )
            )

        return listings

    def _enrich_detail_page(self, context, listing: Listing) -> None:
        page = context.new_page()
        try:
            page.goto(listing.url, wait_until="domcontentloaded", timeout=45_000)
            page.wait_for_timeout(2_000)
            text = re.sub(r"\s+", " ", page.locator("body").inner_text(timeout=8_000)).strip()
            listing.description = self._extract_after_heading(
                text, ["Product Details", "Description", "Sold By"], max_chars=900
            )
            listing.category = self._extract_after_heading(text, ["Category", "Catalog Name"], max_chars=120)
            listing.image_count = page.locator("img").count()
            listing.tags = self._extract_tags(text)
            listing.attributes = self._extract_attributes(text)
        except Exception:
            return
        finally:
            page.close()

    def _guess_title(self, text: str) -> str:
        parts = [part.strip() for part in re.split(r"₹|Free Delivery|\d+\.\d+|Reviews?", text) if part.strip()]
        return max(parts, key=len, default="")[:180]

    def _guess_reviews(self, text: str) -> int | None:
        review_match = re.search(r"([0-9][0-9,.]*\s*[km]?)\s*(?:reviews?|ratings?)", text, re.I)
        return parse_count(review_match.group(1)) if review_match else None

    def _guess_offer(self, text: str) -> str:
        offer_match = re.search(r"(free delivery|discount|off|deal|lowest price)[^.₹]{0,80}", text, re.I)
        return offer_match.group(0).strip() if offer_match else ""

    def _extract_after_heading(self, text: str, headings: list[str], max_chars: int) -> str:
        for heading in headings:
            index = text.lower().find(heading.lower())
            if index >= 0:
                return text[index + len(heading) : index + len(heading) + max_chars].strip(" :-")
        return ""

    def _extract_tags(self, text: str) -> list[str]:
        tags: list[str] = []
        for label in ["Fabric", "Pattern", "Color", "Size", "Occasion", "Fit"]:
            match = re.search(rf"{label}\s*[:\-]?\s*([A-Za-z0-9 /&,-]{{2,50}})", text)
            if match:
                tags.append(f"{label}: {match.group(1).strip()}")
        return tags

    def _extract_attributes(self, text: str) -> dict[str, str]:
        attributes: dict[str, str] = {}
        for tag in self._extract_tags(text):
            key, value = tag.split(":", 1)
            attributes[key.strip().lower()] = value.strip()
        return attributes

from __future__ import annotations

import unittest

from tools.meesho_seo_assistant.analyzer import ListingAnalyzer
from tools.meesho_seo_assistant.cli import demo_competitors
from tools.meesho_seo_assistant.models import MyListing


class ListingAnalyzerTest(unittest.TestCase):
    def test_keyword_stats_include_competitor_phrases(self) -> None:
        analyzer = ListingAnalyzer(
            demo_competitors(),
            MyListing(title="Cotton Kurti", description="Simple cotton kurti"),
        )

        stats = analyzer.keyword_stats(limit=20)
        keywords = {item.keyword for item in stats}

        self.assertIn("cotton", keywords)
        self.assertTrue(any("printed" in keyword for keyword in keywords))

    def test_compare_scores_listing_and_recommends_title(self) -> None:
        analyzer = ListingAnalyzer(
            demo_competitors(),
            MyListing(
                title="Printed Cotton Kurti for Women",
                description="Printed cotton kurti for daily wear with comfortable fit and ethnic style.",
                category="Kurtis",
                brand="YourShopName",
                price=399,
            ),
        )

        stats = analyzer.keyword_stats()
        comparison = analyzer.compare(stats)

        self.assertGreater(comparison["score"], 0)
        self.assertIn("YourShopName", comparison["recommended_title"])


if __name__ == "__main__":
    unittest.main()

from __future__ import annotations

import argparse
from pathlib import Path

from .analyzer import ListingAnalyzer
from .models import Listing, MyListing
from .report import write_reports
from .scraper import MeeshoScraper, ScrapeOptions
from .storage import read_csv, write_csv, write_sqlite


def main() -> None:
    parser = argparse.ArgumentParser(description="Meesho competitor SEO assistant")
    subparsers = parser.add_subparsers(dest="command", required=True)

    scrape = subparsers.add_parser("scrape", help="Collect public Meesho search result data")
    scrape.add_argument("term", help="Search term or category")
    scrape.add_argument("--limit", type=int, default=30)
    scrape.add_argument("--max-pages", type=int, default=2)
    scrape.add_argument("--delay", type=float, default=1.5)
    scrape.add_argument("--headful", action="store_true", help="Show the browser while scraping")
    scrape.add_argument("--include-details", action="store_true", help="Open detail pages for descriptions/images")
    scrape.add_argument("--out", type=Path, default=Path("data/meesho_listings.csv"))
    scrape.add_argument("--db", type=Path)

    analyze = subparsers.add_parser("analyze", help="Analyze your listing against competitor CSV data")
    analyze.add_argument("--competitors", type=Path, required=True)
    add_listing_args(analyze)
    analyze.add_argument("--out-dir", type=Path, default=Path("data/meesho_reports"))

    demo = subparsers.add_parser("demo", help="Generate a report from sample competitor data")
    add_listing_args(demo, defaults=True)
    demo.add_argument("--out-dir", type=Path, default=Path("data/meesho_reports"))

    args = parser.parse_args()
    if args.command == "scrape":
        run_scrape(args)
    elif args.command == "analyze":
        run_analyze(args, read_csv(args.competitors))
    elif args.command == "demo":
        run_analyze(args, demo_competitors())


def add_listing_args(parser: argparse.ArgumentParser, defaults: bool = False) -> None:
    parser.add_argument(
        "--my-title",
        default="Women's Cotton Printed Kurti" if defaults else "",
        required=not defaults,
    )
    parser.add_argument(
        "--my-description",
        default="Comfortable printed kurti for casual daily wear." if defaults else "",
        required=not defaults,
    )
    parser.add_argument("--bullet", action="append", default=[])
    parser.add_argument("--tag", action="append", default=[])
    parser.add_argument("--price", type=float)
    parser.add_argument("--category", default="Kurtis" if defaults else "")
    parser.add_argument("--brand", default="YourShopName" if defaults else "")


def run_scrape(args: argparse.Namespace) -> None:
    options = ScrapeOptions(
        limit=args.limit,
        max_pages=args.max_pages,
        delay_seconds=args.delay,
        headless=not args.headful,
        include_details=args.include_details,
    )
    listings = MeeshoScraper(options).scrape_search(args.term)
    write_csv(args.out, listings)
    if args.db:
        write_sqlite(args.db, listings)
    print(f"Collected {len(listings)} listings")
    print(f"CSV: {args.out}")
    if args.db:
        print(f"SQLite: {args.db}")


def run_analyze(args: argparse.Namespace, competitors: list[Listing]) -> None:
    my_listing = MyListing(
        title=args.my_title,
        description=args.my_description,
        bullet_points=args.bullet,
        tags=args.tag,
        price=args.price,
        category=args.category,
        brand=args.brand,
    )
    analyzer = ListingAnalyzer(competitors, my_listing)
    stats = analyzer.keyword_stats()
    comparison = analyzer.compare(stats)
    write_reports(args.out_dir, competitors, my_listing, stats, comparison)
    print(f"SEO score: {comparison['score']}/100")
    print(f"Report: {args.out_dir / 'report.md'}")
    print(f"Keyword CSV: {args.out_dir / 'keyword_frequency.csv'}")


def demo_competitors() -> list[Listing]:
    return [
        Listing(
            rank=1,
            title="Women Cotton Printed Straight Kurti for Daily Wear",
            price=399,
            rating=4.2,
            reviews=1840,
            image_count=7,
            category="Women Kurtis Cotton Kurtas",
            description="Cotton printed straight kurti with comfortable fit for office and daily wear.",
            tags=["cotton", "printed", "straight kurti", "daily wear"],
        ),
        Listing(
            rank=2,
            title="Stylish Rayon Printed Kurta for Women Casual Wear",
            price=349,
            rating=4.0,
            reviews=920,
            image_count=6,
            category="Women Kurtas Casual Wear",
            description="Soft rayon kurta with ethnic print, three quarter sleeves, and relaxed fit.",
            tags=["rayon", "ethnic print", "casual wear"],
        ),
        Listing(
            rank=3,
            title="Anarkali Cotton Kurti for Women Festive and Office Wear",
            price=499,
            rating=4.3,
            reviews=1370,
            image_count=8,
            category="Women Ethnic Wear Kurtis",
            description="Anarkali cotton kurti suitable for festive wear, office wear, and daily use.",
            tags=["anarkali", "cotton kurti", "festive wear"],
        ),
        Listing(
            rank=4,
            title="Printed Straight Kurta with Pant for Women",
            price=599,
            rating=4.1,
            reviews=740,
            image_count=9,
            category="Kurta Sets Women",
            description="Printed straight kurta set with pant, breathable fabric, and elegant ethnic style.",
            tags=["kurta set", "printed", "straight kurta"],
        ),
    ]

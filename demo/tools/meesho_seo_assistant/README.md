# Meesho SEO Assistant

Personal CLI tool for researching Meesho competitor listings and optimizing your own listing copy.

The collector uses browser automation because Meesho does not expose a stable public catalog API for this workflow. Use it gently: keep low page limits, avoid logged-in or private supplier pages unless you are exporting your own data manually, respect Meesho's Terms of Service, and do not bypass CAPTCHAs or access controls.

## Setup

Python 3.10+ is recommended.

```powershell
cd C:\Users\lenovo\Documents\anjaliport\anjali-portfolio
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r tools\meesho_seo_assistant\requirements.txt
python -m playwright install chromium
```

The analysis layer only uses the Python standard library. Playwright is needed only for live collection.

## Quick Start

Analyze built-in demo data:

```powershell
python -m tools.meesho_seo_assistant demo --out-dir data\meesho_reports
```

Collect live competitor data:

```powershell
python -m tools.meesho_seo_assistant scrape "cotton kurti for women" --limit 30 --out data\meesho_listings.csv --db data\meesho_listings.sqlite
```

Analyze your listing against collected competitors:

```powershell
python -m tools.meesho_seo_assistant analyze `
  --competitors data\meesho_listings.csv `
  --my-title "Women's Cotton Printed Kurti" `
  --my-description "Comfortable printed kurti for casual daily wear." `
  --brand "YourShopName" `
  --out-dir data\meesho_reports
```

## What It Produces

- `report.md`: competitor keyword analysis, recommendations, and prioritized actions.
- `keyword_frequency.csv`: keyword frequency and intent bucket.
- `competitor_summary.csv`: pricing, ratings, review counts, images, category signals, and ranking reasons.
- Optional SQLite table `listings` for repeated analysis.

## Design Notes

- `scraper.py`: conservative Playwright collector with pagination/scroll waits and CSS-selector fallbacks.
- `storage.py`: CSV and SQLite persistence.
- `analyzer.py`: keyword extraction, scoring, competitor comparison, and rewrite suggestions.
- `report.py`: Markdown and CSV report output.
- `cli.py`: command-line interface.

The collector is deliberately modular because marketplace pages change often. If Meesho updates its HTML, adjust the selectors in `MeeshoScraper` without touching the analysis pipeline.

from __future__ import annotations

import csv
import sqlite3
from pathlib import Path

from .models import Listing

FIELDNAMES = [
    "rank",
    "title",
    "url",
    "price",
    "original_price",
    "rating",
    "reviews",
    "image_count",
    "category",
    "description",
    "bullet_points",
    "tags",
    "attributes",
    "offer_text",
    "source_search_term",
    "collected_at",
]


def write_csv(path: Path, listings: list[Listing]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=FIELDNAMES)
        writer.writeheader()
        for listing in listings:
            writer.writerow(listing.to_row())


def read_csv(path: Path) -> list[Listing]:
    with path.open("r", newline="", encoding="utf-8") as handle:
        return [Listing.from_row(row) for row in csv.DictReader(handle)]


def write_sqlite(path: Path, listings: list[Listing]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with sqlite3.connect(path) as connection:
        columns = ", ".join(f"{name} TEXT" for name in FIELDNAMES)
        connection.execute(f"CREATE TABLE IF NOT EXISTS listings ({columns})")
        placeholders = ", ".join("?" for _ in FIELDNAMES)
        connection.executemany(
            f"INSERT INTO listings ({', '.join(FIELDNAMES)}) VALUES ({placeholders})",
            [[listing.to_row().get(name, "") for name in FIELDNAMES] for listing in listings],
        )
        connection.commit()

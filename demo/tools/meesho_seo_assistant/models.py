from __future__ import annotations

from dataclasses import asdict, dataclass, field
from datetime import datetime, timezone
from typing import Any


@dataclass(slots=True)
class Listing:
    rank: int
    title: str
    url: str = ""
    price: float | None = None
    original_price: float | None = None
    rating: float | None = None
    reviews: int | None = None
    image_count: int | None = None
    category: str = ""
    description: str = ""
    bullet_points: list[str] = field(default_factory=list)
    tags: list[str] = field(default_factory=list)
    attributes: dict[str, str] = field(default_factory=dict)
    offer_text: str = ""
    source_search_term: str = ""
    collected_at: str = field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat(timespec="seconds")
    )

    def to_row(self) -> dict[str, Any]:
        row = asdict(self)
        row["bullet_points"] = "|".join(self.bullet_points)
        row["tags"] = "|".join(self.tags)
        row["attributes"] = ";".join(f"{key}={value}" for key, value in self.attributes.items())
        return row

    @classmethod
    def from_row(cls, row: dict[str, Any]) -> "Listing":
        def number(value: Any, cast: type) -> Any:
            if value in ("", None):
                return None
            try:
                return cast(value)
            except (TypeError, ValueError):
                return None

        attributes: dict[str, str] = {}
        for item in str(row.get("attributes", "")).split(";"):
            if "=" in item:
                key, value = item.split("=", 1)
                attributes[key] = value

        return cls(
            rank=int(row.get("rank") or 0),
            title=str(row.get("title") or ""),
            url=str(row.get("url") or ""),
            price=number(row.get("price"), float),
            original_price=number(row.get("original_price"), float),
            rating=number(row.get("rating"), float),
            reviews=number(row.get("reviews"), int),
            image_count=number(row.get("image_count"), int),
            category=str(row.get("category") or ""),
            description=str(row.get("description") or ""),
            bullet_points=[x for x in str(row.get("bullet_points") or "").split("|") if x],
            tags=[x for x in str(row.get("tags") or "").split("|") if x],
            attributes=attributes,
            offer_text=str(row.get("offer_text") or ""),
            source_search_term=str(row.get("source_search_term") or ""),
            collected_at=str(row.get("collected_at") or ""),
        )


@dataclass(slots=True)
class MyListing:
    title: str
    description: str
    bullet_points: list[str] = field(default_factory=list)
    tags: list[str] = field(default_factory=list)
    price: float | None = None
    category: str = ""
    brand: str = ""


@dataclass(slots=True)
class KeywordStat:
    keyword: str
    frequency: int
    competitor_count: int
    avg_rank: float
    field_sources: str
    intent_bucket: str

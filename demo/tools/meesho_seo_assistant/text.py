from __future__ import annotations

import re
from collections import Counter

STOPWORDS = {
    "a",
    "an",
    "and",
    "are",
    "as",
    "at",
    "be",
    "by",
    "for",
    "from",
    "in",
    "is",
    "it",
    "of",
    "on",
    "or",
    "the",
    "this",
    "to",
    "with",
    "your",
    "new",
    "latest",
    "best",
    "combo",
    "pack",
    "set",
    "pcs",
    "piece",
    "pieces",
    "women",
    "woman",
    "mens",
    "men",
    "girls",
    "boys",
    "product",
    "online",
    "buy",
}

TOKEN_PATTERN = re.compile(r"[a-z0-9]+(?:'[a-z]+)?")
PRICE_PATTERN = re.compile(r"(?:₹|rs\.?|inr)\s*([0-9][0-9,]*(?:\.[0-9]+)?)", re.I)
RATING_PATTERN = re.compile(r"\b([1-5](?:\.[0-9])?)\s*(?:star|rating|★)?\b", re.I)
COUNT_PATTERN = re.compile(r"\b([0-9][0-9,.]*)(k|m)?\b", re.I)


def normalize_text(value: str) -> str:
    return re.sub(r"\s+", " ", value or "").strip().lower()


def tokenize(value: str) -> list[str]:
    tokens = TOKEN_PATTERN.findall(normalize_text(value))
    return [token for token in tokens if len(token) > 2 and token not in STOPWORDS]


def ngrams(tokens: list[str], min_n: int = 1, max_n: int = 3) -> list[str]:
    phrases: list[str] = []
    for size in range(min_n, max_n + 1):
        for index in range(0, max(0, len(tokens) - size + 1)):
            chunk = tokens[index : index + size]
            if any(part in STOPWORDS for part in chunk):
                continue
            phrases.append(" ".join(chunk))
    return phrases


def keyword_counter(value: str, min_n: int = 1, max_n: int = 3) -> Counter[str]:
    return Counter(ngrams(tokenize(value), min_n=min_n, max_n=max_n))


def parse_price(value: str) -> float | None:
    match = PRICE_PATTERN.search(value or "")
    if not match:
        return None
    return float(match.group(1).replace(",", ""))


def parse_rating(value: str) -> float | None:
    candidates = [float(match.group(1)) for match in RATING_PATTERN.finditer(value or "")]
    valid = [candidate for candidate in candidates if 1 <= candidate <= 5]
    return valid[0] if valid else None


def parse_count(value: str) -> int | None:
    match = COUNT_PATTERN.search(value or "")
    if not match:
        return None
    amount = float(match.group(1).replace(",", ""))
    suffix = (match.group(2) or "").lower()
    if suffix == "k":
        amount *= 1_000
    elif suffix == "m":
        amount *= 1_000_000
    return int(amount)


def density(text: str, keyword: str) -> float:
    tokens = tokenize(text)
    if not tokens:
        return 0.0
    keyword_tokens = keyword.split()
    if not keyword_tokens:
        return 0.0
    phrase_count = 0
    for index in range(0, len(tokens) - len(keyword_tokens) + 1):
        if tokens[index : index + len(keyword_tokens)] == keyword_tokens:
            phrase_count += 1
    return phrase_count / max(1, len(tokens))

"""Financial figure protection.

The whole product depends on this module being conservative. Phase 2 computes an
affordability verdict from the real EMI, rent, deposit and interest rate in the
document. If redaction eats those numbers, the verdict is impossible — this is
the exact bug found in one of the audited reference projects.

So the rule here is: **an amount is protected unless we are confident it is the
user's own income.** Protection is the default; tokenisation is the exception.

`protected_spans` marks every figure that must survive redaction untouched.
`income_spans` marks the narrow case the brief allows us to tokenise: an amount
sitting next to a salary/CTC/gross-income keyword.
"""

from __future__ import annotations

import re
from dataclasses import dataclass

# An amount: optional currency mark, then Indian- or Western-grouped digits.
# Matches "Rs. 8,50,000/-", "₹34,000", "$1,200.50", "20,140", "14.75".
_AMOUNT = re.compile(
    r"""
    (?<![\d.,])                          # never start inside a longer number
    (?:(?:₹|Rs\.?|INR|USD|\$)\s*)?       # optional currency mark
    (?:
        \d{1,3}(?:,\d{2,3})+            # grouped: 8,50,000 / 1,200
      | \d{1,7}                          # or a plain run, capped below
    )
    (?:\.\d{1,2})?                       # optional paise
    (?:\s*/-)?                           # the Indian "/-" suffix
    (?!\d)                               # never end inside a longer number
    """,
    re.VERBOSE | re.IGNORECASE,
)

# The plain-run cap above is deliberate. A ten-digit mobile or a twelve-digit
# Aadhaar must never parse as an amount, or the financial guard would protect
# the very identifiers we are trying to redact.

# A percentage: "14.75%", "3 %", "1.5%".
_PERCENT = re.compile(r"\d{1,3}(?:\.\d+)?\s*%")

# An amount written in words: "Rupees Eight Lakh Fifty Thousand only".
_WORDED_AMOUNT = re.compile(
    r"Rupees[\w\s]{0,80}?only",
    re.IGNORECASE,
)

# Keywords that mean "this money belongs to the contract" — never tokenise.
_CONTRACT_MONEY = (
    "emi", "instalment", "installment", "equated monthly",
    "rent", "licence fee", "license fee", "lease",
    "deposit", "security deposit", "advance",
    "loan", "principal", "outstanding", "disbursement", "sanction",
    "interest", "rate of interest", "penal", "penalty", "default",
    "fee", "charge", "charges", "processing", "prepayment",
    "maintenance", "society", "electricity", "water", "tax", "taxes",
    "damages", "margin", "amount", "sum", "cost", "price", "value",
)

# Keywords that mean "this is the user's own income" — tokenisation allowed.
_INCOME_MONEY = (
    "salary", "ctc", "cost to company",
    "gross pay", "gross salary", "net salary", "basic pay",
    "take home", "take-home", "in-hand", "in hand",
    "monthly income", "annual income", "net income", "gross income",
    "remuneration", "emoluments", "wages", "stipend", "earnings",
)

# How far from a keyword an amount can sit and still be governed by it.
_WINDOW = 70


@dataclass(frozen=True)
class Span:
    start: int
    end: int

    def overlaps(self, start: int, end: int) -> bool:
        return start < self.end and end > self.start


def _keyword_positions(text: str, keywords: tuple[str, ...]) -> list[tuple[int, int]]:
    lowered = text.lower()
    found: list[tuple[int, int]] = []
    for keyword in keywords:
        start = lowered.find(keyword)
        while start != -1:
            found.append((start, start + len(keyword)))
            start = lowered.find(keyword, start + 1)
    return found


def _distance(amount_start: int, amount_end: int, keyword: tuple[int, int]) -> int:
    k_start, k_end = keyword
    if k_end <= amount_start:
        return amount_start - k_end
    if k_start >= amount_end:
        return k_start - amount_end
    return 0


def _nearest(amount: re.Match[str], keywords: list[tuple[int, int]]) -> int | None:
    """Distance to the closest keyword within the window, or None."""
    best: int | None = None
    for keyword in keywords:
        gap = _distance(amount.start(), amount.end(), keyword)
        if gap <= _WINDOW and (best is None or gap < best):
            best = gap
    return best


def _amount_matches(text: str) -> list[re.Match[str]]:
    matches = []
    for match in _AMOUNT.finditer(text):
        # Skip bare fragments the regex can produce on stray punctuation.
        if not any(char.isdigit() for char in match.group()):
            continue
        matches.append(match)
    return matches


def _looks_like_money(value: str) -> bool:
    """True when the text is formatted like an amount, not a bare number."""
    lowered = value.lower()
    has_currency = any(mark in lowered for mark in ("₹", "rs", "inr", "usd", "$"))
    return has_currency or "," in value


def income_spans(text: str) -> list[Span]:
    """Amounts that clearly belong to the user's income.

    An amount qualifies only when an income keyword is within the window AND is
    strictly closer than any contract-money keyword. Ties go to protection.
    """
    income_keywords = _keyword_positions(text, _INCOME_MONEY)
    if not income_keywords:
        return []
    contract_keywords = _keyword_positions(text, _CONTRACT_MONEY)

    spans: list[Span] = []
    for amount in _amount_matches(text):
        income_gap = _nearest(amount, income_keywords)
        if income_gap is None:
            continue
        contract_gap = _nearest(amount, contract_keywords)
        if contract_gap is not None and contract_gap <= income_gap:
            continue  # ambiguous — protect it
        if not _looks_like_money(amount.group()):
            # A bare digit run near the word "salary" is not a salary. Requiring
            # money formatting stops reference numbers being tokenised as income.
            continue
        spans.append(Span(amount.start(), amount.end()))
    return spans


def protected_spans(text: str) -> list[Span]:
    """Every figure that must survive redaction untouched.

    Currency amounts, percentages and amounts written in words, minus the
    narrow set of income amounts we are allowed to tokenise.
    """
    income = income_spans(text)

    spans: list[Span] = []
    for pattern in (_AMOUNT, _PERCENT, _WORDED_AMOUNT):
        for match in pattern.finditer(text):
            if not any(char.isdigit() for char in match.group()) and pattern is not _WORDED_AMOUNT:
                continue
            if any(item.overlaps(match.start(), match.end()) for item in income):
                continue
            spans.append(Span(match.start(), match.end()))
    return spans


def is_protected(start: int, end: int, spans: list[Span]) -> bool:
    return any(span.overlaps(start, end) for span in spans)

"""Deterministic party-name extraction from document structure.

Statistical NER is unreliable on regional Indian names — it caught
"Namashivayam" in one sentence, called it a location in the next, and missed it
entirely in the signature block. Tuning the model does not fix that.

Legal documents do not rely on a model to say who the parties are: they name
them in fixed structural phrases. "Mr. X S/O Y", "... (hereinafter referred to
as the LANDLORD)", "LANDLORD: X", "IN WITNESS WHEREOF X and Y". Those phrases
are the signal, and matching them is deterministic.

Discovering a name once is enough. Every occurrence of it in the document is
then redacted by exact string match, which is what closes the leak in the
signature block and the witness line.

This pass runs alongside NER, not instead of it.
"""

from __future__ import annotations

import re
from dataclasses import dataclass

# Honorifics that reliably precede a person's name in Indian legal documents.
_TITLE = r"(?:Mr|Mrs|Ms|Dr|Shri|Sri|Smt|Thiru|Tmt|Selvi|Kumari)\.?\s+"

# One capitalised name word. Allows ALL-CAPS, hyphens and apostrophes.
_WORD = r"[A-Z][A-Za-z'\-]+"

# A name is one to five such words.
_NAME = rf"{_WORD}(?:\s+{_WORD}){{0,4}}"

# Relationship markers. In Indian documents both sides are people.
_RELATION = r"(?:S/O|W/O|D/O|C/O|S/o|W/o|D/o|s/o|w/o|d/o|Son\s+of|Wife\s+of|Daughter\s+of)"

# Party roles as they appear as labels in signature blocks.
_ROLE_LABEL = (
    r"(?:LANDLORD|TENANT|LESSOR|LESSEE|LICENSOR|LICENSEE|OWNER|"
    r"BORROWER|LENDER|GUARANTOR|SURETY|EMPLOYER|EMPLOYEE|WITNESS(?:ES)?|PARTY)"
)

# Words that are never part of a person's name. A false positive here would be
# propagated across the whole document by exact match, so this list is
# deliberately broad and the extractor is deliberately timid.
NOT_A_NAME = frozenset(
    {
        # Roles — these must never be redacted, only the names attached to them.
        "landlord", "tenant", "lessor", "lessee", "licensor", "licensee",
        "borrower", "lender", "guarantor", "surety", "owner", "occupant",
        "employer", "employee", "party", "parties", "witness", "witnesses",
        "purchaser", "vendor", "seller", "buyer", "mortgagor", "mortgagee",
        # Document furniture.
        "agreement", "rental", "lease", "deed", "schedule", "clause", "section",
        "annexure", "whereof", "whereas", "witnesseth", "part", "one", "other",
        "this", "that", "the", "and", "between", "among", "hereinafter",
        "herein", "referred", "called", "known", "aged", "years", "residing",
        "resident", "address", "premises", "property", "rent", "deposit",
        "term", "tenancy", "maintenance", "particulars", "rupees", "only",
        "licence", "license", "leave", "executed", "made", "dated", "hereunder",
        "hereto", "thereof", "witnesseth", "recitals", "loan", "sanction",
        "sample", "document", "testing", "real", "not", "for",
        # Address furniture.
        "old", "new", "street", "road", "nagar", "colony", "layout", "cross",
        "main", "floor", "flat", "door", "plot", "survey", "village", "taluk",
        "district", "state", "india", "pin", "post",
        # Identifier labels.
        "pan", "aadhaar", "aadhar", "mobile", "phone", "email", "bank", "ifsc",
        "gstin", "account", "branch", "card", "number",
    }
)

# Words that may appear inside an organisation's name but never make a name by
# themselves. A lender is usually a company, and "Meridian Finance Private
# Limited" must be captured whole rather than trimmed down to "Meridian".
ORG_WORDS = frozenset(
    {
        "private", "limited", "company", "ltd", "pvt", "llp", "corporation",
        "bank", "finance", "financial", "services", "enterprises", "associates",
        "estates", "properties", "ventures", "holdings", "solutions",
    }
)


@dataclass(frozen=True)
class PartySpan:
    start: int
    end: int
    name: str


def _clean(candidate: str) -> str | None:
    """Trim a raw capture to a plausible person name, or reject it."""
    text = candidate.strip().strip(",.;:'\"()").strip()
    if not text:
        return None

    tokens = text.split()
    # Drop leading and trailing tokens that cannot be part of a name.
    while tokens and tokens[0].lower().strip(".,") in NOT_A_NAME:
        tokens.pop(0)
    while tokens and tokens[-1].lower().strip(".,") in NOT_A_NAME:
        tokens.pop()
    if not tokens:
        return None

    # Any remaining disallowed token means we mis-parsed; reject rather than guess.
    if any(token.lower().strip(".,") in NOT_A_NAME for token in tokens):
        return None
    # "Private Limited" on its own is not a party.
    if all(token.lower().strip(".,") in ORG_WORDS for token in tokens):
        return None
    # A bare initial is not a name.
    if all(len(token.strip(".")) < 2 for token in tokens):
        return None
    if len(tokens) > 5:
        return None

    return " ".join(tokens)


def _capture(text: str, pattern: str, groups: tuple[int, ...]) -> list[str]:
    found: list[str] = []
    for match in re.finditer(pattern, text):
        for group in groups:
            try:
                raw = match.group(group)
            except (IndexError, error_types):  # pragma: no cover - defensive
                continue
            if not raw:
                continue
            cleaned = _clean(raw)
            if cleaned:
                found.append(cleaned)
    return found


error_types = re.error


def extract_party_names(text: str) -> list[str]:
    """Every distinct person name the document structurally identifies."""
    names: list[str] = []

    # "Namashivayam S/O Krishnan" — both sides are people.
    names += _capture(text, rf"({_NAME})\s*,?\s*{_RELATION}\s*\.?\s*({_NAME})", (1, 2))

    # "Mr. Namashivayam", "Smt. Thenmalar"
    names += _capture(text, rf"{_TITLE}({_NAME})", (1,))

    # "LANDLORD: Namashivayam", "TENANT - Thenmalar", "Borrower Name: X"
    names += _capture(
        text,
        rf"(?i:{_ROLE_LABEL})(?:\s+(?:Name|Signature))?\s*[:\-–]\s*({_NAME})",
        (1,),
    )

    # "IN WITNESS WHEREOF Namashivayam and Thenmalar have signed"
    names += _capture(
        text, rf"WITNESS\s+WHEREOF\s+({_NAME})(?:\s+and\s+({_NAME}))?", (1, 2)
    )

    # "between X ... (hereinafter" and "and Y ... (hereinafter"
    names += _capture(
        text,
        rf"(?:between|among|and)\s+(?:{_TITLE})?({_NAME})[^()]{{0,220}}?\(\s*herein",
        (1,),
    )

    # "between X and Y" where the parties are named directly.
    names += _capture(text, rf"(?:between|among)\s+(?:{_TITLE})?({_NAME})", (1,))

    # An organisation named as a party: "M/s Acme Estates Private Limited".
    names += _capture(text, rf"M/s\.?\s+({_NAME})", (1,))

    # Deduplicate, longest first so "Namashivayam Krishnan" is matched before
    # "Namashivayam" when both were discovered.
    unique = sorted(set(names), key=lambda value: (-len(value), value))
    return unique


def find_party_spans(text: str, known_names: list[str] | None = None) -> list[PartySpan]:
    """Locate every occurrence of every structurally identified party name.

    Finding a name once is enough; this is what redacts it everywhere else,
    including the signature block that NER never sees as a name.

    `known_names` are names supplied by the caller — in practice the signed-in
    user's own name from their account profile. They are treated exactly like a
    structurally discovered party: matched literally, everywhere. This closes the
    gap where a statistical model fails to recognise the user's own name.
    """
    spans: list[PartySpan] = []
    taken: list[tuple[int, int]] = []

    candidates = list(extract_party_names(text))
    for supplied in known_names or []:
        cleaned = (supplied or "").strip()
        # One-character "names" would match half the document.
        if len(cleaned) > 1 and cleaned not in candidates:
            candidates.append(cleaned)
    # Longest first, so a full name wins over either of its halves.
    candidates.sort(key=lambda value: (-len(value), value))

    for name in candidates:
        # Word-bounded exact match, so "Ram" does not match inside "Ramesh".
        pattern = re.compile(rf"(?<![A-Za-z]){re.escape(name)}(?![A-Za-z])")
        for match in pattern.finditer(text):
            start, end = match.start(), match.end()
            if any(start < t_end and end > t_start for t_start, t_end in taken):
                continue  # already covered by a longer name
            taken.append((start, end))
            spans.append(PartySpan(start=start, end=end, name=name))

    return sorted(spans, key=lambda span: span.start)

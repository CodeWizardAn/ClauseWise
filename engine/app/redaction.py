"""Reversible PII redaction.

The contract with the rest of the system:

  * Personal identifiers are replaced with numbered placeholders — [PAN_1],
    [NAME_2] — before the text leaves this process.
  * The mapping from placeholder back to the real value is returned separately
    and stays server-side. It is never part of what the browser receives.
  * Financial figures survive untouched. See financial.py; Phase 2's
    affordability engine is built directly on the numbers this step preserves.

Precedence matters and is easy to get backwards. A PAN contains four digits, so
the financial guard would happily call "1234" an amount and protect the PAN from
redaction. Structurally validated identifiers therefore outrank the guard: if a
span passed a Verhoeff or holder-type check, it is an identifier, not money.
"""

from __future__ import annotations

import os
import re
from dataclasses import dataclass, field
from functools import lru_cache

from presidio_analyzer import AnalyzerEngine, RecognizerResult
from presidio_analyzer.nlp_engine import NlpEngineProvider
from presidio_anonymizer import AnonymizerEngine
from presidio_anonymizer.entities import OperatorConfig

from .financial import Span, income_spans, is_protected, protected_spans
from .parties import NOT_A_NAME, find_party_spans
from .recognizers import indian_recognizers

DEFAULT_SPACY_MODEL = "en_core_web_md"

# Entity type -> the label used in the placeholder and the privacy log.
ENTITY_LABELS: dict[str, str] = {
    "IN_PAN": "PAN",
    "IN_AADHAAR": "AADHAAR",
    "IN_IFSC": "IFSC",
    "IN_GSTIN": "GSTIN",
    "IN_MOBILE": "PHONE",
    "EMAIL_ADDRESS": "EMAIL",
    # Structurally identified parties share the NAME label and its numbering
    # with NER-detected people, so one person never gets two placeholders.
    "IN_PARTY": "NAME",
    "PERSON": "NAME",
    "LOCATION": "LOCATION",
    "IN_INCOME": "INCOME",
}

# Identifiers with a structural check behind them. These beat the financial
# guard, because a validated PAN or Aadhaar cannot also be an amount.
# IN_PARTY belongs here: a name taken from "Mr. X S/O Y" or a signature block is
# structurally identified, not guessed, so the financial guard must not override
# it any more than it overrides a checksum-validated Aadhaar.
VALIDATED_ENTITIES = frozenset(
    {"IN_PAN", "IN_AADHAAR", "IN_IFSC", "IN_GSTIN", "IN_MOBILE", "IN_PARTY"}
)

# What we ask Presidio for. DATE_TIME and ORGANIZATION are deliberately absent:
# tenure dates and the lender's name are contract terms the later phases need,
# not personal identifiers.
REQUESTED_ENTITIES = [
    "IN_PAN",
    "IN_AADHAAR",
    "IN_IFSC",
    "IN_GSTIN",
    "IN_MOBILE",
    "EMAIL_ADDRESS",
    "PERSON",
    "LOCATION",
]

MIN_SCORE = 0.4

# spaCy reliably tags the capitalised role words in a contract as people.
# "the Borrower shall repay" must not become "[NAME_1] shall repay" — that is a
# false positive that damages the document without protecting anybody.
LEGAL_ROLE_WORDS = frozenset(
    {
        "borrower", "co-borrower", "lender", "licensor", "licensee",
        "tenant", "landlord", "guarantor", "surety", "obligor",
        "mortgagor", "mortgagee", "lessor", "lessee",
        "purchaser", "vendor", "seller", "buyer", "owner", "occupant",
        "employer", "employee", "applicant", "witness",
        "party", "parties", "principal", "agent",
        "assignor", "assignee", "transferor", "transferee",
    }
)


_TOKEN_RE = re.compile(r"\S+")


def _trim_non_name_edges(text: str, start: int, end: int) -> tuple[int, int] | None:
    """Shrink a PERSON span until it holds only name-like words.

    spaCy returns spans such as "Landlord PAN" as people. Trimming is not
    cosmetic: a role word inside a redacted span means the role itself
    disappears from the document, which the brief forbids outright.
    """
    fragment = text[start:end]
    tokens = [(m.start(), m.end(), m.group()) for m in _TOKEN_RE.finditer(fragment)]
    low, high = 0, len(tokens)

    def disallowed(token: str) -> bool:
        return token.strip(".,:;\"'()").lower() in NOT_A_NAME

    while low < high and disallowed(tokens[low][2]):
        low += 1
    while high > low and disallowed(tokens[high - 1][2]):
        high -= 1
    if low >= high:
        return None
    return start + tokens[low][0], start + tokens[high - 1][1]


def _is_role_word(value: str) -> bool:
    cleaned = value.strip().strip('"\'').lower()
    for prefix in ("the ", "said ", "such "):
        if cleaned.startswith(prefix):
            cleaned = cleaned[len(prefix):]
    return cleaned in LEGAL_ROLE_WORDS


@dataclass
class RedactionResult:
    redacted_text: str
    """placeholder -> original value. Server-side only. Never serialise to a client."""
    mapping: dict[str, str] = field(default_factory=dict)
    """label -> how many distinct items of that type were redacted."""
    counts: dict[str, int] = field(default_factory=dict)
    total: int = 0


@lru_cache(maxsize=1)
def _analyzer() -> AnalyzerEngine:
    """Build the analyzer once; loading the spaCy model is expensive."""
    model = os.environ.get("SPACY_MODEL", DEFAULT_SPACY_MODEL)
    provider = NlpEngineProvider(
        nlp_configuration={
            "nlp_engine_name": "spacy",
            "models": [{"lang_code": "en", "model_name": model}],
        }
    )
    engine = AnalyzerEngine(nlp_engine=provider.create_engine(), supported_languages=["en"])
    for recognizer in indian_recognizers():
        engine.registry.add_recognizer(recognizer)
    return engine


@lru_cache(maxsize=1)
def _anonymizer() -> AnonymizerEngine:
    return AnonymizerEngine()


def warm_up() -> None:
    """Load the models ahead of the first request."""
    _analyzer()
    _anonymizer()


def _income_results(text: str, identifiers: list[RecognizerResult]) -> list[RecognizerResult]:
    """Income amounts, minus anything that is really an identifier.

    A spaced Aadhaar looks like three small numbers; without this subtraction
    those groups would be tokenised as income instead of redacted as an Aadhaar.
    """
    identifier_spans = [Span(item.start, item.end) for item in identifiers]
    results = []
    for span in income_spans(text):
        if is_protected(span.start, span.end, identifier_spans):
            continue
        results.append(
            RecognizerResult(entity_type="IN_INCOME", start=span.start, end=span.end, score=0.8)
        )
    return results


# --- NER span expansion -------------------------------------------------------
#
# spaCy frequently tags only part of a multi-word name or address: "Yash Jaiswal"
# comes back as just "Yash", leaving the surname in the text, and "Thane,
# Maharashtra 421302" comes back as just "Thane". Redacting half an identifier is
# barely better than redacting none of it, so we widen PERSON and LOCATION spans
# across the tokens immediately around them.
#
# Expansion is deliberately timid. It never crosses a line break or a full stop,
# never absorbs a legal role word, and never touches a financial figure or a
# validated identifier — those are passed in as blocked spans.

# Capitalised words that begin sentences or name document furniture. Expanding
# across these would swallow ordinary prose.
_EXPANSION_STOPWORDS = frozenset(
    {
        "a", "an", "and", "any", "all", "are", "as", "at", "be", "been", "but",
        "by", "each", "every", "for", "from", "he", "her", "his", "i", "if",
        "in", "is", "it", "its", "may", "must", "no", "not", "of", "on", "or",
        "said", "shall", "she", "such", "that", "the", "their", "these", "they",
        "this", "those", "to", "was", "we", "were", "will", "with",
        "agreement", "annexure", "clause", "schedule", "section", "deed",
        "residing", "resident", "situated", "address", "rs", "inr", "dated",
    }
)

_WORD_LEFT = re.compile(r"([A-Za-z][A-Za-z'\-]*)$")
_WORD_RIGHT = re.compile(r"^([A-Za-z][A-Za-z'\-]*)")
# An Indian PIN code: six digits, never starting with zero.
_PIN_LEFT = re.compile(r"([1-9]\d{5})$")
_PIN_RIGHT = re.compile(r"^([1-9]\d{5})")

# Separators we may cross. No full stops (they end sentences) and no newlines.
_SEP_LEFT = re.compile(r"[ \t]*,?[ \t]*$")
_SEP_RIGHT = re.compile(r"^[ \t]*,?[ \t]*")

# How many tokens we will absorb on each side before giving up.
_MAX_EXPANSION_TOKENS = 6


def _token_allowed(
    token: str, entity_type: str, comma_crossed: bool, leftwards: bool
) -> bool:
    """Whether `token` may be absorbed into a span of `entity_type`."""
    lowered = token.lower()
    if lowered in _EXPANSION_STOPWORDS:
        return False
    if lowered in LEGAL_ROLE_WORDS:
        # The guardrail that matters most: "Borrower", "Lender", "Party" and
        # friends must never end up inside a redacted span.
        return False
    if token.isupper() and len(token) >= 3:
        # An all-caps run is a heading ("RENTAL AGREEMENT"), not a name.
        return False
    if token[:1].isupper():
        return True
    # A lower-case token is only plausible as part of an address, and only when
    # it sits in a comma-separated list to the LEFT of the place we matched
    # ("Flat 12, panvel, Thane"). To the right, a comma followed by a lower-case
    # word is ordinary prose — "Mumbai 400069, undertakes the obligations".
    return entity_type == "LOCATION" and comma_crossed and leftwards


def _pin_is_free(start: int, end: int, money: list[Span]) -> bool:
    """Whether a six-digit PIN candidate is safe to absorb.

    The financial guard matches any bare six-digit run, so a PIN code looks like
    an amount to it. A PIN adjacent to a place name is a PIN — but only when the
    protected span is exactly those six digits. If the span reaches wider (as it
    would for "Rs. 421302") this is real money and must stay.
    """
    for span in money:
        if span.overlaps(start, end) and (span.start != start or span.end != end):
            return False
    return True


def _expand_one(
    text: str,
    item: RecognizerResult,
    identifiers: list[Span],
    money: list[Span],
) -> tuple[int, int]:
    blocked = identifiers + money
    start, end = item.start, item.end

    for _ in range(_MAX_EXPANSION_TOKENS):
        head = text[:start]
        separator = _SEP_LEFT.search(head)
        if not separator:
            break
        gap = separator.group()
        if "\n" in gap:
            break
        candidate_end = start - len(gap)
        word = _WORD_LEFT.search(text[:candidate_end])
        pin = _PIN_LEFT.search(text[:candidate_end]) if item.entity_type == "LOCATION" else None
        match = word or pin
        if not match:
            break
        token = match.group(1)
        if word and not _token_allowed(token, item.entity_type, "," in gap, True):
            break
        new_start = candidate_end - len(token)
        if word:
            if is_protected(new_start, candidate_end, blocked):
                break
        else:
            if is_protected(new_start, candidate_end, identifiers):
                break
            if not _pin_is_free(new_start, candidate_end, money):
                break
        start = new_start

    for _ in range(_MAX_EXPANSION_TOKENS):
        tail = text[end:]
        separator = _SEP_RIGHT.match(tail)
        gap = separator.group() if separator else ""
        if "\n" in gap:
            break
        candidate_start = end + len(gap)
        rest = text[candidate_start:]
        word = _WORD_RIGHT.match(rest)
        pin = _PIN_RIGHT.match(rest) if item.entity_type == "LOCATION" else None
        match = word or pin
        if not match:
            break
        token = match.group(1)
        if word and not _token_allowed(token, item.entity_type, "," in gap, False):
            break
        new_end = candidate_start + len(token)
        if word:
            if is_protected(candidate_start, new_end, blocked):
                break
        else:
            if is_protected(candidate_start, new_end, identifiers):
                break
            if not _pin_is_free(candidate_start, new_end, money):
                break
        end = new_end

    return start, end


def _merge_adjacent(results: list[RecognizerResult]) -> list[RecognizerResult]:
    """Join same-type spans separated only by a comma or a space.

    Turns "[LOCATION_1], [LOCATION_2]" into one location rather than two
    fragments of the same address.
    """
    ordered = sorted(results, key=lambda item: item.start)
    merged: list[RecognizerResult] = []
    for item in ordered:
        if merged:
            previous = merged[-1]
            if (
                previous.entity_type == item.entity_type
                and item.entity_type in _EXPANDABLE
                and 0 <= item.start - previous.end <= 2
            ):
                merged[-1] = RecognizerResult(
                    entity_type=item.entity_type,
                    start=previous.start,
                    end=max(previous.end, item.end),
                    score=max(previous.score, item.score),
                )
                continue
        merged.append(item)
    return merged


_EXPANDABLE = frozenset({"PERSON", "LOCATION"})


def _expand_ner_spans(
    text: str,
    results: list[RecognizerResult],
    identifiers: list[Span],
    money: list[Span],
) -> list[RecognizerResult]:
    widened: list[RecognizerResult] = []
    for item in results:
        if item.entity_type not in _EXPANDABLE:
            widened.append(item)
            continue
        start, end = _expand_one(text, item, identifiers, money)
        widened.append(
            RecognizerResult(
                entity_type=item.entity_type, start=start, end=end, score=item.score
            )
        )

    # A widened span may now be, or contain only, a role word. Drop those.
    kept = [
        item
        for item in widened
        if not (item.entity_type == "PERSON" and _is_role_word(text[item.start : item.end]))
    ]

    separators = {",", " ", ", "}
    merged = _merge_adjacent(kept)
    return [
        item
        for item in merged
        if item.entity_type not in _EXPANDABLE
        or text[item.start : item.end].strip(" ,") not in separators
    ]


def _drop_overlaps(results: list[RecognizerResult]) -> list[RecognizerResult]:
    """Keep the strongest result where two detections overlap."""
    ordered = sorted(results, key=lambda item: (-item.score, item.start - item.end))
    kept: list[RecognizerResult] = []
    for candidate in ordered:
        if any(
            candidate.start < item.end and candidate.end > item.start for item in kept
        ):
            continue
        kept.append(candidate)
    return sorted(kept, key=lambda item: item.start)


def analyze(text: str, known_names: list[str] | None = None) -> list[RecognizerResult]:
    """Detect the personal identifiers in `text`, protecting financial figures."""
    raw = _analyzer().analyze(
        text=text,
        entities=REQUESTED_ENTITIES,
        language="en",
        score_threshold=MIN_SCORE,
    )

    identifiers = [item for item in raw if item.entity_type in VALIDATED_ENTITIES]
    identifier_spans = [Span(item.start, item.end) for item in identifiers]

    money = [
        span
        for span in protected_spans(text)
        if not is_protected(span.start, span.end, identifier_spans)
    ]

    kept: list[RecognizerResult] = list(identifiers)
    for item in raw:
        if item.entity_type in VALIDATED_ENTITIES:
            continue
        # Names and locations must not swallow a financial figure.
        if is_protected(item.start, item.end, money):
            continue
        # A one-character span is never a name or a place. spaCy produced
        # "W" from "W/O", which redacted the relationship marker itself.
        if len(text[item.start : item.end].strip()) < 2:
            continue
        if item.entity_type == "PERSON":
            if _is_role_word(text[item.start : item.end]):
                continue
            trimmed = _trim_non_name_edges(text, item.start, item.end)
            if trimmed is None:
                continue
            item = RecognizerResult(
                entity_type=item.entity_type,
                start=trimmed[0],
                end=trimmed[1],
                score=item.score,
            )
        kept.append(item)

    # Deterministic party extraction. Runs alongside NER and catches what it
    # misses: regional names, and every repeat occurrence in signature blocks.
    party_spans = find_party_spans(text, known_names)
    party_results = [
        RecognizerResult(entity_type="IN_PARTY", start=span.start, end=span.end, score=1.0)
        for span in party_spans
    ]
    kept = [
        item
        for item in kept
        if not any(
            item.start < span.end and item.end > span.start for span in party_spans
        )
        or item.entity_type in VALIDATED_ENTITIES
    ]
    kept.extend(party_results)
    identifier_spans.extend(Span(span.start, span.end) for span in party_spans)

    kept.extend(_income_results(text, identifiers))

    # Widen partial name and address spans before resolving overlaps, so a name
    # split across two detections becomes one placeholder rather than two.
    kept = _expand_ner_spans(text, kept, identifier_spans, money)
    return _drop_overlaps(kept)


def redact(text: str, known_names: list[str] | None = None) -> RedactionResult:
    """Replace personal identifiers with numbered, reversible placeholders.

    `known_names` lets the caller supply names it already knows belong to a
    person — the signed-in user's own name, for instance — so redaction does not
    depend on a model recognising them.
    """
    if not text.strip():
        return RedactionResult(redacted_text=text)

    results = analyze(text, known_names)
    if not results:
        return RedactionResult(redacted_text=text)

    # Assign placeholders in reading order so [NAME_1] is the first name in the
    # document. Identical values reuse one placeholder, which is what makes the
    # mapping reversible.
    per_type: dict[str, dict[str, str]] = {}
    per_label: dict[str, dict[str, str]] = {}
    mapping: dict[str, str] = {}
    counts: dict[str, int] = {}

    for item in results:
        label = ENTITY_LABELS.get(item.entity_type, item.entity_type)
        original = text[item.start : item.end]
        # Numbering is per label so a name found by the structural pass and the
        # same name found by NER resolve to one placeholder, not two.
        label_table = per_label.setdefault(label, {})
        if original not in label_table:
            placeholder = f"[{label}_{len(label_table) + 1}]"
            label_table[original] = placeholder
            mapping[placeholder] = original
            counts[label] = counts.get(label, 0) + 1
        per_type.setdefault(item.entity_type, {})[original] = label_table[original]

    operators = {
        entity_type: OperatorConfig(
            "custom",
            {"lambda": (lambda table: lambda value: table.get(value, value))(table)},
        )
        for entity_type, table in per_type.items()
    }

    anonymized = _anonymizer().anonymize(text=text, analyzer_results=results, operators=operators)

    return RedactionResult(
        redacted_text=anonymized.text,
        mapping=mapping,
        counts=counts,
        total=sum(counts.values()),
    )


def restore(text: str, mapping: dict[str, str]) -> str:
    """Put the real values back. Used once AI output returns in a later phase."""
    for placeholder, original in mapping.items():
        text = text.replace(placeholder, original)
    return text

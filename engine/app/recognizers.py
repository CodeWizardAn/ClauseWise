"""Custom Presidio recognizers for Indian identifiers.

Each of these is structurally validated wherever the format allows it — a PAN
carries a holder-type character, an Aadhaar carries a Verhoeff check digit. That
validation is the difference between a redactor people trust and one that flags
every twelve-digit invoice number until somebody turns it off.

Context words raise the confidence score when the surrounding text agrees
("PAN: ABCPE1234F" is more certain than a bare token in a table).
"""

from __future__ import annotations

from presidio_analyzer import Pattern, PatternRecognizer

from .verhoeff import is_valid as verhoeff_valid

# PAN fourth character: the holder type. A PAN whose fourth character is not one
# of these is not a PAN, which kills most look-alike strings.
#   A AOP  B BOI  C Company  E LLP  F Firm  G Government
#   H HUF  J Artificial juridical person  K Krish  L Local authority
#   P Individual  T Trust
PAN_HOLDER_TYPES = set("ABCEFGHJKLPT")


class PanRecognizer(PatternRecognizer):
    """Permanent Account Number: AAAAA9999A."""

    def __init__(self) -> None:
        super().__init__(
            supported_entity="IN_PAN",
            name="IndianPanRecognizer",
            patterns=[
                Pattern(name="pan", regex=r"\b[A-Z]{5}[0-9]{4}[A-Z]\b", score=0.6),
            ],
            context=["pan", "permanent account number", "income tax", "pan no", "pan card"],
        )

    def validate_result(self, pattern_text: str) -> bool | None:
        return pattern_text[3].upper() in PAN_HOLDER_TYPES


class AadhaarRecognizer(PatternRecognizer):
    """Aadhaar: twelve digits, optionally spaced, with a Verhoeff check digit."""

    def __init__(self) -> None:
        super().__init__(
            supported_entity="IN_AADHAAR",
            name="IndianAadhaarRecognizer",
            patterns=[
                Pattern(
                    name="aadhaar",
                    regex=r"(?<!\d)[2-9]\d{3}[\s-]?\d{4}[\s-]?\d{4}(?!\d)",
                    score=0.35,
                ),
            ],
            context=["aadhaar", "aadhar", "uid", "uidai", "unique identification"],
        )

    def validate_result(self, pattern_text: str) -> bool | None:
        digits = "".join(char for char in pattern_text if char.isdigit())
        if len(digits) != 12:
            return False
        # A real Aadhaar never begins with 0 or 1.
        if digits[0] in "01":
            return False
        # The Verhoeff check digit is what rules out ordinary 12-digit numbers.
        return verhoeff_valid(digits)


class IfscRecognizer(PatternRecognizer):
    """IFSC: four bank letters, a literal 0, then six branch characters."""

    def __init__(self) -> None:
        super().__init__(
            supported_entity="IN_IFSC",
            name="IndianIfscRecognizer",
            patterns=[
                Pattern(name="ifsc", regex=r"\b[A-Z]{4}0[A-Z0-9]{6}\b", score=0.6),
            ],
            context=["ifsc", "bank", "branch", "neft", "rtgs", "account"],
        )


class GstinRecognizer(PatternRecognizer):
    """GSTIN: state code, PAN, entity number, a literal Z, checksum."""

    def __init__(self) -> None:
        super().__init__(
            supported_entity="IN_GSTIN",
            name="IndianGstinRecognizer",
            patterns=[
                Pattern(
                    name="gstin",
                    regex=r"\b[0-3][0-9][A-Z]{5}[0-9]{4}[A-Z][0-9A-Z]Z[0-9A-Z]\b",
                    score=0.7,
                ),
            ],
            context=["gst", "gstin", "goods and services tax", "tax"],
        )

    def validate_result(self, pattern_text: str) -> bool | None:
        # Characters 3-12 are a PAN, so the same holder-type rule applies.
        return pattern_text[5].upper() in PAN_HOLDER_TYPES


class IndianMobileRecognizer(PatternRecognizer):
    """Indian mobile number, with or without the +91 prefix."""

    def __init__(self) -> None:
        super().__init__(
            supported_entity="IN_MOBILE",
            name="IndianMobileRecognizer",
            patterns=[
                Pattern(
                    name="mobile_with_code",
                    regex=r"(?<!\d)(?:\+|00)?91[\s-]?[6-9]\d{4}[\s-]?\d{5}(?!\d)",
                    score=0.7,
                ),
                Pattern(
                    name="mobile_plain",
                    regex=r"(?<!\d)[6-9]\d{4}[\s-]?\d{5}(?!\d)",
                    score=0.5,
                ),
            ],
            context=["mobile", "phone", "contact", "call", "whatsapp", "tel", "cell"],
        )


def indian_recognizers() -> list[PatternRecognizer]:
    return [
        PanRecognizer(),
        AadhaarRecognizer(),
        IfscRecognizer(),
        GstinRecognizer(),
        IndianMobileRecognizer(),
    ]

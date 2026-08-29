/**
 * Protect the values that must never be translated.
 *
 * This is not a precaution — it is a measured necessity. Sent through
 * IndicTrans2 inline, "Registration Act, 1908" comes back as पंजीकरण अधिनियम in
 * Hindi, नोंदणी कायदा in Marathi, பதிவுச் சட்டத்தின் in Tamil and
 * రిజిస్ట్రేషన్ చట్టం in Telugu. A reader who searches for the Act under a
 * translated name will not find it. That is a factual error, not a style issue.
 *
 * So every amount, percentage, statute name and URL is swapped for a numbered
 * slot before translation and restored afterwards. The slot format matters too:
 * `{0}` survives all four languages intact, while `__0__` came back as "_ _ 0 _
 * _" and a letter sentinel was transliterated. Both were tested.
 *
 * The same function runs at build time and at render time, so a template
 * produced now always matches the one looked up later.
 */
import { STATUTES } from "../statutes.mjs";
/** Statute names, longest first so a longer name is matched before a prefix. */
const STATUTE_NAMES = Object.values(STATUTES)
    .map((statute) => statute.name)
    .sort((a, b) => b.length - a.length);
function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
/**
 * Ordered most-specific first. A currency amount must be captured before the
 * bare number inside it, and a statute name before the year inside it.
 */
function patterns() {
    return [
        // Links, including Indian Kanoon references.
        /https?:\/\/[^\s)]+/g,
        // Statute names exactly as the local table spells them.
        ...STATUTE_NAMES.map((name) => new RegExp(escapeRegex(name), "g")),
        // Currency amounts: Rs. 8,300/-  ₹1,00,000  INR 4,200  $1,200.50
        /(?:₹|Rs\.?|INR|USD|\$)\s*\d[\d,]*(?:\.\d{1,2})?(?:\s*\/-)?/gi,
        // Percentages.
        /\d{1,3}(?:\.\d+)?\s*%/g,
        // Grouped or decimal numbers, and years. Plain small integers are left
        // alone: they translate safely and slotting them makes templates brittle.
        /\b\d{1,3}(?:,\d{2,3})+(?:\.\d+)?\b/g,
        /\b\d+\.\d+\b/g,
        /\b(?:1[6-9]|20)\d{2}\b/g,
    ];
}
export function protectText(text) {
    const values = [];
    // Mark spans first, then substitute, so overlapping patterns cannot corrupt
    // each other's offsets.
    const taken = [];
    for (const pattern of patterns()) {
        pattern.lastIndex = 0;
        let match;
        while ((match = pattern.exec(text)) !== null) {
            const start = match.index;
            const end = start + match[0].length;
            if (match[0].length === 0)
                break;
            if (taken.some((span) => start < span.end && end > span.start))
                continue;
            taken.push({ start, end, value: match[0] });
        }
    }
    taken.sort((a, b) => a.start - b.start);
    let template = "";
    let cursor = 0;
    for (const span of taken) {
        template += text.slice(cursor, span.start) + `{${values.length}}`;
        values.push(span.value);
        cursor = span.end;
    }
    template += text.slice(cursor);
    return { template, values };
}
/** Put the protected values back into a translated template. */
export function restoreText(template, values) {
    return template.replace(/\{(\d+)\}/g, (whole, index) => {
        const value = values[Number.parseInt(index, 10)];
        return value === undefined ? whole : value;
    });
}

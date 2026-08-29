/**
 * Severity bands, derived in code.
 *
 * The model returns a number and nothing else that matters. The band — Clean,
 * Low, Medium, High, Critical — is assigned here, by this function, from that
 * number. Any label the model volunteers is discarded before it reaches this
 * point.
 *
 * The reason is consistency: asked twice about the same clause, a model will
 * happily call it "medium" once and "high" the next time. A threshold table
 * cannot do that. The same score always produces the same band, and the bands
 * mean the same thing across every document.
 */
export const SEVERITY_BANDS = [
    { id: "clean", label: "Clean", min: 0, max: 19 },
    { id: "low", label: "Low", min: 20, max: 39 },
    { id: "medium", label: "Medium", min: 40, max: 59 },
    { id: "high", label: "High", min: 60, max: 79 },
    { id: "critical", label: "Critical", min: 80, max: 100 },
];
export const SEVERITY_LABELS = {
    clean: "Clean",
    low: "Low",
    medium: "Medium",
    high: "High",
    critical: "Critical",
};
/** Clamp any number to a valid 0-100 score. Non-numbers become 0. */
export function clampScore(value) {
    const numeric = typeof value === "number" ? value : Number.parseFloat(String(value));
    if (!Number.isFinite(numeric))
        return 0;
    return Math.max(0, Math.min(100, Math.round(numeric)));
}
/** The single source of truth for score -> band. */
export function severityForScore(score) {
    const clamped = clampScore(score);
    const band = SEVERITY_BANDS.find((item) => clamped >= item.min && clamped <= item.max);
    return band?.id ?? "clean";
}
export function severityLabel(score) {
    return SEVERITY_LABELS[severityForScore(score)];
}

/** Supported languages. English is the default and the fallback. */

export const LANGUAGES = [
  { code: "en", label: "English", short: "EN" },
  { code: "hi", label: "हिन्दी", short: "HI" },
  { code: "mr", label: "मराठी", short: "MR" },
  { code: "ta", label: "தமிழ்", short: "TA" },
  { code: "te", label: "తెలుగు", short: "TE" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

export const DEFAULT_LANGUAGE: LanguageCode = "en";

/** Names as the model expects them, for prompting the LLM to answer in-language. */
export const LANGUAGE_NAMES: Record<LanguageCode, string> = {
  en: "English",
  hi: "Hindi",
  mr: "Marathi",
  ta: "Tamil",
  te: "Telugu",
};

export function isLanguage(value: unknown): value is LanguageCode {
  return typeof value === "string" && LANGUAGES.some((item) => item.code === value);
}

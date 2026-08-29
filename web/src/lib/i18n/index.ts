/**
 * Runtime translation lookup.
 *
 * No model runs here. Every string was translated once at build time into
 * catalog.json, so switching language is a dictionary lookup and the UI changes
 * instantly. IndicTrans2 needs ~0.4s per string; translating a 36-clause
 * analysis live would stall the page for half a minute.
 *
 * Fallback is the default behaviour, not an error path: an English string with
 * no entry in the catalogue renders in English. A missing translation degrades
 * one sentence, never the page.
 */

import catalog from "@/lib/i18n/catalog.json";
import { DEFAULT_LANGUAGE, type LanguageCode } from "@/lib/i18n/languages";
import { protectText, restoreText } from "@/lib/i18n/protect";

type Catalog = Record<string, Record<string, string>>;

const CATALOG = catalog as Catalog;

/**
 * Translate one string, keeping protected values exact.
 *
 * The string is protected the same way it was at build time, the resulting
 * template is looked up, and the real values are put back. Amounts, statute
 * names and links therefore never pass through the translator at all.
 */
export function translate(text: string, language: LanguageCode): string {
  if (!text || language === DEFAULT_LANGUAGE) return text;
  const table = CATALOG[language];
  if (!table) return text;

  const { template, values } = protectText(text);
  const translated = table[template];
  if (!translated) return text; // fall back to English, silently and safely
  return restoreText(translated, values);
}

/** Convenience for arrays of strings. */
export function translateAll(texts: string[], language: LanguageCode): string[] {
  return texts.map((text) => translate(text, language));
}

/** How much of the catalogue exists for a language — used for honest reporting. */
export function catalogSize(language: LanguageCode): number {
  return Object.keys(CATALOG[language] ?? {}).length;
}

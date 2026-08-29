/**
 * Indian Kanoon client — server-side only.
 *
 * This layer is a garnish. The Act name always comes from the local table in
 * statutes.ts; Indian Kanoon only ever adds a link to it. If IK is slow, down,
 * unauthenticated, out of balance or simply unhelpful, every function here
 * returns null and the analysis renders exactly as it did in Phase 4b-1.
 *
 * Two things are deliberate:
 *
 *   - We do NOT take the top-ranked result. IK's relevance ranking put "Section
 *     11 in The Land Acquisition Act, 1894" above the Registration Act for a
 *     "Registration Act 1908" query. Linking that would be a fabricated
 *     citation wearing a real URL, so results are scored against the Act name
 *     and a weak match is discarded.
 *   - Misses are cached too. Re-querying an Act that IK has no page for would
 *     spend balance on every upload for no gain.
 */

import "server-only";

const SEARCH_URL = "https://api.indiankanoon.org/search/";
const DOC_URL = "https://indiankanoon.org/doc";

/** IK search is ~1-2s. Past this we would rather show no link than stall. */
const TIMEOUT_MS = 8000;

export interface IkReference {
  /** IK's own title for the document, tags stripped. */
  title: string;
  /** Canonical public link. Built from the document id IK returned. */
  url: string;
}

/**
 * Accepts either name. The brief called it INDIANKANOON_API_TOKEN; the
 * environment defines INDIANKANOON_API_KEY. Both are read so neither breaks.
 * This is not a fallback secret — absent both, we simply do not call IK.
 */
function token(): string | null {
  return (
    process.env.INDIANKANOON_API_TOKEN?.trim() ||
    process.env.INDIANKANOON_API_KEY?.trim() ||
    null
  );
}

export function ikConfigured(): boolean {
  return token() !== null;
}

function stripTags(value: string): string {
  return value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

const NOISE = new Set(["the", "in", "of", "and", "act", "section", "india", "indian"]);

function significantTokens(value: string): string[] {
  return stripTags(value)
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 2 && !NOISE.has(word));
}

/**
 * Is this result actually the Act we asked about?
 *
 * The year must match when the Act has one, and the distinctive words of the
 * Act's name must appear. Both conditions together are what rejects the
 * Land Acquisition Act for a Registration Act query.
 */
function matches(actName: string, title: string): boolean {
  const cleanTitle = stripTags(title).toLowerCase();

  const year = /\b(1[6-9]\d{2}|20\d{2})\b/.exec(actName)?.[1];
  if (year && !cleanTitle.includes(year)) return false;

  const wanted = significantTokens(actName);
  if (wanted.length === 0) return false;
  const hits = wanted.filter((word) => cleanTitle.includes(word)).length;
  return hits / wanted.length >= 0.6;
}

/**
 * Find an Indian Kanoon page for an Act. Returns null on any failure — a
 * missing key, a network error, a timeout, an HTTP error, or no result good
 * enough to link. Callers must treat null as normal.
 */
export async function searchAct(
  actName: string,
  query: string,
): Promise<IkReference | null> {
  const key = token();
  if (!key) return null;

  try {
    const url = new URL(SEARCH_URL);
    url.searchParams.set("formInput", query);
    url.searchParams.set("pagenum", "0");

    const response = await fetch(url, {
      method: "POST",
      // Header only. The token never appears in a URL or a response.
      headers: { Authorization: `Token ${key}` },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error(`[ik] search for ${actName} returned ${response.status}`);
      return null;
    }

    const payload = await response.json();
    const docs: unknown[] = Array.isArray(payload?.docs) ? payload.docs : [];

    for (const entry of docs) {
      const doc = entry as { tid?: unknown; title?: unknown };
      const title = typeof doc.title === "string" ? doc.title : "";
      const tid = doc.tid === undefined || doc.tid === null ? "" : String(doc.tid);
      if (!title || !tid) continue;
      if (!matches(actName, title)) continue;
      return { title: stripTags(title), url: `${DOC_URL}/${tid}/` };
    }

    // IK answered but had nothing that is plainly this Act. Not an error.
    return null;
  } catch (error) {
    console.error(`[ik] search for ${actName} failed:`, error);
    return null;
  }
}

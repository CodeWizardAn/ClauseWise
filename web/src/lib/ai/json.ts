import "server-only";

/**
 * Pull a JSON value out of a model response.
 *
 * Models wrap JSON in prose or markdown fences no matter how firmly the prompt
 * says not to, so this strips fences and falls back to the outermost bracketed
 * span. Returns null rather than throwing: the caller's job is to fall back to
 * deterministic output, not to crash.
 */
export function extractJson<T>(raw: string): T | null {
  const withoutFence = raw
    .replace(/^\s*```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/, "")
    .trim();

  const candidates = [withoutFence];

  for (const [open, close] of [
    ["[", "]"],
    ["{", "}"],
  ] as const) {
    const start = withoutFence.indexOf(open);
    const end = withoutFence.lastIndexOf(close);
    if (start !== -1 && end > start) {
      candidates.push(withoutFence.slice(start, end + 1));
    }
  }

  for (const candidate of candidates) {
    try {
      return JSON.parse(candidate) as T;
    } catch {
      continue;
    }
  }
  return null;
}

/**
 * Salvage whole objects from a truncated JSON array.
 *
 * A response cut off by a token limit is unparseable as a whole but usually
 * contains several complete objects before the cut. Recovering those is the
 * difference between "the model told us about 5 of 6 clauses" and throwing the
 * batch away. Objects are matched at one nesting level, which is all our
 * schemas use.
 */
export function salvageObjects<T>(raw: string): T[] {
  const found: T[] = [];
  for (const match of raw.matchAll(/\{[^{}]*\}/g)) {
    try {
      found.push(JSON.parse(match[0]) as T);
    } catch {
      continue;
    }
  }
  return found;
}

import "server-only";

/**
 * Put the real values back into text the AI produced.
 *
 * Longest placeholders first, so [NAME_10] is not corrupted by a [NAME_1]
 * replacement running before it.
 */
export function restore(text: string, mapping: Record<string, string>): string {
  const placeholders = Object.keys(mapping).sort((a, b) => b.length - a.length);
  let output = text;
  for (const placeholder of placeholders) {
    output = output.split(placeholder).join(mapping[placeholder]);
  }
  return output;
}

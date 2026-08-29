/**
 * Server-side configuration.
 *
 * This module must never be imported from a client component. Everything here
 * is read from the server environment so that no configuration — and later, no
 * API key — can be inlined into the browser bundle (IMPLEMENTATION.md section 5).
 */

import "server-only";

/**
 * Where the Python extraction sidecar lives.
 *
 * The default is the documented local one. It is a plain service address, not a
 * secret; when a real secret is introduced in a later phase it must fail loudly
 * on absence rather than fall back to anything.
 */
const DEFAULT_ENGINE_URL = "http://127.0.0.1:8000";

/** 10 MiB. Keep this in step with MAX_UPLOAD_BYTES in the engine sidecar. */
const DEFAULT_MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

function readEngineUrl(): string {
  const raw = process.env.ENGINE_URL?.trim() || DEFAULT_ENGINE_URL;
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    throw new Error(
      `ENGINE_URL is not a valid URL: ${JSON.stringify(raw)}. ` +
        `Expected something like ${DEFAULT_ENGINE_URL}.`,
    );
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error(
      `ENGINE_URL must be an http(s) URL, got ${JSON.stringify(parsed.protocol)}.`,
    );
  }
  // Strip a trailing slash so path joining stays predictable.
  return parsed.toString().replace(/\/$/, "");
}

function readMaxUploadBytes(): number {
  const raw = process.env.MAX_UPLOAD_BYTES?.trim();
  if (!raw) return DEFAULT_MAX_UPLOAD_BYTES;
  const value = Number(raw);
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(
      `MAX_UPLOAD_BYTES must be a positive integer number of bytes, got ${JSON.stringify(raw)}.`,
    );
  }
  return value;
}

export const config = {
  engineUrl: readEngineUrl(),
  maxUploadBytes: readMaxUploadBytes(),
  /** How long to wait on the sidecar before failing visibly. */
  engineTimeoutMs: 60_000,
} as const;

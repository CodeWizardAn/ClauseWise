/**
 * Required server secrets.
 *
 * Every accessor here throws if its variable is missing or malformed. There is
 * deliberately no default, no placeholder and no "" fallback: a hardcoded
 * fallback secret is how one of the audited reference projects shipped a JWT
 * hole, and a silently-wrong encryption key is worse than a crash because the
 * data looks protected when it is not.
 *
 * Server-only. Nothing in this module may reach the browser.
 */

import "server-only";

export class MissingSecretError extends Error {
  constructor(name: string, detail: string) {
    super(`${name} ${detail}. Set it in the environment; there is no default.`);
    this.name = "MissingSecretError";
  }
}

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new MissingSecretError(name, "is not set");
  return value;
}

export function databaseUrl(): string {
  const value = required("DATABASE_URL");
  if (!value.startsWith("postgres://") && !value.startsWith("postgresql://")) {
    throw new MissingSecretError("DATABASE_URL", "must be a postgres:// connection string");
  }
  return value;
}

/** The AES-256 key. Exactly 32 bytes, or we refuse to start. */
export function encryptionKey(): Buffer {
  const raw = required("ENCRYPTION_KEY");
  let key: Buffer;
  try {
    key = Buffer.from(raw, "base64");
  } catch {
    throw new MissingSecretError("ENCRYPTION_KEY", "is not valid base64");
  }
  if (key.length !== 32) {
    // Saying "AES-256" while using a shorter key is the exact misclaim we are
    // avoiding, so the length is enforced rather than padded or hashed.
    throw new MissingSecretError(
      "ENCRYPTION_KEY",
      `must decode to exactly 32 bytes for AES-256, got ${key.length}`,
    );
  }
  return key;
}

export function clerkSecretKey(): string {
  return required("CLERK_SECRET_KEY");
}

/** Report which required secrets are present, without revealing any of them. */
export function secretsStatus(): Record<string, boolean> {
  const check = (fn: () => unknown) => {
    try {
      fn();
      return true;
    } catch {
      return false;
    }
  };
  return {
    DATABASE_URL: check(databaseUrl),
    ENCRYPTION_KEY: check(encryptionKey),
    CLERK_SECRET_KEY: check(clerkSecretKey),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: Boolean(
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim(),
    ),
  };
}

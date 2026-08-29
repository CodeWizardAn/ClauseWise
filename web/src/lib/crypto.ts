/**
 * AES-256-GCM encryption for data at rest.
 *
 * Real AES-256 (a 32-byte key, enforced in env.ts) in real GCM mode. GCM is
 * authenticated: the tag is verified on decrypt, so a tampered or truncated
 * ciphertext throws rather than returning plausible garbage.
 *
 * The IV and auth tag are stored alongside the ciphertext, in their own
 * columns, so a row is self-describing. The key is never stored with the data —
 * it comes from the environment only, and never touches the database or the
 * repository.
 */

import "server-only";

import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

import { encryptionKey } from "@/lib/env";

const ALGORITHM = "aes-256-gcm";
/** 96 bits, the size GCM is specified for. */
const IV_BYTES = 12;

export interface Encrypted {
  ciphertext: string;
  iv: string;
  authTag: string;
}

export function encryptJson(value: unknown): Encrypted {
  const key = encryptionKey();
  const iv = randomBytes(IV_BYTES);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  const plaintext = Buffer.from(JSON.stringify(value), "utf8");
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);

  return {
    ciphertext: ciphertext.toString("base64"),
    iv: iv.toString("base64"),
    authTag: cipher.getAuthTag().toString("base64"),
  };
}

export function decryptJson<T>(payload: Encrypted): T {
  const key = encryptionKey();
  const decipher = createDecipheriv(ALGORITHM, key, Buffer.from(payload.iv, "base64"));
  decipher.setAuthTag(Buffer.from(payload.authTag, "base64"));
  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(payload.ciphertext, "base64")),
    decipher.final(),
  ]);
  return JSON.parse(plaintext.toString("utf8")) as T;
}

/** Name of the cipher actually in use, for honest reporting in the UI. */
export const CIPHER_NAME = "AES-256-GCM";

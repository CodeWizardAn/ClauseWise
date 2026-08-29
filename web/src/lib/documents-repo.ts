/**
 * Stored analyses, with ownership enforced at the data layer.
 *
 * This replaces the in-memory doc-store from Phase 3. Two things changed and
 * both matter: analyses now survive a restart, and every read is bound to an
 * owner.
 *
 * Ownership is checked HERE, not in the routes, so a route cannot forget. There
 * is no exported "get by id" that skips the check — the only way to read a row
 * is to say who is asking. Fetching a document by id with no ownership check is
 * precisely the hole all three audited reference projects had.
 */

import "server-only";

import { and, desc, eq } from "drizzle-orm";

import { db } from "@/db/client";
import { documents } from "@/db/schema";
import { decryptJson, encryptJson } from "@/lib/crypto";
import type { Clause } from "@/lib/segment";

/** Everything needed to re-render an analysis. Encrypted as one blob. */
export interface StoredAnalysis {
  clauses: Clause[];
  /** placeholder -> real value. Encrypted at rest, never sent to a browser. */
  mapping: Record<string, string>;
  originalText: string;
  redactedText: string;
  redaction: { counts: Record<string, number>; total: number };
  documentType: unknown;
  figures: unknown;
  omission: unknown;
  statutes: unknown;
  statuteFlags: unknown;
  segmentation: unknown;
  document: unknown;
}

export interface StoredDocument {
  id: string;
  ownerId: string;
  filename: string;
  createdAt: Date;
  analysis: StoredAnalysis;
}

export type AccessResult =
  | { ok: true; document: StoredDocument }
  | { ok: false; reason: "not-found" }
  | { ok: false; reason: "forbidden" };

export async function saveAnalysis(
  ownerId: string,
  filename: string,
  analysis: StoredAnalysis,
): Promise<{ id: string; createdAt: Date }> {
  const encrypted = encryptJson(analysis);
  const [row] = await db()
    .insert(documents)
    .values({
      ownerId,
      filename,
      ciphertext: encrypted.ciphertext,
      iv: encrypted.iv,
      authTag: encrypted.authTag,
    })
    .returning({ id: documents.id, createdAt: documents.createdAt });
  return row;
}

/**
 * Read one document as a specific user.
 *
 * A row owned by somebody else returns "forbidden", never the data. The caller
 * maps that to 403.
 */
export async function accessDocument(id: string, userId: string): Promise<AccessResult> {
  // A malformed id would make Postgres throw on the uuid cast; treat it as absent.
  if (!/^[0-9a-f-]{36}$/i.test(id)) return { ok: false, reason: "not-found" };

  const [row] = await db().select().from(documents).where(eq(documents.id, id)).limit(1);
  if (!row) return { ok: false, reason: "not-found" };
  if (row.ownerId !== userId) return { ok: false, reason: "forbidden" };

  return {
    ok: true,
    document: {
      id: row.id,
      ownerId: row.ownerId,
      filename: row.filename,
      createdAt: row.createdAt,
      analysis: decryptJson<StoredAnalysis>({
        ciphertext: row.ciphertext,
        iv: row.iv,
        authTag: row.authTag,
      }),
    },
  };
}

/** The signed-in user's own analyses. Scoped by owner in the query itself. */
export async function listDocuments(userId: string) {
  return db()
    .select({
      id: documents.id,
      filename: documents.filename,
      createdAt: documents.createdAt,
    })
    .from(documents)
    .where(eq(documents.ownerId, userId))
    .orderBy(desc(documents.createdAt))
    .limit(50);
}

/** Delete, scoped by owner so another user's row can never be removed. */
export async function deleteDocument(id: string, userId: string): Promise<AccessResult> {
  const access = await accessDocument(id, userId);
  if (!access.ok) return access;
  await db()
    .delete(documents)
    .where(and(eq(documents.id, id), eq(documents.ownerId, userId)));
  return access;
}

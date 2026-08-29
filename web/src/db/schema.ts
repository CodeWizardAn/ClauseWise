/**
 * Database schema.
 *
 * One table. A stored analysis belongs to exactly one Clerk user, and its
 * contents — clause text, the redaction mapping, the original document text —
 * are encrypted at rest. Nothing readable is stored in the clear except the
 * filename, the owner id and timestamps.
 */

import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const documents = pgTable(
  "documents",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    /** Clerk user id. Every read is checked against this. */
    ownerId: text("owner_id").notNull(),
    filename: text("filename").notNull(),
    /** AES-256-GCM ciphertext of the analysis payload, base64. */
    ciphertext: text("ciphertext").notNull(),
    /** Per-row 96-bit nonce, base64. Never reused. */
    iv: text("iv").notNull(),
    /** GCM authentication tag, base64. Verified on every decrypt. */
    authTag: text("auth_tag").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [index("documents_owner_id_idx").on(table.ownerId)],
);

export type DocumentRow = typeof documents.$inferSelect;
export type NewDocumentRow = typeof documents.$inferInsert;

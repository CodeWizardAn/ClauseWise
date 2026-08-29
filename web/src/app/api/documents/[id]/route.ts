/**
 * GET/DELETE /api/documents/[id] — one saved analysis.
 *
 * Ownership is enforced by accessDocument(), which requires the caller's user
 * id. A document belonging to another user returns 403 and never its contents.
 * This is the check all three audited reference projects omitted.
 */

import { NextResponse } from "next/server";

import { requireUser } from "@/lib/auth";
import { accessDocument, deleteDocument } from "@/lib/documents-repo";
import type { AnalysisResponse } from "@/lib/documents";

export const runtime = "nodejs";

function denied(reason: "not-found" | "forbidden") {
  return reason === "forbidden"
    ? NextResponse.json({ error: "This document belongs to another account." }, { status: 403 })
    : NextResponse.json({ error: "No such document." }, { status: 404 });
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const authed = await requireUser();
  if (!authed.ok) return authed.response;

  const { id } = await params;
  const access = await accessDocument(id, authed.user.userId);
  if (!access.ok) return denied(access.reason);

  const { analysis } = access.document;
  // Rebuilt from the decrypted payload. `mapping` is deliberately omitted: the
  // real values behind the placeholders never go to a browser.
  const body = {
    document: analysis.document,
    segmentation: analysis.segmentation,
    clauses: analysis.clauses,
    redaction: analysis.redaction,
    originalText: analysis.originalText,
    redactedText: analysis.redactedText,
    documentType: analysis.documentType,
    figures: analysis.figures,
    omission: analysis.omission,
    statutes: analysis.statutes ?? [],
    statuteFlags: analysis.statuteFlags ?? [],
    documentId: access.document.id,
    createdAt: access.document.createdAt.toISOString(),
    aiConfigured: true,
  } as unknown as AnalysisResponse;

  return NextResponse.json(body);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const authed = await requireUser();
  if (!authed.ok) return authed.response;

  const { id } = await params;
  const result = await deleteDocument(id, authed.user.userId);
  if (!result.ok) return denied(result.reason);
  return NextResponse.json({ deleted: id });
}

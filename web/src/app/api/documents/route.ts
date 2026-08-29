/**
 * GET /api/documents — the signed-in user's saved analyses.
 *
 * The query is scoped by owner id, so it cannot return anybody else's rows even
 * if the caller tampers with the request. Contents stay encrypted; this returns
 * filenames and timestamps only.
 */

import { NextResponse } from "next/server";

import { requireUser } from "@/lib/auth";
import { listDocuments } from "@/lib/documents-repo";

export const runtime = "nodejs";

export async function GET() {
  const authed = await requireUser();
  if (!authed.ok) return authed.response;

  const rows = await listDocuments(authed.user.userId);
  return NextResponse.json({
    documents: rows.map((row) => ({
      id: row.id,
      filename: row.filename,
      createdAt: row.createdAt.toISOString(),
    })),
  });
}

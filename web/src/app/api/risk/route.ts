/**
 * POST /api/risk — per-clause risk analysis for a stored document.
 *
 * Takes a document id, never document text: the clauses live server-side. The
 * model sees the redacted clauses only; the real values are restored here,
 * after the model has answered, on the way to the browser.
 */

import { NextResponse } from "next/server";

import { analyseClauseRisk } from "@/lib/ai/risk";
import { requireUser } from "@/lib/auth";
import { DEFAULT_LANGUAGE, isLanguage } from "@/lib/i18n/languages";
import { accessDocument } from "@/lib/documents-repo";
import { restore } from "@/lib/restore";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const authed = await requireUser();
  if (!authed.ok) return authed.response;

  const body = await request.json().catch(() => null);
  const documentId = typeof body?.documentId === "string" ? body.documentId : "";
  const language = isLanguage(body?.language) ? body.language : DEFAULT_LANGUAGE;
  if (!documentId) {
    return NextResponse.json({ error: "A document id is required." }, { status: 400 });
  }

  // Ownership is checked before a single clause is read.
  const access = await accessDocument(documentId, authed.user.userId);
  if (!access.ok) {
    return access.reason === "forbidden"
      ? NextResponse.json(
          { error: "This document belongs to another account." },
          { status: 403 },
        )
      : NextResponse.json({ error: "No such document." }, { status: 404 });
  }
  const document = access.document.analysis;

  const report = await analyseClauseRisk(document.clauses, language);

  // Restore the real values for display only. The mapping itself stays here.
  const risks = report.risks.map((risk) => ({
    ...risk,
    explanation: restore(risk.explanation, document.mapping),
  }));

  return NextResponse.json({
    risks,
    provider: report.provider,
    model: report.model,
    degraded: report.degraded,
    notice: report.notice,
  });
}

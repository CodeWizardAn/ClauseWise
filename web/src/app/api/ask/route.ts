/**
 * POST /api/ask — grounded question answering over a stored document.
 *
 * The model receives the redacted clauses and the question. Real values are
 * restored into the answer here, server-side, before it is returned.
 */

import { NextResponse } from "next/server";

import { answerQuestion } from "@/lib/ai/qa";
import { requireUser } from "@/lib/auth";
import { DEFAULT_LANGUAGE, isLanguage } from "@/lib/i18n/languages";
import { accessDocument } from "@/lib/documents-repo";
import { restore } from "@/lib/restore";

export const runtime = "nodejs";

const MAX_QUESTION_LENGTH = 500;

export async function POST(request: Request) {
  const authed = await requireUser();
  if (!authed.ok) return authed.response;

  const body = await request.json().catch(() => null);
  const documentId = typeof body?.documentId === "string" ? body.documentId : "";
  const language = isLanguage(body?.language) ? body.language : DEFAULT_LANGUAGE;
  const question = typeof body?.question === "string" ? body.question.trim() : "";

  if (!documentId) {
    return NextResponse.json({ error: "A document id is required." }, { status: 400 });
  }
  if (!question) {
    return NextResponse.json({ error: "Ask a question about the document." }, { status: 400 });
  }
  if (question.length > MAX_QUESTION_LENGTH) {
    return NextResponse.json(
      { error: `Questions are limited to ${MAX_QUESTION_LENGTH} characters.` },
      { status: 400 },
    );
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

  const result = await answerQuestion(document.clauses, question, language);

  return NextResponse.json({
    ...result,
    answer: restore(result.answer, document.mapping),
  });
}

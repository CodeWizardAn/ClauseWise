/**
 * POST /api/compare — compare two document versions.
 *
 * Accepts either:
 *   1. FormData with fileA and fileB (newly uploaded files)
 *   2. JSON body with documentIdA and documentIdB (saved documents from user account)
 */

import { NextResponse } from "next/server";

import { requireUser } from "@/lib/auth";
import { config } from "@/lib/config";
import { generateComparisonReport } from "@/lib/compare";
import { detectDocumentType } from "@/lib/doc-type";
import { hasAcceptedExtension } from "@/lib/documents";
import { accessDocument } from "@/lib/documents-repo";
import { extractFigures, type ExtractedFigures } from "@/lib/figures";
import { segmentClauses, type SegmentedClause } from "@/lib/segment";

export const runtime = "nodejs";

function fail(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

interface SidecarExtractResponse {
  filename: string;
  kind: string;
  pages: number | null;
  bytes: number;
  characters: number;
  notes: string[];
  text: string;
  redactedText: string;
  redaction: {
    counts: Record<string, number>;
    total: number;
    mapping: Record<string, string>;
  };
}

async function extractViaSidecar(file: File): Promise<SidecarExtractResponse> {
  const outbound = new FormData();
  outbound.append("file", file, file.name);

  let sidecarResponse: Response;
  try {
    sidecarResponse = await fetch(`${config.engineUrl}/extract`, {
      method: "POST",
      body: outbound,
      signal: AbortSignal.timeout(30_000),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Network error";
    throw new Error(`The extraction engine could not be reached: ${message}`);
  }

  if (!sidecarResponse.ok) {
    let detail = "";
    try {
      const body = await sidecarResponse.json();
      detail = body?.detail || body?.error || "";
    } catch {
      detail = await sidecarResponse.text().catch(() => "");
    }
    throw new Error(detail || `Extraction failed with status ${sidecarResponse.status}`);
  }

  return sidecarResponse.json();
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";

  let clausesA: SegmentedClause[];
  let clausesB: SegmentedClause[];
  let figuresA: ExtractedFigures | null = null;
  let figuresB: ExtractedFigures | null = null;
  let filenameA = "Version A";
  let filenameB = "Version B";

  // Mode 1: Compare from Saved Document IDs (JSON - Requires Auth)
  if (contentType.includes("application/json")) {
    const authed = await requireUser();
    if (!authed.ok) return authed.response;

    let body: { documentIdA?: string; documentIdB?: string };
    try {
      body = await request.json();
    } catch {
      return fail("Invalid JSON payload.", 400);
    }

    const { documentIdA, documentIdB } = body;
    if (!documentIdA || !documentIdB) {
      return fail("Both documentIdA and documentIdB are required.", 400);
    }

    const resA = await accessDocument(documentIdA, authed.user.userId);
    const resB = await accessDocument(documentIdB, authed.user.userId);

    if (!resA.ok || !resB.ok) {
      return fail("One or both selected documents could not be found or accessed.", 404);
    }

    filenameA = resA.document.filename;
    filenameB = resB.document.filename;

    clausesA = resA.document.analysis.clauses.map((c) => ({
      index: c.index,
      title: c.title,
      text: c.originalText,
      redactedText: c.redactedText,
      rule: "numbered",
    }));

    clausesB = resB.document.analysis.clauses.map((c) => ({
      index: c.index,
      title: c.title,
      text: c.originalText,
      redactedText: c.redactedText,
      rule: "numbered",
    }));

    figuresA = (resA.document.analysis.figures as ExtractedFigures) || null;
    figuresB = (resB.document.analysis.figures as ExtractedFigures) || null;
  }
  // Mode 2: Direct File Upload Comparison (FormData)
  else {
    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      return fail("Could not read uploaded files.", 400);
    }

    const fileA = form.get("fileA");
    const fileB = form.get("fileB");

    if (!(fileA instanceof File) || !(fileB instanceof File)) {
      return fail("Please upload both Document A (Original) and Document B (Revised).", 400);
    }

    if (!hasAcceptedExtension(fileA.name) || !hasAcceptedExtension(fileB.name)) {
      return fail("Unsupported file type. Please upload PDF, DOCX, or TXT files.", 415);
    }

    if (fileA.size > config.maxUploadBytes || fileB.size > config.maxUploadBytes) {
      const limitMb = Math.round(config.maxUploadBytes / (1024 * 1024));
      return fail(`Files must be under ${limitMb} MB.`, 413);
    }

    filenameA = fileA.name;
    filenameB = fileB.name;

    try {
      const [extractA, extractB] = await Promise.all([
        extractViaSidecar(fileA),
        extractViaSidecar(fileB),
      ]);

      const segA = segmentClauses(extractA.redactedText);
      const segB = segmentClauses(extractB.redactedText);

      clausesA = segA.clauses;
      clausesB = segB.clauses;

      const docTypeA = detectDocumentType(extractA.redactedText);
      const docTypeB = detectDocumentType(extractB.redactedText);

      figuresA = extractFigures(extractA.redactedText, docTypeA.type);
      figuresB = extractFigures(extractB.redactedText, docTypeB.type);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Extraction error";
      return fail(`Comparison failed: ${message}`, 500);
    }
  }

  const report = generateComparisonReport(clausesA, clausesB, figuresA, figuresB);

  return NextResponse.json({
    documentA: { filename: filenameA, totalClauses: clausesA.length },
    documentB: { filename: filenameB, totalClauses: clausesB.length },
    report,
  });
}

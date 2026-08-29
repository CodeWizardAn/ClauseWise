/**
 * POST /api/analyze — upload a document, get back its clauses.
 *
 * This route is the only thing that talks to the Python sidecar. The browser
 * never addresses the sidecar directly, which keeps the extraction service off
 * the public surface and leaves one server-side place to add auth, ownership
 * checks and redaction in later phases.
 *
 * The order matters: the sidecar extracts and then redacts, and we segment the
 * REDACTED text. Everything downstream of this route therefore works on text
 * with the personal identifiers already removed.
 *
 * The sidecar also returns the placeholder -> real value mapping. That is for
 * this server only and is deliberately not copied into the response below.
 *
 * The Phase 2 engines — document type, figure extraction and the Omission
 * Radar — run here on the redacted text. All three are pure code: no model is
 * called anywhere in this route.
 */

import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { aiConfigured } from "@/lib/ai/provider";
import { requireUser } from "@/lib/auth";
import { checklistFor } from "@/lib/checklists";
import { config } from "@/lib/config";
import { detectDocumentType } from "@/lib/doc-type";
import { hasAcceptedExtension, type AnalysisResponse } from "@/lib/documents";
import { saveAnalysis } from "@/lib/documents-repo";
import { extractFigures } from "@/lib/figures";
import { runOmissionRadar } from "@/lib/omission";
import { cacheStats } from "@/lib/ik/cache";
import { enrichStatutes } from "@/lib/ik/enrich";
import { evaluateStatuteRules } from "@/lib/statute-rules";
import { statutesFor } from "@/lib/statutes";
import { segmentClauses } from "@/lib/segment";

// Needs the Node runtime for streaming multipart bodies to the sidecar.
export const runtime = "nodejs";

function fail(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  // Analysis requires a signed-in user: the result is saved to their account.
  const authed = await requireUser();
  if (!authed.ok) return authed.response;

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail("The upload could not be read. Please try the file again.", 400);
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return fail("No file was included in the upload.", 400);
  }
  if (!file.name) {
    return fail("The uploaded file had no name, so its type is unknown.", 400);
  }
  if (!hasAcceptedExtension(file.name)) {
    return fail("Unsupported file type. Please upload a PDF, DOCX or TXT file.", 415);
  }
  if (file.size === 0) {
    return fail("That file is empty (0 bytes).", 400);
  }
  if (file.size > config.maxUploadBytes) {
    const limitMb = Math.round(config.maxUploadBytes / (1024 * 1024));
    return fail(`That file is larger than the ${limitMb} MB limit.`, 413);
  }

  const outbound = new FormData();
  outbound.append("file", file, file.name);

  // Redact the signed-in user's own name deterministically. NER misses regional
  // names; the account profile is a fact we already hold.
  const profile = await currentUser().catch(() => null);
  const knownNames = [
    profile?.fullName,
    [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") || null,
    profile?.firstName,
    profile?.lastName,
  ]
    .filter((value): value is string => Boolean(value && value.trim().length > 1))
    .map((value) => value.trim());
  outbound.append("known_names", JSON.stringify([...new Set(knownNames)]));

  let engineResponse: Response;
  try {
    engineResponse = await fetch(`${config.engineUrl}/extract`, {
      method: "POST",
      body: outbound,
      signal: AbortSignal.timeout(config.engineTimeoutMs),
    });
  } catch (error) {
    // Log the detail server-side; the browser gets a useful message without
    // being told the engine's internal address.
    console.error("[analyze] engine request failed:", error);
    const timedOut = error instanceof Error && error.name === "TimeoutError";
    return fail(
      timedOut
        ? "The extraction engine took too long to respond. Please try again."
        : "The extraction engine is unreachable. Check that the engine service is running.",
      503,
    );
  }

  const payload = await engineResponse.json().catch(() => null);

  if (!engineResponse.ok) {
    // Surface the engine's own reason. Never swallow it into a generic error.
    const reason =
      payload && typeof payload.error === "string"
        ? payload.error
        : `The extraction engine returned status ${engineResponse.status}.`;
    return fail(reason, engineResponse.status);
  }

  if (!payload || typeof payload.text !== "string") {
    console.error("[analyze] unexpected engine payload:", payload);
    return fail("The extraction engine returned an unexpected response.", 502);
  }
  if (typeof payload.redactedText !== "string") {
    console.error("[analyze] engine returned no redacted text");
    return fail("The extraction engine did not redact the document.", 502);
  }

  // Segment the redacted text, not the original. Redaction runs first.
  const segmentation = segmentClauses(payload.redactedText);

  // Deterministic engines. Type detection gates the rest.
  const documentType = detectDocumentType(payload.redactedText);
  const figures = extractFigures(payload.redactedText);
  const omission = runOmissionRadar(payload.redactedText, checklistFor(documentType.type));

  // Local statute layer. Pure table lookup and pattern rules — no network call.
  const localStatutes = statutesFor(documentType.type);
  const statuteFlags = evaluateStatuteRules({
    type: documentType.type,
    text: payload.redactedText,
    figures,
    omission,
  });

  // Indian Kanoon links are an upgrade on the local names, never a dependency.
  // enrichStatutes cannot throw; a total IK outage returns the list unchanged.
  const statutes = await enrichStatutes(localStatutes);
  // Operational visibility on prepaid balance usage.
  console.log("[ik] cache", JSON.stringify(cacheStats()));
  const linkedById = new Map(statutes.map((item) => [item.id, item]));
  const linkedFlags = statuteFlags.map((item) => ({
    ...item,
    statutes: item.statutes.map((statute) => linkedById.get(statute.id) ?? statute),
  }));

  // Persist the analysis, encrypted, owned by this user. The browser gets an id;
  // the clause text and the restore mapping stay in the database, encrypted.
  const mapping =
    payload.redaction && typeof payload.redaction.mapping === "object"
      ? (payload.redaction.mapping as Record<string, string>)
      : {};

  if (segmentation.clauseCount === 0) {
    return fail("No readable text was found in that document.", 422);
  }

  const documentSummary = {
    filename: typeof payload.filename === "string" ? payload.filename : file.name,
    kind: typeof payload.kind === "string" ? payload.kind : "unknown",
    pages: typeof payload.pages === "number" ? payload.pages : null,
    bytes: typeof payload.bytes === "number" ? payload.bytes : file.size,
    characters:
      typeof payload.characters === "number" ? payload.characters : payload.text.length,
    notes: Array.isArray(payload.notes)
      ? payload.notes.filter((n: unknown) => typeof n === "string")
      : [],
  };
  const segmentationSummary = {
    tier: segmentation.tier,
    reason: segmentation.reason,
    clauseCount: segmentation.clauseCount,
    wordCount: segmentation.wordCount,
  };
  const redactionSummary = {
    counts: (payload.redaction?.counts ?? {}) as Record<string, number>,
    total: typeof payload.redaction?.total === "number" ? payload.redaction.total : 0,
  };

  const stored = await saveAnalysis(authed.user.userId, documentSummary.filename, {
    clauses: segmentation.clauses,
    mapping,
    originalText: payload.text,
    redactedText: payload.redactedText,
    redaction: redactionSummary,
    documentType,
    figures,
    omission,
    statutes,
    statuteFlags: linkedFlags,
    segmentation: segmentationSummary,
    document: documentSummary,
  });

  const body: AnalysisResponse = {
    document: documentSummary,
    segmentation: segmentationSummary,
    // Every clause is returned. Nothing is capped or sampled.
    clauses: segmentation.clauses,
    redaction: redactionSummary,
    originalText: payload.text,
    redactedText: payload.redactedText,
    documentType,
    figures,
    omission,
    statutes,
    statuteFlags: linkedFlags,
    documentId: stored.id,
    createdAt: stored.createdAt.toISOString(),
    aiConfigured: aiConfigured(),
    // payload.redaction.mapping is intentionally NOT included. It holds the
    // real values behind every placeholder and stays on the server.
  };

  return NextResponse.json(body);
}

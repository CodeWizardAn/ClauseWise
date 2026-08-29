"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Alert } from "@/components/cw-alert";
import { Icon } from "@/components/icon-sprite";
import { BorderBeam } from "@/components/ui/border-beam";
import { toast } from "@/components/toast";
import {
  ACCEPT_ATTRIBUTE,
  formatBytes,
  hasAcceptedExtension,
  type AnalysisResponse,
} from "@/lib/documents";

/**
 * Upload → analyse → open the analysis.
 *
 * The design prototype faked this: a timed four-step ticker, a hardcoded list
 * of "findings", and a redirect on a setTimeout. This posts the real file to
 * POST /api/analyze and navigates to the id the server returns. /api/analyze is
 * a single request with no progress events, so the pending state is honestly
 * indeterminate — it describes what the server does rather than pretending to
 * measure it.
 */
export function UploadPanel() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  function choose(next: File | null) {
    setFile(next);
    setError(
      next && !hasAcceptedExtension(next.name)
        ? "Unsupported file type. Please choose a PDF, DOCX or TXT file."
        : null,
    );
  }

  async function analyse(chosen: File) {
    setPending(true);
    setError(null);
    try {
      const body = new FormData();
      body.append("file", chosen);
      const response = await fetch("/api/analyze", { method: "POST", body });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        // Surface the reason the server actually gave.
        setError(
          payload && typeof payload.error === "string"
            ? payload.error
            : `The server returned status ${response.status}.`,
        );
        toast("That document could not be analysed", "error");
        return;
      }

      const analysis = payload as AnalysisResponse;
      toast(`Analysed ${analysis.document.filename}`, "success");
      router.push(`/analysis/${analysis.documentId}`);
    } catch {
      setError("Could not reach the app server. Is it still running?");
      toast("Could not reach the app server", "error");
    } finally {
      setPending(false);
    }
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (file && hasAcceptedExtension(file.name)) void analyse(file);
  }

  function onDrop(event: React.DragEvent) {
    event.preventDefault();
    setDragging(false);
    if (pending) return;
    const dropped = event.dataTransfer.files?.[0] ?? null;
    if (!dropped) return;
    choose(dropped);
    if (hasAcceptedExtension(dropped.name)) void analyse(dropped);
  }

  if (pending) {
    return (
      <div
        className="card mt24 analysing"
        style={{ padding: 26, position: "relative", overflow: "hidden" }}
        aria-live="polite"
      >
        <BorderBeam size={140} duration={5} colorFrom="#F97316" colorTo="#C2410C" />
        <div className="row g12">
          <span className="file-icon">
            <Icon name="doc" />
          </span>
          <div style={{ minWidth: 0 }}>
            <b style={{ fontSize: 15 }}>{file?.name}</b>
            <p className="tiny">{file ? formatBytes(file.size) : null}</p>
          </div>
        </div>
        <p className="small mt16">
          Reading the document, redacting personal details, then splitting it into clauses.
        </p>
        <p className="tiny mt8">
          This runs in one request, so there is no progress bar to show — it will open the
          analysis as soon as the server responds.
        </p>
        <p className="disclaimer mt20">
          <Icon name="shield" />
          Names, PAN, Aadhaar, GSTIN, IFSC, phone, email and income figures are removed on the
          server before any model sees the text.
        </p>
      </div>
    );
  }

  return (
    <form className="stack g12 mt24" onSubmit={submit}>
      {error ? (
        <Alert
          tone="error"
          title="We couldn&rsquo;t read that file"
          actions={
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setError(null)}>
              Dismiss
            </button>
          }
        >
          {error}
        </Alert>
      ) : null}

      <div className="card" style={{ padding: 20 }}>
        <label
          className="dropzone"
          style={dragging ? { borderColor: "var(--cw-accent)", background: "var(--cw-accent-surface)" } : undefined}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          <span className="dz-icon">
            <Icon name="upload" />
          </span>
          <b style={{ fontSize: 15 }}>Drop a document here, or browse</b>
          <span className="small">
            PDF, DOCX or TXT · redacted on the server before analysis
          </span>
          <input
            ref={inputRef}
            type="file"
            name="file"
            accept={ACCEPT_ATTRIBUTE}
            aria-label="Choose a legal document"
            className="hide"
            onChange={(e) => {
              const next = e.target.files?.[0] ?? null;
              choose(next);
              if (next && hasAcceptedExtension(next.name)) void analyse(next);
            }}
          />
        </label>

        {file && !error ? (
          <div className="row between g12 mt16 wrap">
            <span className="row g8">
              <span className="file-icon file-icon-neutral">
                <Icon name="doc" />
              </span>
              <span>
                <b style={{ fontSize: 14.5 }}>{file.name}</b>
                <span className="tiny" style={{ display: "block" }}>
                  {formatBytes(file.size)}
                </span>
              </span>
            </span>
            <button className="btn btn-primary" type="submit">
              <Icon name="spark" />
              Analyse this document
            </button>
          </div>
        ) : null}
      </div>
    </form>
  );
}

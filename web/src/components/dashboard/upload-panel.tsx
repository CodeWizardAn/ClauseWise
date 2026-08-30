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

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (file && hasAcceptedExtension(file.name) && !pending) {
      void analyse(file);
    }
  }

  function onDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setDragging(false);
    const next = e.dataTransfer.files?.[0] ?? null;
    choose(next);
    if (next && hasAcceptedExtension(next.name)) void analyse(next);
  }

  return (
    <form onSubmit={onSubmit} className="upload-form">
      <div className="card card-p card-warm relative overflow-hidden" style={{ borderRadius: "20px" }}>
        <BorderBeam size={120} duration={8} delay={0} colorFrom="#F97316" colorTo="#FB923C" borderWidth={2} />

        <div className="row between g12 wrap mb16">
          <div className="stack g4">
            <h3 className="h4" style={{ margin: 0 }}>Analyse a document</h3>
            <p className="small mute" style={{ margin: 0 }}>
              Upload any loan terms, rental agreement, employment bond or government circular.
            </p>
          </div>
        </div>

        {error ? <Alert tone="critical" title="Could not analyse document">{error}</Alert> : null}

        {pending ? (
          <div className="stack center tac g12 p32">
            <div className="avatar avatar-ai avatar-lg">
              <Icon name="spark" />
            </div>
            <div className="stack center g4">
              <b style={{ fontSize: 16 }}>
                Extracting and redacting personal identifiers...
              </b>
              <p className="small mute" style={{ maxWidth: "48ch" }}>
                PII (PAN, Aadhaar, names, phone numbers) is masked in RAM before risk scoring.
              </p>
            </div>
          </div>
        ) : (
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
        )}

        {file && !error && !pending ? (
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

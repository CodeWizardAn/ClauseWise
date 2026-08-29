"use client";

import { useEffect, useState } from "react";

import { Icon } from "@/components/icon-sprite";
import { toast } from "@/components/toast";

/**
 * The signed-in user's saved analyses.
 *
 * GET /api/documents returns { id, filename, createdAt } and nothing else — the
 * analysis blob stays encrypted and is never decrypted to build this list. The
 * design prototype's rows also carried a clause count, a FOIR figure and a
 * one-line verdict; none of those exist on this endpoint, so they are not
 * rendered rather than invented. Deleting calls the real DELETE route, which
 * re-checks ownership server-side.
 */
interface SavedDocument {
  id: string;
  filename: string;
  createdAt: string;
}

function DeleteDialog({
  doc,
  onCancel,
  onConfirm,
  busy,
}: {
  doc: SavedDocument;
  onCancel: () => void;
  onConfirm: () => void;
  busy: boolean;
}) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onCancel();
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [onCancel]);

  return (
    <div className="cw-modal-scrim" onClick={onCancel}>
      <div
        className="cw-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Delete ${doc.filename}`}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="feat-icon" style={{ width: 42, height: 42 }}>
          <Icon name="trash" />
        </span>
        <h2 className="h4 mt16">Delete this analysis?</h2>
        <p className="small mt8">
          <b>{doc.filename}</b> and every answer drawn from it will be removed. This cannot be
          undone.
        </p>
        <div className="row g8 mt24">
          <button className="btn btn-secondary btn-block" onClick={onCancel} disabled={busy}>
            Keep it
          </button>
          <button className="btn btn-primary btn-block" onClick={onConfirm} disabled={busy}>
            {busy ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function SavedList() {
  const [documents, setDocuments] = useState<SavedDocument[] | null>(null);
  const [confirming, setConfirming] = useState<SavedDocument | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/documents")
      .then((response) => (response.ok ? response.json() : { documents: [] }))
      .then((payload) => {
        if (!cancelled) setDocuments(payload.documents ?? []);
      })
      .catch(() => {
        if (!cancelled) setDocuments([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function remove(doc: SavedDocument) {
    setBusy(true);
    try {
      const response = await fetch(`/api/documents/${doc.id}`, { method: "DELETE" });
      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        toast(
          typeof payload?.error === "string" ? payload.error : "That analysis could not be deleted",
          "error",
        );
        return;
      }
      setDocuments((current) => (current ?? []).filter((d) => d.id !== doc.id));
      toast(`${doc.filename} deleted`, "success");
    } catch {
      toast("Could not reach the app server", "error");
    } finally {
      setBusy(false);
      setConfirming(null);
    }
  }

  return (
    <>
      <div className="row between mt40" style={{ alignItems: "flex-end" }}>
        <h2 className="h4">Your saved analyses</h2>
        <span className="tiny">Encrypted to your account · delete any time</span>
      </div>

      {documents === null ? (
        <ul className="stack g10 mt16" aria-busy="true">
          {[0, 1].map((n) => (
            <li key={n} className="card" style={{ padding: 18 }}>
              <span className="shimmer" style={{ width: "38%", height: 13 }} />
              <span className="shimmer mt8" style={{ width: "22%" }} />
            </li>
          ))}
        </ul>
      ) : documents.length === 0 ? (
        <div className="card card-p mt16 tac">
          <span className="feat-icon" style={{ margin: "0 auto" }}>
            <Icon name="doc" />
          </span>
          <h3 className="h4 mt16">No analyses yet</h3>
          <p className="small mt8" style={{ maxWidth: "46ch", margin: "8px auto 0" }}>
            Upload a rental agreement, loan sanction letter or offer letter above and ClauseWise
            will break it into clauses, score each one and show which Indian Acts apply.
          </p>
        </div>
      ) : (
        <ul className="stack g10 mt16">
          {documents.map((doc) => (
            <li key={doc.id} className="saved-row-wrap">
              <a className="saved-row" href={`/analysis/${doc.id}`} style={{ flex: 1 }}>
                <span className="file-icon">
                  <Icon name="doc" />
                </span>
                <span className="saved-main">
                  <b>{doc.filename}</b>
                  <span className="small">
                    analysed {new Date(doc.createdAt).toLocaleString()}
                  </span>
                </span>
                <Icon name="chev" className="saved-chev" />
              </a>
              <button
                className="saved-del btn btn-ghost btn-icon btn-sm"
                aria-label={`Delete ${doc.filename}`}
                onClick={() => setConfirming(doc)}
              >
                <Icon name="trash" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {confirming ? (
        <DeleteDialog
          doc={confirming}
          busy={busy}
          onCancel={() => setConfirming(null)}
          onConfirm={() => void remove(confirming)}
        />
      ) : null}
    </>
  );
}

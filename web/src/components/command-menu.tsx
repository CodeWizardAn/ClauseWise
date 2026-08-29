"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Icon } from "@/components/icon-sprite";

/**
 * ⌘K palette.
 *
 * The design prototype listed five hardcoded documents. This one lists the
 * signed-in user's real saved analyses, fetched from GET /api/documents — the
 * same ownership-scoped endpoint the dashboard uses. It returns filenames and
 * timestamps only; nothing is decrypted for this list.
 */
interface SavedDocument {
  id: string;
  filename: string;
  createdAt: string;
}

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const [docs, setDocs] = useState<SavedDocument[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load once the palette is first opened, so the shell costs no request.
  useEffect(() => {
    if (!open || docs !== null) return;
    let cancelled = false;
    fetch("/api/documents")
      .then((r) => (r.ok ? r.json() : { documents: [] }))
      .then((p) => {
        if (!cancelled) setDocs(p.documents ?? []);
      })
      .catch(() => {
        if (!cancelled) setDocs([]);
      });
    return () => {
      cancelled = true;
    };
  }, [open, docs]);

  const hits = useMemo(() => {
    const rows = [
      ...(docs ?? []).map((d) => ({
        label: d.filename,
        hint: `analysed ${new Date(d.createdAt).toLocaleString()}`,
        icon: "doc" as const,
        href: `/analysis/${d.id}`,
      })),
      {
        label: "Dashboard",
        hint: "Upload a document and see your saved analyses",
        icon: "home" as const,
        href: "/dashboard",
      },
    ];
    const t = q.trim().toLowerCase();
    return t ? rows.filter((c) => (c.label + c.hint).toLowerCase().includes(t)) : rows;
  }, [q, docs]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setI(0);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const h = () => setOpen(true);
    window.addEventListener("cw:open-command", h);
    return () => window.removeEventListener("cw:open-command", h);
  }, []);

  if (!open) return null;

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <div className="cmd-scrim" onClick={() => setOpen(false)}>
      <div
        className="cmd"
        role="dialog"
        aria-modal="true"
        aria-label="Search your analyses"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cmd-input">
          <Icon name="search" />
          <input
            ref={inputRef}
            value={q}
            placeholder="Search your saved analyses…"
            aria-label="Search your saved analyses"
            onChange={(e) => {
              setQ(e.target.value);
              setI(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setI((n) => Math.min(n + 1, hits.length - 1));
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                setI((n) => Math.max(n - 1, 0));
              }
              if (e.key === "Enter" && hits[i]) go(hits[i].href);
            }}
          />
        </div>
        <div className="cmd-list">
          {docs === null ? (
            <p className="cmd-empty">Loading your analyses…</p>
          ) : hits.length === 0 ? (
            <p className="cmd-empty">Nothing matches “{q}”.</p>
          ) : (
            hits.map((c, n) => (
              <button
                key={c.href + c.label}
                className={`cmd-row${n === i ? " on" : ""}`}
                onMouseEnter={() => setI(n)}
                onClick={() => go(c.href)}
              >
                <Icon name={c.icon} />
                <span className="cmd-label">{c.label}</span>
                <span className="tiny">{c.hint}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

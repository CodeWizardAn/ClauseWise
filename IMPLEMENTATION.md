# IMPLEMENTATION.md — Project Constitution

> **Read this file fully before doing anything. This is the single source of truth.**
> When in doubt, this document wins over any assumption. Do not re-decide things
> that are marked LOCKED. If something is genuinely ambiguous, ask before coding.

---

## 0. How to use this document (for the AI agent)

- This file is the **constitution**. It defines what we are building and the rules.
- Work happens in **phases**. You will be given one phase at a time as a short
  "work order." Do **only** the current phase. Do not build ahead.
- Every phase ends with a **Definition of Done (proof of work)** — a concrete,
  visible output the human will verify before moving on.
- Full build-level detail is provided **only for Phase 0** below. Phases 1–5 are
  mapped at overview level; detail for each will be added when we reach it.
  **Do not implement Phases 1–5 yet.**

### THE GUARDRAIL (most important rule)
Sibling folders in the parent directory (the three reference codebases —
ClauseGuard, Legale/GDG-BBY, rfp_haki) are **READ-ONLY INSPIRATION**.
- **NEVER** import from them, copy files from them, add them as dependencies, or
  wire into them.
- You may read them to understand a *pattern*, then **re-implement it by hand**,
  cleanly, in this project.
- All code lives in **this** project folder only.
- These three projects were audited and found to have serious flaws. We are
  copying their *good ideas*, never their *code*.

---

## 1. What we are building (the product)

A **citizen-facing Indian legal-document simplifier**. A user (a tenant, borrower,
student, gig worker) uploads a legal document they can't fully understand — a
loan agreement or rental agreement — and the app:

1. Reads it **locally** (the raw file never goes to a third party).
2. **Redacts** their personal identifiers (PAN, Aadhaar, phone, etc.) before any
   AI ever sees the text.
3. Extracts the real financial figures (EMI, rent, deposit) and, using the user's
   own income, **computes an affordability verdict deterministically** (real math,
   never guessed by an LLM).
4. Runs an **Omission Radar** — flags protective clauses that are *missing*.
5. Scores each clause for risk, **grounded in actual Indian statutes**, and cites
   them (with a live Indian Kanoon link when available).
6. Answers plain-language questions about the document (grounded RAG).
7. Optionally explains everything in **Hindi/Marathi**.

**The one-line pitch:** *"ChatGPT tells you what a contract says. We tell you
whether it's safe for YOU to sign — in your language, with the real Indian law
cited, and without your PAN or salary ever leaving your control."*

### What makes it NOT an AI wrapper
The core is **deterministic**. Affordability is arithmetic. Omission is a
checklist. Redaction is pattern-matching + validation. The LLM is used **only**
where language genuinely varies (understanding a clause's meaning, phrasing an
explanation), and **every AI call has a deterministic fallback**. If every LLM is
down, the app still gives a useful, correct result.

---

## 2. Target user & why it matters

- **Users:** tenants, borrowers, students, gig workers in India — people who sign
  loan/rental/ToS documents they can't parse, often not in their first language,
  with no lawyer.
- **Why it matters:** they get trapped by unfair or unenforceable clauses (illegal
  deposits, unregistered 11-month rent tricks, penal interest beyond RBI norms),
  and by signing things they didn't understand.
- **Validation:** the problem recurs across three prior independent build attempts
  and a funded commercial product (Contracko) — the need is real; the
  citizen-facing, Indian-law, privacy-first version is unserved.

---

## 3. LOCKED technical decisions

| Layer | Choice | Notes |
|---|---|---|
| Frontend | Next.js (App Router) + TypeScript | production-grade |
| UI | Tailwind + shadcn/ui + Motion + lucide-react | own the components |
| Data fetching | TanStack Query | |
| Charts | Recharts | for the FOIR gauge / risk visuals |
| App backend | **Next.js API routes (TypeScript)** | **API keys server-side ONLY — never in the browser bundle** |
| Engine sidecar | **Python + FastAPI** | does ONLY: Presidio redaction, OCR, IndicTrans2. No auth, no DB, no business logic. |
| Database | **Neon Postgres + pgvector** | the vector store IS the database |
| ORM | **Drizzle** | TS-native, Neon-optimized |
| Auth | **Clerk** | managed auth — we do NOT hand-roll auth (all 3 repos botched hand-rolled auth) |
| Deterministic engines | **TypeScript in Next.js** | FOIR + Omission live here, keeps the sidecar tiny |
| LLM — ingestion | **Gemini** | native PDF, long context |
| LLM — chat/scoring | **Groq** | fast, open models |
| LLM interface | **Vercel AI SDK** | unified, streaming, swappable |
| Citations | **Indian Kanoon API** (garnish) + **local statute-mapping table** (reliable backbone) | app must work if IK is down |
| Encryption at rest | **AES-256-GCM** | authenticated; key from env/secrets, NEVER stored next to data |
| Encryption in transit | **TLS** | via hosting |
| Run everything | **docker-compose** | one command to start the whole system |

**Model-string rule:** verify every LLM model ID against the live provider before
relying on it. Two of the three reference projects shipped **dead model names** that
silently broke everything. Never assume a model string is valid — confirm it.

---

## 4. Feature scope (tiered)

### TIER 1 — The spine. MUST work, deterministically. Demo-perfect.
1. **Local document ingestion** — PDF/DOCX/TXT → text on our own server → raw file
   deleted. OCR fallback for scans. *(inspiration: ClauseGuard parser + Haki OCR)*
2. **Clause segmentation** — 3-tier split (numbered-regex → paragraph → chunk).
   *(inspiration: ClauseGuard)*
3. **PII redaction (reversible)** — detect PAN/Aadhaar/phone/account/name locally,
   tokenize before any AI call, restore in the answer. **Keeps financial figures on
   purpose.** *(our Presidio module; lesson from Haki + ClauseGuard's redaction bug)*
4. **Affordability verdict** — extract real EMI/rent/deposit, take user income +
   existing EMIs, compute **FOIR/DTI in code**, output safe/caution/danger. Numbers
   computed, never LLM-guessed. *(ClauseGuard idea + Haki deterministic-core architecture)*
5. **Adaptive interrogation** — ask meaningful questions (salary, existing EMIs,
   tenure, intent) via a rule-driven flow before the verdict. *(our idea)*
6. **Omission Radar** — check the document against a per-doc-type checklist of
   expected protective clauses; flag what's **missing**. *(ClauseGuard's best idea)*

### TIER 2 — Intelligence layer. LLM-powered, grounded, fallback-safe.
7. **Clause risk scoring** — 5-band rubric; **severity re-derived in code** from the
   numeric score (kills LLM inconsistency). *(ClauseGuard pattern)*
8. **Deterministic fallback everywhere** — every AI call degrades to code output,
   never a blank or silent placeholder. *(Legale patternMatcher + Haki capability flags)*
9. **Statute grounding + mapping table** — doc-type → governing Indian Acts +
   encoded illegal-clause rules (deposit caps, unregistered-11-month, penal-interest).
   *(Legale statute-injection + our local table)*
10. **Indian Kanoon citation** — real linkable statute/case ref per flag; falls back
    to local table if IK is down/out of balance. **Requires "powered by IKanoon"
    attribution.** *(Indian Kanoon API — garnish)*
11. **Grounded Q&A (RAG)** — chat over the redacted document on pgvector; answers
    cite the clause. *(Legale chat, rebuilt as real RAG)*
12. **Type-branched analysis prompt** — fixed schema branching on doc type
    (loan/rent/employment/will). *(Legale)*
13. **Auth + per-user ownership** — every document belongs to one user; every
    endpoint checks ownership + RLS. *(Haki RBAC done right)*
14. **Structured extraction card** — parties, dates, amounts, obligations at a glance.
    *(Contracko)*

### TIER 3 — Polish. Cut first if time runs out.
15. Multilingual explanation (Hindi/Marathi) — *IndicTrans2/Bhashini + Legale*
16. Version comparison (semantic diff) — *Contracko concept + our idea*
17. Glossary tooltips — *Contracko + Indian legal glossary*
18. Negotiate-this script generator — *our idea*
19. PDF report export — *ClauseGuard*

**Rule:** Tier 1 must be bulletproof. Tier 2 works but degrades gracefully.
Tier 3 is bonus. Nail Tiers 1–2 and we have a winning, non-wrapper product.
**Do not build all 19 half-way. Build the spine fully first.**

### Hero documents for the demo
**Loan agreement** and **rental agreement** only. These decide the Omission
checklists and statute mappings we build. Do not try to support "all documents."

---

## 5. Security rules (NON-NEGOTIABLE — baked into every phase)

Our differentiator is **security we can prove**. Every claim must match the code
and be demonstrable live. The three reference projects all *claimed* privacy and
*leaked* it — we must not repeat any of this:

- **Keys server-side only.** Never in the browser bundle. Never in a URL. (Legale's fatal sin)
- **Redaction keeps financial figures, drops identifiers.** Test that redaction does
  NOT eat the EMI/rent/deposit the affordability engine needs. (ClauseGuard's bug)
- **Ownership check on EVERY document endpoint** + Postgres RLS. Log in as user B,
  try user A's document ID → must get 403. (all 3 repos failed this)
- **No hardcoded secret fallbacks.** Fail loudly if a secret is missing. (Legale JWT hole)
- **No seeded admin/demo accounts.** (Haki's `admin123` backdoor)
- **Tokens in headers, never URLs.** (all 3 erred here)
- **AES-256-GCM at rest**, key from env/secrets, never stored next to the data.
  Say AES-256-GCM only if it IS AES-256-GCM.
- **Raw uploaded files are ephemeral** — deleted immediately after extraction; only
  encrypted/redacted-where-appropriate data persists.
- **Failures are visible.** No silent placeholder text. No silent truncation (never
  cap clause count and report it as complete — ClauseGuard's sin).
- **Legal disclaimer present** — this is informational, not legal/financial advice.
- **Local-mode escape hatch** (later phase): option to run the LLM locally (Ollama)
  so the document never leaves the server at all.

**Honesty rule for the demo/pitch:** state limitations proactively (redaction isn't
100%; it's a prototype; no formal pen-test). Overclaiming is what got the reference
projects caught. Every security claim we make, we can show on screen.

---

## 6. Architecture (input → output)

```
[Browser: Next.js UI]
      │  upload (loan/rental doc)
      ▼
[Next.js API route]  ── auth (Clerk), ownership check
      │
      ├─►[Python FastAPI sidecar]
      │        1. extract text (PyMuPDF / OCR)
      │        2. PII redaction (Presidio + Indian recognizers) → redacted text + mapping
      │        (raw file deleted; mapping kept server-side only)
      │
      ▼
[Next.js: deterministic engines (TypeScript)]
      3. clause segmentation
      4. affordability engine (FOIR/DTI — pure math)
      5. omission radar (checklist per doc-type)
      │
      ▼
[Next.js: LLM layer via Vercel AI SDK — on REDACTED text only]
      6. clause risk scoring (severity re-derived in code)
      7. statute grounding (local table + Indian Kanoon)
      8. grounded Q&A (RAG on pgvector)
      │  every call has a deterministic fallback
      ▼
[Next.js: restore real values from mapping] → verdict + cited risks + Q&A
      ▼
[Neon Postgres + pgvector]  ── encrypted at rest, per-user RLS
```

**Key invariant:** the LLM never receives raw PII. Steps 1–5 and the restore step
are 100% local/deterministic. Only redacted text reaches an external LLM.

---

## 7. Phase roadmap (overview — build ONE phase at a time)

- **Phase 0 — Skeleton + one vertical slice.** *(detailed below — build this now)*
- **Phase 1 — Security spine (redaction).** Wire the Python sidecar + Presidio;
  show original vs. redacted + privacy log. *(not yet)*
- **Phase 2 — Deterministic engines.** Affordability (FOIR) + Omission Radar; a
  verdict with NO LLM involved. *(not yet)*
- **Phase 3 — AI intelligence layer.** Clause risk scoring + grounded Q&A, each with
  a deterministic fallback (kill the key → still works). *(not yet)*
- **Phase 4 — India grounding + persistence + auth.** Statute table, Indian Kanoon
  citation, Clerk auth + ownership + RLS, encrypted save/retrieve. *(not yet)*
- **Phase 5 — Polish.** Multilingual, version compare, glossary, negotiate-script,
  PDF export. *(not yet)*

Each phase produces a working, demoable thing. We never rely on "it all comes
together at the end."

---

## 8. PHASE 0 — Skeleton + one vertical slice (BUILD THIS NOW)

### Goal
Prove the pipe works end-to-end with **zero cleverness**: a user can upload a
document and see its extracted clauses on screen. No AI, no auth, no DB, no
redaction, no encryption yet. Just: file in → text out → clauses on screen.

### Scope (do exactly this, nothing more)
1. **Next.js app** (App Router, TypeScript, Tailwind, shadcn/ui) with a single page:
   an upload control + a results area.
2. **Python FastAPI sidecar** with ONE endpoint: `POST /extract` that accepts a
   PDF/DOCX/TXT file, extracts its text (PyMuPDF for PDF, python-docx for DOCX,
   plain read for TXT), and returns the extracted text as JSON.
3. **Clause segmentation** in the Next.js side (TypeScript): take the returned text
   and split it into clauses using a simple 3-tier approach (numbered-clause regex →
   paragraph split → ~110-word chunks). Display each clause as a card.
4. **docker-compose** that starts both services with one command, plus a top-level
   **README** with exact run instructions.
5. **Env-based config** — the Next.js app reads the sidecar URL from an env var
   (no hardcoded localhost in committed code beyond a documented default).

### Explicitly NOT in Phase 0
- No LLM calls. No Presidio/redaction. No auth/Clerk. No database/Neon. No
  encryption. No Indian Kanoon. No affordability/omission logic. No styling beyond
  clean shadcn defaults. Do not scaffold these — we add them in later phases.

### Constraints
- Follow every rule in sections 3 and 5 that applies (env config, no hardcoded
  secrets, clean deps). Even though there's little security surface yet, set the
  habits now: proper `.gitignore` (no node_modules, no venv, no caches committed),
  clean dependency files (correct encoding, only what's used).
- The Python sidecar does ONE job (extract). No auth/DB/business logic in it.
- Keep it minimal and readable. This is a skeleton, not a feature.

### Definition of Done (proof of work — the human will verify these)
1. `docker-compose up` (or the documented command) starts both services.
2. Opening the app shows an upload control.
3. Uploading one of the two hero documents (a loan or rental PDF) displays its text
   **split into clause cards** on screen.
4. Uploading a DOCX and a TXT also works.
5. The sidecar URL is configurable via env; nothing sensitive is hardcoded or
   committed; `.gitignore` excludes node_modules/venv/caches.
6. A top-level README explains exactly how to run it.

When all six are true, Phase 0 is done. Stop and report back with what was built
and how to run it. Do not start Phase 1.

---

## 9. Do-not-repeat checklist (from the three audits — keep visible)

- ✗ keys in the browser bundle / in URLs  → ✓ server-side only, headers only
- ✗ any user reads any document           → ✓ ownership check + RLS everywhere
- ✗ claimed AES-256, used AES-128, stored plaintext → ✓ real AES-256-GCM, verified
- ✗ redaction strips the numbers we need  → ✓ keep financial figures, drop IDs
- ✗ dead model strings, silent failure    → ✓ verified models, visible failures
- ✗ silent truncation reported as complete → ✓ honest counts, no silent caps
- ✗ hardcoded secret fallback / admin123  → ✓ fail loudly, no seeded accounts
- ✗ fabricated data used for real actions  → ✓ real statutes, clear "sample" markers
- ✗ no disclaimer on legal/financial output → ✓ disclaimer present
- ✗ "how do I run this?" unanswerable      → ✓ one-command run + README
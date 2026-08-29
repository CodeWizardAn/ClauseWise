# ClauseWise

Upload an Indian loan or rental agreement and see it broken into its individual
clauses.

This repository is at **Phase 5** of the plan in [IMPLEMENTATION.md](IMPLEMENTATION.md):
the skeleton, the security spine, the deterministic engines, and the AI layer on
top of them. A document goes in, its text is extracted on our own server, the
personal identifiers are redacted out of it, and you get back the clauses with
plain-language risk explanations, an affordability verdict, a list of protective
clauses the document is missing, and a chat box grounded in the document.

**The deterministic core does not depend on the AI.** Affordability is
arithmetic, the Omission Radar is a checklist, and clause risk has a rule-based
engine underneath it. Delete the API keys and the app still runs: the AI
features degrade to rule-based output with a visible notice, and nothing else
changes.

**Analyses belong to one account.** Sign-in is handled by Clerk — no
hand-rolled sessions. Saved analyses live in Neon Postgres, encrypted at rest
with AES-256-GCM, and **every** read, write and delete is checked against the
owner's user id. Requesting another account's document returns 403, never the
data.

**Findings are grounded in named Indian Acts.** A local, code-defined table maps
each document type to the Acts that govern it, and a set of deterministic rules
flags conditions worth checking — a lease running past eleven months with no
registration clause, a penal rate that compounds fast, a deposit large relative
to the rent. The local table is load-bearing and works entirely offline.

**Indian Kanoon adds live links on top of that.** Where an Act in the local
table has a matching page on Indian Kanoon, the analysis carries a clickable
link to it. That lookup is an enhancement, never a dependency: if the token is
missing, the API is down, slow, out of balance, or simply returns nothing
convincing, the Act still appears with its name and the page renders exactly as
it would without Indian Kanoon. Results are cached per Act — the same handful of
Acts recur across every document, so a warm cache costs nothing. Wherever an
Indian Kanoon link is shown, a "powered by IKanoon" attribution is shown with
it, as their terms require.

**The analysis reads in Hindi, Marathi, Tamil or Telugu.** English is the
default and the fallback. Two paths feed it, and they are split on purpose:

- **Fixed prose** — omission explanations, statute summaries, the affordability
  verdict, interface labels — is translated by IndicTrans2
  (`ai4bharat/indictrans2-en-indic-dist-200M`) **once, at build time**, into
  `src/lib/i18n/catalog.json`. Switching language is then a dictionary lookup,
  so it is instant. Translating live would cost ~0.4s per string and stall a
  36-clause page for half a minute.
- **Per-document prose** — clause explanations and chat answers — is generated
  directly in the target language by the LLM, which costs no extra latency.

**Numbers, amounts, percentages, Act names and Indian Kanoon links are never
translated.** They are replaced with `{0}` slots before translation and restored
afterwards. This is measured, not precautionary: sent through the model inline,
"Registration Act, 1908" comes back as पंजीकरण अधिनियम in Hindi, நோंदणी कायदा in
Marathi, பதிவுச் சட்டத்தின் in Tamil and రిజిస్ట్రేషన్ చట్టం in Telugu. A reader
searching for the Act under a translated name would not find it. Any translation
that loses a slot is discarded at build time and that string stays English.

Rebuild the catalogue with `npm run i18n:build` (the engine must be running and
`HF_TOKEN` must be set — the model is gated). Without the catalogue, or with the
engine's translation disabled, every string simply renders in English.

We do not take Indian Kanoon's top-ranked result on trust: it ranked "Section 11
in The Land Acquisition Act, 1894" first for a Registration Act query. Results
are scored against the Act name and a weak match is discarded, because a wrong
link wearing a real URL is worse than no link.

Two honesty rules are enforced in that layer. **Acts are cited by name only** —
no section numbers appear anywhere, because a confidently-wrong section reads as
authority. And where a norm **varies by state**, the flag says "check your
state's limit" rather than asserting illegality; the Model Tenancy Act is
labelled as a model law that applies only where a state has enacted it.

### Verified model IDs

Model strings are checked against the live APIs, never assumed — retired IDs
that fail silently are a real hazard. Confirmed with real completions on
2026-08-29:

| Role | Model | Note |
|---|---|---|
| Primary | `openai/gpt-oss-120b` (Groq) | Groq no longer serves the Llama 3.x IDs commonly hardcoded in examples. |
| Fallback | `gemini-3.6-flash` (Gemini) | `gemini-2.5-flash` is refused for new keys; Google's error names this as its replacement. |

Both are overridable with `GROQ_MODEL` / `GEMINI_MODEL` without a code change.

---

## What it does today

1. You upload a PDF, DOCX or TXT file.
2. The Next.js server passes it to a local Python sidecar, which extracts the
   text in memory. **The file is never written to disk.**
3. The sidecar redacts the personal identifiers out of that text — PAN, Aadhaar,
   IFSC, GSTIN, mobile, email, and names and places from spaCy NER — replacing
   each with a numbered placeholder such as `[PAN_1]` or `[NAME_2]`. The mapping
   back to the real values is returned to the Next.js server and **never sent to
   the browser**. Redaction happens before anything else sees the text.
4. **Financial figures are deliberately preserved.** Rent, EMI, deposit,
   interest rates and penalty percentages survive redaction untouched, because
   Phase 2's affordability engine is built on them. Only amounts sitting next to
   an income keyword (salary, CTC, gross pay) are tokenised.
5. The Next.js server splits the **redacted** text into clauses with a
   deterministic three-tier rule — no model is involved:
   - **numbered** — real clause markers (`1.`, `2.3`, `Clause 4`, `Section 7`)
   - **paragraph** — blank-line separated paragraphs, if there are no markers
   - **chunk** — fixed 110-word chunks, as a last resort
6. The **document type** is detected from keywords (loan, rental, employment,
   NDA, service, or unrecognised), along with whether it imposes financial
   obligations. This gates what runs next.
7. If it is a financial document, the **affordability engine** reads the EMI or
   rent, deposit, interest rate and penalty rate out of the text. You enter your
   net monthly take-home and existing obligations, and it computes
   FOIR = (existing + new) ÷ income × 100 in code, returning 🟢 safe (≤40%),
   🟡 caution (≤50%) or 🔴 risky (>50%) with the rupee arithmetic shown. Your
   income is used in the browser and is not sent anywhere. Non-financial
   documents say so and skip the engine.
8. The **Omission Radar** checks the document against a checklist of protective
   clauses for its type and lists what is *missing*, with one line on why each
   matters. Loan and rental have deep checklists; anything else falls back to a
   general contract checklist.
9. Each clause gets a **plain-language risk explanation** and a 0-100 score from
   the model, which sees the redacted text only. The severity band — Clean, Low,
   Medium, High, Critical — is **re-derived in code** from that score; any label
   the model volunteers is discarded, so the same score always means the same
   band. Real values are restored into the displayed text server-side.
10. A **chat box** answers questions using only this document's clauses and cites
    the ones it used. Asked something the document does not cover, it says so
    rather than inventing an answer.
11. Every clause is rendered as a card, and a privacy panel shows how many items
   were redacted alongside a side-by-side view of the original text against the
   redacted version. Nothing is capped, sampled or truncated, and the interface
   tells you which rule was used and why.

---

## Running it

### With Docker (one command)

```bash
cp .env.example .env      # optional; the defaults work as-is
docker compose up --build
```

Then open **<http://localhost:3000>**.

Only the web app is published to your machine. The extraction sidecar is
reachable only from the web container, over the private compose network.

### Without Docker

Two terminals, from the repository root.

**Terminal 1 — the extraction engine:**

```bash
cd engine
python3 -m venv .venv
./.venv/bin/python -m pip install -r requirements.txt
./.venv/bin/python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

**Terminal 2 — the web app:**

```bash
cd web
npm install
npm run dev
```

Then open **<http://localhost:3000>**.

> Use `localhost`, not `127.0.0.1`. Next.js's development server rejects asset
> requests from an origin it does not recognise, and the page will load without
> its JavaScript if you use the raw IP.

### Try it

Three synthetic documents are in [`samples/`](samples) — a loan agreement PDF, a
rental agreement DOCX and a plain-text sanction letter. They are **invented for
testing**, are marked as such on every page, and describe no real person.

---

## Configuration

Copy `.env.example` to `.env` to change anything. Both variables are optional
and have working defaults.

| Variable | Default | Meaning |
|---|---|---|
| `ENGINE_URL` | `http://127.0.0.1:8000` | Where the web app reaches the sidecar. Docker Compose sets this to `http://engine:8000`. |
| `MAX_UPLOAD_BYTES` | `10485760` (10 MiB) | Largest document accepted. Set it on both services. |
| `SPACY_MODEL` | `en_core_web_md` | The spaCy model used for name and place detection. |
| `GROQ_API_KEY` | unset | Primary AI provider. Optional — without it the AI features degrade visibly. |
| `GEMINI_API_KEY` | unset | Fallback AI provider, tried when Groq fails. |
| `GROQ_MODEL` / `GEMINI_MODEL` | verified defaults | Override the model IDs without editing code. |
| `DATABASE_URL` | — | Neon Postgres connection string. **Required**; there is no default. |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | — | Clerk publishable key. Public by design; it ships in the browser bundle. |
| `CLERK_SECRET_KEY` | — | Clerk secret key. **Required**, server-only. |
| `ENCRYPTION_KEY` | — | 32 bytes, base64. **Required**; a wrong-size key is refused rather than padded. |
| `INDIANKANOON_API_KEY` | unset | Indian Kanoon token (`INDIANKANOON_API_TOKEN` also accepted). Optional — without it, statutes show names without links. |
| `HF_TOKEN` | unset | HuggingFace token, needed only to rebuild the translation catalogue. The IndicTrans2 repos are gated. |
| `DISABLE_TRANSLATION` | unset | Set to any value to turn the sidecar's `/translate` off. The app is unaffected; it uses the prebuilt catalogue. |

Every required secret fails loudly on absence — the app refuses to serve rather
than falling back to a default. A 16-byte key is rejected by name instead of
being silently used as AES-128.
| `WEB_PORT` | `3000` | Host port for the web app under Docker Compose. |

There are no secrets in Phase 0 — no API keys, no database URL, no auth. When
those arrive they live on the server only, and a missing one will fail loudly
rather than fall back to a default.

---

## Layout

```
clausewise/
├── docker-compose.yml     both services, one command
├── .env.example           configuration template
├── samples/               synthetic test documents
├── engine/                Python + FastAPI sidecar
│   └── app/
│       ├── main.py        POST /extract, GET /health
│       ├── extraction.py  PDF / DOCX / TXT to text
│       ├── redaction.py   reversible PII redaction
│       ├── recognizers.py Indian identifier recognizers
│       ├── parties.py     party names from document structure
│       ├── translation.py IndicTrans2, used at catalogue build time
│       ├── financial.py   protects amounts from redaction
│       └── verhoeff.py    Aadhaar check digit
└── web/                   Next.js + TypeScript + Tailwind + shadcn/ui
    └── src/
        ├── app/
        │   ├── page.tsx              upload page
        │   └── api/analyze/route.ts  upload -> sidecar -> clauses
        ├── components/               upload form, privacy/affordability/omission panels
        ├── db/
    │   ├── schema.ts             documents table (Drizzle)
    │   └── client.ts             Neon connection
    └── lib/
            ├── segment.ts            three-tier clause segmentation
            ├── doc-type.ts           deterministic document-type detection
            ├── figures.ts            reads EMI / rent / deposit / rates
            ├── affordability.ts      FOIR, computed in code
            ├── omission.ts           generic Omission Radar engine
            ├── checklists.ts         per-document-type checklists (data)
            ├── statutes.ts           document type -> governing Indian Acts
            ├── statute-rules.ts      deterministic legal-risk rules
            ├── ik/client.ts          Indian Kanoon search (server-only)
            ├── ik/cache.ts           per-Act cache, protects prepaid balance
            ├── ik/enrich.ts          attaches links, never throws
            ├── env.ts                required secrets, fail-loud
            ├── crypto.ts             AES-256-GCM at rest
            ├── auth.ts               Clerk session -> user id
            ├── documents-repo.ts     persistence + ownership checks
            └── config.ts             server-only configuration
```

The sidecar does exactly one job: turn bytes into text. It holds no auth, no
database and no business logic. Every engine we add later — affordability,
omission, risk scoring — is TypeScript in the Next.js app.

---

## Limits worth knowing

- **Redaction is not perfect, and we will not claim it is.** It works in three
  passes, and they are not equally reliable:

  1. **Structured identifiers** (PAN, Aadhaar, IFSC, GSTIN, mobile, email) are
     matched by pattern and, where the format allows, validated — an Aadhaar
     must pass its Verhoeff check digit, a PAN must carry a valid holder-type
     character. **Reliable.**
  2. **Named parties** are extracted from the document's own structure, not from
     a model: "Mr. X S/O Y", "... (hereinafter referred to as the LANDLORD)",
     "LANDLORD: X", "IN WITNESS WHEREOF X and Y". Once a party is identified
     once, every occurrence of that name is redacted by exact match — which is
     what catches the signature block and the witness list. **Reliable**, and it
     does not depend on the model recognising a regional name.
  3. **Other incidental names and places** come from a statistical NER model,
     with partial spans widened across adjacent words and PIN codes. This is
     **best-effort and does miss some**: in the sample loan agreement the
     borrower's address is redacted in full while the lender's registered office
     a few lines above is missed entirely, because the model never flagged it.

  Role words — landlord, tenant, lender, borrower, licensee — are never
  redacted; only the person names attached to them. Treat the privacy panel as a
  report of what was caught, not a guarantee that nothing was missed.
- **The AI can be unavailable, and says so.** Groq's free tier allows 8,000
  tokens per minute, so a long document can exhaust it; those clauses fall back
  to the rule-based engine and are labelled `rule-based` on screen. The chat box
  falls back to keyword search over the clauses and labels that too. It never
  shows invented text in place of a failure.
- **The Omission Radar matches patterns, not meaning.** A protective clause
  worded unusually can be reported as missing when it is present, and the
  reverse. It is a prompt to look, not a legal review.
- **Affordability uses the figures we could read.** If the EMI or rent is
  written in a way the extractor does not recognise, the new obligation is
  treated as zero and the FOIR will be too low. The figure we used is shown on
  screen next to the text it came from, so you can check it.
- **Scanned PDFs are not readable.** There is no OCR in this build. A PDF with
  no text layer is reported as such rather than silently returning nothing.
- **Encrypted PDFs are rejected**, with the reason shown.
- Uploads are capped at 10 MiB by default.
- Clause segmentation is a text rule, not a legal parser. It splits on how a
  document is *written*, and an unusually formatted agreement will fall back to
  paragraph or chunk mode — which the interface tells you it has done.

---

## Disclaimer

ClauseWise provides information about documents you upload. It is **not legal or
financial advice**. Always consult a qualified professional before signing.

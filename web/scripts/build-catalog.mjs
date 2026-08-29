/**
 * Build the translation catalogue.
 *
 * Run once, offline: `npm run i18n:build` (the engine must be running).
 *
 * Every user-facing English string is enumerated from the data modules,
 * protected (amounts, percentages, statute names and URLs become {0} slots),
 * translated by IndicTrans2 in the sidecar, and written to catalog.json keyed
 * by the protected template.
 *
 * Doing this at build time rather than per request is what keeps the language
 * switcher instant. IndicTrans2 needs ~0.4s per string; a document with 36
 * clauses would stall for half a minute. The catalogue costs nothing at render.
 */

import { execSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const buildDir = path.join(root, ".i18n-build");
const ENGINE = process.env.ENGINE_URL || "http://127.0.0.1:8000";
const LANGS = ["hi", "mr", "ta", "te"];

// Compile the modules we need to plain ESM so this script can import them.
rmSync(buildDir, { recursive: true, force: true });
try {
  execSync(
    `npx tsc src/lib/checklists.ts src/lib/statutes.ts src/lib/statute-rules.ts ` +
      `src/lib/rule-risk.ts src/lib/affordability.ts src/lib/severity.ts src/lib/i18n/protect.ts ` +
      `--outDir ${buildDir} --module esnext --target es2022 --moduleResolution bundler`,
    { cwd: root, stdio: "pipe" },
  );
} catch {
  // tsc exits non-zero because it cannot resolve the "@/..." path alias without
  // the project config. The emitted JavaScript is still correct — those imports
  // are type-only and are erased — so we continue and check the output instead.
}
for (const file of ["checklists", "statutes", "statute-rules", "rule-risk", "affordability", "severity"]) {
  const from = path.join(buildDir, `${file}.js`);
  const src = readFileSync(from, "utf8").replace(/from "@\/lib\/([a-z-]+)"/g, 'from "./$1.mjs"');
  writeFileSync(from.replace(/\.js$/, ".mjs"), src);
  rmSync(from);
}
{
  // protect.js sits one level deeper, so its import of statutes needs "../".
  const from = path.join(buildDir, "i18n", "protect.js");
  const src = readFileSync(from, "utf8").replace(/from "@\/lib\/([a-z-]+)"/g, 'from "../$1.mjs"');
  writeFileSync(from.replace(/\.js$/, ".mjs"), src);
  rmSync(from);
}

const { checklistFor } = await import(path.join(buildDir, "checklists.mjs"));
const { STATUTES } = await import(path.join(buildDir, "statutes.mjs"));
const { evaluateStatuteRules } = await import(path.join(buildDir, "statute-rules.mjs"));
const { assessClause } = await import(path.join(buildDir, "rule-risk.mjs"));
const { computeAffordability } = await import(path.join(buildDir, "affordability.mjs"));
const { protectText } = await import(path.join(buildDir, "i18n", "protect.mjs"));

const strings = new Set();
const add = (value) => {
  if (typeof value === "string" && value.trim().length > 2) strings.add(value.trim());
};

// 1. Omission checklists — titles and why-it-matters, for every document type.
for (const type of ["rental", "loan", "other"]) {
  for (const item of checklistFor(type).items) {
    add(item.title);
    add(item.why);
  }
}

// 2. Statutes — summaries and caveats. Names are NEVER translated.
for (const statute of Object.values(STATUTES)) {
  add(statute.summary);
  add(statute.caveat);
}

// 3. Statute rules — drive every rule so each string is emitted at least once.
const omission = (missingIds) => ({
  checklistLabel: "x", checkedCount: 0, presentCount: 0, missingCount: missingIds.length,
  present: [], missing: missingIds.map((id) => ({ id, title: "", why: "", present: false, evidence: null, cancelledBy: null, statuteIds: [] })),
});
const money = (amount) => ({ kind: "rent", amount, matchedText: "", context: "" });
for (const context of [
  { type: "rental",
    text: "period of twenty four (24) months. lock in period. The Licensor may terminate at any time without assigning any reason. reserves the right to revise the terms.",
    figures: { emi: null, rent: money(25000), deposit: money(250000), interestRate: null, penaltyRate: null, monthlyObligation: null },
    omission: omission(["registration"]) },
  { type: "loan",
    text: "reserves the right to revise the rate of interest.",
    figures: { emi: null, rent: null, deposit: null, interestRate: null,
               penaltyRate: { kind: "penalty", percent: 3, matchedText: "3%", context: "penal interest 3% per month" }, monthlyObligation: null },
    omission: omission(["prepayment-terms", "grievance-redressal"]) },
]) {
  for (const flag of evaluateStatuteRules(context)) {
    add(flag.title);
    add(flag.why);
    add(flag.observed);
  }
}

// 4. Rule-based clause risk notes.
const RISK_PROBES = [
  "at the sole discretion of the Licensor", "without further notice", "penal interest of 3% per month",
  "reserves the right to revise the terms", "sole arbitrator appointed by the Lender", "the Borrower waives all claims",
  "shall indemnify and hold harmless", "This Agreement shall not be registered", "there shall be a lock in period",
  "the fee is non-refundable", "the entire outstanding shall become immediately due and payable",
  "any recovery agent may contact your employer and references", "may assign this agreement without the consent of the Borrower",
  "entitled to enter and inspect at any time", "may terminate without assigning any reason",
  "all repairs including structural repairs shall be borne by the Licensee at the Licensee's own cost",
];
for (const probe of RISK_PROBES) for (const signal of assessClause(probe).signals) add(signal.note);
add(assessClause("nothing notable here").explanation);

// 5. Affordability verdict prose — one per band.
for (const [obligation, income] of [[30000, 100000], [45000, 100000], [62000, 100000]]) {
  const result = computeAffordability({ netMonthlyIncome: income, existingObligations: 0, proposedObligation: obligation });
  add(result.explanation);
}

// 6. Interface labels.
for (const label of [
  "Safe", "Caution", "Risky", "Clean", "Low", "Medium", "High", "Critical",
  "Document type", "Affordability (FOIR)", "Omission Radar", "Privacy",
  "Indian law that governs this document", "Ask about this document",
  "Protective clauses this document does not contain", "Conditions worth checking",
  "Your saved analyses", "Original — stays on this server", "Redacted — what would leave the server",
  "Net monthly take-home", "Existing monthly obligations", "After tax.", "Current EMIs and rent.",
  "Informational only — not financial advice.",
  "Checks are keyword and pattern based, not a legal review. A clause worded unusually may be reported as missing when it is present.",
  "central law", "varies by state", "model law — adoption varies", "regulator directions",
  "check your state's limit", "rule-based", "not in this document",
  // Labels introduced by the design-system port (analysis workspace).
  "What this means for you", "Risk level", "Explain in", "Document", "Insights",
  "Affordability", "Notes from the extractor",
]) add(label);

// Protect, then translate the templates.
const sources = [...strings];
const templates = [...new Set(sources.map((text) => protectText(text).template))];
console.log(`${sources.length} strings -> ${templates.length} unique templates`);

const catalog = {};
for (const lang of LANGS) {
  catalog[lang] = {};
  const started = Date.now();
  for (let i = 0; i < templates.length; i += 32) {
    const batch = templates.slice(i, i + 32);
    const response = await fetch(`${ENGINE}/translate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texts: batch, language: lang }),
    });
    if (!response.ok) {
      console.error(`  ${lang}: engine returned ${response.status} — ${await response.text()}`);
      break;
    }
    const payload = await response.json();
    payload.translations.forEach((value, index) => {
      // Only keep a translation that preserved every slot; a dropped slot would
      // silently lose a rupee figure or an Act name at render time.
      const wanted = (batch[index].match(/\{\d+\}/g) || []).sort().join(",");
      const got = (value.match(/\{\d+\}/g) || []).sort().join(",");
      if (wanted === got) catalog[lang][batch[index]] = value;
    });
    process.stdout.write(`\r  ${lang}: ${Object.keys(catalog[lang]).length}/${templates.length}`);
  }
  console.log(`  (${((Date.now() - started) / 1000).toFixed(0)}s)`);
}

mkdirSync(path.join(root, "src/lib/i18n"), { recursive: true });
writeFileSync(path.join(root, "src/lib/i18n/catalog.json"), JSON.stringify(catalog, null, 1) + "\n");
rmSync(buildDir, { recursive: true, force: true });
console.log("\nwrote src/lib/i18n/catalog.json");
for (const lang of LANGS) console.log(`  ${lang}: ${Object.keys(catalog[lang]).length} entries`);

/**
 * GET /api/samples — list available authentic sample documents.
 * GET /api/samples?file=name — download or fetch a sample file.
 */

import { NextResponse } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

const SAMPLES_DIR = path.resolve(process.cwd(), "..", "samples");

const SAMPLES_METADATA = [
  {
    id: "sample-personal-loan-facility.pdf",
    filename: "sample-personal-loan-facility.pdf",
    title: "Personal Loan Facility Agreement",
    category: "Loan & Banking",
    tag: "₹5 Lakh Loan · 24% Penal Rate · Lien Clause",
    type: "pdf",
  },
  {
    id: "sample-pmay-subsidy-undertaking.pdf",
    filename: "sample-pmay-subsidy-undertaking.pdf",
    title: "PMAY (Urban) Subsidy Undertaking",
    category: "Government Scheme",
    tag: "CLSS ₹2.67L Subsidy · 5-Yr Lock-in · Clawback",
    type: "pdf",
  },
  {
    id: "sample-pm-kisan-guidelines.docx",
    filename: "sample-pm-kisan-guidelines.docx",
    title: "PM-KISAN Guidelines & Ineligibility",
    category: "Government Scheme",
    tag: "₹6,000 Direct Benefit · Statutory Exclusions",
    type: "docx",
  },
  {
    id: "sample-it-employment-service-bond.docx",
    filename: "sample-it-employment-service-bond.docx",
    title: "IT Employment Agreement & Bond",
    category: "Employment & HR",
    tag: "24-Mo Bond · ₹2L Damages · Non-Compete",
    type: "docx",
  },
  {
    id: "sample-residential-lease-bengaluru.docx",
    filename: "sample-residential-lease-bengaluru.docx",
    title: "Residential Leave & Licence (Bengaluru)",
    category: "Rental & Tenancy",
    tag: "₹32k Rent · ₹2L Deposit · Repainting Clause",
    type: "docx",
  },
  {
    id: "sample-education-loan.txt",
    filename: "sample-education-loan.txt",
    title: "Higher Education Loan Agreement",
    category: "Loan & Banking",
    tag: "₹12L Loan · Moratorium Period · Section 80E",
    type: "txt",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedFile = searchParams.get("file");

  if (!requestedFile) {
    return Response.json({ samples: SAMPLES_METADATA });
  }

  // Sanitize filename to prevent directory traversal
  const safeFilename = path.basename(requestedFile);
  const filePath = path.join(SAMPLES_DIR, safeFilename);

  try {
    const fileBuffer = await fs.readFile(filePath);
    const ext = path.extname(safeFilename).toLowerCase();

    let contentType = "text/plain";
    if (ext === ".pdf") contentType = "application/pdf";
    else if (ext === ".docx") {
      contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    }

    return new Response(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${safeFilename}"`,
      },
    });
  } catch {
    return Response.json({ error: "Sample file not found." }, { status: 404 });
  }
}

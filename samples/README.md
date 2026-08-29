# Sample documents

These files are **synthetic test fixtures**. They were written for this project
to exercise the extraction and segmentation pipeline.

- They are not real agreements.
- The people, companies, addresses, PANs, Aadhaar numbers, account numbers and
  phone numbers in them are invented and belong to nobody.
- The PAN and Aadhaar values are *structurally* valid — the Aadhaar passes its
  Verhoeff check digit and the PAN carries a real holder-type character — so
  that the redactor's validation logic is actually exercised. They were made up
  for this purpose and identify no one.
- The loan agreement also carries a deliberately invalid twelve-digit reference
  number (`4321 5678 9012`) to prove the redactor does not flag every long
  number as an Aadhaar.
- Every one carries a "SAMPLE DOCUMENT — FOR TESTING ONLY" line at the top and
  bottom.

| File | Format | Exercises |
|---|---|---|
| `sample-loan-agreement.pdf` | PDF, 2 pages | Numbered clauses across a page break, hard-wrapped lines |
| `sample-rental-agreement.docx` | DOCX | Numbered clauses plus a schedule in a table |
| `sample-education-loan.txt` | TXT | Plain text with numbered clauses |

They deliberately contain realistic identifiers and financial figures, because
later phases must redact the identifiers while keeping the figures intact.

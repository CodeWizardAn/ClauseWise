# ClauseWise Test Samples Library

This directory contains realistic and authentic Indian legal, financial, administrative, and government scheme test documents in `.pdf`, `.docx`, and `.txt` formats for testing all ClauseWise engines.

---

## 📂 Available Test Datasets

### 1. 💳 Loan & Banking Documents
- **`sample-personal-loan-facility.pdf`**
  - **Category**: Personal Loan Sanction & Facility Agreement (Apex Capital Finance Ltd)
  - **Key Terms**: ₹5,00,000 principal, ₹11,740 EMI (60 months), 14.5% floating rate.
  - **Risks Tested**: 24% compounded penal charges (RBI non-compliant), 4% foreclosure penalty, general banker's lien, unilateral interest rate reset.
- **`sample-education-loan.txt`**
  - **Category**: Student / Higher Education Loan Terms
  - **Key Terms**: ₹12,00,000 loan, 10.25% interest, moratorium period during degree + 6 months, Section 80E tax benefit.
- **`sample-loan-agreement.pdf`**
  - **Category**: General Term Loan Agreement with cross-collateralization.

---

### 2. 🏛️ Government Schemes & Circulars
- **`sample-pmay-subsidy-undertaking.pdf`**
  - **Category**: Pradhan Mantri Awas Yojana (Urban) Credit Linked Subsidy Scheme (PMAY-U CLSS)
  - **Key Terms**: ₹2,67,000 upfront subsidy, ₹6,00,000 income ceiling, mandatory female co-ownership.
  - **Risks & Covenants**: 5-year lock-in resale ban, clawback with 18% penal interest under Revenue Recovery Act 1890.
- **`sample-pm-kisan-guidelines.docx`**
  - **Category**: Ministry of Agriculture PM-KISAN Operational Guidelines
  - **Key Terms**: ₹6,000/yr in 3 installments of ₹2,000, mandatory e-KYC and land record seeding.
  - **Exclusions Tested**: Income tax payees, retired pensioners >₹10,000/mo, professionals (Doctors, CAs, Lawyers), IPC Section 420 recovery.

---

### 3. 💼 Employment & Service Bonds
- **`sample-it-employment-service-bond.docx`**
  - **Category**: IT Services Employment Agreement with Training Bond
  - **Key Terms**: ₹4,50,000 CTC, 6-month probation, strict IP assignment & moonlighting ban.
  - **Risks Tested**: 24-month mandatory service bond with ₹2,00,000 liquidated damages, 90-day employee notice vs 15-day company notice (asymmetry), 1-year post-employment non-compete (Void under **Section 27 of Indian Contract Act 1872**).

---

### 4. 🏠 Rental & Tenancy Agreements
- **`sample-residential-lease-bengaluru.docx`**
  - **Category**: 11-Month Residential Leave and Licence (Koramangala, Bengaluru)
  - **Key Terms**: ₹32,000 rent, ₹2,00,000 deposit (6.25 months), 10% annual escalation.
  - **Risks Tested**: Full deposit forfeiture on exit during 6-month lock-in, mandatory 1-month rent deduction for repainting, tenant-only repair liability.
- **`sample-rental-agreement.docx`**
  - **Category**: Standard Leave & License Agreement (Maharashtra format).

---

### 5. 🔍 Document Comparison Pair (for `/compare` feature)
- **`sample-comparison-v1-original.docx`** (Draft 1 - Initial Agreement)
  - Rent: ₹25,000 | Deposit: ₹50,000 | Notice: 30 days | Landlord covers structural repairs.
- **`sample-comparison-v2-revised.docx`** (Draft 2 - Landlord Revision)
  - Rent: ₹29,000 (+16%) | Deposit: ₹1,00,000 (+100%) | Notice: 90 days | Repairs shifted to tenant | 18% daily compounding late fee added.

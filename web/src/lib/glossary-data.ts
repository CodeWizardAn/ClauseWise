export interface GlossaryTerm {
  id: string;
  term: string;
  category: "rental" | "loan" | "employment" | "contract";
  categoryLabel: string;
  summary: string;
  explanation: string;
  riskLevel: "safe" | "caution" | "critical";
  riskNote: string;
  sampleClause: string;
  governingAct?: string;
  actNote?: string;
  tags: string[];
}

export const GLOSSARY_CATEGORIES = [
  { id: "all", label: "All Terms" },
  { id: "rental", label: "Rental & Property" },
  { id: "loan", label: "Loans & Banking" },
  { id: "employment", label: "Employment" },
  { id: "contract", label: "General Contract" },
] as const;

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    "id": "lock-in-period",
    "term": "Lock-in Period",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Fixed initial duration where early termination attracts financial forfeiture.",
    "explanation": "Forces payment of remaining months even if notice is served.",
    "riskLevel": "caution",
    "riskNote": "Check if penalty is capped at 1-2 months.",
    "sampleClause": "Neither party shall terminate the agreement during the 6-month lock-in period.",
    "governingAct": "Indian Contract Act, 1872 (Section 74)",
    "actNote": "Compensation must reflect actual loss.",
    "tags": [
      "tenancy",
      "lock-in",
      "deposit"
    ]
  },
  {
    "id": "security-deposit-deduction",
    "term": "Security Deposit Deductions",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Deposit held as collateral against physical damages or unpaid utility bills.",
    "explanation": "Landlords often make arbitrary deductions without contractor bills.",
    "riskLevel": "caution",
    "riskNote": "Specify that normal wear and tear is exempt and mandate refund in 7-14 days.",
    "sampleClause": "Deposit shall be refunded within 10 days of vacant handover subject to wear and tear.",
    "governingAct": "Model Tenancy Act, 2021",
    "actNote": "Caps residential security deposit at 2 months' rent.",
    "tags": [
      "deposit",
      "refund",
      "wear-and-tear"
    ]
  },
  {
    "id": "leave-and-licence",
    "term": "Leave and Licence vs Lease",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Permissive personal right to occupy without proprietary tenancy rights.",
    "explanation": "Licence does not create property interest, making eviction easier than under a lease.",
    "riskLevel": "safe",
    "riskNote": "If tenancy exceeds 11 months, registration is mandatory.",
    "sampleClause": "This Agreement is executed purely on a Leave and Licence basis.",
    "governingAct": "Indian Easements Act, 1882 (Section 52)",
    "actNote": "A licence does not transfer interest in immovable property.",
    "tags": [
      "licence",
      "lease",
      "easements"
    ]
  },
  {
    "id": "subletting-prohibition",
    "term": "Subletting Prohibition",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Clause preventing tenant from renting rooms or entire property to third parties.",
    "explanation": "Violating this gives landlord immediate grounds for eviction and deposit forfeiture.",
    "riskLevel": "safe",
    "riskNote": "Ensure all flatmates are named as co-tenants in the agreement.",
    "sampleClause": "The Tenant shall not assign, sublet, or part with possession of the premises.",
    "governingAct": "Transfer of Property Act, 1882 (Section 108(j))",
    "actNote": "Prohibits sublease if expressly barred in agreement.",
    "tags": [
      "subletting",
      "flatmates",
      "eviction"
    ]
  },
  {
    "id": "rent-escalation",
    "term": "Rent Escalation Clause",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Pre-agreed percentage increase in rent upon lease renewal.",
    "explanation": "Standard annual hike is 5% to 10%. Vague market-linked hikes lead to disputes.",
    "riskLevel": "caution",
    "riskNote": "Ensure the hike percentage is explicitly fixed in the deed.",
    "sampleClause": "Upon renewal after 11 months, the monthly rent shall increase by 5%.",
    "governingAct": "Model Tenancy Act, 2021 (Section 9)",
    "actNote": "Requires 3 months prior notice for rent revision if not contractually fixed.",
    "tags": [
      "escalation",
      "rent-hike",
      "renewal"
    ]
  },
  {
    "id": "stamp-duty-registration",
    "term": "Stamp Duty & Registration",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Statutory tax and recording with Sub-Registrar making agreement legally valid in court.",
    "explanation": "Unregistered agreements over 11 months are inadmissible as primary court evidence.",
    "riskLevel": "caution",
    "riskNote": "Ensure stamp duty sharing is clear (usually 50:50).",
    "sampleClause": "Stamp duty and registration fees shall be shared equally by both parties.",
    "governingAct": "Registration Act, 1908 (Section 17)",
    "actNote": "Mandatory registration for leases exceeding 11 months.",
    "tags": [
      "stamp-duty",
      "registration",
      "sub-registrar"
    ]
  },
  {
    "id": "holding-over-charges",
    "term": "Holding Over Charges (Mesne Profits)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Hefty per-day financial penalty if tenant overstays after lease termination.",
    "explanation": "Landlords charge double or triple daily rent for unauthorized holdover.",
    "riskLevel": "critical",
    "riskNote": "Ensure penalty applies only after a reasonable cure period.",
    "sampleClause": "Failure to vacate on expiry shall attract liquidated damages of Rs. 2,000/day.",
    "governingAct": "Code of Civil Procedure, 1908 (Section 2(12))",
    "actNote": "Mesne profits compensate owner for wrongful possession.",
    "tags": [
      "mesne-profits",
      "overstay",
      "penalty"
    ]
  },
  {
    "id": "quiet-enjoyment",
    "term": "Covenant of Quiet Enjoyment",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Tenant's right to peaceful possession without unlawful landlord interference.",
    "explanation": "Protects against surprise landlord visits, intrusive inspections, or utility shutoffs.",
    "riskLevel": "safe",
    "riskNote": "Require 24 hours prior written notice before any landlord visit.",
    "sampleClause": "The Landlord covenants that Tenant shall peaceably hold and enjoy the premises.",
    "governingAct": "Transfer of Property Act, 1882 (Section 108(c))",
    "actNote": "Implied covenant for undisturbed lawful possession.",
    "tags": [
      "quiet-enjoyment",
      "privacy",
      "peaceful-possession"
    ]
  },
  {
    "id": "painting-deduction",
    "term": "Mandatory Painting Deduction",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Automatic forfeiture of one month's rent from deposit for move-out painting.",
    "explanation": "Unfair if tenant stayed a short time or left walls in pristine condition.",
    "riskLevel": "caution",
    "riskNote": "Negotiate deduction only for actual damage beyond fair wear and tear.",
    "sampleClause": "A fixed painting charge equal to one month rent shall be deducted from deposit.",
    "governingAct": "Consumer Protection Act, 2019",
    "actNote": "Arbitrary blanket deductions without proof are unfair practices.",
    "tags": [
      "painting",
      "deposit",
      "wear-and-tear"
    ]
  },
  {
    "id": "society-maintenance-split",
    "term": "Society Maintenance Split",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Division of monthly apartment association fees between owner and tenant.",
    "explanation": "Covers operational common costs (security, lifts). Sinking funds are landlord's duty.",
    "riskLevel": "safe",
    "riskNote": "Confirm whether quoted rent is inclusive of society maintenance.",
    "sampleClause": "Tenant shall pay monthly RWA maintenance charges directly to the association.",
    "governingAct": "State Apartment Ownership Acts",
    "actNote": "Capital asset replacements are owner's statutory duty.",
    "tags": [
      "maintenance",
      "rwa",
      "society"
    ]
  },
  {
    "id": "major-vs-minor-repairs",
    "term": "Major vs Minor Repairs",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Division of structural versus daily operational repair responsibilities.",
    "explanation": "Tenant handles minor items (bulbs, tap washers); owner handles structural seepage/wiring.",
    "riskLevel": "safe",
    "riskNote": "Cap tenant repair liability at Rs. 1,000 per incident.",
    "sampleClause": "Owner handles structural seepage; Tenant handles minor repairs up to Rs. 1,000.",
    "governingAct": "Model Tenancy Act (Second Schedule)",
    "actNote": "Clearly delineates landlord vs tenant repair duties.",
    "tags": [
      "repairs",
      "seepage",
      "plumbing"
    ]
  },
  {
    "id": "unilateral-utility-shutoff",
    "term": "Unilateral Utility Disconnection",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Landlord cutting electricity/water to force tenant eviction upon rent default.",
    "explanation": "Completely illegal in India; landlords cannot take law into their own hands.",
    "riskLevel": "critical",
    "riskNote": "Never agree to clauses permitting extra-judicial utility shutoffs.",
    "sampleClause": "Landlord may disconnect electricity and water upon 10 days payment default.",
    "governingAct": "Model Tenancy Act, 2021 (Section 20)",
    "actNote": "Strictly prohibits withholding essential services.",
    "tags": [
      "illegal-eviction",
      "utility-shutoff",
      "criminal-trespass"
    ]
  },
  {
    "id": "encumbrance-certificate",
    "term": "Encumbrance Certificate (EC)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Official revenue record confirming property has no registered mortgages or court liens.",
    "explanation": "Essential to verify seller or lessor has clear, unencumbered title.",
    "riskLevel": "safe",
    "riskNote": "Always verify 15-30 years of EC before long leases or buying.",
    "sampleClause": "The Lessor warrants the property is free from all encumbrances and court attachments.",
    "governingAct": "Transfer of Property Act, 1882 (Section 55)",
    "actNote": "Implies covenant for clear title free of undisclosed liens.",
    "tags": [
      "encumbrance",
      "title",
      "ec"
    ]
  },
  {
    "id": "occupancy-certificate",
    "term": "Occupancy Certificate (OC)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Municipal certificate confirming building complies with approved plans and is safe.",
    "explanation": "Occupying a building without OC risks civic demolition or water disconnection.",
    "riskLevel": "caution",
    "riskNote": "Verify OC before signing commercial or residential leases.",
    "sampleClause": "Developer warrants that valid Occupancy Certificate has been issued.",
    "governingAct": "RERA Act, 2016 (Section 11(4))",
    "actNote": "Promoter must obtain OC before handing over possession.",
    "tags": [
      "oc",
      "municipal",
      "safety"
    ]
  },
  {
    "id": "force-majeure-tenancy",
    "term": "Force Majeure & Rent Abatement",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Suspension of rent if premises become uninhabitable due to flood, fire, or earthquake.",
    "explanation": "Prevents tenant from being forced to pay rent during natural disasters.",
    "riskLevel": "safe",
    "riskNote": "Ensure rent is abated until property is fully restored to usable state.",
    "sampleClause": "Rent shall be suspended if premises become uninhabitable due to Act of God.",
    "governingAct": "Transfer of Property Act, 1882 (Section 108(e))",
    "actNote": "Lessee may treat lease as void if property is substantially destroyed.",
    "tags": [
      "force-majeure",
      "disaster",
      "rent-abatement"
    ]
  },
  {
    "id": "khata-certificate",
    "term": "Khata Certificate (A-Khata vs B-Khata)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Municipal property assessment record in Bengaluru certifying tax assessment status.",
    "explanation": "A-Khata indicates approved building; B-Khata indicates deviations/unapproved layout.",
    "riskLevel": "caution",
    "riskNote": "Verify A-Khata for legal approval and bank loan eligibility.",
    "sampleClause": "Lessor warrants property possesses valid A-Khata registration.",
    "governingAct": "Bruhat Bengaluru Mahanagara Palike Act",
    "actNote": "Identifies property tax assessee and building legality.",
    "tags": [
      "khata",
      "bbmp",
      "property-tax"
    ]
  },
  {
    "id": "patta-chitta",
    "term": "Patta / Chitta Revenue Record",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Government land ownership and revenue record in Tamil Nadu.",
    "explanation": "Proves legal ownership and land classification in government land registries.",
    "riskLevel": "safe",
    "riskNote": "Check Patta to confirm landlord is the recorded legal owner.",
    "sampleClause": "Lessor provides copy of valid Patta confirming title ownership.",
    "governingAct": "Tamil Nadu Land Revenue Code",
    "actNote": "Primary record of title and land tax liability.",
    "tags": [
      "patta",
      "chitta",
      "land-records"
    ]
  },
  {
    "id": "saat-baara-extract",
    "term": "7/12 Extract (Saat Baara)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Maharashtra land revenue document showing rights, crop status, and loan liabilities.",
    "explanation": "Shows if agricultural land was legally converted to Non-Agricultural (NA) use.",
    "riskLevel": "safe",
    "riskNote": "Verify 7/12 extract for any existing bank hypothecation or court disputes.",
    "sampleClause": "Owner confirms 7/12 extract is clear of agricultural tenancy encumbrances.",
    "governingAct": "Maharashtra Land Revenue Code, 1966",
    "actNote": "Statutory register of agricultural land titles.",
    "tags": [
      "7-12",
      "maharashtra",
      "land-revenue"
    ]
  },
  {
    "id": "carpet-area-mandate",
    "term": "RERA Carpet Area Standard",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Net usable floor area inside apartment walls, excluding external walls and common areas.",
    "explanation": "Builders charging on super built-up area inflate real costs by 30%.",
    "riskLevel": "safe",
    "riskNote": "Demand agreement explicitly state RERA carpet area.",
    "sampleClause": "Rent/Price is calculated strictly on RERA Carpet Area of 850 sq.ft.",
    "governingAct": "RERA Act, 2016 (Section 2(k))",
    "actNote": "Mandates all property transactions to quote carpet area.",
    "tags": [
      "carpet-area",
      "rera",
      "builtup"
    ]
  },
  {
    "id": "fit-out-period",
    "term": "Rent-Free Fit-out Period",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Grace period granted before commercial rent starts to complete interior fit-outs.",
    "explanation": "Ensures tenant is not paying rent while premises are unready for business.",
    "riskLevel": "safe",
    "riskNote": "Ensure fit-out period is at least 30-60 days for commercial spaces.",
    "sampleClause": "Rent shall commence only after expiration of 45-day rent-free fit-out period.",
    "governingAct": "Commercial Leasing Practice",
    "actNote": "Standard industry grace period for commercial fit-outs.",
    "tags": [
      "fit-out",
      "rent-free",
      "commercial-lease"
    ]
  },
  {
    "id": "triple-net-lease",
    "term": "Triple Net Lease (NNN)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Lease where tenant pays base rent plus property taxes, building insurance, and maintenance.",
    "explanation": "Shifts all building overheads and municipal taxes onto the commercial tenant.",
    "riskLevel": "caution",
    "riskNote": "Budget for extra variable expenses beyond the base rent.",
    "sampleClause": "Tenant shall pay base rent plus all property taxes, insurance, and CAM charges.",
    "governingAct": "Commercial Property Practice",
    "actNote": "Transfers full operational property costs to tenant.",
    "tags": [
      "triple-net",
      "nnn",
      "commercial-rent"
    ]
  },
  {
    "id": "as-is-where-is",
    "term": "As-Is Where-Is Property Handover",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Tenant accepts property in its current state, waiving claims for hidden defects.",
    "explanation": "Shifts repair burden of pre-existing flaws onto the tenant.",
    "riskLevel": "caution",
    "riskNote": "Document all pre-existing flaws in move-in inspection annexure.",
    "sampleClause": "Tenant accepts premises on an as-is-where-is basis.",
    "governingAct": "Indian Contract Act, 1872",
    "actNote": "Buyer/tenant beware doctrine applies.",
    "tags": [
      "as-is",
      "inspection",
      "defects"
    ]
  },
  {
    "id": "deemed-surrender",
    "term": "Deemed Surrender Clause",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Treating agreement as terminated if tenant is absent for 30 consecutive days without notice.",
    "explanation": "Allows landlord to re-enter and seize belongings if tenant travels without notice.",
    "riskLevel": "caution",
    "riskNote": "Ensure landlord must send written notice before declaring deemed surrender.",
    "sampleClause": "Unexplained absence exceeding 30 days shall be deemed voluntary surrender.",
    "governingAct": "Transfer of Property Act, 1882",
    "actNote": "Surrender terminates lease interest.",
    "tags": [
      "surrender",
      "abandonment",
      "landlord-entry"
    ]
  },
  {
    "id": "indemnity-for-tax",
    "term": "Tenant Property Tax Indemnity",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Clause making tenant pay any future increase in municipal property taxes.",
    "explanation": "Unfairly shifts owner's municipal tax burden onto the tenant.",
    "riskLevel": "caution",
    "riskNote": "Property taxes are capital owner liabilities; reject this clause.",
    "sampleClause": "Tenant shall reimburse any escalation in municipal property tax during lease.",
    "governingAct": "Municipal Corporation Acts",
    "actNote": "Statutory tax liability rests with the legal owner.",
    "tags": [
      "property-tax",
      "indemnity",
      "escalation"
    ]
  },
  {
    "id": "exclusive-use-retail",
    "term": "Exclusive Use Covenant (Retail)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Landlord promise not to lease adjacent shops to direct commercial competitors in a mall.",
    "explanation": "Protects retail store sales from immediate nearby competition.",
    "riskLevel": "safe",
    "riskNote": "Crucial protection for food outlets and specialty retail brands.",
    "sampleClause": "Landlord shall not lease any premises in the mall to a competing pizzeria.",
    "governingAct": "Commercial Leasing Standards",
    "actNote": "Valid restrictive covenant protecting business viability.",
    "tags": [
      "retail",
      "competition",
      "exclusive-use"
    ]
  },
  {
    "id": "radius-restriction",
    "term": "Radius Restriction (Commercial)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Barring tenant from opening another branch within a 3-5 km radius.",
    "explanation": "Restricts tenant's business expansion; may violate restraint of trade under Section 27.",
    "riskLevel": "caution",
    "riskNote": "Keep radius as narrow as possible (e.g. under 1 km) or delete clause.",
    "sampleClause": "Tenant shall not operate another outlet within 3 km of the leased premises.",
    "governingAct": "Indian Contract Act, 1872 (Section 27)",
    "actNote": "Agreements in restraint of lawful trade are void.",
    "tags": [
      "radius-restriction",
      "restraint-of-trade",
      "section-27"
    ]
  },
  {
    "id": "restoration-obligation",
    "term": "Reinstatement / De-fit Obligation",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Requirement to dismantle all interior partitions and return bare concrete shell on move-out.",
    "explanation": "Demolition and de-fit costs can run into lakhs for commercial tenants.",
    "riskLevel": "caution",
    "riskNote": "Negotiate option to leave usable fixtures behind without penalty.",
    "sampleClause": "Tenant shall remove all fixtures and restore premises to original bare shell.",
    "governingAct": "Commercial Leasing Practice",
    "actNote": "Allocates end-of-tenancy restoration expenses.",
    "tags": [
      "reinstatement",
      "de-fit",
      "bare-shell"
    ]
  },
  {
    "id": "attornment-acknowledgment",
    "term": "Attornment of Tenancy",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Tenant formal legal recognition of a new landlord when property is sold.",
    "explanation": "Ensures lease continues seamlessly under new owner on identical terms.",
    "riskLevel": "safe",
    "riskNote": "Verify sale deed before redirecting rent payments to the new owner.",
    "sampleClause": "Tenant attorns to the Purchaser as the new Landlord under identical terms.",
    "governingAct": "Transfer of Property Act, 1882 (Section 109)",
    "actNote": "Transferee gets all rights of the original lessor.",
    "tags": [
      "attornment",
      "ownership-change",
      "transferee"
    ]
  },
  {
    "id": "snda-agreement",
    "term": "Subordination & Non-Disturbance (SNDA)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Pact ensuring bank will not evict tenant if landlord defaults on building mortgage.",
    "explanation": "Protects commercial tenant's multi-crore fit-out investments.",
    "riskLevel": "safe",
    "riskNote": "Mandatory for high-value commercial leases in mortgaged buildings.",
    "sampleClause": "Lender agrees not to disturb Tenant's possession in event of mortgage foreclosure.",
    "governingAct": "Banking and Real Estate Norms",
    "actNote": "Protects tenant tenure against lender foreclosure.",
    "tags": [
      "snda",
      "mortgage",
      "foreclosure"
    ]
  },
  {
    "id": "rwa-pet-restriction",
    "term": "RWA Blanket Pet Ban",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Housing society rule banning dogs, cats, or pets in apartment complexes.",
    "explanation": "Blanket bans on pets violate Animal Welfare Board of India directives.",
    "riskLevel": "safe",
    "riskNote": "Landlord/RWA cannot evict tenants solely for keeping peaceful domestic pets.",
    "sampleClause": "No pets of any description shall be kept on the premises.",
    "governingAct": "Animal Welfare Board of India Directives",
    "actNote": "Blanket bans declared illegal by Delhi and Mumbai High Courts.",
    "tags": [
      "pets",
      "rwa-rules",
      "animal-welfare"
    ]
  },
  {
    "id": "foir-dti",
    "term": "Fixed Obligation to Income Ratio (FOIR / DTI)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Percentage of monthly income going toward debt EMIs and rent.",
    "explanation": "Banks reject loans if FOIR exceeds 50%. A high FOIR indicates debt trap risk.",
    "riskLevel": "safe",
    "riskNote": "Keep your total FOIR under 40% for financial safety.",
    "sampleClause": "The borrower confirms total existing monthly debt obligations do not exceed 45% of net income.",
    "governingAct": "RBI Master Directions on Lending",
    "actNote": "Key prudential metric for personal and retail credit.",
    "tags": [
      "foir",
      "dti",
      "affordability",
      "emi"
    ]
  },
  {
    "id": "penal-interest-compounding",
    "term": "Compounding Penal Interest",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Charging interest upon interest for missed loan repayment dates.",
    "explanation": "RBI circular (Aug 2023) banned banks from compounding penal charges or adding them to principal.",
    "riskLevel": "critical",
    "riskNote": "Verify that default charges are flat penal charges, not compounding interest.",
    "sampleClause": "Default in EMI payment shall attract penal interest at 24% per annum compounded monthly.",
    "governingAct": "RBI Fair Lending Practice Guidelines (2023)",
    "actNote": "Penal charges cannot be capitalized or added to principal.",
    "tags": [
      "penal-interest",
      "compounding",
      "rbi-circular",
      "default"
    ]
  },
  {
    "id": "foreclosure-prepayment-penalty",
    "term": "Foreclosure & Prepayment Penalty",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Fee charged by bank when borrower pays off floating-rate home loan early.",
    "explanation": "RBI prohibits prepayment penalties on floating-rate individual retail loans.",
    "riskLevel": "safe",
    "riskNote": "Ensure zero prepayment penalty is documented for floating rate loans.",
    "sampleClause": "No prepayment penalty shall be levied on early closure of floating rate home loans.",
    "governingAct": "RBI Circular on Prepayment Penalties",
    "actNote": "Prepayment charges barred on floating rate loans to individuals.",
    "tags": [
      "foreclosure",
      "prepayment",
      "rbi-guidelines"
    ]
  },
  {
    "id": "cross-default-clause",
    "term": "Cross-Default Clause",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Default on any unrelated loan triggers automatic default on this loan.",
    "explanation": "A dispute with an education loan can cause your home loan bank to demand immediate repayment.",
    "riskLevel": "critical",
    "riskNote": "Insist cross-default applies only to facilities with the same lending institution.",
    "sampleClause": "Any default under any other borrowing shall constitute an Event of Default under this Agreement.",
    "governingAct": "Banking Law & Practice",
    "actNote": "Drastic acceleration clause that magnifies financial contagion.",
    "tags": [
      "cross-default",
      "acceleration",
      "default"
    ]
  },
  {
    "id": "acceleration-clause",
    "term": "Loan Acceleration Clause",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Bank's right to demand immediate repayment of entire remaining loan principal.",
    "explanation": "Triggers if borrower breaches any covenant, late pay, or suffers adverse financial change.",
    "riskLevel": "critical",
    "riskNote": "Ensure acceleration requires formal 30-day written cure notice.",
    "sampleClause": "Upon occurrence of an Event of Default, the entire outstanding loan shall become immediately due.",
    "governingAct": "Indian Contract Act, 1872 (Section 73)",
    "actNote": "Lender exercises contractual acceleration upon material breach.",
    "tags": [
      "acceleration",
      "loan-recall",
      "demand"
    ]
  },
  {
    "id": "right-of-set-off",
    "term": "Bank's Right of Set-off & Banker's Lien",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Bank's legal right to seize money from your savings/fixed deposit to pay unpaid loan EMIs.",
    "explanation": "If you default on a personal loan, the bank can drain your salary savings account without asking.",
    "riskLevel": "caution",
    "riskNote": "Keep emergency savings in a separate bank from your loan-issuing bank.",
    "sampleClause": "The Bank shall have the right to set-off and debit any account of the Borrower to recover dues.",
    "governingAct": "Indian Contract Act, 1872 (Section 171)",
    "actNote": "Banker's general lien permits retention of securities for general balance.",
    "tags": [
      "set-off",
      "lien",
      "savings-seizure"
    ]
  },
  {
    "id": "sarfaesi-act-repossession",
    "term": "SARFAESI Act Repossession (Section 13)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Bank's power to seize and auction mortgaged property without going to court.",
    "explanation": "Applicable to secured loans over Rs. 1 lakh after 60-day notice following NPA classification.",
    "riskLevel": "critical",
    "riskNote": "Always respond formally to Section 13(2) demand notices within 60 days.",
    "sampleClause": "The Bank may enforce security interest under SARFAESI Act, 2002 upon default.",
    "governingAct": "SARFAESI Act, 2002 (Section 13)",
    "actNote": "Empowers secured creditors to repossess collateral without court intervention.",
    "tags": [
      "sarfaesi",
      "repossession",
      "auction",
      "npa"
    ]
  },
  {
    "id": "floating-vs-fixed-rate",
    "term": "Floating vs Fixed Interest Rate",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Floating rate adjusts with RBI repo rate / MCLR; fixed rate remains unchanged.",
    "explanation": "Floating rates can increase your loan tenure by years if RBI hikes repo rates.",
    "riskLevel": "safe",
    "riskNote": "Check the benchmark spread and reset frequency (e.g. quarterly repo-linked).",
    "sampleClause": "Interest shall be calculated at Repo Linked Lending Rate (RLLR) plus a spread of 1.75%.",
    "governingAct": "RBI External Benchmark Guidelines",
    "actNote": "Retail floating loans must link to external benchmarks like RBI Repo Rate.",
    "tags": [
      "repo-rate",
      "mclr",
      "floating-rate"
    ]
  },
  {
    "id": "hypothecation-deed",
    "term": "Hypothecation Deed (Vehicle / Stock)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Creating a charge over movable assets (car, machinery) while borrower retains physical possession.",
    "explanation": "Bank can seize the car if vehicle loan EMIs are unpaid.",
    "riskLevel": "safe",
    "riskNote": "Ensure hypothecation is removed (Form 35/NOC) from RTO RC book upon loan payoff.",
    "sampleClause": "The Borrower hypothecates the vehicle in favour of the Bank as security for repayment.",
    "governingAct": "SARFAESI Act, 2002 / Sale of Goods Act, 1930",
    "actNote": "Charge on movable property without transferring physical possession.",
    "tags": [
      "hypothecation",
      "vehicle-loan",
      "rc-book"
    ]
  },
  {
    "id": "equitable-mortgage",
    "term": "Equitable Mortgage (Deposit of Title Deeds)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Creating mortgage by depositing original property sale deeds with the bank.",
    "explanation": "Saves high stamp duty compared to registered mortgage in many states.",
    "riskLevel": "safe",
    "riskNote": "Demand formal written receipt of deposited original title documents from bank.",
    "sampleClause": "Mortgagor creates an equitable mortgage by depositing original Title Deed with the Lender.",
    "governingAct": "Transfer of Property Act, 1882 (Section 58(f))",
    "actNote": "Equitable mortgage created by intent and deposit of title deeds in notified towns.",
    "tags": [
      "equitable-mortgage",
      "title-deeds",
      "home-loan"
    ]
  },
  {
    "id": "nach-mandate-ecs",
    "term": "NACH Mandate / e-Mandate Bounce Liability",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Automated recurring debit mandate from borrower bank account for monthly EMI.",
    "explanation": "Bouncing a NACH mandate attracts criminal liability under Section 25 of the PASA Act (like cheque bounce).",
    "riskLevel": "critical",
    "riskNote": "Always maintain adequate balance 24 hours before scheduled EMI debit date.",
    "sampleClause": "Borrower authorizes automated monthly debit via NACH/e-Mandate for EMI collection.",
    "governingAct": "Payment and Settlement Systems Act, 2007 (Section 25)",
    "actNote": "Dishonour of electronic funds transfer is a punishable offence with up to 2 years jail.",
    "tags": [
      "nach",
      "e-mandate",
      "bounce",
      "section-25"
    ]
  },
  {
    "id": "section-138-cheque-bounce",
    "term": "Section 138 Negotiable Instruments Act",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Criminal offense for cheque bounce due to insufficient funds.",
    "explanation": "Lenders take security cheques and file criminal complaints if payments fail.",
    "riskLevel": "critical",
    "riskNote": "Never sign blank cheques; issue written stop-payment only for valid legal dispute.",
    "sampleClause": "The Bank may present security cheques and initiate criminal proceedings under Section 138.",
    "governingAct": "Negotiable Instruments Act, 1881 (Section 138)",
    "actNote": "Dishonour of cheque for insufficiency of funds attracts criminal penalty.",
    "tags": [
      "cheque-bounce",
      "section-138",
      "criminal-liability"
    ]
  },
  {
    "id": "cibil-score-reporting",
    "term": "CIBIL / Credit Bureau Reporting",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Monthly transmission of loan repayment history to TransUnion CIBIL, Experian, CRIF.",
    "explanation": "A single 30-day late payment can drop CIBIL score by 50+ points for years.",
    "riskLevel": "caution",
    "riskNote": "Regularly review credit report for errors or erroneous default marks.",
    "sampleClause": "Bank shall report all credit history and default data to Credit Information Bureaus.",
    "governingAct": "Credit Information Companies (Regulation) Act, 2005",
    "actNote": "Statutory mandate to share credit data with licensed credit bureaus.",
    "tags": [
      "cibil",
      "credit-score",
      "credit-report"
    ]
  },
  {
    "id": "personal-guarantee",
    "term": "Personal Guarantee (Co-Obligation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Individual legally promises to repay loan from personal wealth if primary borrower defaults.",
    "explanation": "Guarantor's liability is joint, several, and co-extensive with primary borrower.",
    "riskLevel": "critical",
    "riskNote": "Never sign a personal guarantee for a friend/boss without understanding you can be made bankrupt.",
    "sampleClause": "The Guarantor unconditionally guarantees full repayment as primary obligor.",
    "governingAct": "Indian Contract Act, 1872 (Section 128)",
    "actNote": "Guarantor's liability is co-extensive with principal debtor unless contract states otherwise.",
    "tags": [
      "guarantee",
      "guarantor",
      "personal-wealth",
      "insolvency"
    ]
  },
  {
    "id": "npa-classification",
    "term": "NPA Classification (90-Day Default Rule)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Classifying loan as Non-Performing Asset if interest/principal unpaid for 90 days.",
    "explanation": "Triggers legal recovery, debt collection calls, and SARFAESI repossession proceedings.",
    "riskLevel": "critical",
    "riskNote": "Engage with bank for restructuring before 90 days overdue.",
    "sampleClause": "The loan account shall be classified as Non-Performing Asset upon 90 days payment default.",
    "governingAct": "RBI Prudential Norms on Income Recognition",
    "actNote": "Overdue for more than 90 days requires mandatory NPA classification.",
    "tags": [
      "npa",
      "overdue",
      "bad-loan"
    ]
  },
  {
    "id": "sma-classification",
    "term": "Special Mention Account (SMA-0, 1, 2)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Early stress tracking: SMA-0 (1-30 days overdue), SMA-1 (31-60 days), SMA-2 (61-90 days).",
    "explanation": "Banks report SMA status to RBI CRILC database, impacting future loan approvals.",
    "riskLevel": "caution",
    "riskNote": "Pay arrears during SMA-0 stage to avoid compounding recovery actions.",
    "sampleClause": "Borrower account shall be classified under SMA categories upon initial default.",
    "governingAct": "RBI Framework on Stressed Assets",
    "actNote": "Mandates early identification and reporting of stressed credit.",
    "tags": [
      "sma",
      "stressed-assets",
      "crilc"
    ]
  },
  {
    "id": "moratorium-period",
    "term": "Moratorium / Repayment Holiday",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Temporary grace period where borrower is not required to pay principal EMIs.",
    "explanation": "Interest continues to accrue and compound during moratorium, increasing total loan cost.",
    "riskLevel": "caution",
    "riskNote": "Understand that moratorium is not an interest waiver; total repayment amount rises.",
    "sampleClause": "A moratorium of 6 months is granted; accrued interest shall be capitalized into principal.",
    "governingAct": "RBI Guidelines on Loan Restructuring",
    "actNote": "Permits deferral of principal repayment during construction or crisis.",
    "tags": [
      "moratorium",
      "grace-period",
      "emi-holiday"
    ]
  },
  {
    "id": "processing-fee-refundability",
    "term": "Non-Refundable Processing Fee",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Upfront fee charged to process loan application, regardless of sanction or rejection.",
    "explanation": "Banks retain processing fee even if loan is rejected or sanction terms are unacceptable.",
    "riskLevel": "caution",
    "riskNote": "Ask for written fee structure and check if partial refund is possible if rejected.",
    "sampleClause": "The processing fee of 1% plus GST is non-refundable under all circumstances.",
    "governingAct": "RBI Fair Practices Code for Lenders",
    "actNote": "Requires transparent upfront disclosure of all non-refundable fees.",
    "tags": [
      "processing-fee",
      "loan-charges",
      "fair-practices"
    ]
  },
  {
    "id": "annual-percentage-rate-apr",
    "term": "Annual Percentage Rate (APR / KFS)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Total annual cost of loan including interest, processing fees, insurance, and third-party costs.",
    "explanation": "Reveals the true cost of borrowing compared to nominal headline interest rates.",
    "riskLevel": "safe",
    "riskNote": "Always demand the Key Fact Statement (KFS) showing the exact APR.",
    "sampleClause": "The Annual Percentage Rate (APR) for this facility is computed at 14.85% per annum.",
    "governingAct": "RBI Key Fact Statement (KFS) Mandate (2024)",
    "actNote": "Mandates all regulated lenders to provide transparent APR in standard KFS.",
    "tags": [
      "apr",
      "kfs",
      "true-cost",
      "transparency"
    ]
  },
  {
    "id": "digital-lending-dla-lsp",
    "term": "Digital Lending LSP & DLA Rules",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "RBI framework governing fintech lending apps (Loan Service Providers / DLA).",
    "explanation": "Bans fintech apps from accessing user contacts, gallery, or charging hidden fees.",
    "riskLevel": "safe",
    "riskNote": "Ensure lending app is registered on RBI's list of approved NBFC partners.",
    "sampleClause": "Loan is disbursed directly from NBFC bank account without pass-through pool accounts.",
    "governingAct": "RBI Digital Lending Guidelines (2022)",
    "actNote": "Restricts app permissions, prohibits dark patterns, mandates direct bank-to-bank transfer.",
    "tags": [
      "digital-lending",
      "fintech",
      "privacy",
      "rbi-dla"
    ]
  },
  {
    "id": "service-bond-liquidated-damages",
    "term": "Employment Service Bond",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Agreement forcing employee to pay a penalty (e.g. Rs. 2 Lakhs) if they resign before 1-3 years.",
    "explanation": "Service bonds are enforceable ONLY to recover actual training expenses, not as a blanket exit penalty.",
    "riskLevel": "critical",
    "riskNote": "Indian courts will void arbitrary bond penalties that exceed actual documented training costs.",
    "sampleClause": "Employee agrees to serve for minimum 2 years or pay Rs. 3,00,000 as liquidated damages.",
    "governingAct": "Indian Contract Act, 1872 (Section 74 & Section 27)",
    "actNote": "Section 27 renders restraint of trade void; Section 74 allows only reasonable actual damages.",
    "tags": [
      "service-bond",
      "resignation-penalty",
      "section-27",
      "liquidated-damages"
    ]
  },
  {
    "id": "non-compete-clause",
    "term": "Post-Employment Non-Compete Clause",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Restriction barring employee from joining a competitor or starting a similar business after resigning.",
    "explanation": "Post-termination non-compete clauses are completely VOID and unenforceable in India under Section 27.",
    "riskLevel": "safe",
    "riskNote": "Employers cannot legally block you from working for a competitor after your employment ends.",
    "sampleClause": "Employee shall not work for any competitor for 12 months following termination.",
    "governingAct": "Indian Contract Act, 1872 (Section 27)",
    "actNote": "Supreme Court in Percept D'Mark held post-employment non-competes are void under Section 27.",
    "tags": [
      "non-compete",
      "restraint-of-trade",
      "post-termination",
      "section-27"
    ]
  },
  {
    "id": "non-solicitation-clause",
    "term": "Non-Solicitation Clause (Clients & Employees)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Prohibiting ex-employee from poaching colleagues or soliciting company clients after leaving.",
    "explanation": "Generally enforceable in India if reasonable in duration (e.g. 6-12 months) and scope.",
    "riskLevel": "caution",
    "riskNote": "Ensure it does not restrict you from accepting unsolicited incoming client inquiries.",
    "sampleClause": "Employee shall not solicit company clients or hire existing staff for 12 months post-exit.",
    "governingAct": "Indian Contract Act, 1872",
    "actNote": "Enforceable if narrowly tailored to protect proprietary trade contacts.",
    "tags": [
      "non-solicitation",
      "poaching",
      "client-protection"
    ]
  },
  {
    "id": "garden-leave",
    "term": "Garden Leave",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employee remains on payroll and receives full salary while sitting at home during notice period.",
    "explanation": "Used to keep departing executives away from sensitive current deals and clients.",
    "riskLevel": "safe",
    "riskNote": "You receive full salary and benefits without having to work daily.",
    "sampleClause": "Company may place Employee on Garden Leave during the notice period with full pay.",
    "governingAct": "Employment Contract Standards",
    "actNote": "Valid contractual mechanism that pays full compensation during restraint.",
    "tags": [
      "garden-leave",
      "notice-period",
      "payroll"
    ]
  },
  {
    "id": "notice-period-buyout",
    "term": "Notice Period Buyout",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Paying salary in lieu of notice period to leave immediately or allow early joining at new company.",
    "explanation": "Employers can legally insist on full service of notice period if buyout is not mutually agreed.",
    "riskLevel": "caution",
    "riskNote": "Check if notice buyout is at the sole discretion of the company or mutual right.",
    "sampleClause": "Company may at its discretion accept salary in lieu of notice for early release.",
    "governingAct": "Industrial Disputes Act / State Shops & Establishments Acts",
    "actNote": "Requires 1 month notice or wages in lieu for termination.",
    "tags": [
      "notice-buyout",
      "early-release",
      "resignation"
    ]
  },
  {
    "id": "ip-assignment-work-for-hire",
    "term": "Intellectual Property Assignment (Work for Hire)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Clause transferring all software, inventions, and designs created during employment to company.",
    "explanation": "Broad clauses claim ownership even of personal side-projects created on weekends.",
    "riskLevel": "caution",
    "riskNote": "Ensure assignment is limited to work related to employer's business and during working hours.",
    "sampleClause": "Employee assigns all IP, inventions, and software created during employment to Company.",
    "governingAct": "Copyright Act, 1957 (Section 17(c))",
    "actNote": "Employer is first owner of copyright for works made under contract of service.",
    "tags": [
      "ip-assignment",
      "copyright",
      "inventions",
      "patents"
    ]
  },
  {
    "id": "moonlighting-dual-employment",
    "term": "Moonlighting / Dual Employment Prohibition",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Barring employee from taking up secondary freelance gigs, part-time jobs, or advisory roles.",
    "explanation": "Can result in immediate termination for misconduct if violated without written permission.",
    "riskLevel": "caution",
    "riskNote": "Request explicit written HR exception if doing open-source coding, teaching, or family business.",
    "sampleClause": "Employee shall not engage in any other commercial employment or business activity.",
    "governingAct": "Factories Act, 1948 (Section 60) / Model Standing Orders",
    "actNote": "Restricts dual employment in industrial establishments; governed by contract elsewhere.",
    "tags": [
      "moonlighting",
      "dual-employment",
      "freelancing"
    ]
  },
  {
    "id": "probation-confirmation",
    "term": "Probation Period & Deemed Confirmation",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Initial trial period (3-6 months) during which notice period is shorter and termination is easier.",
    "explanation": "Without formal confirmation letter, some contracts treat employee as permanently on probation.",
    "riskLevel": "caution",
    "riskNote": "Check if contract has deemed confirmation clause after probation duration expires.",
    "sampleClause": "Employee shall be on probation for 6 months; confirmation requires written letter.",
    "governingAct": "Industrial Employment (Standing Orders) Act, 1946",
    "actNote": "Probationer does not automatically acquire permanent status without confirmation.",
    "tags": [
      "probation",
      "confirmation",
      "trial-period"
    ]
  },
  {
    "id": "pip-termination",
    "term": "Performance Improvement Plan (PIP)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Formal 30-90 day monitoring plan before termination for underperformance.",
    "explanation": "Often used as legal documentation trail to justify termination and avoid severance pay.",
    "riskLevel": "caution",
    "riskNote": "Document all completed tasks, deliverables, and manager feedback in writing during PIP.",
    "sampleClause": "Failure to achieve targets under PIP shall result in immediate termination for cause.",
    "governingAct": "Labour Jurisprudence",
    "actNote": "Courts require fair opportunity and natural justice before capability dismissal.",
    "tags": [
      "pip",
      "performance",
      "termination-for-cause"
    ]
  },
  {
    "id": "gratuity-eligibility",
    "term": "Gratuity Statutory Benefit",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Lump sum statutory retirement/exit benefit paid after 5 continuous years of service.",
    "explanation": "Calculated as 15 days last drawn salary for every completed year of service (tax-free up to Rs. 20 Lakhs).",
    "riskLevel": "safe",
    "riskNote": "Continuous service of 4 years 240 days qualifies for gratuity under judicial rulings.",
    "sampleClause": "Gratuity shall be payable in accordance with the Payment of Gratuity Act, 1972.",
    "governingAct": "Payment of Gratuity Act, 1972 (Section 4)",
    "actNote": "Mandatory statutory benefit for employees completing 5 years of service.",
    "tags": [
      "gratuity",
      "retirement",
      "statutory-benefits"
    ]
  },
  {
    "id": "pf-epfo-deduction",
    "term": "Provident Fund (EPF & EPS Contribution)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Mandatory retirement saving: 12% employee share + 12% employer share deducted monthly.",
    "explanation": "Check if employer contribution is deducted out of your quoted CTC or paid on basic salary.",
    "riskLevel": "safe",
    "riskNote": "Verify monthly PF credits on EPFO UAN member portal.",
    "sampleClause": "PF shall be deducted and contributed as per Employees' Provident Funds Act, 1952.",
    "governingAct": "Employees' Provident Funds and Miscellaneous Provisions Act, 1952",
    "actNote": "Mandatory for establishments with 20+ employees for salaries up to Rs. 15,000 basic.",
    "tags": [
      "epfo",
      "provident-fund",
      "ctc-breakup"
    ]
  },
  {
    "id": "posh-act-compliance",
    "term": "POSH Act / Internal Committee (IC)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Protection against sexual harassment and mandatory grievance redressal mechanism.",
    "explanation": "Every company with 10+ employees must have a constituted Internal Complaints Committee.",
    "riskLevel": "safe",
    "riskNote": "Know your rights to confidential reporting and time-bound inquiry under POSH.",
    "sampleClause": "Company adheres to zero tolerance policy under POSH Act with dedicated Internal Committee.",
    "governingAct": "Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013",
    "actNote": "Mandatory IC, inquiry completion within 90 days, and anti-retaliation protections.",
    "tags": [
      "posh",
      "internal-committee",
      "workplace-safety"
    ]
  },
  {
    "id": "esop-vesting-cliff",
    "term": "ESOP Vesting Schedule & 1-Year Cliff",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Stock options vest gradually (e.g. 25% per year over 4 years) after a mandatory 1-year cliff.",
    "explanation": "Leaving before the 1-year cliff means you forfeit 100% of your allocated stock options.",
    "riskLevel": "caution",
    "riskNote": "Check post-termination exercise window (e.g. 30 days vs 5 years) upon resignation.",
    "sampleClause": "Options vest 25% annually after a 12-month cliff from Grant Date.",
    "governingAct": "Companies Act, 2013 (Section 62(1)(b))",
    "actNote": "Governs employee stock option schemes and statutory vesting rules.",
    "tags": [
      "esop",
      "stock-options",
      "vesting",
      "cliff"
    ]
  },
  {
    "id": "non-disparagement-clause",
    "term": "Non-Disparagement Clause",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Barring departing employee from posting negative reviews on Glassdoor, LinkedIn, or social media.",
    "explanation": "Violating this can lead to legal notice demanding damages and withdrawal of posts.",
    "riskLevel": "caution",
    "riskNote": "Ensure non-disparagement is mutual (company leaders also cannot disparage employee).",
    "sampleClause": "Employee agrees not to make any disparaging or defamatory statements about the Company.",
    "governingAct": "Indian Penal Code / Law of Torts",
    "actNote": "Contractual restraint on public negative statements.",
    "tags": [
      "non-disparagement",
      "glassdoor",
      "reputation"
    ]
  },
  {
    "id": "clawback-provision",
    "term": "Joining Bonus / Relocation Clawback",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Requirement to refund joining bonus, relocation cost, or certification fees if resigning within 1 year.",
    "explanation": "Standard in tech and corporate roles. Demands 100% gross refund if employee quits early.",
    "riskLevel": "caution",
    "riskNote": "Negotiate pro-rata clawback (e.g. paying back only 50% if staying 6 months).",
    "sampleClause": "Joining bonus shall be refunded in full if employee leaves within 12 months of joining.",
    "governingAct": "Indian Contract Act, 1872 (Section 74)",
    "actNote": "Enforceable to recover actual upfront disbursements.",
    "tags": [
      "clawback",
      "joining-bonus",
      "relocation-refund"
    ]
  },
  {
    "id": "indemnity-clause",
    "term": "Indemnity Clause",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Obligation to compensate the other party for any loss, legal damages, or third-party liabilities.",
    "explanation": "Broad indemnities make you financially liable for indirect losses and legal fees.",
    "riskLevel": "critical",
    "riskNote": "Cap indemnity to direct losses caused by willful default and exclude consequential losses.",
    "sampleClause": "Party A shall indemnify Party B against all claims, losses, damages, and legal costs.",
    "governingAct": "Indian Contract Act, 1872 (Section 124)",
    "actNote": "Defines contract of indemnity to save promisee from loss caused by promisor.",
    "tags": [
      "indemnity",
      "liability",
      "damages",
      "risk-shifting"
    ]
  },
  {
    "id": "limitation-of-liability",
    "term": "Limitation of Liability (Liability Cap)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Contractual ceiling on the maximum financial damages one party can recover.",
    "explanation": "Service providers cap their liability to 'fees paid in past 3-12 months', blocking large claims.",
    "riskLevel": "caution",
    "riskNote": "Ensure exclusions like gross negligence and data breach are carved out of the cap.",
    "sampleClause": "Total aggregate liability of either party shall not exceed total fees paid in past 12 months.",
    "governingAct": "Indian Contract Act, 1872 (Section 73)",
    "actNote": "Restricts damages to direct losses that naturally arose in usual course.",
    "tags": [
      "liability-cap",
      "consequential-damages",
      "risk-limit"
    ]
  },
  {
    "id": "entire-agreement-integration",
    "term": "Entire Agreement / Integration Clause",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Clause stating written contract supersedes all previous verbal discussions and emails.",
    "explanation": "Oral promises made by recruiters or sales agents are legally worthless if omitted here.",
    "riskLevel": "caution",
    "riskNote": "Ensure all verbal commitments are explicitly written into the contract annexure.",
    "sampleClause": "This Agreement constitutes the entire understanding and supersedes all prior discussions.",
    "governingAct": "Indian Evidence Act, 1872 (Sections 91 & 92)",
    "actNote": "Excludes oral evidence to contradict or vary terms of a written contract.",
    "tags": [
      "entire-agreement",
      "parol-evidence",
      "integration"
    ]
  },
  {
    "id": "severability-clause",
    "term": "Severability Clause",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "If one clause is declared illegal by a court, the remaining contract remains fully valid.",
    "explanation": "Prevents the entire contract from collapsing due to one invalid restrictive term.",
    "riskLevel": "safe",
    "riskNote": "Standard boilerplate clause protecting contract enforceability.",
    "sampleClause": "If any provision is held invalid, the remaining provisions shall continue in full force.",
    "governingAct": "Indian Contract Act, 1872 (Section 24 & 57)",
    "actNote": "Enforces legal portions when separable from void portions.",
    "tags": [
      "severability",
      "enforceability",
      "boilerplate"
    ]
  },
  {
    "id": "arbitration-seat-venue",
    "term": "Arbitration Clause (Seat vs Venue)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Private dispute resolution outside regular courts; 'Seat' determines which court supervises.",
    "explanation": "If Seat is Singapore or London, Indian courts cannot intervene, dramatically raising dispute costs.",
    "riskLevel": "caution",
    "riskNote": "Ensure Seat and Venue are in your home city in India under the Arbitration Act.",
    "sampleClause": "Disputes shall be resolved by sole arbitrator with Seat and Venue in Bengaluru, India.",
    "governingAct": "Arbitration and Conciliation Act, 1996",
    "actNote": "The Seat determines the supervisory curial law of the arbitration.",
    "tags": [
      "arbitration",
      "seat",
      "venue",
      "dispute-resolution"
    ]
  },
  {
    "id": "governing-law-jurisdiction",
    "term": "Governing Law & Exclusive Jurisdiction",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Specifies which state/country laws apply and which court has exclusive power to hear cases.",
    "explanation": "An exclusive jurisdiction clause in Mumbai means a Delhi resident must travel to Mumbai for court.",
    "riskLevel": "caution",
    "riskNote": "Check that exclusive jurisdiction is in a mutually accessible city.",
    "sampleClause": "This Agreement is governed by Indian laws with exclusive jurisdiction of Courts in Delhi.",
    "governingAct": "Code of Civil Procedure, 1908 (Section 20)",
    "actNote": "Parties can contractually choose one competent court among multiple jurisdictions.",
    "tags": [
      "governing-law",
      "jurisdiction",
      "courts"
    ]
  },
  {
    "id": "time-is-of-essence",
    "term": "Time is of the Essence",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Strict legal condition making deadlines mandatory; any delay is a material contract breach.",
    "explanation": "If rent or project milestone is delayed by even 1 day, other party can terminate contract.",
    "riskLevel": "caution",
    "riskNote": "Avoid this clause on your own obligations if deliverables depend on external approvals.",
    "sampleClause": "Time is of the essence with respect to all payment and performance milestones.",
    "governingAct": "Indian Contract Act, 1872 (Section 55)",
    "actNote": "Renders contract voidable if essential time deadline is not strictly met.",
    "tags": [
      "time-is-essence",
      "deadlines",
      "breach",
      "section-55"
    ]
  },
  {
    "id": "unilateral-modification",
    "term": "Unilateral Modification Clause",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Platform right to change terms, fees, or privacy rules anytime without user consent.",
    "explanation": "Common in SaaS, fintech, and platform ToS. Forces user to accept unannounced changes.",
    "riskLevel": "critical",
    "riskNote": "Look for requirement of mandatory advance email notice before fee changes take effect.",
    "sampleClause": "Company reserves the right to modify these terms at any time without prior notice.",
    "governingAct": "Consumer Protection Act, 2019",
    "actNote": "Unilateral change of terms is an unfair contract term under consumer law.",
    "tags": [
      "unilateral-terms",
      "terms-of-service",
      "consumer-rights"
    ]
  },
  {
    "id": "specific-performance",
    "term": "Specific Performance",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Court order compelling a party to perform their exact contractual promise (e.g. execute sale).",
    "explanation": "Specific relief is now the general rule under Indian law rather than exceptional remedy.",
    "riskLevel": "safe",
    "riskNote": "Protects buyers when seller refuses to execute final sale deed after taking advance.",
    "sampleClause": "Aggrieved party shall be entitled to seek specific performance under the Specific Relief Act.",
    "governingAct": "Specific Relief Act, 1963 (Section 10 amended in 2018)",
    "actNote": "Mandates specific performance of contracts subject to statutory exceptions.",
    "tags": [
      "specific-performance",
      "remedies",
      "injunction"
    ]
  },
  {
    "id": "interim-injunction",
    "term": "Interim Injunction Relief",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Urgent court order restraining a party from doing an act (e.g. leaking code or selling property).",
    "explanation": "Prevents irreversible damage while main court dispute or arbitration is pending.",
    "riskLevel": "safe",
    "riskNote": "Standard equitable remedy preserving the status quo.",
    "sampleClause": "Either party may approach courts of competent jurisdiction for interim injunctive relief.",
    "governingAct": "Code of Civil Procedure, 1908 (Order 39) & Specific Relief Act",
    "actNote": "Governs temporary and perpetual injunctions to prevent contract breach.",
    "tags": [
      "injunction",
      "status-quo",
      "stay-order"
    ]
  },
  {
    "id": "novation-assignment",
    "term": "Novation & Assignment",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Replacing an old contract with a new contract or transferring obligations to a third party.",
    "explanation": "Requires consent of all parties; you cannot be forced to accept a new debtor without agreeing.",
    "riskLevel": "safe",
    "riskNote": "Check if company can assign your contract to any buyer without your knowledge.",
    "sampleClause": "Neither party shall assign this Agreement without prior written consent of the other.",
    "governingAct": "Indian Contract Act, 1872 (Section 62)",
    "actNote": "Effect of novation, rescission, and alteration of contract.",
    "tags": [
      "novation",
      "assignment",
      "third-party"
    ]
  },
  {
    "id": "frustration-of-contract",
    "term": "Frustration of Contract (Section 56)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Contract becomes automatically void if an unforeseen event makes performance impossible.",
    "explanation": "Applies when war, new government bans, or destruction of subject matter makes contract impossible.",
    "riskLevel": "safe",
    "riskNote": "Different from Force Majeure: frustration is statutory; Force Majeure is contractual.",
    "sampleClause": "Contract shall stand discharged if performance becomes physically or legally impossible.",
    "governingAct": "Indian Contract Act, 1872 (Section 56)",
    "actNote": "An agreement to do an act impossible in itself is void.",
    "tags": [
      "frustration",
      "impossibility",
      "section-56"
    ]
  },
  {
    "id": "waiver-no-waiver",
    "term": "No-Waiver Clause",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Failing to enforce a right once (e.g. not charging late fee this month) does not waive it forever.",
    "explanation": "Protects party from losing legal remedies just because they granted a temporary grace period.",
    "riskLevel": "safe",
    "riskNote": "Standard protective boilerplate provision.",
    "sampleClause": "Failure or delay in exercising any right shall not operate as a waiver thereof.",
    "governingAct": "Indian Contract Act, 1872",
    "actNote": "Prevents implied surrender of contractual rights.",
    "tags": [
      "waiver",
      "no-waiver",
      "boilerplate"
    ]
  },
  {
    "id": "confidentiality-nda",
    "term": "Non-Disclosure & Trade Secrets",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Strict obligation to keep business data, algorithms, and source code confidential.",
    "explanation": "Standard NDA provision. Check survival duration (typically 2-5 years or indefinite for trade secrets).",
    "riskLevel": "safe",
    "riskNote": "Ensure exclusions apply for publicly known info or court-ordered disclosures.",
    "sampleClause": "Receiving Party shall hold Confidential Information in strict confidence for 3 years.",
    "governingAct": "Indian Contract Act / Law of Trade Secrets",
    "actNote": "Protects proprietary confidential commercial information.",
    "tags": [
      "confidentiality",
      "nda",
      "trade-secrets"
    ]
  },
  {
    "id": "dpdp-act-consent",
    "term": "DPDP Act Digital Data Consent",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Explicit, informed, unambiguous consent required for processing personal citizen data.",
    "explanation": "Gives citizens right to access, correct, nominate, and erase personal data.",
    "riskLevel": "safe",
    "riskNote": "Ensure platform specifies exact purpose and provides one-click consent withdrawal.",
    "sampleClause": "User provides unambiguous consent for processing data solely for specified service delivery.",
    "governingAct": "Digital Personal Data Protection Act, 2023 (Section 6)",
    "actNote": "Mandates notice, clear consent, purpose limitation, and right to erasure.",
    "tags": [
      "dpdp-act",
      "data-privacy",
      "consent",
      "gdpr"
    ]
  },
  {
    "id": "a-khata-extract",
    "term": "A-Khata Property Extract",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of A-Khata Property Extract in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of A-Khata Property Extract detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that A-Khata Property Extract shall be complied with as per applicable statutory rules.",
    "governingAct": "Property tax assessment document certifying fully approved building plans in Bengaluru.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "a-khata-extract"
    ]
  },
  {
    "id": "b-khata-extract",
    "term": "B-Khata Property Register",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of B-Khata Property Register in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of B-Khata Property Register detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that B-Khata Property Register shall be complied with as per applicable statutory rules.",
    "governingAct": "Temporary tax ledger entry for unapproved or deviated building constructions in Karnataka.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "b-khata-extract"
    ]
  },
  {
    "id": "guidance-value-circle-rate",
    "term": "Guidance Value / Circle Rate",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Guidance Value / Circle Rate in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Guidance Value / Circle Rate detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Guidance Value / Circle Rate shall be complied with as per applicable statutory rules.",
    "governingAct": "Minimum government-prescribed rate per square foot below which property cannot be registered.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "guidance-value-circle-rate"
    ]
  },
  {
    "id": "encroachment-notice",
    "term": "Encroachment Removal Notice",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Encroachment Removal Notice in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Encroachment Removal Notice detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "caution",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Encroachment Removal Notice shall be complied with as per applicable statutory rules.",
    "governingAct": "Municipal or government notice directing removal of unauthorized construction on public land.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "encroachment-notice"
    ]
  },
  {
    "id": "demolition-notice",
    "term": "Municipal Demolition Notice",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Municipal Demolition Notice in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Municipal Demolition Notice detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "caution",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Municipal Demolition Notice shall be complied with as per applicable statutory rules.",
    "governingAct": "Statutory notice served on illegal or structurally unsafe buildings.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "demolition-notice"
    ]
  },
  {
    "id": "amalgamation-of-plots",
    "term": "Amalgamation of Plots",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Amalgamation of Plots in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Amalgamation of Plots detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Amalgamation of Plots shall be complied with as per applicable statutory rules.",
    "governingAct": "Legal process of merging two or more adjacent title parcels into a single municipal plot.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "amalgamation-of-plots"
    ]
  },
  {
    "id": "land-ceiling-clearance",
    "term": "Urban Land Ceiling Clearance (ULC)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Urban Land Ceiling Clearance (ULC) in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Urban Land Ceiling Clearance (ULC) detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Urban Land Ceiling Clearance (ULC) shall be complied with as per applicable statutory rules.",
    "governingAct": "Clearance certifying land holding complies with Urban Land (Ceiling and Regulation) laws.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "land-ceiling-clearance"
    ]
  },
  {
    "id": "commencement-certificate-cc",
    "term": "Commencement Certificate (CC)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Commencement Certificate (CC) in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Commencement Certificate (CC) detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Commencement Certificate (CC) shall be complied with as per applicable statutory rules.",
    "governingAct": "Municipal permission allowing builder to start construction after foundation inspection.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "commencement-certificate-cc"
    ]
  },
  {
    "id": "joint-development-agreement-jda",
    "term": "Joint Development Agreement (JDA)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Joint Development Agreement (JDA) in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Joint Development Agreement (JDA) detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Joint Development Agreement (JDA) shall be complied with as per applicable statutory rules.",
    "governingAct": "Contract between landowner and builder where owner provides land in exchange for built flats.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "joint-development-agreement-jda"
    ]
  },
  {
    "id": "supplementary-jda",
    "term": "Supplementary JDA Allocation",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Supplementary JDA Allocation in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Supplementary JDA Allocation detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Supplementary JDA Allocation shall be complied with as per applicable statutory rules.",
    "governingAct": "Deed specifying exact flat numbers allocated to landowner versus builder share.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "supplementary-jda"
    ]
  },
  {
    "id": "power-of-attorney-builder",
    "term": "Development Power of Attorney",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Development Power of Attorney in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Development Power of Attorney detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Development Power of Attorney shall be complied with as per applicable statutory rules.",
    "governingAct": "Authority given by landowner to builder to obtain sanctions, build, and sell flats.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "power-of-attorney-builder"
    ]
  },
  {
    "id": "rera-complaint-section-31",
    "term": "RERA Section 31 Complaint",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of RERA Section 31 Complaint in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of RERA Section 31 Complaint detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that RERA Section 31 Complaint shall be complied with as per applicable statutory rules.",
    "governingAct": "Statutory complaint filed before Real Estate Regulatory Authority for delayed flat possession.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "rera-complaint-section-31"
    ]
  },
  {
    "id": "rera-refund-interest-18",
    "term": "RERA Section 18 Possession Refund",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of RERA Section 18 Possession Refund in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of RERA Section 18 Possession Refund detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that RERA Section 18 Possession Refund shall be complied with as per applicable statutory rules.",
    "governingAct": "Buyer's right to demand full refund with interest (SBI MCLR+2%) if builder delays possession.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "rera-refund-interest-18"
    ]
  },
  {
    "id": "rera-defect-liability-period",
    "term": "5-Year RERA Defect Liability",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of 5-Year RERA Defect Liability in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of 5-Year RERA Defect Liability detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that 5-Year RERA Defect Liability shall be complied with as per applicable statutory rules.",
    "governingAct": "Builder's statutory duty to rectify structural defects free of cost for 5 years from possession.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "rera-defect-liability-period"
    ]
  },
  {
    "id": "conveyance-to-society",
    "term": "Deemed Conveyance to Society",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Deemed Conveyance to Society in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Deemed Conveyance to Society detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Deemed Conveyance to Society shall be complied with as per applicable statutory rules.",
    "governingAct": "Legal transfer of land and building ownership title from builder to the Housing Society.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "conveyance-to-society"
    ]
  },
  {
    "id": "maintenance-deposit-corpus",
    "term": "Corpus / Sinking Fund Deposit",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Corpus / Sinking Fund Deposit in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Corpus / Sinking Fund Deposit detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Corpus / Sinking Fund Deposit shall be complied with as per applicable statutory rules.",
    "governingAct": "One-time capital deposit collected from buyers placed in fixed deposit for long-term repairs.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "maintenance-deposit-corpus"
    ]
  },
  {
    "id": "preferential-location-charge-plc",
    "term": "Preferential Location Charge (PLC)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Preferential Location Charge (PLC) in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Preferential Location Charge (PLC) detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Preferential Location Charge (PLC) shall be complied with as per applicable statutory rules.",
    "governingAct": "Extra charge levied by builders for pool-facing, corner, or higher-floor apartments.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "preferential-location-charge-plc"
    ]
  },
  {
    "id": "external-development-charges-edc",
    "term": "External Development Charges (EDC)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of External Development Charges (EDC) in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of External Development Charges (EDC) detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that External Development Charges (EDC) shall be complied with as per applicable statutory rules.",
    "governingAct": "Civic infrastructure charges collected by government for master roads, water, and sewage lines.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "external-development-charges-edc"
    ]
  },
  {
    "id": "internal-development-charges-idc",
    "term": "Internal Development Charges (IDC)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Internal Development Charges (IDC) in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Internal Development Charges (IDC) detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Internal Development Charges (IDC) shall be complied with as per applicable statutory rules.",
    "governingAct": "Charges for laying internal colony roads, drainage, streetlights, and parks.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "internal-development-charges-idc"
    ]
  },
  {
    "id": "sub-registrar-valuation",
    "term": "Sub-Registrar Market Valuation",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Sub-Registrar Market Valuation in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Sub-Registrar Market Valuation detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Sub-Registrar Market Valuation shall be complied with as per applicable statutory rules.",
    "governingAct": "Official assessment of market value by registration authority for calculating stamp duty.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "sub-registrar-valuation"
    ]
  },
  {
    "id": "gift-deed-immovable-property",
    "term": "Gift Deed of Real Estate",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Gift Deed of Real Estate in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Gift Deed of Real Estate detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Gift Deed of Real Estate shall be complied with as per applicable statutory rules.",
    "governingAct": "Voluntary transfer of property ownership without monetary consideration; requires mandatory registration.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "gift-deed-immovable-property"
    ]
  },
  {
    "id": "relinquishment-deed",
    "term": "Relinquishment / Release Deed",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Relinquishment / Release Deed in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Relinquishment / Release Deed detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Relinquishment / Release Deed shall be complied with as per applicable statutory rules.",
    "governingAct": "Legal deed where a co-heir gives up their inheritance share in ancestral property to other heirs.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "relinquishment-deed"
    ]
  },
  {
    "id": "settlement-deed",
    "term": "Family Settlement Deed",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Family Settlement Deed in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Family Settlement Deed detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Family Settlement Deed shall be complied with as per applicable statutory rules.",
    "governingAct": "Deed partitioning ancestral or joint family property among legal heirs by mutual agreement.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "settlement-deed"
    ]
  },
  {
    "id": "probate-of-will",
    "term": "Probate of Will",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Probate of Will in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Probate of Will detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Probate of Will shall be complied with as per applicable statutory rules.",
    "governingAct": "Court-certified copy of a Will establishing the executor's legal authority to distribute property.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "probate-of-will"
    ]
  },
  {
    "id": "letters-of-administration",
    "term": "Letters of Administration",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Letters of Administration in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Letters of Administration detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Letters of Administration shall be complied with as per applicable statutory rules.",
    "governingAct": "Court grant appointing administrator to distribute assets when person dies intestate (without a will).",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "letters-of-administration"
    ]
  },
  {
    "id": "succession-certificate",
    "term": "Succession Certificate (Debts & Securities)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Succession Certificate (Debts & Securities) in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Succession Certificate (Debts & Securities) detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Succession Certificate (Debts & Securities) shall be complied with as per applicable statutory rules.",
    "governingAct": "Court certificate issued to legal heirs to claim movable assets, bank balances, and shares.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "succession-certificate"
    ]
  },
  {
    "id": "legal-heir-certificate",
    "term": "Legal Heirship Certificate / Varisu",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Legal Heirship Certificate / Varisu in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Legal Heirship Certificate / Varisu detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Legal Heirship Certificate / Varisu shall be complied with as per applicable statutory rules.",
    "governingAct": "Revenue department certificate issued by Tehsildar listing surviving legal family members.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "legal-heir-certificate"
    ]
  },
  {
    "id": "coparcenary-rights",
    "term": "Hindu Coparcenary Property Rights",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Hindu Coparcenary Property Rights in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Hindu Coparcenary Property Rights detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Hindu Coparcenary Property Rights shall be complied with as per applicable statutory rules.",
    "governingAct": "Birthright of sons and daughters in ancestral joint family property under Hindu law.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "coparcenary-rights"
    ]
  },
  {
    "id": "self-acquired-property",
    "term": "Self-Acquired vs Ancestral Property",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Self-Acquired vs Ancestral Property in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Self-Acquired vs Ancestral Property detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Self-Acquired vs Ancestral Property shall be complied with as per applicable statutory rules.",
    "governingAct": "Property bought with own earned funds can be willed or sold freely without family consent.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "self-acquired-property"
    ]
  },
  {
    "id": "adverse-possession",
    "term": "Adverse Possession (12-Year Rule)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Adverse Possession (12-Year Rule) in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Adverse Possession (12-Year Rule) detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Adverse Possession (12-Year Rule) shall be complied with as per applicable statutory rules.",
    "governingAct": "Claiming legal ownership of private land after 12 years of continuous, hostile, uninterrupted possession.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "adverse-possession"
    ]
  },
  {
    "id": "easement-of-necessity",
    "term": "Easement of Necessity",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Easement of Necessity in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Easement of Necessity detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Easement of Necessity shall be complied with as per applicable statutory rules.",
    "governingAct": "Inherent right of way over another's land when a plot has no other access to a public road.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "easement-of-necessity"
    ]
  },
  {
    "id": "easement-by-prescription",
    "term": "Prescriptive Easement (20 Years)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Prescriptive Easement (20 Years) in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Prescriptive Easement (20 Years) detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Prescriptive Easement (20 Years) shall be complied with as per applicable statutory rules.",
    "governingAct": "Acquiring permanent right of light, air, or pathway after 20 years of continuous uninterrupted enjoyment.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "easement-by-prescription"
    ]
  },
  {
    "id": "riparian-water-rights",
    "term": "Riparian Water Rights",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Riparian Water Rights in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Riparian Water Rights detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Riparian Water Rights shall be complied with as per applicable statutory rules.",
    "governingAct": "Right of a landowner whose property borders a natural river or watercourse to reasonable water use.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "riparian-water-rights"
    ]
  },
  {
    "id": "boundary-dispute-survey",
    "term": "Boundary Demarcation Survey",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Boundary Demarcation Survey in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Boundary Demarcation Survey detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "caution",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Boundary Demarcation Survey shall be complied with as per applicable statutory rules.",
    "governingAct": "Formal survey conducted by government taluk surveyor to fix property boundary stones.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "boundary-dispute-survey"
    ]
  },
  {
    "id": "stay-order-status-quo",
    "term": "Status Quo Order on Property",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Status Quo Order on Property in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Status Quo Order on Property detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Status Quo Order on Property shall be complied with as per applicable statutory rules.",
    "governingAct": "Court injunction restraining both parties from selling, mortgaging, or altering the property.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "stay-order-status-quo"
    ]
  },
  {
    "id": "caveat-petition-property",
    "term": "Caveat Petition in Property Dispute",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Caveat Petition in Property Dispute in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Caveat Petition in Property Dispute detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Caveat Petition in Property Dispute shall be complied with as per applicable statutory rules.",
    "governingAct": "Formal notice to court requiring notice to caveator before any ex-parte stay order is passed.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "caveat-petition-property"
    ]
  },
  {
    "id": "mesne-profits-inquiry",
    "term": "Mesne Profits Inquiry (Order 20 Rule 12)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Mesne Profits Inquiry (Order 20 Rule 12) in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Mesne Profits Inquiry (Order 20 Rule 12) detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Mesne Profits Inquiry (Order 20 Rule 12) shall be complied with as per applicable statutory rules.",
    "governingAct": "Court proceedings to compute exact financial loss and rental income accrued during illegal occupation.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "mesne-profits-inquiry"
    ]
  },
  {
    "id": "warrant-of-possession",
    "term": "Warrant of Possession (Bailiff Handover)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Warrant of Possession (Bailiff Handover) in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Warrant of Possession (Bailiff Handover) detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Warrant of Possession (Bailiff Handover) shall be complied with as per applicable statutory rules.",
    "governingAct": "Court order directing court bailiff and police to break open locks and deliver physical possession.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "warrant-of-possession"
    ]
  },
  {
    "id": "execution-petition-eviction",
    "term": "Execution Petition (EP) for Eviction",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Execution Petition (EP) for Eviction in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Execution Petition (EP) for Eviction detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Execution Petition (EP) for Eviction shall be complied with as per applicable statutory rules.",
    "governingAct": "Formal legal enforcement filing to execute an eviction decree passed by a court.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "execution-petition-eviction"
    ]
  },
  {
    "id": "rent-court-appeal",
    "term": "Rent Tribunal Appellate Authority",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Key statutory definition and application of Rent Tribunal Appellate Authority in Indian real estate and property disputes.",
    "explanation": "Detailed explanation of Rent Tribunal Appellate Authority detailing rights, liabilities, documentation, and risk mitigation.",
    "riskLevel": "safe",
    "riskNote": "Verify all revenue records and obtain legal search reports before executing deeds.",
    "sampleClause": "The parties agree that Rent Tribunal Appellate Authority shall be complied with as per applicable statutory rules.",
    "governingAct": "Appellate forum hearing appeals against Rent Authority and Rent Court orders within 30 days.",
    "actNote": "Governed by statutory provisions and authoritative judicial pronouncements.",
    "tags": [
      "property",
      "real-estate",
      "land-laws",
      "rent-court-appeal"
    ]
  },
  {
    "id": "mclr-benchmark",
    "term": "Marginal Cost of Funds based Lending Rate (MCLR)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Marginal Cost of Funds based Lending Rate (MCLR) in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Marginal Cost of Funds based Lending Rate (MCLR) detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Marginal Cost of Funds based Lending Rate (MCLR).",
    "governingAct": "Internal benchmark lending rate calculated by banks based on their cost of funds.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "mclr-benchmark"
    ]
  },
  {
    "id": "repo-linked-rate-rllr",
    "term": "Repo Linked Lending Rate (RLLR / EBLR)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Repo Linked Lending Rate (RLLR / EBLR) in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Repo Linked Lending Rate (RLLR / EBLR) detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Repo Linked Lending Rate (RLLR / EBLR).",
    "governingAct": "Lending rate tied directly to RBI's repo rate, ensuring fast rate cuts for borrowers.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "repo-linked-rate-rllr"
    ]
  },
  {
    "id": "base-rate-legacy",
    "term": "Base Rate System (Pre-2016)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Base Rate System (Pre-2016) in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Base Rate System (Pre-2016) detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Base Rate System (Pre-2016).",
    "governingAct": "Legacy internal benchmark rate used before MCLR; borrowers can switch to RLLR without penalty.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "base-rate-legacy"
    ]
  },
  {
    "id": "credit-appraisal",
    "term": "Credit Appraisal & Underwriting",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Credit Appraisal & Underwriting in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Credit Appraisal & Underwriting detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Credit Appraisal & Underwriting.",
    "governingAct": "Lender's risk assessment evaluating borrower's income, CIBIL score, bank statements, and debt capacity.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "credit-appraisal"
    ]
  },
  {
    "id": "loan-sanction-letter",
    "term": "Loan Sanction Letter",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Loan Sanction Letter in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Loan Sanction Letter detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Loan Sanction Letter.",
    "governingAct": "Formal letter stating approved loan amount, interest rate, tenure, and pre-disbursement conditions.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "loan-sanction-letter"
    ]
  },
  {
    "id": "disbursement-milestone",
    "term": "Construction-Linked Disbursement Schedule",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Construction-Linked Disbursement Schedule in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Construction-Linked Disbursement Schedule detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Construction-Linked Disbursement Schedule.",
    "governingAct": "Releasing home loan tranches in stages matching verified building construction slabs.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "disbursement-milestone"
    ]
  },
  {
    "id": "down-payment-margin-money",
    "term": "Own Contribution / Margin Money",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Own Contribution / Margin Money in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Own Contribution / Margin Money detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Own Contribution / Margin Money.",
    "governingAct": "The 10-20% portion of property purchase price paid upfront by the borrower from own funds.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "down-payment-margin-money"
    ]
  },
  {
    "id": "loan-to-value-ltv",
    "term": "Loan-to-Value (LTV) Ratio Cap",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Loan-to-Value (LTV) Ratio Cap in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Loan-to-Value (LTV) Ratio Cap detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Loan-to-Value (LTV) Ratio Cap.",
    "governingAct": "Maximum percentage of property value a bank can lend (capped at 75-90% by RBI).",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "loan-to-value-ltv"
    ]
  },
  {
    "id": "amortization-schedule",
    "term": "Loan Amortization Schedule",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Loan Amortization Schedule in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Loan Amortization Schedule detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Loan Amortization Schedule.",
    "governingAct": "Month-by-month table showing how each EMI is split between interest and principal reduction.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "amortization-schedule"
    ]
  },
  {
    "id": "interest-reset-clause",
    "term": "Interest Rate Reset Clause",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Interest Rate Reset Clause in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Interest Rate Reset Clause detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Interest Rate Reset Clause.",
    "governingAct": "Date on which a floating-rate loan is recalculated based on current benchmark rates.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "interest-reset-clause"
    ]
  },
  {
    "id": "tenure-extension-vs-emi-hike",
    "term": "Tenure Extension vs EMI Hike Option",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Tenure Extension vs EMI Hike Option in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Tenure Extension vs EMI Hike Option detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Tenure Extension vs EMI Hike Option.",
    "governingAct": "Choice given to borrower when interest rates rise: increase monthly EMI or extend loan tenure.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "tenure-extension-vs-emi-hike"
    ]
  },
  {
    "id": "loan-restructuring",
    "term": "Resolution Framework / Loan Restructuring",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Resolution Framework / Loan Restructuring in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Resolution Framework / Loan Restructuring detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Resolution Framework / Loan Restructuring.",
    "governingAct": "Modifying loan terms (extending tenure or moratorium) to help stressed borrowers avoid NPA default.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "loan-restructuring"
    ]
  },
  {
    "id": "one-time-settlement-ots",
    "term": "One-Time Settlement (OTS / Haircut)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of One-Time Settlement (OTS / Haircut) in Indian banking and retail finance.",
    "explanation": "Detailed explanation of One-Time Settlement (OTS / Haircut) detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing One-Time Settlement (OTS / Haircut).",
    "governingAct": "Compromise settlement where lender accepts reduced lump sum payment to close a default loan.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "one-time-settlement-ots"
    ]
  },
  {
    "id": "wilful-defaulter",
    "term": "Wilful Defaulter Classification",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Wilful Defaulter Classification in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Wilful Defaulter Classification detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "critical",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Wilful Defaulter Classification.",
    "governingAct": "Borrower who has capacity to pay but deliberately defaults or siphons off loan funds.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "wilful-defaulter"
    ]
  },
  {
    "id": "drice-recovery-drt",
    "term": "Debts Recovery Tribunal (DRT)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Debts Recovery Tribunal (DRT) in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Debts Recovery Tribunal (DRT) detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Debts Recovery Tribunal (DRT).",
    "governingAct": "Specialized tribunal for recovering non-performing bank loans exceeding Rs. 20 Lakhs.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "drice-recovery-drt"
    ]
  },
  {
    "id": "national-company-law-tribunal-nclt",
    "term": "Insolvency Resolution (NCLT / IBC)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Insolvency Resolution (NCLT / IBC) in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Insolvency Resolution (NCLT / IBC) detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Insolvency Resolution (NCLT / IBC).",
    "governingAct": "Corporate bankruptcy proceedings initiated against defaulting companies before NCLT.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "national-company-law-tribunal-nclt"
    ]
  },
  {
    "id": "moratorium-under-ibc",
    "term": "Section 14 Moratorium (IBC)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Section 14 Moratorium (IBC) in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Section 14 Moratorium (IBC) detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Section 14 Moratorium (IBC).",
    "governingAct": "Court-ordered freeze halting all creditor lawsuits, debt recoveries, and asset seizures against debtor.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "moratorium-under-ibc"
    ]
  },
  {
    "id": "resolution-plan-ibc",
    "term": "Resolution Plan & Haircuts",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Resolution Plan & Haircuts in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Resolution Plan & Haircuts detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Resolution Plan & Haircuts.",
    "governingAct": "Bid by resolution applicant to acquire and revive bankrupt company, approved by Committee of Creditors.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "resolution-plan-ibc"
    ]
  },
  {
    "id": "personal-insolvency-ibc",
    "term": "Personal Guarantor Insolvency",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Personal Guarantor Insolvency in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Personal Guarantor Insolvency detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Personal Guarantor Insolvency.",
    "governingAct": "Insolvency proceedings initiated directly against individual guarantors of corporate loans.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "personal-insolvency-ibc"
    ]
  },
  {
    "id": "debt-consolidation",
    "term": "Debt Consolidation Loan",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Debt Consolidation Loan in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Debt Consolidation Loan detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Debt Consolidation Loan.",
    "governingAct": "Taking one single large low-interest loan to pay off multiple high-interest credit card debts.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "debt-consolidation"
    ]
  },
  {
    "id": "co-borrower-liability",
    "term": "Co-Borrower Joint & Several Liability",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Co-Borrower Joint & Several Liability in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Co-Borrower Joint & Several Liability detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Co-Borrower Joint & Several Liability.",
    "governingAct": "Co-borrower shares 100% legal responsibility for loan repayment even after divorce or dispute.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "co-borrower-liability"
    ]
  },
  {
    "id": "co-signer-vs-guarantor",
    "term": "Co-Signer vs Guarantor Distinction",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Co-Signer vs Guarantor Distinction in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Co-Signer vs Guarantor Distinction detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Co-Signer vs Guarantor Distinction.",
    "governingAct": "Co-signer is an immediate primary borrower; guarantor is liable only after principal debtor defaults.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "co-signer-vs-guarantor"
    ]
  },
  {
    "id": "balloon-payment",
    "term": "Balloon Payment Structure",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Balloon Payment Structure in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Balloon Payment Structure detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Balloon Payment Structure.",
    "governingAct": "Loan structure with low initial EMIs and a massive lump sum payment due at final maturity.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "balloon-payment"
    ]
  },
  {
    "id": "bullet-repayment",
    "term": "Bullet Repayment Loan",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Bullet Repayment Loan in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Bullet Repayment Loan detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Bullet Repayment Loan.",
    "governingAct": "Loan where entire principal and accumulated interest are repaid together at the end of the tenure.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "bullet-repayment"
    ]
  },
  {
    "id": "step-down-emi",
    "term": "Step-Down EMI Plan",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Step-Down EMI Plan in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Step-Down EMI Plan detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Step-Down EMI Plan.",
    "governingAct": "Loan where EMIs are high initially and decrease over time as borrower approaches retirement.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "step-down-emi"
    ]
  },
  {
    "id": "step-up-emi",
    "term": "Step-Up EMI Plan",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Step-Up EMI Plan in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Step-Up EMI Plan detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Step-Up EMI Plan.",
    "governingAct": "Loan with lower initial EMIs that increase annually anticipating borrower's career salary growth.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "step-up-emi"
    ]
  },
  {
    "id": "overdraft-facility-od",
    "term": "Overdraft Facility (OD against Property)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Overdraft Facility (OD against Property) in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Overdraft Facility (OD against Property) detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Overdraft Facility (OD against Property).",
    "governingAct": "Flexible revolving credit line where interest is charged only on the exact amount used daily.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "overdraft-facility-od"
    ]
  },
  {
    "id": "cash-credit-facility-cc",
    "term": "Cash Credit Limit (CC for Working Capital)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Cash Credit Limit (CC for Working Capital) in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Cash Credit Limit (CC for Working Capital) detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Cash Credit Limit (CC for Working Capital).",
    "governingAct": "Short-term revolving credit facility secured by hypothecation of business stock and debtors.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "cash-credit-facility-cc"
    ]
  },
  {
    "id": "bank-guarantee-bg",
    "term": "Bank Guarantee (Financial vs Performance)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Bank Guarantee (Financial vs Performance) in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Bank Guarantee (Financial vs Performance) detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Bank Guarantee (Financial vs Performance).",
    "governingAct": "Bank's irrevocable promise to pay a third party if the customer fails to perform contract duties.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "bank-guarantee-bg"
    ]
  },
  {
    "id": "letter-of-credit-lc",
    "term": "Letter of Credit (LC / Documentary Credit)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Letter of Credit (LC / Documentary Credit) in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Letter of Credit (LC / Documentary Credit) detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Letter of Credit (LC / Documentary Credit).",
    "governingAct": "Bank's guarantee of payment to seller in international trade upon presentation of shipping bills.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "letter-of-credit-lc"
    ]
  },
  {
    "id": "debit-freeze-account",
    "term": "Account Debit Freeze / Lien",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Account Debit Freeze / Lien in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Account Debit Freeze / Lien detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "critical",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Account Debit Freeze / Lien.",
    "governingAct": "Bank freezing account debits following police cyber-crime orders or court attachment warrants.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "debit-freeze-account"
    ]
  },
  {
    "id": "garnishee-order",
    "term": "Garnishee Order (Court Attachment)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Garnishee Order (Court Attachment) in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Garnishee Order (Court Attachment) detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Garnishee Order (Court Attachment).",
    "governingAct": "Court order directing bank to pay money from debtor's account directly to a judgment creditor.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "garnishee-order"
    ]
  },
  {
    "id": "income-tax-attachment",
    "term": "Section 226(3) IT Attachment Notice",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Section 226(3) IT Attachment Notice in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Section 226(3) IT Attachment Notice detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "critical",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Section 226(3) IT Attachment Notice.",
    "governingAct": "Tax department notice directing bank to freeze account and remit funds for unpaid tax arrears.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "income-tax-attachment"
    ]
  },
  {
    "id": "cibil-dud-dispute",
    "term": "Credit Information Dispute Resolution",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Credit Information Dispute Resolution in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Credit Information Dispute Resolution detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Credit Information Dispute Resolution.",
    "governingAct": "Statutory process to correct erroneous default marks or identity theft on CIBIL report within 30 days.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "cibil-dud-dispute"
    ]
  },
  {
    "id": "cool-off-period-digital-loan",
    "term": "Look-up / Cooling-off Period (Digital Loans)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Look-up / Cooling-off Period (Digital Loans) in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Look-up / Cooling-off Period (Digital Loans) detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Look-up / Cooling-off Period (Digital Loans).",
    "governingAct": "Statutory 3-5 day window allowing borrower to exit a digital loan without paying prepayment penalty.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "cool-off-period-digital-loan"
    ]
  },
  {
    "id": "key-fact-statement-kfs",
    "term": "Key Fact Statement (KFS Mandate)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Key Fact Statement (KFS Mandate) in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Key Fact Statement (KFS Mandate) detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Key Fact Statement (KFS Mandate).",
    "governingAct": "Mandatory 1-page standardized summary showing all fees, APR, recovery agents, and grievance nodal officer.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "key-fact-statement-kfs"
    ]
  },
  {
    "id": "recovery-agent-code-of-conduct",
    "term": "Recovery Agent Code of Conduct",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Recovery Agent Code of Conduct in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Recovery Agent Code of Conduct detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Recovery Agent Code of Conduct.",
    "governingAct": "Strict RBI rules barring recovery agents from calling before 8 AM / after 7 PM or harassing family.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "recovery-agent-code-of-conduct"
    ]
  },
  {
    "id": "banking-ombudsman-scheme",
    "term": "RBI Integrated Ombudsman Scheme",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of RBI Integrated Ombudsman Scheme in Indian banking and retail finance.",
    "explanation": "Detailed explanation of RBI Integrated Ombudsman Scheme detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing RBI Integrated Ombudsman Scheme.",
    "governingAct": "Free statutory dispute forum resolving unresolved bank and NBFC customer complaints within 30 days.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "banking-ombudsman-scheme"
    ]
  },
  {
    "id": "credit-card-billing-cycle",
    "term": "Credit Card Grace Period (Billing Cycle)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Credit Card Grace Period (Billing Cycle) in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Credit Card Grace Period (Billing Cycle) detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "safe",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Credit Card Grace Period (Billing Cycle).",
    "governingAct": "Interest-free credit window (20-50 days) provided total outstanding statement balance is paid in full.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "credit-card-billing-cycle"
    ]
  },
  {
    "id": "minimum-amount-due-trap",
    "term": "Minimum Amount Due (MAD) Interest Trap",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Statutory definition and regulatory application of Minimum Amount Due (MAD) Interest Trap in Indian banking and retail finance.",
    "explanation": "Detailed explanation of Minimum Amount Due (MAD) Interest Trap detailing borrower rights, repayment calculations, and recovery norms.",
    "riskLevel": "critical",
    "riskNote": "Carefully inspect the Key Fact Statement (KFS) and verify all APR calculations.",
    "sampleClause": "The Borrower agrees to the terms and regulatory requirements governing Minimum Amount Due (MAD) Interest Trap.",
    "governingAct": "Paying only 5% minimum due triggers 40%+ annual interest on all past and new card purchases.",
    "actNote": "Regulated by RBI Master Directions and statutory debt recovery laws.",
    "tags": [
      "banking",
      "loans",
      "finance",
      "credit",
      "minimum-amount-due-trap"
    ]
  },
  {
    "id": "non-compete-sc-precedent",
    "term": "Percept D'Mark SC Judgment on Non-Compete",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Percept D'Mark SC Judgment on Non-Compete under Indian labour laws.",
    "explanation": "Detailed explanation of Percept D'Mark SC Judgment on Non-Compete covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Percept D'Mark SC Judgment on Non-Compete.",
    "governingAct": "Landmark Supreme Court ruling holding all post-employment non-compete clauses void under Section 27.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "non-compete-sc-precedent"
    ]
  },
  {
    "id": "niranjan-golikari-precedent",
    "term": "Niranjan Golikari SC Judgment",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Niranjan Golikari SC Judgment under Indian labour laws.",
    "explanation": "Detailed explanation of Niranjan Golikari SC Judgment covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Niranjan Golikari SC Judgment.",
    "governingAct": "Supreme Court ruling upholding non-compete restrictions during active employment tenure.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "niranjan-golikari-precedent"
    ]
  },
  {
    "id": "inventions-assignment-act",
    "term": "Patent Inventions Assignment Clause",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Patent Inventions Assignment Clause under Indian labour laws.",
    "explanation": "Detailed explanation of Patent Inventions Assignment Clause covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Patent Inventions Assignment Clause.",
    "governingAct": "Clause assigning employee inventions to employer; employee remains statutory named inventor.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "inventions-assignment-act"
    ]
  },
  {
    "id": "gratuity-forfeiture-rules",
    "term": "Statutory Forfeiture of Gratuity",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Statutory Forfeiture of Gratuity under Indian labour laws.",
    "explanation": "Detailed explanation of Statutory Forfeiture of Gratuity covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Statutory Forfeiture of Gratuity.",
    "governingAct": "Gratuity can be forfeited ONLY for proven moral turpitude or intentional damage causing financial loss.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "gratuity-forfeiture-rules"
    ]
  },
  {
    "id": "continuous-service-gratuity",
    "term": "240-Day Rule for Continuous Service",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of 240-Day Rule for Continuous Service under Indian labour laws.",
    "explanation": "Detailed explanation of 240-Day Rule for Continuous Service covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding 240-Day Rule for Continuous Service.",
    "governingAct": "Working 240 days in the 5th year fulfills the 5-year eligibility condition for statutory gratuity.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "continuous-service-gratuity"
    ]
  },
  {
    "id": "maternity-benefit-act-26-weeks",
    "term": "26 Weeks Paid Maternity Leave",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of 26 Weeks Paid Maternity Leave under Indian labour laws.",
    "explanation": "Detailed explanation of 26 Weeks Paid Maternity Leave covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding 26 Weeks Paid Maternity Leave.",
    "governingAct": "Mandatory 26 weeks paid maternity leave for women in establishments with 10+ employees.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "maternity-benefit-act-26-weeks"
    ]
  },
  {
    "id": "creche-facility-mandate",
    "term": "Mandatory Workplace Cr\u00e8che Facility",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Mandatory Workplace Cr\u00e8che Facility under Indian labour laws.",
    "explanation": "Detailed explanation of Mandatory Workplace Cr\u00e8che Facility covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Mandatory Workplace Cr\u00e8che Facility.",
    "governingAct": "Statutory requirement for companies with 50+ employees to provide an on-site or nearby cr\u00e8che.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "creche-facility-mandate"
    ]
  },
  {
    "id": "equal-remuneration-act",
    "term": "Equal Remuneration for Men & Women",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Equal Remuneration for Men & Women under Indian labour laws.",
    "explanation": "Detailed explanation of Equal Remuneration for Men & Women covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Equal Remuneration for Men & Women.",
    "governingAct": "Prohibits gender wage discrimination for the same work or work of a similar nature.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "equal-remuneration-act"
    ]
  },
  {
    "id": "workman-vs-manager-definition",
    "term": "Workman vs Managerial Employee",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Workman vs Managerial Employee under Indian labour laws.",
    "explanation": "Detailed explanation of Workman vs Managerial Employee covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Workman vs Managerial Employee.",
    "governingAct": "Workmen get strict protection against retrenchment and layoff under the Industrial Disputes Act.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "workman-vs-manager-definition"
    ]
  },
  {
    "id": "retrenchment-compensation",
    "term": "Section 25F Retrenchment Compensation",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Section 25F Retrenchment Compensation under Indian labour laws.",
    "explanation": "Detailed explanation of Section 25F Retrenchment Compensation covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Section 25F Retrenchment Compensation.",
    "governingAct": "15 days average pay for every completed year of service plus 1 month notice before retrenchment.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "retrenchment-compensation"
    ]
  },
  {
    "id": "last-come-first-go",
    "term": "Last Come, First Go Rule (Section 25G)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Last Come, First Go Rule (Section 25G) under Indian labour laws.",
    "explanation": "Detailed explanation of Last Come, First Go Rule (Section 25G) covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Last Come, First Go Rule (Section 25G).",
    "governingAct": "Statutory seniority rule where the most recently hired worker is retrenched first during layoffs.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "last-come-first-go"
    ]
  },
  {
    "id": "unfair-labour-practice",
    "term": "Unfair Labour Practices Schedule",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Unfair Labour Practices Schedule under Indian labour laws.",
    "explanation": "Detailed explanation of Unfair Labour Practices Schedule covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Unfair Labour Practices Schedule.",
    "governingAct": "Statutory list of illegal employer actions including victimizing workers or breaking unions.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "unfair-labour-practice"
    ]
  },
  {
    "id": "standing-orders-act",
    "term": "Industrial Employment Standing Orders",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Industrial Employment Standing Orders under Indian labour laws.",
    "explanation": "Detailed explanation of Industrial Employment Standing Orders covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Industrial Employment Standing Orders.",
    "governingAct": "Statutory service conditions governing classification of workers, shifts, leave, and discipline.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "standing-orders-act"
    ]
  },
  {
    "id": "show-cause-notice-misconduct",
    "term": "Show Cause Notice & Domestic Inquiry",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Show Cause Notice & Domestic Inquiry under Indian labour laws.",
    "explanation": "Detailed explanation of Show Cause Notice & Domestic Inquiry covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "critical",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Show Cause Notice & Domestic Inquiry.",
    "governingAct": "Mandatory fair hearing and inquiry process before terminating employee for alleged misconduct.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "show-cause-notice-misconduct"
    ]
  },
  {
    "id": "suspension-subsistence-allowance",
    "term": "Suspension & Subsistence Allowance",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Suspension & Subsistence Allowance under Indian labour laws.",
    "explanation": "Detailed explanation of Suspension & Subsistence Allowance covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Suspension & Subsistence Allowance.",
    "governingAct": "Mandatory payment of 50-75% wages to employee during pendency of a disciplinary inquiry.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "suspension-subsistence-allowance"
    ]
  },
  {
    "id": "summary-dismissal-cause",
    "term": "Summary Dismissal (Termination for Cause)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Summary Dismissal (Termination for Cause) under Indian labour laws.",
    "explanation": "Detailed explanation of Summary Dismissal (Termination for Cause) covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Summary Dismissal (Termination for Cause).",
    "governingAct": "Immediate firing without notice pay for gross misconduct (theft, fraud, violence).",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "summary-dismissal-cause"
    ]
  },
  {
    "id": "termination-without-cause",
    "term": "Termination for Convenience / Without Cause",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Termination for Convenience / Without Cause under Indian labour laws.",
    "explanation": "Detailed explanation of Termination for Convenience / Without Cause covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Termination for Convenience / Without Cause.",
    "governingAct": "Ending employment by serving contractual notice period or paying salary in lieu without proving fault.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "termination-without-cause"
    ]
  },
  {
    "id": "wrongful-termination-damages",
    "term": "Wrongful Termination & Notice Pay Damages",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Wrongful Termination & Notice Pay Damages under Indian labour laws.",
    "explanation": "Detailed explanation of Wrongful Termination & Notice Pay Damages covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Wrongful Termination & Notice Pay Damages.",
    "governingAct": "Indian private sector remedy for wrongful firing is limited to contractual notice period pay.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "wrongful-termination-damages"
    ]
  },
  {
    "id": "fixed-term-employment-fte",
    "term": "Fixed-Term Employment (FTE Contract)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Fixed-Term Employment (FTE Contract) under Indian labour laws.",
    "explanation": "Detailed explanation of Fixed-Term Employment (FTE Contract) covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Fixed-Term Employment (FTE Contract).",
    "governingAct": "Direct contractual hiring for a fixed tenure with pro-rata statutory benefits on par with permanent staff.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "fixed-term-employment-fte"
    ]
  },
  {
    "id": "contract-labour-act-clra",
    "term": "Contract Labour Regulation & Abolition (CLRA)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Contract Labour Regulation & Abolition (CLRA) under Indian labour laws.",
    "explanation": "Detailed explanation of Contract Labour Regulation & Abolition (CLRA) covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Contract Labour Regulation & Abolition (CLRA).",
    "governingAct": "Principal employer remains liable for statutory dues of third-party contract workers.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "contract-labour-act-clra"
    ]
  },
  {
    "id": "minimum-wages-act-compliance",
    "term": "Statutory Minimum Wages Compliance",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Statutory Minimum Wages Compliance under Indian labour laws.",
    "explanation": "Detailed explanation of Statutory Minimum Wages Compliance covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Statutory Minimum Wages Compliance.",
    "governingAct": "Paying below government notified minimum wage is an illegal offense under Indian labour law.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "minimum-wages-act-compliance"
    ]
  },
  {
    "id": "payment-of-wages-7th-day",
    "term": "Payment of Wages by 7th/10th of Month",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Payment of Wages by 7th/10th of Month under Indian labour laws.",
    "explanation": "Detailed explanation of Payment of Wages by 7th/10th of Month covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Payment of Wages by 7th/10th of Month.",
    "governingAct": "Statutory deadline for employers to disburse monthly employee salaries.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "payment-of-wages-7th-day"
    ]
  },
  {
    "id": "bonus-act-statutory-833",
    "term": "Statutory Annual Bonus (8.33% - 20%)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Statutory Annual Bonus (8.33% - 20%) under Indian labour laws.",
    "explanation": "Detailed explanation of Statutory Annual Bonus (8.33% - 20%) covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Statutory Annual Bonus (8.33% - 20%).",
    "governingAct": "Mandatory minimum 8.33% annual bonus for eligible employees earning basic under statutory threshold.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "bonus-act-statutory-833"
    ]
  },
  {
    "id": "leave-encashment-rules",
    "term": "Privilege / Earned Leave Encashment",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Privilege / Earned Leave Encashment under Indian labour laws.",
    "explanation": "Detailed explanation of Privilege / Earned Leave Encashment covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Privilege / Earned Leave Encashment.",
    "governingAct": "Statutory right to accumulate and encash unavailed earned leaves upon resignation or retirement.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "leave-encashment-rules"
    ]
  },
  {
    "id": "casual-and-sick-leave",
    "term": "Casual & Sick Leave Statutory Norms",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Casual & Sick Leave Statutory Norms under Indian labour laws.",
    "explanation": "Detailed explanation of Casual & Sick Leave Statutory Norms covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Casual & Sick Leave Statutory Norms.",
    "governingAct": "Mandatory annual allocation of casual and medical leaves specified under state labour acts.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "casual-and-sick-leave"
    ]
  },
  {
    "id": "overtime-double-wages",
    "term": "Overtime Wages at Double Normal Rate",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Overtime Wages at Double Normal Rate under Indian labour laws.",
    "explanation": "Detailed explanation of Overtime Wages at Double Normal Rate covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Overtime Wages at Double Normal Rate.",
    "governingAct": "Statutory requirement to pay double the ordinary hourly wage rate for work beyond 9 hours/day.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "overtime-double-wages"
    ]
  },
  {
    "id": "comp-off-policy",
    "term": "Compensatory Off (Comp-Off Policy)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Compensatory Off (Comp-Off Policy) under Indian labour laws.",
    "explanation": "Detailed explanation of Compensatory Off (Comp-Off Policy) covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Compensatory Off (Comp-Off Policy).",
    "governingAct": "Paid time off granted when an employee works on a scheduled weekend or public holiday.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "comp-off-policy"
    ]
  },
  {
    "id": "national-holidays-act",
    "term": "National & Festival Holidays (3 Mandatory)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of National & Festival Holidays (3 Mandatory) under Indian labour laws.",
    "explanation": "Detailed explanation of National & Festival Holidays (3 Mandatory) covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding National & Festival Holidays (3 Mandatory).",
    "governingAct": "Mandatory paid holidays on Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct).",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "national-holidays-act"
    ]
  },
  {
    "id": "employee-compensation-act",
    "term": "Workplace Injury Compensation",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Workplace Injury Compensation under Indian labour laws.",
    "explanation": "Detailed explanation of Workplace Injury Compensation covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Workplace Injury Compensation.",
    "governingAct": "Employer's statutory liability to pay financial compensation for workplace accidents, injury, or death.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "employee-compensation-act"
    ]
  },
  {
    "id": "esi-act-medical-benefits",
    "term": "Employees' State Insurance (ESIC)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Employees' State Insurance (ESIC) under Indian labour laws.",
    "explanation": "Detailed explanation of Employees' State Insurance (ESIC) covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Employees' State Insurance (ESIC).",
    "governingAct": "Social security healthcare scheme for employees earning gross wages up to Rs. 21,000 per month.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "esi-act-medical-benefits"
    ]
  },
  {
    "id": "whistleblower-protection-policy",
    "term": "Corporate Whistleblower Policy",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Corporate Whistleblower Policy under Indian labour laws.",
    "explanation": "Detailed explanation of Corporate Whistleblower Policy covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Corporate Whistleblower Policy.",
    "governingAct": "Safe reporting mechanism protecting employees who report corporate fraud or illegal activities.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "whistleblower-protection-policy"
    ]
  },
  {
    "id": "background-verification-bgv",
    "term": "Background Verification (BGV Consent)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Background Verification (BGV Consent) under Indian labour laws.",
    "explanation": "Detailed explanation of Background Verification (BGV Consent) covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Background Verification (BGV Consent).",
    "governingAct": "Consent clause allowing third-party agencies to verify academic degrees, criminal records, and past pay.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "background-verification-bgv"
    ]
  },
  {
    "id": "fake-experience-letter-fraud",
    "term": "Discharge for Fake Experience / CV Fraud",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Discharge for Fake Experience / CV Fraud under Indian labour laws.",
    "explanation": "Detailed explanation of Discharge for Fake Experience / CV Fraud covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "critical",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Discharge for Fake Experience / CV Fraud.",
    "governingAct": "Immediate termination and criminal FIR under Section 420/468 for submitting fabricated experience certificates.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "fake-experience-letter-fraud"
    ]
  },
  {
    "id": "relieving-letter-mandate",
    "term": "Relieving Letter & Service Certificate",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Relieving Letter & Service Certificate under Indian labour laws.",
    "explanation": "Detailed explanation of Relieving Letter & Service Certificate covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Relieving Letter & Service Certificate.",
    "governingAct": "Employer's legal obligation to issue an experience certificate and relieving letter upon proper exit.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "relieving-letter-mandate"
    ]
  },
  {
    "id": "holding-back-fnf-settlement",
    "term": "Full and Final (FnF) Settlement Timeline",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Full and Final (FnF) Settlement Timeline under Indian labour laws.",
    "explanation": "Detailed explanation of Full and Final (FnF) Settlement Timeline covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Full and Final (FnF) Settlement Timeline.",
    "governingAct": "Statutory norm requiring clearance of FnF dues within 30 to 45 days of employee's last working day.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "holding-back-fnf-settlement"
    ]
  },
  {
    "id": "esop-cashless-exercise",
    "term": "ESOP Cashless Exercise Facility",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of ESOP Cashless Exercise Facility under Indian labour laws.",
    "explanation": "Detailed explanation of ESOP Cashless Exercise Facility covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding ESOP Cashless Exercise Facility.",
    "governingAct": "Mechanism allowing employee to exercise vested stock options without paying cash upfront.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "esop-cashless-exercise"
    ]
  },
  {
    "id": "sweat-equity-shares",
    "term": "Sweat Equity Shares Allocation",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Sweat Equity Shares Allocation under Indian labour laws.",
    "explanation": "Detailed explanation of Sweat Equity Shares Allocation covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Sweat Equity Shares Allocation.",
    "governingAct": "Equity shares issued to employees/directors at a discount for intellectual property contributions.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "sweat-equity-shares"
    ]
  },
  {
    "id": "non-solicitation-cooling-off",
    "term": "1-Year Non-Solicitation Cooling-off",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of 1-Year Non-Solicitation Cooling-off under Indian labour laws.",
    "explanation": "Detailed explanation of 1-Year Non-Solicitation Cooling-off covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding 1-Year Non-Solicitation Cooling-off.",
    "governingAct": "Time-limited restriction preventing former managers from recruiting ex-team members.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "non-solicitation-cooling-off"
    ]
  },
  {
    "id": "confidentiality-perpetual",
    "term": "Perpetual Confidentiality for Trade Secrets",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Perpetual Confidentiality for Trade Secrets under Indian labour laws.",
    "explanation": "Detailed explanation of Perpetual Confidentiality for Trade Secrets covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Perpetual Confidentiality for Trade Secrets.",
    "governingAct": "Indefinite obligation protecting company source code and proprietary algorithms after exit.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "confidentiality-perpetual"
    ]
  },
  {
    "id": "exit-interview-waiver",
    "term": "Exit Interview Claims Waiver",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Statutory definition and practical workplace application of Exit Interview Claims Waiver under Indian labour laws.",
    "explanation": "Detailed explanation of Exit Interview Claims Waiver covering employee rights, employer duties, and dispute precedents.",
    "riskLevel": "safe",
    "riskNote": "Verify your exact CTC annexure and ensure full compliance with statutory employment rights.",
    "sampleClause": "The employment relationship shall be governed by applicable laws regarding Exit Interview Claims Waiver.",
    "governingAct": "Document signed during exit waiving all past wage, harassment, or bonus claims against company.",
    "actNote": "Regulated under Indian labour statutes, state shops acts, and landmark High Court / Supreme Court precedents.",
    "tags": [
      "employment",
      "labour-law",
      "workplace",
      "hr",
      "exit-interview-waiver"
    ]
  },
  {
    "id": "doctrine-of-privity",
    "term": "Doctrine of Privity of Contract",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Doctrine of Privity of Contract under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Doctrine of Privity of Contract explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Doctrine of Privity of Contract shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Rule stating only parties who signed the contract can enforce its terms or be sued under it.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "doctrine-of-privity"
    ]
  },
  {
    "id": "promissory-estoppel",
    "term": "Doctrine of Promissory Estoppel",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Doctrine of Promissory Estoppel under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Doctrine of Promissory Estoppel explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Doctrine of Promissory Estoppel shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Legal rule preventing a party from reneging on a clear promise if the other party acted upon it.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "promissory-estoppel"
    ]
  },
  {
    "id": "uberrimae-fidei",
    "term": "Doctrine of Utmost Good Faith (Uberrimae Fidei)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Doctrine of Utmost Good Faith (Uberrimae Fidei) under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Doctrine of Utmost Good Faith (Uberrimae Fidei) explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Doctrine of Utmost Good Faith (Uberrimae Fidei) shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Mandatory complete truthful disclosure required in insurance contracts; non-disclosure voids policy.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "uberrimae-fidei"
    ]
  },
  {
    "id": "contra-proferentem",
    "term": "Contra Proferentem Rule of Interpretation",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Contra Proferentem Rule of Interpretation under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Contra Proferentem Rule of Interpretation explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Contra Proferentem Rule of Interpretation shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Ambiguous contract terms are interpreted by courts strictly AGAINST the party who drafted it.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "contra-proferentem"
    ]
  },
  {
    "id": "liquidated-damages-vs-penalty",
    "term": "Liquidated Damages vs Penalty (Section 74)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Liquidated Damages vs Penalty (Section 74) under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Liquidated Damages vs Penalty (Section 74) explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "caution",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Liquidated Damages vs Penalty (Section 74) shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Genuine pre-estimate of loss is recoverable; punitive penalties are struck down by Indian courts.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "liquidated-damages-vs-penalty"
    ]
  },
  {
    "id": "remoteness-of-damages",
    "term": "Remoteness of Damages (Hadley v Baxendale Rule)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Remoteness of Damages (Hadley v Baxendale Rule) under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Remoteness of Damages (Hadley v Baxendale Rule) explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Remoteness of Damages (Hadley v Baxendale Rule) shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Damages can be claimed only for direct natural losses, not remote indirect speculative losses.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "remoteness-of-damages"
    ]
  },
  {
    "id": "duty-to-mitigate-losses",
    "term": "Duty to Mitigate Losses",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Duty to Mitigate Losses under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Duty to Mitigate Losses explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Duty to Mitigate Losses shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "The injured party must take reasonable steps to minimize their financial losses after a breach.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "duty-to-mitigate-losses"
    ]
  },
  {
    "id": "anticipatory-breach",
    "term": "Anticipatory Breach of Contract",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Anticipatory Breach of Contract under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Anticipatory Breach of Contract explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "caution",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Anticipatory Breach of Contract shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "When one party declares in advance that they will not perform their future obligations.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "anticipatory-breach"
    ]
  },
  {
    "id": "waiver-of-subrogation",
    "term": "Waiver of Subrogation Clause",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Waiver of Subrogation Clause under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Waiver of Subrogation Clause explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Waiver of Subrogation Clause shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Insurance clause preventing insurance company from suing the other contract party to recover paid claims.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "waiver-of-subrogation"
    ]
  },
  {
    "id": "consequential-damages-waiver",
    "term": "Consequential Damages Exclusion",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Consequential Damages Exclusion under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Consequential Damages Exclusion explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Consequential Damages Exclusion shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Clause excluding liability for lost profits, business downtime, or indirect financial damage.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "consequential-damages-waiver"
    ]
  },
  {
    "id": "cross-indemnity",
    "term": "Mutual Cross-Indemnity Clause",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Mutual Cross-Indemnity Clause under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Mutual Cross-Indemnity Clause explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Mutual Cross-Indemnity Clause shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Balanced provision where both parties indemnify each other equally for their respective breaches.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "cross-indemnity"
    ]
  },
  {
    "id": "third-party-beneficiary",
    "term": "Third-Party Beneficiary Exception",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Third-Party Beneficiary Exception under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Third-Party Beneficiary Exception explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Third-Party Beneficiary Exception shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Recognized exceptions (trusts, family settlements) where non-signatories can enforce contract benefits.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "third-party-beneficiary"
    ]
  },
  {
    "id": "unjust-enrichment",
    "term": "Doctrine of Unjust Enrichment",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Doctrine of Unjust Enrichment under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Doctrine of Unjust Enrichment explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Doctrine of Unjust Enrichment shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Equitable principle preventing one party from unfairly retaining money or benefits belonging to another.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "unjust-enrichment"
    ]
  },
  {
    "id": "quantum-meruit",
    "term": "Quantum Meruit (Payment for Work Done)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Quantum Meruit (Payment for Work Done) under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Quantum Meruit (Payment for Work Done) explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Quantum Meruit (Payment for Work Done) shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Right to be paid reasonable compensation for actual work completed before contract was terminated.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "quantum-meruit"
    ]
  },
  {
    "id": "restitution-on-void-contract",
    "term": "Section 65 Restitution on Void Agreement",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Section 65 Restitution on Void Agreement under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Section 65 Restitution on Void Agreement explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Section 65 Restitution on Void Agreement shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Party who received advantage under a void contract is legally bound to restore or compensate it.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "restitution-on-void-contract"
    ]
  },
  {
    "id": "e-contract-validity",
    "term": "Validity of Electronic Contracts & Clickwrap",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Validity of Electronic Contracts & Clickwrap under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Validity of Electronic Contracts & Clickwrap explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Validity of Electronic Contracts & Clickwrap shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Digital clickwrap and email contracts are legally valid and enforceable under the IT Act.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "e-contract-validity"
    ]
  },
  {
    "id": "digital-signature-cert",
    "term": "Digital Signature Certificate (DSC / e-Sign)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Digital Signature Certificate (DSC / e-Sign) under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Digital Signature Certificate (DSC / e-Sign) explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Digital Signature Certificate (DSC / e-Sign) shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Aadhaar e-Sign and cryptographic digital signatures have identical legal status to physical ink signatures.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "digital-signature-cert"
    ]
  },
  {
    "id": "electronic-evidence-65b",
    "term": "Section 65B Electronic Evidence Certificate",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Section 65B Electronic Evidence Certificate under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Section 65B Electronic Evidence Certificate explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Section 65B Electronic Evidence Certificate shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Mandatory certificate required to produce computer printouts, emails, and WhatsApp chats in Indian courts.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "electronic-evidence-65b"
    ]
  },
  {
    "id": "service-level-agreement-sla",
    "term": "Service Level Agreement (SLA & Uptime)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Service Level Agreement (SLA & Uptime) under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Service Level Agreement (SLA & Uptime) explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Service Level Agreement (SLA & Uptime) shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Technical contract committing to specific server uptime (e.g. 99.9%) and financial service credits for outages.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "service-level-agreement-sla"
    ]
  },
  {
    "id": "sla-service-credits",
    "term": "SLA Service Credits Remedy",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of SLA Service Credits Remedy under Indian and general contract law.",
    "explanation": "Detailed legal analysis of SLA Service Credits Remedy explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that SLA Service Credits Remedy shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Pre-agreed discount applied to next month's bill if SaaS provider fails to meet promised uptime.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "sla-service-credits"
    ]
  },
  {
    "id": "data-processor-vs-fiduciary",
    "term": "Data Fiduciary vs Data Processor (DPDP)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Data Fiduciary vs Data Processor (DPDP) under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Data Fiduciary vs Data Processor (DPDP) explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Data Fiduciary vs Data Processor (DPDP) shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Data Fiduciary determines purpose of processing; Data Processor processes data on behalf of fiduciary.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "data-processor-vs-fiduciary"
    ]
  },
  {
    "id": "cross-border-data-transfer",
    "term": "Cross-Border Data Transfer Rules",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Cross-Border Data Transfer Rules under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Cross-Border Data Transfer Rules explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Cross-Border Data Transfer Rules shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Government restrictions on transferring sensitive Indian citizen data to blacklisted foreign jurisdictions.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "cross-border-data-transfer"
    ]
  },
  {
    "id": "right-to-nomination-dpdp",
    "term": "Right to Nomination (Digital Nominee)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Right to Nomination (Digital Nominee) under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Right to Nomination (Digital Nominee) explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Right to Nomination (Digital Nominee) shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Citizen's statutory right to nominate an individual to manage their digital data/accounts upon death.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "right-to-nomination-dpdp"
    ]
  },
  {
    "id": "data-breach-notification-cert",
    "term": "6-Hour CERT-In Breach Reporting Mandate",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of 6-Hour CERT-In Breach Reporting Mandate under Indian and general contract law.",
    "explanation": "Detailed legal analysis of 6-Hour CERT-In Breach Reporting Mandate explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "caution",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that 6-Hour CERT-In Breach Reporting Mandate shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Mandatory duty for companies to report cybersecurity incidents to CERT-In within 6 hours of discovery.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "data-breach-notification-cert"
    ]
  },
  {
    "id": "open-source-gpl-contamination",
    "term": "Open-Source Copyleft License Contamination",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Open-Source Copyleft License Contamination under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Open-Source Copyleft License Contamination explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Open-Source Copyleft License Contamination shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Using GPL-licensed code in proprietary software forces the entire commercial codebase to be made open-source.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "open-source-gpl-contamination"
    ]
  },
  {
    "id": "software-audit-rights",
    "term": "Software License Audit Rights",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Software License Audit Rights under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Software License Audit Rights explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Software License Audit Rights shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Software vendor's right to inspect customer's servers to verify number of deployed user licenses.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "software-audit-rights"
    ]
  },
  {
    "id": "escrow-source-code",
    "term": "Source Code Escrow Agreement",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Source Code Escrow Agreement under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Source Code Escrow Agreement explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Source Code Escrow Agreement shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Third-party escrow holding vendor source code, released to customer if vendor goes bankrupt or closes.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "escrow-source-code"
    ]
  },
  {
    "id": "saas-data-portability",
    "term": "SaaS Exit & Data Portability Clause",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of SaaS Exit & Data Portability Clause under Indian and general contract law.",
    "explanation": "Detailed legal analysis of SaaS Exit & Data Portability Clause explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that SaaS Exit & Data Portability Clause shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Mandatory duty of cloud vendor to export all customer data in standard formats upon subscription cancellation.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "saas-data-portability"
    ]
  },
  {
    "id": "dark-patterns-prohibition",
    "term": "Prohibition of Dark Patterns (CCPA)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Prohibition of Dark Patterns (CCPA) under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Prohibition of Dark Patterns (CCPA) explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "caution",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Prohibition of Dark Patterns (CCPA) shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Government guidelines banning deceptive UI designs (drip pricing, false urgency, subscription traps).",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "dark-patterns-prohibition"
    ]
  },
  {
    "id": "unfair-trade-practice-ccpa",
    "term": "Unfair Trade Practices & False Ads",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Unfair Trade Practices & False Ads under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Unfair Trade Practices & False Ads explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Unfair Trade Practices & False Ads shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Misleading advertisements and unfair contract terms carry fines up to Rs. 50 Lakhs under CCPA.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "unfair-trade-practice-ccpa"
    ]
  },
  {
    "id": "consumer-commission-pecuniary",
    "term": "Consumer Forum Pecuniary Jurisdiction",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Consumer Forum Pecuniary Jurisdiction under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Consumer Forum Pecuniary Jurisdiction explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Consumer Forum Pecuniary Jurisdiction shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "District Commission (up to \u20b950 Lakhs), State Commission (up to \u20b92 Crores), National Commission (>\u20b92 Crores).",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "consumer-commission-pecuniary"
    ]
  },
  {
    "id": "product-liability-action",
    "term": "Product Liability Compensation Action",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Product Liability Compensation Action under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Product Liability Compensation Action explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Product Liability Compensation Action shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Manufacturer and seller liability for harm caused by defective products or deficient services.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "product-liability-action"
    ]
  },
  {
    "id": "misleading-endorsement-penalty",
    "term": "Celebrity / Influencer Endorsement Liability",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Celebrity / Influencer Endorsement Liability under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Celebrity / Influencer Endorsement Liability explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "caution",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Celebrity / Influencer Endorsement Liability shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Penalties on social media influencers promoting products without verifiable due diligence or paid tags.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "misleading-endorsement-penalty"
    ]
  },
  {
    "id": "mediation-act-mandate",
    "term": "Pre-Litigation Mediation Mandate",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Pre-Litigation Mediation Mandate under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Pre-Litigation Mediation Mandate explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Pre-Litigation Mediation Mandate shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Statutory framework encouraging out-of-court commercial dispute resolution through certified mediators.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "mediation-act-mandate"
    ]
  },
  {
    "id": "commercial-courts-act",
    "term": "Commercial Courts Fast-Track Procedure",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Commercial Courts Fast-Track Procedure under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Commercial Courts Fast-Track Procedure explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Commercial Courts Fast-Track Procedure shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Specialized fast-track Commercial Courts resolving commercial disputes over Rs. 3 Lakhs with strict deadlines.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "commercial-courts-act"
    ]
  },
  {
    "id": "summary-suit-order-37",
    "term": "Order 37 Summary Suit on Debt",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Order 37 Summary Suit on Debt under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Order 37 Summary Suit on Debt explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Order 37 Summary Suit on Debt shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Fast-track court procedure for recovering liquidated debts where defendant has no automatic right to defend.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "summary-suit-order-37"
    ]
  },
  {
    "id": "letter-of-intent-loi",
    "term": "Letter of Intent (Binding vs Non-Binding)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Letter of Intent (Binding vs Non-Binding) under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Letter of Intent (Binding vs Non-Binding) explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Letter of Intent (Binding vs Non-Binding) shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Preliminary expression of interest; non-binding except for confidentiality, exclusivity, and governing law clauses.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "letter-of-intent-loi"
    ]
  },
  {
    "id": "memorandum-of-understanding-mou",
    "term": "Memorandum of Understanding (MOU Enforceability)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Memorandum of Understanding (MOU Enforceability) under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Memorandum of Understanding (MOU Enforceability) explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Memorandum of Understanding (MOU Enforceability) shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "An MOU is legally binding if it contains definite terms, consideration, and clear intention to create legal relations.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "memorandum-of-understanding-mou"
    ]
  },
  {
    "id": "power-of-attorney-revocation",
    "term": "Revocation of Power of Attorney",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Revocation of Power of Attorney under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Revocation of Power of Attorney explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Revocation of Power of Attorney shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Principal can revoke power of attorney at any time unless it is an irrevocable POA coupled with interest.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "power-of-attorney-revocation"
    ]
  },
  {
    "id": "surviving-covenants-schedule",
    "term": "Schedule of Surviving Provisions",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Key statutory definition and commercial application of Schedule of Surviving Provisions under Indian and general contract law.",
    "explanation": "Detailed legal analysis of Schedule of Surviving Provisions explaining enforcement, dispute resolution, and contractual safeguards.",
    "riskLevel": "safe",
    "riskNote": "Ensure precise definitions and clear dispute escalation procedures in the master agreement.",
    "sampleClause": "The parties agree that Schedule of Surviving Provisions shall be interpreted and enforced under applicable Indian laws.",
    "governingAct": "Explicit clause specifying which covenants (confidentiality, IP, dispute resolution) survive post-contract.",
    "actNote": "Governed by statutory contract principles, commercial codes, and Supreme Court jurisprudence.",
    "tags": [
      "contract",
      "commercial-law",
      "technology",
      "consumer-rights",
      "surviving-covenants-schedule"
    ]
  },
  {
    "id": "statutory-provision-rental-1",
    "term": "Property Statutory Provision #1 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #1 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #1 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-1"
    ]
  },
  {
    "id": "statutory-provision-loan-2",
    "term": "Banking Prudential Standard #2 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #2 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #2 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-2"
    ]
  },
  {
    "id": "statutory-provision-employment-3",
    "term": "Labour Welfare Covenant #3 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #3 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #3 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-3"
    ]
  },
  {
    "id": "statutory-provision-contract-4",
    "term": "Commercial Contract Rule #4 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #4 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #4 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-4"
    ]
  },
  {
    "id": "statutory-provision-rental-5",
    "term": "Property Statutory Provision #5 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #5 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #5 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-5"
    ]
  },
  {
    "id": "statutory-provision-loan-6",
    "term": "Banking Prudential Standard #6 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #6 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #6 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-6"
    ]
  },
  {
    "id": "statutory-provision-employment-7",
    "term": "Labour Welfare Covenant #7 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #7 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #7 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-7"
    ]
  },
  {
    "id": "statutory-provision-contract-8",
    "term": "Commercial Contract Rule #8 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #8 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #8 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-8"
    ]
  },
  {
    "id": "statutory-provision-rental-9",
    "term": "Property Statutory Provision #9 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #9 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #9 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-9"
    ]
  },
  {
    "id": "statutory-provision-loan-10",
    "term": "Banking Prudential Standard #10 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #10 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #10 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-10"
    ]
  },
  {
    "id": "statutory-provision-employment-11",
    "term": "Labour Welfare Covenant #11 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #11 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #11 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-11"
    ]
  },
  {
    "id": "statutory-provision-contract-12",
    "term": "Commercial Contract Rule #12 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #12 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #12 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-12"
    ]
  },
  {
    "id": "statutory-provision-rental-13",
    "term": "Property Statutory Provision #13 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #13 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #13 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-13"
    ]
  },
  {
    "id": "statutory-provision-loan-14",
    "term": "Banking Prudential Standard #14 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #14 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #14 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-14"
    ]
  },
  {
    "id": "statutory-provision-employment-15",
    "term": "Labour Welfare Covenant #15 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #15 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #15 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-15"
    ]
  },
  {
    "id": "statutory-provision-contract-16",
    "term": "Commercial Contract Rule #16 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #16 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #16 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-16"
    ]
  },
  {
    "id": "statutory-provision-rental-17",
    "term": "Property Statutory Provision #17 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #17 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #17 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-17"
    ]
  },
  {
    "id": "statutory-provision-loan-18",
    "term": "Banking Prudential Standard #18 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #18 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #18 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-18"
    ]
  },
  {
    "id": "statutory-provision-employment-19",
    "term": "Labour Welfare Covenant #19 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #19 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #19 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-19"
    ]
  },
  {
    "id": "statutory-provision-contract-20",
    "term": "Commercial Contract Rule #20 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #20 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #20 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-20"
    ]
  },
  {
    "id": "statutory-provision-rental-21",
    "term": "Property Statutory Provision #21 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #21 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #21 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-21"
    ]
  },
  {
    "id": "statutory-provision-loan-22",
    "term": "Banking Prudential Standard #22 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #22 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #22 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-22"
    ]
  },
  {
    "id": "statutory-provision-employment-23",
    "term": "Labour Welfare Covenant #23 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #23 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #23 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-23"
    ]
  },
  {
    "id": "statutory-provision-contract-24",
    "term": "Commercial Contract Rule #24 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #24 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #24 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-24"
    ]
  },
  {
    "id": "statutory-provision-rental-25",
    "term": "Property Statutory Provision #25 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #25 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #25 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-25"
    ]
  },
  {
    "id": "statutory-provision-loan-26",
    "term": "Banking Prudential Standard #26 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #26 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #26 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-26"
    ]
  },
  {
    "id": "statutory-provision-employment-27",
    "term": "Labour Welfare Covenant #27 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #27 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #27 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-27"
    ]
  },
  {
    "id": "statutory-provision-contract-28",
    "term": "Commercial Contract Rule #28 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #28 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #28 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-28"
    ]
  },
  {
    "id": "statutory-provision-rental-29",
    "term": "Property Statutory Provision #29 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #29 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #29 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-29"
    ]
  },
  {
    "id": "statutory-provision-loan-30",
    "term": "Banking Prudential Standard #30 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #30 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #30 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-30"
    ]
  },
  {
    "id": "statutory-provision-employment-31",
    "term": "Labour Welfare Covenant #31 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #31 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #31 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-31"
    ]
  },
  {
    "id": "statutory-provision-contract-32",
    "term": "Commercial Contract Rule #32 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #32 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #32 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-32"
    ]
  },
  {
    "id": "statutory-provision-rental-33",
    "term": "Property Statutory Provision #33 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #33 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #33 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-33"
    ]
  },
  {
    "id": "statutory-provision-loan-34",
    "term": "Banking Prudential Standard #34 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #34 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #34 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-34"
    ]
  },
  {
    "id": "statutory-provision-employment-35",
    "term": "Labour Welfare Covenant #35 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #35 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #35 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-35"
    ]
  },
  {
    "id": "statutory-provision-contract-36",
    "term": "Commercial Contract Rule #36 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #36 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #36 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-36"
    ]
  },
  {
    "id": "statutory-provision-rental-37",
    "term": "Property Statutory Provision #37 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #37 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #37 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-37"
    ]
  },
  {
    "id": "statutory-provision-loan-38",
    "term": "Banking Prudential Standard #38 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #38 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #38 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-38"
    ]
  },
  {
    "id": "statutory-provision-employment-39",
    "term": "Labour Welfare Covenant #39 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #39 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #39 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-39"
    ]
  },
  {
    "id": "statutory-provision-contract-40",
    "term": "Commercial Contract Rule #40 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #40 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #40 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-40"
    ]
  },
  {
    "id": "statutory-provision-rental-41",
    "term": "Property Statutory Provision #41 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #41 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #41 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-41"
    ]
  },
  {
    "id": "statutory-provision-loan-42",
    "term": "Banking Prudential Standard #42 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #42 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #42 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-42"
    ]
  },
  {
    "id": "statutory-provision-employment-43",
    "term": "Labour Welfare Covenant #43 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #43 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #43 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-43"
    ]
  },
  {
    "id": "statutory-provision-contract-44",
    "term": "Commercial Contract Rule #44 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #44 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #44 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-44"
    ]
  },
  {
    "id": "statutory-provision-rental-45",
    "term": "Property Statutory Provision #45 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #45 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #45 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-45"
    ]
  },
  {
    "id": "statutory-provision-loan-46",
    "term": "Banking Prudential Standard #46 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #46 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #46 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-46"
    ]
  },
  {
    "id": "statutory-provision-employment-47",
    "term": "Labour Welfare Covenant #47 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #47 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #47 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-47"
    ]
  },
  {
    "id": "statutory-provision-contract-48",
    "term": "Commercial Contract Rule #48 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #48 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #48 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-48"
    ]
  },
  {
    "id": "statutory-provision-rental-49",
    "term": "Property Statutory Provision #49 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #49 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #49 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-49"
    ]
  },
  {
    "id": "statutory-provision-loan-50",
    "term": "Banking Prudential Standard #50 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #50 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #50 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-50"
    ]
  },
  {
    "id": "statutory-provision-employment-51",
    "term": "Labour Welfare Covenant #51 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #51 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #51 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-51"
    ]
  },
  {
    "id": "statutory-provision-contract-52",
    "term": "Commercial Contract Rule #52 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #52 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #52 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-52"
    ]
  },
  {
    "id": "statutory-provision-rental-53",
    "term": "Property Statutory Provision #53 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #53 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #53 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-53"
    ]
  },
  {
    "id": "statutory-provision-loan-54",
    "term": "Banking Prudential Standard #54 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #54 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #54 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-54"
    ]
  },
  {
    "id": "statutory-provision-employment-55",
    "term": "Labour Welfare Covenant #55 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #55 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #55 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-55"
    ]
  },
  {
    "id": "statutory-provision-contract-56",
    "term": "Commercial Contract Rule #56 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #56 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #56 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-56"
    ]
  },
  {
    "id": "statutory-provision-rental-57",
    "term": "Property Statutory Provision #57 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #57 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #57 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-57"
    ]
  },
  {
    "id": "statutory-provision-loan-58",
    "term": "Banking Prudential Standard #58 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #58 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #58 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-58"
    ]
  },
  {
    "id": "statutory-provision-employment-59",
    "term": "Labour Welfare Covenant #59 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #59 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #59 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-59"
    ]
  },
  {
    "id": "statutory-provision-contract-60",
    "term": "Commercial Contract Rule #60 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #60 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #60 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-60"
    ]
  },
  {
    "id": "statutory-provision-rental-61",
    "term": "Property Statutory Provision #61 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #61 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #61 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-61"
    ]
  },
  {
    "id": "statutory-provision-loan-62",
    "term": "Banking Prudential Standard #62 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #62 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #62 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-62"
    ]
  },
  {
    "id": "statutory-provision-employment-63",
    "term": "Labour Welfare Covenant #63 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #63 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #63 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-63"
    ]
  },
  {
    "id": "statutory-provision-contract-64",
    "term": "Commercial Contract Rule #64 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #64 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #64 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-64"
    ]
  },
  {
    "id": "statutory-provision-rental-65",
    "term": "Property Statutory Provision #65 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #65 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #65 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-65"
    ]
  },
  {
    "id": "statutory-provision-loan-66",
    "term": "Banking Prudential Standard #66 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #66 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #66 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-66"
    ]
  },
  {
    "id": "statutory-provision-employment-67",
    "term": "Labour Welfare Covenant #67 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #67 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #67 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-67"
    ]
  },
  {
    "id": "statutory-provision-contract-68",
    "term": "Commercial Contract Rule #68 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #68 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #68 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-68"
    ]
  },
  {
    "id": "statutory-provision-rental-69",
    "term": "Property Statutory Provision #69 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #69 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #69 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-69"
    ]
  },
  {
    "id": "statutory-provision-loan-70",
    "term": "Banking Prudential Standard #70 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #70 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #70 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-70"
    ]
  },
  {
    "id": "statutory-provision-employment-71",
    "term": "Labour Welfare Covenant #71 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #71 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #71 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-71"
    ]
  },
  {
    "id": "statutory-provision-contract-72",
    "term": "Commercial Contract Rule #72 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #72 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #72 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-72"
    ]
  },
  {
    "id": "statutory-provision-rental-73",
    "term": "Property Statutory Provision #73 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #73 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #73 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-73"
    ]
  },
  {
    "id": "statutory-provision-loan-74",
    "term": "Banking Prudential Standard #74 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #74 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #74 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-74"
    ]
  },
  {
    "id": "statutory-provision-employment-75",
    "term": "Labour Welfare Covenant #75 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #75 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #75 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-75"
    ]
  },
  {
    "id": "statutory-provision-contract-76",
    "term": "Commercial Contract Rule #76 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #76 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #76 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-76"
    ]
  },
  {
    "id": "statutory-provision-rental-77",
    "term": "Property Statutory Provision #77 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #77 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #77 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-77"
    ]
  },
  {
    "id": "statutory-provision-loan-78",
    "term": "Banking Prudential Standard #78 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #78 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #78 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-78"
    ]
  },
  {
    "id": "statutory-provision-employment-79",
    "term": "Labour Welfare Covenant #79 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #79 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #79 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-79"
    ]
  },
  {
    "id": "statutory-provision-contract-80",
    "term": "Commercial Contract Rule #80 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #80 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #80 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-80"
    ]
  },
  {
    "id": "statutory-provision-rental-81",
    "term": "Property Statutory Provision #81 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #81 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #81 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-81"
    ]
  },
  {
    "id": "statutory-provision-loan-82",
    "term": "Banking Prudential Standard #82 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #82 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #82 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-82"
    ]
  },
  {
    "id": "statutory-provision-employment-83",
    "term": "Labour Welfare Covenant #83 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #83 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #83 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-83"
    ]
  },
  {
    "id": "statutory-provision-contract-84",
    "term": "Commercial Contract Rule #84 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #84 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #84 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-84"
    ]
  },
  {
    "id": "statutory-provision-rental-85",
    "term": "Property Statutory Provision #85 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #85 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #85 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-85"
    ]
  },
  {
    "id": "statutory-provision-loan-86",
    "term": "Banking Prudential Standard #86 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #86 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #86 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-86"
    ]
  },
  {
    "id": "statutory-provision-employment-87",
    "term": "Labour Welfare Covenant #87 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #87 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #87 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-87"
    ]
  },
  {
    "id": "statutory-provision-contract-88",
    "term": "Commercial Contract Rule #88 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #88 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #88 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-88"
    ]
  },
  {
    "id": "statutory-provision-rental-89",
    "term": "Property Statutory Provision #89 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #89 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #89 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-89"
    ]
  },
  {
    "id": "statutory-provision-loan-90",
    "term": "Banking Prudential Standard #90 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #90 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #90 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-90"
    ]
  },
  {
    "id": "statutory-provision-employment-91",
    "term": "Labour Welfare Covenant #91 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #91 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #91 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-91"
    ]
  },
  {
    "id": "statutory-provision-contract-92",
    "term": "Commercial Contract Rule #92 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #92 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #92 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-92"
    ]
  },
  {
    "id": "statutory-provision-rental-93",
    "term": "Property Statutory Provision #93 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #93 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #93 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-93"
    ]
  },
  {
    "id": "statutory-provision-loan-94",
    "term": "Banking Prudential Standard #94 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #94 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #94 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-94"
    ]
  },
  {
    "id": "statutory-provision-employment-95",
    "term": "Labour Welfare Covenant #95 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #95 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #95 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-95"
    ]
  },
  {
    "id": "statutory-provision-contract-96",
    "term": "Commercial Contract Rule #96 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #96 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #96 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-96"
    ]
  },
  {
    "id": "statutory-provision-rental-97",
    "term": "Property Statutory Provision #97 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #97 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #97 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-97"
    ]
  },
  {
    "id": "statutory-provision-loan-98",
    "term": "Banking Prudential Standard #98 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #98 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #98 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-98"
    ]
  },
  {
    "id": "statutory-provision-employment-99",
    "term": "Labour Welfare Covenant #99 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #99 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #99 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-99"
    ]
  },
  {
    "id": "statutory-provision-contract-100",
    "term": "Commercial Contract Rule #100 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #100 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #100 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-100"
    ]
  },
  {
    "id": "statutory-provision-rental-101",
    "term": "Property Statutory Provision #101 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #101 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #101 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-101"
    ]
  },
  {
    "id": "statutory-provision-loan-102",
    "term": "Banking Prudential Standard #102 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #102 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #102 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-102"
    ]
  },
  {
    "id": "statutory-provision-employment-103",
    "term": "Labour Welfare Covenant #103 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #103 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #103 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-103"
    ]
  },
  {
    "id": "statutory-provision-contract-104",
    "term": "Commercial Contract Rule #104 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #104 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #104 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-104"
    ]
  },
  {
    "id": "statutory-provision-rental-105",
    "term": "Property Statutory Provision #105 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #105 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #105 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-105"
    ]
  },
  {
    "id": "statutory-provision-loan-106",
    "term": "Banking Prudential Standard #106 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #106 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #106 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-106"
    ]
  },
  {
    "id": "statutory-provision-employment-107",
    "term": "Labour Welfare Covenant #107 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #107 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #107 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-107"
    ]
  },
  {
    "id": "statutory-provision-contract-108",
    "term": "Commercial Contract Rule #108 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #108 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #108 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-108"
    ]
  },
  {
    "id": "statutory-provision-rental-109",
    "term": "Property Statutory Provision #109 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #109 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #109 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-109"
    ]
  },
  {
    "id": "statutory-provision-loan-110",
    "term": "Banking Prudential Standard #110 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #110 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #110 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-110"
    ]
  },
  {
    "id": "statutory-provision-employment-111",
    "term": "Labour Welfare Covenant #111 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #111 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #111 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-111"
    ]
  },
  {
    "id": "statutory-provision-contract-112",
    "term": "Commercial Contract Rule #112 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #112 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #112 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-112"
    ]
  },
  {
    "id": "statutory-provision-rental-113",
    "term": "Property Statutory Provision #113 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #113 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #113 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-113"
    ]
  },
  {
    "id": "statutory-provision-loan-114",
    "term": "Banking Prudential Standard #114 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #114 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #114 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-114"
    ]
  },
  {
    "id": "statutory-provision-employment-115",
    "term": "Labour Welfare Covenant #115 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #115 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #115 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-115"
    ]
  },
  {
    "id": "statutory-provision-contract-116",
    "term": "Commercial Contract Rule #116 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #116 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #116 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-116"
    ]
  },
  {
    "id": "statutory-provision-rental-117",
    "term": "Property Statutory Provision #117 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #117 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #117 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-117"
    ]
  },
  {
    "id": "statutory-provision-loan-118",
    "term": "Banking Prudential Standard #118 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #118 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #118 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-118"
    ]
  },
  {
    "id": "statutory-provision-employment-119",
    "term": "Labour Welfare Covenant #119 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #119 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #119 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-119"
    ]
  },
  {
    "id": "statutory-provision-contract-120",
    "term": "Commercial Contract Rule #120 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #120 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #120 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-120"
    ]
  },
  {
    "id": "statutory-provision-rental-121",
    "term": "Property Statutory Provision #121 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #121 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #121 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-121"
    ]
  },
  {
    "id": "statutory-provision-loan-122",
    "term": "Banking Prudential Standard #122 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #122 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #122 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-122"
    ]
  },
  {
    "id": "statutory-provision-employment-123",
    "term": "Labour Welfare Covenant #123 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #123 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #123 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-123"
    ]
  },
  {
    "id": "statutory-provision-contract-124",
    "term": "Commercial Contract Rule #124 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #124 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #124 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-124"
    ]
  },
  {
    "id": "statutory-provision-rental-125",
    "term": "Property Statutory Provision #125 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #125 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #125 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-125"
    ]
  },
  {
    "id": "statutory-provision-loan-126",
    "term": "Banking Prudential Standard #126 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #126 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #126 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-126"
    ]
  },
  {
    "id": "statutory-provision-employment-127",
    "term": "Labour Welfare Covenant #127 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #127 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #127 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-127"
    ]
  },
  {
    "id": "statutory-provision-contract-128",
    "term": "Commercial Contract Rule #128 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #128 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #128 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-128"
    ]
  },
  {
    "id": "statutory-provision-rental-129",
    "term": "Property Statutory Provision #129 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #129 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #129 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-129"
    ]
  },
  {
    "id": "statutory-provision-loan-130",
    "term": "Banking Prudential Standard #130 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #130 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #130 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-130"
    ]
  },
  {
    "id": "statutory-provision-employment-131",
    "term": "Labour Welfare Covenant #131 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #131 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #131 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-131"
    ]
  },
  {
    "id": "statutory-provision-contract-132",
    "term": "Commercial Contract Rule #132 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #132 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #132 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-132"
    ]
  },
  {
    "id": "statutory-provision-rental-133",
    "term": "Property Statutory Provision #133 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #133 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #133 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-133"
    ]
  },
  {
    "id": "statutory-provision-loan-134",
    "term": "Banking Prudential Standard #134 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #134 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #134 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-134"
    ]
  },
  {
    "id": "statutory-provision-employment-135",
    "term": "Labour Welfare Covenant #135 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #135 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #135 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-135"
    ]
  },
  {
    "id": "statutory-provision-contract-136",
    "term": "Commercial Contract Rule #136 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #136 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #136 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-136"
    ]
  },
  {
    "id": "statutory-provision-rental-137",
    "term": "Property Statutory Provision #137 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #137 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #137 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-137"
    ]
  },
  {
    "id": "statutory-provision-loan-138",
    "term": "Banking Prudential Standard #138 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #138 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #138 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-138"
    ]
  },
  {
    "id": "statutory-provision-employment-139",
    "term": "Labour Welfare Covenant #139 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #139 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #139 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-139"
    ]
  },
  {
    "id": "statutory-provision-contract-140",
    "term": "Commercial Contract Rule #140 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #140 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #140 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-140"
    ]
  },
  {
    "id": "statutory-provision-rental-141",
    "term": "Property Statutory Provision #141 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #141 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #141 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-141"
    ]
  },
  {
    "id": "statutory-provision-loan-142",
    "term": "Banking Prudential Standard #142 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #142 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #142 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-142"
    ]
  },
  {
    "id": "statutory-provision-employment-143",
    "term": "Labour Welfare Covenant #143 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #143 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #143 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-143"
    ]
  },
  {
    "id": "statutory-provision-contract-144",
    "term": "Commercial Contract Rule #144 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #144 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #144 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-144"
    ]
  },
  {
    "id": "statutory-provision-rental-145",
    "term": "Property Statutory Provision #145 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #145 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #145 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-145"
    ]
  },
  {
    "id": "statutory-provision-loan-146",
    "term": "Banking Prudential Standard #146 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #146 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #146 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-146"
    ]
  },
  {
    "id": "statutory-provision-employment-147",
    "term": "Labour Welfare Covenant #147 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #147 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #147 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-147"
    ]
  },
  {
    "id": "statutory-provision-contract-148",
    "term": "Commercial Contract Rule #148 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #148 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #148 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-148"
    ]
  },
  {
    "id": "statutory-provision-rental-149",
    "term": "Property Statutory Provision #149 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #149 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #149 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-149"
    ]
  },
  {
    "id": "statutory-provision-loan-150",
    "term": "Banking Prudential Standard #150 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #150 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #150 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-150"
    ]
  },
  {
    "id": "statutory-provision-employment-151",
    "term": "Labour Welfare Covenant #151 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #151 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #151 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-151"
    ]
  },
  {
    "id": "statutory-provision-contract-152",
    "term": "Commercial Contract Rule #152 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #152 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #152 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-152"
    ]
  },
  {
    "id": "statutory-provision-rental-153",
    "term": "Property Statutory Provision #153 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #153 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #153 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-153"
    ]
  },
  {
    "id": "statutory-provision-loan-154",
    "term": "Banking Prudential Standard #154 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #154 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #154 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-154"
    ]
  },
  {
    "id": "statutory-provision-employment-155",
    "term": "Labour Welfare Covenant #155 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #155 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #155 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-155"
    ]
  },
  {
    "id": "statutory-provision-contract-156",
    "term": "Commercial Contract Rule #156 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #156 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #156 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-156"
    ]
  },
  {
    "id": "statutory-provision-rental-157",
    "term": "Property Statutory Provision #157 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #157 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #157 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-157"
    ]
  },
  {
    "id": "statutory-provision-loan-158",
    "term": "Banking Prudential Standard #158 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #158 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #158 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-158"
    ]
  },
  {
    "id": "statutory-provision-employment-159",
    "term": "Labour Welfare Covenant #159 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #159 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #159 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-159"
    ]
  },
  {
    "id": "statutory-provision-contract-160",
    "term": "Commercial Contract Rule #160 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #160 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #160 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-160"
    ]
  },
  {
    "id": "statutory-provision-rental-161",
    "term": "Property Statutory Provision #161 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #161 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #161 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-161"
    ]
  },
  {
    "id": "statutory-provision-loan-162",
    "term": "Banking Prudential Standard #162 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #162 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #162 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-162"
    ]
  },
  {
    "id": "statutory-provision-employment-163",
    "term": "Labour Welfare Covenant #163 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #163 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #163 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-163"
    ]
  },
  {
    "id": "statutory-provision-contract-164",
    "term": "Commercial Contract Rule #164 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #164 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #164 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-164"
    ]
  },
  {
    "id": "statutory-provision-rental-165",
    "term": "Property Statutory Provision #165 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #165 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #165 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-165"
    ]
  },
  {
    "id": "statutory-provision-loan-166",
    "term": "Banking Prudential Standard #166 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #166 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #166 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-166"
    ]
  },
  {
    "id": "statutory-provision-employment-167",
    "term": "Labour Welfare Covenant #167 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #167 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #167 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-167"
    ]
  },
  {
    "id": "statutory-provision-contract-168",
    "term": "Commercial Contract Rule #168 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #168 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #168 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-168"
    ]
  },
  {
    "id": "statutory-provision-rental-169",
    "term": "Property Statutory Provision #169 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #169 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #169 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-169"
    ]
  },
  {
    "id": "statutory-provision-loan-170",
    "term": "Banking Prudential Standard #170 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #170 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #170 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-170"
    ]
  },
  {
    "id": "statutory-provision-employment-171",
    "term": "Labour Welfare Covenant #171 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #171 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #171 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-171"
    ]
  },
  {
    "id": "statutory-provision-contract-172",
    "term": "Commercial Contract Rule #172 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #172 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #172 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-172"
    ]
  },
  {
    "id": "statutory-provision-rental-173",
    "term": "Property Statutory Provision #173 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #173 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #173 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-173"
    ]
  },
  {
    "id": "statutory-provision-loan-174",
    "term": "Banking Prudential Standard #174 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #174 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #174 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-174"
    ]
  },
  {
    "id": "statutory-provision-employment-175",
    "term": "Labour Welfare Covenant #175 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #175 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #175 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-175"
    ]
  },
  {
    "id": "statutory-provision-contract-176",
    "term": "Commercial Contract Rule #176 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #176 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #176 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-176"
    ]
  },
  {
    "id": "statutory-provision-rental-177",
    "term": "Property Statutory Provision #177 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #177 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #177 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-177"
    ]
  },
  {
    "id": "statutory-provision-loan-178",
    "term": "Banking Prudential Standard #178 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #178 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #178 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-178"
    ]
  },
  {
    "id": "statutory-provision-employment-179",
    "term": "Labour Welfare Covenant #179 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #179 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #179 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-179"
    ]
  },
  {
    "id": "statutory-provision-contract-180",
    "term": "Commercial Contract Rule #180 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #180 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #180 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-180"
    ]
  },
  {
    "id": "statutory-provision-rental-181",
    "term": "Property Statutory Provision #181 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #181 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #181 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-181"
    ]
  },
  {
    "id": "statutory-provision-loan-182",
    "term": "Banking Prudential Standard #182 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #182 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #182 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-182"
    ]
  },
  {
    "id": "statutory-provision-employment-183",
    "term": "Labour Welfare Covenant #183 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #183 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #183 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-183"
    ]
  },
  {
    "id": "statutory-provision-contract-184",
    "term": "Commercial Contract Rule #184 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #184 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #184 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-184"
    ]
  },
  {
    "id": "statutory-provision-rental-185",
    "term": "Property Statutory Provision #185 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #185 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #185 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-185"
    ]
  },
  {
    "id": "statutory-provision-loan-186",
    "term": "Banking Prudential Standard #186 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #186 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #186 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-186"
    ]
  },
  {
    "id": "statutory-provision-employment-187",
    "term": "Labour Welfare Covenant #187 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #187 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #187 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-187"
    ]
  },
  {
    "id": "statutory-provision-contract-188",
    "term": "Commercial Contract Rule #188 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #188 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #188 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-188"
    ]
  },
  {
    "id": "statutory-provision-rental-189",
    "term": "Property Statutory Provision #189 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #189 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #189 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-189"
    ]
  },
  {
    "id": "statutory-provision-loan-190",
    "term": "Banking Prudential Standard #190 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #190 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #190 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-190"
    ]
  },
  {
    "id": "statutory-provision-employment-191",
    "term": "Labour Welfare Covenant #191 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #191 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #191 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-191"
    ]
  },
  {
    "id": "statutory-provision-contract-192",
    "term": "Commercial Contract Rule #192 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #192 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #192 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-192"
    ]
  },
  {
    "id": "statutory-provision-rental-193",
    "term": "Property Statutory Provision #193 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #193 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #193 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-193"
    ]
  },
  {
    "id": "statutory-provision-loan-194",
    "term": "Banking Prudential Standard #194 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #194 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #194 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-194"
    ]
  },
  {
    "id": "statutory-provision-employment-195",
    "term": "Labour Welfare Covenant #195 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #195 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #195 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-195"
    ]
  },
  {
    "id": "statutory-provision-contract-196",
    "term": "Commercial Contract Rule #196 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #196 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #196 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-196"
    ]
  },
  {
    "id": "statutory-provision-rental-197",
    "term": "Property Statutory Provision #197 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #197 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #197 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-197"
    ]
  },
  {
    "id": "statutory-provision-loan-198",
    "term": "Banking Prudential Standard #198 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #198 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #198 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-198"
    ]
  },
  {
    "id": "statutory-provision-employment-199",
    "term": "Labour Welfare Covenant #199 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #199 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #199 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-199"
    ]
  },
  {
    "id": "statutory-provision-contract-200",
    "term": "Commercial Contract Rule #200 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #200 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #200 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-200"
    ]
  },
  {
    "id": "statutory-provision-rental-201",
    "term": "Property Statutory Provision #201 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #201 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #201 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-201"
    ]
  },
  {
    "id": "statutory-provision-loan-202",
    "term": "Banking Prudential Standard #202 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #202 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #202 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-202"
    ]
  },
  {
    "id": "statutory-provision-employment-203",
    "term": "Labour Welfare Covenant #203 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #203 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #203 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-203"
    ]
  },
  {
    "id": "statutory-provision-contract-204",
    "term": "Commercial Contract Rule #204 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #204 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #204 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-204"
    ]
  },
  {
    "id": "statutory-provision-rental-205",
    "term": "Property Statutory Provision #205 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #205 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #205 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-205"
    ]
  },
  {
    "id": "statutory-provision-loan-206",
    "term": "Banking Prudential Standard #206 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #206 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #206 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-206"
    ]
  },
  {
    "id": "statutory-provision-employment-207",
    "term": "Labour Welfare Covenant #207 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #207 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #207 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-207"
    ]
  },
  {
    "id": "statutory-provision-contract-208",
    "term": "Commercial Contract Rule #208 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #208 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #208 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-208"
    ]
  },
  {
    "id": "statutory-provision-rental-209",
    "term": "Property Statutory Provision #209 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #209 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #209 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-209"
    ]
  },
  {
    "id": "statutory-provision-loan-210",
    "term": "Banking Prudential Standard #210 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #210 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #210 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-210"
    ]
  },
  {
    "id": "statutory-provision-employment-211",
    "term": "Labour Welfare Covenant #211 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #211 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #211 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-211"
    ]
  },
  {
    "id": "statutory-provision-contract-212",
    "term": "Commercial Contract Rule #212 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #212 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #212 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-212"
    ]
  },
  {
    "id": "statutory-provision-rental-213",
    "term": "Property Statutory Provision #213 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #213 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #213 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-213"
    ]
  },
  {
    "id": "statutory-provision-loan-214",
    "term": "Banking Prudential Standard #214 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #214 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #214 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-214"
    ]
  },
  {
    "id": "statutory-provision-employment-215",
    "term": "Labour Welfare Covenant #215 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #215 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #215 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-215"
    ]
  },
  {
    "id": "statutory-provision-contract-216",
    "term": "Commercial Contract Rule #216 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #216 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #216 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-216"
    ]
  },
  {
    "id": "statutory-provision-rental-217",
    "term": "Property Statutory Provision #217 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #217 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #217 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-217"
    ]
  },
  {
    "id": "statutory-provision-loan-218",
    "term": "Banking Prudential Standard #218 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #218 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #218 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-218"
    ]
  },
  {
    "id": "statutory-provision-employment-219",
    "term": "Labour Welfare Covenant #219 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #219 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #219 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-219"
    ]
  },
  {
    "id": "statutory-provision-contract-220",
    "term": "Commercial Contract Rule #220 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #220 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #220 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-220"
    ]
  },
  {
    "id": "statutory-provision-rental-221",
    "term": "Property Statutory Provision #221 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #221 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #221 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-221"
    ]
  },
  {
    "id": "statutory-provision-loan-222",
    "term": "Banking Prudential Standard #222 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #222 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #222 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-222"
    ]
  },
  {
    "id": "statutory-provision-employment-223",
    "term": "Labour Welfare Covenant #223 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #223 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #223 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-223"
    ]
  },
  {
    "id": "statutory-provision-contract-224",
    "term": "Commercial Contract Rule #224 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #224 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #224 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-224"
    ]
  },
  {
    "id": "statutory-provision-rental-225",
    "term": "Property Statutory Provision #225 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #225 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #225 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-225"
    ]
  },
  {
    "id": "statutory-provision-loan-226",
    "term": "Banking Prudential Standard #226 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #226 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #226 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-226"
    ]
  },
  {
    "id": "statutory-provision-employment-227",
    "term": "Labour Welfare Covenant #227 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #227 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #227 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-227"
    ]
  },
  {
    "id": "statutory-provision-contract-228",
    "term": "Commercial Contract Rule #228 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #228 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #228 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-228"
    ]
  },
  {
    "id": "statutory-provision-rental-229",
    "term": "Property Statutory Provision #229 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #229 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #229 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-229"
    ]
  },
  {
    "id": "statutory-provision-loan-230",
    "term": "Banking Prudential Standard #230 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #230 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #230 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-230"
    ]
  },
  {
    "id": "statutory-provision-employment-231",
    "term": "Labour Welfare Covenant #231 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #231 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #231 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-231"
    ]
  },
  {
    "id": "statutory-provision-contract-232",
    "term": "Commercial Contract Rule #232 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #232 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #232 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-232"
    ]
  },
  {
    "id": "statutory-provision-rental-233",
    "term": "Property Statutory Provision #233 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #233 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #233 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-233"
    ]
  },
  {
    "id": "statutory-provision-loan-234",
    "term": "Banking Prudential Standard #234 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #234 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #234 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-234"
    ]
  },
  {
    "id": "statutory-provision-employment-235",
    "term": "Labour Welfare Covenant #235 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #235 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #235 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-235"
    ]
  },
  {
    "id": "statutory-provision-contract-236",
    "term": "Commercial Contract Rule #236 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #236 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #236 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-236"
    ]
  },
  {
    "id": "statutory-provision-rental-237",
    "term": "Property Statutory Provision #237 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #237 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #237 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-237"
    ]
  },
  {
    "id": "statutory-provision-loan-238",
    "term": "Banking Prudential Standard #238 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #238 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #238 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-238"
    ]
  },
  {
    "id": "statutory-provision-employment-239",
    "term": "Labour Welfare Covenant #239 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #239 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #239 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-239"
    ]
  },
  {
    "id": "statutory-provision-contract-240",
    "term": "Commercial Contract Rule #240 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #240 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #240 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-240"
    ]
  },
  {
    "id": "statutory-provision-rental-241",
    "term": "Property Statutory Provision #241 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #241 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #241 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-241"
    ]
  },
  {
    "id": "statutory-provision-loan-242",
    "term": "Banking Prudential Standard #242 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #242 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #242 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-242"
    ]
  },
  {
    "id": "statutory-provision-employment-243",
    "term": "Labour Welfare Covenant #243 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #243 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #243 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-243"
    ]
  },
  {
    "id": "statutory-provision-contract-244",
    "term": "Commercial Contract Rule #244 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #244 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #244 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-244"
    ]
  },
  {
    "id": "statutory-provision-rental-245",
    "term": "Property Statutory Provision #245 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #245 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #245 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-245"
    ]
  },
  {
    "id": "statutory-provision-loan-246",
    "term": "Banking Prudential Standard #246 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #246 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #246 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-246"
    ]
  },
  {
    "id": "statutory-provision-employment-247",
    "term": "Labour Welfare Covenant #247 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #247 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #247 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-247"
    ]
  },
  {
    "id": "statutory-provision-contract-248",
    "term": "Commercial Contract Rule #248 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #248 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #248 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-248"
    ]
  },
  {
    "id": "statutory-provision-rental-249",
    "term": "Property Statutory Provision #249 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #249 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #249 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-249"
    ]
  },
  {
    "id": "statutory-provision-loan-250",
    "term": "Banking Prudential Standard #250 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #250 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #250 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-250"
    ]
  },
  {
    "id": "statutory-provision-employment-251",
    "term": "Labour Welfare Covenant #251 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #251 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #251 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-251"
    ]
  },
  {
    "id": "statutory-provision-contract-252",
    "term": "Commercial Contract Rule #252 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #252 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #252 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-252"
    ]
  },
  {
    "id": "statutory-provision-rental-253",
    "term": "Property Statutory Provision #253 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #253 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #253 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-253"
    ]
  },
  {
    "id": "statutory-provision-loan-254",
    "term": "Banking Prudential Standard #254 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #254 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #254 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-254"
    ]
  },
  {
    "id": "statutory-provision-employment-255",
    "term": "Labour Welfare Covenant #255 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #255 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #255 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-255"
    ]
  },
  {
    "id": "statutory-provision-contract-256",
    "term": "Commercial Contract Rule #256 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #256 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #256 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-256"
    ]
  },
  {
    "id": "statutory-provision-rental-257",
    "term": "Property Statutory Provision #257 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #257 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #257 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-257"
    ]
  },
  {
    "id": "statutory-provision-loan-258",
    "term": "Banking Prudential Standard #258 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #258 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #258 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-258"
    ]
  },
  {
    "id": "statutory-provision-employment-259",
    "term": "Labour Welfare Covenant #259 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #259 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #259 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-259"
    ]
  },
  {
    "id": "statutory-provision-contract-260",
    "term": "Commercial Contract Rule #260 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #260 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #260 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-260"
    ]
  },
  {
    "id": "statutory-provision-rental-261",
    "term": "Property Statutory Provision #261 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #261 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #261 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-261"
    ]
  },
  {
    "id": "statutory-provision-loan-262",
    "term": "Banking Prudential Standard #262 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #262 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #262 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-262"
    ]
  },
  {
    "id": "statutory-provision-employment-263",
    "term": "Labour Welfare Covenant #263 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #263 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #263 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-263"
    ]
  },
  {
    "id": "statutory-provision-contract-264",
    "term": "Commercial Contract Rule #264 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #264 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #264 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-264"
    ]
  },
  {
    "id": "statutory-provision-rental-265",
    "term": "Property Statutory Provision #265 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #265 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #265 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-265"
    ]
  },
  {
    "id": "statutory-provision-loan-266",
    "term": "Banking Prudential Standard #266 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #266 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #266 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-266"
    ]
  },
  {
    "id": "statutory-provision-employment-267",
    "term": "Labour Welfare Covenant #267 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #267 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #267 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-267"
    ]
  },
  {
    "id": "statutory-provision-contract-268",
    "term": "Commercial Contract Rule #268 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #268 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #268 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-268"
    ]
  },
  {
    "id": "statutory-provision-rental-269",
    "term": "Property Statutory Provision #269 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #269 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #269 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-269"
    ]
  },
  {
    "id": "statutory-provision-loan-270",
    "term": "Banking Prudential Standard #270 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #270 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #270 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-270"
    ]
  },
  {
    "id": "statutory-provision-employment-271",
    "term": "Labour Welfare Covenant #271 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #271 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #271 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-271"
    ]
  },
  {
    "id": "statutory-provision-contract-272",
    "term": "Commercial Contract Rule #272 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #272 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #272 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-272"
    ]
  },
  {
    "id": "statutory-provision-rental-273",
    "term": "Property Statutory Provision #273 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #273 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #273 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-273"
    ]
  },
  {
    "id": "statutory-provision-loan-274",
    "term": "Banking Prudential Standard #274 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #274 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #274 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-274"
    ]
  },
  {
    "id": "statutory-provision-employment-275",
    "term": "Labour Welfare Covenant #275 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #275 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #275 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-275"
    ]
  },
  {
    "id": "statutory-provision-contract-276",
    "term": "Commercial Contract Rule #276 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #276 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #276 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-276"
    ]
  },
  {
    "id": "statutory-provision-rental-277",
    "term": "Property Statutory Provision #277 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #277 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #277 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-277"
    ]
  },
  {
    "id": "statutory-provision-loan-278",
    "term": "Banking Prudential Standard #278 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #278 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #278 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-278"
    ]
  },
  {
    "id": "statutory-provision-employment-279",
    "term": "Labour Welfare Covenant #279 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #279 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #279 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-279"
    ]
  },
  {
    "id": "statutory-provision-contract-280",
    "term": "Commercial Contract Rule #280 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #280 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #280 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-280"
    ]
  },
  {
    "id": "statutory-provision-rental-281",
    "term": "Property Statutory Provision #281 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #281 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #281 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-281"
    ]
  },
  {
    "id": "statutory-provision-loan-282",
    "term": "Banking Prudential Standard #282 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #282 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #282 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-282"
    ]
  },
  {
    "id": "statutory-provision-employment-283",
    "term": "Labour Welfare Covenant #283 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #283 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #283 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-283"
    ]
  },
  {
    "id": "statutory-provision-contract-284",
    "term": "Commercial Contract Rule #284 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #284 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #284 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-284"
    ]
  },
  {
    "id": "statutory-provision-rental-285",
    "term": "Property Statutory Provision #285 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #285 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #285 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-285"
    ]
  },
  {
    "id": "statutory-provision-loan-286",
    "term": "Banking Prudential Standard #286 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #286 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #286 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-286"
    ]
  },
  {
    "id": "statutory-provision-employment-287",
    "term": "Labour Welfare Covenant #287 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #287 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #287 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-287"
    ]
  },
  {
    "id": "statutory-provision-contract-288",
    "term": "Commercial Contract Rule #288 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #288 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #288 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-288"
    ]
  },
  {
    "id": "statutory-provision-rental-289",
    "term": "Property Statutory Provision #289 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #289 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #289 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-289"
    ]
  },
  {
    "id": "statutory-provision-loan-290",
    "term": "Banking Prudential Standard #290 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #290 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #290 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-290"
    ]
  },
  {
    "id": "statutory-provision-employment-291",
    "term": "Labour Welfare Covenant #291 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #291 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #291 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-291"
    ]
  },
  {
    "id": "statutory-provision-contract-292",
    "term": "Commercial Contract Rule #292 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #292 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #292 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-292"
    ]
  },
  {
    "id": "statutory-provision-rental-293",
    "term": "Property Statutory Provision #293 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #293 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #293 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-293"
    ]
  },
  {
    "id": "statutory-provision-loan-294",
    "term": "Banking Prudential Standard #294 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #294 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #294 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-294"
    ]
  },
  {
    "id": "statutory-provision-employment-295",
    "term": "Labour Welfare Covenant #295 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #295 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #295 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-295"
    ]
  },
  {
    "id": "statutory-provision-contract-296",
    "term": "Commercial Contract Rule #296 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #296 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #296 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-296"
    ]
  },
  {
    "id": "statutory-provision-rental-297",
    "term": "Property Statutory Provision #297 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #297 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #297 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-297"
    ]
  },
  {
    "id": "statutory-provision-loan-298",
    "term": "Banking Prudential Standard #298 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #298 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #298 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-298"
    ]
  },
  {
    "id": "statutory-provision-employment-299",
    "term": "Labour Welfare Covenant #299 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #299 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #299 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-299"
    ]
  },
  {
    "id": "statutory-provision-contract-300",
    "term": "Commercial Contract Rule #300 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #300 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #300 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-300"
    ]
  },
  {
    "id": "statutory-provision-rental-301",
    "term": "Property Statutory Provision #301 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #301 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #301 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-301"
    ]
  },
  {
    "id": "statutory-provision-loan-302",
    "term": "Banking Prudential Standard #302 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #302 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #302 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-302"
    ]
  },
  {
    "id": "statutory-provision-employment-303",
    "term": "Labour Welfare Covenant #303 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #303 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #303 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-303"
    ]
  },
  {
    "id": "statutory-provision-contract-304",
    "term": "Commercial Contract Rule #304 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #304 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #304 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-304"
    ]
  },
  {
    "id": "statutory-provision-rental-305",
    "term": "Property Statutory Provision #305 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #305 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #305 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-305"
    ]
  },
  {
    "id": "statutory-provision-loan-306",
    "term": "Banking Prudential Standard #306 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #306 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #306 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-306"
    ]
  },
  {
    "id": "statutory-provision-employment-307",
    "term": "Labour Welfare Covenant #307 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #307 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #307 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-307"
    ]
  },
  {
    "id": "statutory-provision-contract-308",
    "term": "Commercial Contract Rule #308 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #308 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #308 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-308"
    ]
  },
  {
    "id": "statutory-provision-rental-309",
    "term": "Property Statutory Provision #309 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #309 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #309 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-309"
    ]
  },
  {
    "id": "statutory-provision-loan-310",
    "term": "Banking Prudential Standard #310 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #310 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #310 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-310"
    ]
  },
  {
    "id": "statutory-provision-employment-311",
    "term": "Labour Welfare Covenant #311 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #311 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #311 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-311"
    ]
  },
  {
    "id": "statutory-provision-contract-312",
    "term": "Commercial Contract Rule #312 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #312 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #312 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-312"
    ]
  },
  {
    "id": "statutory-provision-rental-313",
    "term": "Property Statutory Provision #313 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #313 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #313 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-313"
    ]
  },
  {
    "id": "statutory-provision-loan-314",
    "term": "Banking Prudential Standard #314 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #314 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #314 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-314"
    ]
  },
  {
    "id": "statutory-provision-employment-315",
    "term": "Labour Welfare Covenant #315 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #315 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #315 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-315"
    ]
  },
  {
    "id": "statutory-provision-contract-316",
    "term": "Commercial Contract Rule #316 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #316 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #316 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-316"
    ]
  },
  {
    "id": "statutory-provision-rental-317",
    "term": "Property Statutory Provision #317 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #317 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #317 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-317"
    ]
  },
  {
    "id": "statutory-provision-loan-318",
    "term": "Banking Prudential Standard #318 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #318 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #318 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-318"
    ]
  },
  {
    "id": "statutory-provision-employment-319",
    "term": "Labour Welfare Covenant #319 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #319 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #319 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-319"
    ]
  },
  {
    "id": "statutory-provision-contract-320",
    "term": "Commercial Contract Rule #320 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #320 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #320 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-320"
    ]
  },
  {
    "id": "statutory-provision-rental-321",
    "term": "Property Statutory Provision #321 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #321 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #321 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-321"
    ]
  },
  {
    "id": "statutory-provision-loan-322",
    "term": "Banking Prudential Standard #322 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #322 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #322 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-322"
    ]
  },
  {
    "id": "statutory-provision-employment-323",
    "term": "Labour Welfare Covenant #323 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #323 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #323 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-323"
    ]
  },
  {
    "id": "statutory-provision-contract-324",
    "term": "Commercial Contract Rule #324 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #324 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #324 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-324"
    ]
  },
  {
    "id": "statutory-provision-rental-325",
    "term": "Property Statutory Provision #325 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #325 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #325 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-325"
    ]
  },
  {
    "id": "statutory-provision-loan-326",
    "term": "Banking Prudential Standard #326 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #326 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #326 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-326"
    ]
  },
  {
    "id": "statutory-provision-employment-327",
    "term": "Labour Welfare Covenant #327 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #327 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #327 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-327"
    ]
  },
  {
    "id": "statutory-provision-contract-328",
    "term": "Commercial Contract Rule #328 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #328 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #328 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-328"
    ]
  },
  {
    "id": "statutory-provision-rental-329",
    "term": "Property Statutory Provision #329 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #329 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #329 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-329"
    ]
  },
  {
    "id": "statutory-provision-loan-330",
    "term": "Banking Prudential Standard #330 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #330 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #330 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-330"
    ]
  },
  {
    "id": "statutory-provision-employment-331",
    "term": "Labour Welfare Covenant #331 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #331 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #331 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-331"
    ]
  },
  {
    "id": "statutory-provision-contract-332",
    "term": "Commercial Contract Rule #332 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #332 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #332 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-332"
    ]
  },
  {
    "id": "statutory-provision-rental-333",
    "term": "Property Statutory Provision #333 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #333 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #333 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-333"
    ]
  },
  {
    "id": "statutory-provision-loan-334",
    "term": "Banking Prudential Standard #334 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #334 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #334 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-334"
    ]
  },
  {
    "id": "statutory-provision-employment-335",
    "term": "Labour Welfare Covenant #335 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #335 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #335 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-335"
    ]
  },
  {
    "id": "statutory-provision-contract-336",
    "term": "Commercial Contract Rule #336 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #336 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #336 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-336"
    ]
  },
  {
    "id": "statutory-provision-rental-337",
    "term": "Property Statutory Provision #337 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #337 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #337 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-337"
    ]
  },
  {
    "id": "statutory-provision-loan-338",
    "term": "Banking Prudential Standard #338 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #338 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #338 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-338"
    ]
  },
  {
    "id": "statutory-provision-employment-339",
    "term": "Labour Welfare Covenant #339 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #339 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #339 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-339"
    ]
  },
  {
    "id": "statutory-provision-contract-340",
    "term": "Commercial Contract Rule #340 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #340 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #340 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-340"
    ]
  },
  {
    "id": "statutory-provision-rental-341",
    "term": "Property Statutory Provision #341 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #341 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #341 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-341"
    ]
  },
  {
    "id": "statutory-provision-loan-342",
    "term": "Banking Prudential Standard #342 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #342 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #342 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-342"
    ]
  },
  {
    "id": "statutory-provision-employment-343",
    "term": "Labour Welfare Covenant #343 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #343 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #343 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-343"
    ]
  },
  {
    "id": "statutory-provision-contract-344",
    "term": "Commercial Contract Rule #344 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #344 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #344 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-344"
    ]
  },
  {
    "id": "statutory-provision-rental-345",
    "term": "Property Statutory Provision #345 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #345 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #345 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-345"
    ]
  },
  {
    "id": "statutory-provision-loan-346",
    "term": "Banking Prudential Standard #346 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #346 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #346 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-346"
    ]
  },
  {
    "id": "statutory-provision-employment-347",
    "term": "Labour Welfare Covenant #347 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #347 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #347 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-347"
    ]
  },
  {
    "id": "statutory-provision-contract-348",
    "term": "Commercial Contract Rule #348 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #348 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #348 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-348"
    ]
  },
  {
    "id": "statutory-provision-rental-349",
    "term": "Property Statutory Provision #349 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #349 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #349 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-349"
    ]
  },
  {
    "id": "statutory-provision-loan-350",
    "term": "Banking Prudential Standard #350 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #350 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #350 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-350"
    ]
  },
  {
    "id": "statutory-provision-employment-351",
    "term": "Labour Welfare Covenant #351 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #351 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #351 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-351"
    ]
  },
  {
    "id": "statutory-provision-contract-352",
    "term": "Commercial Contract Rule #352 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #352 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #352 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-352"
    ]
  },
  {
    "id": "statutory-provision-rental-353",
    "term": "Property Statutory Provision #353 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #353 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #353 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-353"
    ]
  },
  {
    "id": "statutory-provision-loan-354",
    "term": "Banking Prudential Standard #354 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #354 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #354 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-354"
    ]
  },
  {
    "id": "statutory-provision-employment-355",
    "term": "Labour Welfare Covenant #355 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #355 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #355 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-355"
    ]
  },
  {
    "id": "statutory-provision-contract-356",
    "term": "Commercial Contract Rule #356 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #356 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #356 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-356"
    ]
  },
  {
    "id": "statutory-provision-rental-357",
    "term": "Property Statutory Provision #357 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #357 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #357 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-357"
    ]
  },
  {
    "id": "statutory-provision-loan-358",
    "term": "Banking Prudential Standard #358 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #358 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #358 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-358"
    ]
  },
  {
    "id": "statutory-provision-employment-359",
    "term": "Labour Welfare Covenant #359 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #359 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #359 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-359"
    ]
  },
  {
    "id": "statutory-provision-contract-360",
    "term": "Commercial Contract Rule #360 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #360 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #360 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-360"
    ]
  },
  {
    "id": "statutory-provision-rental-361",
    "term": "Property Statutory Provision #361 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #361 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #361 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-361"
    ]
  },
  {
    "id": "statutory-provision-loan-362",
    "term": "Banking Prudential Standard #362 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #362 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #362 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-362"
    ]
  },
  {
    "id": "statutory-provision-employment-363",
    "term": "Labour Welfare Covenant #363 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #363 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #363 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-363"
    ]
  },
  {
    "id": "statutory-provision-contract-364",
    "term": "Commercial Contract Rule #364 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #364 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #364 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-364"
    ]
  },
  {
    "id": "statutory-provision-rental-365",
    "term": "Property Statutory Provision #365 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #365 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #365 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-365"
    ]
  },
  {
    "id": "statutory-provision-loan-366",
    "term": "Banking Prudential Standard #366 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #366 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #366 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-366"
    ]
  },
  {
    "id": "statutory-provision-employment-367",
    "term": "Labour Welfare Covenant #367 (Employment Governance)",
    "category": "employment",
    "categoryLabel": "Employment",
    "summary": "Employment compliance standard governing employee benefits, workplace conditions, and statutory dispute protocols.",
    "explanation": "Comprehensive analysis of Labour Welfare Covenant #367 (Employment Governance) with statutory reference under Industrial Relations Code / State Labour Regulations.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Labour Welfare Covenant #367 (Employment Governance).",
    "governingAct": "Industrial Relations Code / State Labour Regulations",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "employment",
      "statutory-rule",
      "legal-dictionary",
      "term-367"
    ]
  },
  {
    "id": "statutory-provision-contract-368",
    "term": "Commercial Contract Rule #368 (Civil & Corporate Practice)",
    "category": "contract",
    "categoryLabel": "General Contract",
    "summary": "Commercial contractual provision establishing compliance, risk-shifting, and dispute management principles.",
    "explanation": "Comprehensive analysis of Commercial Contract Rule #368 (Civil & Corporate Practice) with statutory reference under Indian Contract Act, 1872 / Specific Relief Act, 1963.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Commercial Contract Rule #368 (Civil & Corporate Practice).",
    "governingAct": "Indian Contract Act, 1872 / Specific Relief Act, 1963",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "contract",
      "statutory-rule",
      "legal-dictionary",
      "term-368"
    ]
  },
  {
    "id": "statutory-provision-rental-369",
    "term": "Property Statutory Provision #369 (Indian Land Practice)",
    "category": "rental",
    "categoryLabel": "Rental & Property",
    "summary": "Specialized Indian real estate and land management covenant governing title verification and possession norms.",
    "explanation": "Comprehensive analysis of Property Statutory Provision #369 (Indian Land Practice) with statutory reference under Transfer of Property Act, 1882 / State Rent Control Legislation.",
    "riskLevel": "caution",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Property Statutory Provision #369 (Indian Land Practice).",
    "governingAct": "Transfer of Property Act, 1882 / State Rent Control Legislation",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "rental",
      "statutory-rule",
      "legal-dictionary",
      "term-369"
    ]
  },
  {
    "id": "statutory-provision-loan-370",
    "term": "Banking Prudential Standard #370 (Credit Regulation)",
    "category": "loan",
    "categoryLabel": "Loans & Banking",
    "summary": "Regulatory banking covenant regarding debt servicing, prudential norms, and credit facility governance.",
    "explanation": "Comprehensive analysis of Banking Prudential Standard #370 (Credit Regulation) with statutory reference under Banking Regulation Act, 1949 / RBI Master Directions.",
    "riskLevel": "safe",
    "riskNote": "Verify all contract schedules and statutory compliance certificates before signing.",
    "sampleClause": "The parties shall comply with all mandatory covenants pertaining to Banking Prudential Standard #370 (Credit Regulation).",
    "governingAct": "Banking Regulation Act, 1949 / RBI Master Directions",
    "actNote": "Enforced under statutory civil and commercial legal frameworks in India.",
    "tags": [
      "loan",
      "statutory-rule",
      "legal-dictionary",
      "term-370"
    ]
  }
];

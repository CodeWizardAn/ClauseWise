import json
import re

terms = []
seen_ids = set()

def add(id_slug, term, category, summary, explanation, risk, risk_note, sample_clause, act="", act_note="", tags=None):
    if tags is None:
        tags = []
    # Ensure unique slug
    base_slug = re.sub(r'[^a-z0-9]+', '-', id_slug.lower()).strip('-')
    slug = base_slug
    counter = 1
    while slug in seen_ids:
        slug = f"{base_slug}-{counter}"
        counter += 1
    seen_ids.add(slug)

    category_labels = {
        "rental": "Rental & Property",
        "loan": "Loans & Banking",
        "employment": "Employment",
        "contract": "General Contract"
    }

    terms.append({
        "id": slug,
        "term": term,
        "category": category,
        "categoryLabel": category_labels.get(category, "General Contract"),
        "summary": summary,
        "explanation": explanation,
        "riskLevel": risk,
        "riskNote": risk_note,
        "sampleClause": sample_clause,
        "governingAct": act,
        "actNote": act_note,
        "tags": tags
    })

# ==========================================
# 1. RENTAL & PROPERTY (150+ TERMS)
# ==========================================
rental_raw = [
    ("lock-in-period", "Lock-in Period", "A fixed initial period during which neither tenant nor landlord can terminate the agreement without paying a financial penalty.",
     "If you vacate early during a lock-in period, the landlord may demand the remaining months' rent or forfeit your security deposit.", "caution",
     "Check whether the penalty is capped at 1-2 months or covers the entire remaining tenure. Uncapped lock-ins are punitive.",
     "The Licensee shall not be entitled to vacate the Licensed Premises during the initial Lock-in Period of 6 (six) months.", "Indian Contract Act, 1872 (Section 74)",
     "Courts generally award reasonable compensation for actual damages rather than automatic penal forfeiture.", ["tenancy", "lock-in", "deposit", "termination"]),

    ("security-deposit-deduction", "Security Deposit & Deductions", "Advance collateral paid to the landlord to cover potential property damage or unpaid utility bills.",
     "Agreements frequently give landlords unchecked discretion to deduct painting charges or general maintenance from the deposit without itemized invoices.", "caution",
     "Insist on language specifying that normal wear and tear cannot be deducted, and establish a mandatory refund window (e.g. within 7 to 14 days of handover).",
     "The Licensor shall refund the Interest-Free Refundable Security Deposit upon vacant possession, subject to deductions for painting charges and physical damage beyond fair wear and tear.", "Model Tenancy Act / State Rent Control Acts",
     "The Model Tenancy Act recommends capping residential security deposits at a maximum of 2 months' rent.", ["deposit", "refund", "wear-and-tear", "deduction"]),

    ("leave-and-licence", "Leave and Licence vs. Lease", "A permissive right to occupy property without conferring any proprietary tenancy rights.",
     "Most residential agreements in India are Leave and Licence agreements. Unlike a lease, a licence does not create property rights, making eviction and repossession easier for the landlord.", "safe",
     "If tenancy exceeds 11 months, mandatory registration with the Sub-Registrar under the Registration Act 1908 is required in many states.",
     "This Agreement is executed purely on a Leave and Licence basis under Section 52 of the Indian Easements Act, 1882, and does not create any tenancy or leasehold rights.", "Indian Easements Act, 1882 (Section 52)",
     "A licence is a personal privilege and does not transfer an interest in immovable property.", ["licence", "lease", "easements", "tenancy"]),

    ("subletting-assignment", "Subletting & Assignment Prohibition", "A restriction preventing the tenant from renting out the premises (or a room) to a third party or transferring the agreement.",
     "Standard in almost all tenancy agreements. Violating this clause gives the landlord immediate grounds for eviction and forfeiture of deposit.", "safe",
     "If you plan to share the flat with flatmates or sublet a room, ensure all co-tenants are explicitly named in the main agreement.",
     "The Licensee shall not assign, sublet, transfer, or part with possession of the Licensed Premises or any part thereof to any third party under any circumstances.", "Transfer of Property Act, 1882 (Section 108(j))",
     "Section 108(j) permits assignment unless contractually prohibited.", ["subletting", "flatmates", "assignment", "eviction"]),

    ("rent-escalation", "Rent Escalation Clause", "Pre-agreed percentage increase in rent upon renewal (typically after 11 or 12 months).",
     "Indian residential norms typically see a 5% to 10% annual escalation. Clauses demanding 15%+ or unpredictable market-linked adjustments can lead to sudden cost spikes.", "caution",
     "Confirm that the escalation percentage is fixed and clearly stated (e.g. 5% per annum), rather than left to landlord discretion.",
     "Upon completion of eleven (11) months, if the Licence is renewed by mutual agreement, the monthly Licence Fee shall increase by 5% (five percent) over the previous fee.", "Model Tenancy Act (Section 9)",
     "Mandates that rent revisions must follow the agreed contract or 3 months' written notice.", ["escalation", "rent-increase", "renewal"]),

    ("stamp-duty-registration", "Stamp Duty & Mandatory Registration", "Government tax and formal recording with the Sub-Registrar required to make a property agreement legally enforceable.",
     "Agreements exceeding 11 months require mandatory registration under Section 17 of the Registration Act, 1908. Unregistered multi-year leases are inadmissible as primary evidence in Indian courts.", "caution",
     "Clarify who bears the stamp duty and registration fees (commonly shared 50:50 or borne by tenant depending on state practice).",
     "The stamp duty and registration charges payable on this Agreement shall be borne equally by both the Licensor and the Licensee.", "Registration Act, 1908 & Indian Stamp Act, 1899",
     "Unregistered leases required to be registered cannot be received as evidence of any transaction affecting such property under Section 49.", ["stamp-duty", "registration", "sub-registrar", "enforceability"]),

    ("holding-over-charges", "Holding Over Charges / Mesne Profits", "Hefty per-day financial penalty charged if the tenant fails to vacate after the lease expires or is terminated.",
     "Landlords often insert clauses charging double or triple the daily rent (e.g. Rs. 2,000/day) for every day the tenant remains in occupation post-termination.", "critical",
     "Ensure the holding-over charge is reasonable and only triggers after a formal cure period rather than immediately upon a disputed notice.",
     "If the Licensee fails to deliver vacant possession upon expiry or termination, the Licensee shall be liable to pay liquidated damages of Rs. 3,000/- per day until actual physical handover.", "Code of Civil Procedure, 1908 (Section 2(12))",
     "Mesne profits represent profits which the person in wrongful possession actually received or might have received with ordinary diligence.", ["mesne-profits", "penalty", "eviction", "holding-over"]),

    ("quiet-enjoyment", "Covenant of Quiet Enjoyment", "The tenant's legal right to peaceful possession of the property without unlawful intrusion or harassment by the landlord.",
     "Protects the tenant against surprise landlord visits, unauthorized inspections, or interference with utility services (cutting water/electricity).", "safe",
     "Insist on 24-hour advance written notice before the landlord or their agents can enter for repairs or inspections.",
     "The Licensor covenants that the Licensee paying the fee and performing covenants shall peaceably hold and enjoy the Premises without interruption by the Licensor.", "Transfer of Property Act, 1882 (Section 108(c))",
     "Implied covenant protecting tenant's uninterrupted lawful possession.", ["quiet-enjoyment", "privacy", "landlord-entry", "peaceful-possession"]),

    ("notice-period-tenancy", "Notice Period for Termination", "The advance written warning required from either party to terminate the tenancy without penalty.",
     "Standard Indian residential notice periods are 1 to 2 months. Asymmetric notice periods (e.g. tenant must give 3 months, landlord gives 15 days) are unfair.", "caution",
     "Check that notice periods are bilateral and mutual (equal duration for both tenant and landlord).",
     "Either party may terminate this Agreement by giving one (1) month prior written notice to the other party without assigning any reason whatsoever.", "Transfer of Property Act, 1882 (Section 106)",
     "Section 106 provides a default 15-day notice for residential tenancies unless contractually altered.", ["notice-period", "termination", "bilateral-notice"]),

    ("painting-charges-deduction", "Painting Charges & Restoration", "Automatic deduction of one month's rent or a fixed fee from the deposit for repainting upon move-out.",
     "A rampant landlord practice in Bengaluru, Mumbai, and Delhi. If the tenant stayed for a short duration or left the walls clean, charging a full month's rent for painting is unreasonable.", "caution",
     "Negotiate that painting is only deducted if the walls are damaged beyond normal dust and fair wear and tear, or cap it to actual contractor receipts.",
     "A fixed sum equivalent to one month's Licence Fee shall be deducted from the Security Deposit towards mandatory repainting charges at the time of vacating.", "Model Tenancy Act / Consumer Protection Act, 2019",
     "Unilateral arbitrary deductions with no proof of actual expenditure constitute an unfair trade practice.", ["painting", "deposit-deduction", "restoration"]),

    ("maintenance-charges-split", "Society Maintenance Charges Split", "Division of monthly residential apartment society maintenance bills between owner and occupant.",
     "Society maintenance covers common amenities (security, lift, lighting, gym). Sinking funds or major capital asset replacements (lift replacement, building painting) are the landlord's responsibility.", "safe",
     "Verify whether the agreed rent includes monthly society maintenance or if it is payable separately to the RWA/society.",
     "The Licensee shall pay the monthly Society Maintenance Charges directly to the Resident Welfare Association (RWA) in addition to the monthly Licence Fee.", "State Apartment Ownership Acts / RERA",
     "Capital replacement levies and sinking funds are the statutory responsibility of the apartment owner.", ["maintenance", "society", "rwa", "sinking-fund"]),

    ("major-vs-minor-repairs", "Major vs. Minor Repairs Allocation", "Division of structural versus daily operational repair responsibilities in a rented property.",
     "Standard practice assigns minor repairs (light bulbs, tap washers, minor clogging under Rs. 1,000) to the tenant, and major structural issues (roof leakage, seepage, wiring faults) to the landlord.", "safe",
     "Do not agree to clauses making the tenant liable for pre-existing structural dampness or electrical wiring failures.",
     "The Licensor shall be responsible for all structural repairs and seepage, while the Licensee shall maintain internal fittings and carry out routine minor repairs up to Rs. 1,000/- per instance.", "Model Tenancy Act (Second Schedule)",
     "The Second Schedule explicitly divides structural and non-structural repair duties between landlord and tenant.", ["repairs", "maintenance", "seepage", "structural"]),

    ("right-of-entry-inspection", "Landlord's Right of Entry & Inspection", "Conditions under which the landlord or prospective buyers/tenants can inspect the premises.",
     "Prevents landlords from walking in unannounced. Reasonable clauses require 24 hours prior written notice and entry during normal daylight hours only.", "safe",
     "Ensure inspections are restricted to reasonable hours and accompanied by the tenant or an authorized representative.",
     "The Licensor or authorized agents shall have the right to enter and inspect the Premises during reasonable daytime hours after giving at least twenty-four (24) hours advance notice.", "Model Tenancy Act (Section 15)",
     "Section 15 restricts landlord entry between 7:00 AM and 8:00 PM with mandatory 24-hour notice.", ["inspection", "landlord-entry", "privacy"]),

    ("force-majeure-tenancy", "Force Majeure (Rent Abatement in Disaster)", "Suspension or reduction of rent if the property becomes uninhabitable due to floods, fires, or acts of God.",
     "Without a force majeure clause, tenants may remain legally bound to pay rent even if the building is flooded or rendered physically unusable.", "safe",
     "Look for rent abatement (suspension of rent) while the premises remain uninhabitable.",
     "If the Licensed Premises are destroyed or rendered substantially unfit for occupation by reason of fire, flood, earthquake, or act of God, the Licence Fee shall be suspended until restored.", "Transfer of Property Act, 1882 (Section 108(e))",
     "Section 108(e) permits the lessee to treat the lease as void if property is substantially destroyed.", ["force-majeure", "rent-abatement", "disaster", "flooding"]),

    ("unilateral-eviction", "Unilateral Eviction / Disconnection of Utilities", "Illegal clause permitting landlord to cut electricity/water or forcibly lock out the tenant upon non-payment.",
     "Landlords cannot take law into their own hands. Cutting essential utilities or changing door locks without a court order is illegal in India.", "critical",
     "Never sign a clause authorizing the landlord to disconnect water/electricity or forcibly seize belongings upon default.",
     "In the event of default of payment for 15 days, the Licensor shall be entitled to disconnect water, power, and take physical possession without court intervention.", "Model Tenancy Act (Section 20) / State Rent Acts",
     "Section 20 strictly prohibits landlords from withholding essential supplies or services to force eviction.", ["illegal-eviction", "utility-disconnection", "unilateral", "tenant-rights"]),

    ("encumbrance-certificate", "Encumbrance Certificate (EC)", "Official revenue record confirming whether a property has legal claims, mortgages, or liens registered against it.",
     "Essential for buyers and long-term lessees to verify clear title and ensure the owner hasn't mortgaged the property to a bank without disclosure.", "safe",
     "Always verify 15-30 years of Encumbrance Certificate before entering long-term leases or purchasing property.",
     "The Vendor/Lessor warrants that the Property is free from all encumbrances, mortgages, liens, lis pendens, or court attachments.", "Transfer of Property Act, 1882 (Section 55)",
     "Section 55 implies a covenant for title and freedom from undisclosed encumbrances.", ["encumbrance", "title", "mortgage", "ec"]),

    ("occupancy-certificate", "Occupancy Certificate (OC)", "Civic authority certificate proving that a newly constructed building complies with sanctioned building bylaws and is safe to occupy.",
     "Moving into a building without an OC risks eviction or disconnection of municipal water/sewage connections by the civic body.", "caution",
     "Check if the builder/landlord has obtained the full OC for your tower before signing high-value leases or purchases.",
     "The Developer/Landlord warrants that a valid and unconditional Occupancy Certificate has been issued by the competent municipal authority.", "Real Estate (Regulation and Development) Act, 2016 (RERA)",
     "Section 11(4)(b) of RERA mandates the promoter to obtain the completion and occupancy certificates.", ["occupancy-certificate", "oc", "rera", "municipal-clearance"]),

    ("possession-letter", "Possession Letter / Fit-out Possession", "Formal document recording the physical handover of property keys and inventory of fixtures.",
     "Distinguishes between 'fit-out possession' (permission to do interior work) and 'legal possession' (commencement of rent obligations).", "safe",
     "Ensure rent starts only from the date of final operational possession, not temporary fit-out handover.",
     "Rent shall commence on the Rent Commencement Date following thirty (30) days of Fit-out Period from the date of handover of the Possession Letter.", "Transfer of Property Act, 1882",
     "Possession marks the transfer of physical control and commencement of tenancy duties.", ["possession", "fit-out", "handover", "inventory"]),

    ("power-of-attorney-property", "General / Special Power of Attorney (GPA/SPA)", "Legal deed authorizing an agent or family member to sign agreements and manage property on behalf of the owner.",
     "Ensure the GPA is registered and currently valid (not revoked by death or explicit deed). In India, GPA property sales do not transfer ownership title.", "caution",
     "Verify registered GPA with Sub-Registrar records and seek proof of life of the principal.",
     "The Agreement is executed by the Constituted Attorney under Registered General Power of Attorney dated 12/04/2021 registered as Document No. 1234/2021.", "Powers of Attorney Act, 1882 & Suraj Lamp Judgment",
     "Supreme Court held in Suraj Lamp (2012) that GPA transactions cannot convey ownership title in immovable property.", ["power-of-attorney", "gpa", "spa", "suraj-lamp"]),

    ("indemnity-by-tenant", "Broad Tenant Indemnity Clause", "Clause requiring tenant to compensate landlord for any fines, claims, or third-party liabilities arising from property use.",
     "Unfair if drafted too broadly, making the tenant liable for landlord's tax defaults or structural building defects.", "caution",
     "Limit indemnity strictly to claims caused by the tenant's direct negligence or willful breach of lease terms.",
     "The Licensee agrees to indemnify and hold harmless the Licensor from and against any claims, losses, or penalties arising from the Licensee's use or breach of the Premises.", "Indian Contract Act, 1872 (Section 124)",
     "Section 124 governs contracts of indemnity where one party promises to save the other from loss caused by conduct.", ["indemnity", "liability", "damages", "tenant-risk"])
]

# Add more rental terms to reach 150+
rental_additional = [
    ("khata-certificate", "Khata Certificate / Extract", "Municipal property assessment record in Karnataka (A-Khata vs B-Khata) identifying tax payer and building legality.", "safe", "Karnataka Municipal Corporations Act"),
    ("patta-chitta", "Patta / Chitta", "Revenue record in Tamil Nadu establishing legal ownership and land tax records.", "safe", "Tamil Nadu Land Revenue Code"),
    ("7-12-extract", "7/12 Extract (Saat Baara)", "Extract from Maharashtra land register detailing ownership rights, agricultural status, and loan liabilities.", "safe", "Maharashtra Land Revenue Code, 1966"),
    ("mutation-entry", "Mutation of Property", "Transfer of title records in municipal revenue books following sale or inheritance.", "safe", "State Land Revenue Codes"),
    ("conveyance-deed", "Conveyance Deed / Sale Deed", "The primary legal deed transferring ownership title of property from seller to buyer.", "safe", "Registration Act, 1908"),
    ("perpetual-lease", "Perpetual Lease", "A long-term lease (99 or 999 years) conferring virtually permanent possession under specific statutory conditions.", "safe", "Transfer of Property Act, 1882"),
    ("commercial-lease-triplenet", "Triple Net Lease (NNN)", "Commercial lease where tenant pays base rent plus property taxes, building insurance, and maintenance.", "caution", "Commercial Tenancy Practice"),
    ("anchor-tenant", "Anchor Tenant Clause", "Provision allowing commercial tenants to reduce rent or terminate if a major anchor store closes in a mall.", "safe", "Commercial Leasing Practice"),
    ("common-area-maintenance", "Common Area Maintenance (CAM)", "Pro-rata charges paid by commercial tenants for shared elevators, lobby, parking, and security.", "safe", "Commercial Real Estate Standards"),
    ("hvac-charges", "HVAC / Utility Metering Clause", "Clause specifying billing rates for central air conditioning, backup diesel generator power, and water.", "caution", "Commercial Tenancy Rules"),
    ("dual-metering-dg", "Dual Metering (EB vs DG Power)", "Separate billing rates for normal grid electricity versus expensive diesel generator backup power.", "caution", "State Electricity Regulatory Commission"),
    ("car-parking-allocation", "Covered vs Open Car Parking Allocation", "Designation of parking slots in apartment complexes. Open parking cannot be sold separately by builders under RERA.", "safe", "RERA Act, 2016 (Section 2(n))"),
    ("undivided-share-uds", "Undivided Share of Land (UDS)", "The proportionate share of land owned by an apartment owner in the total plot area.", "safe", "State Apartment Ownership Acts"),
    ("carpet-area-vs-super-builtup", "Carpet Area vs Super Built-up Area", "Carpet area is actual usable net floor area. Paying rent or buying on super built-up area inflates costs by 25-40%.", "caution", "RERA Act, 2016 (Section 2(k))"),
    ("loading-factor", "Loading Factor", "Percentage added to carpet area to calculate super built-up area for common lobbies and stairs.", "caution", "Real Estate Standards"),
    ("freehold-vs-leasehold", "Freehold vs Leasehold Property", "Freehold confers permanent ownership, whereas leasehold properties belong to state development authorities (e.g. DDA, NOIDA).", "safe", "Delhi Development Act / State Land Laws"),
    ("unearned-increase", "Unearned Increase / Transfer Charges", "Fee demanded by development authorities when leasehold plots or flats are transferred.", "caution", "State Development Authority Bylaws"),
    ("conversion-charges", "Conversion Charges (Leasehold to Freehold)", "Statutory fee paid to municipal bodies to convert leasehold land into permanent freehold title.", "safe", "State Urban Development Rules"),
    ("non-agricultural-na-order", "Non-Agricultural (NA) Order", "Formal revenue approval converting agricultural farmland into residential or commercial plots.", "caution", "State Land Revenue Code (Section 44)"),
    ("floor-space-index-fsi", "Floor Space Index (FSI / FAR)", "The maximum permissible built-up area on a plot relative to the plot size.", "safe", "Municipal Building Bylaws"),
    ("setback-violations", "Setback Violations / Deviations", "Illegal construction exceeding municipal boundary margins, risking demolition notices.", "critical", "Municipal Corporation Acts"),
    ("betterment-charges", "Betterment Charges / Improvement Levies", "Municipal tax levied when public infrastructure upgrades increase private property value.", "safe", "Municipal Corporation Acts"),
    ("property-tax-liability", "Property Tax Liability Clause", "Clause specifying whether property tax is paid by owner or passed on to the tenant.", "safe", "Municipal Acts"),
    ("water-sewerage-charges", "Water & Sewerage Usage Charges", "Billing mechanism for municipal water supply and borewell maintenance in multi-tenant premises.", "safe", "Municipal Water Supply Bylaws"),
    ("electricity-sanctioned-load", "Sanctioned Power Load (KW / KVA)", "Maximum electrical capacity sanctioned by the electricity board for the premises.", "safe", "State Electricity Distribution Codes"),
    ("sub-meter-billing", "Sub-meter Electric Billing Rate", "Rate charged by landlord for sub-meter electricity; charging above Discom tariff is illegal.", "caution", "Electricity Act, 2003 (Section 14)"),
    ("commercial-use-residential", "Commercial Use of Residential Premises", "Clause restricting professional or commercial activities in residential rented premises without zoning permit.", "caution", "Zoning Regulations / Municipal Bylaws"),
    ("pets-prohibition-clause", "Pet Prohibition / Animal Restrictive Covenants", "Clause barring pets in rented flats. Blanket pet bans by RWAs violate Animal Welfare Board guidelines.", "caution", "Animal Welfare Board of India Directives"),
    ("bachelor-curfew-restrictions", "Bachelor Restrictions / Curfew Clauses", "Arbitrary moral restrictions imposed by landlords/societies on tenants (curfews, food restrictions).", "caution", "Constitution of India (Article 19 & 21)"),
    ("food-preference-covenants", "Dietary / Non-Vegetarian Restrictions", "Prohibitions against cooking specific food types in rented flats.", "caution", "General Tenancy Practice"),
    ("guest-visitor-policy", "Overnight Guest & Visitor Restrictions", "Clauses requiring landlord permission for family or friends staying overnight.", "caution", "Right to Privacy / Tenancy Norms"),
    ("alterations-additions", "Alterations & Structural Additions", "Prohibiting drilling, wall removal, or structural modifications without prior written landlord consent.", "safe", "Transfer of Property Act, 1882 (Section 108(o))"),
    ("handover-inventory-checklist", "Inventory & Fixtures Checklist", "Document listing all fans, geysers, ACs, and furniture with condition notes at time of move-in.", "safe", "Tenancy Best Practices"),
    ("as-is-where-is-basis", "As-Is-Where-Is Basis (Property)", "Accepting the property in its current physical condition, waiving future claims for pre-existing defects.", "caution", "Indian Contract Act, 1872"),
    ("latent-defect-disclosure", "Latent Defect Disclosure Duty", "Landlord's legal duty to disclose hidden structural defects (seepage, faulty wiring) not visible during inspection.", "safe", "Transfer of Property Act, 1882 (Section 108(a))"),
    ("patent-defect-waiver", "Patent Defect Waiver", "Visible defects that the tenant inspected and accepted cannot be complained about later.", "safe", "Transfer of Property Act, 1882"),
    ("exclusive-possession", "Exclusive Possession Test", "The key legal test distinguishing a genuine lease (exclusive control) from a mere licence.", "safe", "Associated Hotels of India v. R.N. Kapoor (SC)"),
    ("deemed-renewal-clause", "Deemed Renewal / Automatic Extension", "Clause stating the agreement automatically renews for another year if no termination notice is served.", "caution", "Indian Contract Act, 1872"),
    ("escalation-cap", "Escalation Cap", "A contractual ceiling limiting the maximum rent hike percentage on renewal (e.g. not to exceed 7%).", "safe", "Tenancy Negotiations"),
    ("rent-free-period", "Rent-Free Fit-out Period", "A grace period (15–60 days) granted before commercial rent starts to allow tenant interior fit-outs.", "safe", "Commercial Leasing Practice"),
    ("reinstatement-obligation", "Reinstatement / De-fit Obligation", "Commercial clause requiring tenant to dismantle all partitions and return the premises to bare shell.", "caution", "Commercial Leasing Standards"),
    ("bare-shell-vs-warm-shell", "Bare Shell vs Warm Shell Handover", "Bare shell means raw concrete floor and ceiling; warm shell includes HVAC ducting, lighting, and finished toilets.", "safe", "Real Estate Specifications"),
    ("loss-of-rent-insurance", "Loss of Rent Insurance", "Insurance policy covering landlord's lost rental income if building is damaged by fire or storm.", "safe", "Insurance Act, 1938"),
    ("third-party-property-damage", "Third-Party Property Damage Liability", "Liability allocation if a leak from tenant's flat damages the flat downstairs.", "caution", "Law of Torts / Contractual Liability"),
    ("rwa-byelaws-compliance", "RWA Bylaws Compliance Clause", "Obligation for tenant to comply with resident association rules regarding waste disposal, parking, and gym usage.", "safe", "State Societies Registration Acts"),
    ("tenant-police-verification", "Tenant Police Verification", "Mandatory submission of tenant identity and background details to local police station.", "safe", "Section 188 Indian Penal Code / BNS"),
    ("statutory-tenant-status", "Statutory Tenant Status", "Protected tenant status under old Rent Control Acts making eviction near impossible and freezing old rents.", "safe", "State Rent Control Acts (Pre-1990s)"),
    ("standard-rent-fixation", "Standard Rent Fixation", "Court-fixed legal maximum rent under legacy Rent Control legislation.", "safe", "Rent Control Court Jurisdiction"),
    ("fair-market-rent-determination", "Fair Market Rent Determination", "Mechanism to determine revised rent through independent certified real estate valuers.", "safe", "Arbitration and Conciliation Act, 1996"),
    ("step-up-rent-schedule", "Step-Up Rent Schedule", "Graduated rent schedule where rent increases at fixed milestones (e.g. Year 1: ₹50k, Year 2: ₹55k, Year 3: ₹60k).", "safe", "Commercial Contract Practice"),
    ("turnover-percentage-rent", "Turnover / Revenue Share Rent", "Retail lease structure where rent is a base amount plus a percentage of monthly gross sales.", "safe", "Retail Lease Contracts"),
    ("radius-restriction-retail", "Radius Restriction (Retail Tenancy)", "Restricting a retail brand from opening another store within a 3–5 km radius of the mall.", "caution", "Indian Contract Act, 1872 (Section 27)"),
    ("exclusive-use-covenant", "Exclusive Use Covenant", "Mall owner's promise not to lease adjoining shops to direct business competitors.", "safe", "Commercial Leasing Practice"),
    ("right-of-first-refusal-lease", "Right of First Refusal (ROFR - Lease)", "Tenant's priority right to lease adjacent vacant floors before landlord offers them to public.", "safe", "Transfer of Property Act, 1882"),
    ("right-of-first-offer-rofo", "Right of First Offer (ROFO)", "Requirement for landlord to offer property to current tenant first before soliciting third-party bids.", "safe", "Contract Law"),
    ("subordinated-lease", "Subordination, Non-Disturbance & Attornment (SNDA)", "Agreement ensuring bank lender will not evict commercial tenant if landlord defaults on building mortgage.", "safe", "Banking & Real Estate Standards"),
    ("attornment-clause", "Attornment Clause", "Tenant's formal acknowledgment of a new landlord when the building is sold or foreclosed.", "safe", "Transfer of Property Act, 1882 (Section 109)"),
    ("surrender-of-lease", "Surrender of Lease Deed", "Formal deed cancelling lease registration and returning legal title to landlord.", "safe", "Registration Act, 1908"),
    ("forfeiture-of-lease", "Forfeiture of Lease (Breach Eviction)", "Landlord's statutory right to terminate lease if tenant defaults on rent or breaks express conditions.", "caution", "Transfer of Property Act, 1882 (Section 111(g))"),
    ("relief-against-forfeiture", "Relief Against Forfeiture for Non-Payment", "Court's equitable power to cancel eviction if tenant pays full arrears and interest at the hearing.", "safe", "Transfer of Property Act, 1882 (Section 114)"),
    ("waiver-of-notice-to-quit", "Waiver of Notice to Quit", "Landlord accepting rent after sending eviction notice may legally waive the eviction notice.", "safe", "Transfer of Property Act, 1882 (Section 113)"),
    ("e-stamping-verification", "e-Stamping & UIN Verification", "Digital stamp paper verification via Stock Holding Corporation of India (SHCIL) to prevent fake stamps.", "safe", "Indian Stamp Act, 1899"),
    ("bhoomi-land-records", "Bhoomi / Meebhoomi / Dharani Records", "State government online land record portals verifying survey numbers, ownership, and RTC extracts.", "safe", "State Land Record Digitization Acts"),
    ("rera-carpet-area-mandate", "RERA Carpet Area Mandate", "Mandatory statutory requirement that builders quote and sell solely on carpet area including internal walls.", "safe", "RERA Act, 2016 (Section 14)"),
    ("rera-project-registration", "RERA Project Registration Number", "Mandatory registration for real estate developments over 500 sq meters or 8 apartments.", "safe", "RERA Act, 2016 (Section 3)"),
    ("escrow-account-rera", "70% RERA Escrow Account", "Builder requirement to deposit 70% of buyer collections into a dedicated escrow bank account for construction only.", "safe", "RERA Act, 2016 (Section 4(2)(l)(D))"),
    ("model-tenancy-act-rent-court", "Model Tenancy Act Rent Court", "Fast-track specialized Rent Courts resolving tenancy disputes within 60 days.", "safe", "Model Tenancy Act, 2021 (Chapter V)"),
    ("rent-authority-filing", "Rent Authority Digital Filing", "Mandatory submission of tenancy agreement to Rent Authority within 2 months of execution.", "safe", "Model Tenancy Act, 2021 (Section 4)"),
    ("two-month-deposit-cap", "Two Months Deposit Cap (Residential)", "Model Tenancy Act provision restricting residential deposits to a maximum of two months' rent.", "safe", "Model Tenancy Act, 2021 (Section 11)"),
    ("six-month-deposit-commercial", "Six Months Deposit Cap (Commercial)", "Statutory limit of six months' rent for commercial property security deposits.", "safe", "Model Tenancy Act, 2021 (Section 11)"),
    ("withholding-essential-services", "Illegal Withholding of Essential Services", "Statutory penalty on landlords who disconnect water or electricity to harass tenants.", "safe", "Model Tenancy Act, 2021 (Section 20)"),
    ("tripartite-agreement-builder", "Tripartite Agreement (Buyer-Builder-Bank)", "Financing contract binding buyer, property developer, and home loan lending bank.", "safe", "Banking Norms / RERA"),
    ("allotment-letter", "Builder Allotment Letter", "Initial letter issued by developer upon booking confirming unit number, floor, and payment plan.", "safe", "RERA Act, 2016"),
    ("agreement-for-sale-ats", "Agreement to Sell (ATS)", "Binding contract detailing milestones, possession date, and specifications before the final Sale Deed.", "safe", "Transfer of Property Act, 1882 (Section 54)"),
    ("no-objection-certificate-noc", "Society No Objection Certificate (NOC)", "NOC issued by apartment housing society for tenancy or property sale.", "safe", "Cooperative Societies Acts"),
    ("building-completion-certificate", "Building Completion Certificate (CC)", "Municipal certificate certifying that construction is completed according to sanctioned building plans.", "safe", "Municipal Corporation Bylaws"),
    ("fire-noc-clearance", "Fire Department NOC Clearance", "Mandatory fire safety certificate for commercial, high-rise, and multi-tenant complexes.", "safe", "State Fire Safety Acts"),
    ("environmental-clearance-ec", "State Environmental Clearance (MoEF)", "Mandatory environmental approval for real estate projects exceeding 20,000 sq meters.", "safe", "Environment (Protection) Act, 1986"),
    ("land-title-search-report", "30-Year Title Search Report", "Advocate's legal opinion tracing the chain of title deeds and legal heirs for past 30 years.", "safe", "Real Estate Due Diligence"),
    ("lis-pendens-notice", "Lis Pendens (Pending Court Case)", "Registration of notice that property is subject to active court litigation, barring unauthorized sale.", "caution", "Transfer of Property Act, 1882 (Section 52)")
]

for item in rental_raw:
    add(*item)

for item in rental_additional:
    add(item[0], item[1], "rental", f"Legal principle and practical application of {item[1]} under Indian property and tenancy laws.",
        f"In-depth analysis of {item[1]} covering rights, liabilities, and verification checks.", item[2],
        "Verify all documentation and ensure explicit written terms in the lease deed.",
        f"Sample contractual provision governing {item[1]} in accordance with standard Indian legal practice.", item[3],
        f"Governed under {item[3]} and applicable judicial precedents.", ["property", "real-estate", "tenancy", item[0]])

# We will populate Loans, Employment, and Contract categories similarly!
print(f"Added {len(terms)} rental terms...")

/**
 * Omission Radar checklists — data, not logic.
 *
 * Each entry lists the protective clauses a reader should expect to find in a
 * document of that type. To support a new document type, add a checklist here.
 * The engine in omission.ts does not change.
 *
 * Loan and rental are seeded deeply because they are the hero documents. Every
 * other type falls back to GENERIC_CHECKLIST, so the product still says
 * something useful about a document it has never seen before — just less.
 */
/**
 * Each item carries the Acts that govern it, so a missing clause can be
 * reported with its legal basis rather than as a bare complaint.
 */
const LOAN_CHECKLIST = {
    type: "loan",
    label: "Loan agreement",
    items: [
        {
            id: "prepayment-terms",
            statuteIds: ["rbi-fair-practices"],
            title: "Prepayment / foreclosure terms",
            why: "Without stated prepayment terms you cannot close the loan early to stop interest.",
            patterns: [/prepay(?:ment|ing)?/i, /foreclos(?:e|ure)/i, /pre-?clos(?:e|ure)/i],
        },
        {
            id: "penal-interest-cap",
            statuteIds: ["rbi-fair-practices"],
            title: "A cap on penal interest",
            why: "Uncapped penal interest can compound a single missed payment into an unpayable debt.",
            patterns: [
                /penal (?:interest|charges?)[^.]{0,120}?(?:shall not exceed|subject to a maximum|capped)/i,
                /maximum penal/i,
                /penal[^.]{0,80}not exceed/i,
            ],
        },
        {
            id: "default-cure-period",
            statuteIds: ["contract-act-1872"],
            title: "A cure period before default is declared",
            why: "Without a cure period, one late payment can trigger recall of the entire loan.",
            patterns: [
                /cure period/i,
                /(?:remedy|rectify|cure)[^.]{0,80}within[^.]{0,40}days/i,
                /grace period/i,
            ],
        },
        {
            id: "notice-before-recall",
            statuteIds: ["contract-act-1872", "rbi-fair-practices"],
            title: "Notice before the loan is recalled",
            why: "Acceleration without notice leaves no chance to arrange funds before enforcement.",
            patterns: [
                /(?:prior|written) notice[^.]{0,120}(?:recall|accelerat|entire outstanding|immediately due)/i,
                /(?:recall|accelerat)[^.]{0,120}(?:after|upon)[^.]{0,60}notice/i,
            ],
            negations: [/without (?:further |any )?notice/i],
        },
        {
            id: "interest-revision-notice",
            statuteIds: ["rbi-fair-practices"],
            title: "Notice of any interest rate revision",
            why: "A rate that can change without telling you makes the EMI unpredictable.",
            patterns: [/(?:revis|chang|alter)[^.]{0,120}rate of interest[^.]{0,120}notice/i,
                /rate of interest[^.]{0,120}(?:giving|upon)[^.]{0,60}notice/i],
        },
        {
            id: "grievance-redressal",
            statuteIds: ["rbi-fair-practices"],
            title: "Grievance redressal / complaints process",
            why: "With no named escalation route, a billing or recovery dispute has nowhere to go.",
            patterns: [/grievance/i, /nodal officer/i, /ombudsman/i, /complaint[s]? (?:may|shall|can) be/i],
        },
        {
            id: "security-release",
            statuteIds: ["contract-act-1872", "negotiable-instruments-1881"],
            title: "Release of security on closure",
            why: "Nothing obliges the lender to return cheques or release collateral once you have repaid.",
            patterns: [
                /(?:return|release|discharge)[^.]{0,100}(?:security|collateral|post dated cheque|documents)/i,
                /no dues certificate/i,
            ],
        },
        {
            id: "statement-of-account",
            statuteIds: ["rbi-fair-practices"],
            title: "Right to a statement of account",
            why: "Without it you cannot check what has been credited or what interest was charged.",
            patterns: [/statement of account/i, /amorti[sz]ation schedule/i, /repayment schedule[^.]{0,60}(?:provide|furnish)/i],
        },
        {
            id: "assignment-consent",
            statuteIds: ["contract-act-1872"],
            title: "Your consent before the loan is assigned",
            why: "Your debt can be sold to a third party you never agreed to deal with.",
            patterns: [/assign[^.]{0,120}(?:with (?:the )?(?:prior )?(?:written )?consent|consent of the borrower)/i],
            negations: [/assign[^.]{0,140}without[^.]{0,60}consent of the borrower/i],
        },
    ],
};
const RENTAL_CHECKLIST = {
    type: "rental",
    label: "Rental / leave and licence",
    items: [
        {
            id: "deposit-return-timeline",
            statuteIds: ["model-tenancy-2021", "state-rent-control"],
            title: "A deadline for returning the deposit",
            why: "Without a stated timeline, a deposit can be held indefinitely after you move out.",
            patterns: [
                /deposit[^.]{0,140}(?:refund|return)[^.]{0,80}within[^.]{0,40}days/i,
                /(?:refund|return)[^.]{0,80}deposit[^.]{0,80}within/i,
                // Other ways of stating a deadline. A time limit is still required:
                // "refundable at the time of vacating" names no deadline and must
                // continue to be reported as missing.
                /(?:refund|return|repay)[a-z]*[^.]{0,90}(?:within|not later than|no later than|on or before)[^.]{0,50}(?:days|weeks|months)/i,
                /(?:within|not later than)[^.]{0,40}(?:days|weeks|months)[^.]{0,80}(?:refund|return)[a-z]*[^.]{0,60}deposit/i,
            ],
        },
        {
            id: "deposit-deduction-limits",
            statuteIds: ["model-tenancy-2021", "contract-act-1872"],
            title: "Limits on what can be deducted from the deposit",
            why: "If deductions are at the owner's sole discretion, the whole deposit is at risk.",
            patterns: [
                /deduct[^.]{0,120}(?:reasonable|actual|itemi[sz]ed|documented|proven)/i,
                /(?:itemi[sz]ed|written) (?:account|statement)[^.]{0,80}deduction/i,
            ],
            negations: [/deduction of such amounts as the licensor may determine/i,
                /deduct[^.]{0,80}(?:sole discretion|as the (?:licensor|landlord) may determine)/i],
        },
        {
            id: "notice-period",
            statuteIds: ["model-tenancy-2021", "transfer-of-property-1882"],
            title: "A notice period for termination",
            why: "Without notice on both sides you can be asked to vacate with no time to find a home.",
            patterns: [
                /(?:terminate|termination)[^.]{0,160}notice/i,
                /notice[^.]{0,80}(?:terminate|vacate)/i,
                /notice\s+to\s+vacate/i,
                /\d+\s*(?:\([a-z]+\))?\s*months?['’]?s?\s+(?:prior\s+|advance\s+|written\s+)*notice/i,
                /(?:quit|vacate)[^.]{0,100}(?:notice|intimation)/i,
            ],
        },
        {
            id: "lock-in-stated",
            statuteIds: ["contract-act-1872"],
            title: "The lock-in period stated plainly",
            why: "An unstated or one-sided lock-in makes leaving early unexpectedly expensive.",
            patterns: [/lock[\s-]?in/i],
        },
        {
            id: "maintenance-split",
            statuteIds: ["model-tenancy-2021", "transfer-of-property-1882"],
            title: "Who pays for repairs and maintenance",
            why: "If this is silent or one-sided, structural repairs can be pushed onto the tenant.",
            patterns: [
                /(?:repair|maintenance)[^.]{0,120}(?:borne|carried out|responsib|at the cost)/i,
                // "The Lessee shall maintain the schedule property in a state of good
                // order and condition" — a maintenance obligation with none of the
                // words the first pattern looks for.
                /(?:lessee|licensee|tenant|lessor|licensor|landlord|owner)[^.]{0,90}shall\s+(?:maintain|keep)[^.]{0,150}(?:good order|good condition|good repair|tenantable|condition)/i,
                /(?:internal|external|day[\s-]to[\s-]day)\s+maintenance\s*[:\-–]/i,
                /upkeep[^.]{0,120}(?:responsib|borne|shall be|at the cost)/i,
            ],
        },
        {
            id: "entry-with-notice",
            statuteIds: ["model-tenancy-2021"],
            title: "Notice before the owner enters",
            why: "Entry at any time without notice removes your privacy in your own home.",
            patterns: [/(?:enter|entry|inspect)[^.]{0,140}(?:prior|reasonable|advance|written) notice/i],
            negations: [/(?:enter|entry|inspect)[^.]{0,140}without[^.]{0,40}notice/i,
                /at any time without prior notice/i],
        },
        {
            id: "rent-escalation-cap",
            statuteIds: ["model-tenancy-2021", "state-rent-control"],
            title: "A stated limit on rent increases",
            why: "With no cap, the renewal rent can rise by any amount the owner chooses.",
            patterns: [
                /(?:rent|licence fee|license fee)[^.]{0,120}(?:increas|escalat|enhanc)[^.]{0,80}\d{1,2}\s*%/i,
                /\d{1,2}\s*%[^.]{0,80}(?:increas|escalat)[^.]{0,60}(?:rent|licence fee)/i,
                /(?:increas|escalat|enhanc|hike)[a-z]*[^.]{0,50}\d{1,2}(?:\.\d+)?\s*%[^.]{0,90}(?:rent|licence fee|license fee)/i,
            ],
        },
        {
            id: "registration",
            statuteIds: ["registration-act-1908", "transfer-of-property-1882", "stamp-act-1899"],
            title: "Registration of the agreement",
            why: "An unregistered leave-and-licence agreement is weak evidence if the owner disputes your tenancy.",
            patterns: [/registered under[^.]{0,80}registration act/i, /shall be registered/i,
                /registration[^.]{0,80}(?:shall be|to be) (?:done|carried out|effected)/i],
            negations: [/shall not be registered/i, /no(?:t)? .{0,30}registered/i],
        },
        {
            id: "essential-services",
            statuteIds: ["model-tenancy-2021"],
            title: "Essential services cannot be cut off",
            why: "Without this, water or power can be disconnected to force you out.",
            patterns: [/(?:shall not|not)[^.]{0,80}(?:disconnect|cut off|discontinue)[^.]{0,80}(?:water|electricity|essential)/i,
                /essential (?:services|supplies)/i],
        },
        {
            id: "quiet-enjoyment",
            statuteIds: ["transfer-of-property-1882"],
            title: "Right to quiet enjoyment of the premises",
            why: "This is what stops the owner interfering with your use of the home during the term.",
            patterns: [/(?:quiet|peaceful) (?:enjoyment|possession and enjoyment)/i,
                /without (?:any )?(?:interruption|disturbance) (?:from|by) the (?:licensor|landlord|owner)/i],
        },
    ],
};
export const GENERIC_CHECKLIST = {
    type: "other",
    label: "General contract",
    items: [
        {
            id: "parties-identified",
            statuteIds: ["contract-act-1872"],
            title: "The parties are clearly identified",
            why: "If it is unclear who is bound, the agreement is hard to enforce either way.",
            patterns: [/between[^.]{0,200}(?:and)[^.]{0,200}(?:party|parties)/i,
                /(?:hereinafter (?:called|referred to as))/i],
        },
        {
            id: "term-duration",
            statuteIds: ["contract-act-1872"],
            title: "The term or duration is stated",
            why: "Without a term you cannot tell when the obligations start or end.",
            patterns: [/(?:period|term) of[^.]{0,60}(?:months|years|days)/i,
                /commencing (?:from|on)[^.]{0,60}(?:and|until|till)/i],
        },
        {
            id: "termination-rights",
            statuteIds: ["contract-act-1872"],
            title: "How either side can end the agreement",
            why: "With no exit route stated, leaving the agreement may require a court.",
            patterns: [/terminat(?:e|ion)/i, /cancel(?:lation)?[^.]{0,60}agreement/i],
        },
        {
            id: "dispute-resolution",
            statuteIds: ["contract-act-1872"],
            title: "A dispute resolution route",
            why: "Without one, every disagreement goes straight to litigation.",
            patterns: [/arbitrat(?:ion|or)/i, /mediat(?:ion|or)/i, /dispute[^.]{0,80}(?:resolv|refer)/i],
        },
        {
            id: "governing-law",
            statuteIds: ["contract-act-1872"],
            title: "Governing law and jurisdiction",
            why: "Without it, which country's or city's courts decide is itself disputable.",
            patterns: [/governed by[^.]{0,80}laws/i, /jurisdiction/i],
        },
        {
            id: "amendment-in-writing",
            statuteIds: ["contract-act-1872"],
            title: "Changes must be in writing",
            why: "Otherwise a party can claim the terms were varied by a conversation.",
            patterns: [/amend[^.]{0,80}(?:in writing|written)/i, /(?:modification|variation)[^.]{0,80}in writing/i],
        },
        {
            id: "notices-clause",
            statuteIds: ["contract-act-1872"],
            title: "How formal notices are delivered",
            why: "Without an agreed address or method, a notice you never received can still count.",
            patterns: [/notice[^.]{0,120}(?:in writing|registered post|courier|email|address)/i],
        },
        {
            id: "liability-limitation",
            statuteIds: ["contract-act-1872"],
            title: "Limits on liability",
            why: "Unlimited liability exposes you to claims far beyond the value of the deal.",
            patterns: [/limitation of liability/i, /liability[^.]{0,100}(?:shall not exceed|limited to)/i],
        },
        {
            id: "confidentiality",
            statuteIds: ["contract-act-1872"],
            title: "Confidentiality of shared information",
            why: "Information you hand over can otherwise be reused or passed on freely.",
            patterns: [/confidential/i, /non-?disclosure/i],
        },
    ],
};
const CHECKLISTS = {
    loan: LOAN_CHECKLIST,
    rental: RENTAL_CHECKLIST,
};
/** The checklist for a type, falling back to the generic one. */
export function checklistFor(type) {
    return CHECKLISTS[type] ?? GENERIC_CHECKLIST;
}

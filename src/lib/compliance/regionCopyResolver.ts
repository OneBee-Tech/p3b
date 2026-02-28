/**
 * PHASE 11: REGION-SPECIFIC COMPLIANCE COPY
 * 
 * Provides automated legal and compliance strings based on dynamic geolocation/regionCode.
 */

export interface ComplianceCopy {
    taxDeductibleStatement: string | null;
    invoiceFooter: string;
    regulatoryDisclaimer: string | null;
}

export function resolveComplianceCopy(regionCode: string | null): ComplianceCopy {
    const fallbackCopy: ComplianceCopy = {
        taxDeductibleStatement: null,
        invoiceFooter: "This is a record of your contribution.",
        regulatoryDisclaimer: null
    };

    if (!regionCode) return fallbackCopy;

    const code = regionCode.toUpperCase();

    switch (code) {
        case "US":
            return {
                taxDeductibleStatement: "Your contribution is tax-deductible to the extent allowed by law under IRC Section 501(c)(3).",
                invoiceFooter: "Official Tax Receipt - Please retain for your records.",
                regulatoryDisclaimer: null
            };
        case "CA":
            return {
                taxDeductibleStatement: null, // STRICT RULE: No tax deduction mention for CA
                invoiceFooter: "This is an official invoice for your transaction. Not a tax receipt.",
                regulatoryDisclaimer: "Registered under the Canada Not-for-profit Corporations Act."
            };
        case "IN":
            return {
                taxDeductibleStatement: "[PLACEHOLDER] Eligible for Section 80G deduction under the IT Act. (Pending enablement)",
                invoiceFooter: "Transaction Invoice / Receipt",
                regulatoryDisclaimer: "Regulated under FCRA for foreign contributions."
            };
        case "GB":
        case "UK":
            return {
                taxDeductibleStatement: "Gift Aid may be applicable to your donation. Please ensure your declaration is up to date.",
                invoiceFooter: "Official Contribution Receipt",
                regulatoryDisclaimer: "Registered with the Charity Commission."
            };
        default:
            return fallbackCopy;
    }
}

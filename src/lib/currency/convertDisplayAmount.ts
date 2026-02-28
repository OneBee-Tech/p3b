import { prisma } from "../prisma";
import { SupportedCurrency, SupportedLocale } from "@prisma/client";

/**
 * PHASE 11 - CURRENCY DISPLAY ABSTRACTION
 * 
 * Strict Governance Rules:
 * 1. Accepts ledger values in USD only
 * 2. Performs conversion strictly for UI rendering
 * 3. Never persists converted values in database
 * 4. Never overrides Donation, Sponsorship, or CSRImpactSnapshot amounts
 */
export async function convertDisplayAmount(amountUSD: number | any, targetCurrency: SupportedCurrency, locale: SupportedLocale = "EN"): Promise<string> {
    const numericAmount = typeof amountUSD === 'object' && amountUSD.toNumber ? amountUSD.toNumber() : Number(amountUSD);

    // 1. Base Currency Short-Circuit Format
    if (targetCurrency === "USD") {
        return new Intl.NumberFormat(getLocaleString(locale), { style: "currency", currency: "USD" }).format(numericAmount);
    }

    // 2. Fetch Latest Snapshot
    const snapshot = await (prisma as any).exchangeRateSnapshot.findFirst({
        where: {
            baseCurrency: "USD",
            targetCurrency: targetCurrency
        },
        orderBy: {
            capturedAt: "desc"
        }
    });

    // 3. Fallback to base USD on missing snapshot
    if (!snapshot) {
        console.warn(`[CURRENCY_TRANSLATOR] Missing snapshot for USD -> ${targetCurrency}. Falling back to USD display.`);
        return new Intl.NumberFormat(getLocaleString(locale), { style: "currency", currency: "USD" }).format(numericAmount);
    }

    // 4. Transform strictly for display scalar logic
    const convertedAmount = numericAmount * snapshot.rate;

    return new Intl.NumberFormat(getLocaleString(locale), { style: "currency", currency: targetCurrency }).format(convertedAmount);
}

function getLocaleString(locale: SupportedLocale): string {
    switch (locale) {
        case "FR": return "fr-FR";
        case "ES": return "es-ES";
        case "HI": return "hi-IN";
        case "EN":
        default: return "en-US";
    }
}

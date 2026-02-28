import { SupportedLocale } from "@prisma/client";

/**
 * PHASE 11: UI LOCALIZATION LAYER
 * 
 * Strict Canonical Rule:
 * English (EN) acts as the canonical source. All translation keys must exist in EN.
 */

export type UIMessages = {
    heroTitle: string;
    heroSubtitle: string;
    ctaSponsor: string;
    ctaCorporate: string;
    dashboardTitle: string;
    impactTitle: string;
    amountFunded: string;
    amountRemaining: string;
};

const EN_UI: UIMessages = {
    heroTitle: "Transform a Child's Future",
    heroSubtitle: "Join our global community of sponsors bringing education and hope to vulnerable children.",
    ctaSponsor: "Sponsor a Child",
    ctaCorporate: "Corporate Partnerships",
    dashboardTitle: "My Impact Dashboard",
    impactTitle: "Impact Stories",
    amountFunded: "Funded",
    amountRemaining: "Remaining to Goal"
};

const FR_UI: Partial<UIMessages> = {
    heroTitle: "Transformez l'Avenir d'un Enfant",
    heroSubtitle: "Rejoignez notre communauté mondiale de parrains apportant éducation et espoir aux enfants vulnérables.",
    ctaSponsor: "Parrainer un Enfant",
    dashboardTitle: "Mon Tableau de Bord d'Impact",
};

const ES_UI: Partial<UIMessages> = {
    heroTitle: "Transforma el Futuro de un Niño",
    ctaSponsor: "Apadrina a un Niño",
};

const HI_UI: Partial<UIMessages> = {
    heroTitle: "एक बच्चे का भविष्य बदलें",
    ctaSponsor: "एक बच्चे को प्रायोजित करें",
};

const LOCALES: Record<SupportedLocale, Partial<UIMessages>> = {
    EN: EN_UI,
    FR: FR_UI,
    ES: ES_UI,
    HI: HI_UI
};

export function t(key: keyof UIMessages, locale: SupportedLocale = "EN"): string {
    const localeDict = LOCALES[locale];

    // First try the requested locale
    if (localeDict && localeDict[key]) {
        return localeDict[key] as string;
    }

    // Fallback securely to Canonical EN
    return EN_UI[key] || key;
}

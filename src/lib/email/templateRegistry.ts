import { EmailEventType, SupportedLocale } from "@prisma/client";

export interface EmailTemplateDefinition {
    subject: (data: any) => string;
    html: (data: any) => string;
}

// ==========================================
// 1. FOOTER LOCALIZATION
// ==========================================
const FOOTER_LOCALES: Record<SupportedLocale, string> = {
    EN: `
<div style="margin-top: 20px; font-size: 12px; color: #666; text-align: center;">
    <p>This email complies with strict NGO safeguarding regulations.</p>
    <p>Please do not physically share sensitive child data on public social channels.</p>
</div>
`,
    FR: `
<div style="margin-top: 20px; font-size: 12px; color: #666; text-align: center;">
    <p>Cet email est conforme aux réglementations strictes de sauvegarde des ONG.</p>
    <p>Veuillez ne pas partager physiquement de données sensibles sur les enfants sur les réseaux sociaux publics.</p>
</div>
`,
    ES: `
<div style="margin-top: 20px; font-size: 12px; color: #666; text-align: center;">
    <p>Este correo cumple con las estrictas normativas de protección de ONG.</p>
    <p>Por favor, no comparta datos confidenciales de niños en redes sociales públicas.</p>
</div>
`,
    HI: `
<div style="margin-top: 20px; font-size: 12px; color: #666; text-align: center;">
    <p>यह ईमेल सख्त एनजीओ सुरक्षा नियमों का अनुपालन करता है।</p>
    <p>कृपया सार्वजनिक सामाजिक चैनलों पर बच्चे का संवेदनशील डेटा साझा न करें।</p>
</div>
`
};

export function getSafeguardingFooter(locale: SupportedLocale = "EN") {
    return FOOTER_LOCALES[locale] || FOOTER_LOCALES["EN"];
}

// ==========================================
// 2. TEMPLATE DEFINITIONS (EN = Canonical)
// ==========================================
const EN_TEMPLATES: Record<EmailEventType, EmailTemplateDefinition> = {
    REPORT_VERIFIED: {
        subject: (data) => `New Impact Update: ${data.childName}'s Progress`,
        html: (data) => `
            <h1>Impact Update: ${data.childName}</h1>
            <p>${data.narrative}</p>
        `
    },
    MILESTONE_LOGGED: {
        subject: (data) => `Celebration! ${data.childName} reached a milestone`,
        html: (data) => `
            <h1>Milestone Reached!</h1>
            <p>${data.childName} recently achieved: ${data.milestoneTitle}</p>
        `
    },
    RISK_SCORE_CHANGED: {
        subject: (data) => `Important Alert concerning ${data.childName}`,
        html: (data) => `
            <h1>Risk Alert</h1>
            <p>Our field team has logged a concern regarding ${data.childName}.</p>
        `
    },
    GRADUATED: {
        subject: (data) => `Incredible News! ${data.childName} has Graduated!`,
        html: (data) => `
            <h1>Graduation Announcement</h1>
            <p>Thanks to your support, ${data.childName} has completed the program!</p>
        `
    },
    SPONSOR_COOLING: {
        subject: () => `We miss you...`,
        html: () => `
            <h1>Are you still there?</h1>
            <p>Your support means everything. Let us know if you want to connect.</p>
        `
    },
    SPONSOR_CHURNED: {
        subject: () => `Thank you for your past support`,
        html: () => `
            <h1>Sponsorship Ended</h1>
            <p>Your sponsorship has been officially closed. The child will be re-allocated to the priority queue.</p>
        `
    },
    CORPORATE_RENEWAL_WINDOW: {
        subject: (data) => `CSR Renewal Window Open: ${data.organizationName}`,
        html: (data) => `
            <h1>Ready to Renew?</h1>
            <p>Your corporate sponsorship contract is approaching its 90-day renewal window.</p>
        `
    },
    CONTRACT_EXPIRY_WARNING: {
        subject: (data) => `Action Required: Contract Expiring in 60 Days`,
        html: (data) => `
            <h1>Contract Expiry Warning</h1>
            <p>Your corporate sponsorship allocation will expire soon. Please contact your account manager.</p>
        `
    },
    CSR_SNAPSHOT_READY: {
        subject: (data) => `Your Latest ESG Impact Report is Ready`,
        html: (data) => `
            <h1>ESG Impact Snapshot</h1>
            <p>Your new compliance report has been generated.</p>
            <p>Children Sponsored: ${data.childrenCount}</p>
            <a href="${data.reportUrl}">Download PDF</a>
        `
    }
};

type LocaleTranslations = Partial<Record<EmailEventType, EmailTemplateDefinition>>;

// Future locales safely extend the base logic
const FR_TEMPLATES: LocaleTranslations = {
    REPORT_VERIFIED: {
        subject: (data) => `Mise à jour d'impact : Progrès de ${data.childName}`,
        html: (data) => `
            <h1>Mise à jour d'impact : ${data.childName}</h1>
            <p>${data.narrative}</p>
        `
    }
};
const ES_TEMPLATES: LocaleTranslations = {};
const HI_TEMPLATES: LocaleTranslations = {};

const LOCALES: Record<SupportedLocale, LocaleTranslations> = {
    EN: EN_TEMPLATES,
    FR: FR_TEMPLATES,
    ES: ES_TEMPLATES,
    HI: HI_TEMPLATES
};

// ==========================================
// 3. REGISTRY RESOLVER
// ==========================================
export const TemplateRegistry = {
    getTemplate: (eventType: EmailEventType, locale: SupportedLocale = "EN") => {
        // Fallback sequentially to EN if template is missing in target locale
        const localeDict = LOCALES[locale] || LOCALES["EN"];
        const template = localeDict[eventType] || EN_TEMPLATES[eventType];

        const version = "v1.1-localized"; // Consistent versioning across locales

        return {
            version,
            subject: (data: any) => template.subject(data),
            html: (data: any) => {
                const bodyHtml = template.html(data);

                // REVIEW RULE: Safeguarding footer must be appended AFTER translation
                const footerHtml = getSafeguardingFooter(locale);
                return `${bodyHtml}\n${footerHtml}`;
            }
        };
    }
};

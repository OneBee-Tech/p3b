import { EmailEventType } from "@prisma/client";

export interface EmailTemplate {
    version: string;
    subject: (data: any) => string;
    html: (data: any) => string;
}

const TEMPLATE_FOOTER = `
<div style="margin-top: 20px; font-size: 12px; color: #666; text-align: center;">
    <p>This email complies with strict NGO safeguarding regulations.</p>
    <p>Please do not physically share sensitive child data on public social channels.</p>
</div>
`;

export const TemplateRegistry: Record<EmailEventType, EmailTemplate> = {
    REPORT_VERIFIED: {
        version: "v1.0",
        subject: (data) => `New Impact Update: ${data.childName}'s Progress`,
        html: (data) => `
            <h1>Impact Update: ${data.childName}</h1>
            <p>${data.narrative}</p>
            ${TEMPLATE_FOOTER}
        `
    },
    MILESTONE_LOGGED: {
        version: "v1.0",
        subject: (data) => `Celebration! ${data.childName} reached a milestone`,
        html: (data) => `
            <h1>Milestone Reached!</h1>
            <p>${data.childName} recently achieved: ${data.milestoneTitle}</p>
            ${TEMPLATE_FOOTER}
        `
    },
    RISK_SCORE_CHANGED: {
        version: "v1.0",
        subject: (data) => `Important Alert concerning ${data.childName}`,
        html: (data) => `
            <h1>Risk Alert</h1>
            <p>Our field team has logged a concern regarding ${data.childName}.</p>
            ${TEMPLATE_FOOTER}
        `
    },
    GRADUATED: {
        version: "v1.0",
        subject: (data) => `Incredible News! ${data.childName} has Graduated!`,
        html: (data) => `
            <h1>Graduation Announcement</h1>
            <p>Thanks to your support, ${data.childName} has completed the program!</p>
            ${TEMPLATE_FOOTER}
        `
    },
    SPONSOR_COOLING: {
        version: "v1.0",
        subject: () => `We miss you...`,
        html: () => `
            <h1>Are you still there?</h1>
            <p>Your support means everything. Let us know if you want to connect.</p>
            ${TEMPLATE_FOOTER}
        `
    },
    SPONSOR_CHURNED: {
        version: "v1.0",
        subject: () => `Thank you for your past support`,
        html: () => `
            <h1>Sponsorship Ended</h1>
            <p>Your sponsorship has been officially closed. The child will be re-allocated to the priority queue.</p>
            ${TEMPLATE_FOOTER}
        `
    },
    CORPORATE_RENEWAL_WINDOW: {
        version: "v1.0",
        subject: (data) => `CSR Renewal Window Open: ${data.organizationName}`,
        html: (data) => `
            <h1>Ready to Renew?</h1>
            <p>Your corporate sponsorship contract is approaching its 90-day renewal window.</p>
            ${TEMPLATE_FOOTER}
        `
    },
    CONTRACT_EXPIRY_WARNING: {
        version: "v1.0",
        subject: (data) => `Action Required: Contract Expiring in 60 Days`,
        html: (data) => `
            <h1>Contract Expiry Warning</h1>
            <p>Your corporate sponsorship allocation will expire soon. Please contact your account manager.</p>
            ${TEMPLATE_FOOTER}
        `
    },
    CSR_SNAPSHOT_READY: {
        version: "v1.0",
        subject: (data) => `Your Latest ESG Impact Report is Ready`,
        html: (data) => `
            <h1>ESG Impact Snapshot</h1>
            <p>Your new compliance report has been generated.</p>
            <p>Children Sponsored: ${data.childrenCount}</p>
            <a href="${data.reportUrl}">Download PDF</a>
            ${TEMPLATE_FOOTER}
        `
    }
}

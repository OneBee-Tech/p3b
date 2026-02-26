import prisma from "@/lib/prisma";
import Nodemailer from "nodemailer";

const emailHost = process.env.EMAIL_SERVER_HOST || "";
const emailPort = Number(process.env.EMAIL_SERVER_PORT) || 587;
const emailUser = process.env.EMAIL_SERVER_USER || "";
const emailPass = process.env.EMAIL_SERVER_PASSWORD || "";
const emailFrom = process.env.EMAIL_FROM || "OneDollarOneChild <noreply@onedollaronechild.org>";

const transport = Nodemailer.createTransport({
    host: emailHost,
    port: emailPort,
    auth: {
        user: emailUser,
        pass: emailPass,
    }
});

/**
 * Throttling Governance: Max 1 impact email per sponsor per 48 hours.
 */
async function canSendImpactEmail(donorId: string): Promise<boolean> {
    const donor = await prisma.user.findUnique({
        where: { id: donorId },
        select: { lastImpactEmailSentAt: true }
    });

    if (!donor || !donor.lastImpactEmailSentAt) return true;

    const hoursSinceLastEmail = (new Date().getTime() - donor.lastImpactEmailSentAt.getTime()) / (1000 * 60 * 60);
    return hoursSinceLastEmail >= 48;
}

async function markImpactEmailSent(donorId: string) {
    await prisma.user.update({
        where: { id: donorId },
        data: { lastImpactEmailSentAt: new Date() }
    });
}

/**
 * Sends an automated email to a donor using a rendered template
 */
async function dispatchEmail(to: string, subject: string, htmlHtml: string) {
    if (!emailHost) {
        console.log(`[Email Suppressed (No Host configured)] To: ${to} | Subject: ${subject}`);
        return;
    }
    try {
        await transport.sendMail({
            from: emailFrom,
            to,
            subject,
            html: htmlHtml
        });
        console.log(`[Email Dispatched] To: ${to} | Subject: ${subject}`);
    } catch (error) {
        console.error(`[Email Failed] To: ${to}`, error);
        throw error; // Rethrow for the queue to handle retries
    }
}

export const impactTemplates = {
    progressUpdate: (donorName: string, childName: string, aiSummary: string, attendance: string, dashboardUrl: string) => `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a202c;">
            <h2 style="color: #2b6cb0;">See the Difference You’re Making 💙</h2>
            <p>Dear ${donorName},</p>
            <p>We have a new progress update for <strong>${childName}</strong>!</p>
            <div style="background-color: #f7fafc; padding: 20px; border-left: 4px solid #d4af37; margin: 20px 0;">
                <p style="margin-top: 0; font-style: italic;">"${aiSummary}"</p>
                <p style="margin-bottom: 0; font-weight: bold; font-size: 14px; color: #4a5568;">Attendance Rate: ${attendance}</p>
            </div>
            <p>Thank you for continuing to be the foundation of their success.</p>
            <a href="${dashboardUrl}" style="display: inline-block; margin-top: 15px; padding: 12px 24px; background-color: #2b6cb0; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">View Full Impact Dashboard</a>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
            <p style="font-size: 10px; color: #a0aec0; text-transform: uppercase;">Shared under verified guardian consent and safeguarding review.</p>
        </div>
    `,

    milestoneCelebration: (donorName: string, childName: string, milestoneType: string, aiSummary: string, dashboardUrl: string) => `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a202c;">
            <h2 style="color: #d4af37;">A Child You Support Just Reached a Major Milestone 🎓</h2>
            <p>Dear ${donorName},</p>
            <p>It's a day to celebrate! <strong>${childName}</strong> recently achieved the milestone of: <strong>${milestoneType}</strong>.</p>
            <div style="background-color: #f7fafc; padding: 20px; border-left: 4px solid #2b6cb0; margin: 20px 0;">
                <p style="margin: 0; font-style: italic;">"${aiSummary}"</p>
            </div>
            <p>This is the direct result of your dedication to their future.</p>
            <a href="${dashboardUrl}" style="display: inline-block; margin-top: 15px; padding: 12px 24px; background-color: #d4af37; color: #1a202c; text-decoration: none; border-radius: 6px; font-weight: bold;">Celebrate on Your Dashboard</a>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
            <p style="font-size: 10px; color: #a0aec0; text-transform: uppercase;">Shared under verified guardian consent and safeguarding review.</p>
        </div>
    `,

    interventionAlert: (donorName: string, childName: string, aiSummary: string, attendance: string, dashboardUrl: string) => `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a202c;">
            <h2 style="color: #e53e3e;">Your Sponsored Child Needs Extra Support</h2>
            <p>Dear ${donorName},</p>
            <p>We are constantly monitoring the wellbeing and engagement of every child. Recently, our team noted that <strong>${childName}</strong> is facing some challenges.</p>
            <div style="background-color: #fffaf0; padding: 20px; border-left: 4px solid #e53e3e; margin: 20px 0;">
                <p style="margin-top: 0; font-style: italic;">"${aiSummary}"</p>
                <p style="margin-bottom: 0; font-weight: bold; font-size: 14px; color: #c53030;">Attendance Rate: ${attendance}</p>
            </div>
            <p>Our field team is actively intervening to provide the necessary support. Knowing you are standing by them means the world during harder times.</p>
            <a href="${dashboardUrl}" style="display: inline-block; margin-top: 15px; padding: 12px 24px; background-color: #2b6cb0; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">View Details securely</a>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
            <p style="font-size: 10px; color: #a0aec0; text-transform: uppercase;">Shared under verified guardian consent and safeguarding review.</p>
        </div>
    `
};

export async function sendProgressUpdateEmail(donorId: string, email: string, donorName: string, childName: string, aiSummary: string, attendance: string) {
    if (!(await canSendImpactEmail(donorId))) {
        console.log(`[Throttled] Skipping progress email for ${email} (Last email < 48h ago)`);
        return;
    }

    const html = impactTemplates.progressUpdate(donorName, childName, aiSummary, attendance, `${process.env.NEXTAUTH_URL}/dashboard`);
    await dispatchEmail(email, "See the Difference You’re Making 💙", html);
    await markImpactEmailSent(donorId);
}

export async function sendMilestoneCelebrationEmail(donorId: string, email: string, donorName: string, childName: string, milestoneType: string, aiSummary: string) {
    if (!(await canSendImpactEmail(donorId))) {
        console.log(`[Throttled] Skipping milestone email for ${email}(Last email < 48h ago)`);
        return;
    }

    const html = impactTemplates.milestoneCelebration(donorName, childName, milestoneType, aiSummary, `${process.env.NEXTAUTH_URL}/dashboard`);
    await dispatchEmail(email, "A Child You Support Just Reached a Major Milestone 🎓", html);
    await markImpactEmailSent(donorId);
}

export async function sendInterventionAlertEmail(donorId: string, email: string, donorName: string, childName: string, aiSummary: string, attendance: string) {
    // Note: Interventions might bypass the 48h throttle in a critical escalation, 
    // but enforcing throttle ensures we don't spam panicked donors.
    if (!(await canSendImpactEmail(donorId))) {
        console.log(`[Throttled] Skipping intervention email for ${email}(Last email < 48h ago)`);
        return;
    }

    const html = impactTemplates.interventionAlert(donorName, childName, aiSummary, attendance, `${process.env.NEXTAUTH_URL}/dashboard`);
    await dispatchEmail(email, "Your Sponsored Child Needs Extra Support", html);
    await markImpactEmailSent(donorId);
}

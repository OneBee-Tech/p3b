import prisma from "@/lib/prisma";
import { SponsorshipHealthStatus } from "@prisma/client";
import { emailTemplates } from "./emailTemplates";
import { calculateFundingStatus } from "./fundingEngine";
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
 * Sends an automated email to a donor using a rendered template
 */
async function dispatchEmail(to: string, subject: string, htmlHtml: string) {
    if (!emailHost) {
        console.log(`[Email Suppressed] To: ${to} | Subject: ${subject}`);
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
    }
}

/**
 * Handles a Sponsorship entering a PAST_DUE or FAILED state
 */
export async function triggerPaymentFailedAlert(sponsorshipId: string, reason: string = "Stripe payment failed") {
    const sponsorship = await prisma.sponsorshipAssignment.findUnique({
        where: { id: sponsorshipId },
        include: { donor: true, registryChild: true }
    });

    if (!sponsorship) return;

    // 1. Log the health status
    await prisma.sponsorshipHealthLog.create({
        data: {
            sponsorshipId: sponsorship.id,
            donorId: sponsorship.donorId,
            registryChildId: sponsorship.registryChildId,
            healthStatus: SponsorshipHealthStatus.PAYMENT_FAILED,
            reason
        }
    });

    // 2. Alert the donor (Grace Period)
    const html = emailTemplates.gracePeriodReminderEmail(sponsorship.donor.name || "Donor", sponsorship.registryChild.displayName);
    await dispatchEmail(sponsorship.donor.email, "Action Required: Payment Issue Detected", html);
}

/**
 * Handles a Sponsorship being explicitly canceled or ending
 */
export async function triggerSponsorshipEndedAlert(sponsorshipId: string, reason: string = "Subscription canceled") {
    const sponsorship = await prisma.sponsorshipAssignment.findUnique({
        where: { id: sponsorshipId },
        include: { donor: true, registryChild: true }
    });

    if (!sponsorship) return;

    // 1. Log the health status
    await prisma.sponsorshipHealthLog.create({
        data: {
            sponsorshipId: sponsorship.id,
            donorId: sponsorship.donorId,
            registryChildId: sponsorship.registryChildId,
            healthStatus: SponsorshipHealthStatus.ENDED,
            reason
        }
    });

    // 2. Evaluate if the child now has a critical funding gap
    const fundingData = await calculateFundingStatus(sponsorship.registryChildId);
    if (!fundingData.fullySponsored) {
        const priorityLevel = fundingData.activeSponsors === 0 ? "CRITICAL" : "HIGH";

        // Add to Priority Queue
        await prisma.sponsorshipPriorityQueue.create({
            data: {
                registryChildId: sponsorship.registryChildId,
                priorityLevel: priorityLevel,
                fundingGap: fundingData.remainingSlots
            }
        });

        // Trigger Tier 3 Escalation if critical, otherwise Tier 2
        if (priorityLevel === "CRITICAL") {
            const html = emailTemplates.criticalFundingAdminAlert(sponsorship.registryChild.displayName, fundingData.remainingSlots);
            await dispatchEmail("admin@onedollaronechild.org", "🚨 URGENT: Child Sponsorship Funding Gap Detected", html);
        } else {
            const html = emailTemplates.adminAlertCapacityRisk(sponsorship.registryChild.displayName, fundingData.remainingSlots);
            await dispatchEmail("admin@onedollaronechild.org", "🚨 Alert: Child Funding at Risk", html);
        }
    }

    // 3. Thank the donor for their past support
    const donorHtml = emailTemplates.sponsorshipEnded(sponsorship.donor.name || "Donor", sponsorship.registryChild.displayName);
    await dispatchEmail(sponsorship.donor.email, "Thank You for Your Impact", donorHtml);
}

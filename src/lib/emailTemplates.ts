export const emailTemplates = {
    paymentFailed: (donorName: string, childName: string) => `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Action Required: Sponsorship Payment Failed</h2>
            <p>Dear ${donorName},</p>
            <p>We encountered an issue processing your latest monthly sponsorship payment for ${childName}.</p>
            <p>To ensure continuous support for ${childName}'s education and welfare, please update your payment method.</p>
            <a href="${process.env.NEXTAUTH_URL}/dashboard" style="display: inline-block; padding: 10px 20px; background-color: #d4af37; color: #1a202c; text-decoration: none; border-radius: 5px; font-weight: bold;">Update Payment Details</a>
        </div>
    `,

    sponsorshipEnded: (donorName: string, childName: string) => `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Your Sponsorship has Ended</h2>
            <p>Dear ${donorName},</p>
            <p>We wanted to confirm that your sponsorship for ${childName} has officially ended.</p>
            <p>Thank you deeply for the profound impact you have made on their life. Your generosity has provided essential resources, education, and hope.</p>
            <p>If you'd like to sponsor another child or resume your support, you can do so from your dashboard at any time.</p>
            <a href="${process.env.NEXTAUTH_URL}/programs" style="display: inline-block; padding: 10px 20px; background-color: #2b6cb0; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Explore New Sponsorships</a>
        </div>
    `,

    sponsorshipRenewed: (donorName: string, childName: string) => `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Thank You for Renewing!</h2>
            <p>Dear ${donorName},</p>
            <p>Your continued sponsorship for ${childName} has been successfully processed.</p>
            <p>Consistency is the key to creating lasting change. Thank you for standing by ${childName} and ensuring their continuous access to education and support.</p>
            <p>Log in to your dashboard to see recent updates from the field.</p>
        </div>
    `,

    adminAlertCapacityRisk: (childName: string, remainingSlots: number) => `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>🚨 Administrative Alert: Child Funding at Risk</h2>
            <p>The system has detected a funding gap for <strong>${childName}</strong> due to recent sponsor churn or payment failure.</p>
            <p><strong>Remaining Slots Needed:</strong> ${remainingSlots}</p>
            <p>Please review the Sponsorship Health log in the Admin Panel to assess the situation and consider re-allocating emergency funds.</p>
            <a href="${process.env.NEXTAUTH_URL}/admin/sponsorship-health" style="display: inline-block; padding: 10px 20px; background-color: #e53e3e; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">View Health Dashboard</a>
        </div>
    `,

    gracePeriodReminderEmail: (donorName: string, childName: string) => `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Action Required: Payment Issue Detected</h2>
            <p>Dear ${donorName},</p>
            <p>We’re having trouble processing your sponsorship for ${childName}.</p>
            <p>To ensure their continuous support isn't interrupted, we have granted a 14-day grace period. Please update your payment details before the grace period expires.</p>
            <a href="${process.env.NEXTAUTH_URL}/dashboard" style="display: inline-block; padding: 10px 20px; background-color: #d4af37; color: #1a202c; text-decoration: none; border-radius: 5px; font-weight: bold;">Update Payment Details</a>
        </div>
    `,

    criticalFundingAdminAlert: (childName: string, remainingSlots: number) => `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>🚨 URGENT: Child Sponsorship Funding Gap Detected</h2>
            <p><strong>${childName}</strong> has lost their final active sponsor and is now in CRITICAL funding status.</p>
            <p><strong>Required Sponsors:</strong> ${remainingSlots}</p>
            <p>They have been automatically added to the Priority Sponsorship Reassignment Queue. Please take immediate operational action.</p>
            <a href="${process.env.NEXTAUTH_URL}/admin/sponsorship-health" style="display: inline-block; padding: 10px 20px; background-color: #e53e3e; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">View Priority Queue</a>
        </div>
    `
};

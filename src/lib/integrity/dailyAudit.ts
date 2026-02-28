import { prisma } from "../prisma";
import { logger } from "../logger";
import { dispatchEmailEvent } from "../email/emailEventBus";

/**
 * PHASE 12: DATA INTEGRITY CRON JOBS
 * 
 * REVIEW RULE: Read-Only Audit Enforcement
 * strictly read-only. It may log anomalies & dispatch admin alerts.
 * Must NOT mutate sponsorship records or ExchangeRateSnapshots.
 */

export async function runDailyAudit() {
    logger.info("[AUDIT] Starting Daily Ledger & Infrastructure Audit.");
    const anomalies: string[] = [];

    try {
        // 1. Check maxSponsors capacity limits (Total Active Donors + Corporate Slots > Max Sponsors)
        const children = await prisma.registryChild.findMany({
            include: {
                assignments: { where: { status: "ACTIVE" } },
                corporateAllocations: { where: { revokedAt: null } }
            }
        });

        for (const child of children) {
            const totalSponsors = child.assignments.length + child.corporateAllocations.length;
            if (totalSponsors > child.maxSponsors) {
                anomalies.push(`CAPACITY_BREACH: Child ${child.id} has ${totalSponsors} sponsors (Max: ${child.maxSponsors})`);
            }
        }

        // 2. Orphaned Corporate Allocations
        const orphanedAllocations = await prisma.corporateSponsorshipAllocation.findMany({
            where: {
                corporateSponsorId: null as any // Bypass strict typescript null coercion to query DB null states
            }
        });

        if (orphanedAllocations.length > 0) {
            anomalies.push(`ORPHANED_ALLOCATIONS: Found ${orphanedAllocations.length} allocations missing a CorporateSponsor link.`);
        }

        // 3. EmailLog records missing EventType (Audit trail break)
        // Checking for any eventType that doesn't match a valid known enum if possible,
        // or just logging any parsing failures natively. Prisma's ENUM type `EmailEventType`
        // inherently protects against `null` insertion at the DB level via `NOT NULL` constraints
        // We will execute a raw query to check for legacy mismatched rows.
        const brokenLogs: any[] = await prisma.$queryRaw`SELECT count(*) FROM "EmailLog" WHERE "eventType"::text IS NULL OR "eventType"::text = ''`;

        const count = Number(brokenLogs[0]?.count || 0);

        if (count > 0) {
            anomalies.push(`BROKEN_AUDIT_LOG: Found ${count} EmailLogs missing 'eventType'.`);
        }

        // 4. ExchangeRateSnapshot Gaps
        // Note: Using aggregate because `exchangeRateSnapshot` is an append-only ledger on `prisma.$queryRaw`
        const recentSnapshotRes: any[] = await prisma.$queryRaw`SELECT MAX("createdAt") as "latest" FROM "ExchangeRateSnapshot"`;
        const latestTime = recentSnapshotRes[0]?.latest;

        let hasGap = true;
        if (latestTime) {
            const timeDiff = Date.now() - new Date(latestTime).getTime();
            if (timeDiff < 48 * 60 * 60 * 1000) {
                hasGap = false;
            }
        }

        if (hasGap) {
            anomalies.push(`STALE_EXCHANGE_RATES: No ExchangeRateSnapshot found within the last 48 hours.`);
        }

        // Conclusion
        if (anomalies.length > 0) {
            logger.fatal({ anomalies }, "[AUDIT_FAILED] Critical ledger/schema discrepancies found.");

            // Dispatch Alert to System Admin
            const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
            if (admin) {
                await dispatchEmailEvent({
                    eventType: "RISK_SCORE_CHANGED", // Repurposing critical alerts template
                    recipientId: admin.id,
                    recipientType: "ADMIN",
                    entityId: "DAILY_AUDIT",
                    data: {
                        childName: "SYSTEM AUDIT",
                        narrative: `Daily Audit found anomalies: \n${anomalies.join("\n")}`,
                        oldScore: "PASS",
                        newScore: "FAIL"
                    },
                    isCritical: true
                });
            }
        } else {
            logger.info("[AUDIT_PASS] All 4 daily audit checks passed cleanly.");
        }

    } catch (error: any) {
        logger.error({ error: error.message }, "[AUDIT_CRASH] Failed to complete daily audit.");
    }
}

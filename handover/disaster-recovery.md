# Disaster Recovery (DR) & Backup Policy

This document defines the structural parameters, measurable objectives, and response mechanics guaranteeing data survival and continuation of operations against critical failure scenarios.

---

## 1. Measured Recovery Objectives

*   **Recovery Time Objective (RTO):** `< 4 hours`
    *   *The maximum acceptable window of downtime for Severity 1 incidents before critical platform routing must be restored via failover or snapshot deployment.*
*   **Recovery Point Objective (RPO):** `< 24 hours`
    *   *The maximum acceptable threshold for historical transaction/data loss. Aligned with daily automated database snapshots ensuring ledgers remain physically reconstructible.*

**These objectives are documented and aligned with NGO leadership to ensure technical recovery capability perfectly mirrors operational expectations.**

---

## 2. Backup Strategy

Data persistence is structurally reliant on Neon's highly-available, distributed PostgreSQL architecture.

*   **Frequency:** Automated Continuous Archiving (WAL) combined with Daily Synthesized Snapshots.
*   **Retention Limit:** Minimum **14-day** continuous point-in-time recovery retention. 
*   **Security & Encryption:** Every persistent volume and all object storage backups are completely **Encrypted at Rest (AES-256)** adhering to strict compliance thresholds.
*   **Isolation:** Backups are physically isolated into separate regional availability zones from the primary read/write compute endpoint.

---

## 3. Step-by-Step Restore Procedure

In the event of Severity 1 Ledger Corruption or Production Data Loss:

1.  **Identify Snapshot:** 
    *   Navigate to the Neon Administrative Console.
    *   Analyze the timeline branch prior to the exact inflection point of the disruptive event.
2.  **Restore into Staging (Branching):**
    *   Initialize a new historical branch natively within Neon derived from the clean timestamp identifier.
    *   Connect the Staging App deployment temporary `DATABASE_URL` to this historical branch.
3.  **Validate Schema & Integrity:**
    *   An Administrator must verify the staging branch via the `/admin/system-queue` and CSR reports to validate transaction lineage.
    *   Run the read-only `dailyAudit.ts` cron manually.
4.  **Swap Production Endpoint (The Failover):**
    *   Upon validation, merge the branch as the primary or seamlessly deploy the updated `DATABASE_URL` against Vercel’s Production environment variables.

---

## 4. Quarterly Restore Drill Mandate

To ensure the preceding strategy is functionally operational rather than purely theoretical, **System Administrators MUST execute a comprehensive Staging-environment Restore Test quarterly (Every 3 months)**.

*   Every drill must document success or failure states.
*   The exact **Time-to-Recovery (TTR)** must be recorded to validate whether the `< 4 hour` RTO objective remains mathematically viable under stress conditions.

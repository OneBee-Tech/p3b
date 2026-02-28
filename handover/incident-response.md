# Incident Response Protocol

This document outlines the standardized escalation matrix, defining exactly how system failures are identified, triaged, communicated, and mitigated based on standardized Severity tiers.

---

## Severity 1: Critical

A catastrophic interruption causing widespread instability, explicit financial blockages, or risking child safety protocols.

*   **Examples:** Complete Production downtime, core Ledger mapping corruption, massive payment processing failure.
*   **Safeguarding Priority Escalation (Critical Override):** Sev-1 must be explicitly triggered for **ANY suspected safeguarding breach**, exposure of child-sensitive data, unauthorized access to `RegistryChild` confidential records, or a public leak of isolated `caseNotes`.
*   **Response Time SLA:** **Immediate** (On-Call Drop-Everything Policy).
*   **Mitigation:** 
    1.  Immediately trigger Admin notifications encompassing the Escalation Contact path.
    2.  Suspend BullMQ Background Queue execution via the `Bull Board` entirely (`/admin/system-queue`).
    3.  Engage System-Wide audit log exports via `EmailLog` constraints.
    4.  Enable Vercel Maintenance mode if the vulnerability exposes external vectors.

---

## Severity 2: Major

A localized interruption dramatically crippling specific automated workflows without completely destroying the core checkout or browsing capability.

*   **Examples:** The BullMQ Queue backlog exceeds `> 1000` jobs pending, Email Provider (SMTP) cascade failures causing bounce suppressions, or Redis becoming completely unreachable.
*   **Response Time SLA:** **2 - 4 hours**
*   **Mitigation:**
    1.  Inspect `/admin/system-queue` for failing jobs.
    2.  Check for upstream service outages (e.g., Upstash status, Mailgun status).
    3.  Execute a targeted manual Dead Letter Queue (DLQ) retry payload once connectivity is restored.

---

## Severity 3: Minor

Non-critical application defects, intermittent graphical glitches, or isolated background job failures functioning as designed within the DLQ.

*   **Examples:** Admin UI mapping error in `/admin/corporate`, a single non-critical job timeout, or intermittent rendering bugs inside PDF Impact generation.
*   **Response Time SLA:** **< 24 hours** (Standard business hours execution).
*   **Mitigation:** Document trace from Sentry error logging and add to sprint backlog repository for non-urgent patches.

---

## Disabling Background Queues Safely

If queues begin entering runaway loops triggering external provider API Limits (e.g., Email quotas):

1.  Log into the Administrator environment mapping exactly to `Session => "ADMIN"`.
2.  Navigate to `/admin/system-queue`.
3.  Click `Pause` directly on the offending `emailQueue` or `csrReportQueue`. 
4.  Data will securely accumulate inside Redis without attempting processing dispatches until a patching release is executed. 

## Maintenance Mode Enablement

In extreme Sev-1 scenarios requiring complete halting of traffic (e.g., a data corruption vector):
*   Change the active Vercel Deployment via the Vercel Dashboard to trigger an explicit Edge Network-level Maintenance splash page intercepting all inbound requests before NextAuth renders.

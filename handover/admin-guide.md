# Administrator Operational Guide

This document is written for non-technical platform Administrators. It covers the core daily operational workflows required to manage the Sponsorship System.

---

## 1. Onboarding a Child

1.  Navigate to **Admin Panel > Programs (`/admin/programs`)**.
2.  Click **Add New Child**.
3.  Fill in the required biographical and geographical details.
4.  Set the **Max Sponsors** capacity. This acts as a physical ceiling preventing over-funding.
5.  Set the **Privacy Mode**:
    *   **PUBLIC:** Full visibility to all visitors.
    *   **SPONSOR_ONLY:** Only active sponsors can see updates.
    *   **HIGH:** Total geographical redaction; safeguarding mode.

## 2. Verifying Progress Reports

1.  Navigate to **Admin Panel > Milestones (`/admin/milestones`)**.
2.  Review incoming field updates submitted by regional coordinators.
3.  Inspect the uploaded image and case notes for safeguarding compliance.
4.  Click **Approve**.
    *   *Note: Approving a report automatically dispatches asynchronous emails to all active sponsors attached to that child.*

## 3. Onboarding a Corporate Sponsor

1.  Navigate to **Admin Panel > Corporate CSR (`/admin/corporate`)**.
2.  Click **Onboard Institution**.
3.  Assign the **Funding Model** (`SLOT_BASED` for a fixed number of children, `POOL_BASED` for dynamic ledger tracking).
4.  Input the physical **Contract Start / End Dates**.

## 4. Allocating Corporate Funding

1.  Navigate to a specific **Corporate Profile** within the admin portal.
2.  Click **Manage Allocations**.
3.  Select children from the available pool lacking individual sponsorship.
4.  Allocate them to the corporation.
    *   *Note: This dynamically updates the child's filled capacity metrics system-wide.*

## 5. Generating Corporate ESG Reports

1.  Navigate to **Corporate CSR > Generate Reports`.
2.  Select the **Snapshot Generation** action.
3.  This compiles an immutable PDF containing demographic breakdowns, geographical impacts, and localized currency mappings for the corporation's ESG audit. A copy is stored securely, and a link is emailed to the corporate contact.

## 6. Monitoring the System Queue

1.  Navigate to **Admin Panel > System Queue (`/admin/system-queue`)**.
2.  This interface (Bull Board) tracks all background actions (Emails, PDF Generations).
3.  If an item fails multiple times, it will fall into `Failed`. You can inspect the error message and click **Retry** once the underlying issue (e.g., SMTP down) is resolved.

## 7. Interpreting the Health Endpoint

1.  Visit `YOUR_DOMAIN/api/health` in your browser.
2.  A healthy system strictly returns `{"db":"connected","redis":"connected","queue":"active","version":"x.x.x"}`.
3.  If any service says `"degraded"`, refer to the **Incident Response Protocol** immediately.

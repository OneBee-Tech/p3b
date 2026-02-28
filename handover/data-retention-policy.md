# Data Retention & Privacy Lifecycle

This policy governs the lifespan of sensitive financial metrics, corporate tracking footprints, and Regional Child safeguarding data existing within the application database.

---

## 1. Immutable Ledger Retention

The core foundational architecture guarantees the absolute protection of historical allocations for Corporate ESG Reporting and Individual tax deductions.

*   **No Hard Deletions:** Hard deletion of financial, sponsorship, or CSR snapshot records is **STRICTLY PROHIBITED**. 
*   **Soft Deletion Mandate:** Any object demanding removal for UX reasons must only be removed via soft-deletions (e.g., updating a `revokedAt` timestamp).
*   **Permanent Architectures:** 
    *   `ExchangeRateSnapshot` structures are permanent, append-only records guaranteeing legacy currency conversions are accurately verifiable.
    *   `CSRImpactSnapshot` objects are permanently locked immutable records bound to their generation parameters.

## 2. Audit & Traffic Retention

*   **Email Logistics:** `EmailLog` records track the metadata (recipient, event type, delivery status) of automated system blasts. These records MUST be retained for a **minimum of 12 rolling months** before any archiving pruning runs may be safely executed to appease external compliance investigations.
*   **Progress Report Archival:** `ProgressReport` entities, including subjective `caseNotes`, must be permanently archived historically traversing the lifespan of the `RegistryChild`. Cloudinary image UUID pointers mapping to historic update logs remain locked.

## 3. Privacy Masking & User Pruning

*   **Safeguarding Scrubbing:** When a `RegistryChild` attains adulthood or rotates out of the core NGO platform, their detailed `caseNotes`, exact `longitude/latitude` geometries, and comprehensive medical `wellbeing` dictionaries must be obfuscated. Aggregated statistical data (e.g., their region and gender) will persist anonymously within `analyticsTracker.ts` to power internal CSR retention maps.
*   **User Action Reversal (Compliance Right-to-be-Forgotten):** A Sponsor or Donor requesting full data deletion under GDPR/Compliance laws will inherently trigger a soft-deletion flow. Their canonical identity references (`User.name`, `User.email`) are hashed or explicitly anonymized, but any structural financial ties (e.g., a processed `Donation` ledger mapping their `stripeCustomerId`) must remain cryptographically linked to appease external accounting regulations.

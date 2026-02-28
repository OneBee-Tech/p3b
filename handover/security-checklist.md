# Security Hardening Checklist

This document serves as the absolute baseline security standard for the platform. Any pull request merging into `main` MUST adhere to these architectural mandates.

---

## 1. Application Layer (Next.js)

*   [x] **Strict RBAC Enforcement:** All `/admin/*` routes must enforce NextAuth server-side session validation ensuring `role === "ADMIN"`. Client-side hiding is insufficient.
*   [x] **Corporate Portal Isolation:** The `/corporate-portal` must derive identity *exclusively* from the secure HTTP-Only session token (`CorporateSponsor.id`). URL-based routing assumptions (e.g., `?sponsorId=123`) are strictly banned.
*   [x] **Safeguarding Privacy Modes:** The `PrivacyMode` enum (`PUBLIC`, `SPONSOR_ONLY`, `HIGH`) must be logically enforced on all public child query arrays. `HIGH` mode children must permanently redact exact geographical strings and full surnames.

---

## 2. Database Layer (Neon / PostgreSQL)

*   [x] **Parameterized Queries Only:** Standard Prisma Client functions inherently protect against SQL Injection. If `$queryRaw` is ever utilized, it **MUST** use tagged template literals interpolation. Raw string concatenation is a fireable security offense.
*   [x] **Read-Only Cron Parades:** Background automated surveillance scripts (e.g., `dailyAudit.ts`) must never execute DML Write operations (INSERT/UPDATE/DELETE). They exist solely to introspect and dispatch alerts.

---

## 3. Queue Layer (Redis / BullMQ)

*   [x] **Deterministic Deduplication:** All queue jobs triggered by user events must calculate a deterministic `jobId` before enqueueing. This mathematically prevents double-billing, double-emailing, and queue flooding attacks.
*   [x] **DLQ Enforcement:** Jobs must structurally degrade to the Dead Letter Queue upon total failure. Silent catch blocks destroying jobs are banned.
*   [x] **Admin Tooling Isolation:** The Bull Board queue inspection UI (`/admin/system-queue`) must be mounted behind the primary NextAuth Admin Guard.

---

## 4. Logging & Observability (Sentry / Pino)

*   [x] **PII Redaction Engine:** The `logger.ts` instance must explicitly shred highly-sensitive keys (`password`, `stripeCustomerId`, `token`) before serializing output to the console or ingestor.
*   [x] **Safeguarding Notes Omission:** `caseNotes` or `wellbeing` checkups belonging to `RegistryChild` models must NEVER be logged to `console.info` or sent as literal strings to Sentry error boundaries.
*   [x] **Write-Only Immutable Trails:** The Prisma `EmailLog` model must never expose an `UPDATE` API route. Once an event is fired, its metadata is permanent.

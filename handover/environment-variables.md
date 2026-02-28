# Environment & Secret Governance

## 1. Secret Governance Policies

### 🚫 Version Control Ban
**Secrets MUST NEVER be committed to Git.**
*   The repository tracks a safe `.env.example` containing structural names without physical keys.
*   If a `.env` file is accidentally pushed, all exposed tokens must be immediately revoked and rotated, treating the incident as a **Severity 1** security breach.

### 🔄 Rotation Mandate
**All external credential keys should be rotated every 6-12 months.**
*   This explicitly includes: Neon DB Connection Strings, Redis Auth Tokens, and SMTP Passwords.

### 🔑 MFA Production Access
*   **Hosting Dashboards (Vercel, Neon, Stripe):** Administrator access must enforce Mandatory Multi-Factor Authentication (MFA).
*   **Direct Database Access:** Production databases must never be queried directly via local GUI tools without a verified audit reason (e.g., Sev-1 incident recovery). Read-only replicas or logging endpoints should be utilized for general metrics.

---

## 2. Required Production Environment Variables

### Core Configuration
These values define the internal heartbeat and identity boundaries of the application.

*   `DATABASE_URL`: Connection String mapping to the secured PostgreSQL instance (Neon). Used exclusively by Prisma.
*   `NEXTAUTH_SECRET`: Hardened cryptographically secure randomized string (e.g., generated via `openssl rand -base64 32`). Used to sign User sessions.
*   `NEXTAUTH_URL`: The fully qualified canonical domain in production (e.g., `https://ngo-portal.example.org`). Used to securely construct callback and redirect paths.

### Queue & Infrastructure
*   `REDIS_URL`: Connection string mapping to the Upstash or dedicated Redis instance driving the BullMQ background workers.

### Financial Isolation (Stripe)
*   *NOTE: Test keys (`pk_test_`, `sk_test_`) must be physically isolated from Production keys (`pk_live_`, `sk_live_`).*
*   `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Safe-to-expose public string for rendering hosted checkout elements.
*   `STRIPE_SECRET_KEY`: Extreme-sensitivity token allowing programmatic access to charge ledgers.
*   `STRIPE_WEBHOOK_SECRET`: Used to cryptographically hash and verify the origin of PaymentIntent webhooks avoiding payload tampering. (Prefix: `whsec_`)

### Outbound Transport (Email)
*   `SMTP_HOST`: TLD of the mail provider (e.g., `smtp.mailgun.org`).
*   `SMTP_PORT`: Secure port transmission (e.g., `465` or `587`).
*   `SMTP_USER`: Restricted mailer service account identifier.
*   `SMTP_PASS`: Dedicated application password restricting access strictly to the outbound SMTP gateway.

### Global Observability
*   `SENTRY_DSN`: The Data Source Name endpoint bridging the Next.js runtime logs directly to the Sentry project dashboard. Not inherently highly sensitive, but required for crash tracking.

### Blob Storage
*   `CLOUDINARY_URL` / **AWS Dependencies**: API keys ensuring authenticated CRUD operations against the attached immutable object storage cluster for Narrative media or CSR PDFs.

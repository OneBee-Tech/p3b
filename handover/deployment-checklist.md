# Production Deploy Pre-Flight Checklist

This checklist acts as a definitive gateway preventing broken logic from reaching the production donor base. **It must be fully completed by the deploying Administrator prior to pushing branch code to `main`.**

---

### Step 1: Environment Integrity Validation
- [ ] Has the Vercel Production Environment been inspected against `handover/environment-variables.md` to ensure no new variables are missing?
- [ ] Have test-mode Stripe keys (`sk_test_`) been explicitly isolated from the live payload (`sk_live_`)?

### Step 2: Queue & Broker Verification
- [ ] Is the Neon Postgres Production Database active and scaling within CPU bounds?
- [ ] Is the Upstash Redis instance active and accepting connections?

### Step 3: Deployment & Build Checks
- [ ] Did `npm run build` succeed locally with zero `tsc` compiler Type Errors?
- [ ] Is the deployment occurring during an approved operational window? *(Never Friday afternoons or immediately pre-holiday unless Sev-1)*.

### Step 4: Post-Deploy Live Validation
- [ ] Has at least one Admin loaded the production `/api/health` endpoint successfully receiving a `200 OK`?
- [ ] Has a live $1.00 USD `Donation` been successfully processed on production, verifying Stripe Webhook decryption arrays?
- [ ] Does the `Sentry` dashboard show clean initialization without immediate panic loops?
- [ ] Are background jobs actively moving through `/admin/system-queue` dynamically (no stuck `Pending` metrics)?
- [ ] Has the Operational Ownership team signed off in the release channel?

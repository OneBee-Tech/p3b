This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# p3b
---

## 🛡️ Production Operations & SLA

### Backup & Recovery Policy
As a financial NGO platform handling Corporate ESG and Individual Sponsorship allocations, stringent data integrity protocols are enforced:

- **Automated Snapshots**: Daily Database backups are automated via Neon Postgres.
- **Retention**: Minimum 14-day continuous point-in-time recovery retention.
- **Security**: All persistent disks and object storage buckets are Encrypted at Rest (AES-256).
- **Drill Contingency**: System Administrators MUST execute and document a comprehensive Staging-environment Restore Test quarterly.

### Versioning & Release Governance
To ensure platform stability and audit compliance:

- **Semantic Versioning:** The project adheres to strict Semantic Versioning (`vMAJOR.MINOR.PATCH`).
- **Changelog Mandate:** No hotfixes or patches, regardless of size, may be deployed without updating the centralized Release Changelog.
- **Schema Traceability:** Any modifications to `prisma/schema.prisma` must be heavily documented to preserve financial isolation guarantees.
- **Deployment Discipline:** Production deployments must **NOT** occur on Fridays or immediately prior to public holidays unless reacting to a Severity-1 emergency. All deployments must pass the `handover/deployment-checklist.md` validation, requiring explicit post-deployment sign-off from at least one Administrator.

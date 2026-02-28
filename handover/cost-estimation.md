# Operational Cost Estimation

This document provides complete financial transparency for the recurring infrastructure costs associated with maintaining the Corporate & Individual Sponsorship platform.

*Estimates are calculated based on moderate continuous traffic scaling towards ~10,000 active sponsors.*

---

## Monthly Architecture Run-Rate

| Component | Provider | Tier / Configuration | Estimated Monthly Cost (₹) |
| :--- | :--- | :--- | :--- |
| **App Hosting** | **Vercel** | Pro Plan (Serverless Functions + Edge Middleware execution, Bandwidth pooling) | **₹4,000 – ₹8,000** |
| **Database** | **Neon** | Scale Plan (PostgreSQL, Automated Branching, Active compute scaling up to 4CUs) | **₹2,000 – ₹5,000** |
| **Background Queues** | **Upstash** | Pay-as-you-go / Standard Redis (Moderate throughput, 10M commands/mo) | **₹1,000 – ₹3,000** |
| **Email Transport** | **Mailgun / SendGrid** | Essential Tier (50k - 100k automated dispatches/mo + Dedicated IP pooling) | **₹1,000 – ₹5,000** |
| **Error Monitoring** | **Sentry** | Team Tier (Log retention, Replay sessions, Crash monitoring) | **₹0 – ₹3,000** *(Generous free tier initially)* |
| **Blob Storage** | **Cloudinary / S3** | Standard Storage (Child imagery + Generated PDF persistence) | **₹500 – ₹2,000** |

---

## 💰 Total Realistic Estimate
**₹8,500 – ₹26,000 per month**

*Note: Cost volatility is primarily driven by active Network Egress (Vercel bandwidth) and massive asynchronous mail dispatches during end-of-quarter Corporate ESG Reporting generation windows.*

import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { logger } from "@/lib/logger";

// Simple in-memory rate limiter per IP
// (For production scale, move this to Upstash Redis alongside BullMQ)
const rateLimitMap = new Map<string, { count: number, resetAt: number }>();
const MAX_REQUESTS = 5;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, consent, _gotcha } = body;

        // 1. Honeypot Check (Anti-Bot)
        if (_gotcha) {
            logger.warn({ msg: "Bot honeypot triggered on newsletter sign up" });
            // Return success to fake out the bot
            return NextResponse.json({ success: true }, { status: 200 });
        }

        // 2. IP Rate Limiting Extraction
        const headersList = await headers();
        const forwarded = headersList.get("x-forwarded-for");
        const ip = forwarded ? forwarded.split(',')[0] : "unknown_ip";
        // Anonymize IP before logging per GDPR/Privacy rules
        const maskedIp = ip !== "unknown_ip" ? ip.replace(/\.\d+$/, '.xxx') : "unknown_ip";

        // 3. Apply Rate Limits
        const now = Date.now();
        const record = rateLimitMap.get(ip);
        if (record && record.resetAt > now) {
            if (record.count >= MAX_REQUESTS) {
                logger.warn({ msg: "Newsletter rate limit exceeded", ip: maskedIp });
                return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
            }
            record.count += 1;
        } else {
            rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
        }

        // 4. Basic Validation
        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
        }

        if (!consent) {
            return NextResponse.json({ error: "Consent is legally required to subscribe." }, { status: 400 });
        }

        // 5. Audit Trace Logging (Without logging raw Emails per rules)
        logger.info({
            msg: "Newsletter Subscription Request",
            event: "NEWSLETTER_OPT_IN",
            consentGiven: true,
            maskedIp,
            domain: email.split('@')[1] // Log only the domain to avoid PII leak
        });

        // 6. External Dispatcher Stub
        // Integration point for Brevo/Mailchimp
        if (process.env.MAILCHIMP_API_KEY || process.env.BREVO_API_KEY) {
            // e.g., await fetch(`https://api.mailchimp.com/...`)
            logger.info("External CRM webhook explicitly skipped in this implementation phase per requirements. Passed validation.");
        }

        return NextResponse.json({ success: true, message: "Subscription received" }, { status: 200 });
    } catch (error: unknown) {
        const errorMsg = error instanceof Error ? error.message : "Unknown error";
        logger.error({ msg: "Newsletter Signup Failed", error: errorMsg });
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

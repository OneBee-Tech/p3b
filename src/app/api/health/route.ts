import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { redisConnection } from "@/lib/queue/queueClient";

/**
 * PHASE 12: HEALTH ENDPOINT
 * 
 * REVIEW RULE: Health Check Timeout Governance
 * - Must fail gracefully if checking > 2s
 * - Must return degraded status rather than hanging
 * - Lightweight & non-blocking
 */

export async function GET() {
    const status: any = {
        db: "unknown",
        redis: "unknown",
        queue: "active", // Based on bullmq architecture, if redis is up, queues are up
        version: "1.0.0"
    };

    let statusCode = 200;

    const timeoutPromise = (ms: number) => new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), ms));

    // 1. Check PostgreSQL (Prisma)
    try {
        await Promise.race([
            prisma.$executeRaw`SELECT 1`,
            timeoutPromise(2000)
        ]);
        status.db = "connected";
    } catch (error) {
        status.db = "degraded";
        statusCode = 503;
    }

    // 2. Check Redis (BullMQ Backend)
    try {
        await Promise.race([
            redisConnection.ping(),
            timeoutPromise(2000)
        ]);
        status.redis = "connected";
    } catch (error) {
        status.redis = "degraded";
        status.queue = "degraded";
        statusCode = 503;
    }

    return NextResponse.json(status, { status: statusCode });
}

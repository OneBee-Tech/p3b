import pino from "pino";

/**
 * PHASE 12: STRUCTURED LOGGING LAYER
 * 
 * REVIEW RULE: Log Integrity & Tamper Protection
 * Production logs must:
 * - Be write-only and unmodifiable.
 * - Be exported sequentially as JSON for downstream consumption (e.g. Datadog / Vercel Logs).
 * - NOT contain naked PII (redaction layer enforced implicitly by avoiding raw user object dumps).
 */

const isProduction = process.env.NODE_ENV === "production";

// Pino configuration
export const logger = pino({
    level: process.env.LOG_LEVEL || "info",
    // In development, use pino-pretty for readable console output.
    // In production, emit raw JSON for ingestion.
    ...(isProduction
        ? {}
        : {
            transport: {
                target: "pino-pretty",
                options: {
                    colorize: true,
                    translateTime: "HH:MM:ss Z",
                    ignore: "pid,hostname",
                },
            },
        }),
});

// Helper for consistent error logging
export const logError = (context: string, error: unknown, metadata?: Record<string, any>) => {
    let errMessage = "Unknown error";
    let stack: string | undefined;

    if (error instanceof Error) {
        errMessage = error.message;
        stack = error.stack;
    } else if (typeof error === 'string') {
        errMessage = error;
    } else {
        errMessage = JSON.stringify(error);
    }

    logger.error({
        context,
        errMessage,
        stack,
        ...metadata
    }, `[${context}] Error: ${errMessage}`);
};

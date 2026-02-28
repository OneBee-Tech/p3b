import { prisma } from "../prisma";
import { EmailEventType, RecipientType } from "@prisma/client";
import { emailQueue } from "../queue/queueClient";
import { logger } from "../logger";

export interface BatchInstruction {
    eventType: EmailEventType;
    recipientType: RecipientType;
    recipients: { recipientId: string, entityId: string, data: any }[];
    isCritical?: boolean;
}

export async function processEmailBatch(instruction: BatchInstruction) {
    const { recipients, eventType, recipientType, isCritical } = instruction;

    // 1. Backpressure Protection
    // Check pending queue length before ingestion
    const pendingCount = await prisma.emailLog.count({
        where: { deliveryStatus: "PENDING" }
    });

    if (pendingCount > 500) {
        logger.error({ pendingCount, eventType }, `[BATCH_PROCESSOR] Backpressure active. Pausing ingestion.`);
        // Phase 12: In a real system, ops would be alerted via DLQ/Sentry
        return false;
    }

    // 2. Batch Chunking (Max 50 per execution cycle)
    const CHUNK_SIZE = 50;
    const chunks = [];

    for (let i = 0; i < recipients.length; i += CHUNK_SIZE) {
        chunks.push(recipients.slice(i, i + CHUNK_SIZE));
    }

    logger.info({ total: recipients.length, chunks: chunks.length, eventType }, `[BATCH_PROCESSOR] Ingesting emails into BullMQ.`);

    for (const [index, chunk] of chunks.entries()) {
        const jobs = chunk.map(r => {
            const eventId = `${eventType}-${r.recipientId}-${r.entityId}`;
            return {
                name: `BatchEmail-${eventId}`,
                data: {
                    eventType,
                    recipientId: r.recipientId,
                    recipientType,
                    entityId: r.entityId,
                    data: r.data,
                    isCritical
                },
                opts: {
                    jobId: eventId // Base Deduplication
                }
            };
        });

        // Add chunk to Redis in massive parallel bulk transaction
        await emailQueue.addBulk(jobs);

        // 3. Optional buffer between chunks during ingestion
        if (index < chunks.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    logger.info({ eventType }, `[BATCH_PROCESSOR] Finished bulk enqueueing.`);
    return true;
}

import { prisma } from "../prisma";
import { EmailEventType, RecipientType } from "@prisma/client";
import { dispatchEmailEvent } from "./emailEventBus";

export interface BatchInstruction {
    eventType: EmailEventType;
    recipientType: RecipientType;
    recipients: { recipientId: string, entityId: string, data: any }[];
    isCritical?: boolean;
}

export async function processEmailBatch(instruction: BatchInstruction) {
    // 1. Backpressure Protection
    // Check pending queue length before ingestion
    const pendingCount = await prisma.emailLog.count({
        where: { deliveryStatus: "PENDING" }
    });

    if (pendingCount > 500) {
        console.error(`[BATCH_PROCESSOR] Backpressure active. ${pendingCount} emails pending. Pausing ingestion for batch ${instruction.eventType}.`);
        // In a real system we'd use a dead letter queue or notify ops.
        return false;
    }

    const { recipients, eventType, recipientType, isCritical } = instruction;

    // 2. Batch Chunking (Max 50 per execution cycle)
    const CHUNK_SIZE = 50;
    const chunks = [];

    for (let i = 0; i < recipients.length; i += CHUNK_SIZE) {
        chunks.push(recipients.slice(i, i + CHUNK_SIZE));
    }

    console.log(`[BATCH_PROCESSOR] Processing ${recipients.length} emails in ${chunks.length} chunks for ${eventType}.`);

    for (const [index, chunk] of chunks.entries()) {
        console.log(`[BATCH_PROCESSOR] Dispatching chunk ${index + 1}/${chunks.length}`);

        const promises = chunk.map(r => dispatchEmailEvent({
            eventType,
            recipientId: r.recipientId,
            recipientType,
            entityId: r.entityId,
            data: r.data,
            isCritical
        }));

        // Await all dispatch promises in the current chunk. 
        // Note: dispatchEmailEvent is already unblocking the main thread internally via Promise.resolve
        await Promise.all(promises);

        // 3. Optional memory/rate-limiting buffer between chunks
        if (index < chunks.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 2000)); // 2-second rate limit buffer
        }
    }

    console.log(`[BATCH_PROCESSOR] Finished dispatching all chunks for ${eventType}.`);
    return true;
}

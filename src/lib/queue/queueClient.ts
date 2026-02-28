import { Queue, QueueOptions, Worker, WorkerOptions, Job } from "bullmq";
import Redis from "ioredis";
import { logger } from "../logger";

/**
 * PHASE 12: PERSISTENT JOB QUEUE
 * 
 * Replaces inherently fragile `setTimeout` logic with persistent Redis-backed BullMQ logic.
 */

// We enforce a local Redis instance for dev, or a managed URI for prod
const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
export const redisConnection = new Redis(redisUrl, {
    maxRetriesPerRequest: null,
});

redisConnection.on('error', (err) => {
    logger.error({ err }, '[REDIS] Connection Error. Verify redis-server is running.');
});

// Default shared options applying User Governance Constraints
const DEFAULT_QUEUE_OPTIONS: QueueOptions = {
    connection: redisConnection as any, // Bypass strict ioredis internal typing mismatch in BullMQ
    defaultJobOptions: {
        attempts: 3,                 // REVIEW RULE: All jobs must enforce retry policy
        backoff: {
            type: 'exponential',
            delay: 5000              // 5s, 25s, 125s
        },
        removeOnComplete: true,      // Keep DB clean
        removeOnFail: false          // REVIEW RULE: DLQ Policy - Failed jobs must NOT silently disappear. They stay in Redis for Admin UI visibility.
    }
};

// 1. Instantiate Queues
export const emailQueue = new Queue("emailQueue", DEFAULT_QUEUE_OPTIONS);
export const impactNarrativeQueue = new Queue("impactNarrativeQueue", DEFAULT_QUEUE_OPTIONS);
export const csrReportQueue = new Queue("csrReportQueue", DEFAULT_QUEUE_OPTIONS);
export const lifecycleAlertQueue = new Queue("lifecycleAlertQueue", DEFAULT_QUEUE_OPTIONS);

/**
 * Helper to gracefully start a worker while binding global error monitoring.
 */
export function createWorker<T>(
    queueName: string,
    processor: (job: Job<T>) => Promise<any>,
    options?: Partial<WorkerOptions>
): Worker {

    const worker = new Worker(queueName, processor, {
        connection: redisConnection as any, // Bypass strict ioredis typing
        concurrency: 5,
        ...options
    });

    worker.on("completed", (job) => {
        logger.info({ jobId: job.id, name: job.name }, `[QUEUE] ${queueName} job completed successfully.`);
    });

    // REVIEW RULE: Dead Letter Queue (DLQ) Policy implementation
    // If a job exhausts all attempts, it naturally triggers "failed" iteratively until max attempts.
    // At max attempts, BullMQ moves it to 'failed' state in Redis which acts as our DLQ, viewable via Bull Board.
    worker.on("failed", (job, err) => {
        if (job) {
            const hasExhaustedRetries = job.attemptsMade >= (job.opts.attempts || 1);

            if (hasExhaustedRetries) {
                // DLQ Trigger
                logger.fatal({
                    jobId: job.id,
                    name: job.name,
                    errMessage: err.message
                }, `[DLQ_ALERT] ${queueName} job critically failed after max retries. Moved to Dead Letter state.`);
            } else {
                logger.warn({
                    jobId: job.id,
                    name: job.name,
                    attempt: job.attemptsMade,
                    errMessage: err.message
                }, `[QUEUE_RETRY] ${queueName} job failed. Retrying...`);
            }
        } else {
            logger.error({ errMessage: err.message }, `[QUEUE] Worker error on ${queueName}`);
        }
    });

    return worker;
}

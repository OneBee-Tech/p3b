import { auth } from "@/auth";
import { redirect } from "next/navigation";

/**
 * PHASE 12: QUEUE OBSERVABILITY DASHBOARD
 * 
 * Embeds the `@bull-board/ui` interface for authenticated administrators.
 * Used for inspecting job retries, Dead Letter Queue (DLQ) state, and backpressure.
 */

export default async function SystemQueuePage() {
    const session = await auth();

    // Strict Authorization Gateway
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        redirect("/dashboard");
    }

    return (
        <div className="w-full h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gray-50 p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 self-start">
                System Queue Dashboard
            </h1>
            <p className="text-gray-600 mb-8 self-start max-w-2xl">
                Monitor background jobs, inspect payloads, and manually retry items in the Dead Letter Queue.
                This system runs on BullMQ backed by Redis.
            </p>

            <div className="w-full flex-grow bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden isolate relative">
                <iframe
                    src="/api/admin/queues"
                    className="w-full h-full border-none absolute inset-0"
                    title="Bull Board"
                />
            </div>
        </div>
    );
}

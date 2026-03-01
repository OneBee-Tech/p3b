import { prisma } from "@/lib/prisma";
import { Mail, AlertCircle, CheckCircle2, Clock, Ban } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function EmailLogsAdminPage({
    searchParams
}: {
    searchParams: Promise<{ status?: string; event?: string }>;
}) {
    const resolvedSearchParams = await searchParams;

    // Basic Filtering
    const whereClause: any = {};
    if (resolvedSearchParams.status && resolvedSearchParams.status !== "ALL") {
        whereClause.deliveryStatus = resolvedSearchParams.status;
    }
    if (resolvedSearchParams.event && resolvedSearchParams.event !== "ALL") {
        whereClause.eventType = resolvedSearchParams.event;
    }

    const emailLogs = await (prisma as any).emailLog.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
        include: {
            user: {
                select: { name: true, email: true, emailSuppressed: true }
            }
        },
        take: 100 // Hard limit for safety
    });

    const StatusBadge = ({ status }: { status: any }) => {
        const styles: Record<string, string> = {
            PENDING: "bg-white/10 text-white/60",
            SENT: "bg-green-500/10 text-green-400 border border-green-500/20",
            FAILED: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
            BOUNCED: "bg-red-500/10 text-red-400 border border-red-500/20",
        };
        const icons: Record<string, any> = {
            PENDING: <Clock className="w-3 h-3" />,
            SENT: <CheckCircle2 className="w-3 h-3" />,
            FAILED: <AlertCircle className="w-3 h-3" />,
            BOUNCED: <Ban className="w-3 h-3" />,
        };
        return (
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 ${styles[status]}`}>
                {icons[status]}
                {status}
            </span>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-white flex items-center gap-3">
                        <Mail className="w-8 h-8 text-trust-blue" />
                        Communication Delivery Logs
                    </h1>
                    <p className="text-white/60 mt-2">Audit trail for all dispatched event-driven communications.</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-white/50">Status:</span>
                    <div className="flex gap-2">
                        {["ALL", "SENT", "PENDING", "FAILED", "BOUNCED"].map(status => (
                            <Link
                                key={status}
                                href={`?status=${status}&event=${resolvedSearchParams.event || 'ALL'}`}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${(resolvedSearchParams.status === status || (!resolvedSearchParams.status && status === 'ALL'))
                                    ? 'bg-trust-blue text-white'
                                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {status}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Log Table */}
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5 text-xs text-white/50 uppercase tracking-widest">
                            <th className="p-4 font-medium">Event & Timestamp</th>
                            <th className="p-4 font-medium">Recipient</th>
                            <th className="p-4 font-medium">Delivery Status</th>
                            <th className="p-4 font-medium">Diagnostics</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {emailLogs.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-white/40">No communications found matching criteria.</td>
                            </tr>
                        ) : emailLogs.map((log: any) => (
                            <tr key={log.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4">
                                    <div className="font-mono text-sm text-white mb-1">{log.eventType}</div>
                                    <div className="text-xs text-white/40">
                                        {new Date(log.createdAt).toLocaleString()}
                                    </div>
                                    <div className="text-[10px] text-white/20 mt-1 font-mono truncate max-w-[200px]" title={log.eventId}>
                                        {log.eventId}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <div className="font-medium text-white">{log.user?.name || "Unknown"}</div>
                                        {log.user?.emailSuppressed && (
                                            <span className="bg-red-500/20 text-red-400 text-[10px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider" title="User is suppressed due to bounces">Suppressed</span>
                                        )}
                                    </div>
                                    <div className="text-xs text-white/50">{log.user?.email || "No Email"}</div>
                                    <div className="text-xs text-trust-blue/70 mt-1">{log.recipientType}</div>
                                </td>
                                <td className="p-4">
                                    <StatusBadge status={log.deliveryStatus} />
                                    {log.sentAt && (
                                        <div className="text-xs text-white/40 mt-1">
                                            Sent {new Date(log.sentAt).toLocaleTimeString()}
                                        </div>
                                    )}
                                </td>
                                <td className="p-4">
                                    <div className="text-xs text-white/60 mb-1">
                                        <span className="text-white/40">Template:</span> {log.templateVersion}
                                    </div>
                                    {log.errorMessage ? (
                                        <div className="text-xs text-red-400 font-mono bg-red-500/10 p-2 rounded truncate max-w-[250px]" title={log.errorMessage}>
                                            {log.errorMessage}
                                        </div>
                                    ) : (
                                        <span className="text-xs text-white/20">—</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

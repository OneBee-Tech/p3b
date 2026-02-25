'use client';

import { useState, useTransition } from "react";
import { Search, ChevronDown, ChevronUp, CheckCircle2, Clock, Archive, Trash2, RefreshCw } from "lucide-react";
import { updateInquiryStatus, archiveInquiry, softDeleteInquiry } from "./actions";

type Inquiry = {
    id: string;
    name: string;
    email: string;
    inquiryType: string;
    message: string;
    status: string;
    createdAt: Date;
};

const TYPE_LABELS: Record<string, string> = {
    GENERAL: "General",
    SPONSORSHIP: "Sponsorship",
    REFER_CHILD: "Refer a Child",
    REQUEST_ASSISTANCE: "Assistance",
    PARTNERSHIP: "Partnership",
    MEDIA: "Media",
};

const STATUS_COLORS: Record<string, string> = {
    NEW: "bg-trust-blue/20 text-trust-blue",
    IN_PROGRESS: "bg-impact-gold/20 text-impact-gold",
    RESOLVED: "bg-emerald-500/20 text-emerald-400",
    ARCHIVED: "bg-white/10 text-white/40",
};

export function InquiriesClient({ inquiries }: { inquiries: Inquiry[] }) {
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("ALL");
    const [filterType, setFilterType] = useState("ALL");
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const filtered = inquiries.filter(i => {
        const matchSearch = !search || i.name.toLowerCase().includes(search.toLowerCase()) || i.email.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === "ALL" || i.status === filterStatus;
        const matchType = filterType === "ALL" || i.inquiryType === filterType;
        return matchSearch && matchStatus && matchType;
    });

    const handleStatusChange = (id: string, newStatus: "IN_PROGRESS" | "RESOLVED") => {
        startTransition(() => updateInquiryStatus(id, newStatus));
    };
    const handleArchive = (id: string) => {
        startTransition(() => archiveInquiry(id));
    };
    const handleDelete = (id: string) => {
        if (!confirm("Permanently soft-delete this inquiry? It will no longer appear in the default view.")) return;
        startTransition(() => softDeleteInquiry(id));
    };

    return (
        <div className="space-y-5">
            {/* Filters */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                        type="text"
                        placeholder="Search by name or email…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-trust-blue"
                    />
                </div>
                <select
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value)}
                    className="px-4 py-2.5 bg-cinematic-dark border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-trust-blue"
                >
                    <option value="ALL">All Statuses</option>
                    <option value="NEW">New</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="RESOLVED">Resolved</option>
                </select>
                <select
                    value={filterType}
                    onChange={e => setFilterType(e.target.value)}
                    className="px-4 py-2.5 bg-cinematic-dark border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-trust-blue"
                >
                    <option value="ALL">All Types</option>
                    {Object.entries(TYPE_LABELS).map(([v, l]) => (
                        <option key={v} value={v}>{l}</option>
                    ))}
                </select>
            </div>

            {/* Summary */}
            <p className="text-white/40 text-xs font-medium px-1">
                Showing {filtered.length} of {inquiries.length} inquiries
            </p>

            {/* Table */}
            {filtered.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl text-white/30">
                    No inquiries match your filters.
                </div>
            ) : (
                <div className="space-y-3">
                    {filtered.map(inq => {
                        const isExpanded = expandedId === inq.id;
                        return (
                            <div key={inq.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                                {/* Row */}
                                <div className="flex items-start gap-4 p-4">
                                    <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
                                        <div>
                                            <p className="font-bold text-white text-sm truncate">{inq.name}</p>
                                            <p className="text-white/40 text-xs truncate">{inq.email}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs bg-white/10 text-white/60 px-2 py-0.5 rounded-full font-medium">
                                                {TYPE_LABELS[inq.inquiryType] ?? inq.inquiryType}
                                            </span>
                                        </div>
                                        <div>
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${STATUS_COLORS[inq.status] ?? "bg-white/10 text-white/40"}`}>
                                                {inq.status.replace("_", " ")}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-white/40 text-xs">{new Date(inq.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</p>
                                        </div>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex items-center gap-1 flex-shrink-0">
                                        <button
                                            onClick={() => setExpandedId(isExpanded ? null : inq.id)}
                                            className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                                            title={isExpanded ? "Collapse" : "View message"}
                                        >
                                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                        </button>

                                        {inq.status === "NEW" && (
                                            <button
                                                onClick={() => handleStatusChange(inq.id, "IN_PROGRESS")}
                                                disabled={isPending}
                                                className="p-1.5 rounded-lg hover:bg-trust-blue/20 text-white/50 hover:text-trust-blue transition-colors"
                                                title="Mark In Progress"
                                            >
                                                <RefreshCw className="w-4 h-4" />
                                            </button>
                                        )}

                                        {inq.status !== "RESOLVED" && (
                                            <button
                                                onClick={() => handleStatusChange(inq.id, "RESOLVED")}
                                                disabled={isPending}
                                                className="p-1.5 rounded-lg hover:bg-emerald-500/20 text-white/50 hover:text-emerald-400 transition-colors"
                                                title="Mark Resolved"
                                            >
                                                <CheckCircle2 className="w-4 h-4" />
                                            </button>
                                        )}

                                        <button
                                            onClick={() => handleArchive(inq.id)}
                                            disabled={isPending}
                                            className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-impact-gold transition-colors"
                                            title="Archive"
                                        >
                                            <Archive className="w-4 h-4" />
                                        </button>

                                        <button
                                            onClick={() => handleDelete(inq.id)}
                                            disabled={isPending}
                                            className="p-1.5 rounded-lg hover:bg-red-500/20 text-white/50 hover:text-red-400 transition-colors"
                                            title="Soft Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Expanded message */}
                                {isExpanded && (
                                    <div className="border-t border-white/10 px-4 py-4 bg-white/[0.02]">
                                        <p className="text-xs text-white/40 font-bold uppercase tracking-widest mb-2">Full Message</p>
                                        <p className="text-white/80 text-sm whitespace-pre-wrap leading-relaxed">{inq.message}</p>
                                        <a
                                            href={`mailto:${inq.email}?subject=Re: Your ${TYPE_LABELS[inq.inquiryType] ?? "Inquiry"} — OneDollarOneChild`}
                                            className="inline-flex items-center gap-1.5 mt-4 text-xs text-trust-blue hover:underline font-medium"
                                        >
                                            Reply to {inq.email} →
                                        </a>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

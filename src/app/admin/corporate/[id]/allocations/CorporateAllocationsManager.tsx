"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Users, AlertTriangle, Play, RefreshCcw, CheckCircle2, ShieldAlert } from "lucide-react";

type AllocationProp = {
    id: string;
    registryChildId: string;
    registryChild: {
        displayName: string;
        region: string;
        status: string;
    };
    createdAt: Date;
    revokedAt?: Date | null;
    revokedReason?: string | null;
};

export default function CorporateAllocationsManager({
    sponsorId,
    capacity,
    activeAllocations,
    revokedAllocations,
    status
}: {
    sponsorId: string;
    capacity: number;
    activeAllocations: AllocationProp[];
    revokedAllocations: AllocationProp[];
    status: string;
}) {
    const router = useRouter();
    const [isAllocating, setIsAllocating] = useState(false);
    const [revokingId, setRevokingId] = useState<string | null>(null);
    const [revokeReason, setRevokeReason] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const availableSlots = capacity - activeAllocations.length;

    async function handleRunEngine() {
        if (availableSlots <= 0) return;
        setIsAllocating(true);
        setError(null);
        setSuccess(null);

        try {
            const res = await fetch(`/api/corporate/${sponsorId}/run-engine`, { method: "POST" });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Engine execution failed");

            setSuccess(`Successfully allocated ${data.allocatedCount} new children.`);
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsAllocating(false);
        }
    }

    async function handleRevoke(allocationId: string) {
        if (!revokeReason.trim()) {
            setError("You must provide a reason for revoking an allocation to satisfy governance audits.");
            return;
        }

        setRevokingId(allocationId);
        setError(null);
        setSuccess(null);

        try {
            const res = await fetch(`/api/corporate/${sponsorId}/allocations/${allocationId}/revoke`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reason: revokeReason })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Revocation failed");

            setSuccess(`Allocation successfully revoked and logged.`);
            setRevokeReason("");
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setRevokingId(null);
        }
    }

    return (
        <div className="space-y-6">
            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <span className="text-sm">{error}</span>
                </div>
            )}

            {success && (
                <div className="bg-green-500/10 border border-green-500/50 text-green-400 p-4 rounded-xl flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span className="text-sm">{success}</span>
                </div>
            )}

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h2 className="text-xl font-heading font-bold text-white mb-2">Automated Allocation Engine</h2>
                    <p className="text-white/60 text-sm max-w-xl">
                        This engine identifies children in the <span className="text-impact-gold font-medium">WAITING</span> or <span className="text-impact-gold font-medium">PARTIALLY_FUNDED</span> tiers based on strict Co-Funding Capacity validation. It maps institutional funds without altering Donation ledgers.
                    </p>
                </div>

                <div className="flex flex-col items-center gap-3 bg-black/30 p-4 rounded-xl border border-white/5 min-w-[200px]">
                    <div className="text-center">
                        <span className="block text-3xl font-heading font-bold text-white leading-none">
                            {availableSlots}
                        </span>
                        <span className="text-xs text-white/40 uppercase tracking-widest font-medium mt-1">Available Slots</span>
                    </div>
                    <button
                        onClick={handleRunEngine}
                        disabled={isAllocating || availableSlots <= 0 || status !== "ACTIVE"}
                        className="w-full flex justify-center items-center gap-2 bg-trust-blue hover:bg-blue-600 disabled:bg-white/10 disabled:text-white/30 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                    >
                        {isAllocating ? (
                            <><RefreshCcw className="w-4 h-4 animate-spin" /> Engine Running...</>
                        ) : (
                            <><Play className="w-4 h-4" /> Run Engine</>
                        )}
                    </button>
                </div>
            </div>

            {/* Active Allocations Table */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="p-5 border-b border-white/10 flex items-center gap-3 bg-black/20">
                    <ShieldAlert className="w-5 h-5 text-impact-gold" />
                    <h2 className="text-lg font-heading font-bold text-white">Active Beneficiary Map ({activeAllocations.length})</h2>
                </div>

                {activeAllocations.length === 0 ? (
                    <div className="p-8 text-center text-white/40 text-sm border-dashed border-b border-white/10">
                        No active allocations mapping to this corporate sponsor.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/5 text-xs uppercase text-white/50 font-medium">
                                    <th className="px-5 py-3 border-b border-white/10">Child</th>
                                    <th className="px-5 py-3 border-b border-white/10">Region</th>
                                    <th className="px-5 py-3 border-b border-white/10">Allocation Date</th>
                                    <th className="px-5 py-3 border-b border-white/10 text-right">Reversal Control</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-sm text-white/80">
                                {activeAllocations.map(a => (
                                    <tr key={a.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-5 py-3 font-medium text-white">{a.registryChild.displayName}</td>
                                        <td className="px-5 py-3">{a.registryChild.region}</td>
                                        <td className="px-5 py-3 font-mono text-xs">{new Date(a.createdAt).toLocaleDateString()}</td>
                                        <td className="px-5 py-3 text-right">
                                            {revokingId === a.id ? (
                                                <div className="flex flex-col items-end gap-2 max-w-[200px] ml-auto">
                                                    <input
                                                        type="text"
                                                        placeholder="Reason for revoking..."
                                                        value={revokeReason}
                                                        onChange={(e) => setRevokeReason(e.target.value)}
                                                        className="w-full bg-black/50 border border-red-500/30 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-red-500"
                                                    />
                                                    <div className="flex gap-2">
                                                        <button onClick={() => setRevokingId(null)} className="text-[10px] text-white/50 hover:text-white uppercase">Cancel</button>
                                                        <button onClick={() => handleRevoke(a.id)} className="text-[10px] text-red-400 font-bold hover:text-red-300 uppercase">Confirm Revoke</button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => setRevokingId(a.id)}
                                                    className="text-xs text-red-400 hover:text-red-300 font-medium border border-red-500/20 px-2 py-1 flex justify-center items-center ml-auto rounded transition-colors"
                                                >
                                                    Revoke Mapping
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Revoked Audit Trail */}
            {revokedAllocations.length > 0 && (
                <div className="bg-black/30 border border-white/5 rounded-2xl overflow-hidden opacity-80">
                    <div className="p-4 border-b border-white/5">
                        <h2 className="text-sm font-heading font-medium text-white/60">Revocation History Audit Log</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <tbody className="divide-y divide-white/5 text-xs text-white/50">
                                {revokedAllocations.map(a => (
                                    <tr key={a.id}>
                                        <td className="px-4 py-2">{a.registryChild.displayName}</td>
                                        <td className="px-4 py-2 text-red-400/70">Revoked on: {new Date(a.revokedAt!).toLocaleDateString()}</td>
                                        <td className="px-4 py-2 italic font-mono w-1/2">"{a.revokedReason}"</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

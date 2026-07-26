import { CheckCircle2, ShieldCheck } from "lucide-react";

export function AdminVerificationNotice() {
    const verifiedPoints = [
        "Quarterly Financial Review",
        "Payment Documentation",
        "School Verification",
        "Financial Record Keeping",
    ];

    return (
        <div className="bg-gradient-to-br from-slate-900 via-cinematic-dark to-slate-950 p-6 rounded-xl border border-slate-800 text-white shadow-md mb-6 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
                <ShieldCheck className="w-5 h-5 text-impact-gold flex-shrink-0" />
                <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">Institutional Oversight</h4>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
                {verifiedPoints.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-white/90 bg-white/5 p-2 rounded-lg border border-white/10">
                        <CheckCircle2 className="w-4 h-4 text-impact-gold shrink-0" />
                        <span>{point}</span>
                    </div>
                ))}
            </div>

            <p className="text-[11px] text-white/60 leading-relaxed font-body">
                All sponsorship disbursements follow documented financial controls and verified school agreements.
            </p>
        </div>
    );
}

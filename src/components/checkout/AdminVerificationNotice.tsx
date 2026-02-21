import { ShieldCheck } from "lucide-react";

export function AdminVerificationNotice() {
    return (
        <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 flex gap-4 mb-6">
            <ShieldCheck className="w-8 h-8 text-trust-blue flex-shrink-0" />
            <div>
                <h4 className="font-bold text-cinematic-dark text-sm mb-1 uppercase tracking-wide">Institutional Oversight</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                    All donations are institutionally audited and verified before allocation deployment. Our finance and compliance team reviews funding distribution quarterly.
                </p>
            </div>
        </div>
    );
}

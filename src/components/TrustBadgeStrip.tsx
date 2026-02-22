import { ShieldCheck, Lock, Building2, PieChart, FileText } from "lucide-react";

export function TrustBadgeStrip({ className = "" }: { className?: string }) {
    return (
        <div className={`bg-white border-y border-gray-100 py-10 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-gray-200">

                <div className="flex flex-col items-center gap-3 group cursor-pointer text-center md:px-6" title="Identity & welfare protection protocols enforced.">
                    <div className="bg-purple-50 p-4 rounded-full group-hover:scale-110 group-hover:bg-purple-100 transition-all duration-300">
                        <ShieldCheck className="w-7 h-7 text-purple-600" />
                    </div>
                    <p className="font-extrabold text-gray-900 text-sm tracking-wide">Verified Child Safeguarding</p>
                    <span className="text-xs text-gray-500 max-w-[140px] leading-relaxed">Protection Enforced</span>
                </div>

                <div className="flex flex-col items-center gap-3 group cursor-pointer text-center md:px-6" title="Periodic utilization summaries available in dashboard.">
                    <div className="bg-impact-gold/10 p-4 rounded-full group-hover:scale-110 group-hover:bg-impact-gold/20 transition-all duration-300">
                        <PieChart className="w-7 h-7 text-yellow-600" />
                    </div>
                    <p className="font-extrabold text-gray-900 text-sm tracking-wide">Transparent Utilization Reports</p>
                    <span className="text-xs text-gray-500 max-w-[140px] leading-relaxed">Utilization Summaries</span>
                </div>

                <div className="flex flex-col items-center gap-3 group cursor-pointer text-center md:px-6" title="Issued post-payment for financial transparency.">
                    <div className="bg-blue-50 p-4 rounded-full group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                        <FileText className="w-7 h-7 text-trust-blue" />
                    </div>
                    <p className="font-extrabold text-gray-900 text-sm tracking-wide">Donation Invoice Provided</p>
                    <span className="text-xs text-gray-500 max-w-[140px] leading-relaxed">Financial Transparency</span>
                </div>

                <div className="flex flex-col items-center gap-3 group cursor-pointer text-center md:px-6" title="Verified active NGO status">
                    <div className="bg-emerald-50 p-4 rounded-full group-hover:scale-110 group-hover:bg-emerald-100 transition-all duration-300">
                        <Building2 className="w-7 h-7 text-emerald-600" />
                    </div>
                    <p className="font-extrabold text-gray-900 text-sm tracking-wide">Registered NGO</p>
                    <span className="text-xs text-gray-500 max-w-[140px] leading-relaxed">Verified Status</span>
                </div>

            </div>
        </div>
    );
}

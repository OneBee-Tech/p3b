import { ShieldCheck, Lock, FileLineChart, Building2 } from "lucide-react";

export function TrustBadgeStrip({ className = "" }: { className?: string }) {
    return (
        <div className={`bg-white border-y border-gray-100 py-8 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center md:items-center gap-8 md:gap-16">

                <div className="flex flex-col items-center gap-2 group cursor-pointer text-center">
                    <div className="bg-emerald-50 p-3 rounded-full group-hover:scale-110 transition-transform">
                        <Building2 className="w-6 h-6 text-emerald-600" />
                    </div>
                    <p className="font-bold text-cinematic-dark text-sm">Registered NGO</p>
                    <span className="text-xs text-gray-500 max-w-[120px]">501(c)(3) Verified</span>
                </div>

                <div className="flex flex-col items-center gap-2 group cursor-pointer text-center">
                    <div className="bg-blue-50 p-3 rounded-full group-hover:scale-110 transition-transform">
                        <FileLineChart className="w-6 h-6 text-trust-blue" />
                    </div>
                    <p className="font-bold text-cinematic-dark text-sm">Financially Audited</p>
                    <span className="text-xs text-gray-500 max-w-[120px]">Annual Transparency</span>
                </div>

                <div className="flex flex-col items-center gap-2 group cursor-pointer text-center">
                    <div className="bg-purple-50 p-3 rounded-full group-hover:scale-110 transition-transform">
                        <ShieldCheck className="w-6 h-6 text-purple-600" />
                    </div>
                    <p className="font-bold text-cinematic-dark text-sm">Tax Exempt</p>
                    <span className="text-xs text-gray-500 max-w-[120px]">Deductible Receipts</span>
                </div>

                <div className="flex flex-col items-center gap-2 group cursor-pointer text-center">
                    <div className="bg-gray-100 p-3 rounded-full group-hover:scale-110 transition-transform">
                        <Lock className="w-6 h-6 text-gray-600" />
                    </div>
                    <p className="font-bold text-cinematic-dark text-sm">Secure Donations</p>
                    <span className="text-xs text-gray-500 max-w-[120px]">256-bit SSL / PCI Compliant</span>
                </div>

            </div>
        </div>
    );
}

import { ShieldCheck, Lock, FileLineChart, Building2 } from "lucide-react";

export function TrustBadgeStrip({ className = "" }: { className?: string }) {
    return (
        <div className={`bg-white border-y border-gray-100 py-10 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-gray-200">

                <div className="flex flex-col items-center gap-3 group cursor-pointer text-center md:px-6" title="Verified active 501(c)(3) tax status">
                    <div className="bg-emerald-50 p-4 rounded-full group-hover:scale-110 group-hover:bg-emerald-100 transition-all duration-300">
                        <Building2 className="w-7 h-7 text-emerald-600" />
                    </div>
                    <p className="font-extrabold text-gray-900 text-sm tracking-wide">Registered NGO</p>
                    <span className="text-xs text-gray-500 max-w-[140px] leading-relaxed">501(c)(3) Verified</span>
                </div>

                <div className="flex flex-col items-center gap-3 group cursor-pointer text-center md:px-6" title="Independent financial transparency audit passed">
                    <div className="bg-blue-50 p-4 rounded-full group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                        <FileLineChart className="w-7 h-7 text-trust-blue" />
                    </div>
                    <p className="font-extrabold text-gray-900 text-sm tracking-wide">Financially Audited</p>
                    <span className="text-xs text-gray-500 max-w-[140px] leading-relaxed">Annual Transparency</span>
                </div>

                <div className="flex flex-col items-center gap-3 group cursor-pointer text-center md:px-6" title="Donations are fully tax-deductible">
                    <div className="bg-purple-50 p-4 rounded-full group-hover:scale-110 group-hover:bg-purple-100 transition-all duration-300">
                        <ShieldCheck className="w-7 h-7 text-purple-600" />
                    </div>
                    <p className="font-extrabold text-gray-900 text-sm tracking-wide">Tax Exempt</p>
                    <span className="text-xs text-gray-500 max-w-[140px] leading-relaxed">Deductible Receipts</span>
                </div>

                <div className="flex flex-col items-center gap-3 group cursor-pointer text-center md:px-6" title="Bank-level 256-bit encryption for all transactions">
                    <div className="bg-gray-100 p-4 rounded-full group-hover:scale-110 group-hover:bg-gray-200 transition-all duration-300">
                        <Lock className="w-7 h-7 text-gray-600" />
                    </div>
                    <p className="font-extrabold text-gray-900 text-sm tracking-wide">Secure Donations</p>
                    <span className="text-xs text-gray-500 max-w-[140px] leading-relaxed">256-bit SSL / PCI Compliant</span>
                </div>

            </div>
        </div>
    );
}

"use client";

import { usePathname } from "next/navigation";
import { ShieldCheck } from "lucide-react";

export function TrustBadgeStrip({ data, className = "" }: { data?: any; className?: string }) {
    const pathname = usePathname();
    if (pathname?.startsWith("/admin") || pathname === "/home2") return null;

    const meta = data?.metadata || {};
    const statement = meta.statement || "Verified children • Carefully selected schools • Direct education payments • Receipts shared • Progress reports every six months";

    // Split by bullet point to map to items
    const items = statement.split('•').map((s: string) => s.trim()).filter(Boolean);

    return (
        <div className={`bg-white border-y border-gray-100 py-6 ${className}`}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
                    {items.map((item: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-700">
                            <ShieldCheck className="w-5 h-5 text-trust-blue" />
                            <span className="font-semibold text-sm tracking-wide">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

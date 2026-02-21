import Link from "next/link";
import { ArrowRight, LayoutDashboard } from "lucide-react";

export function PostDonationVisibilityNote() {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 border border-gray-100">
                <LayoutDashboard className="w-6 h-6 text-gray-400" />
            </div>
            <h4 className="font-bold text-cinematic-dark mb-2">Track Your Impact</h4>
            <p className="text-sm text-gray-600 mb-4">
                After donating, you&apos;ll be able to track fund allocation, impacted communities, and certificates directly inside your donor dashboard.
            </p>
            <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-sm font-bold text-trust-blue hover:text-blue-800 transition-colors"
            >
                Preview Dashboard Experience <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
    );
}

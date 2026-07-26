import Link from "next/link";
import { ArrowRight, LayoutDashboard } from "lucide-react";

export function PostDonationVisibilityNote() {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 border border-gray-100">
                <LayoutDashboard className="w-6 h-6 text-gray-400" />
            </div>
            <h4 className="font-bold text-cinematic-dark mb-2">See Your Donor Dashboard</h4>
            <p className="text-sm text-gray-600 mb-4">
                After completing your sponsorship, you will receive full access to your donor dashboard to track school fee payments, academic progress reports, and verified enrollment milestones.
            </p>
            <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-sm font-bold text-trust-blue hover:text-blue-800 transition-colors"
            >
                Learn About Your Donor Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
    );
}

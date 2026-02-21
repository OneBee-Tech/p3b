import { prisma } from "@/lib/prisma";
import { AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export async function EmergencyCampaignBanner() {
    try {
        // 12. CAMPAIGN & EMERGENCY RESPONSE EXTENSION
        // Fetch any active campaign marked as CRITICAL urgency.
        const criticalCampaign = await prisma.campaign.findFirst({
            where: {
                urgencyLevel: "CRITICAL",
                status: "ACTIVE",
            },
            select: {
                id: true,
                title: true,
                fundingGoal: true,
                deadline: true,
            },
        });

        if (!criticalCampaign) return null;

        return (
            <div className="bg-red-600 text-white px-4 py-3 relative z-50">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 animate-pulse" />
                        <span className="font-bold uppercase tracking-wider text-sm">Emergency Response</span>
                    </div>
                    <div className="flex-1 font-medium">
                        {criticalCampaign.title} — We urgently need support for this community crisis.
                    </div>
                    <Link
                        href="/programs"
                        className="group flex items-center gap-2 bg-white text-red-600 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-red-50 transition-colors whitespace-nowrap"
                    >
                        Deploy Aid
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        );
    } catch (error) {
        // Safe failure mode: If DB fails, simply do not render the banner.
        return null;
    }
}

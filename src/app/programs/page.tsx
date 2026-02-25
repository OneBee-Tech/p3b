import { SponsorshipCard } from "@/components/ProgramCard";
import { Filter, Search, AlertCircle } from "lucide-react";
import { Metadata } from "next";
import prisma from "@/lib/prisma";

export const revalidate = 30;

export const metadata: Metadata = {
    title: "Sponsor a Child - OneDollarOneChild",
    description: "Browse children waiting for a guardian. Your monthly sponsorship provides education, supplies, and hope.",
    openGraph: {
        title: "Sponsor a Child - OneDollarOneChild",
        description: "Browse children waiting for a guardian. Your monthly sponsorship provides education, supplies, and hope.",
        type: "website",
    },
};

export default async function SponsorPage() {
    const children = await prisma.registryChild.findMany({
        where: {
            status: "WAITING",
            isArchived: false,
            deletedAt: null,
        },
        orderBy: [
            { safeguardingReviewStatus: "asc" }, // VERIFIED first
            { createdAt: "desc" },
        ],
        take: 24,
    });

    return (
        <div className="min-h-screen bg-warm-bg pb-20">

            {/* Header */}
            <div className="bg-cinematic-dark text-white pt-36 pb-20 mb-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-trust-blue/20 mix-blend-overlay" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Find a Child to Sponsor</h1>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto mb-6">
                        Your monthly support changes their entire world. Browse the children waiting for a guardian below.
                    </p>
                    <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-sm text-white/90 border border-white/20">
                        For the privacy and protection of the children, symbolic imagery is used.
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Filter Bar */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                        <Filter className="w-4 h-4" />
                        <span>{children.length} {children.length === 1 ? "child" : "children"} waiting for a sponsor</span>
                    </div>
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name or region..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-trust-blue focus:ring-1 focus:ring-trust-blue outline-none"
                        />
                    </div>
                </div>

                {/* Grid */}
                {children.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {children.map((child) => (
                            <SponsorshipCard key={child.id} child={child} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 border border-dashed border-gray-200 rounded-3xl bg-white">
                        <AlertCircle className="w-10 h-10 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-500 mb-2">No children available right now</h3>
                        <p className="text-gray-400">Check back soon — new sponsorship cases are verified and released regularly.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

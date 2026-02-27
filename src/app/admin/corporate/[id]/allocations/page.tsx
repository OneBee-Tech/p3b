import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { ShieldCheck, ArrowLeft, Users, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { getCorporateSponsorById } from "../../actions";
import CorporateAllocationsManager from "./CorporateAllocationsManager";

export const metadata: Metadata = {
    title: "Manage Allocations | NGO Admin",
};

export default async function ManageAllocationsPage({ params }: { params: { id: string } }) {
    const session = await auth();

    // Re-verify Access
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        redirect("/");
    }

    const sponsor = await getCorporateSponsorById(params.id);

    if (!sponsor) {
        return notFound();
    }

    const activeAllocations = sponsor.allocations.filter((a: any) => !a.revokedAt);
    const revokedAllocations = sponsor.allocations.filter((a: any) => a.revokedAt);

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-3">
                <Link href={`/admin/corporate/${sponsor.id}`} className="text-white/50 hover:text-white transition-colors text-sm font-medium flex items-center gap-1">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Profile
                </Link>
            </div>

            <div>
                <h1 className="text-3xl font-heading font-bold text-white flex items-center gap-3">
                    <Users className="w-8 h-8 text-impact-gold" />
                    Manage Allocations: {sponsor.organizationName}
                </h1>
                <p className="text-white/60 mt-2 text-lg">
                    Bulk allocate child profiles strictly tied to available Co-Funding capacity grids.
                </p>
            </div>

            {/* Server-Injected Client Manager */}
            <CorporateAllocationsManager
                sponsorId={sponsor.id}
                capacity={sponsor.sponsorshipCapacity}
                activeAllocations={activeAllocations}
                revokedAllocations={revokedAllocations}
                status={sponsor.status}
            />

        </div>
    );
}

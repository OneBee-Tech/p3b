import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { CheckoutForm } from "./CheckoutForm";
import { Lock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AllocationPreviewCard } from "@/components/checkout/AllocationPreviewCard";
import { ProgramFundingStatusCard } from "@/components/checkout/ProgramFundingStatusCard";
import { AdminVerificationNotice } from "@/components/checkout/AdminVerificationNotice";
import { PostDonationVisibilityNote } from "@/components/checkout/PostDonationVisibilityNote";
import { TrustBadgeStrip } from "@/components/TrustBadgeStrip";

export default async function CheckoutPage({
    searchParams
}: {
    searchParams: Promise<{ programId?: string, childId?: string, type?: string }>
}) {
    const { programId, childId, type } = await searchParams;

    let targetProgramId = programId;

    // Handle general donation routing logic fallback
    if (!targetProgramId && type === 'general') {
        const generalFund = await prisma.program.findUnique({
            where: { slug: 'general-fund' }
        });

        if (generalFund) {
            targetProgramId = generalFund.id;
        }
    }

    // Handle direct sponsorship routing fallback
    if (!targetProgramId && type === 'sponsorship') {
        const defaultProgram = await prisma.program.findFirst();
        if (defaultProgram) {
            targetProgramId = defaultProgram.id;
        }
    }

    if (!targetProgramId) {
        return <div className="p-8 text-center text-red-500">Missing Program ID or valid donation type</div>;
    }

    const program = await prisma.program.findUnique({
        where: { id: targetProgramId }
    });

    if (!program) {
        notFound();
    }

    // If sponsoring a specific child, fetch their name and monthly funding data
    let childDisplayName: string | undefined;
    let childMonthlyGoal: number | undefined;
    let childMonthlyFunding: number | undefined;
    if (childId) {
        const registryChild = await prisma.registryChild.findUnique({
            where: { id: childId },
            select: { displayName: true, sponsorshipNeededMonthly: true }
        });
        if (registryChild) {
            childDisplayName = registryChild.displayName;
            childMonthlyGoal = Number(registryChild.sponsorshipNeededMonthly);
            // Sum active monthly donations tied to this child
            const monthlyPledges = await prisma.donation.aggregate({
                where: {
                    status: 'SUCCEEDED',
                    type: 'RECURRING_MONTHLY',
                    // Match via metadata — childId is stored in Stripe metadata, not directly on Donation
                    // Fall back to zero if no direct relation exists
                },
                _sum: { amount: true }
            });
            childMonthlyFunding = 0; // Will be computed when webhook-linked assignments are available
        }
    }

    const fundingCurrent = Number(program.fundingCurrent);
    const fundingGoal = Number(program.fundingGoal);
    const isLocked = program.isLocked || fundingCurrent >= fundingGoal || program.status === 'FULLY_FUNDED';

    return (
        <div className="min-h-screen bg-warm-bg py-24 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Left Side: Payment Form / Waitlist */}
                <div className="lg:col-span-7">
                    <h1 className="text-3xl font-heading font-bold text-cinematic-dark mb-4">Complete Your Support</h1>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        {childDisplayName
                            ? <>You are sponsoring <strong>{childDisplayName}</strong>'s education and support services.</>
                            : <>You are supporting <strong>{program.name}</strong>.</>}
                        {" "}Select your contribution tier and proceed to the encrypted checkout.
                        <span className="block mt-3 text-sm text-gray-500">
                            Support is allocated toward education, learning materials, and wellbeing services. Donation invoices are issued within 24 hours of successful payment.
                        </span>
                    </p>

                    {isLocked ? (
                        <div className="bg-white p-8 rounded-xl shadow-xl border border-impact-gold text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5 bg-impact-gold transform translate-x-12 -translate-y-12 rounded-full w-48 h-48 pointer-events-none" />
                            <Lock className="w-12 h-12 text-impact-gold mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-cinematic-dark mb-2">Program Fully Funded</h2>
                            <p className="text-gray-600 mb-8">
                                Thanks to incredible donors like you, <strong>{program.name}</strong> has reached its funding goal! We are currently not accepting new recurring sponsorships to prevent overfunding.
                            </p>

                            <div className="space-y-4">
                                <Link href="/waitlist" className="block w-full">
                                    <Button variant="impact" size="lg" className="w-full">
                                        Join Waitlist for Openings
                                    </Button>
                                </Link>
                                <Link href="/programs" className="block w-full">
                                    <Button variant="outline" size="lg" className="w-full text-gray-600">
                                        Support Another Child
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
                            <CheckoutForm programId={program.id} childId={childId} />
                        </div>
                    )}

                    <div className="mt-8">
                        <TrustBadgeStrip className="!bg-transparent !border-none !py-0 !shadow-none" />
                    </div>
                </div>

                {/* Right Side: Governance & Transparency Panels */}
                <div className="lg:col-span-5 space-y-0">
                    <div className="sticky top-24">
                        <ProgramFundingStatusCard
                            programName={program.name}
                            childName={childDisplayName}
                            currentFunding={childMonthlyGoal !== undefined ? (childMonthlyFunding ?? 0) : fundingCurrent}
                            fundingGoal={childMonthlyGoal ?? fundingGoal}
                        />
                        <AllocationPreviewCard />
                        <AdminVerificationNotice />
                        <PostDonationVisibilityNote />
                    </div>
                </div>

            </div>
        </div>
    );
}

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { CheckoutForm } from "./CheckoutForm";
import { Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AllocationPreviewCard } from "@/components/checkout/AllocationPreviewCard";
import { AdminVerificationNotice } from "@/components/checkout/AdminVerificationNotice";
import { PostDonationVisibilityNote } from "@/components/checkout/PostDonationVisibilityNote";
import { CheckoutTimelineCard } from "@/components/checkout/CheckoutTimelineCard";
import { ChildReassignmentAccordion } from "@/components/checkout/ChildReassignmentAccordion";
import { getGlobalSettings } from "@/lib/services/globalSettingsService";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getGlobalSettings();
    return {
        title: `Secure Checkout - ${settings.organizationName}`,
        description: `Complete your secure sponsorship contribution to ${settings.organizationName}.`,
    };
}

export default async function CheckoutPage({
    searchParams
}: {
    searchParams: Promise<{ programId?: string, childId?: string, type?: string }>
}) {
    const { programId, childId, type } = await searchParams;

    let targetProgramId = programId;

    if (!targetProgramId && type === 'general') {
        const generalFund = await prisma.program.findUnique({
            where: { slug: 'general-fund' }
        });

        if (generalFund) {
            targetProgramId = generalFund.id;
        }
    }

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

    let childDisplayName: string | undefined;
    if (childId) {
        const registryChild = await prisma.registryChild.findUnique({
            where: { id: childId },
            select: { displayName: true }
        });
        const childModel = await prisma.child.findUnique({
            where: { id: childId },
            select: { name: true }
        });
        childDisplayName = registryChild?.displayName || childModel?.name;
    }

    const fundingCurrent = Number(program.fundingCurrent);
    const fundingGoal = Number(program.fundingGoal);
    const isLocked = program.isLocked || fundingCurrent >= fundingGoal || program.status === 'FULLY_FUNDED';

    return (
        <div className="min-h-screen bg-warm-bg pt-28 pb-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* 1. Clear Hero Title Header */}
                <div className="mb-10 pb-6 border-b border-gray-200/80">
                    <div className="inline-flex items-center gap-2 text-xs font-bold text-trust-blue uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full mb-3 border border-blue-100">
                        <ShieldCheck className="w-3.5 h-3.5" /> Secure Sponsorship Checkout
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-cinematic-dark tracking-tight">
                        {childDisplayName ? `Supporting ${childDisplayName}'s Educational Journey` : `Supporting ${program.name}`}
                    </h1>
                    <p className="mt-2 text-base text-gray-600 font-body">
                        Your sponsorship supports tuition, learning materials, and verified educational progress.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* Left Side: Payment Form / Waitlist */}
                    <div className="lg:col-span-7">
                        {isLocked ? (
                            <div className="bg-white p-8 rounded-2xl shadow-xl border border-impact-gold text-center relative overflow-hidden">
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
                                    <Link href="/sponsor-a-child#meet-children" className="block w-full">
                                        <Button variant="outline" size="lg" className="w-full text-gray-600">
                                            Support Another Child
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
                                <CheckoutForm programId={program.id} childId={childId} />
                            </div>
                        )}
                    </div>

                    {/* Right Side: Timeline & Institutional Oversight */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="sticky top-28 space-y-6">
                            <CheckoutTimelineCard />
                            <AllocationPreviewCard />
                            <AdminVerificationNotice />
                            <ChildReassignmentAccordion childName={childDisplayName} />
                            <PostDonationVisibilityNote />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

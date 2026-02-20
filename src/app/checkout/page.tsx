import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { CheckoutForm } from "./CheckoutForm";
import { DonationProgressCard } from "@/components/DonationProgressCard";
import { Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function CheckoutPage({
    searchParams
}: {
    searchParams: Promise<{ programId?: string, childId?: string }>
}) {
    const { programId, childId } = await searchParams;

    if (!programId) {
        return <div className="p-8 text-center text-red-500">Missing Program ID</div>;
    }

    const program = await prisma.program.findUnique({
        where: { id: programId }
    });

    if (!program) {
        notFound();
    }

    const fundingCurrent = Number(program.fundingCurrent);
    const fundingGoal = Number(program.fundingGoal);
    const isLocked = program.isLocked || fundingCurrent >= fundingGoal || program.status === 'FULLY_FUNDED';

    return (
        <div className="min-h-screen bg-warm-bg py-20 px-4">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* Left Side: Program Context */}
                <div>
                    <h1 className="text-3xl font-heading font-bold text-cinematic-dark mb-4">Complete Your Support</h1>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        You are contributing to the community funding pool for <strong>{program.name}</strong>.
                        Your donation allocates transparently to tuition, supplies, and infrastructure,
                        benefiting all representative children.
                    </p>

                    <DonationProgressCard
                        title={program.name}
                        description={program.location}
                        currentAmount={fundingCurrent}
                        goalAmount={fundingGoal}
                    />

                    <div className="mt-8 bg-white p-6 rounded-xl border border-gray-100 flex gap-4">
                        <ShieldCheck className="text-trust-blue w-8 h-8 flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-cinematic-dark mb-1">Tax Deductible & Secure</h4>
                            <p className="text-sm text-gray-500">
                                Your transaction is encrypted. 100% of your donation is distributed directly to the field operations.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Payment Form / Waitlist */}
                <div>
                    {isLocked ? (
                        <div className="bg-white p-8 rounded-xl shadow-xl border border-impact-gold text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5 bg-impact-gold transform translate-x-12 -translate-y-12 rounded-full w-48 h-48 pointer-events-none" />
                            <Lock className="w-12 h-12 text-impact-gold mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-cinematic-dark mb-2">Program Fully Funded</h2>
                            <p className="text-gray-600 mb-8">
                                Thanks to incredible donors like you, <strong>{program.name}</strong> has reached its funding goal! We are currently not accepting new recurring donations for this program to prevent overfunding.
                            </p>

                            <div className="space-y-4">
                                <Link href="/waitlist" className="block w-full">
                                    <Button variant="impact" size="lg" className="w-full">
                                        Join Waitlist for Openings
                                    </Button>
                                </Link>
                                <Link href="/sponsor" className="block w-full">
                                    <Button variant="outline" size="lg" className="w-full text-gray-600">
                                        Support a Similar Community
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100">
                            <CheckoutForm programId={program.id} childId={childId} />
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

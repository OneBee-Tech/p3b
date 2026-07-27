"use client";

import { useState } from "react";
import { CheckCircle2, ChevronRight, Globe2, BookOpen, AlertTriangle, ShieldCheck, Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ProgramContribution {
    programId: string;
    sponsorshipId?: string;
    programName: string;
    programStatus: string;
    fundingCurrent: number;
    fundingGoal: number | null;
    userContribution: number;
    isMonthly: boolean;
    status?: string;
    endDate?: string | null;
    childData?: any;
}

export function ProgramContributionList({ contributions }: { contributions: ProgramContribution[] }) {
    const router = useRouter();
    const [selectedProgram, setSelectedProgram] = useState<ProgramContribution | null>(null);
    const [isCancelling, setIsCancelling] = useState(false);
    const [cancelledResult, setCancelledResult] = useState<{ endDate: string } | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    if (contributions.length === 0) {
        return (
            <div className="bg-white p-8 text-center rounded-2xl border border-gray-100 text-gray-500 transition-all duration-300 hover:shadow-md">
                <Globe2 className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <p className="mb-4 text-gray-600 font-medium">Your journey starts here — discover children waiting for support.</p>
                <Link href="/sponsor-a-child">
                    <Button variant="impact">Sponsor a Child</Button>
                </Link>
            </div>
        );
    }

    const handleConfirmCancellation = async () => {
        if (!selectedProgram?.sponsorshipId) return;
        setIsCancelling(true);
        setErrorMessage(null);

        try {
            const res = await fetch("/api/sponsorships/cancel", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sponsorshipId: selectedProgram.sponsorshipId }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to cancel sponsorship");

            setCancelledResult({ endDate: data.endDate });
            router.refresh();
        } catch (err: any) {
            setErrorMessage(err.message || "An unexpected error occurred.");
        } finally {
            setIsCancelling(false);
        }
    };

    return (
        <div className="space-y-4">
            {contributions.map((program) => {
                const child = program.childData;
                const firstName = child?.displayName ? child.displayName.split(" ")[0] : (child?.name ? child.name.split(" ")[0] : "Child");
                const avatar = child?.avatarIllustrationUrl || (child ? `https://api.dicebear.com/9.x/micah/svg?seed=${child.id}&backgroundColor=ffd5dc,b6e3f4` : null);

                const isCancelled = program.status === 'CANCELLED';
                const formattedEndDate = program.endDate 
                    ? new Date(program.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                    : null;

                const isPastEndDate = program.endDate ? new Date(program.endDate) < new Date() : false;

                return (
                    <div key={program.programId} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                        <div className="flex justify-between items-start gap-4 mb-4">
                            <div className="flex items-start gap-4">
                                {avatar && (
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-impact-gold shadow-sm shrink-0">
                                        <img src={avatar} alt={program.programName} className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <div>
                                    <h3 className="font-bold text-cinematic-dark text-xl flex items-center gap-2">
                                        {program.programName}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                                        <BookOpen className="w-4 h-4 text-trust-blue" /> {child ? `Grade ${child.currentGrade || 'Elementary'} • ${child.region || 'Partner School'}` : 'Empowering local students and educators'}
                                    </p>
                                    <p className="text-sm font-medium mt-2">
                                        Your Impact: <span className="font-bold text-impact-gold">${program.userContribution.toLocaleString()} USD</span> {program.isMonthly && "(Monthly)"}
                                    </p>
                                </div>
                            </div>
                            <Link href={child ? `/sponsor-a-child/${child.slug || child.id}` : `/sponsor-a-child`} className="text-trust-blue hover:text-blue-700 bg-blue-50 p-2 rounded-full transition-colors flex-shrink-0">
                                <ChevronRight className="w-5 h-5" />
                            </Link>
                        </div>

                        {/* Status & Guided Cancellation Actions */}
                        {program.isMonthly && (
                            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                                {isCancelled ? (
                                    isPastEndDate ? (
                                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                            ⚪ Sponsorship Ended
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                                            🟡 Ends {formattedEndDate}
                                        </span>
                                    )
                                ) : (
                                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                                        <CheckCircle2 className="w-3.5 h-3.5" /> Active Monthly Sponsorship
                                    </span>
                                )}

                                {!isCancelled ? (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedProgram(program);
                                            setCancelledResult(null);
                                            setErrorMessage(null);
                                        }}
                                        className="text-xs font-semibold text-gray-400 hover:text-red-600 underline transition-colors"
                                    >
                                        Cancel Sponsorship
                                    </button>
                                ) : (
                                    <Link href={child ? `/sponsor-a-child/${child.slug || child.id}` : `/sponsor-a-child`}>
                                        <Button variant="outline" size="sm" className="text-xs h-8">
                                            Reactivate Sponsorship
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}

            {/* GUIDED CANCELLATION MODAL */}
            {selectedProgram && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-6 relative overflow-hidden">
                        
                        {!cancelledResult ? (
                            <>
                                {/* Step 1: Confirmation Form */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
                                        <AlertTriangle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-cinematic-dark">
                                            Cancel Monthly Sponsorship?
                                        </h3>
                                        <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">
                                            {selectedProgram.programName}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3 text-sm text-gray-600 leading-relaxed bg-gray-50/80 p-4 rounded-2xl border border-gray-100">
                                    <p>
                                        We&apos;re deeply grateful for the education and support you&apos;ve provided so far.
                                    </p>
                                    <p>
                                        Your sponsorship will remain active until the end of your current billing period. <strong>No future charges will be made after cancellation.</strong>
                                    </p>
                                    <p className="text-xs text-gray-500 pt-1 border-t border-gray-200/60">
                                        Your sponsored child will be reassigned to another donor or supported through our community fund to help avoid interruptions in education.
                                    </p>
                                </div>

                                <div className="text-xs text-center">
                                    <Link href="/refunds" target="_blank" className="text-trust-blue hover:underline font-semibold flex items-center justify-center gap-1">
                                        <ShieldCheck className="w-3.5 h-3.5" /> View our Donation &amp; Refund Policy
                                    </Link>
                                </div>

                                {errorMessage && (
                                    <div className="p-3 bg-red-50 text-red-600 text-xs font-semibold rounded-xl border border-red-100">
                                        {errorMessage}
                                    </div>
                                )}

                                {/* Step 2: Two Choices */}
                                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                    <Button
                                        variant="impact"
                                        size="lg"
                                        className="w-full sm:flex-1 font-bold"
                                        onClick={() => setSelectedProgram(null)}
                                        disabled={isCancelling}
                                    >
                                        Keep Sponsoring
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="w-full sm:flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 font-bold"
                                        onClick={handleConfirmCancellation}
                                        disabled={isCancelling}
                                    >
                                        {isCancelling ? "Processing..." : "Confirm Cancellation"}
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Step 4: Success Message */}
                                <div className="text-center space-y-4 py-2">
                                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                                        <Heart className="w-8 h-8 fill-current" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-cinematic-dark">
                                        Your sponsorship has been cancelled.
                                    </h3>
                                    <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                                        Your support will continue until <strong>{new Date(cancelledResult.endDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</strong>, and no future payments will be charged.
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Thank you for helping provide education to children in need.
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                        <Button
                                            variant="impact"
                                            size="lg"
                                            className="w-full sm:flex-1 font-bold"
                                            onClick={() => setSelectedProgram(null)}
                                        >
                                            Return to Dashboard
                                        </Button>
                                        <Link href="/refunds" target="_blank" className="w-full sm:flex-1">
                                            <Button variant="outline" size="lg" className="w-full font-bold text-gray-600">
                                                View Donation Policy
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

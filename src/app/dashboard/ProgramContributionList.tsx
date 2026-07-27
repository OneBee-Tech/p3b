import { CheckCircle2, ChevronRight, Globe2, BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProgramContribution {
    programId: string;
    programName: string;
    programStatus: string;
    fundingCurrent: number;
    fundingGoal: number | null;
    userContribution: number;
    isMonthly: boolean;
    childData?: any;
}

export function ProgramContributionList({ contributions }: { contributions: ProgramContribution[] }) {
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

    return (
        <div className="space-y-4">
            {contributions.map((program) => {
                const progressPercentage = program.fundingGoal
                    ? Math.min(100, Math.round((program.fundingCurrent / program.fundingGoal) * 100))
                    : 100;

                const isCompleted = program.programStatus === 'FULLY_FUNDED' || progressPercentage >= 100;
                const child = program.childData;
                const avatar = child?.avatarIllustrationUrl || (child ? `https://api.dicebear.com/9.x/micah/svg?seed=${child.id}&backgroundColor=ffd5dc,b6e3f4` : null);

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
                                        {isCompleted && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                                        <BookOpen className="w-4 h-4" /> {child ? `Grade ${child.currentGrade || 'Elementary'} • ${child.region || 'Partner School'}` : 'Empowering local students and educators'}
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

                        {/* Subscriptions & One-time Actions */}
                        {program.isMonthly && (
                            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                                    Active Monthly Sponsorship
                                </span>
                                <Link
                                    href="/refunds"
                                    className="text-xs font-semibold text-gray-400 hover:text-red-600 underline transition-colors"
                                >
                                    Cancel Sponsorship
                                </Link>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

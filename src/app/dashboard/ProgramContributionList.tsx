import { Progress } from "@/components/ui/progress";
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
}

export function ProgramContributionList({ contributions }: { contributions: ProgramContribution[] }) {
    if (contributions.length === 0) {
        return (
            <div className="bg-white p-8 text-center rounded-2xl border border-gray-100 text-gray-500 transition-all duration-300 hover:shadow-md">
                <Globe2 className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <p className="mb-4 text-gray-600 font-medium">Your journey starts here — discover communities waiting for support.</p>
                <Link href="/programs">
                    <Button variant="impact">Explore Communities</Button>
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

                return (
                    <div key={program.programId} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-cinematic-dark text-xl flex items-center gap-2">
                                    {program.programName}
                                    {isCompleted && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                                </h3>
                                <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                                    <BookOpen className="w-4 h-4" /> Empowering local students and educators
                                </p>
                                <p className="text-sm font-medium mt-3">
                                    Your Impact: <span className="font-bold text-impact-gold">${program.userContribution.toLocaleString()} USD</span> {program.isMonthly && "(Monthly)"}
                                </p>
                            </div>
                            <Link href={`/programs`} className="text-trust-blue hover:text-blue-700 bg-blue-50 p-2 rounded-full transition-colors flex-shrink-0">
                                <ChevronRight className="w-5 h-5" />
                            </Link>
                        </div>

                        {/* Funding Progress Bar */}
                        <div className="space-y-2 mt-4">
                            <div className="flex justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <span>Community Goal</span>
                                <span className={isCompleted ? "text-emerald-600" : "text-trust-blue"}>
                                    {progressPercentage}% Funded
                                </span>
                            </div>
                            <Progress value={progressPercentage} className="h-2 bg-gray-100" indicatorcolor={isCompleted ? "bg-emerald-500" : "bg-trust-blue"} />
                            {program.fundingGoal && (
                                <p className="text-xs text-gray-400 text-right mt-1">
                                    ${program.fundingCurrent.toLocaleString()} / ${program.fundingGoal.toLocaleString()} raised
                                </p>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

import { Target } from "lucide-react";

interface Props {
    programName?: string;
    currentFunding?: number;
    fundingGoal?: number;
}

export function ProgramFundingStatusCard({
    programName = "General Community Fund",
    currentFunding = 42500,
    fundingGoal = 100000
}: Props) {
    const progress = Math.min((currentFunding / fundingGoal) * 100, 100);

    return (
        <div className="bg-cinematic-dark p-6 rounded-xl border border-cinematic-dark shadow-lg mb-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-impact-gold/10 rounded-full blur-2xl -translate-y-8 translate-x-8 pointer-events-none" />

            <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-impact-gold">
                    <Target className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-heading font-bold text-sm text-white/70 uppercase tracking-widest">Target Program</h3>
                    <p className="font-bold text-lg text-white">{programName}</p>
                </div>
            </div>

            <div className="space-y-2 relative z-10">
                <div className="flex justify-between text-sm">
                    <span className="text-white/80">Current: ${currentFunding.toLocaleString()}</span>
                    <span className="text-impact-gold font-bold">Goal: ${fundingGoal.toLocaleString()}</span>
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-impact-gold rounded-full transition-all duration-1000"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="text-xs text-white/50 text-right mt-1">{progress.toFixed(1)}% Funded</p>
            </div>
        </div>
    );
}

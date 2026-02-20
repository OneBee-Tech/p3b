import { cn } from "@/lib/utils";

interface DonationProgressCardProps {
    title: string;
    description?: string;
    currentAmount: number;
    goalAmount: number;
    currency?: string;
    className?: string;
    children?: React.ReactNode;
}

export function DonationProgressCard({
    title,
    description,
    currentAmount,
    goalAmount,
    currency = "$",
    className,
    children
}: DonationProgressCardProps) {
    const progressPercentage = Math.min(100, Math.round((currentAmount / goalAmount) * 100)) || 0;

    return (
        <div className={cn("bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col", className)}>
            <div className="mb-6">
                <h3 className="text-xl font-heading font-bold text-cinematic-dark mb-2">{title}</h3>
                {description && <p className="text-gray-600 text-sm leading-relaxed">{description}</p>}
            </div>

            <div className="mt-auto space-y-4">
                <div>
                    <div className="flex justify-between text-sm mb-2 items-end">
                        <span className="text-2xl font-bold text-cinematic-dark">
                            {currency}{currentAmount.toLocaleString()}
                            <span className="text-sm font-medium text-gray-500 ml-1">raised</span>
                        </span>
                        <span className="text-sm font-medium text-gray-500 mb-1">
                            Goal: {currency}{goalAmount.toLocaleString()}
                        </span>
                    </div>

                    {/* Progress Bar Track */}
                    <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden relative">
                        {/* Progress Bar Fill */}
                        <div
                            className="absolute top-0 left-0 h-full bg-trust-blue rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${progressPercentage}%` }}
                        />
                        {/* Shimmer effect for active visually appealing bar */}
                        {progressPercentage > 0 && progressPercentage < 100 && (
                            <div
                                className="absolute top-0 left-0 h-full bg-white/20 w-1/3 animate-shimmer skew-x-12"
                                style={{ left: `${progressPercentage / 2}%` }}
                            />
                        )}
                    </div>

                    <div className="flex justify-between items-center mt-3">
                        <span className="text-xs font-bold text-trust-blue bg-trust-blue/10 px-2 py-1 rounded-full">
                            {progressPercentage}% Funded
                        </span>
                    </div>
                </div>

                {/* Optional CTA or additional content slot */}
                {children && (
                    <div className="pt-4 border-t border-gray-100 mt-4">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
}

import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface TransparencyAlertProps {
    programName: string;
    childName: string;
    className?: string;
}

export function TransparencyAlert({ programName, childName, className }: TransparencyAlertProps) {
    return (
        <div className={cn("bg-[#FFFDF9] border-l-4 border-impact-gold p-6 rounded-r-xl shadow-sm mb-8", className)}>
            <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                    <ShieldCheck className="w-6 h-6 text-impact-gold" />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-cinematic-dark uppercase tracking-wider mb-2">Our Community Funding Model</h4>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                        Your contribution supports the <strong className="text-cinematic-dark">{programName}</strong> community fund,
                        which provides education resources, tuition, and infrastructure for all children in the program — including <strong className="text-trust-blue">{childName}</strong>.
                        This pooled approach ensures sustainable, long-term impact for the entire community.
                    </p>
                </div>
            </div>
        </div>
    );
}

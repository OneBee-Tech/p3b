import { ArrowRight, BookOpen, GraduationCap, FileCheck, Shirt } from "lucide-react";

export function AllocationPreviewCard() {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <h3 className="font-heading font-bold text-base text-cinematic-dark">How Your Contribution Travels</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider text-trust-blue bg-blue-50 px-2.5 py-1 rounded-full">
                    Published Funding Policy
                </span>
            </div>

            {/* Visual Step Journey */}
            <div className="flex items-center justify-between gap-1 text-center py-3">
                <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-blue-50 text-trust-blue flex items-center justify-center mb-1.5 shadow-xs border border-blue-100">
                        <GraduationCap className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-bold text-cinematic-dark">School Fees</span>
                </div>

                <ArrowRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />

                <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-1.5 shadow-xs border border-amber-100">
                        <BookOpen className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-bold text-cinematic-dark">Books & Tools</span>
                </div>

                <ArrowRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />

                <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1.5 shadow-xs border border-emerald-100">
                        <Shirt className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-bold text-cinematic-dark">Uniform</span>
                </div>

                <ArrowRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />

                <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-1.5 shadow-xs border border-purple-100">
                        <FileCheck className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-bold text-cinematic-dark">Reports</span>
                </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                <span>Allocation reviewed quarterly</span>
                <span className="font-semibold text-gray-500">Last updated: July 2026</span>
            </div>
        </div>
    );
}

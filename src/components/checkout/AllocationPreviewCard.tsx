import { PieChart } from "lucide-react";

export function AllocationPreviewCard() {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-trust-blue/10 rounded-lg flex items-center justify-center text-trust-blue">
                    <PieChart className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-lg text-cinematic-dark">How your donation will be used</h3>
            </div>

            <div className="space-y-4 mb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-trust-blue" />
                        <span className="text-sm font-medium text-gray-700">Education Infrastructure</span>
                    </div>
                    <span className="text-sm font-bold text-cinematic-dark">40%</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-impact-gold" />
                        <span className="text-sm font-medium text-gray-700">Teacher Salaries</span>
                    </div>
                    <span className="text-sm font-bold text-cinematic-dark">25%</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-sm font-medium text-gray-700">Learning Materials</span>
                    </div>
                    <span className="text-sm font-bold text-cinematic-dark">20%</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-gray-400" />
                        <span className="text-sm font-medium text-gray-700">Operations</span>
                    </div>
                    <span className="text-sm font-bold text-cinematic-dark">15%</span>
                </div>
            </div>

            <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-100 italic">
                This allocation is dynamically calculated post-payment and visible in your dashboard.
            </p>
        </div>
    );
}

import { CheckCircle2 } from "lucide-react";

export function CheckoutTimelineCard() {
    const steps = [
        { label: "Today", desc: "Select sponsorship tier" },
        { label: "Payment confirmed", desc: "Instant encrypted receipt" },
        { label: "Child matched", desc: "Verified child allocation" },
        { label: "School funded", desc: "Tuition & books deployed" },
        { label: "Receipts shared", desc: "Itemized proof in dashboard" },
        { label: "Progress report", desc: "Academic update in 6 months" },
    ];

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-6">
            <h4 className="font-heading font-bold text-sm text-cinematic-dark uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">
                What Happens Next
            </h4>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 font-body before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                {steps.map((step, idx) => (
                    <div key={idx} className="relative flex flex-col">
                        <div className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full flex items-center justify-center ${idx === 0 ? 'bg-trust-blue text-white ring-4 ring-blue-50' : 'bg-white border-2 border-gray-200 text-gray-400'}`}>
                            {idx === 0 ? (
                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                            ) : (
                                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                            )}
                        </div>
                        <span className={`text-xs font-bold ${idx === 0 ? 'text-trust-blue' : 'text-cinematic-dark'}`}>
                            {step.label}
                        </span>
                        <span className="text-[11px] text-gray-500 font-medium">{step.desc}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

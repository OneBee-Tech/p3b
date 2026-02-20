import { BookOpen, Briefcase, Building, Scissors } from "lucide-react";

interface FundingCategoryBreakdownProps {
    tuition: number;
    supplies: number;
    infrastructure: number;
    ops: number;
    total: number;
}

export function FundingCategoryBreakdown({ tuition, supplies, infrastructure, ops, total }: FundingCategoryBreakdownProps) {

    if (total === 0) return null;

    const categories = [
        {
            name: "Tuition & Teaching",
            amount: tuition,
            icon: BookOpen,
            colorUrl: "bg-trust-blue",
            textColor: "text-trust-blue",
            desc: "Direct salaries for local educators and specialized curriculum development."
        },
        {
            name: "Books & Supplies",
            amount: supplies,
            icon: Scissors,
            colorUrl: "bg-impact-gold",
            textColor: "text-impact-gold",
            desc: "Physical learning materials, uniforms, and classroom necessities."
        },
        {
            name: "Infrastructure",
            amount: infrastructure,
            icon: Building,
            colorUrl: "bg-emerald-500",
            textColor: "text-emerald-600",
            desc: "Construction, solar panels, and clean water facilities for the learning environment."
        },
        {
            name: "Field Operations",
            amount: ops,
            icon: Briefcase,
            colorUrl: "bg-gray-500",
            textColor: "text-gray-600",
            desc: "Logistics, monitoring & evaluation, and security for our field teams."
        }
    ].filter(c => c.amount > 0);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {categories.map((cat, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4">
                    <div className={`${cat.colorUrl} p-2 rounded-lg text-white mt-1`}>
                        <cat.icon className="w-5 h-5" />
                    </div>
                    <div>
                        <p className={`font-bold ${cat.textColor} flex items-baseline gap-2`}>
                            {cat.name}
                            <span className="text-xs font-medium text-gray-400">
                                {Math.round((cat.amount / total) * 100)}%
                            </span>
                        </p>
                        <p className="text-xl font-light text-cinematic-dark">
                            ${cat.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                        <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                            {cat.desc}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

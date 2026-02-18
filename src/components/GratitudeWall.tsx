import { Quote, Flag } from "lucide-react";

const donors = [
    {
        id: 1,
        name: "Sarah M.",
        location: "USA",
        tier: "Monthly Guardian",
        quote: "Seeing the exact school my donation built changed my life. This isn't just charity, it's family.",
        type: "quote",
        amount: "$50/mo",
    },
    {
        id: 2,
        name: "TechCorp Inc.",
        location: "Global",
        tier: "Corporate Partner",
        quote: "Proud to sponsor 3 new classrooms in 2024.",
        type: "sponsor",
        amount: "$10,000",
    },
    {
        id: 3,
        name: "Anonymous",
        location: "UK",
        tier: "One-time Donor",
        type: "simple",
        amount: "$250",
    },
    {
        id: 4,
        name: "Amir K.",
        location: "UAE",
        tier: "Education Hero",
        quote: "For my late mother. May this bring light to children.",
        type: "quote",
        amount: "$1,000",
    },
    {
        id: 5,
        name: "Elena R.",
        location: "Spain",
        tier: "Monthly Guardian",
        quote: "Small acts, when multiplied by millions of people, can transform the world.",
        type: "quote",
        amount: "$30/mo",
    },
    {
        id: 6,
        name: "John & David",
        location: "Canada",
        tier: "Legacy Donor",
        type: "simple",
        amount: "$5,000",
    }
];

export function GratitudeWall() {
    return (
        <section id="donors" className="py-24 bg-warm-bg text-cinematic-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">A Community of Hope</h2>
                    <p className="text-lg text-gray-600">Join 15,000+ changemakers rewriting history.</p>
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {donors.map((donor) => (
                        <div key={donor.id} className="break-inside-avoid bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">

                            {/* Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-trust-blue/10 flex items-center justify-center text-trust-blue font-bold text-sm">
                                        {donor.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm">{donor.name}</h4>
                                        <p className="text-xs text-gray-500">{donor.location}</p>
                                    </div>
                                </div>
                                <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                                    {donor.tier}
                                </span>
                            </div>

                            {/* Content */}
                            {donor.type === "quote" && (
                                <div className="mb-4">
                                    <Quote className="w-6 h-6 text-impact-gold/40 mb-2" />
                                    <p className="text-gray-600 italic font-quote text-lg leading-relaxed">"{donor.quote}"</p>
                                </div>
                            )}

                            {donor.type === "sponsor" && (
                                <div className="bg-gray-50 p-4 rounded-lg mb-4 text-center border dashed border-gray-200">
                                    <p className="font-bold text-gray-500 text-sm">{donor.quote}</p>
                                </div>
                            )}

                            {/* Footer */}
                            <div className="flex justify-between items-center text-xs text-gray-400 border-t border-gray-100 pt-4 mt-2">
                                <span>Waitlist member since 2023</span>
                                <span className="font-bold text-center text-gray-900">{donor.amount}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

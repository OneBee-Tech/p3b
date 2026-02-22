import { SponsorshipCard } from "@/components/ProgramCard";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sponsor a Child - OneDollarOneChild",
    description: "Browse children waiting for a guardian. Your monthly sponsorship provides education, supplies, and hope.",
    openGraph: {
        title: "Sponsor a Child - OneDollarOneChild",
        description: "Browse children waiting for a guardian. Your monthly sponsorship provides education, supplies, and hope.",
        type: "website",
    },
};

// Mock Data - In real app, fetch from DB
const children = [
    {
        id: "1", name: "Ayesha", age: 8, gender: "Female", location: "Sindh, PK", dream: "Doctor", image: "/images/impact/child1.jpg", isUrgent: true,
        bio: "Ayesha loves science but her local school lacks basic supplies. Your $30/mo sponsorship will directly fund her tuition, daily nutritional meals, and the textbooks she needs to chase her dream of becoming a pediatrician."
    },
    {
        id: "2", name: "Raju", age: 10, gender: "Male", location: "Punjab, PK", dream: "Engineer", image: "/images/impact/child2.jpg",
        bio: "Raju is a math prodigy who had to drop out to help his family. Sponsorship will cover his re-enrollment fees and provide a monthly stipend to his household so he can return to class."
    },
    {
        id: "3", name: "Fatima", age: 6, gender: "Female", location: "KPK, PK", dream: "Teacher", image: "/images/impact/child3.jpg", isUrgent: true,
        bio: "Fatima walks 3 miles a day to reach the nearest charity school. Your support provides safe transportation and uniform costs, ensuring she stays enrolled safely."
    },
    {
        id: "4", name: "Ali", age: 12, gender: "Male", location: "Balochistan, PK", dream: "Pilot", image: "/images/impact/child4.jpg",
        bio: "Ali dreams of flying but currently works in a local market. Sponsoring him ensures his family receives income replacement, allowing Ali to focus entirely on his foundational education."
    },
    {
        id: "5", name: "Zainab", age: 9, gender: "Female", location: "Sindh, PK", dream: "Artist", image: "/images/impact/child5.jpg",
        bio: "Zainab expresses herself through drawing but has never owned a sketchbook. Your funds will guarantee her school placement and provide essential creative and academic supplies."
    },
    {
        id: "6", name: "Bilal", age: 11, gender: "Male", location: "Punjab, PK", dream: "Cricketer", image: "/images/impact/child6.jpg",
        bio: "Bilal leverages sports to stay focused. Sponsorship covers his core curriculum costs and provides access to the school's newly funded physical education program."
    },
];

export default function SponsorPage() {
    return (
        <div className="min-h-screen bg-warm-bg pb-20">

            {/* Header */}
            <div className="bg-cinematic-dark text-white pt-36 pb-20 mb-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-trust-blue/20 mix-blend-overlay" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Find a Child to Sponsor</h1>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto mb-6">
                        Your monthly support changes their entire world. Browse the children waiting for a guardian below.
                    </p>
                    <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-sm text-white/90 border border-white/20">
                        For the privacy and protection of the children, symbolic imagery is used.
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Filter Bar */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                        <Button variant="outline" size="sm" className="flex items-center gap-2 border-gray-200">
                            <Filter className="w-4 h-4" /> Filters
                        </Button>
                        <div className="h-6 w-[1px] bg-gray-200 mx-2" />
                        <select className="bg-transparent text-sm font-medium text-gray-600 focus:outline-none cursor-pointer">
                            <option>Any Age</option>
                            <option>5-8 Years</option>
                            <option>9-12 Years</option>
                        </select>
                        <select className="bg-transparent text-sm font-medium text-gray-600 focus:outline-none cursor-pointer ml-4">
                            <option>Any Gender</option>
                            <option>Boy</option>
                            <option>Girl</option>
                        </select>
                        <select className="bg-transparent text-sm font-medium text-gray-600 focus:outline-none cursor-pointer ml-4">
                            <option>Most Urgent</option>
                            <option>Waiting Longest</option>
                        </select>
                    </div>

                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-trust-blue focus:ring-1 focus:ring-trust-blue outline-none"
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {children.map((child) => (
                        <SponsorshipCard key={child.id} child={child} />
                    ))}
                </div>

                {/* Load More */}
                <div className="mt-12 text-center">
                    <Button variant="ghost" size="lg" className="text-trust-blue hover:text-trust-blue/80 hover:bg-trust-blue/5">
                        Load More Children
                    </Button>
                </div>
            </div>
        </div>
    );
}

import { SponsorshipCard } from "@/components/ProgramCard";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";

// Mock Data - In real app, fetch from DB
const children = [
    { id: "1", name: "Ayesha", age: 8, gender: "Female", location: "Sindh, PK", dream: "Doctor", image: "/images/impact/child1.jpg", isUrgent: true },
    { id: "2", name: "Raju", age: 10, gender: "Male", location: "Punjab, PK", dream: "Engineer", image: "/images/impact/child2.jpg" },
    { id: "3", name: "Fatima", age: 6, gender: "Female", location: "KPK, PK", dream: "Teacher", image: "/images/impact/child3.jpg", isUrgent: true },
    { id: "4", name: "Ali", age: 12, gender: "Male", location: "Balochistan, PK", dream: "Pilot", image: "/images/impact/child4.jpg" },
    { id: "5", name: "Zainab", age: 9, gender: "Female", location: "Sindh, PK", dream: "Artist", image: "/images/impact/child5.jpg" },
    { id: "6", name: "Bilal", age: 11, gender: "Male", location: "Punjab, PK", dream: "Cricketer", image: "/images/impact/child6.jpg" },
];

export default function SponsorPage() {
    return (
        <div className="min-h-screen bg-warm-bg pt-24 pb-20">

            {/* Header */}
            <div className="bg-cinematic-dark text-white py-16 mb-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-trust-blue/20 mix-blend-overlay" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Find a Child to Sponsor</h1>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto">
                        Your monthly support changes their entire world. Browse the children waiting for a guardian below.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Filter Bar */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between sticky top-24 z-30">
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

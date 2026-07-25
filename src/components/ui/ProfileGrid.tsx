"use client";

import { useState, useMemo } from "react";
import { ProfileCard, ProfileCardData } from "./ProfileCard";
import { Search, Filter, ShieldCheck, Sparkles, AlertCircle } from "lucide-react";

export interface ProfileGridProps {
    profiles: ProfileCardData[];
    variant?: "children" | "volunteers" | "teachers" | "alumni";
    heading?: string;
    description?: string;
    showSafeguardingNotice?: boolean;
}

export function ProfileGrid({
    profiles,
    variant = "children",
    heading = "Meet the Children",
    description = "Every child has a unique story, a dream, and the potential to build a brighter future through education.",
    showSafeguardingNotice = true,
}: ProfileGridProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("ALL");
    const [selectedStatus, setSelectedStatus] = useState("ALL");

    // Extract unique regions
    const regions = useMemo(() => {
        const set = new Set<string>();
        profiles.forEach((p) => {
            if (p.region) set.add(p.region);
        });
        return Array.from(set);
    }, [profiles]);

    // Filter profiles dynamically
    const filteredProfiles = useMemo(() => {
        return profiles.filter((p) => {
            const matchesSearch =
                !searchQuery ||
                p.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (p.region && p.region.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (p.dream && p.dream.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (p.currentGrade && p.currentGrade.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesRegion = selectedRegion === "ALL" || p.region === selectedRegion;
            
            const matchesStatus = 
                selectedStatus === "ALL" ||
                (selectedStatus === "WAITING" && (p.status === "WAITING" || !p.status)) ||
                (selectedStatus === "MATCHED" && p.status === "MATCHED") ||
                (selectedStatus === "ACTIVE" && (p.status === "ACTIVE" || p.status === "SPONSORED")) ||
                (selectedStatus === "GRADUATED" && (p.status === "GRADUATED" || p.status === "ALUMNI"));

            return matchesSearch && matchesRegion && matchesStatus;
        });
    }, [profiles, searchQuery, selectedRegion, selectedStatus]);

    return (
        <section className="py-20 sm:py-28 bg-warm-bg overflow-hidden" id="meet-children">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-impact-gold/15 border border-impact-gold/30 text-cinematic-dark text-sm font-bold mb-4">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        <span>Sponsorship Directory</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-cinematic-dark tracking-tight mb-4">
                        {heading}
                    </h2>
                    {description && (
                        <p className="text-lg sm:text-xl text-gray-600 font-body max-w-3xl mx-auto leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>

                {/* Safeguarding & Privacy Information Banner */}
                {showSafeguardingNotice && (
                    <div className="mb-10 bg-trust-blue/5 border border-trust-blue/20 p-4 sm:p-5 rounded-2xl flex items-start sm:items-center gap-4 max-w-4xl mx-auto shadow-sm animate-fade-in-up">
                        <div className="bg-trust-blue/10 p-2.5 rounded-xl text-trust-blue flex-shrink-0">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                            <strong className="text-cinematic-dark">Child Protection & Safeguarding:</strong> For the privacy and protection of children, representative imagery and first names are used until appropriate consent and verification have been completed.
                        </p>
                    </div>
                )}

                {/* Filter & Search Bar */}
                <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md border border-gray-100 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between animate-fade-in-up">
                    
                    {/* Search Input */}
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name, dream, region..."
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:border-trust-blue focus:ring-2 focus:ring-trust-blue/20 outline-none transition-all"
                        />
                    </div>

                    {/* Filter Controls */}
                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mr-1">
                            <Filter className="w-3.5 h-3.5" />
                            <span>Filter:</span>
                        </div>

                        {/* Region Filter */}
                        {regions.length > 0 && (
                            <select
                                value={selectedRegion}
                                onChange={(e) => setSelectedRegion(e.target.value)}
                                className="px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:bg-white focus:border-trust-blue outline-none cursor-pointer"
                            >
                                <option value="ALL">All Regions ({regions.length})</option>
                                {regions.map((r) => (
                                    <option key={r} value={r}>{r}</option>
                                ))}
                            </select>
                        )}

                        {/* Status Filter */}
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:bg-white focus:border-trust-blue outline-none cursor-pointer"
                        >
                            <option value="ALL">All Statuses</option>
                            <option value="WAITING">Waiting for Sponsor</option>
                            <option value="MATCHED">Matched</option>
                            <option value="ACTIVE">In Education</option>
                            <option value="GRADUATED">Graduated Alumni</option>
                        </select>
                    </div>
                </div>

                {/* Grid Result */}
                {filteredProfiles.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                        {filteredProfiles.map((profile) => (
                            <ProfileCard key={profile.id} profile={profile} variant={variant === "children" ? "child" : "alumni"} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 px-4 border-2 border-dashed border-gray-200 rounded-3xl bg-white max-w-2xl mx-auto">
                        <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-xl font-bold text-gray-700 mb-2">No matching profiles found</h3>
                        <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                            Try adjusting your search query or filters to discover other children in our program.
                        </p>
                        <button
                            onClick={() => { setSearchQuery(""); setSelectedRegion("ALL"); setSelectedStatus("ALL"); }}
                            className="px-6 py-2.5 bg-cinematic-dark text-white text-xs font-bold rounded-xl hover:bg-trust-blue transition-colors"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

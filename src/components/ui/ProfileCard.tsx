"use client";

import Link from "next/link";
import { Heart, MapPin, BookOpen, GraduationCap, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export interface ProfileCardData {
    id: string;
    slug?: string | null;
    displayName: string;
    age?: number | null;
    region?: string | null;
    educationLevel?: string | null;
    currentGrade?: string | null;
    schoolType?: string | null;
    progressStage?: string | null;
    dream?: string | null;
    shortIntro?: string | null;
    avatarIllustrationUrl?: string | null;
    photoUrl?: string | null;
    status?: string | null;
    safeguardingReviewStatus?: string | null;
    privacyMode?: string | null;
    impactStorySlug?: string | null;
}

export interface ProfileCardProps {
    profile: ProfileCardData;
    variant?: "child" | "volunteer" | "teacher" | "alumni" | "partner";
}

export function ProfileCard({ profile, variant = "child" }: ProfileCardProps) {
    const slug = profile.slug || profile.id;
    const firstName = profile.displayName.split(" ")[0];
    const isGraduated = profile.status === "GRADUATED" || profile.status === "ALUMNI" || variant === "alumni";
    const targetHref = isGraduated 
        ? (profile.impactStorySlug ? `/stories/${profile.impactStorySlug}` : "/impact") 
        : `/sponsor-a-child/${slug}`;

    const isMatched = profile.status === "MATCHED" || profile.progressStage?.toLowerCase().includes("matched");
    const isActive = profile.status === "ACTIVE" || profile.status === "SPONSORED";
    const isWaiting = profile.status === "WAITING" || !profile.status;

    // Status Badge Configuration
    const statusBadge = isGraduated ? (
        <div className="bg-amber-500/90 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md backdrop-blur-sm">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Graduated Alumni</span>
        </div>
    ) : isMatched ? (
        <div className="bg-blue-600/90 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md backdrop-blur-sm">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Matched</span>
        </div>
    ) : isActive ? (
        <div className="bg-emerald-600/90 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md backdrop-blur-sm">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>In Education</span>
        </div>
    ) : (
        <div className="bg-impact-gold text-cinematic-dark text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Waiting for Support</span>
        </div>
    );

    const imageUrl = profile.avatarIllustrationUrl || profile.photoUrl || `https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop`;

    return (
        <div className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col h-full hover:-translate-y-1">
            {/* 1. Photo Container */}
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                <img
                    src={imageUrl}
                    alt={firstName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Top Safeguarding Privacy Badge */}
                <div className="absolute top-3.5 right-3.5 bg-black/40 text-white/90 p-1.5 rounded-full backdrop-blur-md border border-white/10" title="Safeguarded Child Profile">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                    {/* Name & Age */}
                    <div>
                        <h3 className="text-2xl font-bold font-heading text-cinematic-dark group-hover:text-impact-gold transition-colors flex items-baseline gap-2">
                            {firstName}
                            {profile.age && <span className="text-sm font-semibold text-gray-500">({profile.age} yrs)</span>}
                        </h3>
                    </div>

                    {/* Prominent Dream Career Pill - Always Displayed */}
                    <div className="bg-amber-50 border border-amber-200/80 rounded-xl px-3.5 py-2 text-xs font-bold text-amber-900 flex items-center gap-1.5 shadow-sm">
                        <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        <span>Dream Career: &ldquo;{profile.dream || "Teacher"}&rdquo;</span>
                    </div>

                    {/* Location / Region */}
                    {profile.region && (
                        <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-impact-gold flex-shrink-0" />
                            <span>{profile.region}</span>
                        </p>
                    )}

                    {/* Short Intro / Story snippet */}
                    {profile.shortIntro && (
                        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed font-body italic">
                            &ldquo;{profile.shortIntro}&rdquo;
                        </p>
                    )}
                </div>

                {/* Status & Primary Action Button */}
                <div className="pt-3 border-t border-gray-100 space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status</span>
                        {statusBadge}
                    </div>

                    <Link
                        href={targetHref}
                        className={`group/btn w-full py-3.5 px-5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-sm ${
                            isGraduated
                                ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20'
                                : 'bg-cinematic-dark hover:bg-trust-blue text-white group-hover:shadow-lg'
                        }`}
                    >
                        <span>{isGraduated ? 'Read Impact Story' : `Meet ${firstName}`}</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { BookOpen, MapPin, Pickaxe } from "lucide-react";

export function SponsorshipImpactTiers({ data }: { data?: any }) {
    const meta = data?.metadata || {};
    const heading = meta.heading || "Give in the Way That Works for You";
    const description = meta.description || "The idea remains simple: Give $1 a day. When you are ready to sponsor, you may choose the payment arrangement that works best for you.";
    
    // We expect the image from the CMS payload.
    const image1 = meta.image1 || "/images/placeholders/classroom.jpg";
    const image2 = meta.image2 || "/images/placeholders/hero.jpg";
    const image3 = meta.image3 || "/images/placeholders/transparency.jpg";

    return (
        <section className="bg-[#f9f9f9] py-24 md:py-32 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#111827] mb-6 whitespace-pre-line">
                        {heading}
                    </h2>
                    <p className="text-lg md:text-xl text-[#4b5563] leading-relaxed font-body whitespace-pre-line">
                        {description}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
                    
                    {/* Monthly */}
                    <div className="bg-white rounded-xl border border-gray-100 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group animate-fade-in-up shadow-md relative overflow-hidden">
                        <div className="p-8">
                            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
                                <BookOpen className="w-6 h-6 text-[#2563eb]" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#111827] mb-4">Monthly Sponsorship</h3>
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-4xl font-bold text-[#111827]">$30</span>
                                <span className="text-sm font-medium text-gray-500">per month</span>
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed mb-8 italic">
                                Represents approximately one dollar a day. Provides consistent monthly support for a child's educational journey.
                            </p>
                            <Link href="/sponsor?type=monthly" className="block w-full text-center py-3 px-6 rounded-lg bg-white text-[#2563eb] font-bold border-2 border-[#2563eb] hover:bg-blue-50 transition-all duration-300">
                                Give Monthly
                            </Link>
                        </div>
                    </div>

                    {/* Annual - Highlighted */}
                    <div className="bg-[#111827] rounded-xl border border-[#1f2937] flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group animate-fade-in-up shadow-xl relative overflow-hidden transform scale-105 z-10">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#fdc700] text-[#111827] text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-b-md z-20">
                            Most Selected
                        </div>
                        <div className="p-8">
                            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-6 border border-gray-700">
                                <MapPin className="w-6 h-6 text-[#fdc700]" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Annual Sponsorship</h3>
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-4xl font-bold text-white">$365</span>
                                <span className="text-sm font-medium text-gray-400">per year</span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed mb-8 italic">
                                Equivalent to one dollar for every day of the year. Secures a child's education for a full academic cycle in one meaningful gift.
                            </p>
                            <Link href="/sponsor?type=annual" className="block w-full text-center py-3 px-6 rounded-lg bg-[#fdc700] text-[#111827] font-bold hover:bg-yellow-400 transition-all duration-300">
                                Give Annually
                            </Link>
                        </div>
                    </div>

                    {/* Complete Education */}
                    <div className="bg-white rounded-xl border border-gray-100 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group animate-fade-in-up shadow-md relative overflow-hidden">
                        <div className="p-8">
                            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-6">
                                <Pickaxe className="w-6 h-6 text-[#10b981]" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#111827] mb-4">Complete Education Journey</h3>
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-4xl font-bold text-[#111827]">Calculated</span>
                                <span className="text-sm font-medium text-gray-500">one-time</span>
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed mb-8 italic">
                                Funds the remaining education of a child based on grade level and local educational costs, ensuring they reach graduation without interruption.
                            </p>
                            <Link href="/sponsor?type=complete" className="block w-full text-center py-3 px-6 rounded-lg bg-white text-[#10b981] font-bold border-2 border-[#10b981] hover:bg-emerald-50 transition-all duration-300">
                                Fund a Complete Education
                            </Link>
                        </div>
                    </div>

                </div>

                <div className="mt-16 text-center animate-fade-in-up delay-300">
                    <p className="text-[#4b5563] font-medium border-b border-gray-300 inline-block pb-1">
                        <Link href="/checkout?type=general" className="hover:text-[#111827] transition-colors">
                            Want to make a single contribution? Give a one-time gift here.
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}

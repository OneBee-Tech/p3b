import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, MapPin, GraduationCap, Users, ShieldCheck, Heart } from "lucide-react";
import Link from "next/link";

export default function ChildProfilePage({ params }: { params: { childId: string } }) {
    // Mock Data - In real app, fetch from DB using params.childId
    const child = {
        id: params.childId,
        name: "Ayesha",
        age: 8,
        location: "Sindh, Pakistan",
        dream: "Doctor",
        story: "Ayesha wakes up at 5 AM every morning to fetch water from a well 2km away. Despite this, she never misses her makeshift school under the Banyan tree. Her father is a daily wage laborer who struggles to put food on the table, let alone pay for books.",
        image: "/images/impact/child1.jpg",
        school: "Hope Community School, Dadu",
        fundingStatus: 40, // percentage funded
    };

    return (
        <div className="min-h-screen bg-warm-bg pb-20">

            {/* Hero / Header with Image */}
            <div className="relative h-[60vh] md:h-[70vh] w-full bg-gray-900">
                <Image
                    src={child.image}
                    alt={child.name}
                    fill
                    className="object-cover opacity-80"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cinematic-dark via-cinematic-dark/40 to-transparent" />

                <div className="absolute top-24 left-4 md:left-8 z-20">
                    <Link href="/sponsor" className="inline-flex items-center text-white/80 hover:text-white transition-colors bg-black/20 hover:bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Children
                    </Link>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="inline-block bg-impact-gold text-cinematic-dark font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider mb-4 animate-fade-in">
                            Waiting for 240 Days
                        </div>
                        <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-2 drop-shadow-lg">
                            {child.name}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-white/90 text-lg font-medium">
                            <span className="flex items-center gap-2"><MapPin className="w-5 h-5 text-trust-blue" /> {child.location}</span>
                            <span className="flex items-center gap-2"><GraduationCap className="w-5 h-5 text-emerald-400" /> Wants to be a {child.dream}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Story Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-xl p-8 shadow-xl border border-gray-100">
                            <h2 className="text-2xl font-heading font-bold text-cinematic-dark mb-6">Her Story</h2>
                            <p className="text-gray-700 leading-relaxed text-lg mb-6">
                                {child.story}
                            </p>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                With your support, Ayesha won't just go to school—she'll have the uniforms, books, and nutrition she needs to focus on her dreams instead of survival. This is more than a donation; it's a destiny rewritten.
                            </p>
                        </div>

                        {/* Impact Breakdown */}
                        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-heading font-bold text-cinematic-dark mb-6">How Your $30 Helps</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-600">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-gray-900">Education</h3>
                                    <p className="text-xs text-gray-500 mt-1">Tuition, books & supplies</p>
                                </div>
                                <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 text-trust-blue">
                                        <Heart className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-gray-900">Health</h3>
                                    <p className="text-xs text-gray-500 mt-1">Regular checkups & meals</p>
                                </div>
                                <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 text-purple-600">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-gray-900">Protection</h3>
                                    <p className="text-xs text-gray-500 mt-1">Safe environment</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Donation Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl p-6 shadow-xl border border-gray-100 sticky top-24">
                            <h3 className="text-xl font-heading font-bold text-cinematic-dark mb-2">Sponsor {child.name}</h3>
                            <p className="text-sm text-gray-500 mb-6">Join 3 other partial sponsors to fully fund her education.</p>

                            {/* Progress Bar */}
                            <div className="mb-8">
                                <div className="flex justify-between text-xs font-bold mb-2">
                                    <span className="text-trust-blue">{child.fundingStatus}% Funded</span>
                                    <span className="text-gray-400">Goal: 100%</span>
                                </div>
                                <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                                    <div className="bg-trust-blue h-full w-[40%]" />
                                </div>
                            </div>

                            {/* Options */}
                            <div className="space-y-3 mb-6">
                                <button className="w-full flex items-center justify-between p-4 border-2 border-trust-blue bg-blue-50/50 rounded-lg text-left transition-all relative">
                                    <span className="font-bold text-trust-blue">Full Sponsorship</span>
                                    <span className="font-bold">$30<span className="text-xs font-normal text-gray-500">/mo</span></span>
                                    <div className="absolute -top-3 -right-2 bg-impact-gold text-[10px] font-bold px-2 py-0.5 rounded text-cinematic-dark">MOST POPULAR</div>
                                </button>
                                <button className="w-full flex items-center justify-between p-4 border border-gray-200 hover:border-trust-blue rounded-lg text-left transition-all">
                                    <span className="font-bold text-gray-700">Partial Support</span>
                                    <span className="font-bold">$15<span className="text-xs font-normal text-gray-500">/mo</span></span>
                                </button>
                            </div>

                            <Button variant="impact" size="lg" className="w-full py-6 text-lg shadow-lg">
                                Unite with {child.name}
                            </Button>

                            <p className="text-xs text-center text-gray-400 mt-4 flex items-center justify-center gap-1">
                                <ShieldCheck className="w-3 h-3" /> Secure SSL Payment
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

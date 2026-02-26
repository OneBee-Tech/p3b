import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, BookOpen, ShieldCheck, DollarSign, AlertCircle } from "lucide-react";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ChildSponsorPage({ params }: { params: Promise<{ childId: string }> }) {
    const { childId } = await params;

    const child = await prisma.registryChild.findUnique({
        where: {
            id: childId,
            isArchived: false,
            deletedAt: null,
        },
    });

    if (!child) return notFound();

    const monthlyAmount = Number(child.sponsorshipNeededMonthly);

    return (
        <main className="min-h-screen bg-warm-bg pb-20">
            {/* Header */}
            <div className="bg-cinematic-dark text-white pt-32 pb-12 mb-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-trust-blue/20 mix-blend-overlay" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link href="/programs" className="text-white/60 hover:text-white transition-colors text-sm font-medium mb-6 inline-block">
                        &larr; Back to all children
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Sponsor {child.displayName}</h1>
                    <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-white/80">
                        <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-trust-blue" /> {child.region}</span>
                        <span className="flex items-center gap-2">&bull; {child.age} Years Old</span>
                        <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-impact-gold" /> {child.educationLevel}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Left Column: Story */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold font-heading text-cinematic-dark mb-6">About {child.displayName}</h2>
                            {(child as any).story ? (
                                <div className="prose prose-lg text-gray-600 prose-p:leading-relaxed">
                                    {(child as any).story.split('\n\n').map((paragraph: string, index: number) => (
                                        <p key={index} className="mb-4">{paragraph}</p>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400 italic">Case details are being prepared. Check back soon.</p>
                            )}
                        </div>

                        <div className="bg-warm-ivory p-8 rounded-2xl border border-impact-gold/30">
                            <h3 className="font-bold text-impact-gold mb-3 flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5" /> How Your Sponsorship Works
                            </h3>
                            <p className="text-cinematic-dark text-sm leading-relaxed mb-4">
                                100% of your ${monthlyAmount.toFixed(0)}/month contribution is structurally allocated to {child.displayName}'s ecosystem. Private donors cover our operational overhead, ensuring your funds are deployed exclusively for tuition, preventative health, and localized family support.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-700 font-medium">
                                <li className="flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-trust-blue before:rounded-full">Guaranteed school enrollment and unbroken tuition coverage</li>
                                <li className="flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-trust-blue before:rounded-full">Provision of all required textbooks, uniforms, and scholastic materials</li>
                                <li className="flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-trust-blue before:rounded-full">Access to the school's nutritional feeding program</li>
                            </ul>
                        </div>

                        {child.safeguardingReviewStatus === "PENDING" && (
                            <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                                <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-yellow-700 font-medium">
                                    Safeguarding review in progress. This profile is visible for sponsorship interest but will be activated once verified.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Avatar & CTA */}
                    <div className="lg:col-span-5 sticky top-24">
                        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                            {/* Avatar Presentation */}
                            <div className="relative aspect-square bg-[#eceff4] p-8 flex items-center justify-center">
                                <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md rounded px-3 py-1.5 text-[10px] font-bold text-gray-600 uppercase tracking-wider shadow-sm z-10 border border-gray-200">
                                    Symbolic Representation
                                </div>
                                <button className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm z-10">
                                    <Heart className="w-5 h-5" />
                                </button>

                                <img
                                    src={child.avatarIllustrationUrl || `https://api.dicebear.com/9.x/micah/svg?seed=${child.id}&backgroundColor=transparent`}
                                    alt={child.displayName}
                                    className="w-full h-full max-w-[80%] max-h-[80%] object-contain"
                                />
                            </div>

                            {/* Monthly Cost display */}
                            <div className="flex items-center justify-between px-8 py-4 bg-gray-50 border-t border-gray-100">
                                <span className="text-sm font-bold text-gray-500">Monthly Sponsorship</span>
                                <span className="text-2xl font-bold text-cinematic-dark flex items-center gap-1">
                                    <DollarSign className="w-5 h-5" />{monthlyAmount.toFixed(0)}
                                </span>
                            </div>

                            {/* Sponsorship Actions */}
                            <div className="p-8 bg-white">
                                <Link href={`/checkout?type=sponsorship&childId=${child.id}`} className="block w-full">
                                    <Button variant="impact" size="lg" className="w-full font-bold text-lg py-6 shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
                                        Sponsor {child.displayName} Now
                                    </Button>
                                </Link>

                                <p className="text-xs text-center text-gray-400 mt-6 font-medium">
                                    By sponsoring {child.displayName}, you'll receive quarterly updates and verifiable impact reports detailing exactly how your funds are utilized.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}

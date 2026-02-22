import Image from "next/image";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ChevronLeft, MapPin, GraduationCap, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { TransparencyAlert } from "@/components/TransparencyAlert";
import { DonationProgressCard } from "@/components/DonationProgressCard";

export async function generateMetadata({ params }: { params: Promise<{ childId: string }> }): Promise<Metadata> {
    const { childId } = await params;
    const child = await prisma.child.findUnique({
        where: { id: childId },
        include: { program: true }
    });

    if (!child) return { title: "Not Found" };

    return {
        title: `Sponsor ${child.name} - OneDollarOneChild`,
        description: `Support ${child.name}'s education and future in ${child.region} through our secure child sponsorship program.`,
        openGraph: {
            title: `Sponsor ${child.name} - OneDollarOneChild`,
            description: `Support ${child.name}'s education and future in ${child.region} through our secure child sponsorship program.`,
            type: "website",
            images: child.photoUrl ? [{ url: child.photoUrl }] : [],
        },
    };
}

export default async function ChildProfilePage({ params }: { params: Promise<{ childId: string }> }) {
    // 1. Data Fetching
    const { childId } = await params;
    const child = await prisma.child.findUnique({
        where: { id: childId },
        include: {
            program: true,
            school: true,
            sponsorships: true,
            updates: {
                where: { moderationStatus: 'APPROVED' },
                orderBy: { createdAt: 'desc' }
            }
        }
    });

    if (!child || !child.program) {
        notFound();
    }

    // 2. Funding Logic (Program Level)
    const program = child.program;
    const fundingCurrent = Number(program.fundingCurrent);
    const fundingGoal = Number(program.fundingGoal);
    const isFullyFundedOrLocked = program.isLocked || fundingCurrent >= fundingGoal || program.status === 'FULLY_FUNDED';
    const programProgress = Math.min(100, Math.round((fundingCurrent / fundingGoal) * 100)) || 0;

    // 6. SEO & Structured Data (JSON-LD)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": ["Person", "NGO"],
        "name": child.name,
        "description": child.bio,
        "memberOf": {
            "@type": "NGO",
            "name": program.name,
            "description": program.description
        },
        "location": {
            "@type": "Place",
            "name": child.region
        }
    };

    return (
        <div className="min-h-screen bg-warm-bg pb-20">
            {/* Inject JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero / Header with Image */}
            <div className="relative h-[60vh] md:h-[70vh] w-full bg-gray-900">
                <Image
                    src={child.photoUrl || "/images/impact/placeholder.jpg"}
                    alt={`Photo of ${child.name} from ${child.region}`}
                    fill
                    className="object-cover opacity-80"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cinematic-dark via-cinematic-dark/40 to-transparent" />

                {/* Privacy Disclaimer */}
                <div className="absolute top-4 right-4 bg-cinematic-dark/80 backdrop-blur-md rounded-lg p-2 border border-white/20 text-xs text-white/80 text-right z-20">
                    Images are representative. Child identities are protected for safety.
                </div>

                <div className="absolute top-24 left-4 md:left-8 z-20">
                    <Link href="/programs" className="inline-flex items-center text-white/80 hover:text-white transition-colors bg-black/20 hover:bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Communities
                    </Link>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-20">
                    <div className="max-w-7xl mx-auto">
                        {child.status === 'WAITING' && (
                            <div className="inline-block bg-impact-gold text-cinematic-dark font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider mb-4 animate-fade-in">
                                Urgently Waiting
                            </div>
                        )}
                        <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-2 drop-shadow-lg">
                            {child.name}, {new Date().getFullYear() - child.dob.getFullYear()}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-white/90 text-lg font-medium">
                            <span className="flex items-center gap-2"><MapPin className="w-5 h-5 text-trust-blue" /> {child.region}</span>
                            <span className="flex items-center gap-2" aria-label={`Dreams of being a ${child.educationLevel}`}><GraduationCap className="w-5 h-5 text-emerald-400" /> Education Level: {child.educationLevel}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content Component */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* 3. Transparency Disclosure Panel */}
                        <TransparencyAlert
                            programName={program.name}
                            childName={child.name}
                        />

                        {/* Story & Bio */}
                        <div className="bg-white rounded-xl p-8 shadow-xl border border-gray-100">
                            <h2 className="text-2xl font-heading font-bold text-cinematic-dark mb-6">Meet {child.name}</h2>
                            <p className="text-gray-700 leading-relaxed text-lg mb-6 whitespace-pre-line">
                                {child.story || child.bio}
                            </p>
                        </div>

                        {/* 4. Program Context Card */}
                        <DonationProgressCard
                            title={program.name}
                            description={program.description}
                            currentAmount={fundingCurrent}
                            goalAmount={fundingGoal}
                        />

                        {/* 5. Media Governance / Updates */}
                        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-heading font-bold text-cinematic-dark mb-6">Field Updates</h2>
                            {child.updates && child.updates.length > 0 ? (
                                <div className="space-y-6">
                                    {child.updates.map((post: any) => (
                                        <div key={post.id} className="border-l-2 border-trust-blue pl-4">
                                            <p className="text-xs text-gray-500 mb-1">{post.createdAt.toLocaleDateString()}</p>
                                            <h4 className="font-bold text-gray-900">{post.title}</h4>
                                            <p className="text-sm text-gray-700 mt-2">{post.content}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500 italic bg-gray-50 p-4 rounded-lg border border-gray-100">
                                    Impact updates will be shared once verified by our field partners.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Donation Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl p-6 shadow-xl border border-gray-100 sticky top-24">
                            <h3 className="text-xl font-heading font-bold text-cinematic-dark mb-2">Child Sponsorship</h3>
                            <p className="text-sm text-gray-500 mb-6">
                                Support the <strong className="text-cinematic-dark">{program.name}</strong> to empower {child.name} and their classmates.
                            </p>

                            {/* Progress Bar (Program Level) */}
                            <div className="mb-8">
                                <div className="flex justify-between text-xs font-bold mb-2">
                                    <span className="text-trust-blue">{programProgress}% Funded</span>
                                    <span className="text-gray-400">Goal: ${fundingGoal.toLocaleString()}</span>
                                </div>
                                <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                                    <div className="bg-trust-blue h-full transition-all duration-1000" style={{ width: `${programProgress}%` }} />
                                </div>
                            </div>

                            {/* Options */}
                            <div className="space-y-3 mb-6">
                                <button className="w-full flex items-center justify-between p-4 border-2 border-trust-blue bg-blue-50/50 rounded-lg text-left transition-all relative" aria-label="Select full sponsorship">
                                    <span className="font-bold text-trust-blue">Full Sponsorship</span>
                                    <span className="font-bold">${Number(child.annualCost) / 12 || 30}<span className="text-xs font-normal text-gray-500">/mo</span></span>
                                    <div className="absolute -top-3 -right-2 bg-impact-gold text-[10px] font-bold px-2 py-0.5 rounded text-cinematic-dark">MOST POPULAR</div>
                                </button>
                            </div>

                            {/* 7. CTA Logic */}
                            {isFullyFundedOrLocked ? (
                                <Button variant="outline" size="lg" className="w-full py-6 text-lg border-gray-300 text-gray-500" disabled aria-label="Program Fully Funded">
                                    Program Fully Funded
                                </Button>
                            ) : (
                                <Link href={`/checkout?programId=${program.id}&childId=${child.id}`} className="w-full block">
                                    <Button variant="impact" size="lg" className="w-full py-6 text-lg shadow-lg" aria-label="Sponsor This Child">
                                        Sponsor {child.name}
                                    </Button>
                                </Link>
                            )}

                            {isFullyFundedOrLocked && (
                                <Link href="/waitlist" className="block mt-3">
                                    <Button variant="impact" size="sm" className="w-full">
                                        Join Waitlist for New Openings
                                    </Button>
                                </Link>
                            )}

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

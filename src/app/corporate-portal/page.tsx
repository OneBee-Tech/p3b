import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Building2, FileText, Lock, Globe, CheckCircle2, FileBarChart } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Corporate Portal | NGO Impact",
    description: "Secure ESG report access and child sponsorship tracking for corporate partners.",
};

export default async function CorporatePortalPage() {
    const session = await auth();

    // 1. Portal Authentication Security
    if (!session?.user) {
        redirect("/login");
    }

    // Derive Sponsor Identity strictly from session mapping, not URL parameters
    const sponsor = await prisma.corporateSponsor.findUnique({
        where: { userId: session.user.id },
        include: {
            allocations: {
                where: { revokedAt: null },
                include: {
                    registryChild: {
                        select: {
                            id: true,
                            displayName: true,
                            age: true,
                            region: true,
                            educationLevel: true,
                            privacyMode: true,
                            avatarIllustrationUrl: true,
                            // 2. Safeguarding Visibility Enforcement
                            // We explicitly DO NOT fetch `caseNotes` here.
                            // `story` and `status` are permitted based on privacy mode later on.
                            story: true,
                            status: true
                        }
                    }
                }
            },
            impactSnapshots: {
                orderBy: { generatedAt: "desc" }
            }
        }
    }) as any;

    if (!sponsor) {
        // Not a mapped corporate partner user
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-md mx-auto">
                <Lock className="w-16 h-16 text-white/20 mb-6" />
                <h1 className="text-2xl font-heading font-bold text-white mb-2">Access Restricted</h1>
                <p className="text-white/60">
                    Your account is not currently linked to an active Corporate Partnership. If you believe this is an error, please contact your account manager.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cinematic-dark py-12 px-4">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-trust-blue/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

                    <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-trust-blue/20 text-trust-blue border border-trust-blue/30 rounded-full text-xs font-bold tracking-wider mb-4">
                                <Building2 className="w-3 h-3" />
                                CORPORATE PORTAL
                            </div>
                            <h1 className="text-4xl font-heading font-bold text-white mb-2">{sponsor.organizationName}</h1>
                            <div className="flex items-center gap-4 text-white/60">
                                <p>ESG & CSR Impact Repository</p>
                                <span>•</span>
                                <p className="flex items-center gap-1">
                                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                                    {sponsor.status}
                                </p>
                            </div>
                        </div>

                        <div className="bg-black/40 backdrop-blur-sm border border-white/10 p-4 rounded-xl text-center min-w-[160px]">
                            <div className="text-sm font-medium text-white/50 mb-1">Sponsored Children</div>
                            <div className="text-4xl font-mono font-bold text-trust-blue">{sponsor.allocations.length}</div>
                        </div>
                    </div>
                </div>

                {/* ESG Reports Section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <FileBarChart className="w-6 h-6 text-impact-gold" />
                        <h2 className="text-2xl font-heading font-bold text-white">ESG Impact Reports</h2>
                    </div>

                    {sponsor.impactSnapshots.length === 0 ? (
                        <div className="border border-white/10 border-dashed rounded-2xl p-8 text-center bg-white/5">
                            <p className="text-white/60">No ESG Impact Reports have been generated for {sponsor.organizationName} yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {sponsor.impactSnapshots.map((snapshot: any) => (
                                <div key={snapshot.id} className="bg-white/5 hover:bg-white/10 transition-colors border border-white/10 rounded-xl p-5 group flex flex-col justify-between h-full">
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="px-2.5 py-1 bg-white/10 text-white rounded text-xs font-medium">
                                                {/* We don't have triggerType in this schema iteration, rendering default */}
                                                ESG SNAPSHOT
                                            </div>
                                            <span className="text-xs text-white/40 font-mono">
                                                {new Date(snapshot.generatedAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <h3 className="font-medium text-white mb-2">Impact Report &mdash; {new Date(snapshot.generatedAt).toLocaleString('default', { month: 'short', year: 'numeric' })}</h3>

                                        <div className="space-y-2 mt-4 text-sm">
                                            <div className="flex justify-between border-b border-white/5 pb-2">
                                                <span className="text-white/50">Children Supported</span>
                                                <span className="text-white font-mono">{snapshot.childrenSponsored || 0}</span>
                                            </div>
                                            <div className="flex justify-between pt-1">
                                                <span className="text-white/50">Active Sponsorships</span>
                                                <span className="text-trust-blue font-mono">{snapshot.activeSponsorships || 0}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <a
                                        href={`#download-${snapshot.id}`}
                                        className="mt-6 flex items-center justify-center gap-2 w-full py-2.5 bg-trust-blue/20 hover:bg-trust-blue/30 text-trust-blue font-medium rounded-lg transition-colors border border-trust-blue/20"
                                    >
                                        <FileText className="w-4 h-4" />
                                        Download PDF
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Supported Beneficiaries List */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Globe className="w-6 h-6 text-trust-blue" />
                            <h2 className="text-2xl font-heading font-bold text-white">Supported Beneficiaries</h2>
                        </div>
                        <span className="text-sm text-white/40 flex items-center gap-1">
                            <Lock className="w-3 h-3" /> Safeguarding Filters Active
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {sponsor.allocations.map((alloc: any) => {
                            const child = alloc.registryChild;
                            // Safeguarding Visibility Implementation:
                            // Strip narratives & specific locations if privacy mode is HIGH or SPONSOR_ONLY.
                            const isHighPrivacy = child.privacyMode === "HIGH" || child.privacyMode === "SPONSOR_ONLY";

                            return (
                                <div key={child.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors flex flex-col">
                                    <div className="aspect-[4/3] bg-black/50 relative overflow-hidden group">
                                        {child.avatarIllustrationUrl ? (
                                            <Image
                                                src={child.avatarIllustrationUrl}
                                                alt={child.displayName}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-white/20">
                                                No Image
                                            </div>
                                        )}
                                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs text-white border border-white/10 flex items-center gap-1">
                                            {isHighPrivacy && <Lock className="w-3 h-3 text-impact-gold" />}
                                            {isHighPrivacy ? 'Protected' : 'Standard'}
                                        </div>
                                    </div>

                                    <div className="p-4 flex-1 flex flex-col">
                                        <h3 className="font-bold text-lg text-white mb-3">{child.displayName}</h3>

                                        <div className="space-y-2 text-sm flex-1">
                                            <div className="flex justify-between items-center text-white/70">
                                                <span className="text-white/40 text-xs uppercase tracking-wider">Age</span>
                                                <span>{child.age} yrs</span>
                                            </div>
                                            <div className="flex justify-between items-center text-white/70">
                                                <span className="text-white/40 text-xs uppercase tracking-wider">Education</span>
                                                <span>{child.educationLevel.replace('_', ' ')}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-white/70 pt-2 border-t border-white/5">
                                                <span className="text-white/40 text-xs uppercase tracking-wider">Region</span>
                                                {/* Redact accurate region on High Privacy */}
                                                <span>{isHighPrivacy ? 'Sub-Saharan Africa' : child.region}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}


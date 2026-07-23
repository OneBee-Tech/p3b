import { getGlobalSettings } from "@/lib/services/globalSettingsService";
import { Metadata } from "next";
import { ShieldCheck, Download, FileText } from "lucide-react";
import prisma from "@/lib/prisma";
import { TrustBadgeStrip } from "@/components/TrustBadgeStrip";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getGlobalSettings();
    return {
        title: `Financial Transparency - ${settings.organizationName}`,
        description: `Explore our commitment to full financial transparency, audited reports, and governance at ${settings.organizationName}.`,
    };
}

export const revalidate = 60;

export default async function TransparencyPage() {
    const settings = await getGlobalSettings();
    const documents = await prisma.verificationDocument.findMany({
        where: {
            entityType: "DOCUMENT",
            status: "VERIFIED"
        },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <main className="min-h-screen bg-gray-50">
            <section className="bg-cinematic-dark text-white pt-36 pb-24 mb-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">Financial Transparency</h1>
                    <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
                        Our absolute commitment to accountability, safeguarding, and immutable ledger operations.
                    </p>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="space-y-12">
                    <div className="bg-white p-8 md:p-12 border border-gray-100 shadow-sm rounded-3xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="bg-blue-50 text-trust-blue p-4 rounded-full">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl font-bold font-heading text-cinematic-dark">Financial Responsibility</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed max-w-3xl text-lg">
                            {settings.transparencyWording}
                        </p>
                    </div>

                    <div className="bg-white p-8 md:p-12 border border-gray-100 shadow-sm rounded-3xl">
                        <div className="mb-10">
                            <h3 className="text-2xl font-bold font-heading text-cinematic-dark">Governance & Reporting</h3>
                            <p className="text-gray-500 mt-2">Access our latest audited financials and partnership certifications.</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {documents.map((doc) => {
                                let title = "Compliance Document";
                                let version = "";
                                let cleanUrl = doc.documentUrl;

                                try {
                                    const urlObj = new URL(doc.documentUrl);
                                    title = urlObj.searchParams.get("title") || "Compliance Document";
                                    version = urlObj.searchParams.get("v") || "";
                                    const displayUrlObj = new URL(doc.documentUrl);
                                    displayUrlObj.search = "";
                                    cleanUrl = displayUrlObj.toString();
                                } catch (e) {
                                    // Fallback
                                }

                                return (
                                    <a key={doc.id} href={cleanUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-trust-blue/30 hover:bg-trust-blue/5 transition-all group">
                                        <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-white group-hover:text-trust-blue transition-colors">
                                            <ShieldCheck className="w-5 h-5 text-gray-500 group-hover:text-trust-blue" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-sm text-cinematic-dark group-hover:text-trust-blue transition-colors truncate" title={title}>{title}</p>
                                            <span className="text-xs text-gray-400 font-medium">Verified PDF {version ? `(v${version})` : ''}</span>
                                        </div>
                                        <Download className="w-4 h-4 text-gray-300 flex-shrink-0 group-hover:text-trust-blue transition-colors" />
                                    </a>
                                );
                            })}

                            {documents.length === 0 && (
                                <div className="col-span-full p-8 text-center bg-gray-50 rounded-2xl border border-gray-100">
                                    <FileText className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500 font-medium">Live governance synchronization pending.</p>
                                    <p className="text-sm text-gray-400">Institutional documents are currently under review by our compliance node.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

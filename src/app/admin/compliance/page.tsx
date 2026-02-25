import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { ShieldCheck, Upload, Trash2, FileText, CheckCircle2 } from "lucide-react";
import { submitComplianceDocument, archiveComplianceDocument } from "./actions";

export const dynamic = "force-dynamic";

export default async function ComplianceManagerPage() {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") return null;

    const documents = await prisma.verificationDocument.findMany({
        where: {
            entityType: "DOCUMENT",
            status: "VERIFIED"
        },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-heading font-bold text-white mb-2">Compliance Documents</h1>
                <p className="text-white/60">Upload and manage NGO safeguarding policies, financial audits, and registration certs.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Upload Form */}
                <div className="lg:col-span-1">
                    <form action={submitComplianceDocument} className="bg-white/5 border border-white/10 rounded-3xl p-6 lg:p-8 space-y-6 sticky top-24">
                        <div>
                            <div className="w-12 h-12 bg-impact-gold/10 rounded-2xl flex items-center justify-center mb-4 border border-impact-gold/20">
                                <Upload className="w-6 h-6 text-impact-gold" />
                            </div>
                            <h2 className="text-xl font-bold text-white mb-1">Ingest Policy Document</h2>
                            <p className="text-xs text-white/50">These files are immediately replicated to the public Transparency/Impact page.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/70">Document Title</label>
                                <input type="text" name="title" required placeholder="e.g. 2026 Child Safeguarding Policy" className="w-full bg-cinematic-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-trust-blue transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/70">Secure PDF / Media URL</label>
                                <input type="url" name="documentUrl" required placeholder="https://..." className="w-full bg-cinematic-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-trust-blue transition-colors" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-wider font-bold text-white/50">Version (Opt)</label>
                                    <input type="text" name="versionNumber" placeholder="v2.1" className="w-full bg-cinematic-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-trust-blue transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-wider font-bold text-white/50">Effective Date</label>
                                    <input type="date" name="effectiveDate" className="w-full bg-cinematic-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-trust-blue transition-colors" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-wider font-bold text-white/50">Expiry Date (Opt)</label>
                                <input type="date" name="expiryDate" className="w-full bg-cinematic-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-trust-blue transition-colors" />
                            </div>
                        </div>

                        <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-trust-blue hover:bg-trust-blue/90 text-white rounded-xl font-bold transition-all shadow-xl hover:-translate-y-1 mt-4">
                            Publish to Ledger
                        </button>
                    </form>
                </div>

                {/* Directory */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex gap-4">
                        <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                        <div>
                            <p className="text-sm text-white font-medium">Compliance Node Active</p>
                            <p className="text-xs text-white/70">Documents below are currently served explicitly to the global `/impact` route for transparency auditing.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {documents.map((doc) => {
                            // Extract metadata baked safely into URL due to strict isolated schema governance rules
                            let title = "Unknown Document";
                            let version = "";
                            let effective = "";
                            let expiry = "";
                            let cleanUrl = doc.documentUrl;

                            try {
                                const urlObj = new URL(doc.documentUrl);
                                title = urlObj.searchParams.get("title") || "Untitled Compliance File";
                                version = urlObj.searchParams.get("v") || "1.0";
                                effective = urlObj.searchParams.get("effective") || "";
                                expiry = urlObj.searchParams.get("expiry") || "";

                                // Generate a viewable URL without metadata clutter if possible, else just use raw
                                const displayUrlObj = new URL(doc.documentUrl);
                                displayUrlObj.search = "";
                                cleanUrl = displayUrlObj.toString();
                            } catch (e) {
                                // Default fallback if URL parsing failed
                            }

                            return (
                                <div key={doc.id} className="bg-white/5 border border-white/10 hover:border-white/20 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <FileText className="w-6 h-6 text-white/50" />
                                        </div>
                                        <div>
                                            <a href={cleanUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:text-trust-blue transition-colors text-lg inline-flex items-center gap-2">
                                                {title}
                                            </a>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                                                <span className="text-xs font-mono text-impact-gold bg-impact-gold/10 px-2 py-0.5 rounded">v{version}</span>
                                                <span className="text-xs text-white/40 border border-white/10 px-2 py-0.5 rounded flex items-center gap-1">
                                                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                                                    Verified
                                                </span>
                                                {effective && <span className="text-xs text-white/50 mt-1 sm:mt-0">Effective: {effective}</span>}
                                                {expiry && <span className="text-xs text-rose-400 mt-1 sm:mt-0">Expires: {expiry}</span>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 sm:self-start">
                                        <form action={async () => {
                                            "use server";
                                            await archiveComplianceDocument(doc.id);
                                        }}>
                                            <button type="submit" className="p-2 text-white/30 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-colors border border-transparent hover:border-rose-400/30" title="Revoke & Archive Document">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            );
                        })}

                        {documents.length === 0 && (
                            <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10 border-dashed">
                                <ShieldCheck className="w-12 h-12 text-white/20 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-white/70">No Compliance Assets Linked</h3>
                                <p className="text-sm text-white/50 max-w-sm mx-auto mt-2">Upload institutional safeguarding maps or financial transparency filings to populate the public ledger.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

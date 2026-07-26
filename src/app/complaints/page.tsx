import { Metadata } from "next";
import { getGlobalSettings } from "@/lib/services/globalSettingsService";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getGlobalSettings();
    return {
        title: `Complaints Policy & Feedback - ${settings.organizationName}`,
        description: `Our transparent institutional procedure for reviewing concerns, feedback, and complaints at ${settings.organizationName}.`,
    };
}

export default async function ComplaintsPolicyPage() {
    const settings = await getGlobalSettings();

    return (
        <main className="min-h-screen bg-warm-bg pb-24">
            <div className="bg-cinematic-dark text-white pt-36 pb-20 relative overflow-hidden mb-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white">Complaints Policy & Feedback</h1>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto font-body">
                        How we receive, investigate, and resolve donor and public feedback with institutional accountability.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm space-y-8 text-gray-700 font-body leading-relaxed">
                    <div className="border-b border-gray-100 pb-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-trust-blue">Last Reviewed: July 2026</p>
                        <p className="text-sm text-gray-500 mt-1">Governance & Operations | {settings.organizationName}</p>
                    </div>

                    <section className="space-y-3">
                        <h2 className="text-xl font-heading font-bold text-cinematic-dark">1. Commitment to Accountable Operations</h2>
                        <p className="text-sm text-gray-600">
                            {settings.organizationName} welcomes feedback, constructive criticism, and formal complaints. We treat all inquiries seriously, handling them promptly, impartially, and confidentially.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-heading font-bold text-cinematic-dark">2. Three-Step Dispute Resolution Procedure</h2>
                        <ol className="list-decimal pl-5 text-sm space-y-3 text-gray-600">
                            <li>
                                <strong>Submission:</strong> Send your complaint or concern in writing to <code className="text-trust-blue bg-blue-50 px-2 py-0.5 rounded font-mono">management@onedollaronechild.org</code>. Please provide your contact details, a clear summary of the issue, and any relevant payment Reference IDs.
                            </li>
                            <li>
                                <strong>Acknowledgment & Investigation:</strong> Our team will acknowledge receipt within 48–72 hours. An operations lead will review the facts, consult relevant records or school coordinators, and investigate thoroughly.
                            </li>
                            <li>
                                <strong>Written Resolution:</strong> Within 10 business days of acknowledgment, you will receive a detailed written response outlining findings, corrective actions, or decision outcomes.
                            </li>
                        </ol>
                    </section>

                    <section className="space-y-3 border-t border-gray-100 pt-6">
                        <h2 className="text-xl font-heading font-bold text-cinematic-dark">3. Escalation</h2>
                        <p className="text-sm text-gray-600">
                            If you are unsatisfied with the initial operational response, your complaint may be escalated to the Board of Directors for final administrative review.
                        </p>
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs font-mono text-slate-700 space-y-1 mt-3">
                            <p><strong>Direct Escalations Inbox:</strong> management@onedollaronechild.org</p>
                            <p><strong>Attn:</strong> Board Operations Review</p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

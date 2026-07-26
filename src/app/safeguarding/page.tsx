import { Metadata } from "next";
import { getGlobalSettings } from "@/lib/services/globalSettingsService";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getGlobalSettings();
    return {
        title: `Child Safeguarding Policy - ${settings.organizationName}`,
        description: `Our strict child protection, privacy, dignity, and non-contact standards at ${settings.organizationName}.`,
    };
}

export default async function SafeguardingPolicyPage() {
    const settings = await getGlobalSettings();

    return (
        <main className="min-h-screen bg-warm-bg pb-24">
            <div className="bg-cinematic-dark text-white pt-36 pb-20 relative overflow-hidden mb-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white">Child Safeguarding Policy</h1>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto font-body">
                        Protecting the dignity, safety, and privacy of every student in our educational programs.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm space-y-8 text-gray-700 font-body leading-relaxed">
                    <div className="border-b border-gray-100 pb-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-trust-blue">Last Reviewed: July 2026</p>
                        <p className="text-sm text-gray-500 mt-1">Institutional Governance | {settings.organizationName}</p>
                    </div>

                    <section className="space-y-3">
                        <h2 className="text-xl font-heading font-bold text-cinematic-dark">1. Zero Tolerance Safeguarding Commitment</h2>
                        <p className="text-sm text-gray-600">
                            {settings.organizationName} enforces a strict zero-tolerance policy regarding any form of child abuse, exploitation, harassment, or dignity violation. The safety and well-being of every student enrolled in our education support programs is our absolute priority.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-heading font-bold text-cinematic-dark">2. Child Identity & Privacy Protection</h2>
                        <p className="text-sm text-gray-600">
                            To ensure safety and protect student dignity:
                        </p>
                        <ul className="list-disc pl-5 text-sm space-y-2 text-gray-600">
                            <li><strong>Anonymized Profiles:</strong> We publish first names only. Full surnames, exact residential addresses, or precise geographic coordinates are never displayed publicly or shared with sponsors.</li>
                            <li><strong>Dignified Media Usage:</strong> Photographs and videos are published only with explicit consent from verified guardians and school administrators. Media emphasizes academic achievement and school environments.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-heading font-bold text-cinematic-dark">3. Non-Contact & Monitored Communication Protocol</h2>
                        <p className="text-sm text-gray-600">
                            To prevent exploitation and safeguard minors:
                        </p>
                        <ul className="list-disc pl-5 text-sm space-y-2 text-gray-600">
                            <li><strong>No Unmonitored Direct Communication:</strong> Direct unmonitored messaging, phone calls, social media contact, or personal visits between sponsors and students are strictly prohibited.</li>
                            <li><strong>Supervised Correspondence:</strong> All progress letters, drawings, or milestone updates are reviewed by local school coordinators before being published to donor dashboards.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-heading font-bold text-cinematic-dark">4. Partner School Verification</h2>
                        <p className="text-sm text-gray-600">
                            We work exclusively with accredited schools and community educators who uphold child protection standards, maintain background checks for instructional staff, and provide secure learning environments.
                        </p>
                    </section>

                    <section className="space-y-3 border-t border-gray-100 pt-6">
                        <h2 className="text-xl font-heading font-bold text-cinematic-dark">5. Reporting Safeguarding Concerns</h2>
                        <p className="text-sm text-gray-600">
                            If you become aware of any breach of this policy or have concerns regarding student protection, report immediately to our Safeguarding Coordinator:
                        </p>
                        <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/60 text-xs font-mono text-amber-900 space-y-1">
                            <p><strong>Safeguarding Contact:</strong> management@onedollaronechild.org</p>
                            <p><strong>Response Time:</strong> Immediate priority review within 24 hours</p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

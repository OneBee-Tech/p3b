import { Metadata } from "next";
import { getGlobalSettings } from "@/lib/services/globalSettingsService";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getGlobalSettings();
    return {
        title: `Accessibility Statement - ${settings.organizationName}`,
        description: `Our commitment to digital accessibility standards (WCAG 2.1 AA) at ${settings.organizationName}.`,
    };
}

export default async function AccessibilityStatementPage() {
    const settings = await getGlobalSettings();

    return (
        <main className="min-h-screen bg-warm-bg pb-24">
            <div className="bg-cinematic-dark text-white pt-36 pb-20 relative overflow-hidden mb-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white">Accessibility Statement</h1>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto font-body">
                        Ensuring inclusive, barrier-free digital access for all donors, partners, and visitors.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm space-y-8 text-gray-700 font-body leading-relaxed">
                    <div className="border-b border-gray-100 pb-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-trust-blue">Last Reviewed: July 2026</p>
                        <p className="text-sm text-gray-500 mt-1">WCAG 2.1 Level AA Compliance | {settings.organizationName}</p>
                    </div>

                    <section className="space-y-3">
                        <h2 className="text-xl font-heading font-bold text-cinematic-dark">1. Commitment to Digital Accessibility</h2>
                        <p className="text-sm text-gray-600">
                            {settings.organizationName} is committed to ensuring digital accessibility for people of all abilities. We continuously improve the user experience for everyone and apply relevant accessibility standards in alignment with the Web Content Accessibility Guidelines (WCAG 2.1 Level AA) and the Accessibility for Ontarians with Disabilities Act (AODA).
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-heading font-bold text-cinematic-dark">2. Key Accessibility Measures Implemented</h2>
                        <ul className="list-disc pl-5 text-sm space-y-2 text-gray-600">
                            <li><strong>Keyboard Navigation:</strong> All navigation menus, forms, modal dialogs, and interactive buttons are fully accessible via keyboard (Tab, Enter, Space, Esc).</li>
                            <li><strong>Skip-to-Content:</strong> A visible skip link allows keyboard users to bypass header navigation directly to main page content.</li>
                            <li><strong>Semantic Structure &amp; ARIA:</strong> Semantic HTML5 tags (&lt;main&gt;, &lt;section&gt;, &lt;nav&gt;) and ARIA roles are used to assist screen readers.</li>
                            <li><strong>Alternative Text:</strong> Descriptive <code>alt</code> attributes are provided for informative visual elements and child profile avatars.</li>
                        </ul>
                    </section>

                    <section className="space-y-3 border-t border-gray-100 pt-6">
                        <h2 className="text-xl font-heading font-bold text-cinematic-dark">3. Feedback & Accessibility Support</h2>
                        <p className="text-sm text-gray-600">
                            We welcome your feedback on the accessibility of our platform. If you encounter accessibility barriers, require content in an alternative format, or need assistance completing a sponsorship, please contact us:
                        </p>
                        <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100 text-xs font-mono text-slate-700 space-y-1 mt-3">
                            <p><strong>Email:</strong> management@onedollaronechild.org</p>
                            <p><strong>Response Time:</strong> Accessibility inquiries answered within 48 hours</p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

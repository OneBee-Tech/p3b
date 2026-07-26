import { Metadata } from "next";
import { getGlobalSettings } from "@/lib/services/globalSettingsService";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getGlobalSettings();
    return {
        title: `Privacy Policy - ${settings.organizationName}`,
        description: `Learn how ${settings.organizationName} protects your personal information and donor data in accordance with Canadian PIPEDA standards.`,
    };
}

export default async function PrivacyPolicyPage() {
    const settings = await getGlobalSettings();

    return (
        <main className="min-h-screen bg-warm-bg pb-24">
            {/* Header */}
            <div className="bg-cinematic-dark text-white pt-36 pb-20 relative overflow-hidden mb-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white">Privacy Policy</h1>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto font-body">
                        Our commitment to protecting your personal data, donor records, and digital privacy.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm space-y-8 text-gray-700 font-body leading-relaxed">
                    <div className="border-b border-gray-100 pb-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-trust-blue">Last Updated: July 2026</p>
                        <p className="text-sm text-gray-500 mt-1">Organization: {settings.organizationName}</p>
                    </div>

                    <section className="space-y-3">
                        <h2 className="text-xl font-heading font-bold text-cinematic-dark">1. Overview & Scope</h2>
                        <p className="text-sm text-gray-600">
                            {settings.organizationName} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting the privacy of our donors, sponsors, volunteers, and website visitors. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information in compliance with Canada&apos;s Personal Information Protection and Electronic Documents Act (PIPEDA) and applicable provincial privacy legislation.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-heading font-bold text-cinematic-dark">2. Information We Collect</h2>
                        <ul className="list-disc pl-5 text-sm space-y-2 text-gray-600">
                            <li><strong>Contact Information:</strong> Full name, email address, mailing address, and phone number when you register, contact us, or sponsor a child.</li>
                            <li><strong>Payment Information:</strong> Financial transactions are processed securely via PCI-compliant payment gateways (e.g., Stripe). We do not store raw credit card numbers on our servers.</li>
                            <li><strong>Dashboard & Communication Records:</strong> Messages submitted through our secure contact forms, sponsorship preferences, and account activity.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-heading font-bold text-cinematic-dark">3. How We Use Your Information</h2>
                        <p className="text-sm text-gray-600">
                            Your personal information is used exclusively to:
                        </p>
                        <ul className="list-disc pl-5 text-sm space-y-1.5 text-gray-600">
                            <li>Process sponsorship contributions and issue financial invoices or tax receipts.</li>
                            <li>Provide bi-annual student progress updates and dashboard notifications.</li>
                            <li>Respond to inquiries, support requests, or corporate partnership assessments.</li>
                            <li>Maintain security, prevent unauthorized transactions, and fulfill legal compliance requirements.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-heading font-bold text-cinematic-dark">4. Information Sharing & Third Parties</h2>
                        <p className="text-sm text-gray-600">
                            <strong>We never sell, rent, or trade your personal information.</strong> Information is shared only with trusted service providers necessary for operations (such as encrypted payment processors, database hosting, and transactional email providers), all bound by strict confidentiality agreements.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-heading font-bold text-cinematic-dark">5. Data Protection & Safeguarding</h2>
                        <p className="text-sm text-gray-600">
                            We implement industry-standard encryption (TLS 1.3), access controls, and secure server infrastructure to protect your data against loss, theft, and unauthorized access.
                        </p>
                    </section>

                    <section className="space-y-3 border-t border-gray-100 pt-6">
                        <h2 className="text-xl font-heading font-bold text-cinematic-dark">6. Contacting Our Privacy Officer</h2>
                        <p className="text-sm text-gray-600">
                            If you have questions, wishes to access your data, or request correction or deletion, please contact us at:
                        </p>
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs font-mono text-slate-700 space-y-1">
                            <p><strong>Email:</strong> management@onedollaronechild.org</p>
                            <p><strong>Address:</strong> {settings.registeredOffice}</p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

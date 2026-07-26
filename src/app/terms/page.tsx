import { Metadata } from "next";
import { getGlobalSettings } from "@/lib/services/globalSettingsService";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getGlobalSettings();
    return {
        title: `Terms of Use - ${settings.organizationName}`,
        description: `Read the terms and conditions governing the use of ${settings.organizationName} website and sponsorship platform.`,
    };
}

export default async function TermsOfUsePage() {
    const settings = await getGlobalSettings();

    return (
        <main className="min-h-screen bg-warm-bg pb-24">
            <div className="bg-cinematic-dark text-white pt-36 pb-20 relative overflow-hidden mb-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white">Terms of Use</h1>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto font-body">
                        Conditions governing platform access, donor accounts, and digital services.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm space-y-8 text-gray-700 font-body leading-relaxed">
                    <div className="border-b border-gray-100 pb-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-trust-blue">Last Revised: July 2026</p>
                        <p className="text-sm text-gray-500 mt-1">{settings.organizationName}</p>
                    </div>

                    <section className="space-y-3">
                        <h2 className="text-xl font-heading font-bold text-cinematic-dark">1. Acceptance of Terms</h2>
                        <p className="text-sm text-gray-600">
                            By accessing or using the website and digital platform operated by {settings.organizationName}, you agree to comply with and be bound by these Terms of Use, our Privacy Policy, and Child Safeguarding standards.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-heading font-bold text-cinematic-dark">2. Donor Accounts & Registration</h2>
                        <p className="text-sm text-gray-600">
                            When creating an account or initiating a sponsorship checkout, you agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your login credentials and dashboard access.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-heading font-bold text-cinematic-dark">3. Intellectual Property & Media Use</h2>
                        <p className="text-sm text-gray-600">
                            All text, graphics, logos, images, software, and progress dashboard formats are the property of {settings.organizationName} or its licensors and are protected under copyright laws. Student photographs and progress reports may not be republished, copied, or distributed externally without prior written authorization.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-heading font-bold text-cinematic-dark">4. Limitation of Liability</h2>
                        <p className="text-sm text-gray-600">
                            While we strive for complete accuracy across child profile registries and reporting updates, services are provided &quot;as is.&quot; {settings.organizationName} is not liable for indirect, incidental, or third-party service interruptions beyond our reasonable control.
                        </p>
                    </section>

                    <section className="space-y-3 border-t border-gray-100 pt-6">
                        <h2 className="text-xl font-heading font-bold text-cinematic-dark">5. Governing Law</h2>
                        <p className="text-sm text-gray-600">
                            These terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein.
                        </p>
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs font-mono text-slate-700 space-y-1 mt-3">
                            <p><strong>Legal Inquiries:</strong> management@onedollaronechild.org</p>
                            <p><strong>Registered Office:</strong> {settings.registeredOffice}</p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

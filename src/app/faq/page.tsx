import { getGlobalSettings } from "@/lib/services/globalSettingsService";
import { getFaqs } from "@/lib/services/contentService";
import { Metadata } from "next";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { ContextRibbon } from "@/components/ContextRibbon";
import { TrustBadgeStrip } from "@/components/TrustBadgeStrip";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getGlobalSettings();
    return {
        title: `Frequently Asked Questions - ${settings.organizationName}`,
        description: `Find answers about how your contribution works, our financial transparency, and our child sponsorship programs at ${settings.organizationName}.`,
    };
}

export default async function FAQPage() {
    const faqs = await getFaqs();

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            <section className="bg-cinematic-dark text-white pt-36 pb-24 mb-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">Frequently Asked Questions</h1>
                    <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
                        Everything you need to know about our community-first funding model and child sponsorship programs.
                    </p>
                </div>
            </section>
            
            <ContextRibbon />

            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <FAQAccordion items={faqs} />
            </section>
        </main>
    );
}

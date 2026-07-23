import { getGlobalSettings } from "@/lib/services/globalSettingsService";
import { Metadata } from "next";
import { SponsorshipImpactTiers } from "@/components/landing/SponsorshipImpactTiers";
import { TrustBadgeStrip } from "@/components/TrustBadgeStrip";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getGlobalSettings();
    return {
        title: `Sponsor a Child - ${settings.organizationName}`,
        description: `Join ${settings.organizationName} and change a child's future for just $1 a day.`,
        openGraph: {
            title: `Sponsor a Child - ${settings.organizationName}`,
            description: `Join ${settings.organizationName} and change a child's future for just $1 a day.`,
            type: "website",
        },
    };
}

export default async function SponsorPage() {
    return (
        <main className="min-h-screen bg-white">
            <section className="bg-cinematic-dark text-white pt-36 pb-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
                        Sponsor a Child Today
                    </h1>
                    <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
                        For just $1 a day, you can provide a child with education, daily meals, and essential supplies.
                    </p>
                </div>
            </section>
            
            <SponsorshipImpactTiers />
            
            <TrustBadgeStrip />
        </main>
    );
}

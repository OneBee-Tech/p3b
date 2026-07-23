import { Metadata } from "next";
import { getGlobalSettings } from "@/lib/services/globalSettingsService";
import { HowItWorksFlow } from "@/components/landing/HowItWorksFlow";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getGlobalSettings();
    return {
        title: `How It Works - ${settings.organizationName}`,
        description: `Learn how your $1 a day contribution creates lasting change through ${settings.organizationName}'s transparent ecosystem.`,
        openGraph: {
            title: `How It Works - ${settings.organizationName}`,
            description: `Learn how your $1 a day contribution creates lasting change through ${settings.organizationName}'s transparent ecosystem.`,
            type: "website",
        },
    };
}

export default async function HowItWorksPage() {
    const detailedProcessData = {
        metadata: {
            heading: "A Transparent Ecosystem of Impact",
            description: "See exactly how your contribution moves from your checkout to creating measurable change in a child's life.",
            steps: [
                { title: "A child is referred", description: "A child may be referred through a trusted volunteer, social worker, or local partner." },
                { title: "Circumstances are verified", description: "We review the child’s situation, including financial circumstances and risk of leaving school." },
                { title: "A suitable school is identified", description: "We look for a dependable and affordable school that can provide regular teaching and safe learning." },
                { title: "The child is enrolled", description: "The approved child receives the education support required under the program." },
                { title: "Expenses are paid", description: "Wherever practical, tuition is paid directly to the school and receipts are collected." },
                { title: "Documentation is shared", description: "The sponsor receives school fee receipts and enrolment confirmation." },
                { title: "Progress is monitored", description: "We aim to share academic report cards and educational progress approximately every six months." }
            ]
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <section className="bg-cinematic-dark text-white pt-36 pb-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
                        A Transparent Ecosystem of Impact
                    </h1>
                    <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
                        See exactly how your contribution moves from your checkout to creating measurable change in a child's life.
                    </p>
                </div>
            </section>
            
            <div className="py-12">
                <HowItWorksFlow data={detailedProcessData} />
            </div>
        </main>
    );
}

import { ImpactGallery } from "@/components/ProgramImpactGallery";

import { ContextRibbon } from "@/components/ContextRibbon";

export const metadata = {
    title: "Stories from the Field - Hope for Humanity",
    description: "Read impact stories from the communities we support.",
    openGraph: {
        title: "Stories from the Field - Hope for Humanity",
        description: "Read impact stories from the communities we support.",
        type: "website",
    },
};

export default function StoriesPage() {
    return (
        <main className="min-h-screen bg-white pt-24 pb-20">
            <section className="bg-cinematic-dark text-white py-24 mb-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">Stories from the Field</h1>
                    <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
                        See the tangible impact of child-first sponsorship across the globe.
                    </p>
                </div>
            </section>
            <ContextRibbon />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <ImpactGallery />
            </div>
        </main>
    );
}

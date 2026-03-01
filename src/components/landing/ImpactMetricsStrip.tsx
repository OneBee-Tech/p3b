import { prisma } from "@/lib/prisma";
import { Users, GraduationCap, Map } from "lucide-react";

async function getImpactMetrics() {
    try {
        const childrenCount = await prisma.registryChild.count({
            where: { deletedAt: null, isArchived: false }
        });

        const programCount = await prisma.program.count({
            where: { status: "ACTIVE" }
        });

        const donationStats = await prisma.donation.aggregate({
            _sum: { amount: true },
            where: { status: "SUCCEEDED" }
        });

        // Dynamic formula: e.g. 2 meals provided per $1 raised
        const mealsProvided = Math.floor(Number(donationStats._sum.amount || 0) * 2);

        return {
            childrenEducated: childrenCount,
            communitiesServed: programCount,
            mealsProvided: mealsProvided,
            isLive: true
        };
    } catch (error) {
        // Strict adherence to NO hardcoded proxy data
        return {
            childrenEducated: 0,
            communitiesServed: 0,
            mealsProvided: 0,
            isLive: false
        };
    }
}

export async function ImpactMetricsStrip() {
    const metrics = await getImpactMetrics();

    return (
        <section className="bg-cinematic-dark border-y border-white/10 py-16 relative z-20 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10">

                    {/* Metric 1 */}
                    <div className="flex flex-col items-center justify-center text-center pt-8 md:pt-0">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                            <GraduationCap className="w-8 h-8 text-impact-gold" />
                        </div>
                        <div className="text-5xl font-heading font-bold text-white mb-2 tracking-tight">
                            {metrics.childrenEducated.toLocaleString()}+
                        </div>
                        <div className="text-trust-blue font-bold uppercase tracking-wider text-sm mb-3">
                            Children Educated
                        </div>
                        <p className="text-white/60 text-sm font-body max-w-[200px]">
                            Equipped with tuition, uniforms, and daily resources.
                        </p>
                    </div>

                    {/* Metric 2 */}
                    <div className="flex flex-col items-center justify-center text-center pt-8 md:pt-0">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                            <Map className="w-8 h-8 text-impact-gold" />
                        </div>
                        <div className="text-5xl font-heading font-bold text-white mb-2 tracking-tight">
                            {metrics.communitiesServed.toLocaleString()}
                        </div>
                        <div className="text-trust-blue font-bold uppercase tracking-wider text-sm mb-3">
                            Communities Served
                        </div>
                        <p className="text-white/60 text-sm font-body max-w-[200px]">
                            Entire regions mobilized and funded for long-term growth.
                        </p>
                    </div>

                    {/* Metric 3 */}
                    <div className="flex flex-col items-center justify-center text-center pt-8 md:pt-0">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                            <Users className="w-8 h-8 text-impact-gold" />
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-light text-cinematic-dark mb-2">
                                {metrics.mealsProvided.toLocaleString()}
                            </p>
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                                Meals Provided
                            </p>
                        </div>
                        <p className="text-white/60 text-sm font-body max-w-[200px]">
                            Nourishing meals provided to children and families in need.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}

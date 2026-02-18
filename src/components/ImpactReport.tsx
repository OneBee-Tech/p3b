import { Download, PieChart, BarChart3, TrendingUp } from "lucide-react";

export function ImpactReport() {
    return (
        <section className="py-24 bg-gray-50 text-cinematic-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <span className="block text-trust-blue font-bold tracking-wider text-sm uppercase mb-2">Annual Transparency</span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold">2025 Impact Report</h2>
                    </div>
                    <div className="text-right">
                        <button className="bg-white border border-gray-200 hover:border-trust-blue text-cinematic-dark px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-sm">
                            <Download className="w-4 h-4" /> Download Full PDF
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1: Fund Allocation */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-heading font-bold text-xl">Fund Allocation</h3>
                            <PieChart className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-trust-blue"></span> Programs</span>
                                <span className="font-bold">92%</span>
                            </div>
                            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-trust-blue h-full w-[92%]" />
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-gray-300"></span> Admin</span>
                                <span className="font-bold">8%</span>
                            </div>
                            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-gray-300 h-full w-[8%]" />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-6 pt-6 border-t border-gray-50">
                            We maintain one of the highest efficiency ratings in the sector.
                        </p>
                    </div>

                    {/* Card 2: Growth Metrics */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-heading font-bold text-xl">YoY Growth</h3>
                            <TrendingUp className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div className="flex items-end gap-2 mb-2">
                            <span className="text-4xl font-bold text-cinematic-dark">+45%</span>
                            <span className="text-sm text-emerald-600 font-medium mb-1">increase</span>
                        </div>
                        <p className="text-gray-500 text-sm mb-6">Donations received compared to previous fiscal year.</p>

                        <div className="flex items-end justify-between h-24 gap-2">
                            <div className="w-full bg-gray-100 rounded-t-sm h-[40%]" />
                            <div className="w-full bg-gray-100 rounded-t-sm h-[60%]" />
                            <div className="w-full bg-gray-100 rounded-t-sm h-[50%]" />
                            <div className="w-full bg-trust-blue/20 rounded-t-sm h-[75%]" />
                            <div className="w-full bg-trust-blue rounded-t-sm h-[100%]" />
                        </div>
                    </div>

                    {/* Card 3: Key Milestone */}
                    <div className="bg-cinematic-dark text-white p-8 rounded-xl shadow-sm border border-gray-800 relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-heading font-bold text-xl text-white">Milestone Reached</h3>
                                <BarChart3 className="w-5 h-5 text-impact-gold" />
                            </div>
                            <div className="text-5xl font-bold text-impact-gold mb-2">100th</div>
                            <p className="text-xl font-medium mb-4">School Constructed</p>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                This year, we broke ground on our 100th community school in the rural district of Dadu.
                            </p>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-impact-gold/10 rounded-full blur-3xl z-0" />
                    </div>
                </div>
            </div>
        </section>
    );
}

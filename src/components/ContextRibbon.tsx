import Link from "next/link";
import { ArrowRight, Globe2, BookOpen, HeartHandshake } from "lucide-react";

export function ContextRibbon() {
    return (
        <div className="bg-white border-b border-gray-100 py-6 px-4 relative z-10 shadow-sm">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Mission Summary */}
                <div className="flex-1 flex items-center gap-3">
                    <div className="bg-trust-blue/10 p-2 rounded-lg">
                        <Globe2 className="w-5 h-5 text-trust-blue" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-cinematic-dark">Our Mission</p>
                        <p className="text-xs text-gray-500">Pioneering community-first educational development</p>
                    </div>
                </div>

                {/* Active Programs Snippet */}
                <div className="flex-1 flex items-center gap-3 md:border-l md:border-gray-100 md:px-6">
                    <div className="bg-emerald-50 p-2 rounded-lg">
                        <BookOpen className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-cinematic-dark">Ecosystem Impact</p>
                        <p className="text-xs text-gray-500">Strengthening regional infrastructure and retention</p>
                    </div>
                </div>

                {/* CTA */}
                <div className="flex-1 flex items-center justify-end">
                    <Link
                        href="/programs"
                        className="group flex items-center gap-2 bg-gray-50 hover:bg-trust-blue/5 text-trust-blue px-4 py-2 rounded-xl transition-all font-medium text-sm border border-gray-200 hover:border-trust-blue/20"
                    >
                        <HeartHandshake className="w-4 h-4" />
                        <span>Support Communities</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

            </div>
        </div>
    );
}

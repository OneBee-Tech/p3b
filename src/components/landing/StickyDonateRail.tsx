"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Activity, LineChart } from "lucide-react";

export function StickyDonateRail() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show sticky rail after scrolling past the hero section (approx 600px)
        const handleScroll = () => {
            if (window.scrollY > 600) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Desktop: Right-side vertical rail */}
            <div
                className={`hidden md:flex flex-col gap-2 fixed right-0 top-1/2 -translate-y-1/2 z-40 transition-all duration-500 ease-in-out ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
                    }`}
            >
                <Link
                    href="/programs"
                    data-tracking="RAIL_MONTHLY"
                    className="group flex flex-col items-center justify-center gap-2 bg-trust-blue text-white w-16 py-6 rounded-l-xl shadow-xl hover:bg-impact-gold hover:text-cinematic-dark hover:-translate-x-1 transition-all"
                    title="Donate Monthly"
                >
                    <Activity className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <span className="[writing-mode:vertical-lr] rotate-180 font-heading font-bold tracking-widest uppercase text-xs">
                        Donate Monthly
                    </span>
                </Link>

                <Link
                    href="/checkout?type=general"
                    data-tracking="RAIL_ONETIME"
                    className="group flex flex-col items-center justify-center gap-2 bg-trust-blue text-white w-16 py-4 rounded-l-xl shadow-xl hover:bg-impact-gold hover:text-cinematic-dark hover:-translate-x-1 transition-all"
                    title="One-Time Gift"
                >
                    <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="[writing-mode:vertical-lr] rotate-180 font-heading font-bold tracking-widest uppercase text-xs">
                        One-Time Gift
                    </span>
                </Link>

                <Link
                    href="/impact"
                    data-tracking="RAIL_IMPACT"
                    className="group flex flex-col items-center justify-center gap-2 bg-trust-blue text-white w-16 py-4 rounded-l-xl shadow-xl hover:bg-impact-gold hover:text-cinematic-dark hover:-translate-x-1 transition-all"
                    title="View Impact"
                >
                    <LineChart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="[writing-mode:vertical-lr] rotate-180 font-heading font-bold tracking-widest uppercase text-xs">
                        View Impact
                    </span>
                </Link>
            </div>

            {/* Mobile: Bottom-fixed bar */}
            <div
                className={`md:hidden fixed bottom-0 left-0 right-0 z-40 p-4 transition-all duration-500 ease-in-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
                    }`}
            >
                <Link
                    href="/checkout?type=general"
                    data-tracking="RAIL_MOBILE_ONETIME"
                    className="flex items-center justify-center gap-2 w-full bg-trust-blue text-white py-4 rounded-xl shadow-xl font-bold font-heading uppercase tracking-wide hover:bg-impact-gold hover:text-cinematic-dark transition-colors"
                >
                    <Heart className="w-5 h-5 fill-current" />
                    Give Where Needed Most
                </Link>
            </div>
        </>
    );
}

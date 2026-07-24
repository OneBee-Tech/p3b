"use client";

import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Mail } from "lucide-react";

export function LandingNewsletterCTA() {
    return (
        <section className="bg-gray-50 text-cinematic-dark py-24 relative overflow-hidden border-y border-gray-200">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-trust-blue/5 rounded-l-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-full bg-impact-gold/10 rounded-r-full blur-[100px] pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl border border-gray-200 mb-8 shadow-sm">
                    <Mail className="w-8 h-8 text-trust-blue" />
                </div>

                <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-cinematic-dark tracking-tight">
                    Join the Movement
                </h2>

                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12 font-body leading-relaxed">
                    Subscribe to our exclusive field dispatch. Receive verifiable impact stories, emergency appeals, and transparency updates directly to your inbox.
                </p>

                <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl border border-gray-200 shadow-xl">
                    <NewsletterSignup />
                </div>
            </div>
        </section>
    );
}

"use client";

import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Mail } from "lucide-react";

export function LandingNewsletterCTA() {
    return (
        <section className="bg-cinematic-dark text-white py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-trust-blue/10 mix-blend-overlay" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-impact-gold/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl border border-white/20 mb-8 backdrop-blur-md">
                    <Mail className="w-8 h-8 text-white" />
                </div>

                <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
                    Join the Movement
                </h2>

                <p className="text-lg text-white/70 max-w-2xl mx-auto mb-12">
                    Subscribe to our exclusive field dispatch. Receive verifiable impact stories, emergency appeals, and transparency updates directly to your inbox.
                </p>

                <div className="max-w-xl mx-auto bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm shadow-2xl">
                    <NewsletterSignup />
                </div>
            </div>
        </section>
    );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Mail } from "lucide-react";

export function NewsletterSignup() {
    const [email, setEmail] = useState("");
    const [consent, setConsent] = useState(false);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!consent) {
            setErrorMessage("You must agree to our privacy policy to subscribe.");
            setStatus("error");
            return;
        }

        setStatus("loading");
        setErrorMessage("");

        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, consent }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to subscribe");
            }

            setStatus("success");
            setEmail("");
            setConsent(false);
        } catch (error: unknown) {
            setStatus("error");
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("An unexpected error occurred.");
            }
        }
    };

    if (status === "success") {
        return (
            <div className="bg-green-50 text-green-800 p-6 rounded-2xl border border-green-200 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-green-600" />
                </div>
                <div>
                    <h4 className="font-bold text-lg">Thank you for subscribing!</h4>
                    <p className="text-sm mt-1 opacity-90">Please check your inbox to confirm your email.</p>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
            <div>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                        type="email"
                        required
                        placeholder="Enter your email address..."
                        className="pl-10 h-12 bg-white rounded-xl text-cinematic-dark placeholder:text-gray-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={status === "loading"}
                    />
                </div>
                {status === "error" && (
                    <p className="text-red-500 text-sm mt-2 font-medium">{errorMessage}</p>
                )}
            </div>

            <div className="flex items-start gap-3">
                <input
                    type="checkbox"
                    id="newsletter-consent"
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-trust-blue focus:ring-trust-blue cursor-pointer"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    disabled={status === "loading"}
                    required
                />
                <label htmlFor="newsletter-consent" className="text-xs text-gray-400 leading-relaxed cursor-pointer">
                    I agree to receive impact updates, appeals, and marketing emails. I understand my data will be processed in accordance with the <a href="/privacy-policy" className="text-trust-blue hover:underline">Privacy Policy</a>. (You can unsubscribe at any time).
                </label>
            </div>

            {/* Honeypot field for bots */}
            <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

            <Button
                type="submit"
                variant="impact"
                className="w-full h-12 font-bold text-base"
                disabled={status === "loading" || !email || !consent}
            >
                {status === "loading" ? "Subscribing..." : "Join the Mailing List"}
            </Button>
        </form>
    );
}

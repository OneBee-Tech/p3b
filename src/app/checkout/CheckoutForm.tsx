'use client'

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { Check, Lock, ShieldCheck } from "lucide-react";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export function CheckoutForm({ programId, childId }: { programId: string, childId?: string }) {
    const searchParams = useSearchParams();
    const typeParam = searchParams ? searchParams.get('type') : null;

    const [amount, setAmount] = useState(30);
    const [frequency, setFrequency] = useState<"monthly" | "yearly" | "one-time" | "daily">("monthly");
    const [tier, setTier] = useState<"daily" | "monthly" | "yearly" | "none">("monthly");
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [isCompleteSelected, setIsCompleteSelected] = useState(false);
    const [donorEmail, setDonorEmail] = useState("");
    const [inquirySubmitted, setInquirySubmitted] = useState(false);

    useEffect(() => {
        if (typeParam === 'annual') {
            setAmount(365);
            setFrequency('yearly');
            setTier('yearly');
            setIsCompleteSelected(false);
        } else if (typeParam === 'monthly') {
            setAmount(30);
            setFrequency('monthly');
            setTier('monthly');
            setIsCompleteSelected(false);
        } else if (typeParam === 'daily') {
            setAmount(1);
            setFrequency('daily');
            setTier('daily');
            setIsCompleteSelected(false);
        } else if (typeParam === 'general') {
            setFrequency('one-time');
            setTier('none');
            setIsCompleteSelected(false);
        } else if (typeParam === 'complete') {
            setIsCompleteSelected(true);
        }
    }, [typeParam]);

    const handleCompleteInquirySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!donorEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorEmail)) {
            setError("Please enter a valid email address.");
            return;
        }
        setIsProcessing(true);
        setError(null);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: donorEmail.split("@")[0] || "Donor",
                    email: donorEmail,
                    inquiryType: "SPONSORSHIP",
                    message: `[Complete Education Inquiry] Requesting custom calculation for complete education sponsorship. Program ID: ${programId}${childId ? `, Child ID: ${childId}` : ""}`,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to send inquiry.");
            }

            setInquirySubmitted(true);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "An error occurred while submitting your inquiry.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleCheckout = async () => {
        setIsProcessing(true);
        setError(null);
        try {
            const response = await fetch('/api/checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ programId, childId, amount, frequency }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.code === 'PROGRAM_LOCKED') {
                    window.location.reload();
                    return;
                }
                throw new Error(data.error || 'Failed to initialize checkout');
            }

            window.location.href = data.url;
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'An error occurred during checkout');
            setIsProcessing(false);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold text-cinematic-dark mb-6">Select your contribution</h2>

            <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-lg">
                <button
                    onClick={() => { setFrequency('monthly'); setAmount(30); setTier('monthly'); setIsCompleteSelected(false); }}
                    className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${!isCompleteSelected && (frequency === 'monthly' || frequency === 'yearly' || frequency === 'daily') ? 'bg-white text-trust-blue shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Subscription (Recommended)
                </button>
                <button
                    onClick={() => { setFrequency('one-time'); setTier('none'); setIsCompleteSelected(false); }}
                    className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${!isCompleteSelected && frequency === 'one-time' ? 'bg-white text-trust-blue shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    One-time
                </button>
            </div>

            {frequency !== 'one-time' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {/* Monthly Card */}
                    <button
                        onClick={() => { setAmount(30); setFrequency('monthly'); setTier('monthly'); setIsCompleteSelected(false); }}
                        className={`p-4 border-2 rounded-xl text-center transition-all relative ${
                            !isCompleteSelected && tier === 'monthly'
                                ? 'border-impact-gold bg-amber-50/30 ring-2 ring-impact-gold/30 shadow-md transform -translate-y-0.5'
                                : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                        {!isCompleteSelected && tier === 'monthly' && (
                            <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-impact-gold text-cinematic-dark flex items-center justify-center animate-scale-in">
                                <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                        )}
                        <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Monthly</span>
                        <span className="block text-2xl font-extrabold text-cinematic-dark">$30</span>
                        <span className="text-xs font-bold text-trust-blue">per month</span>
                    </button>

                    {/* Annual Card */}
                    <button
                        onClick={() => { setAmount(365); setFrequency('yearly'); setTier('yearly'); setIsCompleteSelected(false); }}
                        className={`p-4 border-2 rounded-xl text-center transition-all relative ${
                            !isCompleteSelected && tier === 'yearly'
                                ? 'border-impact-gold bg-slate-900 text-white shadow-xl ring-2 ring-impact-gold/50 transform -translate-y-0.5'
                                : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-impact-gold text-[10px] font-extrabold px-2 py-0.5 rounded text-cinematic-dark whitespace-nowrap shadow-xs">
                            MOST SELECTED
                        </div>
                        {!isCompleteSelected && tier === 'yearly' && (
                            <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-impact-gold text-cinematic-dark flex items-center justify-center animate-scale-in">
                                <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                        )}
                        <span className="block text-xs font-bold text-impact-gold uppercase tracking-wider mb-1">Annual</span>
                        <span className={`block text-2xl font-extrabold ${!isCompleteSelected && tier === 'yearly' ? 'text-white' : 'text-cinematic-dark'}`}>$365</span>
                        <span className={`text-xs font-bold ${!isCompleteSelected && tier === 'yearly' ? 'text-gray-300' : 'text-gray-500'}`}>per year</span>
                    </button>

                    {/* Complete Card */}
                    <button
                        onClick={() => { setIsCompleteSelected(true); }}
                        className={`p-4 border-2 rounded-xl text-center transition-all relative ${
                            isCompleteSelected
                                ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-md ring-2 ring-emerald-500/30 transform -translate-y-0.5'
                                : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                        {isCompleteSelected && (
                            <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center animate-scale-in">
                                <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                        )}
                        <span className="block text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">Complete</span>
                        <span className="block text-lg font-extrabold text-emerald-700 leading-tight">Custom Plan</span>
                        <span className="text-xs font-bold text-emerald-600">Request Assessment</span>
                    </button>
                </div>
            )}

            {isCompleteSelected ? (
                <div className="bg-emerald-50/60 border border-emerald-200 p-6 rounded-2xl mb-6">
                    {inquirySubmitted ? (
                        <div className="text-center py-4 space-y-3">
                            <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto font-bold text-xl">✓</div>
                            <h3 className="text-lg font-bold text-emerald-900">Inquiry Received!</h3>
                            <p className="text-sm text-emerald-800 leading-relaxed font-medium max-w-md mx-auto">
                                Our admin team will review the child&apos;s grade level, location, and remaining educational costs, and contact you with full custom pricing within <strong>72 hours</strong>.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleCompleteInquirySubmit} className="space-y-4">
                            <div>
                                <h3 className="text-base font-bold text-emerald-900 mb-1">Fund a Complete Education Journey</h3>
                                <p className="text-xs text-emerald-800 leading-relaxed font-body mb-3">
                                    Complete education costs are calculated individually based on the child&apos;s current grade level and local school fees. Enter your email below to request full pricing.
                                </p>
                                <label className="block text-xs font-bold text-emerald-950 mb-1">Your Email Address</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="yourname@example.com"
                                    value={donorEmail}
                                    onChange={(e) => setDonorEmail(e.target.value)}
                                    className="w-full px-4 py-3 bg-white border border-emerald-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 font-medium"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-base shadow-sm"
                            >
                                {isProcessing ? "Submitting Inquiry..." : "Request Complete Education Pricing"}
                            </Button>

                            <div className="p-3 bg-white/80 rounded-xl border border-emerald-200 text-xs text-emerald-900 leading-relaxed text-center font-medium">
                                ℹ️ Our admin team will contact you with full custom pricing within <strong>72 hours</strong>.
                            </div>
                        </form>
                    )}
                </div>
            ) : (
                <>
                    {frequency === 'one-time' && (
                        <div className="mb-6">
                            <label htmlFor="custom-amount" className="block text-sm font-bold text-gray-700 mb-2">Custom Amount</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                                <input
                                    type="number"
                                    id="custom-amount"
                                    min="1"
                                    value={amount}
                                    onChange={(e) => { setAmount(Math.max(1, parseInt(e.target.value) || 0)); setTier('none'); }}
                                    className="w-full pl-8 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-trust-blue focus:ring-4 focus:ring-trust-blue/10 transition-all font-bold text-lg text-gray-900 outline-none"
                                />
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="p-3 mb-6 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Emotional Reminder */}
                    <div className="my-6 p-4 rounded-xl bg-warm-bg/70 border border-amber-200/50 text-center">
                        <p className="text-sm font-medium text-cinematic-dark leading-relaxed italic">
                            &ldquo;This contribution helps keep one child in school—not just today, but throughout their educational journey.&rdquo;
                        </p>
                    </div>

                    <Button
                        variant="impact"
                        size="lg"
                        className="w-full py-6 text-base font-extrabold hover:scale-[1.01] transition-transform shadow-lg"
                        onClick={handleCheckout}
                        disabled={isProcessing}
                    >
                        {isProcessing ? 'Processing Securely...' : 'Continue to Secure Payment →'}
                    </Button>

                    {/* Payment Confidence & Concise Policy Links */}
                    <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col items-center gap-2 text-[11px] font-medium text-gray-500">
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <span className="flex items-center gap-1 font-semibold text-gray-700">
                                <Lock className="w-3.5 h-3.5 text-emerald-600" /> 256-bit Encrypted Checkout
                            </span>
                            <span className="text-gray-300">•</span>
                            <span>Powered by Stripe</span>
                            <span className="text-gray-300">•</span>
                            <span className="flex items-center gap-1 font-semibold text-gray-700">
                                <ShieldCheck className="w-3.5 h-3.5 text-trust-blue" /> PCI-DSS Compliant
                            </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-600 text-center">
                            <span className="text-emerald-600 font-bold">✓</span>
                            <span>Cancel your recurring sponsorship anytime from your Donor Dashboard before your next renewal. See our <Link href="/refunds" target="_blank" className="text-trust-blue underline hover:text-blue-800 transition-colors font-semibold">Donation &amp; Refund Policy</Link>.</span>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-gray-400 font-body">
                            <Link href="/privacy" target="_blank" className="hover:text-trust-blue underline transition-colors">Privacy Policy</Link>
                            <span>•</span>
                            <Link href="/safeguarding" target="_blank" className="hover:text-trust-blue underline transition-colors">Safeguarding Policy</Link>
                            <span>•</span>
                            <Link href="/refunds" target="_blank" className="hover:text-trust-blue underline transition-colors">Donation &amp; Refund Terms</Link>
                        </div>

                        <p className="text-[11px] text-center text-gray-400 mt-1 max-w-sm">
                            Official charitable tax receipts available following formal confirmation of CRA charitable registration. Itemized invoices are issued instantly.
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}

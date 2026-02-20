'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export function CheckoutForm({ programId, childId }: { programId: string, childId?: string }) {
    const [amount, setAmount] = useState(30);
    const [frequency, setFrequency] = useState<"monthly" | "one-time">("monthly");
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
                    // Refresh the page to show locked state
                    window.location.reload();
                    return;
                }
                throw new Error(data.error || 'Failed to initialize checkout');
            }

            // Redirect to Stripe Checkout
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
                    onClick={() => setFrequency('monthly')}
                    className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${frequency === 'monthly' ? 'bg-white text-trust-blue shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Monthly (Recommended)
                </button>
                <button
                    onClick={() => setFrequency('one-time')}
                    className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${frequency === 'one-time' ? 'bg-white text-trust-blue shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    One-time
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                {frequency === 'monthly' ? (
                    <>
                        <button onClick={() => setAmount(15)} className={`p-4 border-2 rounded-xl text-center transition-all ${amount === 15 ? 'border-trust-blue bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'}`}>
                            <span className="block text-2xl font-bold text-gray-900">$15</span>
                            <span className="text-xs text-gray-500">per month</span>
                        </button>
                        <button onClick={() => setAmount(30)} className={`p-4 border-2 rounded-xl text-center transition-all relative ${amount === 30 ? 'border-trust-blue bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'}`}>
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-impact-gold text-[10px] font-bold px-2 py-0.5 rounded text-cinematic-dark whitespace-nowrap">FULL SPONSOR</div>
                            <span className="block text-2xl font-bold text-gray-900">$30</span>
                            <span className="text-xs text-gray-500">per month</span>
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setAmount(50)} className={`p-4 border-2 rounded-xl text-center transition-all ${amount === 50 ? 'border-trust-blue bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'}`}>
                            <span className="block text-2xl font-bold text-gray-900">$50</span>
                        </button>
                        <button onClick={() => setAmount(365)} className={`p-4 border-2 rounded-xl text-center transition-all ${amount === 365 ? 'border-trust-blue bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'}`}>
                            <span className="block text-2xl font-bold text-gray-900">$365</span>
                            <span className="text-xs text-gray-500">$1 a day</span>
                        </button>
                    </>
                )}
            </div>

            {error && (
                <div className="p-3 mb-6 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                    {error}
                </div>
            )}

            <Button
                variant="impact"
                size="lg"
                className="w-full py-6 text-lg hover:scale-[1.02] transition-transform"
                onClick={handleCheckout}
                disabled={isProcessing}
            >
                {isProcessing ? 'Processing Securely...' : `Donate $${amount} ${frequency === 'monthly' ? 'Monthly' : ''}`}
            </Button>

            <p className="text-xs text-center text-gray-400 mt-4">
                By donating, you agree to our Terms of Service and Privacy Policy.
            </p>
        </div>
    );
}

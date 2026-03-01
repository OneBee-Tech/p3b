"use client";

import { useState, useTransition } from "react";
import { Send, Users, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { dispatchNewsletter, DispatchResult } from "./actions";

interface NewsletterDispatchFormProps {
    subscriberCount: number;
}

export function NewsletterDispatchForm({ subscriberCount }: NewsletterDispatchFormProps) {
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [result, setResult] = useState<DispatchResult | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleDispatch = () => {
        startTransition(async () => {
            setResult(null);
            const res = await dispatchNewsletter(subject, body);
            setResult(res);
        });
    };

    return (
        <div className="space-y-6">
            {/* Stats Banner */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-trust-blue/20 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-trust-blue" />
                </div>
                <div>
                    <p className="text-white/50 text-sm">Active Subscribers</p>
                    <p className="text-3xl font-bold text-white font-heading">{subscriberCount.toLocaleString()}</p>
                </div>
            </div>

            {/* Broadcast Result */}
            {result && (
                <div className={`rounded-2xl p-5 border flex items-start gap-3 ${result.success
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                    : "bg-red-500/10 border-red-500/20 text-red-400"
                    }`}>
                    {result.success
                        ? <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" />
                        : <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />}
                    <div>
                        {result.success
                            ? <p className="font-semibold">Dispatch complete! {result.sent} delivered, {result.failed} failed.</p>
                            : <p className="font-semibold">{result.error || "Dispatch failed."}</p>}
                    </div>
                </div>
            )}

            {/* Draft Form */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
                <h2 className="text-white font-semibold text-lg">Draft a Broadcast</h2>

                <div className="space-y-2">
                    <label className="text-white/50 text-sm font-medium">Subject Line</label>
                    <input
                        type="text"
                        placeholder="e.g., This Month's Impact Report — March 2026"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-trust-blue/50"
                        disabled={isPending}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-white/50 text-sm font-medium">Body (HTML supported)</label>
                    <textarea
                        rows={12}
                        placeholder={"<h2>This Month's Updates</h2>\n<p>Dear Subscriber, ...</p>"}
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-trust-blue/50 font-mono text-sm resize-y"
                        disabled={isPending}
                    />
                    <p className="text-white/30 text-xs">You can write plain text or HTML. A footer with unsubscribe notice will be appended automatically.</p>
                </div>

                <button
                    onClick={handleDispatch}
                    disabled={isPending || !subject.trim() || !body.trim() || subscriberCount === 0}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-trust-blue hover:bg-trust-blue/90 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl font-bold text-base transition-all"
                >
                    {isPending
                        ? <><Loader2 className="w-5 h-5 animate-spin" /> Dispatching...</>
                        : <><Send className="w-5 h-5" /> Dispatch to {subscriberCount} Subscriber{subscriberCount !== 1 ? "s" : ""}</>}
                </button>
            </div>
        </div>
    );
}

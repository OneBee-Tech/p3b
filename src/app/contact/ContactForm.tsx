"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle2, AlertCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const INQUIRY_TYPES = [
    { value: "GENERAL", label: "General Inquiry" },
    { value: "SPONSORSHIP", label: "Sponsor a Child" },
    { value: "REFER_CHILD", label: "Refer a Child" },
    { value: "REQUEST_ASSISTANCE", label: "Request Assistance" },
    { value: "PARTNERSHIP", label: "Institutional Partnership" },
    { value: "MEDIA", label: "Media & Press" },
];

export function ContactForm() {
    const searchParams = useSearchParams();
    const typeQuery = searchParams.get("type");

    const [form, setForm] = useState({ name: "", email: "", inquiryType: "", message: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    // Initialize inquiryType from query string (if valid)
    useEffect(() => {
        if (typeQuery && INQUIRY_TYPES.some(t => t.value === typeQuery)) {
            setForm(f => ({ ...f, inquiryType: typeQuery }));
        }
    }, [typeQuery]);

    const charsLeft = 1000 - form.message.length;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) {
                setErrorMsg(data.error ?? "Something went wrong.");
                setStatus("error");
            } else {
                setStatus("success");
            }
        } catch {
            setErrorMsg("Network error. Please try again.");
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="text-center py-16 space-y-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                    <h2 className="text-2xl font-heading font-bold text-cinematic-dark mb-2">Message Received</h2>
                    <p className="text-gray-500 max-w-sm mx-auto">
                        Thank you, <strong>{form.name}</strong>. We'll review your inquiry and respond to <strong>{form.email}</strong> within 48–72 hours.
                    </p>
                </div>
                <Link href="/" className="inline-block mt-4">
                    <Button variant="outline" className="text-trust-blue border-trust-blue hover:bg-trust-blue/5">
                        Return to Homepage
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-gray-700">Full Name <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-cinematic-dark focus:outline-none focus:ring-2 focus:ring-trust-blue focus:border-transparent transition-shadow text-sm"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-gray-700">Email Address <span className="text-red-500">*</span></label>
                    <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-cinematic-dark focus:outline-none focus:ring-2 focus:ring-trust-blue focus:border-transparent transition-shadow text-sm"
                    />
                </div>
            </div>

            {/* Inquiry Type */}
            <div className="space-y-1.5">
                <label className="block text-sm font-bold text-gray-700">Inquiry Type <span className="text-red-500">*</span></label>
                <div className="relative">
                    <select
                        required
                        value={form.inquiryType}
                        onChange={e => setForm(f => ({ ...f, inquiryType: e.target.value }))}
                        className="w-full appearance-none px-4 py-3 border border-gray-200 rounded-xl text-cinematic-dark focus:outline-none focus:ring-2 focus:ring-trust-blue focus:border-transparent transition-shadow text-sm bg-white pr-10"
                    >
                        <option value="" disabled>Select the nature of your inquiry</option>
                        {INQUIRY_TYPES.map(t => (
                            <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                    <label className="block text-sm font-bold text-gray-700">Message <span className="text-red-500">*</span></label>
                    <span className={`text-xs font-medium ${charsLeft < 100 ? "text-red-500" : "text-gray-400"}`}>
                        {charsLeft} characters remaining
                    </span>
                </div>
                <textarea
                    required
                    rows={6}
                    maxLength={1000}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Please describe your inquiry in detail…"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-cinematic-dark focus:outline-none focus:ring-2 focus:ring-trust-blue focus:border-transparent transition-shadow text-sm resize-none"
                />
            </div>

            {/* Error */}
            {status === "error" && (
                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                </div>
            )}

            {/* Submit */}
            <Button
                type="submit"
                variant="impact"
                size="lg"
                disabled={status === "loading"}
                className="w-full py-6 text-base font-bold hover:-translate-y-0.5 transition-transform shadow-md"
            >
                {status === "loading" ? (
                    <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Sending…
                    </span>
                ) : (
                    <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Send Message
                    </span>
                )}
            </Button>

            <p className="text-xs text-center text-gray-400">
                We respond within 48–72 hours. No spam, no data sharing.
            </p>
        </form>
    );
}

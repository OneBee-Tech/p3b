"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle2, AlertCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const INQUIRY_TYPES = [
  { value: "GENERAL", slug: "general", label: "General Inquiry" },
  { value: "SPONSORSHIP", slug: "sponsorship", label: "Sponsor a Child" },
  { value: "REFER_CHILD", slug: "refer-child", label: "Refer a Child" },
  { value: "REQUEST_ASSISTANCE", slug: "request-assistance", label: "Request Assistance" },
  { value: "VOLUNTEER", slug: "volunteer", label: "Volunteer Professional" },
  { value: "PARTNERSHIP", slug: "partnership", label: "Corporate / Institutional Partnership" },
  { value: "FUNDRAISER", slug: "fundraiser", label: "Start a Fundraiser" },
  { value: "YOUTH_AMBASSADOR", slug: "youth-ambassador", label: "Youth Ambassador Program" },
  { value: "MEDIA", slug: "media", label: "Media & Press Inquiries" },
];

export function ContactForm() {
  const searchParams = useSearchParams();
  const typeQuery = searchParams.get("type");

  const [form, setForm] = useState({ name: "", email: "", inquiryType: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Initialize inquiryType from query string (matching either enum value or slug)
  useEffect(() => {
    if (typeQuery) {
      const matched = INQUIRY_TYPES.find(
        (t) => t.slug === typeQuery.toLowerCase() || t.value === typeQuery.toUpperCase()
      );
      if (matched) {
        setForm((f) => ({ ...f, inquiryType: matched.value }));
      }
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
          <h2 className="text-2xl font-heading font-bold text-cinematicDark mb-2">Message Received</h2>
          <p className="text-gray-500 max-w-sm mx-auto text-sm">
            Thank you, <strong>{form.name}</strong>. We've routed your inquiry to our operations team and will respond to <strong>{form.email}</strong> within 48–72 hours.
          </p>
        </div>
        <Link href="/" className="inline-block mt-4">
          <Button variant="outline" className="text-trustBlue border-trustBlue hover:bg-trustBlue/5">
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
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Your full name"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-cinematicDark focus:outline-none focus:ring-2 focus:ring-trustBlue transition-shadow text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="you@example.com"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-cinematicDark focus:outline-none focus:ring-2 focus:ring-trustBlue transition-shadow text-sm"
          />
        </div>
      </div>

      {/* Inquiry Type */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          Inquiry Type <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            required
            value={form.inquiryType}
            onChange={(e) => setForm((f) => ({ ...f, inquiryType: e.target.value }))}
            className="w-full appearance-none px-4 py-3 border border-slate-200 rounded-xl text-cinematicDark focus:outline-none focus:ring-2 focus:ring-trustBlue transition-shadow text-sm bg-white pr-10"
          >
            <option value="" disabled>Select the nature of your inquiry</option>
            {INQUIRY_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Message <span className="text-red-500">*</span>
          </label>
          <span className={`text-xs font-medium ${charsLeft < 100 ? "text-red-500" : "text-slate-400"}`}>
            {charsLeft} characters remaining
          </span>
        </div>
        <textarea
          required
          rows={6}
          maxLength={1000}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          placeholder="Please describe your inquiry in detail…"
          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-cinematicDark focus:outline-none focus:ring-2 focus:ring-trustBlue transition-shadow text-sm resize-none"
        />
      </div>

      {/* Error */}
      {status === "error" && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-6 text-base font-bold bg-[#fdc700] hover:bg-[#fdc700]/90 text-white rounded-xl shadow-md transition-all"
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

      <p className="text-xs text-center text-slate-400">
        We respond within 48–72 hours. No spam, no data sharing.
      </p>
    </form>
  );
}

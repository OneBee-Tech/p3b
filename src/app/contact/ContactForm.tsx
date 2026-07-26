"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle2, AlertCircle, ChevronDown, Lock, Check } from "lucide-react";
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
  const [refId, setRefId] = useState("");

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
  const isTyping = form.message.length > 0;

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
        const generatedRef = `ODOC-${Math.floor(10000 + Math.random() * 90000)}`;
        setRefId(generatedRef);
        setStatus("success");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    const timelineSteps = [
      { label: "Received", status: "completed" },
      { label: "Assigned", status: "current" },
      { label: "Under Review", status: "pending" },
      { label: "Response Sent", status: "pending" },
    ];

    return (
      <div className="py-8 px-4 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100/80 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-cinematic-dark mb-2">
            Message Received
          </h2>
          <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed font-body">
            Thank you, <strong>{form.name}</strong>. Your message has been securely received. A member of our team will review it and respond to <strong>{form.email}</strong> within <strong>48–72 hours</strong>.
          </p>
        </div>

        {/* Reference ID Pill */}
        <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 px-4 py-2 rounded-xl text-xs font-mono text-slate-700">
          <span className="text-gray-400 font-sans uppercase font-bold text-[10px] tracking-wider">Reference ID:</span>
          <span className="font-extrabold text-trust-blue">{refId}</span>
        </div>

        {/* 4-Step Message Lifecycle Timeline */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 max-w-lg mx-auto text-left mt-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4 text-center">
            Inquiry Progress Timeline
          </h4>
          <div className="flex items-center justify-between relative px-2">
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    step.status === "completed"
                      ? "bg-emerald-500 text-white shadow-xs"
                      : step.status === "current"
                      ? "bg-trust-blue text-white ring-4 ring-blue-100"
                      : "bg-white border-2 border-gray-200 text-gray-400"
                  }`}
                >
                  {step.status === "completed" ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : (
                    idx + 1
                  )}
                </div>
                <span className={`text-[11px] font-bold mt-2 ${step.status === "completed" || step.status === "current" ? "text-cinematic-dark" : "text-gray-400"}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Link href="/" className="inline-block mt-4">
          <Button variant="outline" className="text-trust-blue border-trust-blue hover:bg-trust-blue/5 rounded-xl font-bold px-6 py-2.5">
            Return to Homepage
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {/* Name + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Your full name"
            className="w-full px-4 py-3.5 border border-slate-200 rounded-xl text-cinematic-dark focus:outline-none focus:ring-2 focus:ring-trust-blue transition-shadow text-sm font-medium"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="you@example.com"
            className="w-full px-4 py-3.5 border border-slate-200 rounded-xl text-cinematic-dark focus:outline-none focus:ring-2 focus:ring-trust-blue transition-shadow text-sm font-medium"
          />
        </div>
      </div>

      {/* Inquiry Type */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          Inquiry Type <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            required
            value={form.inquiryType}
            onChange={(e) => setForm((f) => ({ ...f, inquiryType: e.target.value }))}
            className="w-full appearance-none px-4 py-3.5 border border-slate-200 rounded-xl text-cinematic-dark focus:outline-none focus:ring-2 focus:ring-trust-blue transition-shadow text-sm font-medium bg-white pr-10"
          >
            <option value="" disabled>Select the nature of your inquiry</option>
            {INQUIRY_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Message <span className="text-red-500">*</span>
          </label>
          {isTyping && (
            <span className={`text-xs font-medium ${charsLeft < 100 ? "text-red-500" : "text-slate-400"}`}>
              {charsLeft} characters remaining
            </span>
          )}
        </div>
        <textarea
          required
          rows={6}
          maxLength={1000}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          placeholder="Please describe your inquiry in detail…"
          className="w-full px-4 py-3.5 border border-slate-200 rounded-xl text-cinematic-dark focus:outline-none focus:ring-2 focus:ring-trust-blue transition-shadow text-sm resize-none font-medium"
        />
      </div>

      {/* Error */}
      {status === "error" && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 font-medium">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Submit Section */}
      <div className="space-y-3 pt-2">
        <Button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-6 text-base font-extrabold bg-[#fdc700] hover:bg-[#fdc700]/90 text-white rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
        >
          {status === "loading" ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Sending Message…
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Send Message
            </span>
          )}
        </Button>

        <div className="flex flex-col items-center justify-center gap-1">
          <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-emerald-600" /> Secure Submission
          </span>
          <p className="text-xs text-center text-slate-400 font-body">
            Your message is securely received, reviewed personally, and answered within 48–72 hours.
          </p>
        </div>
      </div>
    </form>
  );
}

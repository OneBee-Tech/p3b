import { Metadata } from "next";
import { ContactForm } from "./ContactForm";
import { Mail, Clock, ShieldCheck, Lock, HeartHandshake, CheckCircle2 } from "lucide-react";
import { getGlobalSettings } from "@/lib/services/globalSettingsService";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getGlobalSettings();
    return {
        title: `Contact Us - ${settings.organizationName}`,
        description: `Get in touch with the ${settings.organizationName} team for sponsorships, partnerships, referrals, or general inquiries.`,
    };
}

const trustGroupCards = [
    { icon: Clock, number: "48–72 Hours", label: "Average Response Time" },
    { icon: ShieldCheck, number: "Never Shared", label: "Strict Privacy Guarantee" },
    { icon: Lock, number: "Encrypted", label: "Direct Secure Transit" },
];

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-warm-bg pb-24">
            {/* 1. Hero Section */}
            <div className="bg-cinematic-dark text-white pt-36 pb-20 relative overflow-hidden mb-12">
                <div className="absolute inset-0 bg-trust-blue/10 mix-blend-overlay" />
                <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-impact-gold/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    {/* Warmer Pill Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-semibold text-white/90 mb-6 shadow-xs">
                        <span className="text-base">💬</span> Every message is read by a real person
                    </div>

                    <div className="flex items-center justify-center gap-3 mb-4">
                        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
                            Get In Touch
                        </h1>
                        <span className="text-3xl opacity-80">✉️</span>
                    </div>

                    <p className="text-lg text-white/80 max-w-xl mx-auto font-body leading-relaxed">
                        Whether you want to sponsor a child, refer a case, or discuss a partnership — we&apos;re here.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* 2. Grouped 3 Trust Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {trustGroupCards.map(({ icon: Icon, number, label }) => (
                        <div key={label} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-blue-50 text-trust-blue rounded-xl flex items-center justify-center mb-3">
                                <Icon className="w-6 h-6" />
                            </div>
                            <p className="text-xl font-extrabold text-cinematic-dark mb-1 font-heading">{number}</p>
                            <p className="text-xs text-gray-500 font-medium">{label}</p>
                        </div>
                    ))}
                </div>

                {/* 3. Main Form & Info Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* Left: How We Handle Messages */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-cinematic-dark rounded-2xl p-7 text-white shadow-md">
                            <h2 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                                <HeartHandshake className="w-5 h-5 text-impact-gold" />
                                What happens next?
                            </h2>
                            <ol className="space-y-4 text-sm text-white/80 font-body">
                                <li className="flex gap-3">
                                    <span className="w-6 h-6 rounded-full bg-trust-blue/30 text-trust-blue font-bold flex items-center justify-center flex-shrink-0 text-xs">1</span>
                                    <span>Your message is stored securely and routed to our team.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="w-6 h-6 rounded-full bg-trust-blue/30 text-trust-blue font-bold flex items-center justify-center flex-shrink-0 text-xs">2</span>
                                    <span>A team member reviews and categorizes your inquiry within 24 hours.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="w-6 h-6 rounded-full bg-impact-gold/30 text-impact-gold font-bold flex items-center justify-center flex-shrink-0 text-xs">3</span>
                                    <span>You receive a personal reply with next steps within 48–72 hours.</span>
                                </li>
                            </ol>
                        </div>

                        {/* Human Touch Box */}
                        <div className="p-5 bg-amber-50/60 border border-amber-200/60 rounded-2xl text-xs text-amber-900 leading-relaxed font-medium">
                            💛 <strong>Human Promise:</strong> Every message is read by a real member of our team — never an automated system.
                        </div>
                    </div>

                    {/* Right: Form Container */}
                    <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
                        <div className="mb-8 pb-4 border-b border-gray-100">
                            <h2 className="text-2xl font-heading font-bold text-cinematic-dark mb-1">
                                Tell Us How We Can Help
                            </h2>
                            <p className="text-xs text-gray-500 font-body">
                                Select your inquiry type below to ensure your message reaches the right person instantly.
                            </p>
                        </div>

                        <ContactForm />
                    </div>
                </div>

                {/* 4. Prefer Email? Section Below Form */}
                <div className="mt-16 bg-white rounded-2xl p-8 sm:p-10 border border-gray-100 shadow-sm max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                        <div className="space-y-3 max-w-xl">
                            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-trust-blue bg-blue-50 px-3 py-1 rounded-full">
                                <Mail className="w-3.5 h-3.5" /> Direct Email Access
                            </div>
                            <h3 className="text-xl font-heading font-bold text-cinematic-dark">
                                Prefer Email?
                            </h3>
                            <a
                                href="mailto:management@onedollaronechild.org"
                                className="inline-block text-lg font-bold text-trust-blue hover:underline"
                            >
                                📧 management@onedollaronechild.org
                            </a>
                            <p className="text-xs text-gray-500 font-body leading-relaxed">
                                Every email—whether it&apos;s about sponsorship, corporate partnerships, volunteering, fundraising, media inquiries, technical support, or general questions—is reviewed personally and routed internally to the appropriate team member.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 text-xs text-gray-600 space-y-2 w-full md:w-auto shrink-0">
                            <p className="font-bold text-cinematic-dark uppercase tracking-wider text-[10px]">Use this address for:</p>
                            <ul className="space-y-1">
                                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-trust-blue" /> Sponsorship questions</li>
                                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-trust-blue" /> Corporate partnerships</li>
                                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-trust-blue" /> Volunteering & Fundraising</li>
                                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-trust-blue" /> Media & Technical support</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

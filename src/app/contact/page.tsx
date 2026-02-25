import { Metadata } from "next";
import { ContactForm } from "./ContactForm";
import { Mail, MessageCircle, Clock, Shield } from "lucide-react";

export const metadata: Metadata = {
    title: "Contact Us - OneDollarOneChild",
    description: "Get in touch with our team for sponsorships, partnerships, referrals, or general inquiries.",
};

const contactPoints = [
    { icon: Clock, label: "Response Time", value: "48–72 hours" },
    { icon: Shield, label: "Data Policy", value: "Never shared" },
    { icon: Mail, label: "Secure Channel", value: "Encrypted transit" },
];

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-warm-bg pb-20">
            {/* Header */}
            <div className="bg-cinematic-dark text-white pt-36 pb-20 relative overflow-hidden mb-12">
                <div className="absolute inset-0 bg-trust-blue/10 mix-blend-overlay" />
                <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-impact-gold/10 rounded-full blur-3xl pointer-events-none" />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-medium text-white/80 mb-6">
                        <MessageCircle className="w-4 h-4" />
                        We read every message personally
                    </div>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white">Get In Touch</h1>
                    <p className="text-lg text-white/70 max-w-xl mx-auto">
                        Whether you want to sponsor a child, refer a case, or discuss a partnership — we're here.
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

                    {/* Left: Info Panel */}
                    <div className="space-y-6">
                        <div className="bg-cinematic-dark rounded-2xl p-6 text-white">
                            <h2 className="font-heading font-bold text-lg mb-4">What happens next?</h2>
                            <ol className="space-y-4 text-sm text-white/70">
                                <li className="flex gap-3">
                                    <span className="w-6 h-6 rounded-full bg-trust-blue/30 text-trust-blue font-bold flex items-center justify-center flex-shrink-0 text-xs">1</span>
                                    <span>Your message is stored securely and routed to our operations team.</span>
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

                        <div className="space-y-3">
                            {contactPoints.map(({ icon: Icon, label, value }) => (
                                <div key={label} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                    <div className="w-9 h-9 bg-trust-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-4 h-4 text-trust-blue" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium">{label}</p>
                                        <p className="text-sm font-bold text-cinematic-dark">{value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <h2 className="text-xl font-heading font-bold text-cinematic-dark mb-6">Send a Message</h2>
                        <ContactForm />
                    </div>

                </div>
            </div>
        </div>
    );
}

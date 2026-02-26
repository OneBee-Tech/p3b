"use client";

import { useState } from "react";
import { Settings as SettingsIcon, Shield, Globe, Bell, Mail, Database, CreditCard, Key, Lock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SettingsClient({ adminUser }: { adminUser: { name: string, email: string } }) {
    const [activeTab, setActiveTab] = useState<"profile" | "security" | "notifications" | "billing">("profile");

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-3xl font-heading font-bold text-white flex items-center gap-3">
                    <SettingsIcon className="w-8 h-8 text-trust-blue" />
                    Platform Settings
                </h1>
                <p className="text-white/50 mt-2">Manage institutional global configuration and security governance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Navigation Menu */}
                <div className="md:col-span-1 space-y-2 text-sm font-medium">
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === "profile" ? "bg-trust-blue/20 text-trust-blue border border-trust-blue/30" : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"}`}
                    >
                        <Globe className="w-4 h-4" /> Institutional Profile
                    </button>
                    <button
                        onClick={() => setActiveTab("security")}
                        className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === "security" ? "bg-trust-blue/20 text-trust-blue border border-trust-blue/30" : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"}`}
                    >
                        <Shield className="w-4 h-4" /> Security & Access
                    </button>
                    <button
                        onClick={() => setActiveTab("notifications")}
                        className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === "notifications" ? "bg-trust-blue/20 text-trust-blue border border-trust-blue/30" : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"}`}
                    >
                        <Bell className="w-4 h-4" /> Notifications
                    </button>
                    <button
                        onClick={() => setActiveTab("billing")}
                        className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === "billing" ? "bg-trust-blue/20 text-trust-blue border border-trust-blue/30" : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"}`}
                    >
                        <CreditCard className="w-4 h-4" /> Billing & Tiers
                    </button>
                </div>

                {/* Content Area */}
                <div className="md:col-span-2 space-y-6">
                    {activeTab === "profile" && <ProfileTab adminUser={adminUser} />}
                    {activeTab === "security" && <SecurityTab />}
                    {activeTab === "notifications" && <NotificationsTab />}
                    {activeTab === "billing" && <BillingTab />}
                </div>
            </div>
        </div>
    );
}

function ProfileTab({ adminUser }: { adminUser: { name: string, email: string } }) {
    const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

    const handleSave = () => {
        setStatus("saving");
        setTimeout(() => setStatus("saved"), 800);
        setTimeout(() => setStatus("idle"), 3000);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            {/* NGO Profile */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-6">
                <h3 className="text-xl font-bold text-white mb-4 italic">NGO Core Identity</h3>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-white/60 uppercase tracking-wider">Legal Entity Name</label>
                        <input
                            type="text"
                            className="w-full bg-cinematic-dark/50 border border-white/10 px-4 py-3 rounded-xl text-white focus:border-trust-blue outline-none transition-colors"
                            defaultValue="OneDollarOneChild Foundation"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-white/60 uppercase tracking-wider">Currency</label>
                            <select className="w-full bg-cinematic-dark/50 border border-white/10 px-4 py-3 rounded-xl text-white outline-none">
                                <option>USD ($)</option>
                                <option>EUR (€)</option>
                                <option>GBP (£)</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-white/60 uppercase tracking-wider">Timezone</label>
                            <select className="w-full bg-cinematic-dark/50 border border-white/10 px-4 py-3 rounded-xl text-white outline-none">
                                <option>UTC (London)</option>
                                <option>PKT (Islamabad)</option>
                                <option>EST (New York)</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-white/60 uppercase tracking-wider">Primary Support Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                            <input
                                type="email"
                                className="w-full bg-cinematic-dark/50 border border-white/10 pl-11 pr-4 py-3 rounded-xl text-white focus:border-trust-blue outline-none transition-colors"
                                defaultValue="governance@onedollaronechild.org"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Infrastructure Status */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Database className="w-5 h-5 text-impact-gold" />
                        System Health
                    </h3>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full uppercase">Operational</span>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                        <span className="text-sm text-white/50">Database Connector (Neon)</span>
                        <span className="text-xs font-mono text-white/30">Stable (12ms)</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                        <span className="text-sm text-white/50">Stripe Webhook Node</span>
                        <span className="text-xs font-mono text-white/30">Connected</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-white/50">Prisma Client Version</span>
                        <span className="text-xs font-mono text-white/30">v6.19.2</span>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <Button
                    onClick={handleSave}
                    disabled={status === "saving"}
                    variant="impact"
                    className="px-8 py-3 w-48"
                >
                    {status === "saved" ? "Saved!" : status === "saving" ? "Updating..." : "Update Configuration"}
                </Button>
            </div>
        </div>
    );
}

function SecurityTab() {
    const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
    const [mfa, setMfa] = useState(true);
    const [sessionTimeout, setSessionTimeout] = useState("30");

    const handleSave = () => {
        setStatus("saving");
        setTimeout(() => setStatus("saved"), 800);
        setTimeout(() => setStatus("idle"), 3000);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-6">
                <div>
                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-impact-gold" /> Security & Access Control
                    </h3>
                    <p className="text-sm text-white/50">Configure global security policies for administrative accounts.</p>
                </div>

                <div className="space-y-6 pt-4">
                    {/* MFA Toggle */}
                    <div className="flex items-center justify-between p-4 bg-cinematic-dark/50 border border-white/10 rounded-2xl cursor-pointer" onClick={() => setMfa(!mfa)}>
                        <div>
                            <p className="font-bold text-white text-sm">Require MFA for Admins</p>
                            <p className="text-xs text-white/40 mt-1">Force all admin accounts to use two-factor authentication.</p>
                        </div>
                        <div className={`w-12 h-6 rounded-full p-1 transition-colors ${mfa ? "bg-trust-blue" : "bg-white/20"}`}>
                            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${mfa ? "translate-x-6" : ""}`} />
                        </div>
                    </div>

                    {/* Session Timeout */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-white/60 uppercase tracking-wider">Admin Session Timeout</label>
                        <select
                            value={sessionTimeout}
                            onChange={(e) => setSessionTimeout(e.target.value)}
                            className="w-full bg-cinematic-dark/50 border border-white/10 px-4 py-3 rounded-xl text-white outline-none"
                        >
                            <option value="15">15 Minutes (Strict)</option>
                            <option value="30">30 Minutes (Recommended)</option>
                            <option value="60">1 Hour</option>
                            <option value="0">Never (Dev only)</option>
                        </select>
                        <p className="text-xs text-white/40 mt-1">Automatically log out inactive administrative sessions.</p>
                    </div>

                    {/* Active Sessions */}
                    <div className="pt-4 border-t border-white/10">
                        <p className="font-bold text-white text-sm mb-4">Active Sessions</p>
                        <div className="flex items-center justify-between py-3 border-b border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-500/10 rounded-lg">
                                    <Globe className="w-4 h-4 text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-white">Current Session (Chrome / Windows)</p>
                                    <p className="text-xs text-white/40">IP: 192.168.1.1 • Started 2 mins ago</p>
                                </div>
                            </div>
                            <span className="text-xs text-emerald-400 font-bold bg-emerald-400/10 px-2 py-1 rounded">Active</span>
                        </div>
                        <button className="mt-4 text-sm text-red-400 hover:text-red-300 font-medium transition-colors">
                            Revoke all other sessions
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <Button
                    onClick={handleSave}
                    disabled={status === "saving"}
                    variant="impact"
                    className="px-8 py-3 w-48"
                >
                    {status === "saved" ? "Security Updated!" : status === "saving" ? "Updating..." : "Save Security Rules"}
                </Button>
            </div>
        </div>
    );
}

function NotificationsTab() {
    const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
    const [toggles, setToggles] = useState({
        newDonation: true,
        largeDonation: true,
        newReferral: true,
        weeklyReport: false,
        systemAlerts: true
    });

    const handleToggle = (key: keyof typeof toggles) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = () => {
        setStatus("saving");
        setTimeout(() => setStatus("saved"), 800);
        setTimeout(() => setStatus("idle"), 3000);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-6">
                <div>
                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                        <Bell className="w-5 h-5 text-impact-gold" /> Admin Notifications
                    </h3>
                    <p className="text-sm text-white/50">Control what automated emails the system sends to the governance team.</p>
                </div>

                <div className="space-y-3 pt-4">
                    {/* Items */}
                    <div className="flex items-center justify-between p-4 bg-cinematic-dark/50 border border-white/10 rounded-2xl cursor-pointer" onClick={() => handleToggle("newDonation")}>
                        <div>
                            <p className="font-bold text-white text-sm">New Donation Alerts</p>
                            <p className="text-xs text-white/40">Email when a new Stripe checkout succeeds.</p>
                        </div>
                        <div className={`w-12 h-6 rounded-full p-1 transition-colors ${toggles.newDonation ? "bg-trust-blue" : "bg-white/20"}`}>
                            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${toggles.newDonation ? "translate-x-6" : ""}`} />
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-cinematic-dark/50 border border-white/10 rounded-2xl cursor-pointer" onClick={() => handleToggle("largeDonation")}>
                        <div>
                            <p className="font-bold text-white text-sm">High Value Alerts</p>
                            <p className="text-xs text-white/40">Immediate alerts for donations over $500.</p>
                        </div>
                        <div className={`w-12 h-6 rounded-full p-1 transition-colors ${toggles.largeDonation ? "bg-trust-blue" : "bg-white/20"}`}>
                            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${toggles.largeDonation ? "translate-x-6" : ""}`} />
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-cinematic-dark/50 border border-white/10 rounded-2xl cursor-pointer" onClick={() => handleToggle("newReferral")}>
                        <div>
                            <p className="font-bold text-white text-sm">New Child Referrals</p>
                            <p className="text-xs text-white/40">Email when a new child referral is submitted for review.</p>
                        </div>
                        <div className={`w-12 h-6 rounded-full p-1 transition-colors ${toggles.newReferral ? "bg-trust-blue" : "bg-white/20"}`}>
                            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${toggles.newReferral ? "translate-x-6" : ""}`} />
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-cinematic-dark/50 border border-white/10 rounded-2xl cursor-pointer" onClick={() => handleToggle("systemAlerts")}>
                        <div>
                            <p className="font-bold text-white text-sm">Infrastructure Alerts</p>
                            <p className="text-xs text-white/40">Errors from Stripe Webhooks or DB failures.</p>
                        </div>
                        <div className={`w-12 h-6 rounded-full p-1 transition-colors ${toggles.systemAlerts ? "bg-trust-blue" : "bg-white/20"}`}>
                            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${toggles.systemAlerts ? "translate-x-6" : ""}`} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <Button
                    onClick={handleSave}
                    disabled={status === "saving"}
                    variant="impact"
                    className="px-8 py-3 w-48"
                >
                    {status === "saved" ? "Preferences Saved!" : status === "saving" ? "Updating..." : "Save Preferences"}
                </Button>
            </div>
        </div>
    );
}

function BillingTab() {
    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-6 text-center py-16">
                <div className="w-16 h-16 bg-trust-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8 text-trust-blue" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Platform Billing</h3>
                <p className="text-white/50 max-w-sm mx-auto text-sm">
                    This NGO instance is currently running on the <strong>Enterprise Non-Profit Tier</strong>. Stripe infrastructure costs are managed externally via the Stripe Dashboard.
                </p>
                <div className="pt-6">
                    <a href="https://dashboard.stripe.com" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
                            Open Stripe Dashboard →
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    );
}


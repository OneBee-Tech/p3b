import { Settings as SettingsIcon, Shield, Globe, Bell, Mail, Database, CreditCard } from "lucide-react";

export default function AdminSettingsPage() {
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
                    <button className="w-full text-left px-4 py-3 bg-trust-blue/20 text-trust-blue border border-trust-blue/30 rounded-xl flex items-center gap-3">
                        <Globe className="w-4 h-4" /> Institutional Profile
                    </button>
                    <button className="w-full text-left px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 rounded-xl transition-all flex items-center gap-3">
                        <Shield className="w-4 h-4" /> Security & Access
                    </button>
                    <button className="w-full text-left px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 rounded-xl transition-all flex items-center gap-3">
                        <Bell className="w-4 h-4" /> Notifications
                    </button>
                    <button className="w-full text-left px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 rounded-xl transition-all flex items-center gap-3">
                        <CreditCard className="w-4 h-4" /> Billing & Tiers
                    </button>
                </div>

                {/* Content Area */}
                <div className="md:col-span-2 space-y-6">
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
                        <button className="px-8 py-3 bg-white text-cinematic-dark rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg active:scale-95">
                            Update Configuration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import { updateEmailPreferences } from "./actions";
import { Check, Info, Bell, ShieldAlert, GraduationCap, Building2 } from "lucide-react";

export default function NotificationSettingsClient({ initialPreferences }: { initialPreferences: any }) {
    const [prefs, setPrefs] = useState({
        receiveImpactUpdates: initialPreferences.receiveImpactUpdates,
        receiveMilestones: initialPreferences.receiveMilestones,
        receiveCSRReports: initialPreferences.receiveCSRReports,
    });

    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState("");

    const handleSave = async () => {
        setIsSaving(true);
        setMessage("");
        try {
            await updateEmailPreferences(prefs);
            setMessage("Preferences saved successfully.");
            setTimeout(() => setMessage(""), 3000);
        } catch (error) {
            setMessage("Error saving preferences. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const Toggle = ({ label, description, icon: Icon, checked, onChange, disabled = false }: any) => (
        <div className={`p-4 rounded-xl border ${disabled ? 'bg-white/5 border-white/5 opacity-80' : 'bg-white/5 border-white/10 hover:bg-white/10'} transition-colors flex items-start sm:items-center justify-between gap-4`}>
            <div className="flex items-start gap-4">
                <div className="p-2 bg-trust-blue/20 text-trust-blue rounded-lg mt-1 sm:mt-0">
                    <Icon className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-bold text-white flex items-center gap-2">
                        {label}
                        {disabled && <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-medium">Required</span>}
                    </h3>
                    <p className="text-sm text-white/60 mt-1">{description}</p>
                </div>
            </div>
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                disabled={disabled}
                onClick={() => !disabled && onChange(!checked)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-trust-blue focus:ring-offset-2 focus:ring-offset-background ${checked ? 'bg-trust-blue' : 'bg-white/20'}`}
            >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <Toggle
                    icon={Bell}
                    label="Impact Story Updates"
                    description="Receive periodic narratives and photos summarizing your sponsored child's progress."
                    checked={prefs.receiveImpactUpdates}
                    onChange={(val: boolean) => setPrefs({ ...prefs, receiveImpactUpdates: val })}
                />

                <Toggle
                    icon={GraduationCap}
                    label="Milestone Celebrations"
                    description="Be notified when your sponsored child graduates or completes a major academic goal."
                    checked={prefs.receiveMilestones}
                    onChange={(val: boolean) => setPrefs({ ...prefs, receiveMilestones: val })}
                />

                <Toggle
                    icon={ShieldAlert}
                    label="Critical Safeguarding Alerts"
                    description="Immediate notifications concerning the safety, health, or sudden relocation of a child."
                    checked={true}
                    disabled={true}
                    onChange={() => { }}
                />

                <Toggle
                    icon={Building2}
                    label="Corporate CSR ESG Reports"
                    description="Quarterly automated compliance and impact snapshot PDFs for enterprise partners."
                    checked={prefs.receiveCSRReports}
                    onChange={(val: boolean) => setPrefs({ ...prefs, receiveCSRReports: val })}
                />
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-impact-gold hover:bg-yellow-400 text-black font-bold py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                    {isSaving ? "Saving..." : "Save Preferences"}
                    {!isSaving && <Check className="w-4 h-4 ml-1" />}
                </button>

                {message && (
                    <span className={`text-sm ${message.includes("Error") ? "text-red-400" : "text-green-400"}`}>
                        {message}
                    </span>
                )}
            </div>

            <div className="bg-trust-blue/10 border border-trust-blue/20 rounded-lg p-4 flex gap-3 mt-8">
                <Info className="w-5 h-5 text-trust-blue flex-shrink-0" />
                <p className="text-sm text-trust-blue/80">
                    If an email bounces more than 3 times, your account will be automatically suppressed by the system to maintain deliverability reputation.
                </p>
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export function ChildReassignmentAccordion({ childName }: { childName?: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const name = childName || "your sponsored child";

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-4 text-left flex items-center justify-between font-bold text-xs sm:text-sm text-cinematic-dark hover:bg-gray-50/50 transition-colors"
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-trust-blue shrink-0" />
                    <span>What happens if {name} graduates or relocates?</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-trust-blue' : ''}`} />
            </button>

            {isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs text-gray-600 font-body leading-relaxed border-t border-gray-100 bg-slate-50/50 animate-fade-in">
                    If {name} graduates, transitions to high school, or relocates outside our school network, your recurring sponsorship will automatically transition to support another verified student in immediate need of educational support. You will receive an immediate dashboard notification and profile update details prior to the next term deployment.
                </div>
            )}
        </div>
    );
}

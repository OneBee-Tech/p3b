import { LifeBuoy, Mail } from "lucide-react";

export const metadata = {
    title: "Request Assistance - OneDollarOneChild",
    description: "Reach out for community or family support.",
};

export default function AssistPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center space-y-6">
                <div className="w-16 h-16 bg-impact-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-impact-gold/20">
                    <LifeBuoy className="w-8 h-8 text-impact-gold" />
                </div>
                <h1 className="text-3xl font-heading font-bold text-cinematic-dark">Request Assistance</h1>
                <p className="text-gray-600 leading-relaxed">
                    If your family or community requires immediate educational or supply assistance, please reach out to our support coordination team. All requests are reviewed by our field officers to ensure resources are allocated effectively.
                </p>
                <div className="pt-6 border-t border-gray-100">
                    <a
                        href="mailto:support@onedollaronechild.org?subject=Request%20Assistance"
                        className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-trust-blue hover:bg-trust-blue/90 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg"
                    >
                        <Mail className="w-5 h-5" />
                        Email Support Team
                    </a>
                </div>
            </div>
        </div>
    );
}

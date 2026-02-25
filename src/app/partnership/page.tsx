import { Building2, Mail } from "lucide-react";

export const metadata = {
    title: "Partnerships - OneDollarOneChild",
    description: "Collaborate with our NGO as an institutional partner.",
};

export default function PartnershipPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center space-y-6">
                <div className="w-16 h-16 bg-trust-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-trust-blue/20">
                    <Building2 className="w-8 h-8 text-trust-blue" />
                </div>
                <h1 className="text-3xl font-heading font-bold text-cinematic-dark">Institutional Partnerships</h1>
                <p className="text-gray-600 leading-relaxed">
                    We collaborate with corporations, foundations, and community organizations to amplify our impact. If your organization is interested in funding a program, corporate matching, or capacity building, please reach out to our partnerships team.
                </p>
                <div className="pt-6 border-t border-gray-100">
                    <a
                        href="mailto:partnerships@onedollaronechild.org?subject=Partnership%20Inquiry"
                        className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-cinematic-dark hover:bg-cinematic-dark/90 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg"
                    >
                        <Mail className="w-5 h-5" />
                        Email Partnerships Team
                    </a>
                </div>
            </div>
        </div>
    );
}

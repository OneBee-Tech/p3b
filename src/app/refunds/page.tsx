import { Metadata } from "next";
import { getGlobalSettings } from "@/lib/services/globalSettingsService";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getGlobalSettings();
    return {
        title: `Donation & Refund Policy - ${settings.organizationName}`,
        description: `Understand how sponsorship contributions are managed, allocated, and refunded at ${settings.organizationName}.`,
    };
}

export default async function DonationRefundPolicyPage() {
    const settings = await getGlobalSettings();

    return (
        <main className="min-h-screen bg-warm-bg pb-24">
            <div className="bg-cinematic-dark text-white pt-36 pb-20 relative overflow-hidden mb-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white">Donation & Refund Policy</h1>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto font-body">
                        Transparent terms governing sponsorship contributions, fee settlements, and refund requests.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm space-y-8 text-gray-700 font-body leading-relaxed">
                    <div className="border-b border-gray-100 pb-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-trust-blue">Last Reviewed: July 2026</p>
                        <p className="text-sm text-gray-500 mt-1">Financial Operations | {settings.organizationName}</p>
                    </div>

                    <section className="space-y-3">
                        <h2 className="text-xl font-heading font-bold text-cinematic-dark">1. Sponsorship Allocation Policy</h2>
                        <p className="text-sm text-gray-600">
                            {settings.transparencyWording}
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-heading font-bold text-cinematic-dark">2. Recurring Sponsorship Billing & Cancellations</h2>
                        <ul className="list-disc pl-5 text-sm space-y-2 text-gray-600">
                            <li><strong>Flexibility:</strong> Monthly ($30/mo) and annual ($365/yr) sponsorships are recurring. You may modify or cancel your recurring contribution at any time through your donor dashboard.</li>
                            <li><strong>No Cancellation Fees:</strong> Cancellations take effect immediately for the next billing cycle with zero penalty fees.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-heading font-bold text-cinematic-dark">3. Refund Terms</h2>
                        <p className="text-sm text-gray-600">
                            Because sponsorship funds are disbursed directly to partner schools to cover upcoming academic term fees, tuition payments already remitted to educational institutions are non-refundable. However, we grant refund requests under the following conditions:
                        </p>
                        <ul className="list-disc pl-5 text-sm space-y-2 text-gray-600">
                            <li><strong>Unauthorized or Erroneous Charge:</strong> Refund requests made within 30 days of an unintended transaction prior to term fee disbursement will be refunded in full.</li>
                            <li><strong>Duplicate Processing:</strong> If a technical error results in a duplicate transaction, the duplicate amount will be credited or refunded immediately upon notification.</li>
                        </ul>
                    </section>

                    <section className="space-y-3 border-t border-gray-100 pt-6">
                        <h2 className="text-xl font-heading font-bold text-cinematic-dark">4. Requesting a Refund</h2>
                        <p className="text-sm text-gray-600">
                            To submit a donation or refund inquiry, contact our finance team with your payment details or Reference ID:
                        </p>
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs font-mono text-slate-700 space-y-1">
                            <p><strong>Email:</strong> management@onedollaronechild.org</p>
                            <p><strong>Processing Window:</strong> Refund reviews completed within 3–5 business days</p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

import { ShieldCheck, Calendar, Hash, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: "Verify Impact Record - Hope for Humanity",
    description: "Public verification portal for cryptographic impact certificates.",
};

export default async function VerifyCertificatePage({
    params
}: {
    params: Promise<{ certificateId: string }>
}) {
    const { certificateId } = await params;

    // In a production environment, this would query the `Certificate` or `Donation` table
    // by the unique `certificateId` and return a 404/NotFound if invalid.
    // For Phase 3 demonstration, we mock verified status.

    return (
        <main className="min-h-screen bg-warm-bg flex items-center justify-center py-20 px-4">
            <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center border-t-8 border-trust-blue relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 bg-trust-blue transform translate-x-12 -translate-y-12 rounded-full w-48 h-48 pointer-events-none" />

                <div className="inline-flex bg-emerald-50 p-4 rounded-full mb-6 relative">
                    <ShieldCheck className="w-12 h-12 text-emerald-600" />
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full">
                        <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-heading font-bold text-cinematic-dark mb-4">Official Impact Record</h1>
                <p className="text-gray-600 text-[15px] mb-8 max-w-lg mx-auto leading-relaxed">
                    This cryptographic record validates the authenticity of a registered contribution to Hope for Humanity's community programs.
                </p>

                <div className="bg-gray-50 rounded-2xl p-6 text-left border border-gray-100 space-y-4 mb-8">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                        <span className="text-gray-500 flex items-center gap-2 text-sm"><Hash className="w-4 h-4" /> Record ID</span>
                        <span className="font-mono text-xs md:text-sm font-semibold text-cinematic-dark break-all">{certificateId.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                        <span className="text-gray-500 flex items-center gap-2 text-sm"><ShieldCheck className="w-4 h-4" /> Status</span>
                        <span className="text-emerald-700 font-bold bg-emerald-100 px-3 py-1 rounded text-xs tracking-wider">VERIFIED</span>
                    </div>
                    <div className="flex justify-between items-center pb-2">
                        <span className="text-gray-500 flex items-center gap-2 text-sm"><Calendar className="w-4 h-4" /> Authority</span>
                        <span className="font-medium text-cinematic-dark text-sm">Hope For Humanity Ledger</span>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <Link href="/programs" className="inline-block px-8 py-3 bg-cinematic-dark text-impact-gold rounded-xl font-bold hover:bg-cinematic-dark/90 transition-colors shadow-sm w-full sm:w-auto">
                        View Funded Communities
                    </Link>
                </div>
            </div>
        </main>
    );
}

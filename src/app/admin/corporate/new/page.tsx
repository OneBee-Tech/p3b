import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import CorporateOnboardingForm from "./CorporateOnboardingForm";

export const metadata: Metadata = {
    title: "Onboard CSR Partner | NGO Admin",
    description: "Add a new Corporate Sponsor",
};

export default async function NewCorporateSponsorPage() {
    const session = await auth();

    // Re-verify Access
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        redirect("/");
    }

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <Link href="/admin/corporate" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium">
                <ArrowLeft className="w-4 h-4" />
                Back to Corporate Sponsors
            </Link>

            <div>
                <h1 className="text-3xl font-heading font-bold text-white flex items-center gap-3">
                    <ShieldCheck className="w-8 h-8 text-impact-gold" />
                    Onboard CSR Partner
                </h1>
                <p className="text-white/60 mt-2 text-lg">
                    Register a new institutional sponsor to unlock bulk funding and ESG reporting capabilities.
                </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                <CorporateOnboardingForm />
            </div>
        </div>
    );
}

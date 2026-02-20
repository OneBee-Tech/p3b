import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
export default function ThankYouPage() {
    return (
        <div className="min-h-screen bg-warm-bg flex items-center justify-center p-4">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl max-w-lg text-center border border-gray-100">
                <CheckCircle className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
                <h1 className="text-3xl font-heading font-bold text-cinematic-dark mb-4">You're making a difference!</h1>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    Thank you for supporting community education. Your contribution is directly funding tuition, infrastructure, and essential supplies. A tax-deductible receipt has been emailed to you.
                </p>
                <div className="space-y-4">
                    <Link href="/dashboard" className="block w-full">
                        <Button variant="impact" size="lg" className="w-full text-lg">
                            Go to Donor Dashboard
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

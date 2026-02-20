import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import Link from "next/link";
export default function WaitlistPage() {
    return (
        <div className="min-h-screen bg-warm-bg flex items-center justify-center p-4">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl max-w-lg text-center border border-gray-100">
                <Clock className="w-20 h-20 text-impact-gold mx-auto mb-6" />
                <h1 className="text-3xl font-heading font-bold text-cinematic-dark mb-4">You've joined the waitlist</h1>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    Thank you for your incredible generosity. We will notify you as soon as funding opens up for this community program or when similar programs require support.
                </p>
                <div className="space-y-4">
                    <Link href="/programs" className="block w-full">
                        <Button variant="impact" size="lg" className="w-full text-lg">
                            Explore Other Communities
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

import { Button } from "@/components/ui/button";
import { Heart, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { SignInForm } from "@/components/auth/SignInForm";

export default async function SignInPage(props: { searchParams: Promise<{ callbackUrl?: string }> }) {
    const session = await auth();
    const searchParams = await props.searchParams;
    const callbackUrl = searchParams.callbackUrl || "/dashboard";

    if (session) {
        // Admin users always land on /admin
        if ((session.user as any)?.role === "ADMIN") {
            redirect("/admin");
        }
        redirect(callbackUrl);
    }

    return (
        <div className="min-h-screen bg-warm-bg flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                {/* <Link href="/" className="inline-flex items-center gap-2 group mb-8">
                    <div className="bg-trust-blue p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
                        <Heart className="w-8 h-8 text-white fill-current" />
                    </div>
                    <span className="font-heading font-bold text-2xl text-cinematic-dark tracking-tight">
                        OneDollarOneChild
                    </span>
                </Link> */}
                <h2 className="mt-2 text-center text-3xl font-heading font-bold text-cinematic-dark mb-2">
                    Secure Sign In
                </h2>
                <p className="text-gray-500 text-sm mb-8">
                    Access your donor dashboard to view the impact you are making.
                </p>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <SignInForm />
            </div>
        </div>
    );
}

import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Heart, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function SignInPage(props: { searchParams: Promise<{ callbackUrl?: string }> }) {
    const session = await auth();
    const searchParams = await props.searchParams;
    const callbackUrl = searchParams.callbackUrl || "/dashboard";

    if (session) {
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
                <div className="bg-white py-10 px-6 shadow-xl rounded-2xl border border-gray-100 sm:px-10">

                    <form
                        action={async () => {
                            "use server"
                            await signIn("google", { redirectTo: callbackUrl })
                        }}
                    >
                        <Button
                            variant="outline"
                            className="w-full flex items-center justify-center gap-3 py-6 text-base font-bold text-gray-700 hover:bg-gray-50 hover:text-cinematic-dark border-gray-200 shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-trust-blue focus:outline-none"
                            aria-label="Continue with Google"
                            type="submit"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Continue with Google
                        </Button>
                    </form>

                    <div className="mt-8 mb-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-3 bg-white text-gray-500 font-medium">Or continue with email</span>
                            </div>
                        </div>
                    </div>

                    <form
                        action={async (formData) => {
                            "use server"
                            await signIn("nodemailer", formData)
                        }}
                        className="space-y-6"
                    >
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-trust-blue focus:border-transparent sm:text-sm text-cinematic-dark font-medium transition-shadow"
                                    placeholder="Enter your email to receive a secure sign-in link"
                                />
                            </div>
                            <p className="mt-2 text-xs text-gray-500 text-center">
                                No password required. We’ll send you a private access link.
                            </p>
                            <input type="hidden" name="redirectTo" value={callbackUrl} />
                        </div>

                        <Button
                            type="submit"
                            variant="impact"
                            className="w-full py-6 text-base font-bold shadow-md hover:bg-yellow-400 focus:ring-2 focus:ring-offset-2 focus:ring-impact-gold hover:-translate-y-0.5 transition-all duration-300"
                            aria-label="Continue with Email"
                        >
                            Continue with Email
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        <span className="sr-only">Trust Notice: </span>
                        Your data is encrypted and never shared.
                    </div>
                </div>
            </div>
        </div>
    );
}

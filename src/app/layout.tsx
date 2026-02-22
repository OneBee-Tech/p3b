import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TrustBadgeStrip } from "@/components/TrustBadgeStrip";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { ClientAutoTranslator } from "@/components/ClientAutoTranslator";
import { auth } from "@/auth";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OneDollarOneChild",
  description: "OneDollarOneChild",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          jakarta.variable,
          inter.variable,
          playfair.variable,
          "antialiased font-body bg-warm-bg text-cinematic-dark min-h-screen flex flex-col"
        )}
      >
        <Navbar session={session} />
        <main className="flex-grow">{children}</main>
        <TrustBadgeStrip />
        <Footer />
        <AnalyticsTracker />
        <ClientAutoTranslator />
      </body>
    </html>
  );
}

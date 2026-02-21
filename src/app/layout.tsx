import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TrustBadgeStrip } from "@/components/TrustBadgeStrip";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <Navbar />
        <main className="flex-grow">{children}</main>
        <TrustBadgeStrip />
        <Footer />
        <AnalyticsTracker />
      </body>
    </html>
  );
}

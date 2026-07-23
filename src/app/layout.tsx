import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TrustBadgeStrip } from "@/components/TrustBadgeStrip";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { ClientAutoTranslator } from "@/components/ClientAutoTranslator";
import { FloatingWhatsAppButton } from "@/components/global/FloatingWhatsAppButton";
import { auth } from "@/auth";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { GoogleAnalytics } from "@next/third-parties/google"

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

import { getGlobalSettings } from "@/lib/services/globalSettingsService";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getGlobalSettings();
  
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://onedollaronechild.org'),
    title: {
      template: `%s | ${settings.organizationName}`,
      default: `${settings.organizationName} - Educating the Future`,
    },
    description: settings.missionStatement,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: settings.organizationName,
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const settings = await getGlobalSettings();
  
  // Format social links array for schema
  const socialUrls = Object.values(settings.socialLinks).filter(Boolean) as string[];

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
        <main className="flex-grow">
          {children}
        </main>
        <TrustBadgeStrip />
        <Footer />
        <FloatingWhatsAppButton />
        <AnalyticsTracker />
        <ClientAutoTranslator />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NGO",
              name: settings.organizationName,
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://onedollaronechild.org",
              logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://onedollaronechild.org"}/logo.png`,
              contactPoint: {
                "@type": "ContactPoint",
                email: settings.contactEmails.info,
                contactType: "customer service"
              },
              sameAs: socialUrls,
            }),
          }}
        />

        <SpeedInsights />
        <Analytics />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}

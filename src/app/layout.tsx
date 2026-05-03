import type { Metadata } from "next";
import { Nunito, Caveat, Alice, Kelly_Slab } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { MainLayout } from "@/components/shared/MainLayout";
import { ScrollToTop } from "@/components/ui/ScrollToTop/ScrollToTop";
import { SchemaOrg } from "@/components/seo/SchemaOrg";

// Rounded, friendly font for body and headings (Cyrillic supported)
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

// Original Whimsical/Handwritten font (Cyrillic supported)
const whimsicalFont = Caveat({
  variable: "--font-whimsical",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  display: "swap",
});

// Elegant magical serif (replaces Cinzel for Cyrillic support)
const alice = Alice({
  variable: "--font-alice",
  subsets: ["latin", "cyrillic"],
  weight: "400",
  display: "swap",
});

// Fantasy/Potter-style font (replaces Henny Penny for Cyrillic support)
const kellySlab = Kelly_Slab({
  variable: "--font-kelly",
  subsets: ["latin", "cyrillic"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Анна Синиціна — Репетитор для початкової школи",
  description: "Інтерактивне навчання для дітей 1-4 класів",

  appleWebApp: {
    title: "Анна Синиціна",
    statusBarStyle: "default",
    capable: true,
  },
  manifest: "/manifest.json"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://anna-synytsina-tutor-landing.vercel.app" />
      </head>
      <body
        className={`${nunito.variable} ${whimsicalFont.variable} ${alice.variable} ${kellySlab.variable} antialiased font-body text-slate-900 bg-white`}
        suppressHydrationWarning
      >
        <SchemaOrg />
        <MainLayout>
          {children}
          <ScrollToTop />
        </MainLayout>
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}

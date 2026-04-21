import type { Metadata } from "next";
import { Nunito, Caveat, Cinzel, Henny_Penny } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/components/shared/MainLayout";
import { ScrollToTop } from "@/components/ui/ScrollToTop/ScrollToTop";

// Rounded, friendly font for body and headings (Cyrillic supported)
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700", "800", "900"],
});

// Original Whimsical/Handwritten font (Cyrillic supported)
const whimsicalFont = Caveat({
  variable: "--font-whimsical",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const hennyPenny = Henny_Penny({
  variable: "--font-henny",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Primary Tutor Landing",
  description: "Educational platform for personalized learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className={`${nunito.variable} ${whimsicalFont.variable} ${cinzel.variable} ${hennyPenny.variable} antialiased font-body text-slate-900 bg-white`}
      >
        <MainLayout>
          {children}
          <ScrollToTop />
        </MainLayout>
      </body>
    </html>
  );
}




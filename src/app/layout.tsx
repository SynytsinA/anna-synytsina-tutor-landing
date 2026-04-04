import type { Metadata } from "next";
import { Fredoka, Patrick_Hand, Cinzel, Henny_Penny, Poppins } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/components/shared/MainLayout";
import { ScrollToTop } from "@/components/ui/ScrollToTop/ScrollToTop";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

const patrickHand = Patrick_Hand({
  variable: "--font-patrick",
  subsets: ["latin"],
  weight: "400",
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

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Primary Tutor Landing",
  description: "Landing page for Anna Synytsina",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fredoka.variable} ${patrickHand.variable} ${cinzel.variable} ${hennyPenny.variable} ${poppins.variable} antialiased font-body text-slate-900 bg-white`}
      >
        <MainLayout>
          {children}
          <ScrollToTop />
        </MainLayout>
      </body>
    </html>
  );
}

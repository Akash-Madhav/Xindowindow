import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import MobileBottomBar from "@/components/MobileBottomBar";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroller from "@/components/SmoothScroller";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Xindo Window | Premium uPVC Windows & Doors Manufacturer — Chennai, India",
  description: "India's leading Indo-German uPVC windows and doors manufacturer. Sliding, casement, and special windows with 10-year warranty. Trusted by Chennai's top developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable} antialiased bg-[var(--color-black)] text-[var(--color-white)] pb-16 md:pb-0`}
      >
        <div className="fixed inset-0 pointer-events-none z-[9998] mix-blend-overlay opacity-5 md:opacity-[0.04]">
          <svg className="w-full h-full">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>
        <CustomCursor />
        <SmoothScroller>
          <Preloader />
          <Navbar />
          {children}
          <Footer />
          <WhatsAppFloat />
          <MobileBottomBar />
        </SmoothScroller>
      </body>
    </html>
  );
}

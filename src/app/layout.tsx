import type { Metadata } from "next";
import { Outfit, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroller from "@/components/SmoothScroller";
import Footer from "@/components/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
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
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} ${inter.variable} ${spaceMono.variable} antialiased bg-[var(--color-black)] text-[var(--color-white)]`}
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
        </SmoothScroller>
      </body>
    </html>
  );
}

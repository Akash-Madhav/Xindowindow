import type { Metadata } from "next";
import { Outfit, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroller from "@/components/SmoothScroller";
import Footer from "@/components/Footer";
import { RevealProvider } from "@/components/RevealProvider";
import { RevealWrapper } from "@/components/RevealWrapper";
import { getGlobalSettings } from "@/lib/wordpress";
import { WordPressProvider } from "@/lib/WordPressProvider";

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
  metadataBase: new URL("https://xindowindow.com"),
  title: {
    default: "Xindo Window | Premium Indo-German uPVC Fenestration",
    template: "%s | Xindo Window"
  },
  description: "India's leading Indo-German uPVC windows and doors manufacturer. Sliding, casement, and special systems with 10-year warranty. Engineered for architectural precision.",
  keywords: ["uPVC Windows", "uPVC Doors", "Indo-German Fenestration", "Chennai Windows", "Premium Windows"],
  authors: [{ name: "Xindo Window" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://xindowindow.com",
    siteName: "Xindo Window",
    title: "Xindo Window | Premium uPVC Systems",
    description: "Architectural precision fenestration systems powered by German technology.",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Xindo Window Premium Systems" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Xindo Window | Premium uPVC Systems",
    description: "Architectural precision fenestration systems powered by German technology.",
    images: ["/images/og-image.png"]
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalSettings = await getGlobalSettings();

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
        <WordPressProvider settings={globalSettings}>
          <RevealProvider>
            <SmoothScroller>
              <Preloader />
              <RevealWrapper>
                <Navbar />
                {children}
                <Footer />
              </RevealWrapper>
              <WhatsAppFloat />
            </SmoothScroller>
          </RevealProvider>
        </WordPressProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { siteGraph } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap", axes: ["opsz"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  title: { default: `${SITE.name} | Kitchen Remodeling Lehi, UT`, template: `%s` },
  description:
    "Lehi Kitchen Design — licensed kitchen remodelers in Lehi, Utah. Design-build kitchen remodels, custom cabinets, countertops and layout changes across Utah County. Free estimates.",
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  formatDetection: { telephone: true, email: true, address: false },
  category: "Home improvement",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1b3830",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="flex min-h-screen flex-col pb-[72px] sm:pb-0">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-lg">
          Skip to content
        </a>
        <JsonLd graph={siteGraph()} />
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <MobileCTA />
      </body>
    </html>
  );
}

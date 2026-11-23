import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ViewTransition } from "react";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Intro } from "@/components/layout/Intro";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Cursor } from "@/components/layout/Cursor";
import { Providers } from "@/components/layout/Providers";
import { siteConfig, siteUrl } from "@/content/site";
import { localBusinessJsonLd } from "@/lib/seo";

const cormorant = localFont({
  variable: "--font-cormorant",
  display: "swap",
  src: [
    { path: "../../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-italic.woff2", weight: "500", style: "italic" },
  ],
});

const manrope = localFont({
  variable: "--font-manrope",
  display: "swap",
  src: [{ path: "../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2", weight: "200 800", style: "normal" }],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "Opal Coffee Ngong — A Hidden Gem on Ngong Road",
    template: "%s · Opal Coffee, Ngong",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ["Opal Coffee Ngong", "coffee shop Ngong", "café in Ngong", "Ngong Road café", "coffee near Zambia Stage", "Astrol Petrol Station Ngong"],
  openGraph: {
    type: "website",
    locale: "en_KE",
    siteName: siteConfig.name,
    title: "Opal Coffee — The Hidden Gem of Ngong",
    description: siteConfig.description,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#17120f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-KE" className={`${cormorant.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body className="min-h-dvh">
        <a href="#main" className="sr-only z-[200] rounded-full bg-ivory px-5 py-3 text-sm font-semibold text-obsidian focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <Intro />
        <Providers>
          <Header />
          <ViewTransition default="page-fade">
            <main id="main">{children}</main>
          </ViewTransition>
          <Footer />
          <MobileActionBar />
          <Cursor />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}

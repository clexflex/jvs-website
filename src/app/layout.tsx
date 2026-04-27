import type { Metadata } from "next";
import localFont from "next/font/local";
import { LenisProvider } from "@/components/LenisProvider";
import { MobileStickyBar, SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const apercu = localFont({
  variable: "--font-apercu",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/apercu-pro/ApercuPro-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/apercu-pro/ApercuPro-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/apercu-pro/ApercuPro-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/apercu-pro/ApercuPro-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/apercu-pro/ApercuPro-Black.woff2",
      weight: "800",
      style: "normal",
    },
  ],
});

const rockness = localFont({
  variable: "--font-rockness",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/rockness/Rockness.otf",
      weight: "400",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jvsenterprises.co.in"),
  title: {
    default: "JVS Enterprises | Trusted Construction Company in Panhala & Kolhapur",
    template: "%s | JVS Enterprises",
  },
  description:
    "JVS Enterprises is a Panhala-based construction company serving residential, institutional, commercial, RCC, and site development projects across Panhala, Kolhapur, and nearby regions.",
  keywords: [
    "JVS Enterprises",
    "construction company Panhala",
    "construction company Kolhapur",
    "RCC work",
    "civil construction",
    "site development",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://jvsenterprises.co.in",
    siteName: "JVS Enterprises",
    title: "JVS Enterprises | Trusted Construction Company in Panhala & Kolhapur",
    description:
      "Construction, RCC, residential, commercial, institutional, and site development work across Panhala and Kolhapur.",
    images: [{ url: "/JVS-Logo.png", width: 1200, height: 630, alt: "JVS Enterprises" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${apercu.variable} ${rockness.variable}`}>
      <body>
        <LenisProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <MobileStickyBar />
        </LenisProvider>
      </body>
    </html>
  );
}

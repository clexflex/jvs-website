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
      path: "../../public/fonts/apercu-pro/ApercuPro-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/apercu-pro/ApercuPro-ThinItalic.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../public/fonts/apercu-pro/ApercuPro-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/apercu-pro/ApercuPro-ExtraLightItalic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../public/fonts/apercu-pro/ApercuPro-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/apercu-pro/ApercuPro-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
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
      path: "../../public/fonts/apercu-pro/ApercuPro-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/apercu-pro/ApercuPro-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/apercu-pro/ApercuPro-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/apercu-pro/ApercuPro-Black.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/apercu-pro/ApercuPro-BlackItalic.woff2",
      weight: "800",
      style: "italic",
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
  metadataBase: new URL("https://www.jvsenterprises.co.in"),
  title: {
    default: "JVS Enterprises | Construction Company in Panhala & Kolhapur",
    template: "%s",
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
    url: "https://www.jvsenterprises.co.in",
    siteName: "JVS Enterprises",
    title: "JVS Enterprises | Construction Company in Panhala & Kolhapur",
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
    <html
      lang="en"
      className={`${apercu.variable} ${rockness.variable}`}
      suppressHydrationWarning
    >
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

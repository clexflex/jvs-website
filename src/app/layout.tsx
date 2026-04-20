import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jvsenterprises.co.in"),

  title: {
    default: "JVS Enterprises — Construction & Infrastructure Solutions",
    template: "%s | JVS Enterprises",
  },
  description:
    "JVS Enterprises delivers professional construction, infrastructure, and project management services. Quality-driven builds, on time and on budget.",

  keywords: [
    "JVS Enterprises",
    "construction company India",
    "infrastructure solutions",
    "building contractor",
    "civil construction",
    "project management",
  ],

  authors: [{ name: "JVS Enterprises", url: "https://jvsenterprises.co.in" }],
  creator: "JVS Enterprises",
  publisher: "JVS Enterprises",

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://jvsenterprises.co.in",
    siteName: "JVS Enterprises",
    title: "JVS Enterprises — Construction & Infrastructure Solutions",
    description:
      "JVS Enterprises delivers professional construction, infrastructure, and project management services. Quality-driven builds, on time and on budget.",
    images: [
      {
        url: "/JVS-Logo.png",   // place a 1200×630 image in /public
        width: 1200,
        height: 630,
        alt: "JVS Enterprises",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "JVS Enterprises — Construction & Infrastructure Solutions",
    description:
      "JVS Enterprises delivers professional construction, infrastructure, and project management services. Quality-driven builds, on time and on budget.",
    images: ["/JVS-Logo.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  alternates: {
    canonical: "https://jvsenterprises.co.in",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
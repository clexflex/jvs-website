import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/Primitives";

export const metadata: Metadata = {
  title: "Service Documentation | JVS Enterprises",
  description:
    "Service documentation and machine-discovery links for JVS Enterprises website resources.",
  alternates: {
    canonical: "https://www.jvsenterprises.co.in/docs/api",
  },
  authors: [{ name: "JVS Enterprises" }],
  publisher: "JVS Enterprises",
  openGraph: {
    title: "Service Documentation | JVS Enterprises",
    description:
      "Service documentation and machine-discovery links for JVS Enterprises website resources.",
    url: "https://www.jvsenterprises.co.in/docs/api",
    type: "website",
    images: [
      {
        url: "/images/JVS Enterprises Office/conference room.png",
        width: 1200,
        height: 630,
        alt: "JVS Enterprises documentation and resources cover image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Service Documentation | JVS Enterprises",
    description:
      "Service documentation and machine-discovery links for JVS Enterprises website resources.",
    images: ["/images/JVS Enterprises Office/conference room.png"],
  },
};

export default function ServiceDocumentationPage() {
  return (
    <section className="rail-page-band line-grid ">
      <Container className="rail-page__container">
        <div className="rail-page__layout pt-(--header-height) pb-5 ">
          <div className="rail-page__panel rail-page__panel--left">
            <Eyebrow>Service Doc</Eyebrow>
          </div>
          <div className="rail-page__panel rail-page__panel--main">
            <h1>Service Documentation</h1>
            <p>
              This site publishes construction services, projects, insights, and contact resources.
              Use the links below for discovery.
            </p>
            <div className="insight-link-list">
              <Link href="/.well-known/api-catalog">
                <strong>API Catalog</strong>
              </Link>
              <Link href="/sitemap.xml">
                <strong>XML Sitemap</strong>
              </Link>
              <Link href="/robots.txt">
                <strong>Robots Rules</strong>
              </Link>
              <Link href="/api/indexnow/submit-sitemap">
                <strong>IndexNow Submit Endpoint</strong>
              </Link>
            </div>
            <p>Manual trigger example:</p>
            <pre><code>{`curl -X POST https://www.jvsenterprises.co.in/api/indexnow/submit-sitemap \
  -H "content-type: application/json" \
  -d '{"batchSize":500}'`}</code></pre>
          </div>
          <div className="rail-page__panel rail-page__panel--right" />
        </div>
      </Container>
    </section>
  );
}

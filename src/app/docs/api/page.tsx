import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/Primitives";

export const metadata: Metadata = {
  title: "Service Documentation | JVS Enterprises",
  description:
    "Service documentation and machine-discovery links for JVS Enterprises website resources.",
  alternates: {
    canonical: "https://jvsenterprises.co.in/docs/api",
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
            </div>
          </div>
          <div className="rail-page__panel rail-page__panel--right" />
        </div>
      </Container>
    </section>
  );
}

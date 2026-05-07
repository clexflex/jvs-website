import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/Primitives";
import { getInsightSlugs } from "@/content/insights";
import { projects } from "@/content/site";

const staticLinks = [
  { href: "/", label: "Home" },
  { href: "/our-company", label: "Our Company" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-notice", label: "Privacy Notice" },
  { href: "/sitemap.xml", label: "XML Sitemap" },
];

export const metadata: Metadata = {
  title: "HTML Sitemap | JVS Enterprises",
  description:
    "Browse all key pages on the JVS Enterprises website including services, projects, and insights.",
  alternates: {
    canonical: "https://jvsenterprises.co.in/sitemap",
  },
};

export default function HtmlSitemapPage() {
  const insightLinks = getInsightSlugs().map((slug) => ({
    href: `/insights/${slug}`,
    label: slug
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" "),
  }));

  const projectLinks = projects.map((project) => ({
    href: `/projects/${project.slug}`,
    label: project.title,
  }));

  return (
    <>
      <section className="rail-page-hero line-grid">
        <Container className="rail-page__container">
          <div className="rail-page-hero__inner">
            <div>
              <Eyebrow>Navigation</Eyebrow>
              <h1>HTML Sitemap</h1>
            </div>
          </div>
        </Container>
      </section>

      <section className="rail-page-band line-grid">
        <Container className="rail-page__container">
          <div className="rail-page__layout">
            <div className="rail-page__panel rail-page__panel--left">
              <Eyebrow>Main Pages</Eyebrow>
            </div>
            <div className="rail-page__panel rail-page__panel--main">
              <div className="insight-link-list">
                {staticLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <strong>{link.label}</strong>
                  </Link>
                ))}
              </div>
            </div>
            <div className="rail-page__panel rail-page__panel--right" />
          </div>
        </Container>
      </section>

      <section className="rail-page-band line-grid">
        <Container className="rail-page__container">
          <div className="rail-page__layout">
            <div className="rail-page__panel rail-page__panel--left">
              <Eyebrow>Projects</Eyebrow>
            </div>
            <div className="rail-page__panel rail-page__panel--main">
              <div className="insight-link-list">
                {projectLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <strong>{link.label}</strong>
                  </Link>
                ))}
              </div>
            </div>
            <div className="rail-page__panel rail-page__panel--right" />
          </div>
        </Container>
      </section>

      <section className="rail-page-band line-grid">
        <Container className="rail-page__container">
          <div className="rail-page__layout">
            <div className="rail-page__panel rail-page__panel--left">
              <Eyebrow>Insights</Eyebrow>
            </div>
            <div className="rail-page__panel rail-page__panel--main">
              <div className="insight-link-list">
                {insightLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <strong>{link.label}</strong>
                  </Link>
                ))}
              </div>
            </div>
            <div className="rail-page__panel rail-page__panel--right" />
          </div>
        </Container>
      </section>
    </>
  );
}

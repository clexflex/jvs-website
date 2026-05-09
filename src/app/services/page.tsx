import type { Metadata } from "next";
import Link from "next/link";
import { CTAButton, Container, Eyebrow } from "@/components/Primitives";
import { ServiceParallaxMedia } from "@/components/ShowcaseMedia";
import { services, siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Construction Services in Panhala & Kolhapur",
  description:
    "JVS Enterprises offers site assessment, planning, estimation, residential construction, commercial construction, institutional construction, RCC work, finishing, renovation, compound walls, water tanks, drainage, and site development services.",
};

const serviceImageById: Record<string, string> = {
  planning: "/images/services/PLANNING & PRE-CONSTRUCTION.webp",
  construction: "/images/services/BUILDING CONSTRUCTION.webp",
  "rcc-works": "/images/services/RCC & STRUCTURAL WORKS.webp",
  finishing: "/images/services/FINISHING & COORDINATION.webp",
  renovation: "/images/services/REPAIR, RENOVATION & SPECIALTY WORKS.webp",
  "site-development": "/images/services/SITE DEVELOPMENT & EXTERNAL WORKS.webp",
};

export default function ServicesPage() {
  return (
    <>
      <section className="rail-page-hero services-page-hero line-grid">
        <Container className="rail-page__container">
          <div className="services-page-hero__inner">
            <div>
              <Eyebrow>Making It Happen</Eyebrow>
              <h1>Our Services</h1>
            </div>
          </div>
        </Container>
      </section>

      <nav className="anchor-nav anchor-nav--rail line-grid" aria-label="Service sections">
        <Container className="rail-page__container">
          <div className="services-anchor-layout">
            <div>
              <p className="services-anchor-layout__label">Jump to service</p>
            </div>
            <div className="services-anchor-links">
              {services.map((service) => (
                <a key={service.id} href={`/services#${service.id}`}>
                  {service.navLabel}
                </a>
              ))}
            </div>
          </div>
        </Container>
      </nav>

      {services.map((service, index) => (
        <section key={service.id} id={service.id} className="services-showcase line-grid">
          <Container className="rail-page__container">
            <article
              className={`services-showcase__inner ${
                index % 2 === 1 ? "services-showcase__inner--reverse" : ""
              }`}
            >
              <div className="services-showcase__copy">
                <Eyebrow>{service.eyebrow}</Eyebrow>
                <p className="services-showcase__index">{String(index + 1).padStart(2, "0")}</p>
                <h2>{service.heading}</h2>
                <p>{service.body}</p>
                {"note" in service && service.note ? (
                  <p className="services-showcase__note">{service.note}</p>
                ) : null}
                <details className="services-showcase__scope">
                  <summary>Services included</summary>
                  <ul>
                    {service.included.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </details>
                {"usefulFor" in service && service.usefulFor ? (
                  <details className="services-showcase__scope">
                    <summary>Useful for</summary>
                    <ul>
                      {service.usefulFor.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </details>
                ) : null}
                {"quality" in service && service.quality ? (
                  <details className="services-showcase__scope">
                    <summary>Quality focus</summary>
                    <ul>
                      {service.quality.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </details>
                ) : null}
                {"related" in service && service.related ? (
                  <details className="services-showcase__scope">
                    <summary>Related project examples</summary>
                    <ul>
                      {service.related.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </details>
                ) : null}
                <Link className="services-showcase__link" href="/contact">
                  {service.cta}
                </Link>
              </div>
              <div className="services-showcase__media">
                <ServiceParallaxMedia
                  eyebrow={service.title}
                  title={service.heading}
                  detail={service.summary}
                  imageSrc={serviceImageById[service.id]}
                  priority={index === 0}
                />
              </div>
            </article>
          </Container>
        </section>
      ))}

      <section className="rail-page-band rail-page-band--cta line-grid">
        <Container className="rail-page__container">
          <div className="rail-page__layout rail-page-cta">
            <div className="rail-page__panel rail-page__panel--left">
              <Eyebrow>Guidance</Eyebrow>
            </div>
            <div className="rail-page__panel rail-page__panel--main">
              <h2>Build with a team that understands planning, structure, and site realities.</h2>
              <p>
                Whether you are starting with land, drawings, an estimate requirement, or an
                existing structure, the right next step begins with a clear site conversation.
              </p>
            </div>
            <div className="rail-page__panel rail-page__panel--right">
              <div className="hero-actions">
                <CTAButton href="/contact">Request an Estimate</CTAButton>
                <CTAButton href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} tone="outline">
                  Call {siteConfig.phone}
                </CTAButton>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

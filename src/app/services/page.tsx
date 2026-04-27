import type { Metadata } from "next";
import { CTAButton, Container, Eyebrow, PageIntro } from "@/components/Primitives";
import { services, siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Construction Services in Panhala & Kolhapur",
  description:
    "JVS Enterprises offers site assessment, planning, estimation, residential construction, commercial construction, institutional construction, RCC work, finishing, renovation, compound walls, water tanks, drainage, and site development services.",
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="OUR SERVICES"
        title="Construction services planned from the first site visit to final handover."
        copy="JVS Enterprises provides complete construction support across planning, estimation, civil construction, RCC work, finishing, renovation, repair, fabrication, and external site development. Every service is handled with practical site understanding, supervision, and a focus on long-term reliability."
        primary={{ label: "Request an Estimate", href: "/contact" }}
        secondary={{ label: "View Related Projects", href: "/projects" }}
      />

      <nav className="anchor-nav" aria-label="Service sections">
        <Container>
          {services.map((service) => (
            <a key={service.id} href={`#${service.id}`}>
              {service.navLabel}
            </a>
          ))}
        </Container>
      </nav>

      <Container>
        {services.map((service) => (
          <section className="service-detail" id={service.id} key={service.id}>
            <div className="service-detail__copy">
              <Eyebrow>{service.eyebrow}</Eyebrow>
              <h2>{service.heading}</h2>
              <p>{service.body}</p>
              {"note" in service && service.note ? <p className="brand-line">{service.note}</p> : null}
              <CTAButton href="/contact" tone="outline">
                {service.cta}
              </CTAButton>
            </div>
            <div className="list-panel">
              <h3>Services included</h3>
              <ul className="check-list">
                {service.included.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </Container>

      <section className="cta-band">
        <Container>
          <div>
            <Eyebrow>GUIDANCE</Eyebrow>
            <h2>Build with a team that understands planning, structure, and site realities.</h2>
            <p>
              Share your project details with JVS Enterprises. Whether you are starting
              with land, drawings, an estimate requirement, or an existing structure, the
              right next step begins with a clear site conversation.
            </p>
          </div>
          <div className="hero-actions">
            <CTAButton href="/contact" tone="light">Request an Estimate</CTAButton>
            <CTAButton href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} tone="outline">
              Call {siteConfig.phone}
            </CTAButton>
          </div>
        </Container>
      </section>
    </>
  );
}

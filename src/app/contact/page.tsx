import type { Metadata } from "next";
import Image from "next/image";
import { CTAButton, Container, Eyebrow, PageIntro, Section } from "@/components/Primitives";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact JVS Enterprises",
  description:
    "Contact JVS Enterprises in Panhala for residential, institutional, commercial, RCC, renovation, and site development project discussions across Kolhapur and nearby areas.",
};

const serviceAreas = ["Panhala", "Kolhapur", "Kodoli", "Kadamwadi", "Talsande", "Nearby regions"];

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="CONTACT"
        title="Start the conversation before work begins on site."
        copy="Share your location, project type, drawings, or scope note with JVS Enterprises. We can help you review the site condition, the likely construction path, and the right next step before execution starts."
        primary={{ label: "Call JVS Enterprises", href: `tel:${siteConfig.phone.replace(/\s/g, "")}` }}
        secondary={{ label: "Email the Team", href: `mailto:${siteConfig.email}` }}
      />

      <Section>
        <div className="contact-layout">
          <div>
            <div className="section-header" style={{ marginBottom: 32 }}>
              <div>
                <Eyebrow>DIRECT CONTACT</Eyebrow>
                <h2>Reach the team through the channel that suits your project.</h2>
              </div>
            </div>

            <div className="contact-grid">
              <article className="contact-card line-card">
                <p className="card-kicker">Office</p>
                <h3>JVS Enterprises</h3>
                <p>{siteConfig.address}</p>
              </article>

              <article className="contact-card line-card">
                <p className="card-kicker">Call</p>
                <h3>{siteConfig.phone}</h3>
                <p>{siteConfig.alternatePhone}</p>
              </article>

              <article className="contact-card line-card">
                <p className="card-kicker">Email</p>
                <h3>{siteConfig.email}</h3>
                <p>Send drawings, a scope note, or your preferred time for a site discussion.</p>
              </article>

              <article className="contact-card line-card">
                <p className="card-kicker">Service Area</p>
                <h3>Panhala to Kolhapur</h3>
                <p>{serviceAreas.join(", ")}</p>
              </article>
            </div>
          </div>

          <div className="enquiry-form">
            <figure className="contact-office-media">
              <Image
                src="/images/JVS Enterprises Office/office-1.png"
                alt="JVS Enterprises office workspace"
                fill
                sizes="(max-width: 899px) 100vw, 40vw"
              />
            </figure>
            <Eyebrow>PROJECT ENQUIRY</Eyebrow>
            <h2>What helps us guide you faster</h2>
            <p>
              If you already have your project location, drawing status, budget range, or
              required timeline, include that in your call or email. That context helps us make
              the discussion more practical from the start.
            </p>
            <div className="hero-actions">
              <CTAButton href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
                Call {siteConfig.phone}
              </CTAButton>
              <CTAButton href={`mailto:${siteConfig.email}`} tone="outline">
                Email JVS
              </CTAButton>
            </div>
          </div>
        </div>
      </Section>

      <section className="cta-band">
        <Container>
          <div>
            <Eyebrow>NEXT STEP</Eyebrow>
            <h2>Have a live project in mind?</h2>
            <p>
              A short conversation now can help clarify the scope, estimate, approvals, site
              realities, and the construction sequence before work begins.
            </p>
          </div>
          <div className="hero-actions">
            <CTAButton href="/projects" tone="light">
              View Projects
            </CTAButton>
            <CTAButton href="/insights" tone="light">
              Read Insights
            </CTAButton>
          </div>
        </Container>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { CTAButton, Container, Eyebrow } from "@/components/Primitives";
import { PlaceholderFigure } from "@/components/ShowcaseMedia";
import { projects, siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Our Company | JVS Enterprises Construction Company in Panhala",
  description:
    "Learn about JVS Enterprises, a Panhala-based construction company founded around 2006 and trusted for residential, institutional, commercial, RCC, and site development work across Kolhapur.",
};

const values = [
  [
    "Quality in execution",
    "From foundation and RCC to finishing and external works, the company focuses on construction that is checked, supervised, and completed with attention to detail.",
  ],
  [
    "Reliability in commitment",
    "Clients need clear communication, predictable progress, and responsible handling of work. JVS gives importance to practical planning and site-level accountability.",
  ],
  [
    "Ethical working standards",
    "Construction involves trust. JVS believes in working with transparency, practical estimates, and respect for the client’s project requirements.",
  ],
  [
    "Local understanding",
    "Panhala and Kolhapur have specific site conditions, terrain, access, drainage, and weather considerations. Local experience helps the company plan and execute better.",
  ],
  [
    "Supervised construction",
    "Good work needs daily attention. Site engineers, supervisors, skilled labour, and equipment operators contribute to progress, quality, and safety.",
  ],
  [
    "Long-term thinking",
    "A structure should serve the people who use it. JVS gives importance to strength, usability, maintenance, and durability beyond handover.",
  ],
];

export default function OurCompanyPage() {
  return (
    <>
      <section className="rail-page-hero company-page-hero line-grid">
        <Container className="rail-page__container">
          <div className="rail-page__layout company-page-hero__layout">
            <div className="rail-page__panel rail-page__panel--left">
              <Eyebrow>Our Company</Eyebrow>
              <p className="rail-page__meta">{siteConfig.locationLine}</p>
            </div>
            <div className="rail-page__panel rail-page__panel--main">
              <h1>A construction journey built from the ground up.</h1>
            </div>
            <div className="rail-page__panel rail-page__panel--right">
              <p>
                JVS Enterprises began with a small start in Panhala and grew through years of
                hard work, site discipline, and client trust. The company’s story is still
                rooted in practical execution, local understanding, and dependable delivery.
              </p>
              <p className="brand-line">{siteConfig.slogan}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="rail-page-band line-grid">
        <Container className="rail-page__container">
          <div className="rail-page__layout company-story">
            <div className="rail-page__panel rail-page__panel--left">
              <Eyebrow>Who We Are</Eyebrow>
            </div>
            <div className="rail-page__panel rail-page__panel--main company-story__copy">
              <h2>A Panhala-based construction company with practical site experience.</h2>
              <p>
                JVS Enterprises is a construction company based in Panhala, Maharashtra,
                serving projects across Panhala, Kolhapur, and nearby regions. The company
                works across planning, estimation, civil construction, RCC work, finishing,
                renovation, repair, fabrication, and site development.
              </p>
              <p>
                From homes and farmhouses to institutional buildings, compound walls, water
                tanks, sports grounds, gutters, and external works, JVS Enterprises focuses
                on getting the fundamentals right.
              </p>
              <p className="brand-line">
                Every project must be reliable, usable, and built with responsibility.
              </p>
            </div>
            <div className="rail-page__panel rail-page__panel--right company-story__media">
              <PlaceholderFigure
                eyebrow="Site discipline"
                title="Built through practical execution"
                caption="Placeholder photography to be replaced with company and site visuals."
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="rail-page-band rail-page-band--soft line-grid">
        <Container className="rail-page__container">
          <div className="rail-page__layout company-story company-story--reverse">
            <div className="rail-page__panel rail-page__panel--left company-story__media">
              <PlaceholderFigure
                eyebrow="Founder journey"
                title="The work behind the name"
                caption="A founder-led construction practice shaped by years of site responsibility."
              />
            </div>
            <div className="rail-page__panel rail-page__panel--main company-story__copy">
              <Eyebrow>Founder Journey</Eyebrow>
              <h2>The growth of JVS Enterprises reflects the work behind the name.</h2>
              <p>
                The journey of JVS Enterprises is closely connected with the work ethic of its
                owner, Mr. Satish Bhosale. Around 2006, the company began with a small start.
                Over the years, through consistent construction work, personal involvement, and
                local trust, the company grew project by project.
              </p>
              <p>
                What started as a modest construction effort has developed into a company with a
                workforce of 100+ workers and an approximate turnover of ₹10 crore.
              </p>
            </div>
            <div className="rail-page__panel rail-page__panel--right company-story__support">
              <p>A name becomes trusted only when the work behind it stays consistent.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="rail-page-band line-grid">
        <Container className="rail-page__container">
          <div className="rail-page__layout company-mission">
            <div className="rail-page__panel rail-page__panel--left">
              <Eyebrow>Mission &amp; Vision</Eyebrow>
            </div>
            <div className="rail-page__panel rail-page__panel--main">
              <h2>Built on quality, reliability, and client satisfaction.</h2>
              <p>
                JVS Enterprises believes that good construction is not only about completing a
                structure. It is about respecting the client’s investment, planning the work
                properly, supervising the site carefully, and delivering a result that stands.
              </p>
            </div>
            <div className="rail-page__panel rail-page__panel--right company-mission__cards">
              <article>
                <p>Mission</p>
                <strong>
                  Understand each client’s requirement clearly and deliver high-quality
                  construction work with responsible site execution.
                </strong>
              </article>
              <article>
                <p>Vision</p>
                <strong>
                  Be known for ethical standards, dependable quality, customer satisfaction,
                  learning, and long-term reliability.
                </strong>
              </article>
            </div>
          </div>
        </Container>
      </section>

      <section className="rail-page-band rail-page-band--soft line-grid">
        <Container className="rail-page__container">
          <div className="rail-page__layout company-values">
            <div className="rail-page__panel rail-page__panel--left">
              <Eyebrow>Our Working Values</Eyebrow>
            </div>
            <div className="rail-page__panel rail-page__panel--main company-values__intro">
              <h2>The standards that guide our sites.</h2>
            </div>
            <div className="rail-page__panel rail-page__panel--right">
              <p>
                The company’s values are visible in how work is planned, supervised, executed,
                and handed over.
              </p>
            </div>
          </div>
          <div className="company-values__grid">
            {values.map(([title, copy]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="rail-page-band line-grid">
        <Container className="rail-page__container">
          <div className="rail-page__layout company-team">
            <div className="rail-page__panel rail-page__panel--left">
              <Eyebrow>Team</Eyebrow>
            </div>
            <div className="rail-page__panel rail-page__panel--main company-team__copy">
              <h2>Construction is delivered by people who understand the site.</h2>
              <p>
                Behind every completed project is a team responsible for planning, accounts,
                supervision, execution, equipment movement, and site coordination. JVS
                Enterprises is supported by experienced site-level professionals across
                engineering, supervision, and labour operations.
              </p>
            </div>
            <div className="rail-page__panel rail-page__panel--right company-team__roles">
              <ul>
                {[
                  "Accounts and project coordination",
                  "Site engineering",
                  "Site supervision",
                  "Skilled construction labour",
                  "JCB and tractor operations",
                  "Material and site movement support",
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="rail-page-band rail-page-band--soft line-grid">
        <Container className="rail-page__container">
          <div className="rail-page__layout company-roots">
            <div className="rail-page__panel rail-page__panel--left">
              <Eyebrow>Panhala Roots</Eyebrow>
            </div>
            <div className="rail-page__panel rail-page__panel--main">
              <h2>Local experience makes construction decisions sharper.</h2>
            </div>
            <div className="rail-page__panel rail-page__panel--right">
              <p>
                Many JVS projects have been shaped by the region’s realities: sloped sites,
                monsoon water movement, access roads, compound wall requirements, farmhouse
                plots, material movement, and external development work.
              </p>
            </div>
          </div>
          <div className="project-rail company-roots__rail">
            {projects.slice(0, 5).map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`}>
                <span>{project.category}</span>
                <strong>{project.title}</strong>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="rail-page-band rail-page-band--cta line-grid">
        <Container className="rail-page__container">
          <div className="rail-page__layout rail-page-cta">
            <div className="rail-page__panel rail-page__panel--left">
              <Eyebrow>Work With JVS</Eyebrow>
            </div>
            <div className="rail-page__panel rail-page__panel--main">
              <h2>Start with a clear conversation before construction begins.</h2>
              <p>
                Whether you are planning a home, farmhouse, institutional building, commercial
                space, compound wall, RCC structure, or site development work, JVS Enterprises
                can help you understand the scope and practical steps required.
              </p>
            </div>
            <div className="rail-page__panel rail-page__panel--right">
              <div className="hero-actions">
                <CTAButton href="/contact">Discuss a Project</CTAButton>
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

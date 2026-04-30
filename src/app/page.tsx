import type { Metadata } from "next";
import Image from "next/image";
import { InsightCard, ProjectCard, ServiceCard } from "@/components/Cards";
import { CTAButton, Container, Eyebrow, Section, VisualPlaceholder } from "@/components/Primitives";
import { ProjectSlider } from "@/components/Sliders";
import { getAllInsights, getLocalBusinessSchema } from "@/content/insights";
import { projects, services, siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "JVS Enterprises | Trusted Construction Company in Panhala & Kolhapur",
  description:
    "JVS Enterprises is a Panhala-based construction company serving residential, institutional, commercial, RCC, and site development projects across Panhala, Kolhapur, and nearby regions.",
};

const buildCards = [
  {
    title: "Build a Home",
    copy: "Residential houses, row houses, and personal properties planned for durability, comfort, and daily use.",
    cta: "Explore Residential Work",
    href: "/projects#residential",
  },
  {
    title: "Build an Institution",
    copy: "College, hospital, campus, and public-use structures that require stronger coordination, dependable RCC work, and disciplined execution.",
    cta: "View Institutional Projects",
    href: "/projects#institutional",
  },
  {
    title: "Build a Commercial Space",
    copy: "Commercial and business-use buildings designed around access, services, structural strength, and long-term maintenance.",
    cta: "Explore Commercial Construction",
    href: "/services#construction",
  },
  {
    title: "Develop a Site",
    copy: "Compound walls, gutters, roads, paver blocks, water tanks, sports grounds, and external works that complete a property beyond the main structure.",
    cta: "View Site Development Services",
    href: "/services#site-development",
  },
];

const processSteps = [
  ["01. Site Visit", "We review the location, site conditions, access, levels, drainage, and practical construction requirements."],
  ["02. Scope & Estimate", "The project scope, BOQ, budget expectations, and material requirements are reviewed before execution begins."],
  ["03. Planning & Coordination", "Drawings, schedules, labour, materials, equipment, and approvals are coordinated for smoother execution."],
  ["04. Construction Execution", "Foundation, RCC, masonry, finishing, and external works are executed stage by stage under site supervision."],
  ["05. Quality Checks", "Work is monitored for alignment, strength, curing, finishing, safety, and long-term usability."],
  ["06. Handover", "The site is completed, cleaned, reviewed, and handed over with attention to final usability."],
];

export default function Home() {
  const featuredProjects = projects.slice(0, 6);
  const featuredInsights = getAllInsights().slice(0, 3);
  const localBusinessSchema = getLocalBusinessSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <section className="home-hero">
        <div className="home-hero__media" aria-hidden="true">
          <video src="/web-hero.mp4" autoPlay muted loop playsInline preload="metadata" />
        </div>
        <Container>
          <div className="home-hero__content">
            <div className="home-hero__title">
              <p className="hero-slogan" aria-label={siteConfig.slogan}>
                <span>A NAME YOU CAN</span>
                <strong>Trust</strong>
              </p>
              <p className="scroll-prompt">
                What are you planning to build?
                <Image src="/assets/btn-arrow.svg" alt="" width={35} height={14} />
              </p>
            </div>
          </div>
        </Container>
        <div className="scroll-down" aria-hidden="true">
          <span className="scroll-down-txt">Scroll</span>
          <span className="scroll-down-icon">
            <Image
              className="scroll-down-img"
              src="/assets/scroll-down-icon.svg"
              alt=""
              width={18}
              height={29}
            />
            <span className="scroll-down-line" />
          </span>
        </div>
      </section>

      <Section>
        <div className="section-header">
          <div>
            <Eyebrow>BUILD WITH JVS</Eyebrow>
            <h2>One construction partner for the work that matters.</h2>
          </div>
          <p>
            Every project begins differently. Some clients come with land. Some come with
            drawings. Some need an estimate, a site visit, or a contractor who can take
            responsibility from planning to execution.
          </p>
        </div>
        <div className="card-grid">
          {buildCards.map((card, index) => (
            <ServiceCard
              key={card.title}
              index={index + 1}
              title={card.title}
              copy={card.copy}
              href={card.href}
              cta={card.cta}
            />
          ))}
        </div>
      </Section>

      <Section className="section--soft">
        <div className="section-header">
          <div>
            <Eyebrow>OUR SERVICES</Eyebrow>
            <h2>Construction services from planning to handover.</h2>
          </div>
          <p>
            JVS Enterprises supports projects through every major stage of construction —
            from site assessment, estimates, and drawing coordination to RCC work, finishing,
            external development, and final handover.
          </p>
        </div>
        <div className="card-grid">
          {services.slice(0, 4).map((service, index) => (
            <ServiceCard
              key={service.id}
              index={index + 1}
              title={service.title}
              copy={service.summary}
              href={`/services#${service.id}`}
              cta={service.cta}
            />
          ))}
        </div>
      </Section>

      <Section>
        <div className="section-header">
          <div>
            <Eyebrow>SELECTED WORK</Eyebrow>
            <h2>Projects built with purpose, supervision, and site discipline.</h2>
          </div>
          <p>
            The strength of a construction company is visible on site — in the foundation,
            the RCC work, the finishing, the drainage, and the way every stage is coordinated.
          </p>
        </div>
        <div className="project-grid">
          {featuredProjects.slice(0, 5).map((project, index) => (
            <ProjectCard
              key={project.slug}
              title={project.title}
              category={project.category}
              location={project.location}
              description={project.description}
              href={`/projects/${project.slug}`}
              featured={index === 0}
            />
          ))}
        </div>
        <div style={{ marginTop: 28 }}>
          <ProjectSlider items={featuredProjects} />
        </div>
        <CTAButton href="/projects" tone="outline">
          View All Projects
        </CTAButton>
      </Section>

      <Section className="section--soft">
        <div className="split">
          <VisualPlaceholder label="Panhala · Kolhapur" tall />
          <div className="split__copy">
            <Eyebrow>OUR COMPANY</Eyebrow>
            <h2>Built from Panhala. Trusted across projects.</h2>
            <p>
              JVS Enterprises began around 2006 with a small start and a clear commitment to
              dependable construction work. Under the leadership of Mr. Satish Bhosale, the
              company has grown through years of site execution, client relationships, and
              practical experience across Panhala, Kolhapur, and nearby regions.
            </p>
            <p>
              Today, JVS Enterprises works with a team of 100+ workers and handles projects
              across residential, institutional, commercial, RCC, finishing, and site
              development work.
            </p>
            <CTAButton href="/our-company" tone="outline">
              Know Our Journey
            </CTAButton>
          </div>
        </div>
      </Section>

      <Section>
        <div className="section-header">
          <div>
            <Eyebrow>HOW WE WORK</Eyebrow>
            <h2>A clear process keeps construction controlled.</h2>
          </div>
          <p>
            Good construction depends on sequence. Before work begins on site, the scope
            must be understood, drawings must be coordinated, cost must be estimated, and
            execution must be planned.
          </p>
        </div>
        <div className="process-grid">
          {processSteps.map(([title, copy]) => (
            <article className="process-step" key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="section--soft">
        <div className="section-header">
          <div>
            <Eyebrow>INSIGHTS</Eyebrow>
            <h2>Practical construction knowledge for better decisions.</h2>
          </div>
          <p>
            Before starting construction, clients should understand planning, cost, RCC
            quality, drainage, site supervision, and contractor selection.
          </p>
        </div>
        <div className="insight-grid">
          {featuredInsights.map((insight, index) => (
            <InsightCard
              key={insight.slug}
              title={insight.title}
              category={insight.category}
              excerpt={insight.listingExcerpt}
              href={`/insights/${insight.slug}`}
              featured={index === 0}
            />
          ))}
        </div>
      </Section>

      <section className="cta-band">
        <Container>
          <div>
            <Eyebrow>START A CONVERSATION</Eyebrow>
            <h2>Have land, drawings, or a project idea?</h2>
            <p>
              Speak with JVS Enterprises before beginning your project. A clear conversation
              at the start can help define the scope, estimate the work, identify site
              challenges, and plan the right way forward.
            </p>
          </div>
          <div className="hero-actions">
            <CTAButton href="/contact" tone="light">
              Discuss a Project
            </CTAButton>
            <CTAButton href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} tone="light">
              Call {siteConfig.phone}
            </CTAButton>
          </div>
        </Container>
      </section>
    </>
  );
}

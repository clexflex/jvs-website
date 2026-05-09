import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  HomeEditorialStack,
  type HomeEditorialStackItem,
} from "@/components/HomeEditorialStack";
import { ArrowLink, CTAButton, Container, Eyebrow } from "@/components/Primitives";
import { getAllInsights, getLocalBusinessSchema } from "@/content/insights";
import { siteConfig } from "@/content/site";

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

function HomeRailIntro({
  title,
}: {
  title: string;
}) {
  return (
    <div className="home-rail-intro" data-rail-row="1">
      <div className="home-rail-intro__panel home-rail-intro__panel--main" data-rail-row="1">
        <h2>{title}</h2>
      </div>
    </div>
  );
}

function HomeRailMedia({
  src = "/images/project-image-placeholder.jpg",
  title,
  priority = false,
  sizes = "(max-width: 760px) 100vw, 42vw",
}: {
  src?: string;
  title: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className="home-rail-media">
      <div className="home-rail-media__visual">
        <Image
          src={src}
          alt={title}
          fill
          sizes={sizes}
          priority={priority}
        />
      </div>
    </div>
  );
}

function HomeFeatureCard({
  eyebrow,
  title,
  copy,
  href,
  linkLabel,
  imageSrc,
  priority = false,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  href: string;
  linkLabel: string;
  imageSrc?: string;
  priority?: boolean;
}) {
  return (
    <article className="home-editorial-card home-editorial-card--feature" data-rail-row="1">
      <Link className="home-editorial-card__media-link" href={href}>
        <HomeRailMedia
          src={imageSrc}
          title={title}
          priority={priority}
          sizes="(max-width: 760px) 100vw, 52vw"
        />
      </Link>
      <div className="home-editorial-card__body">
        <p className="card-kicker">{eyebrow}</p>
        <h3>
          <Link href={href}>{title}</Link>
        </h3>
        {copy ? <p>{copy}</p> : null}
        <ArrowLink href={href}>{linkLabel}</ArrowLink>
      </div>
    </article>
  );
}

function HomeCapabilityCard({
  index,
  title,
  copy,
  href,
  cta,
}: {
  index: number;
  title: string;
  copy: string;
  href: string;
  cta: string;
}) {
  return (
    <article className="home-capability-card">
      <p className="card-index">{String(index).padStart(2, "0")}</p>
      <h3>{title}</h3>
      <p>{copy}</p>
      <ArrowLink href={href}>{cta}</ArrowLink>
    </article>
  );
}

export default function Home() {
  const editorialImages = [
    "/images/project-image-1-Panhala-Powar.jpg",
    "/images/project-image-2-Panhala-Powar.jpg",
    "/images/project-image-3-Panhala-Powar.jpg",
  ];

  const featuredInsights = getAllInsights().slice(0, 7);
  const featuredInsight = featuredInsights[0];
  const supportingInsights = featuredInsights.slice(1, 7);
  const localBusinessSchema = getLocalBusinessSchema();
  const supportingInsightItems: HomeEditorialStackItem[] = supportingInsights.map(
    (insight, index) => ({
      title: insight.title,
      href: `/insights/${insight.slug}`,
      linkLabel: "Read More",
      imageSrc: editorialImages[(index + 1) % editorialImages.length],
    }),
  );

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

      {featuredInsight ? (
        <section className="home-rail-section home-rail-section--insights line-grid">
          <Container className="home-rail-shell">
            <HomeRailIntro title="News & Insights" />
            <div className="home-rail-editorial home-rail-editorial--insights">
              <div className="home-rail-editorial__feature">
                <HomeFeatureCard
                  eyebrow={featuredInsight.category}
                  title={featuredInsight.title}
                  href={`/insights/${featuredInsight.slug}`}
                  linkLabel="Read More"
                  imageSrc={editorialImages[0]}
                  priority
                />
              </div>
              <HomeEditorialStack items={supportingInsightItems} />
            </div>
            <div className="home-rail-actions">
              <CTAButton href="/insights" tone="outline">
                View All Insights
              </CTAButton>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="home-rail-section home-rail-section--build line-grid">
        <Container className="home-rail-shell">
          <div className="home-slab-layout">
            <div className="home-slab-layout__intro" data-rail-row="1">
              <Eyebrow>BUILD WITH JVS</Eyebrow>
              <h2>One construction partner for the work that matters.</h2>
              <p>
                Every project begins differently. Some clients come with land. Some come with
                drawings. Some need an estimate, a site visit, or a contractor who can take
                responsibility from planning to execution.
              </p>
            </div>
            <div className="home-slab-layout__grid" data-rail-row="1">
              {buildCards.map((card, index) => (
                <HomeCapabilityCard key={card.title} index={index + 1} {...card} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="home-rail-section home-rail-section--process line-grid">
        <Container className="home-rail-shell">
          <div className="home-process-layout">
            <div className="home-process-layout__intro" data-rail-row="1">
              <Eyebrow>HOW WE WORK</Eyebrow>
              <h2>A clear process keeps construction controlled.</h2>
              <p>
                Good construction depends on sequence. Before work begins on site, the scope
                must be understood, drawings must be coordinated, cost must be estimated, and
                execution must be planned.
              </p>
            </div>
            <div className="home-process-layout__steps" data-rail-row="1">
              {processSteps.map(([title, copy]) => (
                <article className="home-process-step" key={title}>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

    </>
  );
}

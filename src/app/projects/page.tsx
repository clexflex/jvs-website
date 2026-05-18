import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CTAButton, Container, Eyebrow } from "@/components/Primitives";
import { ProjectsHeroCarousel } from "@/components/ShowcaseMedia";
import { getProjectHeroSlides, getProjectsPageData } from "@/content/projects-page";

export const metadata: Metadata = {
  title: "Projects | JVS Enterprises",
  description:
    "Explore selected JVS Enterprises projects across institutional construction, residential houses, farmhouses, RCC works, compound walls, water tanks, sports grounds, and site development in Kolhapur and Panhala.",
};

const categories = [
  [
    "Institutional projects",
    "Educational, healthcare, and campus-related projects require coordination, safety awareness, durable construction, and the ability to manage larger site requirements.",
  ],
  [
    "Residential projects",
    "Homes, row houses, and personal properties require careful planning, cost discipline, strong RCC work, waterproofing, finishing quality, and practical handover.",
  ],
  [
    "Farmhouse projects",
    "Farmhouses near Panhala and Kolhapur often need terrain understanding, external development, water storage, drainage, access roads, and long-term weather resistance.",
  ],
  [
    "RCC and structural works",
    "Structural work determines the life of a building. JVS undertakes foundations, RCC elements, lift structures, water tanks, compound walls, and related works.",
  ],
  [
    "Site development",
    "Drainage, gutters, paver blocks, roads, boundary gates, sports grounds, and external development works help complete and protect the property.",
  ],
];

function getPageHref(page: number) {
  return page <= 1 ? "/projects" : `/projects?page=${page}`;
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const heroSlides = getProjectHeroSlides();
  const { currentPage, items, totalPages } = getProjectsPageData(resolvedSearchParams?.page);

  return (
    <>
      <section className="projects-page-hero line-grid">
        <ProjectsHeroCarousel items={heroSlides} />
      </section>

      <section className="rail-page-band line-grid">
        <Container className="rail-page__container">
          <div className="rail-page__layout projects-page__summary">
            <div className="rail-page__panel rail-page__panel--left">
              <Eyebrow>Selected Work</Eyebrow>
            </div>
            <div className="rail-page__panel rail-page__panel--main">
              <h1>Work that stands on site, not just on paper.</h1>
            </div>
            <div className="rail-page__panel rail-page__panel--right">
              <p>
                JVS Enterprises has delivered construction work across educational buildings,
                hospital boundary works, sports and campus development, RCC structures, water
                tanks, residential homes, row houses, and farmhouses.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="projects-index-grid-section line-grid">
        <Container className="rail-page__container">
          <div className="projects-index-grid">
            {items.map((project) => (
              <article key={project.slug} className="projects-index-card">
                <Link className="projects-index-card__image" href={`/projects/${project.slug}`}>
                  <Image
                    src={project.coverImage}
                    alt={project.coverAlt}
                    width={720}
                    height={540}
                  />
                </Link>
                <div className="projects-index-card__body">
                  <p className="projects-index-card__eyebrow">{project.category}</p>
                  <Link href={`/projects/${project.slug}`}>
                    <h2>{project.title}</h2>
                  </Link>
                  <p className="projects-index-card__location">{project.location}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="rail-page-band line-grid">
        <Container className="rail-page__container">
          <div className="rail-page__layout">
            <div className="rail-page__panel rail-page__panel--left" />
            <div className="rail-page__panel rail-page__panel--main">
              <nav className="insights-index-pagination" aria-label="Projects pagination">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <Link
                    key={page}
                    href={getPageHref(page)}
                    className={page === currentPage ? "is-active" : ""}
                    aria-current={page === currentPage ? "page" : undefined}
                  >
                    {page}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="rail-page__panel rail-page__panel--right">
              {currentPage < totalPages ? (
                <Link className="arrow-link insights-index-next" href={getPageHref(currentPage + 1)}>
                  <span>Next page</span>
                  <span aria-hidden="true">→</span>
                </Link>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      <section className="rail-page-band rail-page-band--soft line-grid">
        <Container className="rail-page__container">
          <div className="rail-page__layout projects-capability-band">
            <div className="rail-page__panel rail-page__panel--left">
              <Eyebrow>Capabilities</Eyebrow>
            </div>
            <div className="rail-page__panel rail-page__panel--main projects-capability-band__body">
              <h2>Different project types. One disciplined construction approach.</h2>
            </div>
            <div className="rail-page__panel rail-page__panel--right">
              <p>
                A construction portfolio should show more than completed names. It should show
                the range of responsibility handled on site, from structure and drainage to
                finishing, access, and final usability.
              </p>
            </div>
          </div>
          <div className="projects-capability-grid">
            {categories.map(([title, copy]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="rail-page-band rail-page-band--cta line-grid">
        <Container className="rail-page__container">
          <div className="rail-page__layout rail-page-cta">
            <div className="rail-page__panel rail-page__panel--left">
              <Eyebrow>Project Enquiry</Eyebrow>
            </div>
            <div className="rail-page__panel rail-page__panel--main">
              <h2>Planning a project similar to these?</h2>
              <p>
                Share your project location, drawings, site condition, and expected scope with
                JVS Enterprises. The team can help you understand the next practical steps
                before construction begins.
              </p>
            </div>
            <div className="rail-page__panel rail-page__panel--right">
              <CTAButton href="/contact">Discuss a Similar Project</CTAButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

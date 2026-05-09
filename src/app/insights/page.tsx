import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CTAButton, Container } from "@/components/Primitives";
import { getAllInsights } from "@/content/insights";

export const metadata: Metadata = {
  title: "Construction Insights | JVS Enterprises Kolhapur & Panhala",
  description:
    "Read practical construction insights from JVS Enterprises on choosing contractors, building in Panhala, RCC work, budgeting, residential construction, farmhouse construction, drainage, site supervision, and project planning.",
};

const INSIGHTS_PER_PAGE = 8;

function getPageHref(page: number) {
  return page <= 1 ? "/insights" : `/insights?page=${page}`;
}

export default async function InsightsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const requestedPage = Number.parseInt(resolvedSearchParams?.page ?? "1", 10);
  const insights = getAllInsights();
  const totalPages = Math.max(1, Math.ceil(insights.length / INSIGHTS_PER_PAGE));
  const currentPage = Number.isNaN(requestedPage)
    ? 1
    : Math.min(Math.max(requestedPage, 1), totalPages);
  const startIndex = (currentPage - 1) * INSIGHTS_PER_PAGE;
  const pagedInsights = insights.slice(startIndex, startIndex + INSIGHTS_PER_PAGE);

  return (
    <>
      <section className="company-hero company-hero--insights line-grid line-grid--dark">
        <video
          className="company-hero__video"
          src="/videos/news-and-insights-hero.webm"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          poster="/images/news-and-insights-hero.webp"
        />
        <div className="company-hero__overlay" aria-hidden="true" />
        <Container className="rail-page__container">
          <div className="company-hero__content company-hero__content--insights">
            <h1>News &amp; Insights</h1>
          </div>
        </Container>
      </section>

      <section className="turner-insights-grid-section line-grid">
        <Container className="insight-band__container">
          <div className="turner-insights-grid">
            {pagedInsights.map((insight) => (
              <article key={insight.slug} className="turner-insights-card">
                <Link className="turner-insights-card__image" href={`/insights/${insight.slug}`}>
                  <Image
                    src={insight.imagePath}
                    alt={insight.featuredImageAlt || insight.title}
                    width={560}
                    height={420}
                  />
                </Link>
                <div className="turner-insights-card__body">
                  <p className="turner-insights-card__eyebrow">{insight.category}</p>
                  <Link href={`/insights/${insight.slug}`}>
                    <h2>{insight.title}</h2>
                  </Link>
                  <p className="turner-insights-card__date">
                    {insight.publishedDateLabel || insight.readingTime}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="insight-band line-grid">
        <Container className="insight-band__container">
          <div className="insight-rail-layout">
            <div className="insight-rail-panel insight-rail-panel--left" />
            <div className="insight-rail-panel insight-rail-panel--main">
              <nav className="insights-index-pagination" aria-label="Insights pagination">
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
            <div className="insight-rail-panel insight-rail-panel--right">
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

      <section className="cta-band">
        <Container>
          <div>
            <h2>Reading because you are planning a project?</h2>
            <p>
              These articles can help you frame the right questions. A real project conversation
              can help you decide what should happen next on site.
            </p>
          </div>
          <CTAButton href="/contact" tone="light">
            Discuss Your Project
          </CTAButton>
        </Container>
      </section>
    </>
  );
}

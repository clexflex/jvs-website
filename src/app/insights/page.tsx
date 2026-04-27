import type { Metadata } from "next";
import { InsightCard } from "@/components/Cards";
import { CTAButton, Container, Eyebrow, PageIntro, Section } from "@/components/Primitives";
import { insightCategories, insights } from "@/content/site";

export const metadata: Metadata = {
  title: "Construction Insights | JVS Enterprises Kolhapur & Panhala",
  description:
    "Read practical construction insights from JVS Enterprises on choosing contractors, building in Panhala, RCC work, budgeting, residential construction, farmhouse construction, drainage, site supervision, and project planning.",
};

export default function InsightsPage() {
  const [featured, ...rest] = insights;

  return (
    <>
      <PageIntro
        eyebrow="INSIGHTS"
        title="Practical construction knowledge for better decisions."
        copy="Construction decisions should not be made in a hurry. These guides and project notes are written to help homeowners, landowners, institutions, and commercial clients understand planning, cost, RCC quality, drainage, supervision, and site execution before work begins."
        primary={{ label: "Start a Project Conversation", href: "/contact" }}
      />

      <Section>
        <div className="section-header">
          <div>
            <Eyebrow>FEATURED GUIDE</Eyebrow>
            <h2>{featured.title}</h2>
          </div>
          <div>
            <p>{featured.excerpt}</p>
            <div className="hero-actions">
              <CTAButton href={`/insights/${featured.slug}`}>Read Featured Guide</CTAButton>
            </div>
          </div>
        </div>
        <div className="filter-row" aria-label="Insight categories">
          {insightCategories.map((category) => (
            <span className="filter-chip" key={category}>
              {category}
            </span>
          ))}
        </div>
        <div className="insight-grid">
          <InsightCard
            title={featured.shortTitle || featured.title}
            category={featured.category}
            excerpt={featured.excerpt}
            href={`/insights/${featured.slug}`}
            featured
          />
          {rest.map((insight) => (
            <InsightCard
              key={insight.slug}
              title={insight.shortTitle || insight.title}
              category={insight.category}
              excerpt={insight.excerpt}
              href={`/insights/${insight.slug}`}
            />
          ))}
        </div>
      </Section>

      <section className="cta-band">
        <Container>
          <div>
            <h2>Reading because you are planning a project?</h2>
            <p>
              A guide can help you understand the process. A site conversation can help you
              understand your actual project. Speak with JVS Enterprises about your land,
              drawings, budget, and expected construction scope.
            </p>
          </div>
          <CTAButton href="/contact" tone="light">Discuss Your Project</CTAButton>
        </Container>
      </section>
    </>
  );
}

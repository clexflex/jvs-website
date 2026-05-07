import Link from "next/link";
import { CTAButton, Container } from "@/components/Primitives";
import type { Insight } from "@/content/insights";

const serviceUsefulLinks = [
  { href: "/services#planning", label: "Planning & Pre-Construction" },
  { href: "/services#construction", label: "Building Construction" },
  { href: "/services#rcc-works", label: "RCC & Structural Works" },
  { href: "/services#finishing", label: "Finishing & Coordination" },
  { href: "/services#renovation", label: "Renovation & Specialty Works" },
  { href: "/services#site-development", label: "Site Development & External Works" },
];

function renderBlocks(section: Insight["sections"][number]) {
  return section.blocks.map((block, index) => {
    if (block.type === "paragraph") {
      return <p key={`${section.heading}-p-${index}`}>{block.text}</p>;
    }

    if (block.type === "subheading") {
      const Tag = block.level === 3 ? "h3" : "h4";
      return <Tag key={`${section.heading}-h-${index}`}>{block.text}</Tag>;
    }

    return (
      <ol className="insight-point-list" key={`${section.heading}-l-${index}`}>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    );
  });
}

export function DedicatedInsightArticlePage({ insight }: { insight: Insight }) {
  return (
    <main className="insight-article-page">
      <section className="insight-band insight-band--hero line-grid">
        <Container className="insight-band__container">
          <div className="insight-rail-layout insight-hero-layout">
            <div className="insight-hero-span">
              <div className="insight-hero-copy">
                <p className="eyebrow">Insights</p>
                <h1>{insight.title}</h1>
                {insight.publishedDateLabel ? (
                  <p className="insight-publish-line">{insight.publishedDateLabel}</p>
                ) : null}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="insight-band insight-article-page__body line-grid">
        <Container className="insight-band__container">
          <div className="insight-article-layout">
            <article className="insight-article-main">
              <p className="insight-lead">{insight.deck}</p>

              <div className="insight-section__flow">
                {insight.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              {insight.sections.map((section) => (
                <section className="insight-article-block" key={section.heading}>
                  <h2>{section.heading}</h2>
                  <div className="insight-section__flow">{renderBlocks(section)}</div>
                </section>
              ))}

              {insight.faqItems.length ? (
                <section className="insight-article-block" id="insight-faq">
                  <h2>Frequently asked questions</h2>
                  <div className="faq-list">
                    {insight.faqItems.map((item) => (
                      <details key={item.question} className="faq-item">
                        <summary>{item.question}</summary>
                        <div>
                          <p>{item.answer}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              ) : null}

              <section className="insight-article-block insight-article-block--cta">
                <h2>{insight.endCta.title}</h2>
                <p>{insight.endCta.body}</p>
                <CTAButton href={insight.endCta.href}>{insight.endCta.buttonLabel}</CTAButton>
              </section>
            </article>

            <aside className="insight-article-sidebar">
              <div className="insight-article-sidebar__stack">
                <div className="insight-article-sidebar__card">
                  <section className="insight-article-sidebar__section">
                    <p className="eyebrow">Primary Keyword</p>
                    <p>{insight.primaryKeyword}</p>
                  </section>
                  <section className="insight-article-sidebar__section">
                    <p className="eyebrow">Target Audience</p>
                    <p>{insight.targetAudience}</p>
                  </section>
                </div>

                <div className="insight-article-sidebar__card">
                  <section className="insight-article-sidebar__section">
                    <p className="eyebrow">Useful Links</p>
                    <div className="insight-link-list">
                      {serviceUsefulLinks.map((link) => (
                        <Link key={link.href} href={link.href}>
                          <strong>{link.label}</strong>
                        </Link>
                      ))}
                      <Link href="/projects">
                        <strong>View Projects</strong>
                      </Link>
                      <Link href="/insights">
                        <strong>View All Insights</strong>
                      </Link>
                    </div>
                  </section>
                </div>

                {insight.externalReferences.length ? (
                  <div className="insight-article-sidebar__card">
                    <section className="insight-article-sidebar__section">
                      <p className="eyebrow">External Reference</p>
                      <a
                        href={insight.externalReferences[0].href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {insight.externalReferences[0].label}
                      </a>
                    </section>
                  </div>
                ) : null}

                {insight.contactBlock ? (
                  <div className="insight-article-sidebar__card">
                    <section className="insight-article-sidebar__section">
                      <p className="eyebrow">Contact</p>
                      <p>
                        {insight.contactBlock.name}, {insight.contactBlock.address}
                      </p>
                      <div className="insight-contact-links">
                        {insight.contactBlock.phones.map((phone) => (
                          <a key={phone} href={`tel:${phone.replace(/\s+/g, "")}`}>
                            {phone}
                          </a>
                        ))}
                        <a href={insight.contactBlock.emailHref}>{insight.contactBlock.email}</a>
                      </div>
                    </section>
                  </div>
                ) : null}
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}

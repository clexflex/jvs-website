import Image from "next/image";
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
  const shareUrl = insight.seo.canonical;
  const shareLinks = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      icon: "/assets/fb-share.svg",
    },
    {
      label: "Twitter",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(insight.title)}`,
      icon: "/assets/twitter-share.svg",
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      icon: "/assets/linkedin-share.svg",
    },
    {
      label: "Email",
      href: `mailto:?subject=${encodeURIComponent(insight.title)}&body=${encodeURIComponent(shareUrl)}`,
      icon: "/assets/mail-share.svg",
    },
  ];

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

      <section className="insight-band insight-band--share line-grid">
        <Container className="insight-band__container">
          <div className="insight-rail-layout">
            <div className="insight-rail-panel insight-rail-panel--left" />

            <div className="insight-rail-panel insight-rail-panel--main">
              <div className="insight-share-band">
                <p className="eyebrow">Share This Insight</p>
                <div className="insight-share">
                  {shareLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Share on ${item.label}`}
                    >
                      <Image src={item.icon} alt={`Share on ${item.label}`} width={24} height={24} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="insight-rail-panel insight-rail-panel--right" />
          </div>
        </Container>
      </section>

      <section className="insight-band insight-article-page__body line-grid">
        <Container className="insight-band__container">
          <div className="insight-article-layout">
            <article className="insight-article-main">
              <p className="insight-lead">{insight.deck}</p>

              <figure className="insight-media-card insight-media-card--centered insight-article-main__image">
                <Image
                  src={insight.imagePath}
                  alt={insight.featuredImageAlt || insight.title}
                  width={1200}
                  height={760}
                />
              </figure>

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

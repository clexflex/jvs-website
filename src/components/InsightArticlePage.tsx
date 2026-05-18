import Image from "next/image";
import Link from "next/link";
import { CTAButton, Container } from "@/components/Primitives";
import type {
  Insight,
  InsightFaqItem,
  InsightLink,
  InsightReference,
  InsightSection,
} from "@/content/insights";
import { projects } from "@/content/site";

function renderBlock(block: InsightSection["blocks"][number], index: number) {
  if (block.type === "paragraph") {
    return <p key={index}>{block.text}</p>;
  }

  if (block.type === "subheading") {
    const Tag = block.level === 3 ? "h3" : "h4";
    return <Tag key={index}>{block.text}</Tag>;
  }

  return (
    <ul key={index}>
      {block.items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function renderInlineLinks(links: InsightLink[]) {
  return links.map((link, index) => (
    <span key={link.href}>
      {index > 0 ? ", " : null}
      <Link href={link.href}>{link.label}</Link>
    </span>
  ));
}

function renderLinkList(links: InsightLink[]) {
  const describeTarget = (href: string) => {
    if (href.startsWith("/projects/")) return "Project detail";
    if (href.startsWith("/services")) return "Service page";
    if (href === "/contact") return "Contact JVS";
    if (href === "/our-company") return "Company page";
    if (href === "/insights") return "Insights index";
    if (href.startsWith("/insights/")) return "Related insight";
    if (href === "/projects") return "Projects index";
    return "Open page";
  };

  return (
    <div className="insight-link-list">
      {links.map((link) => (
        <Link key={`${link.href}-${link.label}`} href={link.href}>
          <span>{describeTarget(link.href)}</span>
          <strong>{link.label}</strong>
        </Link>
      ))}
    </div>
  );
}

function renderReferenceList(references: InsightReference[]) {
  return (
    <div className="insight-link-list">
      {references.map((reference) => (
        <a key={reference.href} href={reference.href} target="_blank" rel="noreferrer">
          <span>Official reference</span>
          <strong>{reference.label}</strong>
        </a>
      ))}
    </div>
  );
}

function getSectionSummary(section: InsightSection) {
  const listBlock = section.blocks.find((block) => block.type === "list");

  if (listBlock) {
    return {
      title: "At a Glance",
      items: listBlock.items.slice(0, 4),
    };
  }

  const paragraphBlock = section.blocks.find((block) => block.type === "paragraph");

  return {
    title: "Key Point",
    items: paragraphBlock ? [paragraphBlock.text] : [],
  };
}

function scoreContextMatch(heading: string, link: InsightLink | InsightReference) {
  const headingWords = heading
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 3);
  const target = `${link.label} ${link.href}`.toLowerCase();

  return headingWords.reduce((score, word) => (target.includes(word) ? score + 1 : score), 0);
}

function pickSectionLinks(heading: string, links: InsightLink[], usedHrefs: Set<string>) {
  const matches = links
    .filter((link) => !usedHrefs.has(link.href))
    .map((link) => ({
      link,
      score: scoreContextMatch(heading, link),
    }))
    .sort((left, right) => right.score - left.score);

  const contextual = matches.filter((match) => match.score > 0).slice(0, 2).map((match) => match.link);
  const fallback =
    contextual.length > 0
      ? contextual
      : matches.filter((match) => match.link.href !== "/contact").slice(0, 1).map((match) => match.link);

  for (const link of fallback) {
    usedHrefs.add(link.href);
  }

  return fallback;
}

function pickSectionReference(
  heading: string,
  references: InsightReference[],
  usedHrefs: Set<string>,
) {
  const matches = references
    .filter((reference) => !usedHrefs.has(reference.href))
    .map((reference) => ({
      reference,
      score: scoreContextMatch(heading, reference),
    }))
    .sort((left, right) => right.score - left.score);

  const selected = matches.find((match) => match.score > 0)?.reference;

  if (selected) {
    usedHrefs.add(selected.href);
  }

  return selected;
}

function renderFaqItems(faqItems: InsightFaqItem[]) {
  return faqItems.map((item) => (
    <details key={item.question} className="faq-item">
      <summary>{item.question}</summary>
      <div>
        <p>{item.answer}</p>
      </div>
    </details>
  ));
}

export function InsightArticlePage({
  insight,
  relatedInsights,
  previousInsight,
  nextInsight,
}: {
  insight: Insight;
  relatedInsights: Insight[];
  previousInsight?: Insight;
  nextInsight?: Insight;
}) {
  const shareUrl = insight.seo.canonical;
  const relatedProject = projects.find((project) => project.slug === insight.relatedProjectSlug);
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

  const midpoint = Math.ceil(insight.sections.length / 2);
  const introLinks = insight.inlineInternalLinks.slice(0, 2);
  const usedInlineHrefs = new Set(introLinks.map((link) => link.href));
  const usedReferenceHrefs = new Set<string>();
  const sectionContext = insight.sections.map((section) => ({
    links: pickSectionLinks(section.heading, insight.inlineInternalLinks, usedInlineHrefs),
    reference: pickSectionReference(section.heading, insight.externalReferences, usedReferenceHrefs),
  }));
  const remainingInlineLinks = insight.inlineInternalLinks.filter((link) => !usedInlineHrefs.has(link.href));

  return (
    <>
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

      <section className="insight-band line-grid">
        <Container className="insight-band__container">
          <div className="insight-rail-layout">
            <div className="insight-rail-panel insight-rail-panel--left" />

            <div className="insight-rail-panel insight-rail-panel--main">
              <p className="insight-lead">{insight.deck}</p>
            </div>

            <div className="insight-rail-panel insight-rail-panel--right" />
          </div>
        </Container>
      </section>

      <section className="insight-band line-grid">
        <Container className="insight-band__container">
          <div className="insight-rail-layout">
            <div className="insight-rail-panel insight-rail-panel--left" />

            <div className="insight-rail-panel insight-rail-panel--main">
              <figure className="insight-media-card insight-media-card--centered">
                <Image
                  src={insight.imagePath}
                  alt={insight.featuredImageAlt || insight.title}
                  width={1200}
                  height={760}
                />
              </figure>
            </div>

            <div className="insight-rail-panel insight-rail-panel--right">
              <div className="insight-support-card insight-support-card--caption">
                <p className="eyebrow">Featured Image</p>
                <p>
                  {insight.featuredImageSuggestion || "Verified project or article image to be added."}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="insight-band line-grid">
        <Container className="insight-band__container">
          <div className="insight-rail-layout">
            <div className="insight-rail-panel insight-rail-panel--left">
              <div className="insight-info-stack">
                <div>
                  <p className="eyebrow">Search Intent</p>
                  <p>{insight.searchIntent}</p>
                </div>
              </div>
            </div>

            <div className="insight-rail-panel insight-rail-panel--main">
              <div className="insight-intro">
                {insight.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {introLinks.length ? (
                  <p className="insight-inline-note">
                    Continue with related reading: {renderInlineLinks(introLinks)}.
                  </p>
                ) : null}
              </div>
            </div>

            <div className="insight-rail-panel insight-rail-panel--right">
              {relatedProject ? (
                <div className="insight-support-card">
                  <p className="eyebrow">Related Project</p>
                  <h3>{relatedProject.title}</h3>
                  <p>{relatedProject.description}</p>
                  <Link className="arrow-link" href={`/projects/${relatedProject.slug}`}>
                    <span>View project detail</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              ) : (
                <div className="insight-support-card">
                  <p className="eyebrow">Article Lens</p>
                  <p>{insight.targetAudience}</p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {insight.sections.map((section, index) => {
        const summary = getSectionSummary(section);
        const contextualLinks = sectionContext[index]?.links ?? [];
        const contextualReference = sectionContext[index]?.reference;
        const supportMode = index % 3;

        return (
          <div key={section.heading}>
            <section className="insight-band line-grid">
              <Container className="insight-band__container">
                <div className="insight-rail-layout">
                  <div className="insight-rail-panel insight-rail-panel--left">
                    <p className="eyebrow">
                      {insight.kind === "project-note" ? "Project Point" : "Guide Point"}{" "}
                      {String(index + 1).padStart(2, "0")}
                    </p>
                  </div>

                  <div className="insight-rail-panel insight-rail-panel--main">
                    <div className="insight-section">
                      <h2>{section.heading}</h2>
                      <div className="insight-section__flow">
                        {section.blocks.map((block, blockIndex) => renderBlock(block, blockIndex))}
                        {contextualLinks.length ? (
                          <p className="insight-inline-note">
                            Related reading: {renderInlineLinks(contextualLinks)}.
                          </p>
                        ) : null}
                        {contextualReference ? (
                          <p className="insight-inline-note">
                            Official reference:{" "}
                            <a href={contextualReference.href} target="_blank" rel="noreferrer">
                              {contextualReference.label}
                            </a>
                            .
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="insight-rail-panel insight-rail-panel--right">
                    {supportMode === 0 && summary.items.length ? (
                      <div className="insight-support-card">
                        <p className="eyebrow">{summary.title}</p>
                        <div className="insight-summary-list">
                          {summary.items.map((item) => (
                            <p key={item}>{item}</p>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {supportMode === 1 && contextualLinks.length ? (
                      <div className="insight-support-card">
                        <p className="eyebrow">Continue This Topic</p>
                        {renderLinkList(contextualLinks)}
                      </div>
                    ) : null}

                    {supportMode === 2 && contextualReference ? (
                      <div className="insight-support-card">
                        <p className="eyebrow">Reference Used</p>
                        {renderReferenceList([contextualReference])}
                      </div>
                    ) : null}
                  </div>
                </div>
              </Container>
            </section>

            {index === midpoint - 1 ? (
              <section className="insight-band insight-band--cta line-grid">
                <Container className="insight-band__container">
                  <div className="insight-rail-layout">
                    <div className="insight-rail-panel insight-rail-panel--left">
                      <p className="eyebrow">{insight.midCta.eyebrow}</p>
                    </div>
                    <div className="insight-rail-panel insight-rail-panel--main">
                      <div className="insight-cta-block">
                        <h2>{insight.midCta.title}</h2>
                        <p>{insight.midCta.body}</p>
                        <CTAButton href={insight.midCta.href}>
                          {insight.midCta.buttonLabel}
                        </CTAButton>
                      </div>
                    </div>
                    <div className="insight-rail-panel insight-rail-panel--right">
                      {insight.contactBlock ? (
                        <div className="insight-support-card">
                          <p className="eyebrow">Contact Block</p>
                          <h3>{insight.contactBlock.name}</h3>
                          <p>{insight.contactBlock.address}</p>
                          <p>{insight.contactBlock.phone}</p>
                          <a href={insight.contactBlock.emailHref}>{insight.contactBlock.email}</a>
                        </div>
                      ) : (
                        <div className="insight-support-card">
                          <p className="eyebrow">Next Step</p>
                          {renderLinkList(insight.bottomLinks.slice(0, 2))}
                        </div>
                      )}
                    </div>
                  </div>
                </Container>
              </section>
            ) : null}
          </div>
        );
      })}

      {insight.faqItems.length ? (
        <section className="insight-band line-grid">
          <Container className="insight-band__container">
            <div className="insight-rail-layout">
              <div className="insight-rail-panel insight-rail-panel--left">
                <p className="eyebrow">FAQ</p>
              </div>
              <div className="insight-rail-panel insight-rail-panel--main">
                <div className="insight-section">
                  <h2>Frequently asked questions</h2>
                  <div className="faq-list">{renderFaqItems(insight.faqItems)}</div>
                </div>
              </div>
              <div className="insight-rail-panel insight-rail-panel--right">
                <div className="insight-support-card">
                  <p className="eyebrow">Quick Clarification</p>
                  <p>
                    These answers are built from the article package and the JVS project/service
                    context for this topic.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {insight.externalReferences.length ? (
        <section className="insight-band line-grid">
          <Container className="insight-band__container">
            <div className="insight-rail-layout">
              <div className="insight-rail-panel insight-rail-panel--left">
                <p className="eyebrow">References</p>
              </div>
              <div className="insight-rail-panel insight-rail-panel--main">
                <div className="insight-section">
                  <h2>External references used in this page</h2>
                  <div className="insight-reference-list">
                    {insight.externalReferences.map((reference) => (
                      <a
                        key={reference.href}
                        className="insight-reference"
                        href={reference.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <strong>{reference.label}</strong>
                        <span>{reference.href}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="insight-rail-panel insight-rail-panel--right">
                {remainingInlineLinks.length ? (
                  <div className="insight-support-card">
                    <p className="eyebrow">Continue Exploring</p>
                    {renderLinkList(remainingInlineLinks.slice(0, 3))}
                  </div>
                ) : null}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="insight-band insight-band--cta insight-band--cta-final line-grid">
        <Container className="insight-band__container">
          <div className="insight-rail-layout">
            <div className="insight-rail-panel insight-rail-panel--left">
              <p className="eyebrow">{insight.endCta.eyebrow}</p>
            </div>
            <div className="insight-rail-panel insight-rail-panel--main">
              <div className="insight-cta-block">
                <h2>{insight.endCta.title}</h2>
                <p>{insight.endCta.body}</p>
                <CTAButton href={insight.endCta.href}>{insight.endCta.buttonLabel}</CTAButton>
              </div>
            </div>
            <div className="insight-rail-panel insight-rail-panel--right">
              <div className="insight-support-card">
                <p className="eyebrow">Project Conversation</p>
                {insight.contactBlock ? (
                  <>
                    <p>{insight.contactBlock.address}</p>
                    <div className="insight-contact-links">
                      {insight.contactBlock.phones.slice(0, 2).map((phone) => (
                        <a key={phone} href={`tel:${phone.replace(/\s+/g, "")}`}>
                          {phone}
                        </a>
                      ))}
                      <a href={insight.contactBlock.emailHref}>{insight.contactBlock.email}</a>
                    </div>
                  </>
                ) : (
                  renderLinkList(insight.bottomLinks)
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="insight-band line-grid">
        <Container className="insight-band__container">
          <div className="insight-rail-layout">
            <div className="insight-rail-panel insight-rail-panel--left">
              <p className="eyebrow">Continue Reading</p>
            </div>

            <div className="insight-rail-panel insight-rail-panel--main">
              <div className="insight-pagination">
                {previousInsight ? (
                  <Link href={`/insights/${previousInsight.slug}`}>
                    <span>Previous insight</span>
                    <strong>{previousInsight.title}</strong>
                  </Link>
                ) : (
                  <div />
                )}
                {nextInsight ? (
                  <Link href={`/insights/${nextInsight.slug}`}>
                    <span>Next insight</span>
                    <strong>{nextInsight.title}</strong>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </div>

            <div className="insight-rail-panel insight-rail-panel--right">
              <div className="insight-support-card">
                <p className="eyebrow">Related Insights</p>
                <div className="insight-link-list">
                  {relatedInsights.slice(0, 3).map((item) => (
                    <Link key={item.slug} href={`/insights/${item.slug}`}>
                      <span>{item.category}</span>
                      <strong>{item.title}</strong>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

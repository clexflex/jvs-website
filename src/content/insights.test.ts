import { describe, expect, it } from "vitest";
import { getAllInsights, getInsightBySlug } from "./insights";

describe("insights content", () => {
  it("loads all 20 insights from markdown files with unique slugs", () => {
    const insights = getAllInsights();

    expect(insights).toHaveLength(20);
    expect(new Set(insights.map((insight) => insight.slug)).size).toBe(20);
  });

  it("uses the markdown URL Slug and SEO fields as the source of truth", () => {
    const insight = getInsightBySlug("choose-construction-company-kolhapur");

    expect(insight).toBeDefined();
    expect(insight?.title).toBe(
      "Choosing the Right Construction Company in Kolhapur: A Practical Guide for Homeowners and Institutions",
    );
    expect(insight?.category).toBe("Construction Insights");
    expect(insight?.description).toContain(
      "Planning a residential, commercial, or institutional construction project",
    );
    expect(insight?.tags).toContain("Construction Company in Kolhapur");
    expect(insight?.topLabel).toBe("CONSTRUCTION INSIGHTS");
    expect(insight?.featuredImageSuggestion).toContain("RCC work");
  });

  it("strips research scans and citation definitions from the article body", () => {
    const insight = getInsightBySlug(
      "jvs-enterprises-panhala-construction-journey-local-experience",
    );

    expect(insight).toBeDefined();
    expect(insight?.body).not.toContain("Research scan before writing");
    expect(insight?.body).not.toMatch(/^\[\d+\]:\s+/m);
    expect(insight?.body).not.toContain("([Tensar International][3])");
  });

  it("extracts section structure from the publishable article draft", () => {
    const insight = getInsightBySlug("yspm-nursing-college-kodoli-project-note");

    expect(insight).toBeDefined();
    expect(insight?.sections.length).toBeGreaterThan(3);
    expect(insight?.sections[0]?.heading).toMatch(/Why a nursing college building/i);
  });

  it("derives category-aware CTA and linking guidance from the article brief", () => {
    const projectNote = getInsightBySlug("yspm-nursing-college-kodoli-project-note");
    const companyInsight = getInsightBySlug(
      "jvs-enterprises-panhala-construction-journey-local-experience",
    );

    expect(projectNote?.topLabel).toBe("PROJECT NOTE");
    expect(projectNote?.midCta.buttonLabel).toBe("Discuss a Similar Project");
    expect(projectNote?.bottomLinks.some((link) => link.href === "/projects/yspm-nursing-college-kodoli")).toBe(true);

    expect(companyInsight?.topLabel).toBe("COMPANY INSIGHTS");
    expect(companyInsight?.bottomLinks.some((link) => link.href === "/our-company")).toBe(true);
    expect(companyInsight?.endCta.buttonLabel).toBe("Request a Site Discussion");
  });

  it("extracts faq, contact block, listing excerpt, external references, and normalized seo package", () => {
    const guide = getInsightBySlug("construction-budgeting-boq-estimation-cost-overruns-kolhapur");
    const chooser = getInsightBySlug("choose-construction-company-kolhapur");

    expect(guide?.faqItems.length).toBeGreaterThan(3);
    expect(guide?.contactBlock?.phone).toContain("9860943500");
    expect(guide?.listingExcerpt).toBeTruthy();
    expect(guide?.listingExcerpt).not.toContain("Suggested excerpt");
    expect(guide?.externalReferences.length).toBeGreaterThan(0);
    expect(guide?.externalReferences.every((ref) => !/competitor|directory/i.test(ref.label))).toBe(
      true,
    );

    expect(chooser?.seo.canonical).toBe(
      "https://jvsenterprises.co.in/insights/choose-construction-company-kolhapur",
    );
    expect(chooser?.schema.article["@type"]).toBe("BlogPosting");
    expect(chooser?.schema.faq?.["@type"]).toBe("FAQPage");
    expect(chooser?.schema.localBusiness).toBeDefined();
    expect(chooser?.publishedDate).toBe("2026-04-25");
    expect(chooser?.publishedDateLabel).toBe("April 25, 2026");
  });

  it("maps suggested internal links to working live routes instead of exposing dead package urls", () => {
    const chooser = getInsightBySlug("choose-construction-company-kolhapur");

    expect(chooser?.inlineInternalLinks.some((link) => link.href === "/services#construction")).toBe(
      true,
    );
    expect(chooser?.inlineInternalLinks.some((link) => link.href === "/projects")).toBe(true);
    expect(
      chooser?.inlineInternalLinks.some(
        (link) => link.href === "/services/residential-construction-kolhapur",
      ),
    ).toBe(false);
  });
});

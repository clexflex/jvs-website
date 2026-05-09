import { cache } from "react";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { siteConfig } from "./site";

type InsightBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "list";
      items: string[];
    }
  | {
      type: "subheading";
      text: string;
      level: 3 | 4;
    };

export type InsightSection = {
  heading: string;
  blocks: InsightBlock[];
};

export type InsightLink = {
  label: string;
  href: string;
};

export type InsightReference = InsightLink & {
  note?: string;
};

export type InsightFaqItem = {
  question: string;
  answer: string;
};

export type InsightContactBlock = {
  name: string;
  address: string;
  phone: string;
  phones: string[];
  email: string;
  emailHref: string;
};

export type InsightCta = {
  eyebrow: string;
  title: string;
  body: string;
  buttonLabel: string;
  href: string;
};

export type InsightKind = "guide" | "project-note" | "company-insight";

export type InsightSeo = {
  title: string;
  description: string;
  canonical: string;
  openGraph: {
    title: string;
    description: string;
    url: string;
    image: string;
    imageAlt: string;
  };
};

export type InsightSchema = {
  article: Record<string, unknown>;
  faq?: Record<string, unknown>;
  localBusiness?: Record<string, unknown>;
};

export type Insight = {
  order: number;
  sourceFile: string;
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  category: string;
  kind: InsightKind;
  topLabel: string;
  publishedDate?: string;
  publishedDateLabel?: string;
  deck: string;
  listingExcerpt: string;
  tags: string[];
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: string;
  targetAudience: string;
  featuredImageSuggestion: string;
  featuredImageAlt: string;
  body: string;
  intro: string[];
  sections: InsightSection[];
  readingTime: string;
  midCta: InsightCta;
  endCta: InsightCta;
  contactBlock?: InsightContactBlock;
  faqItems: InsightFaqItem[];
  inlineInternalLinks: InsightLink[];
  bottomLinks: InsightLink[];
  externalReferences: InsightReference[];
  seo: InsightSeo;
  schemaType: "Article" | "BlogPosting";
  schema: InsightSchema;
  relatedProjectSlug?: string;
  imagePath: string;
  imageUrl: string;
};

const INSIGHTS_DIR = path.join(
  process.cwd(),
  "public/jvs_enterprises_website_content_md/news-and-insights",
);

const SITE_URL = "https://jvsenterprises.co.in";
const INSIGHTS_IMAGE_DIR = "/images/insights";
const PLACEHOLDER_IMAGE = `${SITE_URL}/assets/insight-placeholder.svg`;
const PLACEHOLDER_IMAGE_PATH = "/assets/insight-placeholder.svg";
const MAX_INSIGHT_IMAGE_INDEX = 17;

const RELATED_PROJECTS: Record<string, string> = {
  "yspm-nursing-college-kodoli-project-note": "yspm-nursing-college-kodoli",
  "dy-patil-hospital-kadamwadi-compound-wall-project-note":
    "dy-patil-hospital-compound-wall",
  "five-row-houses-kolhapur-project-note": "five-row-houses-kolhapur",
  "sports-ground-external-development-work-kolhapur": "football-ground-rcc-gutter",
  "institutional-construction-kolhapur-colleges-hospitals-campuses":
    "yspm-nursing-college-kodoli",
  "rcc-work-kolhapur-columns-beams-slabs-quality-guide": "dy-patil-rcc-lift-work",
};

const INTERNAL_ROUTE_ALIASES: Record<string, string> = {
  "/about": "/our-company",
};

const EXTERNAL_REFERENCE_CATALOG = [
  {
    label: "MahaRERA guidance for home buyers",
    href: "https://www.maharera.maharashtra.gov.in/guidance-home-buyers-0",
    patterns: [/maharera/i, /homebuyer/i],
  },
  {
    label: "Maharashtra BPMS portal",
    href: "https://mahavastu.maharashtra.gov.in/",
    patterns: [/bpms/i, /mahavastu/i, /building permission/i],
  },
  {
    label: "Indian Nursing Council",
    href: "https://www.indiannursingcouncil.org/",
    patterns: [/indian nursing council/i],
  },
  {
    label: "National Building Code fire and life safety reference",
    href: "https://dgfscdhg.gov.in/national-building-code-india-fire-and-life-safety",
    patterns: [/national building code/i, /fire[-\s]and[-\s]life[-\s]safety/i, /fire safety/i],
  },
  {
    label: "BIS standards and code reference",
    href: "https://www.bis.gov.in/",
    patterns: [/\bbis\b/i, /\bis 456\b/i],
  },
  {
    label: "CPWD Works Manual reference",
    href: "https://cpwd.gov.in/Circulars.aspx?Type=25",
    patterns: [/cpwd works manual/i],
  },
  {
    label: "CPHEEO water supply and treatment manual",
    href: "https://mohua.gov.in/publication/manual-on-water-supply-and-treatment-systems-cpheeo-1999.php",
    patterns: [/cpheeo/i, /water-supply manual/i],
  },
  {
    label: "MoHUA storm-water drainage manual",
    href: "https://mohua.gov.in/publication/manual-on-storm-water-drainage-systems--august-2019.php",
    patterns: [/storm[-\s]water drainage/i, /stormwater systems/i, /drainage manual/i],
  },
  {
    label: "D. Y. Patil Medical College Kolhapur contact page",
    href: "https://www.dypatilmedicalkop.org/contact/",
    patterns: [/d\.?\s*y\.?\s*patil hospital official contact page/i, /d\.?\s*y\.?\s*patil.*contact page/i],
  },
];

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractSection(markdown: string, heading: string) {
  const escapedHeading = escapeRegExp(heading);
  const match = markdown.match(
    new RegExp(`## ${escapedHeading}\\n\\n([\\s\\S]*?)(?=\\n## |\\n# |$)`),
  );

  return match?.[1]?.trim() ?? "";
}

function extractTopLevelSection(markdown: string, heading: string | RegExp) {
  const headingSource = typeof heading === "string" ? escapeRegExp(heading) : heading.source;
  const match = markdown.match(
    new RegExp(`# ${headingSource}\\n\\n([\\s\\S]*?)(?=\\n# [^\\n]+|$)`),
  );

  return match?.[1]?.trim() ?? "";
}

function extractInlineValue(markdown: string, heading: string) {
  return normaliseInlineMarkdown(
    extractSection(markdown, heading)
      .replace(/^`|`$/g, "")
      .replace(/^["']|["']$/g, "")
      .trim(),
  );
}

function extractListValue(markdown: string, heading: string) {
  return extractInlineValue(markdown, heading)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normaliseInlineMarkdown(text: string) {
  return text
    .replace(/\(\[([^\]]+)\]\[\d+\]\)/g, "")
    .replace(/\[([^\]]+)\]\[\d+\]/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\r\n/g, "\n")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function splitParagraphs(content: string) {
  return content
    .split(/\n\s*\n/)
    .map((chunk) => normaliseInlineMarkdown(chunk.replace(/\n/g, " ").trim()))
    .filter(Boolean);
}

function parseBlocks(sectionBody: string): InsightBlock[] {
  const blocks: InsightBlock[] = [];
  const chunks = sectionBody
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  for (const chunk of chunks) {
    if (chunk.startsWith("### ")) {
      blocks.push({
        type: "subheading",
        text: normaliseInlineMarkdown(chunk.replace(/^###\s+/, "")),
        level: 3,
      });
      continue;
    }

    if (chunk.startsWith("#### ")) {
      blocks.push({
        type: "subheading",
        text: normaliseInlineMarkdown(chunk.replace(/^####\s+/, "")),
        level: 4,
      });
      continue;
    }

    const lines = chunk
      .split("\n")
      .map((line) => line.replace(/^\s*[-*]\s+/, ""))
      .map((line) => normaliseInlineMarkdown(line))
      .filter(Boolean);

    if (lines.length > 1) {
      blocks.push({
        type: "list",
        items: lines,
      });
      continue;
    }

    if (lines[0]) {
      blocks.push({
        type: "paragraph",
        text: lines[0],
      });
    }
  }

  return blocks;
}

function extractDraft(markdown: string) {
  const match = markdown.match(
    /# Publishable Article Draft\s*([\s\S]*?)(?=\n# Suggested CTA|\n# FAQ Section|\n# Internal Link Suggestions|\n# External Link Suggestions|\n# Next\.js SEO Setup|\n# JSON-LD Schema|\n# LocalBusiness Schema|\n# Suggested excerpt|$)/,
  );

  return match?.[1]?.trim() ?? "";
}

function cleanDraft(draft: string) {
  const withoutRefs = draft.replace(/^\[[^\]]+\]:\s+\S+.*$/gm, "").replace(/\r\n/g, "\n");

  const lines = withoutRefs
    .split("\n")
    .map((line) => line.replace(/\s+$/g, ""))
    .filter((line, index) => !(index === 0 && line.trim() === "---"));

  return lines.join("\n").trim();
}

function parseDraft(draft: string) {
  const cleaned = cleanDraft(draft);
  const lines = cleaned.split("\n");
  let cursor = 0;

  while (cursor < lines.length && !lines[cursor].trim()) {
    cursor += 1;
  }

  const draftTitle =
    lines[cursor]?.startsWith("# ") ? normaliseInlineMarkdown(lines[cursor].slice(2)) : "";
  if (draftTitle) {
    cursor += 1;
  }

  const content = lines.slice(cursor).join("\n").trim();
  const parts = content.split(/\n(?=## )/).map((part) => part.trim()).filter(Boolean);

  const introPart = parts[0]?.startsWith("## ") ? "" : parts.shift() ?? "";
  const intro = introPart
    .split(/\n\s*\n/)
    .map((paragraph) => normaliseInlineMarkdown(paragraph.replace(/\n/g, " ").trim()))
    .filter(Boolean);

  const sections = parts
    .map((part) => {
      const [headingLine, ...rest] = part.split("\n");
      const heading = normaliseInlineMarkdown(headingLine.replace(/^##\s+/, "").trim());
      const blocks = parseBlocks(rest.join("\n").trim());

      if (!heading || blocks.length === 0) {
        return null;
      }

      return { heading, blocks };
    })
    .filter((section): section is InsightSection => section !== null);

  return {
    draftTitle,
    intro,
    sections,
  };
}

function estimateReadingTime(text: string) {
  const words = text.split(/\s+/).filter(Boolean).length;
  return `${Math.max(3, Math.ceil(words / 220))} min read`;
}

function formatPublishedDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

function getInsightKind(category: string, title: string): InsightKind {
  if (category === "Project Notes" || title.startsWith("Project Note:")) {
    return "project-note";
  }

  if (category === "Company Insights") {
    return "company-insight";
  }

  return "guide";
}

function getTopLabel(kind: InsightKind) {
  switch (kind) {
    case "project-note":
      return "PROJECT NOTE";
    case "company-insight":
      return "COMPANY INSIGHTS";
    default:
      return "CONSTRUCTION INSIGHTS";
  }
}

function getPrimaryServiceLink(slug: string, category: string, title: string): InsightLink {
  const text = `${slug} ${category} ${title}`.toLowerCase();

  if (
    text.includes("drainage") ||
    text.includes("compound wall") ||
    text.includes("sports") ||
    text.includes("site development")
  ) {
    return { label: "Site Development Services", href: "/services#site-development" };
  }

  if (text.includes("rcc") || text.includes("water tank") || text.includes("structural")) {
    return { label: "RCC & Structural Services", href: "/services#rcc-works" };
  }

  if (text.includes("renovation") || text.includes("repair") || text.includes("remodelling")) {
    return { label: "Renovation Services", href: "/services#renovation" };
  }

  if (text.includes("budget") || text.includes("planning") || text.includes("turnkey")) {
    return { label: "Planning & Pre-Construction", href: "/services#planning" };
  }

  return { label: "Construction Services", href: "/services#construction" };
}

function normalisePhone(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) {
    return digits;
  }

  if (digits.startsWith("91")) {
    return `+${digits}`;
  }

  return digits ? `+91${digits}` : "";
}

function buildBottomLinks(
  kind: InsightKind,
  slug: string,
  category: string,
  title: string,
  inlineInternalLinks: InsightLink[],
  relatedProjectSlug?: string,
) {
  const serviceLink = getPrimaryServiceLink(slug, category, title);
  const linkMap = new Map<string, InsightLink>();

  const pushLink = (link: InsightLink) => {
    if (!linkMap.has(link.href)) {
      linkMap.set(link.href, link);
    }
  };

  if (kind === "company-insight") {
    pushLink({ label: "Our Company", href: "/our-company" });
  }

  if (kind === "project-note" && relatedProjectSlug) {
    pushLink({ label: "Project Detail", href: `/projects/${relatedProjectSlug}` });
  }

  pushLink(serviceLink);

  for (const link of inlineInternalLinks) {
    if (link.href.startsWith("/projects/") || link.href === "/projects" || link.href === "/contact") {
      pushLink(link);
    }
  }

  if (kind !== "company-insight") {
    pushLink({ label: "All Insights", href: "/insights" });
  }

  if (kind !== "project-note") {
    pushLink({ label: "Projects", href: "/projects" });
  } else {
    pushLink({ label: "All Projects", href: "/projects" });
  }

  pushLink({ label: "Contact", href: "/contact" });

  return Array.from(linkMap.values()).slice(0, 4);
}

function defaultCtaButtonLabel(kind: InsightKind) {
  switch (kind) {
    case "project-note":
      return "Discuss a Similar Project";
    case "company-insight":
      return "Discuss Your Project";
    default:
      return "Start a Project Conversation";
  }
}

function buildCtas(kind: InsightKind, primaryCtaBody: string): {
  midCta: InsightCta;
  endCta: InsightCta;
} {
  const paragraphs = splitParagraphs(primaryCtaBody);
  const title = paragraphs[0];
  const body = paragraphs.slice(1).join(" ") || paragraphs[0];
  const buttonLabel = defaultCtaButtonLabel(kind);

  return {
    midCta: {
      eyebrow:
        kind === "project-note"
          ? "Project Discussion"
          : kind === "company-insight"
            ? "Local Project Support"
            : "Planning Support",
      title:
        title ||
        (kind === "project-note"
          ? "Planning a similar project in Kolhapur or nearby areas?"
          : "Planning a construction project in Kolhapur or Panhala?"),
      body:
        body ||
        "Speak with JVS Enterprises about your site, scope, and the right next step before work begins.",
      buttonLabel,
      href: "/contact",
    },
    endCta: {
      eyebrow: kind === "project-note" ? "Next Step" : "Project Conversation",
      title:
        kind === "project-note"
          ? "Need help planning a similar institutional, residential, or site-development project?"
          : "Need help turning this insight into a practical project plan?",
      body:
        body ||
        "JVS Enterprises can help you review site conditions, scope, budgeting priorities, and construction sequencing before execution starts.",
      buttonLabel:
        kind === "company-insight" ? "Request a Site Discussion" : buttonLabel,
      href: "/contact",
    },
  };
}

function parseContactBlock(sectionContent: string) {
  if (!sectionContent) {
    return undefined;
  }

  const lines = sectionContent
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => line !== "---");

  if (!lines.length) {
    return undefined;
  }

  const name = normaliseInlineMarkdown(lines[0]);
  const phoneLine = lines.find((line) => /^Phone:/i.test(line));
  const emailLine = lines.find((line) => /^Email:/i.test(line));
  const phone = phoneLine?.replace(/^Phone:\s*/i, "").trim() ?? "";
  const phones = phone
    .split("/")
    .map((item) => item.trim())
    .filter(Boolean);
  const emailMatch = emailLine?.match(/\[([^\]]+)\]\((mailto:[^)]+)\)/);
  const email = emailMatch?.[1] ?? emailLine?.replace(/^Email:\s*/i, "").trim() ?? siteConfig.email;
  const emailHref = emailMatch?.[2] ?? `mailto:${email}`;
  const address = lines
    .filter((line) => line !== lines[0] && line !== phoneLine && line !== emailLine)
    .map((line) => normaliseInlineMarkdown(line))
    .join(", ");

  return {
    name,
    address,
    phone,
    phones,
    email,
    emailHref,
  };
}

function parseFaqItems(sectionContent: string) {
  const items: InsightFaqItem[] = [];
  const pattern = /## (.+?)\n\n([\s\S]*?)(?=\n## |\n---|\n# |$)/g;

  for (const match of sectionContent.matchAll(pattern)) {
    const question = normaliseInlineMarkdown(match[1]);
    const answer = splitParagraphs(match[2]).join(" ");

    if (question && answer) {
      items.push({ question, answer });
    }
  }

  return items;
}

function mapServiceRoute(pathname: string) {
  const lowered = pathname.toLowerCase();

  if (/boq|budget|planning|project-management|site-supervision/.test(lowered)) {
    return "/services#planning";
  }

  if (/rcc|foundation|water-tank/.test(lowered)) {
    return "/services#rcc-works";
  }

  if (/finishing|waterproofing/.test(lowered)) {
    return "/services#finishing";
  }

  if (/renovation|repair|demolition/.test(lowered)) {
    return "/services#renovation";
  }

  if (/drainage|gutter|site-development|compound-wall|paver|sports-ground/.test(lowered)) {
    return "/services#site-development";
  }

  return "/services#construction";
}

function normaliseInternalHref(rawHref: string) {
  const href = rawHref
    .trim()
    .replace(/^https?:\/\/(www\.)?jvsenterprises\.(com|co\.in)/i, "")
    .replace(/\/+$/, "");
  const aliased = INTERNAL_ROUTE_ALIASES[href] ?? href;

  if (aliased.startsWith("/services/")) {
    return mapServiceRoute(aliased);
  }

  if (!aliased) {
    return "/";
  }

  return aliased;
}

function parseInternalLinkSuggestions(sectionContent: string) {
  const links = new Map<string, InsightLink>();
  const pattern = /\*\s+([^\n]+)\n\s+`([^`]+)`/g;

  for (const match of sectionContent.matchAll(pattern)) {
    const label = normaliseInlineMarkdown(match[1]);
    const href = normaliseInternalHref(match[2]);

    if (!links.has(href)) {
      links.set(href, { label, href });
    }
  }

  return Array.from(links.values());
}

function parseExternalReferences(sectionContent: string) {
  const matches = EXTERNAL_REFERENCE_CATALOG.map((reference) => {
    const positions = reference.patterns
      .map((pattern) => sectionContent.search(pattern))
      .filter((position) => position >= 0);

    if (!positions.length) {
      return null;
    }

    return {
      label: reference.label,
      href: reference.href,
      order: Math.min(...positions),
    };
  })
    .filter((reference): reference is { label: string; href: string; order: number } => reference !== null)
    .sort((left, right) => left.order - right.order);

  const unique = new Map<string, InsightReference>();

  for (const match of matches) {
    if (!unique.has(match.href)) {
      unique.set(match.href, { label: match.label, href: match.href });
    }
  }

  return Array.from(unique.values()).slice(0, 2);
}

function extractSchemaType(sectionContent: string) {
  const match = sectionContent.match(/["@']@type["@']\s*:\s*"([^"]+)"/);
  const type = match?.[1];

  if (type === "Article" || type === "BlogPosting") {
    return type;
  }

  return undefined;
}

function extractSchemaDate(sectionContent: string) {
  const match = sectionContent.match(/datePublished:\s*"(\d{4}-\d{2}-\d{2})"/);
  return match?.[1];
}

function buildSeoPackage({
  slug,
  seoTitle,
  title,
  description,
  featuredImageAlt,
}: {
  slug: string;
  seoTitle: string;
  title: string;
  description: string;
  featuredImageAlt: string;
}) {
  const canonical = `${SITE_URL}/insights/${slug}`;

  return {
    title: seoTitle || title,
    description,
    canonical,
    openGraph: {
      title: title,
      description,
      url: canonical,
      image: PLACEHOLDER_IMAGE,
      imageAlt: featuredImageAlt || title,
    },
  };
}

function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: siteConfig.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shing Galli, Near S. T. Stand",
      addressLocality: "Panhala",
      addressRegion: "Maharashtra",
      postalCode: "416201",
      addressCountry: "IN",
    },
    telephone: normalisePhone(siteConfig.phone),
    email: siteConfig.email,
    areaServed: ["Panhala", "Kolhapur", "Kodoli", "Kadamwadi", "Talsande", "Maharashtra"],
    description:
      "JVS Enterprises is a construction company based in Panhala, Kolhapur, offering residential, commercial, institutional, RCC, renovation, compound wall, water tank, drainage, and turnkey construction services.",
    url: SITE_URL,
  };
}

function buildFaqSchema(faqItems: InsightFaqItem[]) {
  if (!faqItems.length) {
    return undefined;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function buildArticleSchema({
  articleType,
  title,
  description,
  category,
  slug,
  featuredImageAlt,
  keywords,
  imageUrl,
}: {
  articleType: "Article" | "BlogPosting";
  title: string;
  description: string;
  category: string;
  slug: string;
  featuredImageAlt: string;
  keywords: string[];
  imageUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": articleType,
    headline: title,
    description,
    articleSection: category,
    keywords,
    image: [
      {
        "@type": "ImageObject",
        url: imageUrl,
        caption: featuredImageAlt || title,
      },
    ],
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/JVS-Logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/insights/${slug}`,
    },
  };
}

function parseInsightFile(fileName: string): Insight {
  const fullPath = path.join(INSIGHTS_DIR, fileName);
  const markdown = readFileSync(fullPath, "utf8");
  const fileOrder = Number.parseInt(fileName.match(/\d+/)?.[0] ?? "0", 10);
  const slugPath = extractInlineValue(markdown, "URL Slug");
  const slug = slugPath.replace(/^\/insights\//, "").trim();
  const title = extractInlineValue(markdown, "Main Title / H1");
  const seoTitle = extractInlineValue(markdown, "SEO Meta Title") || title;
  const description = extractInlineValue(markdown, "Meta Description");
  const category = extractInlineValue(markdown, "Category");
  const kind = getInsightKind(category, title);
  const tags = extractListValue(markdown, "Suggested Tags");
  const primaryKeyword = extractInlineValue(markdown, "Primary Keyword");
  const secondaryKeywords = extractListValue(markdown, "Secondary Keywords");
  const searchIntent = extractInlineValue(markdown, "Search Intent");
  const targetAudience = extractInlineValue(markdown, "Target Audience");
  const featuredImageSuggestion = extractInlineValue(markdown, "Featured Image Suggestion");
  const featuredImageAlt = extractInlineValue(markdown, "Featured Image Alt Text");
  const draft = extractDraft(markdown);
  const { draftTitle, intro, sections } = parseDraft(draft);
  const relatedProjectSlug = RELATED_PROJECTS[slug];
  const primaryCtaSection = extractSection(markdown, "Primary CTA");
  const contactBlock = parseContactBlock(extractSection(markdown, "Contact Block"));
  const faqItems = parseFaqItems(extractTopLevelSection(markdown, "FAQ Section"));
  const inlineInternalLinks = parseInternalLinkSuggestions(
    extractTopLevelSection(markdown, "Internal Link Suggestions"),
  );
  const externalReferences = parseExternalReferences(
    extractTopLevelSection(markdown, "External Link Suggestions"),
  );
  const listingExcerpt =
    splitParagraphs(extractTopLevelSection(markdown, "Suggested excerpt for listing page"))[0];
  const deck = intro.slice(0, 2).join(" ") || description;
  const { midCta, endCta } = buildCtas(kind, primaryCtaSection);
  const bottomLinks = buildBottomLinks(
    kind,
    slug,
    category,
    title,
    inlineInternalLinks,
    relatedProjectSlug,
  );
  const body = [
    draftTitle,
    ...intro,
    ...sections.flatMap((section) => [
      section.heading,
      ...section.blocks.map((block) => (block.type === "list" ? block.items.join(" ") : block.text)),
    ]),
  ]
    .join("\n")
    .trim();
  const schemaSection = extractTopLevelSection(markdown, /JSON-LD Schema for Article(?: \+ FAQ)?/);
  const schemaType = extractSchemaType(schemaSection) ?? (kind === "project-note" ? "Article" : "BlogPosting");
  const publishedDate = extractSchemaDate(schemaSection);
  const imagePath = getInsightImagePath(fileOrder);
  const imageUrl = getInsightImageUrl(fileOrder);
  const seo = buildSeoPackage({
    slug,
    seoTitle,
    title: draftTitle || title,
    description,
    featuredImageAlt,
  });
  seo.openGraph.image = imageUrl;
  const schema = {
    article: buildArticleSchema({
      articleType: schemaType,
      title: draftTitle || title,
      description,
      category,
      slug,
      featuredImageAlt,
      keywords: [primaryKeyword, ...secondaryKeywords, ...tags].filter(Boolean),
      imageUrl,
    }),
    faq: buildFaqSchema(faqItems),
    localBusiness: markdown.includes("# LocalBusiness Schema for JVS Enterprises")
      ? buildLocalBusinessSchema()
      : undefined,
  };

  return {
    order: fileOrder,
    sourceFile: fileName,
    slug,
    title: draftTitle || title,
    seoTitle,
    description,
    category,
    kind,
    topLabel: getTopLabel(kind),
    publishedDate,
    publishedDateLabel: publishedDate ? formatPublishedDate(publishedDate) : undefined,
    deck,
    listingExcerpt: listingExcerpt || deck,
    tags,
    primaryKeyword,
    secondaryKeywords,
    searchIntent,
    targetAudience,
    featuredImageSuggestion,
    featuredImageAlt,
    body,
    intro,
    sections,
    readingTime: estimateReadingTime(body),
    midCta,
    endCta,
    contactBlock,
    faqItems,
    inlineInternalLinks,
    bottomLinks,
    externalReferences,
    seo,
    schemaType,
    schema,
    relatedProjectSlug,
    imagePath,
    imageUrl,
  };
}

const loadInsights = cache(() => {
  return readdirSync(INSIGHTS_DIR)
    .filter((fileName) => fileName.endsWith(".md"))
    .sort((left, right) => {
      const leftOrder = Number.parseInt(left.match(/\d+/)?.[0] ?? "0", 10);
      const rightOrder = Number.parseInt(right.match(/\d+/)?.[0] ?? "0", 10);
      return leftOrder - rightOrder;
    })
    .map(parseInsightFile);
});

export function getAllInsights() {
  return loadInsights();
}

export function getInsightBySlug(slug: string) {
  return loadInsights().find((insight) => insight.slug === slug);
}

export function getInsightCategories() {
  return ["All", ...new Set(loadInsights().map((insight) => insight.category))];
}

export function getInsightSlugs() {
  return loadInsights().map((insight) => insight.slug);
}

export function getLocalBusinessSchema() {
  return buildLocalBusinessSchema();
}

export function getSiteUrl() {
  return SITE_URL;
}

export function getInsightPlaceholderImage() {
  return PLACEHOLDER_IMAGE;
}

export function getInsightImagePath(order: number) {
  if (order >= 1 && order <= MAX_INSIGHT_IMAGE_INDEX) {
    return `${INSIGHTS_IMAGE_DIR}/article${order}.webp`;
  }

  return PLACEHOLDER_IMAGE_PATH;
}

export function getInsightImageUrl(order: number) {
  const imagePath = getInsightImagePath(order);
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  return `${SITE_URL}${imagePath}`;
}

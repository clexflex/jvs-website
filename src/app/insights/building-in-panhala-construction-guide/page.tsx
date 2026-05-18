import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DedicatedInsightArticlePage } from "@/components/DedicatedInsightArticlePage";
import { getInsightBySlug } from "@/content/insights";

const slug = "building-in-panhala-construction-guide";
const insight = getInsightBySlug(slug);

if (!insight) {
  throw new Error(`Missing insight data for slug: building-in-panhala-construction-guide`);
}

export const metadata: Metadata = {
  title: insight.seo.title,
  description: insight.seo.description,
  alternates: {
    canonical: insight.seo.canonical,
  },
  authors: [{ name: "Satish Bhosale" }],
  publisher: "JVS Enterprises",
  keywords: [...insight.tags, insight.primaryKeyword, ...insight.secondaryKeywords].filter(
    Boolean,
  ),
  openGraph: {
    title: insight.seo.openGraph.title,
    description: insight.seo.openGraph.description,
    url: insight.seo.openGraph.url,
    type: "article",
    images: [
      {
        url: insight.seo.openGraph.image,
        width: 1200,
        height: 630,
        alt: insight.seo.openGraph.imageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: insight.seo.openGraph.title,
    description: insight.seo.openGraph.description,
    images: [insight.seo.openGraph.image],
  },
};

export default function InsightPage() {
  if (!insight) {
    notFound();
  }

  const resolvedInsight = insight;
  const articleSchema = {
    ...resolvedInsight.schema.article,
    author: {
      "@type": "Person",
      name: "Satish Bhosale",
    },
    publisher: {
      "@type": "Organization",
      name: "JVS Enterprises",
      logo: {
        "@type": "ImageObject",
        url: "https://www.jvsenterprises.co.in/JVS-Logo.png",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {resolvedInsight.schema.faq ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(resolvedInsight.schema.faq) }}
        />
      ) : null}
      <DedicatedInsightArticlePage insight={resolvedInsight} />
    </>
  );
}

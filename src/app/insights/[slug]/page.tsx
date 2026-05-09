import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InsightArticlePage } from "@/components/InsightArticlePage";
import {
  getAllInsights,
  getInsightBySlug,
  getInsightSlugs,
} from "@/content/insights";

export const dynamicParams = false;
const CUSTOM_INSIGHT_SLUGS = new Set(getInsightSlugs());

export function generateStaticParams() {
  return getInsightSlugs()
    .filter((slug) => !CUSTOM_INSIGHT_SLUGS.has(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/insights/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  if (CUSTOM_INSIGHT_SLUGS.has(slug)) {
    notFound();
  }

  const insight = getInsightBySlug(slug);

  if (!insight) {
    return {
      title: "Insight Not Found",
    };
  }

  return {
    title: insight.seo.title,
    description: insight.seo.description,
    alternates: {
      canonical: insight.seo.canonical,
    },
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
}

export default async function InsightDetailPage(props: PageProps<"/insights/[slug]">) {
  const { slug } = await props.params;
  if (CUSTOM_INSIGHT_SLUGS.has(slug)) {
    notFound();
  }

  const insights = getAllInsights();
  const insightIndex = insights.findIndex((item) => item.slug === slug);

  if (insightIndex === -1) {
    notFound();
  }

  const insight = insights[insightIndex];
  const previousInsight = insights[insightIndex - 1];
  const nextInsight = insights[insightIndex + 1];
  const relatedInsights = insights
    .filter((item) => item.slug !== insight.slug)
    .filter((item) => item.category === insight.category || item.relatedProjectSlug === insight.relatedProjectSlug)
    .slice(0, 3);

  const fallbackInsights =
    relatedInsights.length < 3
      ? insights
          .filter((item) => item.slug !== insight.slug)
          .filter((item) => !relatedInsights.some((related) => related.slug === item.slug))
          .slice(0, 3 - relatedInsights.length)
      : [];
  const articleJsonLd = {
    ...insight.schema.article,
    image: [
      {
        "@type": "ImageObject",
        url: insight.imageUrl,
        caption: insight.featuredImageAlt || insight.title,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {insight.schema.faq ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(insight.schema.faq) }}
        />
      ) : null}
      <InsightArticlePage
        insight={insight}
        previousInsight={previousInsight}
        nextInsight={nextInsight}
        relatedInsights={[...relatedInsights, ...fallbackInsights]}
      />
    </>
  );
}

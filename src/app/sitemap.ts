import type { MetadataRoute } from "next";
import { getInsightSlugs } from "@/content/insights";
import { projects } from "@/content/site";

const baseUrl = "https://www.jvsenterprises.co.in";
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/our-company",
    "/services",
    "/projects",
    "/insights",
    "/contact",
    "/privacy-notice",
    "/sitemap",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
  }));

  const insightRoutes: MetadataRoute.Sitemap = getInsightSlugs().map((slug) => ({
    url: `${baseUrl}/insights/${slug}`,
  }));

  return [...staticRoutes, ...projectRoutes, ...insightRoutes];
}

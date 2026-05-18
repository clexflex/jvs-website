import { generatedProjects, type GeneratedProject, type GeneratedProjectMedia } from "./projects.generated";

export type ProjectMedia = GeneratedProjectMedia;

export type Project = GeneratedProject & {
  coverImage: string;
  coverAlt: string;
};

export const projects: Project[] = generatedProjects.map((project) => ({
  ...project,
  coverImage: project.media[0]?.src || "/assets/insight-placeholder.svg",
  coverAlt: project.media[0]?.alt || project.title,
}));

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug) || null;
}

export const projectSlugs = projects.map((project) => project.slug);

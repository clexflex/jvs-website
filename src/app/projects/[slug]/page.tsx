import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailExperience } from "@/components/ProjectDetailExperience";
import { getProjectDetailContent } from "@/content/project-detail";
import { projects } from "@/content/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | JVS Enterprises Project in ${project.location}`,
    description:
      project.description ||
      `Explore ${project.title}, a ${project.category} project by JVS Enterprises in ${project.location}.`,
  };
}

export default async function ProjectDetailPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const detail = getProjectDetailContent(slug);

  if (!detail) {
    notFound();
  }

  return <ProjectDetailExperience detail={detail} />;
}

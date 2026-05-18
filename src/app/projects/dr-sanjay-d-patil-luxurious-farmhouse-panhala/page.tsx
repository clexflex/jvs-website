import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailExperience } from "@/components/ProjectDetailExperience";
import { getProjectDetailContent, getProjectPageMetadata } from "@/content/project-detail";

const slug = "dr-sanjay-d-patil-luxurious-farmhouse-panhala";
const detail = getProjectDetailContent(slug);

if (!detail) {
  throw new Error(`Missing project detail data for slug: dr-sanjay-d-patil-luxurious-farmhouse-panhala`);
}

export const metadata: Metadata = getProjectPageMetadata(slug);

export default function ProjectPage() {
  if (!detail) {
    notFound();
  }

  return <ProjectDetailExperience detail={detail} />;
}

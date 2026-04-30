import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectGallery } from "@/components/Sliders";
import { CTAButton, PageIntro, Section } from "@/components/Primitives";
import { getAllInsights } from "@/content/insights";
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
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const relatedInsights = getAllInsights().filter((insight) => insight.relatedProjectSlug === slug);
  const similarProjects = projects.filter((item) => item.slug !== project.slug).slice(0, 3);

  return (
    <>
      <PageIntro
        eyebrow="PROJECT"
        title={project.title}
        copy={`${project.description} The project reflects JVS Enterprises' approach to practical planning, disciplined execution, and long-term usability on site.`}
        primary={{ label: "Discuss a Similar Project", href: "/contact" }}
      />

      <Section className="section--soft">
        <div className="article-shell">
          <aside className="article-meta">
            <p className="eyebrow">Quick Facts</p>
            <div className="inline-cta">
              <p>{project.category}</p>
              <div className="quick-facts">
                <div>
                  <span>Location</span>
                  <strong>{project.location}</strong>
                </div>
                <div>
                  <span>Status</span>
                  <strong>{project.status}</strong>
                </div>
                <div>
                  <span>Scope</span>
                  <strong>{project.scope[0]}</strong>
                </div>
                <div>
                  <span>Project</span>
                  <strong>JVS Enterprises</strong>
                </div>
              </div>
            </div>

            {relatedInsights.length ? (
              <div className="insight-aside__panel">
                <p className="eyebrow">Related Insight</p>
                {relatedInsights.map((insight) => (
                  <Link key={insight.slug} href={`/insights/${insight.slug}`}>
                    <strong>{insight.title}</strong>
                  </Link>
                ))}
              </div>
            ) : null}
          </aside>

          <div className="article-body">
            <div>
              <p className="eyebrow">Project Overview</p>
              <h2>Built for daily use, practical performance, and long-term durability.</h2>
            </div>
            <p>
              {project.overview ||
                `${project.title} required a construction approach that considered the site's purpose, movement, structural needs, and long-term use. JVS Enterprises approached the work with practical planning, site coordination, and disciplined execution across the required stages.`}
            </p>

            <div>
              <p className="eyebrow">Scope Handled</p>
              <ul className="insight-story__scope">
                {project.scope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow">Execution Priorities</p>
              <ul className="insight-story__scope">
                {(project.priorities || [
                  "Read site conditions before execution began",
                  "Maintain structural reliability through disciplined site supervision",
                  "Coordinate work for long-term usability and maintenance",
                ]).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow">Project Gallery</p>
              <ProjectGallery title={project.title} />
            </div>

            {similarProjects.length ? (
              <div>
                <p className="eyebrow">Explore Similar Work</p>
                <div className="project-rail">
                  {similarProjects.map((item) => (
                    <Link key={item.slug} href={`/projects/${item.slug}`}>
                      <span>{item.category}</span>
                      <strong>{item.title}</strong>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            <CTAButton href="/contact">Discuss a Similar Project</CTAButton>
          </div>
        </div>
      </Section>
    </>
  );
}

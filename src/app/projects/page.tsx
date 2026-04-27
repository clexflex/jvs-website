import type { Metadata } from "next";
import { ProjectCard } from "@/components/Cards";
import { CTAButton, Container, Eyebrow, PageIntro, Section } from "@/components/Primitives";
import { projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects | JVS Enterprises Construction Work in Kolhapur & Panhala",
  description:
    "Explore selected JVS Enterprises projects across institutional construction, residential houses, farmhouses, RCC works, compound walls, water tanks, sports grounds, and site development in Kolhapur and Panhala.",
};

const filters = [
  "All",
  "Institutional",
  "Residential",
  "Farmhouses",
  "RCC & Structural",
  "Compound Walls",
  "Water Tanks",
  "Sports & External Works",
  "Site Development",
];

const categories = [
  ["Institutional projects", "Educational, healthcare, and campus-related projects require coordination, safety awareness, durable construction, and the ability to manage larger site requirements."],
  ["Residential projects", "Homes, row houses, and personal properties require careful planning, cost discipline, strong RCC work, waterproofing, finishing quality, and practical handover."],
  ["Farmhouse projects", "Farmhouses near Panhala and Kolhapur often need terrain understanding, external development, water storage, drainage, access roads, and long-term weather resistance."],
  ["RCC and structural works", "Structural work determines the life of a building. JVS undertakes foundations, RCC elements, lift structures, water tanks, compound walls, and related works."],
  ["Site development", "Drainage, gutters, paver blocks, roads, boundary gates, sports grounds, and external development works help complete and protect the property."],
];

export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        eyebrow="OUR PROJECTS"
        title="Work that stands on site, not just on paper."
        copy="JVS Enterprises has delivered construction work across educational buildings, hospital boundary works, sports and campus development, RCC structures, water tanks, residential homes, row houses, and farmhouses. Each project reflects planning, supervision, and practical execution."
        primary={{ label: "Discuss a Similar Project", href: "/contact" }}
      />

      <Section>
        <div className="section-header">
          <div>
            <Eyebrow>SELECTED WORK</Eyebrow>
            <h2>A portfolio across institutions, homes, RCC works, and site development.</h2>
          </div>
          <p>
            A construction portfolio should show more than completed names. It should show
            the range of responsibility handled on site — foundation work, structural
            execution, external development, drainage, finishing, and long-term usability.
          </p>
        </div>
        <div className="filter-row" aria-label="Project categories">
          {filters.map((filter) => (
            <span className="filter-chip" key={filter}>
              {filter}
            </span>
          ))}
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.title}
              category={project.category}
              location={project.location}
              description={project.description}
              href={`/projects/${project.slug}`}
            />
          ))}
        </div>
      </Section>

      <Section className="section--soft">
        <div className="section-header">
          <div>
            <Eyebrow>CAPABILITIES</Eyebrow>
            <h2>Different project types. One disciplined construction approach.</h2>
          </div>
        </div>
        <div className="card-grid">
          {categories.map(([title, copy]) => (
            <article className="value-card" key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="split">
          <div>
            <Eyebrow>PROJECT PROOF</Eyebrow>
            <h2>Built through site responsibility.</h2>
          </div>
          <div className="split__copy">
            <p>
              JVS Enterprises does not present projects as decoration. Each project
              represents coordination between client expectations, drawings, site
              conditions, material movement, labour, supervision, weather, and the realities
              of construction.
            </p>
            <CTAButton href="/services" tone="outline">Explore Our Services</CTAButton>
          </div>
        </div>
      </Section>

      <section className="cta-band">
        <Container>
          <div>
            <h2>Planning a project similar to these?</h2>
            <p>
              Share your project location, drawings, site condition, and expected scope with
              JVS Enterprises. The team can help you understand the next practical steps
              before construction begins.
            </p>
          </div>
          <CTAButton href="/contact" tone="light">Discuss a Similar Project</CTAButton>
        </Container>
      </section>
    </>
  );
}

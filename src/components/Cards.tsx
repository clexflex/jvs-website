import { ArrowLink, VisualPlaceholder } from "@/components/Primitives";

export function ServiceCard({
  index,
  title,
  copy,
  href,
  cta,
}: {
  index: number;
  title: string;
  copy: string;
  href: string;
  cta: string;
}) {
  return (
    <article className="service-card line-card">
      <p className="card-index">{String(index).padStart(2, "0")}</p>
      <h3>{title}</h3>
      <p>{copy}</p>
      <ArrowLink href={href}>{cta}</ArrowLink>
    </article>
  );
}

export function ProjectCard({
  title,
  category,
  location,
  description,
  href,
  featured = false,
}: {
  title: string;
  category: string;
  location?: string;
  description: string;
  href: string;
  featured?: boolean;
}) {
  return (
    <article className={`project-card line-card ${featured ? "project-card--featured" : ""}`}>
      <VisualPlaceholder label={category} tall={featured} />
      <div className="project-card__body">
        <p className="card-kicker">{location || category}</p>
        <h3>{title}</h3>
        <p>{description}</p>
        <ArrowLink href={href}>View Project</ArrowLink>
      </div>
    </article>
  );
}

export function InsightCard({
  title,
  category,
  excerpt,
  href,
  featured = false,
}: {
  title: string;
  category: string;
  excerpt: string;
  href: string;
  featured?: boolean;
}) {
  return (
    <article className={`insight-card line-card ${featured ? "insight-card--featured" : ""}`}>
      <div className="insight-card__media" aria-hidden="true" />
      <div className="insight-card__body">
        <p className="card-kicker">{category}</p>
        <h3>{title}</h3>
        <p>{excerpt}</p>
        <ArrowLink href={href}>Read More</ArrowLink>
      </div>
    </article>
  );
}

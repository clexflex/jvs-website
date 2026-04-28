import Link from "next/link";

type ButtonTone = "primary" | "dark" | "light" | "outline";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`container grid-cell ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`section ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function CTAButton({
  href,
  children,
  tone = "primary",
}: {
  href: string;
  children: React.ReactNode;
  tone?: ButtonTone;
}) {
  return (
    <Link className={`button button--${tone}`} href={href}>
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </Link>
  );
}

export function ArrowLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link className="arrow-link" href={href}>
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </Link>
  );
}

export function PageIntro({
  eyebrow,
  title,
  copy,
  brandLine,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  brandLine?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="page-hero line-grid line-grid--dark">
      <Container>
        <div className="page-hero__grid">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1>{title}</h1>
          </div>
          <div className="page-hero__copy">
            <p>{copy}</p>
            {brandLine ? <p className="brand-line">{brandLine}</p> : null}
            <div className="hero-actions">
              {primary ? <CTAButton href={primary.href}>{primary.label}</CTAButton> : null}
              {secondary ? (
                <CTAButton href={secondary.href} tone="outline">
                  {secondary.label}
                </CTAButton>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function VisualPlaceholder({
  label,
  tall = false,
}: {
  label: string;
  tall?: boolean;
}) {
  return (
    <div className={`visual-placeholder ${tall ? "visual-placeholder--tall" : ""}`}>
      <span>{label}</span>
    </div>
  );
}

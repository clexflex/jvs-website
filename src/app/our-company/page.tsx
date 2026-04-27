import type { Metadata } from "next";
import { CTAButton, Eyebrow, PageIntro, Section, VisualPlaceholder } from "@/components/Primitives";
import { projects, siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Our Company | JVS Enterprises Construction Company in Panhala",
  description:
    "Learn about JVS Enterprises, a Panhala-based construction company founded around 2006 and trusted for residential, institutional, commercial, RCC, and site development work across Kolhapur.",
};

const values = [
  ["Quality in execution", "From foundation and RCC to finishing and external works, the company focuses on construction that is checked, supervised, and completed with attention to detail."],
  ["Reliability in commitment", "Clients need clear communication, predictable progress, and responsible handling of work. JVS gives importance to practical planning and site-level accountability."],
  ["Ethical working standards", "Construction involves trust. JVS believes in working with transparency, practical estimates, and respect for the client’s project requirements."],
  ["Local understanding", "Panhala and Kolhapur have specific site conditions, terrain, access, drainage, and weather considerations. Local experience helps the company plan and execute better."],
  ["Supervised construction", "Good work needs daily attention. Site engineers, supervisors, skilled labour, and equipment operators contribute to progress, quality, and safety."],
  ["Long-term thinking", "A structure should serve the people who use it. JVS gives importance to strength, usability, maintenance, and durability beyond handover."],
];

export default function OurCompanyPage() {
  return (
    <>
      <PageIntro
        eyebrow="OUR COMPANY"
        title="A construction journey built from the ground up."
        copy="JVS Enterprises began with a small start in Panhala and grew through years of hard work, site discipline, and client trust. Led by Mr. Satish Bhosale, the company has become a dependable construction name for residential, institutional, commercial, RCC, and site development projects across Panhala and Kolhapur."
        brandLine={siteConfig.slogan}
        primary={{ label: "Discuss a Project", href: "/contact" }}
      />

      <Section>
        <div className="split">
          <div className="split__copy">
            <Eyebrow>WHO WE ARE</Eyebrow>
            <h2>A Panhala-based construction company with practical site experience.</h2>
            <p>
              JVS Enterprises is a construction company based in Panhala, Maharashtra,
              serving projects across Panhala, Kolhapur, and nearby regions. The company
              works across planning, estimation, civil construction, RCC work, finishing,
              renovation, repair, fabrication, and site development.
            </p>
            <p>
              The company’s strength lies in practical execution. From homes and farmhouses
              to institutional buildings, compound walls, water tanks, sports grounds,
              gutters, and external works, JVS Enterprises focuses on getting the
              fundamentals right.
            </p>
            <p className="brand-line">Every project must be reliable, usable, and built with responsibility.</p>
          </div>
          <VisualPlaceholder label="Site discipline" tall />
        </div>
      </Section>

      <Section className="section--soft">
        <div className="split">
          <VisualPlaceholder label="Founder Journey" tall />
          <div className="split__copy">
            <Eyebrow>FOUNDER JOURNEY</Eyebrow>
            <h2>The growth of JVS Enterprises reflects the work behind the name.</h2>
            <p>
              The journey of JVS Enterprises is closely connected with the work ethic of its
              owner, Mr. Satish Bhosale. Around 2006, the company began with a small start.
              Over the years, through consistent construction work, personal involvement,
              and local trust, the company grew project by project.
            </p>
            <p>
              What started as a modest construction effort has developed into a company with
              a workforce of 100+ workers and an approximate turnover of ₹10 crore.
            </p>
            <h3>A name becomes trusted only when the work behind it stays consistent.</h3>
          </div>
        </div>
      </Section>

      <Section>
        <div className="section-header">
          <div>
            <Eyebrow>MISSION & VISION</Eyebrow>
            <h2>Built on quality, reliability, and client satisfaction.</h2>
          </div>
          <p>
            JVS Enterprises believes that good construction is not only about completing a
            structure. It is about respecting the client’s investment, planning the work
            properly, supervising the site carefully, and delivering a result that stands.
          </p>
        </div>
        <div className="card-grid">
          <article className="value-card">
            <Eyebrow>Mission</Eyebrow>
            <p>
              Our mission is to understand each client’s requirement clearly and deliver
              high-quality construction work on time, within the agreed scope, and with
              responsible site execution.
            </p>
          </article>
          <article className="value-card">
            <Eyebrow>Vision</Eyebrow>
            <p>
              Our vision is to be a construction company known for ethical standards,
              dependable quality, customer satisfaction, continuous learning, and long-term
              reliability.
            </p>
          </article>
        </div>
      </Section>

      <Section className="section--soft">
        <div className="section-header">
          <div>
            <Eyebrow>OUR WORKING VALUES</Eyebrow>
            <h2>The standards that guide our sites.</h2>
          </div>
        </div>
        <div className="value-grid card-grid">
          {values.map(([title, copy]) => (
            <article className="value-card" key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="split">
          <div className="split__copy">
            <Eyebrow>TEAM</Eyebrow>
            <h2>Construction is delivered by people who understand the site.</h2>
            <p>
              Behind every completed project is a team responsible for planning, accounts,
              supervision, execution, equipment movement, and site coordination. JVS
              Enterprises is supported by experienced site-level professionals, including an
              accountant, site engineer, site supervisors, JCB operator, tractor operator,
              skilled workers, and labour teams.
            </p>
          </div>
          <div className="list-panel">
            <h3>Role structure</h3>
            <ul className="check-list">
              {[
                "Accounts and project coordination",
                "Site engineering",
                "Site supervision",
                "Skilled construction labour",
                "JCB and tractor operations",
                "Material and site movement support",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section className="section--soft">
        <div className="section-header">
          <div>
            <Eyebrow>PANHALA ROOTS</Eyebrow>
            <h2>Local experience makes construction decisions sharper.</h2>
          </div>
          <p>
            JVS Enterprises comes from Panhala, and many of its projects have been shaped by
            the region’s ground realities: sloped sites, monsoon water movement, access
            roads, compound wall requirements, farmhouse plots, material movement, and
            external development work.
          </p>
        </div>
        <div className="project-rail">
          {projects.slice(0, 5).map((project) => (
            <a key={project.slug} href={`/projects/${project.slug}`}>
              <span>{project.category}</span>
              <strong>{project.title}</strong>
            </a>
          ))}
        </div>
      </Section>

      <section className="cta-band">
        <div className="container">
          <div>
            <Eyebrow>WORK WITH JVS</Eyebrow>
            <h2>Start with a clear conversation before construction begins.</h2>
            <p>
              Whether you are planning a home, farmhouse, institutional building,
              commercial space, compound wall, RCC structure, or site development work, JVS
              Enterprises can help you understand the scope and practical steps required.
            </p>
          </div>
          <div className="hero-actions">
            <CTAButton href="/contact" tone="light">Discuss a Project</CTAButton>
            <CTAButton href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} tone="outline">
              Call {siteConfig.phone}
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}

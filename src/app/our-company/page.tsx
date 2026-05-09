import type { Metadata } from "next";
import Image from "next/image";
import { Container, Eyebrow } from "@/components/Primitives";
import { CompanyValuesSlider, type CompanyValue } from "@/components/CompanyValuesSlider";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Our Company | JVS Enterprises Construction Company in Panhala",
  description:
    "Learn about JVS Enterprises, a Panhala-based construction company founded around 2006 and trusted for residential, institutional, commercial, RCC, and site development work across Kolhapur.",
};

const values: CompanyValue[] = [
  {
    title: "Quality in execution",
    body:
      "From foundation and RCC to finishing and external works, the company focuses on construction that is checked, supervised, and completed with attention to detail.",
  },
  {
    title: "Reliability in commitment",
    body:
      "Clients need clear communication, predictable progress, and responsible handling of work. JVS gives importance to practical planning and site-level accountability.",
  },
  {
    title: "Ethical working standards",
    body:
      "Construction involves trust. JVS believes in working with transparency, practical estimates, and respect for the client’s project requirements.",
  },
  {
    title: "Local understanding",
    body:
      "Panhala and Kolhapur have specific site conditions, terrain, access, drainage, and weather considerations. Local experience helps the company plan and execute better.",
  },
  {
    title: "Supervised construction",
    body:
      "Good work needs daily attention. Site engineers, supervisors, skilled labour, and equipment operators contribute to progress, quality, and safety.",
  },
  {
    title: "Long-term thinking",
    body:
      "A structure should serve the people who use it. JVS gives importance to strength, usability, maintenance, and durability beyond handover.",
  },
];

function CompanyMedia({ label, src }: { label: string; src: string }) {
  return (
    <figure className="company-rail-media">
      <Image
        src={src}
        alt={label}
        fill
        sizes="(max-width: 760px) 100vw, 50vw"
      />
    </figure>
  );
}

export default function OurCompanyPage() {
  return (
    <>
      <section className="company-hero line-grid line-grid--dark">
        <video
          className="company-hero__video"
          src="/videos/our-company-hero.webm"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          poster="/images/our-company-hero.webp"
        />
        <div className="company-hero__overlay" aria-hidden="true" />
        <Container className="rail-page__container">
          <div className="company-hero__content">
            <Eyebrow>Our Company | Panhala | Since 2006</Eyebrow>
            <h1>A construction journey built from the ground up.</h1>
            <p>
              JVS Enterprises began with a small start in Panhala and grew through years of
              hard work, site discipline, and client trust.
            </p>
          </div>
        </Container>
      </section>

      <section className="company-editorial line-grid">
        <Container className="rail-page__container">
          <div className="company-rail-pair company-rail-pair--intro">
            <div className="company-rail-title">
              <h2>
                About <span>JVS</span>
              </h2>
            </div>
            <div className="company-rail-copy">
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
                fundamentals right: planning, site supervision, material coordination, quality
                checks, and timely progress.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="company-editorial line-grid">
        <Container className="rail-page__container">
          <div className="company-rail-pair">
            <div className="company-rail-copy company-rail-copy--story">
              <Eyebrow>Who We Are</Eyebrow>
              <h2>A Panhala-based construction company with practical site experience.</h2>
              <p>
                Every project is different, but the expectation is the same — the work must be
                reliable, usable, and built with responsibility.
              </p>
              <p>
                JVS supports clients who need more than one isolated activity. Many projects
                require foundation work, RCC, masonry, finishing, drainage, boundary work, and
                final site development to be coordinated together.
              </p>
            </div>
            <CompanyMedia
              label="JVS construction site discipline"
              src="/images/our-company/who-we-are.webp"
            />
          </div>
        </Container>
      </section>

      <section className="company-editorial line-grid">
        <Container className="rail-page__container">
          <div className="company-rail-pair company-rail-pair--reverse">
            <figure className="company-rail-media">
              <Image
                src="/images/our-company/satish-bhosale.webp"
                alt="JVS Enterprises | Satish Bhosale | Founder Journey"
                fill
                sizes="(max-width: 760px) 100vw, 50vw"
              />
            </figure>
            <div className="company-rail-copy company-rail-copy--story">
              <Eyebrow>Founder Journey</Eyebrow>
              <h2>The growth of JVS Enterprises reflects the work behind the name.</h2>
              <p>
                The journey of JVS Enterprises is closely connected with the work ethic of its
                owner, Mr. Satish Bhosale. Around 2006, the company began with a small start.
                Over the years, through consistent construction work, personal involvement, and
                local trust, the company grew project by project.
              </p>
              <p>
                What started as a modest construction effort has developed into a company with a
                workforce of 100+ workers and an approximate turnover of ₹10 crore. For JVS
                Enterprises, the company name is not just a label. It is a responsibility
                carried on every site.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="company-editorial line-grid">
        <Container className="rail-page__container">
          <div className="company-rail-pair">
            <div className="company-rail-copy company-rail-copy--story">
              <Eyebrow>Mission &amp; Vision</Eyebrow>
              <h2>Built on quality, reliability, and client satisfaction.</h2>
              <p>
                Our mission is to understand each client’s requirement clearly and deliver
                high-quality construction work on time, within the agreed scope, and with
                responsible site execution.
              </p>
              <p>
                Our vision is to be a construction company known for ethical standards,
                dependable quality, customer satisfaction, continuous learning, and long-term
                reliability.
              </p>
            </div>
            <div className="company-rail-copy company-rail-copy--support">
              <p>
                JVS Enterprises believes that good construction is not only about completing a
                structure. It is about respecting the client’s investment, planning the work
                properly, supervising the site carefully, and delivering a result that stands
                through use, weather, and time.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="company-editorial company-editorial--ruled line-grid">
        <Container className="rail-page__container">
          <div className="company-rail-pair company-rail-pair--intro">
            <div className="company-rail-title">
              <h2>Our Culture</h2>
            </div>
            <div className="company-rail-copy">
              <p>
                Behind every completed project is a team responsible for planning, accounts,
                supervision, execution, equipment movement, and site coordination. JVS
                Enterprises is supported by experienced site-level professionals including
                accounts, site engineering, site supervision, equipment operation, skilled
                workers, and labour teams.
              </p>
              <p>
                This practical team structure helps the company manage project requirements
                across excavation, RCC, masonry, finishing, drainage, external works, and
                day-to-day site operations.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="company-editorial company-culture line-grid">
        <Container className="rail-page__container">
          <CompanyValuesSlider
            values={values}
            ctaHref={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
          />
        </Container>
      </section>

      <section className="company-editorial company-editorial--ruled line-grid">
        <Container className="rail-page__container">
          <div className="company-rail-pair company-rail-pair--intro">
            <div className="company-rail-title">
              <h2>Panhala Roots</h2>
            </div>
            <div className="company-rail-copy">
              <p>
                JVS Enterprises comes from Panhala, and many of its projects have been shaped
                by the region’s ground realities. Sloped sites, monsoon water movement, access
                roads, compound wall requirements, farmhouse plots, material movement, and
                external development work all require practical local understanding.
              </p>
              <p>
                This regional experience helps JVS approach every project with more than
                drawings and estimates. It brings awareness of how the site behaves, how work
                should be sequenced, and where attention is needed before issues become costly.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

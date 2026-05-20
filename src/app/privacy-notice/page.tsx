import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/Primitives";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "Read the JVS Enterprises privacy notice for website enquiries, contact forms, and communication preferences.",
  authors: [{ name: "JVS Enterprises" }],
  publisher: "JVS Enterprises",
  openGraph: {
    title: "Privacy Notice | JVS Enterprises",
    description:
      "Read the JVS Enterprises privacy notice for website enquiries, contact forms, and communication preferences.",
    url: "https://www.jvsenterprises.co.in/privacy-notice",
    type: "website",
    images: [
      {
        url: "/images/JVS Enterprises Office/outside-office.png",
        width: 1200,
        height: 630,
        alt: "JVS Enterprises office exterior image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Notice | JVS Enterprises",
    description:
      "Read the JVS Enterprises privacy notice for website enquiries, contact forms, and communication preferences.",
    images: ["/images/JVS Enterprises Office/outside-office.png"],
  },
};

export default function PrivacyNoticePage() {
  return (
    <section className="privacy-page line-grid h-full">
      <Container>
        <div className="privacy-page__layout">
          <div className="privacy-page__intro">
            <Eyebrow>LEGAL</Eyebrow>
            <h1>Privacy Notice</h1>
            <p>Effective date: May 6, 2026</p>
          </div>
          <div className="privacy-page__body">
            <p>
              JVS Enterprises collects only the information required to respond to project enquiries
              and communicate with clients. This may include your name, phone number, email address,
              project location, and project details submitted through this website.
            </p>
            <p>
              We use this information to call you back, share estimates, schedule site visits,
              provide project updates, and improve our service quality. We do not sell personal
              information.
            </p>
            <p>
              If you want us to update or remove your enquiry details, contact us at{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or{" "}
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>{siteConfig.phone}</a>.
            </p>
            <p>
              By using this website or submitting an enquiry, you agree to this privacy notice.
              JVS Enterprises may update this page when required.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

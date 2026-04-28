import Image from "next/image";
import Link from "next/link";
import { navItems, siteConfig } from "@/content/site";

const socialLinks = [
  { label: "Facebook", href: "#", icon: "/assets/FacebookLogo.svg" },
  { label: "Instagram", href: "#", icon: "/assets/InstagramLogo.svg" },
  { label: "LinkedIn", href: "#", icon: "/assets/LinkedinLogo.svg" },
  { label: "YouTube", href: "#", icon: "/assets/YoutubeLogo.svg" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-rail footer-rail--top">
        <div className="footer-brand">
          <Link href="/" aria-label="JVS Enterprises home">
            <Image src="/JVS-Logo.png" alt="" width={86} height={72} />
          </Link>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <Link href="/">Home</Link>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="footer-social" aria-label="Social links">
          {socialLinks.map((item) => (
            <a key={item.label} href={item.href} aria-label={item.label}>
              <Image src={item.icon} alt="" width={32} height={32} />
            </a>
          ))}
        </div>
      </div>

      <div className="footer-rail footer-rail--bottom">
        <p className="footer-copyright">
          © JVS Enterprises.
          <br />
          All rights reserved.
        </p>

        <div className="footer-legal">
          <p>
            JVS Enterprises is a Panhala-based construction company serving residential,
            institutional, commercial, RCC, and site development projects across Panhala,
            Kolhapur, and nearby regions.
          </p>
          <Link href="https://www.fatmangosolutions.com/">
            Website by Fat Mango Solutions
          </Link>
        </div>

        <div className="footer-contact">
          <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>{siteConfig.phone}</a>
          <span>|</span>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <span>|</span>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

export function MobileStickyBar() {
  const whatsapp = `https://wa.me/919860943500?text=${encodeURIComponent(
    siteConfig.whatsappMessage,
  )}`;

  return (
    <nav className="mobile-sticky" aria-label="Quick contact actions">
      <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>Call</a>
      <a href={whatsapp}>WhatsApp</a>
      <Link href="/contact">Enquire</Link>
    </nav>
  );
}

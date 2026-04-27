import Link from "next/link";
import { navItems, services, siteConfig } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <h2>JVS Enterprises</h2>
          <p className="brand-line">{siteConfig.slogan}</p>
          <p>
            JVS Enterprises is a Panhala-based construction company serving residential,
            institutional, commercial, and site development projects across Panhala,
            Kolhapur, and nearby regions.
          </p>
        </div>
        <div>
          <h3>Explore</h3>
          <Link href="/">Home</Link>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div>
          <h3>Services</h3>
          {services.slice(0, 6).map((service) => (
            <Link key={service.id} href={`/services#${service.id}`}>
              {service.title}
            </Link>
          ))}
        </div>
        <address>
          <h3>Contact</h3>
          <span>{siteConfig.shortAddress}</span>
          <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>{siteConfig.phone}</a>
          <a href={`tel:${siteConfig.alternatePhone.replace(/\s/g, "")}`}>
            {siteConfig.alternatePhone}
          </a>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <span>GSTIN: {siteConfig.gstin}</span>
        </address>
      </div>
      <div className="footer-bottom">
        <p>© JVS Enterprises. All rights reserved.</p>
        <p>Website by Fat Mango Solutions.</p>
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

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navItems, siteConfig } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-rail footer-rail--top footer-row footer-row--primary">
        <div className="footer-brand">
          <Link href="/" aria-label="JVS Enterprises home">
            <Image src="/JVS-Logo.png" alt="JVS Enterprises logo" width={86} height={72} />
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

        <div className="footer-contact footer-terms" aria-label="Footer utility links">
          <Link className="footer-terms-link" href="/sitemap">
            Sitemap
          </Link>
          <span className="footer-terms-separator" aria-hidden="true">
            |
          </span>
          <Link className="footer-terms-link" href="/privacy-notice">
            Privacy Notice
          </Link>
          <span className="footer-terms-separator" aria-hidden="true">
            |
          </span>
          <Link className="footer-terms-link" href="/docs/api">
            API Documentation
          </Link>
        </div>
      </div>

      <div className="footer-rail footer-rail--bottom footer-row footer-row--secondary">
        <p className="footer-copyright">
          © JVS Enterprises
          <br className="footer-copyright-br" />
          All rights reserved
        </p>

        <div className="footer-legal">
          <p>
            JVS Enterprises is a Panhala-based construction company serving residential,
            institutional, commercial, RCC, and site development projects across Panhala,
            Kolhapur, and nearby regions.
          </p>
          <p className="footer-legal-gstin">GSTIN: 27CJXPB7834H1ZO</p>
        </div>

        <div className="footer-credit">
          <Link className="footer-credit-link" href="https://www.fatmangosolutions.com/">
            Website by Fat Mango Solutions
          </Link>
        </div>
      </div>
    </footer>
  );
}

export function MobileStickyBar() {
  const [footerVisible, setFooterVisible] = useState(false);
  const whatsapp = `https://wa.me/919860943500?text=${encodeURIComponent(
    siteConfig.whatsappMessage,
  )}`;

  useEffect(() => {
    const footer = document.querySelector(".site-footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`mobile-sticky ${footerVisible ? "is-hidden" : ""}`}
      aria-label="Quick contact actions"
    >
      <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>Call</a>
      <a href={whatsapp}>WhatsApp</a>
      <Link href="/contact">Enquire</Link>
    </nav>
  );
}

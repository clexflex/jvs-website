"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navItems, services, siteConfig } from "@/content/site";

const menuDetails = {
  "Our Company": {
    links: [
      "Overview",
      "Founder Journey",
      "Mission & Vision",
      "How We Work",
      "Team & Site Leadership",
      "Panhala Roots",
    ],
    copy:
      "A construction company built from the ground up, shaped by local experience, disciplined execution, and long-term client trust.",
    cta: "Know Our Story",
    href: "/our-company",
  },
  Services: {
    links: services.map((service) => service.title),
    copy:
      "Planning, civil construction, RCC work, finishing, repair, renovation, and external site development handled with practical site discipline.",
    cta: "Explore Services",
    href: "/services",
  },
  Projects: {
    links: [
      "Institutional Projects",
      "Residential Homes",
      "Farmhouses",
      "RCC & Structural Works",
      "Compound Walls",
      "Water Tanks",
      "Sports & Ground Development",
      "Site Development",
    ],
    copy:
      "Selected work across institutions, homes, RCC structures, boundary works, water tanks, and external development.",
    cta: "View All Projects",
    href: "/projects",
  },
  Insights: {
    links: [
      "Construction Guides",
      "Panhala & Kolhapur Building Advice",
      "RCC & Structural Work",
      "Budgeting & BOQ",
      "Project Planning",
      "Project Notes",
    ],
    copy:
      "Practical construction knowledge for homeowners, institutions, and landowners planning work with clarity.",
    cta: "Read Insights",
    href: "/insights",
  },
  Contact: {
    links: [
      "Start a Project Enquiry",
      "Call JVS Enterprises",
      "Email the Office",
      "Visit Panhala Office",
      "View Location Map",
    ],
    copy:
      "Share your project location, drawings, land details, and expected scope with JVS Enterprises.",
    cta: "Discuss Your Project",
    href: "/contact",
  },
};

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<keyof typeof menuDetails>("Services");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className={`site-header ${scrolled || open ? "is-solid" : ""}`}>
        <Link className="brand" href="/" aria-label="JVS Enterprises home">
          <Image src="/JVS-Logo.png" alt="" width={58} height={48} priority />
          <span>
            <strong>JVS</strong>
            <small>Enterprises</small>
            <em>{siteConfig.slogan}</em>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link className="header-cta" href="/contact">
            Discuss a Project
          </Link>
          <button
            className="menu-button"
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div id="site-menu" className={`mega-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <aside className="mega-menu__brand">
          <div>
            <p className="mega-logo">JVS ENTERPRISES</p>
            <p>{siteConfig.slogan}</p>
            <p>{siteConfig.locationLine}</p>
          </div>
          <div>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>{siteConfig.phone}</a>
          </div>
        </aside>

        <div className="mega-menu__main">
          <div className="mega-menu__top">
            <div className="menu-search" aria-hidden="true">
              <span>⌕</span>
              <span>Type To Search</span>
            </div>
            <button type="button" className="menu-close" onClick={() => setOpen(false)}>
              Close
            </button>
            <Link href="/contact" onClick={() => setOpen(false)}>
              Contact Us
            </Link>
          </div>

          <div className="mega-menu__content">
            <ul className="mega-menu__list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onMouseEnter={() => setActive(item.label as keyof typeof menuDetails)}
                    onFocus={() => setActive(item.label as keyof typeof menuDetails)}
                    onClick={() => setOpen(false)}
                    className={active === item.label ? "is-active" : ""}
                  >
                    {item.label}
                    <span aria-hidden="true">⌄</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mega-menu__details">
              <p className="eyebrow">{active}</p>
              <p>{menuDetails[active].copy}</p>
              <div className="mega-menu__columns">
                {menuDetails[active].links.map((link) => (
                  <span key={link}>{link}</span>
                ))}
              </div>
              <Link
                className="arrow-link"
                href={menuDetails[active].href}
                onClick={() => setOpen(false)}
              >
                {menuDetails[active].cta}
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <aside className="mega-menu__feature">
              <p className="eyebrow">Featured Project</p>
              <div className="menu-feature-visual" />
              <h3>YSPM Nursing College, Kodoli</h3>
              <p>
                Institutional construction planned for long-term daily use, safety, and
                structural dependability.
              </p>
              <Link href="/projects/yspm-nursing-college-kodoli" onClick={() => setOpen(false)}>
                View Project
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

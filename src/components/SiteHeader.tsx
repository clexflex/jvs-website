"use client";

import Head from "next/head";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState, type WheelEvent } from "react";
import { navItems, services, siteConfig } from "@/content/site";

const transparentHeroHeaderPaths = new Set(["/", "/our-company", "/insights"]);

type MenuDetailItem = {
  links: string[];
  copy: string;
  cta: string;
  href: string;
};

const menuDetails: Record<string, MenuDetailItem> = {
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
  "Our Services": {
    links: services.map((service) => service.title),
    copy:
      "Planning, civil construction, RCC work, finishing, repair, renovation, and external site development handled with practical site discipline.",
    cta: "Explore Services",
    href: "/services",
  },
  "Our Projects": {
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
  "News & Insights": {
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

const featuredProjectPreview = {
  src: "/images/projects/jayant-patil-yspm-college/jayant-patil-yspm-college--pdf-preview-01-1-ground-floor-plan-for-layout.webp",
  alt: "Jayant Patil YSPM College project plan preview image",
};

export function SiteHeader() {
  const pathname = usePathname();
  const menuListRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [atTop, setAtTop] = useState(true);
  const [visible, setVisible] = useState(true);
  const usesTransparentHeroHeader =
    transparentHeroHeaderPaths.has(pathname) || pathname.startsWith("/projects/");
  const isHeroTransparent = usesTransparentHeroHeader && atTop && !open;

  const toggleMenu = () => {
    if (open) {
      setOpen(false);
      return;
    }

    setActive(null);
    setExpanded(null);
    setOpen(true);
  };

  const handleMenuWheel = (event: WheelEvent<HTMLUListElement>) => {
    if (window.innerWidth <= 1080 || !menuListRef.current) return;

    menuListRef.current.scrollTop += event.deltaY;
  };

  useEffect(() => {
    let previousY = window.scrollY;
    let syncFrame = 0;

    const onScroll = () => {
      const currentY = window.scrollY;
      const nearTop = currentY < 16;
      const isVisible = nearTop || currentY < previousY;

      setAtTop(nearTop);
      setVisible(isVisible);
      document.body.classList.toggle("site-header-visible", isVisible);
      document.body.classList.toggle("site-header-hidden", !isVisible);
      previousY = Math.max(currentY, 0);
    };

    syncFrame = window.requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(syncFrame);
      document.body.classList.remove("site-header-visible", "site-header-hidden");
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    document.body.classList.toggle("site-header-visible", open || visible);
    document.body.classList.toggle("site-header-hidden", !open && !visible);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, visible]);

  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="AFTcqTDLcDxidc8FHQu0jwyGh0IFqwjthVQMmuEQYDc"
        />
      </Head>
      <header
        className={`site-header ${isHeroTransparent ? "is-home-transparent" : "is-solid"} ${
          visible || open ? "is-visible" : "is-hidden"
        }`}
      >
        <Link className="brand" href="/" aria-label="JVS Enterprises home">
          <Image src="/JVS-Logo.png" alt="JVS Enterprises logo" width={58} height={48} priority />
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <div className="desktop-nav__links">
            {navItems.filter((item) => item.label !== "Contact").map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <button
            className="header-menu-icon"
            type="button"
            aria-haspopup="true"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={toggleMenu}
          >
            <span className="menu-button" aria-hidden="true">
              <span className="menu-button-line" />
              <span className="menu-button-line" />
              <span className="menu-button-line" />
            </span>
          </button>
        </nav>

        <div className="header-actions">
          <Link className="header-cta" href="/contact">
            Contact Us
          </Link>
        </div>
      </header>

      <div id="site-menu" className={`mega-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <aside className="mega-menu__brand" aria-label="JVS Enterprises">
          <Link className="mega-menu__logo" href="/" aria-label="JVS Enterprises home">
            <Image src="/JVS-Logo.png" alt="JVS Enterprises logo" width={58} height={48} priority />
          </Link>
          <div className="mega-menu__brand-window" aria-hidden="true">
            <div className="mega-menu__brand-track">
              {[0, 1, 2].map((index) => (
                <Image
                  key={index}
                  src="/JVS Enterprises Text-gray.png"
                  alt="Close menu icon"
                  width={286}
                  height={2000}
                  sizes="25vw"
                />
              ))}
            </div>
          </div>
          <div className="mega-menu__brand-contact">
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>{siteConfig.phone}</a>
          </div>
        </aside>

        <div className="mega-menu__main">
          <div className="mega-menu__top">
            <button
              type="button"
              className="menu-close"
              aria-label="Close navigation menu"
              onClick={() => setOpen(false)}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
            <Link href="/contact" onClick={() => setOpen(false)}>
              Contact Us
            </Link>
          </div>

          <div className="mega-menu__content">
            <ul ref={menuListRef} className="mega-menu__list" onWheel={handleMenuWheel}>
              {navItems.map((item) => {
                const menuKey = item.label;
                const itemDetails = menuDetails[menuKey];
                const isExpanded = expanded === menuKey;

                return (
                  <li key={item.href}>
                    {itemDetails ? (
                      <button
                        type="button"
                        onMouseEnter={() => setActive(menuKey)}
                        onFocus={() => setActive(menuKey)}
                        onClick={() => {
                          setActive(isExpanded ? null : menuKey);
                          setExpanded(isExpanded ? null : menuKey);
                        }}
                        className={isExpanded || active === menuKey ? "is-active" : ""}
                        aria-expanded={isExpanded}
                      >
                        {item.label}
                        <span aria-hidden="true">⌄</span>
                      </button>
                    ) : (
                      <Link href={item.href} onClick={() => setOpen(false)}>
                        {item.label}
                      </Link>
                    )}

                    {isExpanded && itemDetails ? (
                      <div className="mega-menu__details is-expanded">
                        {/* <p className="eyebrow">{expanded}</p> */}
                        <p>{itemDetails.copy}</p>
                        <div className="mega-menu__columns">
                          {itemDetails.links.map((link) => (
                            <span key={link}>{link}</span>
                          ))}
                        </div>
                        <Link
                          className="arrow-link"
                          href={itemDetails.href}
                          onClick={() => setOpen(false)}
                        >
                          {itemDetails.cta}
                          <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>

            <aside className="mega-menu__feature">
              <p className="eyebrow">Featured Project</p>
              <div className="menu-feature-visual">
                <Image
                  src={featuredProjectPreview.src}
                  alt={featuredProjectPreview.alt}
                  fill
                  sizes="(max-width: 1080px) 100vw, 25vw"
                />
              </div>
              <h3>YSPM Nursing College, Kodoli</h3>
              <p>
                Institutional construction planned for long-term daily use, safety, and
                structural dependability.
              </p>
              <Link href="/projects/jayant-patil-yspm-college" onClick={() => setOpen(false)}>
                View Project
              </Link>
            </aside>
          </div>

          <div className="mega-menu__footer">
            <Link
              className="mega-menu__footer-contact"
              href="/contact"
              onClick={() => setOpen(false)}
            >
              Contact Us
            </Link>
            <div className="mega-menu__social" aria-label="Social channels">
              <span>Facebook</span>
              <span>Instagram</span>
              <span>LinkedIn</span>
              <span>YouTube</span>
            </div>
            <Link
              className="mega-menu__footer-projects"
              href="/projects"
              onClick={() => setOpen(false)}
            >
              View All Projects
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

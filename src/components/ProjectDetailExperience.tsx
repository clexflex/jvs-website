"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import type {
  ProjectDetailContent,
  ProjectGalleryGroup,
  ProjectMediaSlide,
  ProjectMediaTone,
  ProjectStorySection,
} from "@/content/project-detail";

function ArrowIcon({ width, height }: { width: number; height: number }) {
  return (
    <svg
      className="project-arrow-icon"
      width={width}
      height={height}
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.603352 12.1308C0.0882147 12.6655 0.015191 13.3025 0.420793 13.7235C0.826395 14.1445 1.44022 14.0687 1.95536 13.534L7.38522 7.99841C7.64722 7.72648 7.79486 7.42806 7.82333 7.14505C7.8912 6.78755 7.74461 6.3777 7.39502 6.01468L1.95598 0.467539C1.43999 -0.0682715 0.825768 -0.144857 0.420412 0.276075C0.0150556 0.697007 0.0888073 1.33484 0.60479 1.87065L5.63516 7.00099L0.603352 12.1308Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ProjectVisual({
  slide,
  tall = false,
  compact = false,
  onZoom,
}: {
  slide: ProjectMediaSlide;
  tall?: boolean;
  compact?: boolean;
  onZoom?: () => void;
}) {
  return (
    <figure
      className={`project-visual project-visual--${slide.tone} ${tall ? "project-visual--tall" : ""} ${
        compact ? "project-visual--compact" : ""
      }`}
    >
      <Image
        className="project-visual__image"
        src={slide.imageSrc}
        alt={slide.imageAlt}
        fill
        sizes={compact ? "(max-width: 899px) 82vw, 30vw" : "(max-width: 899px) 92vw, 44vw"}
      />
      <div className="project-visual__tone" aria-hidden="true" />
      <div className="project-visual__copy">
        <p>{slide.eyebrow}</p>
        <strong>{slide.title}</strong>
        {!compact ? <figcaption>{slide.caption}</figcaption> : null}
      </div>
      {onZoom ? (
        <button
          className="project-visual__zoom"
          type="button"
          aria-label={`Open ${slide.title}`}
          onClick={onZoom}
        >
          <Image className="project-utility-icon" src="/assets/search-black.svg" alt="" width={18} height={18} />
        </button>
      ) : null}
    </figure>
  );
}

function ShareBand({ detail }: { detail: ProjectDetailContent }) {
  return (
    <section className="project-share-band line-grid">
      <div className="container">
        <div className="project-share-band__inner">
          <p className="eyebrow">Share This Project</p>
          <div className="project-share-band__links">
            {detail.shareLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
              >
                <Image className="project-share-band__icon" src={item.icon} alt="" width={22} height={22} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryStrip({
  group,
  onOpenSlide,
}: {
  group: ProjectGalleryGroup;
  onOpenSlide: (slides: ProjectMediaSlide[], index: number) => void;
}) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  return (
    <section className="project-gallery-strip line-grid">
      <div className="container">
        <div className="project-gallery-strip__head">
          <div>
            <p className="eyebrow">{group.eyebrow}</p>
            <h2>{group.title}</h2>
          </div>
          <div className="project-gallery-strip__controls" aria-label={`${group.title} controls`}>
            <button type="button" onClick={() => swiper?.slidePrev()} aria-label="Previous gallery slide">
              <ArrowIcon width={26} height={14} />
            </button>
            <button type="button" onClick={() => swiper?.slideNext()} aria-label="Next gallery slide">
              <ArrowIcon width={26} height={14} />
            </button>
          </div>
        </div>

        <Swiper
          className="project-gallery-strip__swiper"
          modules={[Navigation]}
          onSwiper={setSwiper}
          slidesPerView={1.12}
          spaceBetween={18}
          breakpoints={{
            720: { slidesPerView: 2.15, spaceBetween: 22 },
            1100: { slidesPerView: 3, spaceBetween: 26 },
          }}
        >
          {group.slides.map((slide, index) => (
            <SwiperSlide key={`${group.title}-${slide.title}`}>
              <ProjectVisual slide={slide} compact onZoom={() => onOpenSlide(group.slides, index)} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

function StoryPair({ section }: { section: ProjectStorySection }) {
  return (
    <section className="project-story-pair line-grid">
      <div className="container">
        <div
          className={`project-story-pair__layout ${section.reverse ? "project-story-pair__layout--reverse" : ""}`}
        >
          <div
            className={`project-story-pair__rail-pair ${
              section.reverse ? "project-story-pair__rail-pair--reverse" : ""
            }`}
          >
            <div className="project-story-pair__copy">
              <p className="eyebrow">{section.eyebrow}</p>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="project-story-pair__media">
              <ProjectVisual slide={section.media} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectLightbox({
  slides,
  index,
  onClose,
  onMove,
}: {
  slides: ProjectMediaSlide[];
  index: number;
  onClose: () => void;
  onMove: (direction: number) => void;
}) {
  const slide = slides[index];

  return (
    <div className="project-lightbox" role="dialog" aria-modal="true" aria-label={slide.title}>
      <button className="project-lightbox__backdrop" type="button" aria-label="Close image" onClick={onClose} />
      <div className="project-lightbox__dialog">
        <button className="project-lightbox__close" type="button" onClick={onClose}>
          Close
        </button>
        <div className="project-lightbox__stage">
          <button type="button" onClick={() => onMove(-1)} aria-label="Previous image">
            <ArrowIcon width={28} height={16} />
          </button>
          <ProjectVisual slide={slide} tall />
          <button type="button" onClick={() => onMove(1)} aria-label="Next image">
            <ArrowIcon width={28} height={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function PrevNextProjects({
  detail,
  getTone,
}: {
  detail: ProjectDetailContent;
  getTone: (index: number) => ProjectMediaTone;
}) {
  const items = [
    { eyebrow: "Previous Project", project: detail.previousProject, tone: getTone(2) },
    { eyebrow: "Next Project", project: detail.nextProject, tone: getTone(4) },
  ];

  return (
    <section className="project-pagination-band line-grid">
      <div className="container">
        <div className="project-pagination-band__grid">
          {items.map((item) => (
            <Link key={item.project.slug} className="project-pagination-card" href={`/projects/${item.project.slug}`}>
              <ProjectVisual
                slide={{
                  eyebrow: item.project.category,
                  title: item.project.title,
                  caption: item.project.location,
                  tone: item.tone,
                  imageSrc: item.project.coverImage,
                  imageAlt: item.project.coverAlt,
                }}
                compact
              />
              <div className="project-pagination-card__body">
                <p className="eyebrow">{item.eyebrow}</p>
                <strong>{item.project.title}</strong>
                <span>{item.project.location}</span>
                <span className="project-pagination-card__cta">
                  View Project
                  <ArrowIcon width={26} height={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectDetailExperience({ detail }: { detail: ProjectDetailContent }) {
  const [cardOpen, setCardOpen] = useState(false);
  const [specsOpen, setSpecsOpen] = useState(false);
  const [heroSwiper, setHeroSwiper] = useState<SwiperType | null>(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [lightbox, setLightbox] = useState<{ slides: ProjectMediaSlide[]; index: number } | null>(null);
  const drawerCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!cardOpen && !specsOpen && !lightbox) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightbox(null);
        setSpecsOpen(false);
        setCardOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cardOpen, specsOpen, lightbox]);

  useEffect(() => {
    document.body.classList.toggle("modal-open", specsOpen || Boolean(lightbox));
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [specsOpen, lightbox]);

  useEffect(() => {
    if (!specsOpen) return;
    drawerCloseRef.current?.focus();
  }, [specsOpen]);

  const currentHeroSlide = detail.heroSlides[heroIndex] || detail.heroSlides[0];
  const openInfo = () => {
    setCardOpen(true);
  };

  const closePanels = () => {
    setCardOpen(false);
    setSpecsOpen(false);
  };

  const openSpecs = () => {
    setCardOpen(true);
    setSpecsOpen(true);
  };

  const openSlide = (slides: ProjectMediaSlide[], index: number) => {
    setLightbox({ slides, index });
  };

  const moveLightbox = (direction: number) => {
    setLightbox((current) => {
      if (!current) return current;
      const nextIndex = (current.index + direction + current.slides.length) % current.slides.length;
      return { ...current, index: nextIndex };
    });
  };

  const specsOverlay =
    specsOpen && typeof document !== "undefined"
      ? createPortal(
          <div className="project-specs-overlay" role="dialog" aria-modal="true" aria-label="Project overview">
            <button
              className="project-specs-overlay__backdrop"
              type="button"
              aria-label="Close project overview"
              onClick={() => setSpecsOpen(false)}
            />
            <div className="project-specs-overlay__layout">
              <aside className="project-specs-drawer project-specs-drawer--overlay is-open">
                <div className="project-specs-drawer__header">
                  <strong>Project Overview</strong>
                  <button
                    ref={drawerCloseRef}
                    type="button"
                    aria-label="Close project specs"
                    onClick={() => setSpecsOpen(false)}
                  >
                    <span />
                    <span />
                  </button>
                </div>
                <div className="project-specs-drawer__grid">
                  {detail.specs.map((item) => (
                    <div key={`overlay-${item.label}`}>
                      <p>{item.label}</p>
                      <strong>{item.value}</strong>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <section className="project-detail-hero line-grid line-grid--dark">
        <Swiper
          className="project-detail-hero__swiper"
          modules={[Navigation]}
          onSwiper={setHeroSwiper}
          onSlideChange={(swiper) => setHeroIndex(swiper.realIndex)}
          slidesPerView={1}
          loop
        >
          {detail.heroSlides.map((slide) => (
            <SwiperSlide key={slide.title}>
              <div className={`project-detail-hero__slide project-detail-hero__slide--${slide.tone}`}>
                <Image
                  className="project-detail-hero__slide-image"
                  src={slide.imageSrc}
                  alt={slide.imageAlt}
                  fill
                  priority
                  sizes="100vw"
                />
                <div className="project-detail-hero__slide-tone" aria-hidden="true" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="project-detail-hero__overlay" aria-hidden="true" />

        <div
          className={`project-detail-hero__info-layer ${cardOpen ? "is-open" : ""}`}
        >
          <div className="project-detail-hero__dock">
            <button
              className={`project-detail-hero__widget ${cardOpen ? "is-hidden" : ""}`}
              type="button"
              aria-label="Open project information"
              onClick={openInfo}
            >
              <Image className="project-utility-icon" src="/assets/widget-open.svg" alt="" width={26} height={26} />
            </button>

            {cardOpen ? (
              <>
                <button className="project-detail-hero__close" type="button" onClick={closePanels}>
                  Close
                </button>

                <div className="project-detail-hero__card">
                  <div className="project-detail-hero__card-copy">
                    <p className="eyebrow">{detail.heroLocationLine}</p>
                    <h1>{detail.project.title}</h1>
                  </div>
                  <button className="project-detail-hero__card-action" type="button" onClick={openSpecs}>
                    <span>Project Specs</span>
                    <ArrowIcon width={28} height={16} />
                  </button>
                  <a
                    className="project-detail-hero__card-story"
                    href="#project-story"
                    onClick={() => setCardOpen(false)}
                  >
                    Discover the story
                  </a>
                </div>
              </>
            ) : null}
          </div>
        </div>

        <div className="project-detail-hero__controls">
          <span>
            {String(heroIndex + 1).padStart(2, "0")} / {String(detail.heroSlides.length).padStart(2, "0")}
          </span>
          <div>
            <button type="button" onClick={() => heroSwiper?.slidePrev()} aria-label="Previous hero slide">
              <ArrowIcon width={30} height={16} />
            </button>
            <button type="button" onClick={() => heroSwiper?.slideNext()} aria-label="Next hero slide">
              <ArrowIcon width={30} height={16} />
            </button>
          </div>
        </div>
      </section>

      <section id="project-story" className="project-intro-band line-grid">
        <div className="container">
          <div className="project-intro-band__layout">
            <div className="project-intro-band__rail-pair">
              <div className="project-intro-band__copy">
                <h2>{detail.heroLead}</h2>
                <p>{detail.heroBody}</p>
              </div>
              <div className="project-intro-band__meta">
                <p className="eyebrow">{currentHeroSlide.eyebrow}</p>
                <strong>{currentHeroSlide.title}</strong>
                <span>{currentHeroSlide.caption}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ShareBand detail={detail} />

      <GalleryStrip group={detail.galleryGroups[0]} onOpenSlide={openSlide} />

      {detail.storySections.map((section) => (
        <StoryPair key={section.title} section={section} />
      ))}

      <section className="project-principle-band line-grid">
        <div className="container">
          <blockquote className="project-principle-band__quote">
            <p>{detail.principle.quote}</p>
            <footer>
              <strong>{detail.principle.name}</strong>
              <span>{detail.principle.role}</span>
            </footer>
          </blockquote>
        </div>
      </section>

      <GalleryStrip group={detail.galleryGroups[1]} onOpenSlide={openSlide} />

      <PrevNextProjects detail={detail} getTone={(index) => detail.heroSlides[index % detail.heroSlides.length].tone} />

      <ShareBand detail={detail} />

      {lightbox ? (
        <ProjectLightbox
          slides={lightbox.slides}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onMove={moveLightbox}
        />
      ) : null}
      {specsOverlay}
    </>
  );
}

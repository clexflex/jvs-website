"use client";

import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { type CSSProperties } from "react";
import type { projects } from "@/content/site";

type Project = (typeof projects)[number];

export function ServiceParallaxMedia({
  eyebrow,
  title,
  detail,
  align = "right",
  priority = false,
}: {
  eyebrow: string;
  title: string;
  detail: string;
  align?: "left" | "right";
  priority?: boolean;
}) {
  return (
    <div
      className={`service-parallax-media ${align === "left" ? "service-parallax-media--left" : ""}`}
    >
      <div className="service-parallax-media__visual">
        <Image
          src="/assets/insight-placeholder.svg"
          alt={title}
          fill
          sizes="(max-width: 760px) 100vw, 50vw"
          priority={priority}
        />
      </div>
      <div className="service-parallax-media__overlay" aria-hidden="true" />
      <div className="service-parallax-media__copy">
        <p>{eyebrow}</p>
        <strong>{title}</strong>
        <span>{detail}</span>
      </div>
    </div>
  );
}

export function ProjectsHeroCarousel({ items }: { items: Project[] }) {
  return (
    <div className="projects-hero-carousel">
      <div className="projects-hero-carousel__footer">
        <div className="projects-hero-carousel__meta">
          <span>Featured Projects</span>
          <strong>{String(items.length).padStart(2, "0")}</strong>
        </div>
        <div
          className="projects-hero-carousel__pagination"
          aria-label="Project hero pagination"
        />
        <div className="projects-hero-carousel__controls" aria-label="Project hero carousel controls">
          <button className="projects-hero-carousel__button projects-hero-carousel__button--prev" type="button">
            <span aria-hidden="true">←</span>
            <span>Previous</span>
          </button>
          <button className="projects-hero-carousel__button projects-hero-carousel__button--next" type="button">
            <span>Next</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          prevEl: ".projects-hero-carousel__button--prev",
          nextEl: ".projects-hero-carousel__button--next",
        }}
        pagination={{
          el: ".projects-hero-carousel__pagination",
          clickable: true,
          bulletClass: "projects-hero-carousel__bullet",
          bulletActiveClass: "is-active",
        }}
        loop
        className="projects-hero-carousel__swiper"
      >
        {items.map((project) => (
          <SwiperSlide key={project.slug}>
            <article className="projects-hero-slide">
              <Image
                src="/assets/insight-placeholder.svg"
                alt={project.title}
                fill
                className="projects-hero-slide__image"
                sizes="100vw"
                priority
              />
              <div className="projects-hero-slide__overlay" aria-hidden="true" />
              <div className="projects-hero-slide__rails">
                <div className="projects-hero-slide__panel projects-hero-slide__panel--left">
                  <p className="eyebrow">Our Projects</p>
                  <span>{project.category}</span>
                </div>
                <div className="projects-hero-slide__panel projects-hero-slide__panel--main">
                  <h1>Built for real site conditions.</h1>
                </div>
                <div className="projects-hero-slide__panel projects-hero-slide__panel--right">
                  <span className="projects-hero-slide__location">{project.location}</span>
                  <strong>{project.title}</strong>
                  <p>{project.description}</p>
                  <Link href={`/projects/${project.slug}`}>View Project</Link>
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export function PlaceholderFigure({
  title,
  eyebrow,
  caption,
  className = "",
  imageClassName = "",
  style,
}: {
  title: string;
  eyebrow: string;
  caption?: string;
  className?: string;
  imageClassName?: string;
  style?: CSSProperties;
}) {
  return (
    <figure className={`placeholder-figure ${className}`} style={style}>
      <div className={`placeholder-figure__media ${imageClassName}`}>
        <Image
          src="/assets/insight-placeholder.svg"
          alt={title}
          fill
          sizes="(max-width: 760px) 100vw, 60vw"
        />
        <div className="placeholder-figure__overlay" aria-hidden="true" />
      </div>
      <figcaption>
        <p>{eyebrow}</p>
        <strong>{title}</strong>
        {caption ? <span>{caption}</span> : null}
      </figcaption>
    </figure>
  );
}

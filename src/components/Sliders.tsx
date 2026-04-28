"use client";

import Link from "next/link";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProjectCard } from "@/components/Cards";
import { VisualPlaceholder } from "@/components/Primitives";
import type { projects } from "@/content/site";

type Project = (typeof projects)[number];

export function ProjectSlider({ items }: { items: Project[] }) {
  return (
    <div className="slider-shell">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={18}
        slidesPerView={1.05}
        breakpoints={{
          720: { slidesPerView: 2.1 },
          1100: { slidesPerView: 3 },
        }}
      >
        {items.map((project) => (
          <SwiperSlide key={project.slug}>
            <ProjectCard
              title={project.title}
              category={project.category}
              location={project.location}
              description={project.description}
              href={`/projects/${project.slug}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export function ProjectGallery({ title }: { title: string }) {
  const slides = [
    "Exterior view",
    "Construction stage",
    "RCC / structural work",
    "Finishing view",
    "Site development / external works",
    "Final completed view",
  ];

  return (
    <div className="gallery-slider">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={18}
        slidesPerView={1}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide}>
            <figure>
              <VisualPlaceholder label={slide} tall />
              <figcaption>
                {title} · {slide}
              </figcaption>
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export function InlineProjectRail({ items }: { items: Project[] }) {
  return (
    <div className="project-rail">
      {items.map((project) => (
        <Link key={project.slug} href={`/projects/${project.slug}`}>
          <span>{project.category}</span>
          <strong>{project.title}</strong>
        </Link>
      ))}
    </div>
  );
}

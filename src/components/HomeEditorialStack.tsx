"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLink } from "@/components/Primitives";
import { FreeMode, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export type HomeEditorialStackItem = {
  title: string;
  href: string;
  linkLabel: string;
  imageSrc?: string;
  imageAlt?: string;
};

export function truncateEditorialTitle(title: string, maxLength = 50) {
  if (title.length <= maxLength) {
    return title;
  }

  return `${title.slice(0, Math.max(0, maxLength - 3)).trimEnd()}...`;
}

function CompactCard({
  item,
  mobile = false,
}: {
  item: HomeEditorialStackItem;
  mobile?: boolean;
}) {
  return (
    <article
      className={`home-editorial-card home-editorial-card--compact ${
        mobile ? "home-editorial-card--compact-mobile" : ""
      }`}
    >
      <Link className="home-editorial-card__media-link" href={item.href}>
        <div className="home-rail-media">
          <div className="home-rail-media__visual">
            <Image
              src={item.imageSrc ?? "/images/project-image-placeholder.jpg"}
              alt={item.imageAlt || item.title}
              fill
              sizes={
                mobile
                  ? "(max-width: 560px) calc(100vw - 56px), 400px"
                  : "(max-width: 1023px) 0px, 270px"
              }
            />
          </div>
        </div>
      </Link>
      <div className="home-editorial-card__body">
        <h3>
          <Link href={item.href}>{truncateEditorialTitle(item.title)}</Link>
        </h3>
        <ArrowLink href={item.href}>{item.linkLabel}</ArrowLink>
      </div>
    </article>
  );
}

export function HomeEditorialStack({ items }: { items: HomeEditorialStackItem[] }) {
  const leftColumn = items.slice(0, Math.ceil(items.length / 2));
  const rightColumn = items.slice(Math.ceil(items.length / 2));

  return (
    <>
      <div className="home-editorial-stack home-editorial-stack--desktop" data-rail-row="1">
        <div className="home-editorial-stack__column">
          {leftColumn.map((item) => (
            <CompactCard key={item.href} item={item} />
          ))}
        </div>
        <div className="home-editorial-stack__column">
          {rightColumn.map((item) => (
            <CompactCard key={item.href} item={item} />
          ))}
        </div>
      </div>

      <Swiper
        className="home-editorial-slider"
        modules={[FreeMode, Mousewheel]}
        slidesPerView="auto"
        spaceBetween={18}
        freeMode
        grabCursor
        mousewheel={{ forceToAxis: true, releaseOnEdges: true }}
        breakpoints={{
          640: {
            spaceBetween: 24,
          },
        }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.href} className="home-editorial-slider__slide">
            <CompactCard item={item} mobile />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

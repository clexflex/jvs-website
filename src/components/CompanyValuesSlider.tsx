"use client";

import { useState } from "react";
import Image from "next/image";
import { Eyebrow } from "@/components/Primitives";

export type CompanyValue = {
  title: string;
  body: string;
};

export function CompanyValuesSlider({
  values,
  ctaHref,
}: {
  values: CompanyValue[];
  ctaHref: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeValue = values[activeIndex] ?? values[0];

  return (
    <div className="company-culture__layout">
      <div className="company-culture__nav" aria-label="Our working values">
        {values.map((value, index) => (
          <button
            key={value.title}
            className={index === activeIndex ? "is-active" : ""}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-pressed={index === activeIndex}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{value.title}</strong>
          </button>
        ))}
      </div>
      <div className="company-culture__copy">
        <Eyebrow>Our Working Values</Eyebrow>
        <h2>{activeValue.title}</h2>
        <p>{activeValue.body}</p>
        <a href={ctaHref}>Talk to JVS</a>
      </div>
      <figure className="company-rail-media company-culture__media">
        <Image
          src="/assets/insight-placeholder.svg"
          alt="JVS construction values and supervision"
          fill
          sizes="(max-width: 760px) 100vw, 50vw"
        />
      </figure>
    </div>
  );
}

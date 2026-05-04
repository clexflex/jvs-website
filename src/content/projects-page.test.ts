import { describe, expect, it } from "vitest";
import {
  PROJECTS_PER_PAGE,
  getProjectHeroSlides,
  getProjectsPageData,
} from "./projects-page";

describe("projects page helpers", () => {
  it("builds a stable set of hero slides from the project catalogue", () => {
    const slides = getProjectHeroSlides();

    expect(slides).toHaveLength(4);
    expect(new Set(slides.map((slide) => slide.slug)).size).toBe(4);
    expect(slides[0]?.slug).toBe("yspm-nursing-college-kodoli");
    expect(slides.some((slide) => slide.category === "Residential Construction")).toBe(true);
  });

  it("paginates projects and clamps invalid page requests", () => {
    const firstPage = getProjectsPageData("1");
    const lastPage = getProjectsPageData("99");
    const invalidPage = getProjectsPageData("not-a-number");

    expect(PROJECTS_PER_PAGE).toBe(8);
    expect(firstPage.totalPages).toBe(2);
    expect(firstPage.currentPage).toBe(1);
    expect(firstPage.items).toHaveLength(8);
    expect(lastPage.currentPage).toBe(2);
    expect(lastPage.items).toHaveLength(1);
    expect(invalidPage.currentPage).toBe(1);
  });
});

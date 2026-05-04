import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ProjectDetailExperience } from "./ProjectDetailExperience";
import { getProjectDetailContent } from "@/content/project-detail";

describe("ProjectDetailExperience", () => {
  it("renders the project intro and story rows with dedicated rail-pair wrappers", () => {
    const detail = getProjectDetailContent("yspm-nursing-college-kodoli");

    expect(detail).toBeTruthy();

    const html = renderToStaticMarkup(<ProjectDetailExperience detail={detail!} />);

    expect(html).toContain('class="project-intro-band__rail-pair"');
    expect(html).toContain('class="project-intro-band__copy"');
    expect(html).toContain('class="project-intro-band__meta"');
    expect(html.match(/class="project-story-pair__rail-pair/g)?.length).toBe(
      detail?.storySections.length,
    );
  });

  it("renders the hero with a dedicated dock so the info card can expand from the widget anchor", () => {
    const detail = getProjectDetailContent("yspm-nursing-college-kodoli");

    expect(detail).toBeTruthy();

    const html = renderToStaticMarkup(<ProjectDetailExperience detail={detail!} />);

    expect(html).toContain('class="project-detail-hero__dock"');
  });
});

import { projects } from "./site";

export const PROJECTS_PER_PAGE = 6;

export function getProjectHeroSlides() {
  return [
    projects[0],
    projects[1],
    projects[6],
    projects[8],
  ].filter((project): project is (typeof projects)[number] => Boolean(project));
}

export function getProjectsPageData(pageParam?: string) {
  const totalPages = Math.max(1, Math.ceil(projects.length / PROJECTS_PER_PAGE));
  const requestedPage = Number.parseInt(pageParam ?? "1", 10);
  const currentPage = Number.isNaN(requestedPage)
    ? 1
    : Math.min(Math.max(requestedPage, 1), totalPages);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;

  return {
    currentPage,
    items: projects.slice(startIndex, startIndex + PROJECTS_PER_PAGE),
    totalPages,
  };
}

import { projects } from "./site";

type Project = (typeof projects)[number];

export type ProjectMediaTone = "copper" | "cobalt" | "forest" | "slate" | "terracotta";

export type ProjectMediaSlide = {
  eyebrow: string;
  title: string;
  caption: string;
  tone: ProjectMediaTone;
};

export type ProjectStorySection = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  media: ProjectMediaSlide;
  reverse?: boolean;
};

export type ProjectGalleryGroup = {
  eyebrow: string;
  title: string;
  slides: ProjectMediaSlide[];
};

export type ProjectSpec = {
  label: string;
  value: string;
};

export type ProjectShareLink = {
  href: string;
  icon: string;
  label: string;
};

export type ProjectDetailContent = {
  project: Project;
  heroLocationLine: string;
  heroLead: string;
  heroBody: string;
  heroSlides: ProjectMediaSlide[];
  specs: ProjectSpec[];
  storySections: ProjectStorySection[];
  galleryGroups: ProjectGalleryGroup[];
  principle: {
    quote: string;
    name: string;
    role: string;
  };
  previousProject: Project;
  nextProject: Project;
  shareLinks: ProjectShareLink[];
  shareUrl: string;
};

const SITE_URL = "https://jvsenterprises.co.in";

const categoryLeadMap: Array<[RegExp, string]> = [
  [/institutional/i, "Built for organised movement, durable structure, and long-term daily use."],
  [/sports/i, "Built for repeated movement, weather resilience, and dependable external performance."],
  [/compound wall/i, "Built for boundary clarity, drainage control, and site protection."],
  [/rcc|structural/i, "Built around structural precision, alignment, and disciplined execution."],
  [/water tank/i, "Built for dependable storage, waterproofing discipline, and maintenance access."],
  [/farmhouse/i, "Built around terrain, access, drainage, and long-term outdoor durability."],
  [/residential/i, "Built for daily living, practical coordination, and long-term reliability."],
];

const categoryToneMap: Array<[RegExp, ProjectMediaTone[]]> = [
  [/institutional/i, ["copper", "cobalt", "slate", "forest", "terracotta", "cobalt"]],
  [/sports/i, ["forest", "cobalt", "slate", "terracotta", "forest", "cobalt"]],
  [/compound wall/i, ["terracotta", "slate", "cobalt", "forest", "terracotta", "slate"]],
  [/rcc|structural/i, ["slate", "cobalt", "forest", "terracotta", "slate", "cobalt"]],
  [/water tank/i, ["cobalt", "slate", "forest", "terracotta", "cobalt", "slate"]],
  [/farmhouse/i, ["forest", "terracotta", "slate", "cobalt", "forest", "terracotta"]],
  [/residential/i, ["terracotta", "copper", "slate", "forest", "cobalt", "terracotta"]],
];

const slideLabels = [
  {
    eyebrow: "Arrival View",
    title: "Site presence and first impression",
    caption: "How the project reads on arrival, from structure to public-facing edges.",
  },
  {
    eyebrow: "Structure",
    title: "Frame, alignment, and working discipline",
    caption: "A closer read of the structural logic, supervision, and execution order on site.",
  },
  {
    eyebrow: "Use & Movement",
    title: "Spaces shaped around people and flow",
    caption: "The way the completed work supports circulation, access, and daily operation.",
  },
  {
    eyebrow: "Material Focus",
    title: "Details that carry long-term durability",
    caption: "Surfaces, edges, drainage handling, and coordination that matter beyond handover.",
  },
  {
    eyebrow: "Site Progress",
    title: "Execution moments across stages of work",
    caption: "A view into how planning, sequencing, and supervision shaped the final outcome.",
  },
  {
    eyebrow: "Completed View",
    title: "Delivered with practical site discipline",
    caption: "The completed result, tied back to usability, maintenance, and long-term performance.",
  },
];

function getLead(project: Project) {
  const matched = categoryLeadMap.find(([pattern]) => pattern.test(project.category));
  return matched?.[1] || "Built with practical planning, dependable execution, and long-term site awareness.";
}

function getTones(project: Project) {
  const matched = categoryToneMap.find(([pattern]) => pattern.test(project.category));
  return matched?.[1] || ["copper", "cobalt", "slate", "forest", "terracotta", "cobalt"];
}

function getHeroLocationLine(location: string) {
  return `${location.toUpperCase()}, MAHARASHTRA | INDIA`;
}

function getSlides(project: Project): ProjectMediaSlide[] {
  const tones = getTones(project);
  return slideLabels.map((slide, index) => ({
    eyebrow: slide.eyebrow,
    title: `${project.title} · ${slide.title}`,
    caption: slide.caption,
    tone: tones[index] || tones[0],
  }));
}

function getSpecs(project: Project): ProjectSpec[] {
  const focus = project.priorities?.[0] || "Disciplined site supervision";
  const execution = project.scope[2] || project.scope[1] || "Construction execution";
  const region = /kolhapur|kodoli|kadamwadi|talsande/i.test(project.location)
    ? "Kolhapur District"
    : "Panhala Region";

  return [
    { label: "Location", value: project.location },
    { label: "Status", value: project.status },
    { label: "Category", value: project.category },
    { label: "Lead Scope", value: project.scope[0] },
    { label: "Site Focus", value: focus },
    { label: "Execution", value: execution },
    { label: "Region", value: region },
    { label: "Delivery", value: "JVS Enterprises" },
  ];
}

function getStorySections(project: Project, slides: ProjectMediaSlide[]): ProjectStorySection[] {
  const secondPriority = project.priorities?.[1] || "Reliable progress across all required stages";
  const thirdPriority = project.priorities?.[2] || "Durability beyond handover";

  return [
    {
      eyebrow: "Project Story",
      title: "Reading the site before pushing the work forward.",
      paragraphs: [
        project.overview ||
          `${project.title} called for a construction approach that balanced practical site realities, structural reliability, and long-term use. The work had to respond to movement, service needs, and the way the completed project would perform every day.`,
        `From the outset, the work was shaped around ${secondPriority.toLowerCase()} and ${thirdPriority.toLowerCase()}. That meant staying disciplined in sequencing, supervision, and the decisions that affect how the project ages on site.`,
      ],
      media: slides[1],
    },
    {
      eyebrow: "Execution Focus",
      title: "Carrying the project from planning intent into built performance.",
      paragraphs: [
        `${project.title} involved ${project.scope.join(", ").toLowerCase()}, so progress depended on coordinated execution rather than isolated tasks. Each stage needed to hold alignment, quality, and usability together.`,
        `For JVS Enterprises, the emphasis stayed on ${project.description.toLowerCase()} The result is a project shaped not only by completion, but by how responsibly it now works in use.`,
      ],
      media: slides[4],
      reverse: true,
    },
  ];
}

function getGalleryGroups(slides: ProjectMediaSlide[]): ProjectGalleryGroup[] {
  return [
    {
      eyebrow: "Gallery",
      title: "Moments from the project story",
      slides: slides.slice(0, 3),
    },
    {
      eyebrow: "Gallery",
      title: "Execution, material, and completed presence",
      slides: slides.slice(3),
    },
  ];
}

function getPrinciple(project: Project) {
  return {
    quote: `"Every ${project.category.toLowerCase()} project has to be read on its own terms first. Good execution only follows when the site, the sequence, and the long-term use are understood properly."`,
    name: "JVS Enterprises",
    role: "Project delivery approach",
  };
}

function getShareLinks(project: Project) {
  const shareUrl = `${SITE_URL}/projects/${project.slug}`;
  const title = `${project.title} | JVS Enterprises`;

  return {
    shareUrl,
    links: [
      {
        href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        icon: "/assets/fb-share.svg",
        label: "Share on Facebook",
      },
      {
        href: `https://x.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
        icon: "/assets/twitter-share.svg",
        label: "Share on X",
      },
      {
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        icon: "/assets/linkedin-share.svg",
        label: "Share on LinkedIn",
      },
      {
        href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareUrl)}`,
        icon: "/assets/mail-share.svg",
        label: "Share by email",
      },
    ],
  };
}

export function getProjectDetailContent(slug: string): ProjectDetailContent | null {
  const index = projects.findIndex((project) => project.slug === slug);

  if (index === -1) {
    return null;
  }

  const project = projects[index];
  const previousProject = projects[(index - 1 + projects.length) % projects.length];
  const nextProject = projects[(index + 1) % projects.length];
  const heroSlides = getSlides(project);
  const share = getShareLinks(project);

  return {
    project,
    heroLocationLine: getHeroLocationLine(project.location),
    heroLead: getLead(project),
    heroBody:
      project.overview ||
      `${project.description} The page reads the project through site conditions, execution priorities, and the way the finished work is expected to perform over time.`,
    heroSlides,
    specs: getSpecs(project),
    storySections: getStorySections(project, heroSlides),
    galleryGroups: getGalleryGroups(heroSlides),
    principle: getPrinciple(project),
    previousProject,
    nextProject,
    shareLinks: share.links,
    shareUrl: share.shareUrl,
  };
}

import { projects } from "./projects";

type Project = (typeof projects)[number];

export type ProjectMediaTone = "copper" | "cobalt" | "forest" | "slate" | "terracotta";

export type ProjectMediaSlide = {
  eyebrow: string;
  title: string;
  caption: string;
  tone: ProjectMediaTone;
  imageSrc: string;
  imageAlt: string;
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

const SITE_URL = "https://www.jvsenterprises.co.in";

const categoryLeadMap: Array<[RegExp, string]> = [
  [/institutional/i, "Built for organised movement, durable structure, and long-term daily use."],
  [/site development/i, "Built for external usability, drainage handling, and practical long-term site performance."],
  [/farmhouse/i, "Built around terrain, access, drainage, and long-term outdoor durability."],
  [/residential/i, "Built for daily living, practical coordination, and long-term reliability."],
];

const categoryToneMap: Array<[RegExp, ProjectMediaTone[]]> = [
  [/institutional/i, ["copper", "cobalt", "slate", "forest", "terracotta", "cobalt"]],
  [/site development/i, ["forest", "slate", "cobalt", "terracotta", "forest", "slate"]],
  [/farmhouse/i, ["forest", "terracotta", "slate", "cobalt", "forest", "terracotta"]],
  [/residential/i, ["terracotta", "copper", "slate", "forest", "cobalt", "terracotta"]],
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

function getMediaEyebrow(kind: Project["media"][number]["kind"]) {
  if (kind === "drawing") return "Drawing View";
  if (kind === "pdf-preview") return "Plan Preview";
  return "Site View";
}

function getSlides(project: Project): ProjectMediaSlide[] {
  const tones = getTones(project);
  return project.media.map((item, index) => ({
    eyebrow: getMediaEyebrow(item.kind),
    title: `${project.title} · ${item.label}`,
    caption: `${project.category} image record` ,
    tone: tones[index % tones.length],
    imageSrc: item.src,
    imageAlt: item.alt,
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

  const firstMedia = slides[1] || slides[0];
  const secondMedia = slides[Math.min(4, slides.length - 1)] || slides[0];

  return [
    {
      eyebrow: "Project Story",
      title: "Reading the site before pushing the work forward.",
      paragraphs: [
        project.overview ||
          `${project.title} required a construction approach that balanced practical site realities, structural reliability, and long-term use.`,
        `From the outset, the work was shaped around ${secondPriority.toLowerCase()} and ${thirdPriority.toLowerCase()}.`,
      ],
      media: firstMedia,
    },
    {
      eyebrow: "Execution Focus",
      title: "Carrying planning intent into built performance.",
      paragraphs: [
        `${project.title} involved ${project.scope.join(", ").toLowerCase()}, so progress depended on coordinated execution rather than isolated tasks.`,
        `The emphasis remained on practical sequencing, dependable quality checks, and day-to-day site discipline across construction stages.`,
      ],
      media: secondMedia,
      reverse: true,
    },
  ];
}

function getGalleryGroups(slides: ProjectMediaSlide[]): ProjectGalleryGroup[] {
  const midpoint = Math.ceil(slides.length / 2);
  const first = slides.slice(0, midpoint);
  const second = slides.slice(midpoint);

  return [
    {
      eyebrow: "Gallery",
      title: "Site and completion records",
      slides: first.length ? first : slides,
    },
    {
      eyebrow: "Gallery",
      title: "Execution details and drawings",
      slides: second.length ? second : first.length ? first : slides,
    },
  ];
}

function getPrinciple(project: Project) {
  return {
    quote: `"Every ${project.category.toLowerCase()} project has to be read on its own terms first. Good execution follows from the right sequence and practical supervision."`,
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
  const allSlides = getSlides(project);
  const heroSlides = allSlides.slice(0, Math.min(10, allSlides.length));
  const share = getShareLinks(project);

  return {
    project,
    heroLocationLine: getHeroLocationLine(project.location),
    heroLead: getLead(project),
    heroBody:
      project.overview ||
      `${project.description} The page reads the project through site records, execution priorities, and built output coverage.`,
    heroSlides,
    specs: getSpecs(project),
    storySections: getStorySections(project, allSlides),
    galleryGroups: getGalleryGroups(allSlides),
    principle: getPrinciple(project),
    previousProject,
    nextProject,
    shareLinks: share.links,
    shareUrl: share.shareUrl,
  };
}

export function getProjectPageMetadata(slug: string) {
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | JVS Enterprises Project in ${project.location}`,
    description:
      project.description ||
      `Explore ${project.title}, a ${project.category} project by JVS Enterprises in ${project.location}.`,
    alternates: {
      canonical: `${SITE_URL}/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | JVS Enterprises`,
      description: project.description,
      url: `${SITE_URL}/projects/${project.slug}`,
      images: [
        {
          url: `${SITE_URL}${project.coverImage}`,
          width: 1200,
          height: 800,
          alt: project.coverAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${project.title} | JVS Enterprises`,
      description: project.description,
      images: [`${SITE_URL}${project.coverImage}`],
    },
  };
}

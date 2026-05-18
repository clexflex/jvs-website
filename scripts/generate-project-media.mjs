#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";

const cwd = process.cwd();
const sourceRoot = path.join(cwd, "public/images/JVS Project Photos");
const outputRoot = path.join(cwd, "public/images/projects");
const outputDataFile = path.join(cwd, "src/content/projects.generated.ts");

const SOURCE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

const slugOverrides = new Map([
  ["Pnahala Farmhouse Premium", "panhala-farmhouse-premium"],
]);

const titleOverrides = new Map([
  ["Pnahala Farmhouse Premium", "Panhala Farmhouse Premium"],
  ["DR. Sanjay D Patil - luxurious farmhouse Panhala", "Dr. Sanjay D Patil Luxurious Farmhouse"],
  ["Jayant Patil - YSPM College", "Jayant Patil YSPM College"],
  ["Sunil Kulkarni-Residential-Five Row Houses", "Sunil Kulkarni Residential Five Row Houses"],
  ["Vinayak Goliwadkar - Residential House", "Vinayak Goliwadkar Residential House"],
]);

function titleCase(input) {
  return input
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function humanizeFileStem(fileName) {
  const stem = fileName.replace(/\.[^.]+$/, "");
  return titleCase(
    stem
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function inferCategory(folderName) {
  const text = folderName.toLowerCase();
  if (text.includes("college")) return "Institutional Construction";
  if (text.includes("farmhouse")) return "Farmhouse Construction";
  if (text.includes("site work")) return "Site Development";
  if (text.includes("guest house")) return "Residential Construction";
  if (text.includes("row houses")) return "Residential Construction";
  if (text.includes("residential")) return "Residential Construction";
  return "Residential Construction";
}

function inferLocation(folderName) {
  const text = folderName.toLowerCase();
  if (text.includes("kodoli") || text.includes("yspm")) return "Kodoli";
  if (text.includes("panhala") || text.includes("pnahala")) return "Panhala";
  if (text.includes("kolhapur")) return "Kolhapur";
  if (text.includes("site work")) return "Kolhapur Region";
  return "Kolhapur Region";
}

function inferDescription(title, category, location) {
  if (category === "Institutional Construction") {
    return `Institutional construction work by JVS Enterprises in ${location}, focused on durable structure and practical daily use.`;
  }
  if (category === "Farmhouse Construction") {
    return `Farmhouse construction work by JVS Enterprises in ${location}, covering structural execution, external development, and long-term performance.`;
  }
  if (category === "Site Development") {
    return `Site development work by JVS Enterprises in ${location}, including ground-level execution, drainage considerations, and external usability.`;
  }
  return `${title} is a residential construction project by JVS Enterprises in ${location}, executed with practical site supervision and durable construction quality.`;
}

function inferScope(category) {
  if (category === "Institutional Construction") {
    return ["Institutional Building", "Civil Construction", "RCC Work", "Site Supervision"];
  }
  if (category === "Farmhouse Construction") {
    return ["Farmhouse Construction", "RCC & Structural Work", "Finishing", "External Development"];
  }
  if (category === "Site Development") {
    return ["Site Development", "Ground Work", "Drainage Coordination", "Execution Supervision"];
  }
  return ["Residential Construction", "RCC & Structural Work", "Finishing", "Site Coordination"];
}

function inferPriorities(category) {
  if (category === "Institutional Construction") {
    return [
      "Reliable RCC and structural execution",
      "Daily-use movement planning",
      "Quality supervision across stages",
      "Durable handover standards",
    ];
  }
  if (category === "Farmhouse Construction") {
    return [
      "Terrain-aware execution",
      "Drainage and external usability",
      "Long-term weather resilience",
      "Coordinated finishing quality",
    ];
  }
  if (category === "Site Development") {
    return [
      "Practical ground-level sequencing",
      "Drainage and water movement control",
      "Usable external circulation",
      "Long-term maintenance awareness",
    ];
  }
  return [
    "Disciplined residential execution",
    "Structural reliability",
    "Finishing and usability focus",
    "Site-level coordination",
  ];
}

function priorityForName(name, kind) {
  const lower = name.toLowerCase();
  if (/\bcomplete\b|\bcompleted\b/.test(lower)) return 0;
  if (/outside|front|elevation|main/.test(lower)) return 1;
  if (kind === "pdf-preview") return 2;
  if (/drawing|map|layout|plan|demo/.test(lower)) return 3;
  return 2;
}

function execSafe(command, args) {
  execFileSync(command, args, { stdio: "inherit" });
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function cleanDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  fs.mkdirSync(dir, { recursive: true });
}

function convertPdfToPng(pdfPath, outPngPath) {
  execFileSync("sips", ["-s", "format", "png", pdfPath, "--out", outPngPath], { stdio: "ignore" });
}

function buildProjectMedia() {
  cleanDir(outputRoot);
  const folderNames = fs
    .readdirSync(sourceRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  const projects = [];

  for (const folderName of folderNames) {
    const sourceDir = path.join(sourceRoot, folderName);
    const slug = slugOverrides.get(folderName) ?? slugify(folderName);
    const title = titleOverrides.get(folderName) ?? titleCase(folderName.replace(/[-_]+/g, " "));
    const category = inferCategory(folderName);
    const location = inferLocation(folderName);
    const description = inferDescription(title, category, location);
    const scope = inferScope(category);
    const priorities = inferPriorities(category);

    const projectOutDir = path.join(outputRoot, slug);
    ensureDir(projectOutDir);

    const entries = fs
      .readdirSync(sourceDir, { withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => !name.startsWith("."));

    const imageFiles = entries.filter((name) => SOURCE_EXTENSIONS.has(path.extname(name).toLowerCase()));
    const pdfFiles = entries.filter((name) => path.extname(name).toLowerCase() === ".pdf");

    const sourceItems = [];

    for (const imageFile of imageFiles) {
      sourceItems.push({
        kind: /drawing|map|layout|plan|demo/i.test(imageFile) ? "drawing" : "photo",
        sourceName: imageFile,
        absPath: path.join(sourceDir, imageFile),
      });
    }

    for (const pdfFile of pdfFiles) {
      const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "jvs-pdf-"));
      const tempPng = path.join(tempDir, `${slugify(pdfFile)}.png`);
      convertPdfToPng(path.join(sourceDir, pdfFile), tempPng);
      sourceItems.push({
        kind: "pdf-preview",
        sourceName: pdfFile,
        absPath: tempPng,
        tempDir,
      });
    }

    sourceItems.sort((a, b) => {
      const pDiff = priorityForName(a.sourceName, a.kind) - priorityForName(b.sourceName, b.kind);
      if (pDiff !== 0) return pDiff;
      return a.sourceName.localeCompare(b.sourceName);
    });

    const media = [];
    const maxItems = sourceItems.length;

    for (let index = 0; index < maxItems; index += 1) {
      const item = sourceItems[index];
      const stem = slugify(path.parse(item.sourceName).name) || `image-${index + 1}`;
      const outputFileName = `${slug}--${item.kind}-${String(index + 1).padStart(2, "0")}-${stem}.webp`;
      const outputPath = path.join(projectOutDir, outputFileName);

      const resizeTemp = path.join(os.tmpdir(), `${slug}-${Date.now()}-${index}.png`);
      execSafe("sips", ["-Z", "2200", item.absPath, "--out", resizeTemp]);
      execSafe("cwebp", ["-quiet", "-q", "82", resizeTemp, "-o", outputPath]);
      fs.rmSync(resizeTemp, { force: true });

      media.push({
        src: `/images/projects/${slug}/${outputFileName}`,
        alt: `${title} - ${humanizeFileStem(item.sourceName)}`,
        label: humanizeFileStem(item.sourceName),
        kind: item.kind,
      });

      if (item.tempDir) {
        fs.rmSync(item.tempDir, { recursive: true, force: true });
      }
    }

    if (media.length === 0) {
      throw new Error(`No media generated for project folder: ${folderName}`);
    }

    projects.push({
      slug,
      title,
      category,
      location,
      status: "Completed",
      description,
      scope,
      overview: `${title} is presented through real project imagery, drawings, and on-site progress records maintained by JVS Enterprises.`,
      priorities,
      media,
    });
  }

  const fileContent = `// Auto-generated by scripts/generate-project-media.mjs\n\nexport type GeneratedProjectMedia = {\n  src: string;\n  alt: string;\n  label: string;\n  kind: \"photo\" | \"drawing\" | \"pdf-preview\";\n};\n\nexport type GeneratedProject = {\n  slug: string;\n  title: string;\n  category: string;\n  location: string;\n  status: string;\n  description: string;\n  scope: string[];\n  overview: string;\n  priorities: string[];\n  media: GeneratedProjectMedia[];\n};\n\nexport const generatedProjects: GeneratedProject[] = ${JSON.stringify(projects, null, 2)};\n`;

  ensureDir(path.dirname(outputDataFile));
  fs.writeFileSync(outputDataFile, fileContent, "utf8");

  console.log(`Generated ${projects.length} projects and media in ${outputRoot}`);
}

buildProjectMedia();

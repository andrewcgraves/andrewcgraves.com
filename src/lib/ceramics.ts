import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface CeramicsPhoto {
  src: string;
  width: number;
  height: number;
}

export interface CeramicsEntry {
  slug: string;
  title: string;
  material: string;
  year: string;
  status: "complete" | "in-progress";
  tagline: string;
  photos: CeramicsPhoto[];
  content: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content/ceramics");

function parseSeriesFile(filename: string): CeramicsEntry {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? "",
    material: data.material ?? "",
    year: data.year ?? "",
    status: data.status ?? "complete",
    tagline: data.tagline ?? "",
    photos: data.photos ?? [],
    content,
  };
}

export function getAllSeries(): CeramicsEntry[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parseSeriesFile(f));
}

export function getSeriesBySlug(slug: string): CeramicsEntry | null {
  const filepath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filepath)) return null;
  return parseSeriesFile(`${slug}.md`);
}

export function getAllSeriesSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

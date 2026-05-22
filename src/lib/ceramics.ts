import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Series } from "../data/ceramics";

const CONTENT_DIR = path.join(process.cwd(), "content/ceramics");

export function getAllSeries(): Series[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map((filename) => parseSeriesFile(filename))
    .sort((a, b) => {
      const aHasOrder = a.order !== undefined;
      const bHasOrder = b.order !== undefined;
      if (aHasOrder && bHasOrder) return a.order! - b.order!;
      if (aHasOrder) return -1;
      if (bHasOrder) return 1;
      const yearA = parseInt(a.year, 10) || 0;
      const yearB = parseInt(b.year, 10) || 0;
      if (yearB !== yearA) return yearB - yearA;
      return a.slug.localeCompare(b.slug);
    });
}

export function getSeriesBySlug(slug: string): Series | null {
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

function parseSeriesFile(filename: string): Series {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    ...(data.order !== undefined && { order: data.order }),
    title: data.title ?? "",
    material: data.material ?? "",
    year: String(data.year ?? ""),
    status: data.status ?? "complete",
    tagline: data.tagline ?? "",
    content: content.trim(),
    photos: data.photos ?? [],
  };
}

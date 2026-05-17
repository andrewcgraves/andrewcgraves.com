import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ProjectEntry } from "../data/projects";

const CONTENT_DIR = path.join(process.cwd(), "content/projects");

export function getAllProjects(): ProjectEntry[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map((filename) => parseProjectFile(filename))
    .sort((a, b) => b.year - a.year);
}

export function getProjectBySlug(slug: string): ProjectEntry | null {
  const filepath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filepath)) return null;
  return parseProjectFile(`${slug}.md`);
}

export function getAllProjectSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function parseProjectFile(filename: string): ProjectEntry {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    year: data.year ?? 0,
    kind: data.kind ?? "",
    title: data.title ?? "",
    blurb: data.blurb ?? "",
    color: data.color ?? "#888888",
    cover: data.cover ?? {},
    gallery: data.gallery ?? [],
    content,
  };
}

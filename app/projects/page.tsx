import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import UniversalHeaderBar from "../../src/Components/UniversalHeaderBar.jsx";
import { getAllProjects } from "../../src/lib/projects";
import { ProjectEntry } from "../../src/data/projects";

export const metadata: Metadata = {
  title: "Projects — Andrew Graves",
  description: "A collection of projects I've made or worked on across various fields.",
};

function shade(hex: string, pct: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, ((n >> 16) & 0xff) + pct));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 0xff) + pct));
  const b = Math.max(0, Math.min(255, (n & 0xff) + pct));
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

function ProjectCardImage({ item }: { item: ProjectEntry }) {
  if (item.cover?.src) {
    return (
      <Image
        src={item.cover.src}
        alt={item.title}
        fill
        style={{ objectFit: "cover" }}
        className="ceramics-card-img"
      />
    );
  }
  const grad = `linear-gradient(135deg, ${item.color} 0%, ${shade(item.color, -30)} 100%)`;
  return (
    <div className="ceramics-card-img" style={{ position: "absolute", inset: 0, background: grad }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 320"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, opacity: 0.14 }}
      >
        <defs>
          <pattern id={`p-${item.slug}`} width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="1" fill="#FFFFFF" />
          </pattern>
        </defs>
        <rect width="400" height="320" fill={`url(#p-${item.slug})`} />
      </svg>
    </div>
  );
}

function ProjectCard({ item }: { item: ProjectEntry }) {
  return (
    <article className="ceramics-card">
      <Link href={`/projects/${item.slug}`} style={{ display: "block" }}>
        <div
          style={{
            position: "relative",
            aspectRatio: "4/3",
            borderRadius: 10,
            overflow: "hidden",
            background: "var(--color-placeholder)",
          }}
        >
          <ProjectCardImage item={item} />
        </div>
      </Link>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: 16,
          }}
        >
          <h2 className="t-card-title" style={{ margin: 0 }}>
            {item.title}
          </h2>
          <span className="t-microlabel" style={{ whiteSpace: "nowrap" }}>
            {item.year}
          </span>
        </div>
        <span className="t-microlabel">{item.kind}</span>
        {item.blurb && (
          <p className="t-body" style={{ margin: 0 }}>
            {item.blurb}
          </p>
        )}
        <Link
          href={`/projects/${item.slug}`}
          className="t-btn arrow-link"
          style={{ alignSelf: "flex-start", textDecoration: "underline", textUnderlineOffset: 3 }}
        >
          View project <span className="arrow-right">→</span>
        </Link>
      </div>
    </article>
  );
}

export default function Projects() {
  const projects = getAllProjects();
  return (
    <div className="page-shell">
      <UniversalHeaderBar />
      <div
        className="page-main"
        style={{ flex: "none", paddingBottom: 0, gap: 0, maxWidth: "none", margin: 0 }}
      >
        <hgroup>
          <h1>Projects</h1>
          <p>Things I&apos;ve made or worked on — across the workshop, the trail, and the page.</p>
        </hgroup>
      </div>
      <section className="ceramics-grid-section">
        <div className="ceramics-grid">
          {projects.map((item) => (
            <ProjectCard key={item.slug} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

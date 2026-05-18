import Head from "next/head";
import Link from "next/link";
import UniversalHeaderBar from "../src/Components/UniversalHeaderBar.js";
import { getAllProjects } from "../src/lib/projects";
import { ProjectEntry } from "../src/data/projects";

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
      <img
        src={item.cover.src}
        alt={item.title}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    );
  }
  const grad = `linear-gradient(135deg, ${item.color} 0%, ${shade(item.color, -30)} 100%)`;
  return (
    <div style={{ position: "absolute", inset: 0, background: grad }}>
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
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 24,
              lineHeight: 1,
              color: "var(--color-ink-true)",
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            {item.title}
          </h2>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontStyle: "italic",
              fontSize: 12,
              color: "var(--color-ink-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              whiteSpace: "nowrap",
            }}
          >
            {item.year}
          </span>
        </div>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "var(--color-ink-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          {item.kind}
        </span>
        {item.blurb && (
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              lineHeight: 1.55,
              color: "var(--color-ink)",
              margin: 0,
            }}
          >
            {item.blurb}
          </p>
        )}
        <Link
          href={`/projects/${item.slug}`}
          className="arrow-link"
          style={{
            alignSelf: "flex-start",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 13,
            color: "var(--color-ink)",
            textDecoration: "underline",
            textUnderlineOffset: 3,
          }}
        >
          View project <span className="arrow-right">→</span>
        </Link>
      </div>
    </article>
  );
}

export default function Projects({ projects }: { projects: ProjectEntry[] }) {
  return (
    <div className="page-shell">
      <Head>
        <title>Projects — Andrew Graves</title>
        <meta
          name="description"
          content="A collection of projects I've made or worked on across various fields."
        />
        <link rel="icon" href="/logo.png" />
      </Head>

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

export async function getStaticProps() {
  const projects = getAllProjects();
  return { props: { projects } };
}

import Head from "next/head";
import UniversalHeaderBar from "../src/Components/UniversalHeaderBar.js";
import { useState, useEffect, useMemo, CSSProperties } from "react";

interface Project {
  slug: string;
  year: number;
  kind: string;
  title: string;
  blurb: string;
  color: string;
}

const PROJECTS: Project[] = [
  {
    slug: "sierra-traverse",
    year: 2025,
    kind: "Hiking",
    title: "High Sierra traverse",
    blurb:
      "Eight days, 96 miles, four passes — Bishop to Roads End. Notes on resupply, water carries, and an early September storm.",
    color: "#1E293B",
  },
  {
    slug: "type-portfolio",
    year: 2025,
    kind: "Technical",
    title: "Static type portfolio",
    blurb:
      "Rewriting this site as plain HTML with a typographic system that survives editing in a text file at 30,000 feet.",
    color: "#121212",
  },
  {
    slug: "transit-equity",
    year: 2024,
    kind: "Advocacy",
    title: "Transit equity brief",
    blurb:
      "A short, data‑backed comment letter for the SFMTA board on bus‑lane enforcement in the southeast quadrant.",
    color: "#EF9261",
  },
  {
    slug: "caltrain",
    year: 2024,
    kind: "Technical",
    title: "Caltrain timetable rebuild",
    blurb:
      "A clearer, faster web view of the Caltrain schedule. Built because the official one is, well, the official one.",
    color: "#1E293B",
  },
  {
    slug: "jmt-section",
    year: 2024,
    kind: "Hiking",
    title: "JMT — Tuolumne to Reds",
    blurb:
      "Four days on the John Muir Trail in mid‑June. A short section, a heavy snow year, and a lot of stream crossings.",
    color: "#4A4A4F",
  },
  {
    slug: "parametric-lamp",
    year: 2023,
    kind: "Technical",
    title: "Parametric lamp shade",
    blurb:
      "An OpenSCAD lamp shade that varies its rib count and twist by height. Printed in translucent PETG.",
    color: "#121212",
  },
  {
    slug: "design-tokens",
    year: 2023,
    kind: "Advocacy",
    title: "Open design tokens",
    blurb:
      "A small contribution to a shared design‑tokens spec — case studies, naming conventions, and a sample export pipeline.",
    color: "#EF9261",
  },
  {
    slug: "lost-coast",
    year: 2023,
    kind: "Hiking",
    title: "Lost Coast Trail",
    blurb:
      "Three days walking the King Range. Tides were kind. The black sand was not. A trip report and gear list.",
    color: "#1E293B",
  },
  {
    slug: "ada-comments",
    year: 2022,
    kind: "Advocacy",
    title: "ADA crossing comments",
    blurb:
      "Pedestrian‑access comments on six intersections in District 8 — drawings, photos, and proposed remediations.",
    color: "#EF9261",
  },
];

// ── Color utility ─────────────────────────────────────────────────
function shade(hex: string, pct: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, ((n >> 16) & 0xff) + pct));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 0xff) + pct));
  const b = Math.max(0, Math.min(255, (n & 0xff) + pct));
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

// ── Preview image swatch ──────────────────────────────────────────
function PreviewImage({ item }: { item: Project | null }) {
  if (!item) {
    return <div style={{ ...previewStyles.swatch, background: "var(--color-surface)" }} />;
  }
  const grad = `linear-gradient(135deg, ${item.color} 0%, ${shade(item.color, -12)} 100%)`;
  return (
    <div style={{ ...previewStyles.swatch, background: grad }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 280"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, opacity: 0.18 }}
      >
        <defs>
          <pattern
            id={`p-${item.slug}`}
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="12" cy="12" r="1" fill="#FFFFFF" />
          </pattern>
        </defs>
        <rect width="400" height="280" fill={`url(#p-${item.slug})`} />
      </svg>
      <div style={previewStyles.swatchLabel}>
        <span style={previewStyles.swatchKind}>
          {item.kind} · {item.year}
        </span>
        <span style={previewStyles.swatchTitle}>{item.title}</span>
      </div>
    </div>
  );
}

const previewStyles: Record<string, CSSProperties> = {
  swatch: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    aspectRatio: "10 / 7",
    borderRadius: 10,
    display: "flex",
    alignItems: "flex-end",
  },
  swatchLabel: {
    position: "relative",
    padding: 16,
    color: "white",
    display: "flex",
    flexDirection: "column",
    gap: 4,
    textShadow: "0 1px 2px rgba(0,0,0,0.25)",
  },
  swatchKind: {
    fontFamily: "var(--font-body)",
    fontStyle: "italic",
    fontSize: 10,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    opacity: 0.9,
  },
  swatchTitle: {
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: 18,
    lineHeight: 1.15,
  },
};

// ── Preview panel (desktop, sticky) ──────────────────────────────
function PreviewPanel({ item }: { item: Project | null }) {
  const [shown, setShown] = useState<Project | null>(item);
  const [fade, setFade] = useState(1);

  useEffect(() => {
    setFade(0);
    const t = setTimeout(() => {
      setShown(item);
      setFade(1);
    }, 120);
    return () => clearTimeout(t);
  }, [item?.slug]);

  return (
    <aside style={panelStyles.panel} aria-live="polite">
      <div
        style={{
          ...panelStyles.imageWrap,
          opacity: fade,
          transform: `translateY(${fade ? 0 : 4}px)`,
        }}
      >
        <PreviewImage item={shown} />
      </div>
      <div style={{ ...panelStyles.text, opacity: fade }}>
        {shown ? (
          <>
            <div style={panelStyles.meta}>
              <span style={panelStyles.metaYear}>{shown.year}</span>
              <span style={panelStyles.dot} />
              <span style={panelStyles.metaKind}>{shown.kind}</span>
            </div>
            <p style={panelStyles.blurb}>{shown.blurb}</p>
            <a href={`/projects/${shown.slug}`} style={panelStyles.cta}>
              <span style={panelStyles.ctaLabel}>View project</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                style={panelStyles.ctaArrow}
              >
                <path
                  d="M3 7h8M7 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </>
        ) : (
          <p style={{ ...panelStyles.blurb, color: "var(--color-ink-muted)" }}>
            Hover a project to preview, or tap one to open.
          </p>
        )}
      </div>
    </aside>
  );
}

const panelStyles: Record<string, CSSProperties> = {
  panel: {
    position: "sticky",
    top: "var(--header-height)",
    display: "flex",
    flexDirection: "column",
    gap: 18,
    alignSelf: "start",
  },
  imageWrap: {
    transition:
      "opacity 240ms var(--ease-smooth), transform 240ms var(--ease-smooth)",
  },
  text: { transition: "opacity 240ms var(--ease-smooth)" },
  meta: { display: "flex", alignItems: "center", gap: 10 },
  metaYear: {
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: "0.04em",
    color: "var(--color-ink)",
  },
  dot: { width: 3, height: 3, borderRadius: 999, background: "var(--color-placeholder)" },
  metaKind: {
    fontFamily: "var(--font-body)",
    fontStyle: "italic",
    fontSize: 12,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    color: "var(--color-ink-muted)",
  },
  blurb: {
    fontFamily: "var(--font-body)",
    fontSize: 14,
    lineHeight: 1.6,
    color: "var(--color-ink)",
    margin: "10px 0 0",
  },
  cta: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: "0.04em",
    color: "var(--color-ink)",
    textDecoration: "none",
    cursor: "pointer",
  },
  ctaLabel: {
    backgroundImage: "linear-gradient(var(--color-ink), var(--color-ink))",
    backgroundSize: "100% 1px",
    backgroundPosition: "0 100%",
    backgroundRepeat: "no-repeat",
    paddingBottom: 2,
  },
  ctaArrow: {
    transition: "transform 220ms var(--ease-smooth)",
  },
};

// ── Project row ───────────────────────────────────────────────────
function ProjectRow({
  item,
  isDimmed,
  isActive,
  onHover,
  onLeave,
  onClick,
}: {
  item: Project;
  isDimmed: boolean;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  return (
    <li
      className="ag-row proj-row"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      onClick={onClick}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick();
      }}
      style={{ opacity: isDimmed ? 0.32 : 1 }}
    >
      <span className="proj-row-year">{item.year}</span>
      <span
        className="proj-row-title"
        style={{ transform: isActive ? "translateX(6px)" : "translateX(0)" }}
      >
        {item.title}
      </span>
      <span className="proj-row-kind">{item.kind}</span>
      <span
        className="proj-row-arrow"
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateX(0)" : "translateX(-6px)",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
          <path
            d="M3 7h8M7 3l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </li>
  );
}

// ── Main page ─────────────────────────────────────────────────────
export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [hovered, setHovered] = useState<Project | null>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 880);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const filtered = useMemo(() => {
    const list =
      filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.kind === filter);
    return [...list].sort((a, b) => b.year - a.year);
  }, [filter]);

  const activeItem = hovered ?? filtered[0] ?? null;

  return (
    <div className="page-shell">
      <Head>
        <title>Projects — Andrew Graves</title>
        <meta
          name="description"
          content="A collection of projects I've made or worked on — across the workshop, the trail, and the page."
        />
        <link rel="icon" href="/logo.png" />
      </Head>

      <UniversalHeaderBar />

      <main className="page-main">
        <hgroup>
          <h1>Projects</h1>
          <p>
            Things I've made or worked on — across the workshop, the trail, and
            the page.
          </p>
        </hgroup>

        <section
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <span className="proj-count">
            <span className="proj-count-num">{filtered.length}</span>
            &nbsp;{filtered.length === 1 ? "project" : "projects"}
          </span>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: isDesktop ? "1fr 400px" : "1fr",
            gap: isDesktop ? 64 : 0,
            alignItems: "start",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              borderTop: "1px solid var(--color-border)",
            }}
            onMouseLeave={() => setHovered(null)}
          >
            {filtered.map((item) => (
              <ProjectRow
                key={item.slug}
                item={item}
                isDimmed={
                  isDesktop && hovered != null && hovered.slug !== item.slug
                }
                isActive={hovered?.slug === item.slug}
                onHover={() => setHovered(item)}
                onLeave={() => {}}
                onClick={() => {
                  window.location.href = `/projects/${item.slug}`;
                }}
              />
            ))}
            {filtered.length === 0 && (
              <li
                style={{
                  padding: "32px 4px",
                  color: "var(--color-ink-muted)",
                  fontFamily: "var(--font-body)",
                  fontStyle: "italic",
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                No projects in this category yet.
              </li>
            )}
          </ul>

          {isDesktop && <PreviewPanel item={activeItem} />}
        </section>
      </main>
    </div>
  );
}

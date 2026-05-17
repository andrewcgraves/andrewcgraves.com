import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, CSSProperties } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import UniversalHeaderBar from "../../src/Components/UniversalHeaderBar";
import { PROJECTS, ProjectEntry, BodyBlock, GalleryPhoto } from "../../src/data/projects";

function shade(hex: string, pct: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, ((n >> 16) & 0xff) + pct));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 0xff) + pct));
  const b = Math.max(0, Math.min(255, (n & 0xff) + pct));
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

function PlaceholderImage({
  color,
  id,
  aspect = "16 / 9",
  style,
}: {
  color: string;
  id: string;
  aspect?: string;
  style?: CSSProperties;
}) {
  const grad = `linear-gradient(135deg, ${color} 0%, ${shade(color, -14)} 100%)`;
  return (
    <div
      role="img"
      aria-label={`Image: ${id}`}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: aspect,
        borderRadius: 10,
        overflow: "hidden",
        background: grad,
        ...style,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 450"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, opacity: 0.15 }}
      >
        <defs>
          <pattern id={`pat-${id}`} width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="14" cy="14" r="1.2" fill="#FFFFFF" />
          </pattern>
        </defs>
        <rect width="800" height="450" fill={`url(#pat-${id})`} />
      </svg>
    </div>
  );
}

function BackLink() {
  const [hover, setHover] = useState(false);
  return (
    <Link
      href="/projects"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 12,
        letterSpacing: "0.06em",
        textTransform: "uppercase" as const,
        color: "var(--color-ink-muted)",
        textDecoration: "none",
        width: "fit-content",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          transition: "transform 220ms var(--ease-smooth)",
          transform: hover ? "translateX(-3px)" : "translateX(0)",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
          <path
            d="M11 7H3M7 3L3 7l4 4"
            stroke="currentColor"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span>All projects</span>
    </Link>
  );
}

function Block({ block, color }: { block: BodyBlock; color: string }) {
  switch (block.type) {
    case "p":
      return <p className="pd-body-p">{block.text}</p>;

    case "h2":
      return <h2 className="pd-body-h2">{block.text}</h2>;

    case "h3":
      return <h3 className="pd-body-h3">{block.text}</h3>;

    case "list":
      return (
        <ul className="pd-body-ul">
          {block.items.map((text, i) => (
            <li key={i} className="pd-body-li">
              <span className="pd-body-bullet" style={{ background: color }} />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <blockquote className="pd-body-quote">
          <span className="pd-body-quote-rule" style={{ background: color }} />
          <span className="pd-body-quote-text">{block.text}</span>
        </blockquote>
      );

    case "image":
      return (
        <figure className="pd-body-figure">
          {block.src ? (
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: block.aspect || "16 / 10",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <Image
                src={block.src}
                alt={block.caption || ""}
                fill
                style={{ objectFit: "cover" }}
                sizes="880px"
              />
            </div>
          ) : (
            <PlaceholderImage
              color={color}
              id={block.slot || "inline"}
              aspect={block.aspect || "16 / 10"}
            />
          )}
          {block.caption && <figcaption className="pd-body-figcap">{block.caption}</figcaption>}
        </figure>
      );

    default:
      return null;
  }
}

function GalleryThumb({
  photo,
  index,
  color,
}: {
  photo: GalleryPhoto;
  index: number;
  color: string;
}) {
  const [hover, setHover] = useState(false);
  return (
    <figure
      style={{ margin: 0, display: "flex", flexDirection: "column", gap: 8 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {photo.src ? (
        <a
          className="pswp-gallery-item"
          href={photo.src}
          data-pswp-width={photo.width || 1200}
          data-pswp-height={photo.height || 800}
          style={{
            display: "block",
            borderRadius: 10,
            overflow: "hidden",
            cursor: "zoom-in",
            transform: hover ? "scale(1.015)" : "scale(1)",
            boxShadow: hover ? "0 12px 32px rgba(0,0,0,0.12)" : "0 0 0 rgba(0,0,0,0)",
            transition: "transform 300ms var(--ease-smooth), box-shadow 300ms var(--ease-smooth)",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4 / 3",
              transform: hover ? "scale(1.04)" : "scale(1)",
              transition: "transform 600ms var(--ease-smooth)",
            }}
          >
            <Image
              src={photo.src}
              alt={photo.caption || `Photo ${index + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </a>
      ) : (
        <div
          style={{
            borderRadius: 10,
            overflow: "hidden",
            transform: hover ? "scale(1.015)" : "scale(1)",
            boxShadow: hover ? "0 12px 32px rgba(0,0,0,0.12)" : "0 0 0 rgba(0,0,0,0)",
            transition: "transform 300ms var(--ease-smooth), box-shadow 300ms var(--ease-smooth)",
          }}
        >
          <PlaceholderImage
            color={color}
            id={`gallery-${index}`}
            aspect="4 / 3"
            style={{ borderRadius: 0 }}
          />
        </div>
      )}
      {photo.caption && (
        <figcaption
          style={{
            fontFamily: "var(--font-body)",
            fontStyle: "italic",
            fontSize: 12,
            lineHeight: 1.4,
            color: "var(--color-ink-muted)",
          }}
        >
          {photo.caption}
        </figcaption>
      )}
    </figure>
  );
}

export default function ProjectDetail({ project }: { project: ProjectEntry }) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const hasRealImages = project.gallery.some((g) => g.src);
  const [endHover, setEndHover] = useState(false);

  useEffect(() => {
    if (!hasRealImages || !galleryRef.current) return;
    const lb = new PhotoSwipeLightbox({
      gallery: galleryRef.current,
      children: "a.pswp-gallery-item",
      pswpModule: () => import("photoswipe"),
    });
    lb.init();
    return () => lb.destroy();
  }, [project.slug, hasRealImages]);

  return (
    <div className="page-shell">
      <Head>
        <title>{project.title} — Andrew Graves</title>
        <meta name="description" content={project.blurb} />
        <link rel="icon" href="/logo.png" />
      </Head>

      <UniversalHeaderBar />

      {/* Cover */}
      <section className="pd-cover-section">
        <div className="pd-cover-wrap">
          {project.cover?.src ? (
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "21 / 9",
                borderRadius: 14,
                overflow: "hidden",
              }}
            >
              <Image
                src={project.cover.src}
                alt={project.title}
                fill
                priority
                style={{ objectFit: "cover" }}
                sizes="100vw"
              />
            </div>
          ) : (
            <PlaceholderImage
              color={project.color}
              id="cover"
              aspect="21 / 9"
              style={{ borderRadius: 14 }}
            />
          )}
        </div>
      </section>

      {/* Title block */}
      <header className="pd-title-block">
        <div className="pd-title-inner">
          <BackLink />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 8,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: project.color,
              }}
            >
              {project.kind}
            </span>
            <span
              style={{
                width: 3,
                height: 3,
                borderRadius: 999,
                background: "var(--color-placeholder)",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontStyle: "italic",
                fontSize: 12,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--color-ink-muted)",
              }}
            >
              {project.year}
            </span>
          </div>
          <h1 className="pd-h1">{project.title}</h1>
          {project.blurb && <p className="pd-lede">{project.blurb}</p>}
        </div>
      </header>

      {/* Article body */}
      <article className="pd-article">
        <div className="pd-column">
          {project.body.map((block, i) => (
            <Block key={i} block={block} color={project.color} />
          ))}
        </div>
      </article>

      {/* Gallery */}
      {project.gallery.length > 0 && (
        <section className="pd-gallery-section">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 16,
              marginBottom: 20,
            }}
          >
            <h2 className="pd-gallery-title">Gallery</h2>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontStyle: "italic",
                fontSize: 12,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "var(--color-ink-muted)",
              }}
            >
              {project.gallery.length} photos
            </span>
          </div>
          <div ref={galleryRef} className="pd-gallery-grid">
            {project.gallery.map((photo, i) => (
              <GalleryThumb key={i} photo={photo} index={i} color={project.color} />
            ))}
          </div>
        </section>
      )}

      {/* End link */}
      <section className="pd-end-section">
        <Link
          href="/projects"
          className="pd-end-link"
          onMouseEnter={() => setEndHover(true)}
          onMouseLeave={() => setEndHover(false)}
        >
          <span>Back to all projects</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            aria-hidden="true"
            style={{
              transition: "transform 220ms var(--ease-smooth)",
              transform: endHover ? "translateX(3px)" : "translateX(0)",
            }}
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </section>

      <footer className="pd-footer">
        <span>© Andrew Graves</span>
        <span>hi@andrewcgraves.com</span>
      </footer>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: PROJECTS.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) return { notFound: true };
  return { props: { project } };
}

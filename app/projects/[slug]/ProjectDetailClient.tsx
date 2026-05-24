"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, CSSProperties } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import UniversalHeaderBar from "../../../src/Components/UniversalHeaderBar.jsx";
import BackButton from "../../../src/Components/BackButton";
import { ProjectEntry, GalleryPhoto } from "../../../src/data/projects";
import { isVideoUrl, getVideoEmbedUrl } from "../../../src/lib/mediaUtils";

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
  return (
    <Link
      href="/projects"
      className="t-btn arrow-link"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        color: "var(--color-ink-muted)",
        textDecoration: "none",
        width: "fit-content",
      }}
    >
      <span className="arrow-left">
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

function ProjectBody({ content, color }: { content: string; color: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children, node }) => {
          const hasImageChild = node?.children?.some(
            (child) => child.type === "element" && child.tagName === "img"
          );
          if (hasImageChild) {
            return <>{children}</>;
          }
          return <p className="pd-body-p">{children}</p>;
        },
        h2: ({ children }) => <h2 className="pd-body-h2">{children}</h2>,
        h3: ({ children }) => <h3 className="pd-body-h3">{children}</h3>,
        ul: ({ children }) => <ul className="pd-body-ul">{children}</ul>,
        li: ({ children }) => (
          <li className="pd-body-li">
            <span className="pd-body-bullet" style={{ background: color }} />
            <span>{children}</span>
          </li>
        ),
        blockquote: ({ children }) => (
          <blockquote className="pd-body-quote">
            <span className="pd-body-quote-rule" style={{ background: color }} />
            <span className="pd-body-quote-text">{children}</span>
          </blockquote>
        ),
        a: ({ href, children }) => {
          const isExternal = typeof href === "string" && /^https?:\/\//.test(href);
          return (
            <a
              className="pd-body-link"
              href={href}
              {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {children}
            </a>
          );
        },
        img: ({ src, alt }) => {
          const safeSrc = typeof src === "string" ? src : "";
          const explicitVideo = typeof alt === "string" && alt.startsWith("video:");
          const caption = explicitVideo ? alt.slice(6).trim() || undefined : alt;

          const embedUrl = getVideoEmbedUrl(safeSrc);
          if (embedUrl) {
            return (
              <figure className="pd-body-figure">
                <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9" }}>
                  <iframe
                    src={embedUrl}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      border: "none",
                      borderRadius: 10,
                    }}
                  />
                </div>
                {caption && <figcaption className="pd-body-figcap">{caption}</figcaption>}
              </figure>
            );
          }

          if (explicitVideo || isVideoUrl(safeSrc)) {
            return (
              <figure className="pd-body-figure">
                <video
                  src={safeSrc}
                  controls
                  style={{ width: "100%", borderRadius: 10, display: "block" }}
                  aria-label={caption || undefined}
                />
                {caption && <figcaption className="pd-body-figcap">{caption}</figcaption>}
              </figure>
            );
          }

          return (
            <figure className="pd-body-figure">
              <a
                className="pswp-gallery-item"
                href={safeSrc}
                data-pswp-width={0}
                data-pswp-height={0}
                style={{
                  display: "block",
                  cursor: "zoom-in",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <Image
                  src={safeSrc}
                  alt={caption || ""}
                  width={0}
                  height={0}
                  sizes="880px"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </a>
              {caption && <figcaption className="pd-body-figcap">{caption}</figcaption>}
            </figure>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
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
          data-pswp-width={photo.width || 0}
          data-pswp-height={photo.height || 0}
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
          <Image
            src={photo.src}
            alt={photo.caption || `Photo ${index + 1}`}
            width={0}
            height={0}
            sizes="(max-width: 640px) 50vw, 25vw"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              transform: hover ? "scale(1.04)" : "scale(1)",
              transition: "transform 600ms var(--ease-smooth)",
            }}
          />
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
      {photo.caption && <figcaption className="t-caption">{photo.caption}</figcaption>}
    </figure>
  );
}

function attachDynamicDimensions(lb: PhotoSwipeLightbox) {
  lb.addFilter("domItemData", (itemData, element) => {
    if (!itemData.w || !itemData.h) {
      const thumb = element.querySelector("img");
      if (thumb && thumb.complete && thumb.naturalWidth > 0) {
        itemData.w = thumb.naturalWidth;
        itemData.h = thumb.naturalHeight;
      }
    }
    return itemData;
  });

  lb.on("contentLoadImage", ({ content }) => {
    if (content.data.w && content.data.h) return;
    const img = content.element as HTMLImageElement;
    if (!img) return;
    img.addEventListener(
      "load",
      () => {
        if (img.naturalWidth && img.naturalHeight) {
          content.data.w = img.naturalWidth;
          content.data.h = img.naturalHeight;
          (content.instance as any).updateSize(true);
        }
      },
      { once: true }
    );
  });
}

export default function ProjectDetailClient({ project }: { project: ProjectEntry }) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const hasRealImages = project.gallery.some((g) => g.src);

  useEffect(() => {
    if (!bodyRef.current) return;
    const lb = new PhotoSwipeLightbox({
      gallery: bodyRef.current,
      children: "a.pswp-gallery-item",
      pswpModule: () => import("photoswipe"),
    });
    attachDynamicDimensions(lb);
    lb.init();
    return () => lb.destroy();
  }, [project.slug]);

  useEffect(() => {
    if (!hasRealImages || !galleryRef.current) return;
    const lb = new PhotoSwipeLightbox({
      gallery: galleryRef.current,
      children: "a.pswp-gallery-item",
      pswpModule: () => import("photoswipe"),
    });
    attachDynamicDimensions(lb);
    lb.init();
    return () => lb.destroy();
  }, [project.slug, hasRealImages]);

  return (
    <div className="page-shell">
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
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
            <span className="t-btn" style={{ textTransform: "uppercase", color: project.color }}>
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
            <span className="t-microlabel">{project.year}</span>
          </div>
          <h1 className="pd-h1">{project.title}</h1>
          {project.blurb && <p className="pd-lede">{project.blurb}</p>}
        </div>
      </header>

      {/* Article body */}
      <article className="pd-article">
        <div className="pd-column" ref={bodyRef}>
          <ProjectBody content={project.content} color={project.color} />
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
            <span className="t-microlabel">{project.gallery.length} photos</span>
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
        <BackButton href="/projects" label="Back to all projects" />
      </section>
    </div>
  );
}

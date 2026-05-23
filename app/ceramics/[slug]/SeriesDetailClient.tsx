"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import UniversalHeaderBar from "../../../src/Components/UniversalHeaderBar";
import BackButton from "../../../src/Components/BackButton";
import { Series } from "../../../src/data/ceramics";

export default function SeriesDetailClient({ series }: { series: Series }) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeThumb, setActiveThumb] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveThumb(0);
  }, [series.slug]);

  useEffect(() => {
    if (!galleryRef.current) return;
    const lightbox = new PhotoSwipeLightbox({
      gallery: galleryRef.current,
      children: "a.pswp-gallery-item",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();
    return () => lightbox.destroy();
  }, [series.slug]);

  const openAt = (index: number) => {
    if (!galleryRef.current) return;
    const el = galleryRef.current.querySelectorAll("a.pswp-gallery-item")[index] as
      | HTMLAnchorElement
      | undefined;
    el?.click();
  };

  const metaRows = [
    series.material && ["Material", series.material],
    series.year && ["Year", series.year],
    ["Status", series.status === "in-progress" ? "In progress" : "Complete"],
  ].filter(Boolean) as [string, string][];

  return (
    <div className="page-shell">
      <UniversalHeaderBar />

      {/* Breadcrumb */}
      <div className="series-crumb">
        <Link href="/ceramics" className="series-crumb-back arrow-link">
          <span className="arrow-left">←</span> All series
        </Link>
        <span style={{ color: "var(--color-placeholder)", fontSize: 12 }}>/</span>
        <span className="t-btn">{series.title}</span>
      </div>

      {/* Hero */}
      <section className="series-hero">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <button
            onClick={() => openAt(activeThumb)}
            aria-label="Open in lightbox"
            style={{
              padding: 0,
              border: 0,
              background: "transparent",
              cursor: "zoom-in",
              borderRadius: 10,
              overflow: "hidden",
              position: "relative",
              aspectRatio: "1/1",
              display: "block",
              width: "100%",
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <Image
                src={series.photos[activeThumb].src}
                alt={`${series.title} — photo ${activeThumb + 1}`}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </button>

          {series.photos.length > 1 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${Math.min(series.photos.length, 6)}, 1fr)`,
                gap: 8,
              }}
            >
              {series.photos.slice(0, 5).map((photo, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveThumb(i);
                    openAt(i);
                  }}
                  aria-label={`View photo ${i + 1}`}
                  style={{
                    padding: 0,
                    border: 0,
                    background: "transparent",
                    position: "relative",
                    aspectRatio: "1/1",
                    borderRadius: 6,
                    overflow: "hidden",
                    cursor: "zoom-in",
                    outline:
                      i === activeThumb
                        ? "2px solid var(--color-ink)"
                        : "1px solid var(--color-border)",
                    outlineOffset: i === activeThumb ? -2 : -1,
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={`${series.title} — photo ${i + 1}`}
                    fill
                    sizes="80px"
                    style={{ objectFit: "cover" }}
                  />
                </button>
              ))}
              {series.photos.length > 5 && (
                <a
                  href="#gallery"
                  className="t-btn"
                  style={{
                    aspectRatio: "1/1",
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 6,
                    display: "grid",
                    placeItems: "center",
                    color: "var(--color-ink-muted)",
                    textDecoration: "none",
                  }}
                >
                  +{series.photos.length - 5}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Right: info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {(series.year || series.status === "in-progress") && (
            <span className="t-microlabel">
              {series.year ? `Series · ${series.year}` : "Series"}
              {series.status === "in-progress" && (
                <span style={{ color: "var(--color-coral)" }}> · In progress</span>
              )}
            </span>
          )}
          <h1 className="t-header" style={{ margin: 0 }}>
            {series.title}
          </h1>
          <span
            style={{
              width: 36,
              height: 3,
              borderRadius: 2,
              background:
                "linear-gradient(90deg, var(--color-coral) 0%, var(--color-apricot) 100%)",
              display: "block",
            }}
          />
          {series.tagline && (
            <p className="t-lead" style={{ margin: "4px 0 8px" }}>
              {series.tagline}
            </p>
          )}

          <dl
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "16px 0 8px",
              padding: 0,
              borderTop: "1px solid var(--color-border)",
            }}
          >
            {metaRows.map(([dt, dd]) => (
              <div
                key={dt}
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px 1fr",
                  gap: 16,
                  padding: "12px 0",
                  borderBottom: "1px solid var(--color-border)",
                  alignItems: "baseline",
                }}
              >
                <dt className="t-microlabel" style={{ margin: 0 }}>
                  {dt}
                </dt>
                <dd className="t-body" style={{ margin: 0 }}>
                  {dd}
                </dd>
              </div>
            ))}
          </dl>

          <a
            href="#gallery"
            className="t-btn"
            style={{
              alignSelf: "flex-start",
              background: "var(--color-ink)",
              color: "#FFFFFF",
              borderRadius: 10,
              textTransform: "uppercase",
              padding: "14px 22px",
              textDecoration: "none",
              marginTop: 16,
              display: "inline-block",
            }}
          >
            View gallery
          </a>
        </div>
      </section>

      {/* Description */}
      {series.content && (
        <section className="series-description">
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span className="t-microlabel">About this series</span>
            <h2 className="t-h2" style={{ margin: 0 }}>
              How it was made
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => (
                  <p className="t-body" style={{ margin: 0 }}>
                    {children}
                  </p>
                ),
              }}
            >
              {series.content}
            </ReactMarkdown>
          </div>
        </section>
      )}

      {/* Gallery */}
      <section id="gallery" className="series-gallery-section">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 24,
          }}
        >
          <div>
            <span className="t-microlabel" style={{ display: "block", marginBottom: 6 }}>
              Gallery
            </span>
            <h2 className="t-h2" style={{ margin: 0 }}>
              {series.photos.length} photos
            </h2>
          </div>
          <span className="t-caption">Click any photo to enlarge</span>
        </div>

        <div ref={galleryRef} className="series-gallery-grid">
          {series.photos.map((photo, i) => (
            <figure key={i} style={{ margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              <a
                className="pswp-gallery-item"
                href={photo.src}
                data-pswp-width={photo.width}
                data-pswp-height={photo.height}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "block",
                  borderRadius: 10,
                  overflow: "hidden",
                  background: "var(--color-placeholder)",
                  position: "relative",
                  aspectRatio: "1/1",
                  cursor: "zoom-in",
                }}
              >
                <Image
                  src={photo.src}
                  alt={`${series.title} — photo ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  style={{
                    objectFit: "cover",
                    transition: "transform 300ms cubic-bezier(.2,.8,.2,1)",
                  }}
                  className="gallery-img"
                />
              </a>
              <figcaption style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span className="t-microlabel">{String(i + 1).padStart(2, "0")}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* End link */}
      <section className="pd-end-section">
        <BackButton href="/ceramics" label="Back to all series" />
      </section>
    </div>
  );
}

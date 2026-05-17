import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import UniversalHeaderBar from "../../src/Components/UniversalHeaderBar";
import { CERAMICS_SERIES } from "../../src/data/ceramics";

export default function SeriesDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeThumb, setActiveThumb] = useState(0);

  const series = CERAMICS_SERIES.find((s) => s.slug === slug) ?? CERAMICS_SERIES[0];

  useEffect(() => {
    setActiveThumb(0);
  }, [slug]);

  useEffect(() => {
    if (!galleryRef.current) return;
    const lightbox = new PhotoSwipeLightbox({
      gallery: galleryRef.current,
      children: "a.pswp-gallery-item",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();
    return () => lightbox.destroy();
  }, [slug]);

  const openAt = (index: number) => {
    if (!galleryRef.current) return;
    const el = galleryRef.current.querySelectorAll("a.pswp-gallery-item")[index] as HTMLAnchorElement | undefined;
    el?.click();
  };

  if (router.isFallback || !series) return null;

  const metaRows = [
    series.material && ["Material", series.material],
    ["Pieces", String(series.photos.length)],
    series.year && ["Year", series.year],
    ["Status", series.status === "in-progress" ? "In progress" : "Complete"],
  ].filter(Boolean) as [string, string][];

  return (
    <div className="page-shell">
      <Head>
        <title>{series.title} — Ceramics — Andrew Graves</title>
        <meta name="description" content={series.tagline || `${series.title} — ceramics by Andrew Graves`} />
        <link rel="icon" href="/logo.png" />
      </Head>

      <UniversalHeaderBar />

      {/* Breadcrumb */}
      <div className="series-crumb">
        <Link href="/ceramics" className="series-crumb-back">← All series</Link>
        <span style={{ color: "var(--color-placeholder)", fontSize: 12 }}>/</span>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, color: "var(--color-ink)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {series.title}
        </span>
      </div>

      {/* Hero */}
      <section className="series-hero">
        {/* Left: lead image + thumbnail strip */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <button
            onClick={() => openAt(activeThumb)}
            aria-label="Open in lightbox"
            style={{ padding: 0, border: 0, background: "transparent", cursor: "zoom-in", borderRadius: 10, overflow: "hidden", position: "relative", aspectRatio: "1/1", display: "block", width: "100%" }}
          >
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <Image
                src={series.photos[activeThumb].src}
                alt={`${series.title}, piece ${activeThumb + 1}`}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </button>

          {series.photos.length > 1 && (
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(series.photos.length, 6)}, 1fr)`, gap: 8 }}>
              {series.photos.slice(0, 5).map((photo, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveThumb(i); openAt(i); }}
                  aria-label={`View piece ${i + 1}`}
                  style={{
                    padding: 0, border: 0, background: "transparent",
                    position: "relative", aspectRatio: "1/1",
                    borderRadius: 6, overflow: "hidden", cursor: "zoom-in",
                    outline: i === activeThumb ? "2px solid var(--color-ink)" : "1px solid var(--color-border)",
                    outlineOffset: i === activeThumb ? -2 : -1,
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={`${series.title}, piece ${i + 1}`}
                    fill
                    sizes="80px"
                    style={{ objectFit: "cover" }}
                  />
                </button>
              ))}
              {series.photos.length > 5 && (
                <a
                  href="#gallery"
                  style={{
                    aspectRatio: "1/1", background: "var(--color-surface)",
                    border: "1px solid var(--color-border)", borderRadius: 6,
                    display: "grid", placeItems: "center",
                    fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, color: "var(--color-ink-muted)",
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
            <span style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 10, color: "var(--color-ink-muted)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
              {series.year ? `Series · ${series.year}` : "Series"}
              {series.status === "in-progress" && <span style={{ color: "var(--color-coral)" }}> · In progress</span>}
            </span>
          )}
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(40px, 4vw, 56px)", lineHeight: 1, color: "var(--color-ink-true)", letterSpacing: "-0.025em", margin: 0 }}>
            {series.title}
          </h1>
          <span style={{ width: 36, height: 3, borderRadius: 2, background: "linear-gradient(90deg, var(--color-coral) 0%, var(--color-apricot) 100%)", display: "block" }} />
          {series.tagline && (
            <p style={{ fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.55, color: "var(--color-ink)", margin: "4px 0 8px" }}>
              {series.tagline}
            </p>
          )}

          <dl style={{ display: "flex", flexDirection: "column", margin: "16px 0 8px", padding: 0, borderTop: "1px solid var(--color-border)" }}>
            {metaRows.map(([dt, dd]) => (
              <div key={dt} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 16, padding: "12px 0", borderBottom: "1px solid var(--color-border)", alignItems: "baseline" }}>
                <dt style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 10, color: "var(--color-ink-muted)", textTransform: "uppercase", letterSpacing: "0.12em", margin: 0 }}>
                  {dt}
                </dt>
                <dd style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-ink)", margin: 0 }}>
                  {dd}
                </dd>
              </div>
            ))}
          </dl>

          <a
            href="#gallery"
            style={{
              alignSelf: "flex-start",
              background: "var(--color-ink)", color: "#FFFFFF", borderRadius: 10,
              fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13,
              textTransform: "uppercase", letterSpacing: "0.06em",
              padding: "14px 22px", textDecoration: "none", marginTop: 16, display: "inline-block",
            }}
          >
            View all {series.photos.length} pieces
          </a>
        </div>
      </section>

      {/* Description — only shown when longread is populated */}
      {series.longread.length > 0 && (
        <section className="series-description">
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 10, color: "var(--color-ink-muted)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
              About this series
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(24px, 3vw, 32px)", lineHeight: 1.05, color: "var(--color-ink-true)", letterSpacing: "-0.02em", margin: 0 }}>
              How it was made
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {series.longread.map((para, i) => (
              <p key={i} style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.7, color: "var(--color-ink)", margin: 0 }}>
                {para}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* Gallery */}
      <section id="gallery" className="series-gallery-section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24 }}>
          <div>
            <span style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 10, color: "var(--color-ink-muted)", textTransform: "uppercase", letterSpacing: "0.12em", display: "block", marginBottom: 6 }}>
              The complete set
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(24px, 3vw, 32px)", lineHeight: 1.05, color: "var(--color-ink-true)", letterSpacing: "-0.02em", margin: 0 }}>
              All {series.photos.length} pieces
            </h2>
          </div>
          <span style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 12, color: "var(--color-ink-muted)" }}>
            Click any piece to enlarge
          </span>
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
                  display: "block", borderRadius: 10, overflow: "hidden",
                  background: "var(--color-placeholder)", position: "relative", aspectRatio: "1/1", cursor: "zoom-in",
                }}
              >
                <Image
                  src={photo.src}
                  alt={`${series.title}, piece ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  style={{ objectFit: "cover", transition: "transform 300ms cubic-bezier(.2,.8,.2,1)" }}
                  className="gallery-img"
                />
              </a>
              <figcaption style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 10, color: "var(--color-ink-muted)", letterSpacing: "0.12em" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: CERAMICS_SERIES.map((s) => ({ params: { slug: s.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const series = CERAMICS_SERIES.find((s) => s.slug === params.slug);
  if (!series) return { notFound: true };
  return { props: {} };
}

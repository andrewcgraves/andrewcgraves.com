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
    <div style={{ background: "#FFFFFF", minHeight: "100vh" }}>
      <Head>
        <title>{series.title} — Ceramics — Andrew Graves</title>
        <meta name="description" content={series.tagline || `${series.title} — ceramics by Andrew Graves`} />
        <link rel="icon" href="/logo.png" />
      </Head>

      <UniversalHeaderBar />

      {/* Breadcrumb */}
      <div className="series-crumb">
        <Link href="/ceramics" className="series-crumb-back">← All series</Link>
        <span style={{ color: "#D9D9D9", fontSize: 12 }}>/</span>
        <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 12, color: "#121212", letterSpacing: "0.08em", textTransform: "uppercase" }}>
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
                    outline: i === activeThumb ? "2px solid #121212" : "1px solid #E5E5E5",
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
                    aspectRatio: "1/1", background: "#F4F4F5",
                    border: "1px solid #E5E5E5", borderRadius: 6,
                    display: "grid", placeItems: "center",
                    fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 13, color: "#4A4A4F",
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
            <span style={{ fontFamily: "'Open Sans', sans-serif", fontStyle: "italic", fontSize: 10, color: "#4A4A4F", textTransform: "uppercase", letterSpacing: "0.12em" }}>
              {series.year ? `Series · ${series.year}` : "Series"}
              {series.status === "in-progress" && <span style={{ color: "#E1665B" }}> · In progress</span>}
            </span>
          )}
          <h1 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "clamp(40px, 4vw, 56px)", lineHeight: 1, color: "#000", letterSpacing: "-0.025em", margin: 0 }}>
            {series.title}
          </h1>
          <span style={{ width: 36, height: 3, borderRadius: 2, background: "linear-gradient(90deg, #E1665B 0%, #EF9261 100%)", display: "block" }} />
          {series.tagline && (
            <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 18, lineHeight: 1.55, color: "#121212", margin: "4px 0 8px" }}>
              {series.tagline}
            </p>
          )}

          <dl style={{ display: "flex", flexDirection: "column", margin: "16px 0 8px", padding: 0, borderTop: "1px solid #E5E5E5" }}>
            {metaRows.map(([dt, dd]) => (
              <div key={dt} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 16, padding: "12px 0", borderBottom: "1px solid #E5E5E5", alignItems: "baseline" }}>
                <dt style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 10, color: "#4A4A4F", textTransform: "uppercase", letterSpacing: "0.12em", margin: 0 }}>
                  {dt}
                </dt>
                <dd style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 14, color: "#121212", margin: 0 }}>
                  {dd}
                </dd>
              </div>
            ))}
          </dl>

          <a
            href="#gallery"
            style={{
              alignSelf: "flex-start",
              background: "#121212", color: "#FFFFFF", borderRadius: 10,
              fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 13,
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
            <span style={{ fontFamily: "'Open Sans', sans-serif", fontStyle: "italic", fontSize: 10, color: "#4A4A4F", textTransform: "uppercase", letterSpacing: "0.12em" }}>
              About this series
            </span>
            <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "clamp(24px, 3vw, 32px)", lineHeight: 1.05, color: "#000", letterSpacing: "-0.02em", margin: 0 }}>
              How it was made
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {series.longread.map((para, i) => (
              <p key={i} style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 16, lineHeight: 1.7, color: "#121212", margin: 0 }}>
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
            <span style={{ fontFamily: "'Open Sans', sans-serif", fontStyle: "italic", fontSize: 10, color: "#4A4A4F", textTransform: "uppercase", letterSpacing: "0.12em", display: "block", marginBottom: 6 }}>
              The complete set
            </span>
            <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "clamp(24px, 3vw, 32px)", lineHeight: 1.05, color: "#000", letterSpacing: "-0.02em", margin: 0 }}>
              All {series.photos.length} pieces
            </h2>
          </div>
          <span style={{ fontFamily: "'Open Sans', sans-serif", fontStyle: "italic", fontSize: 12, color: "#4A4A4F" }}>
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
                  background: "#D9D9D9", position: "relative", aspectRatio: "1/1", cursor: "zoom-in",
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
                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 10, color: "#4A4A4F", letterSpacing: "0.12em" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <style>{`
        .series-crumb {
          display: flex; align-items: center; gap: 10px;
          padding: 20px 109px 0;
        }
        .series-crumb-back {
          font-family: Inter, sans-serif; font-weight: 700; font-size: 12px;
          color: #4A4A4F; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none;
        }
        .series-crumb-back:hover { color: #121212; }
        .series-hero {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
          gap: 64px;
          padding: 32px 109px 80px;
          align-items: start;
        }
        .series-description {
          padding: 56px 109px 80px;
          display: grid;
          grid-template-columns: minmax(0, 320px) minmax(0, 720px);
          gap: 64px;
          border-top: 1px solid #E5E5E5;
        }
        .series-gallery-section {
          padding: 56px 109px 96px;
          border-top: 1px solid #E5E5E5;
          display: flex; flex-direction: column; gap: 24px;
          scroll-margin-top: 80px;
        }
        .series-gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .gallery-img:hover { transform: scale(1.03); }

        @media (max-width: 900px) {
          .series-crumb { padding: 16px 20px 0; }
          .series-hero { grid-template-columns: 1fr; gap: 32px; padding: 24px 20px 48px; }
          .series-description { grid-template-columns: 1fr; gap: 24px; padding: 40px 20px 48px; }
          .series-gallery-section { padding: 40px 20px 64px; }
          .series-gallery-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
        }
      `}</style>
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

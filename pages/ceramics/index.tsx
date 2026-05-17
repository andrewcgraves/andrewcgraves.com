import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import UniversalHeaderBar from "../../src/Components/UniversalHeaderBar";
import { CERAMICS_SERIES } from "../../src/data/ceramics";

export default function CeramicsLanding() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const scrollTo = (i: number) => {
    const el = trackRef.current?.children[i] as HTMLElement | undefined;
    if (el)
      el.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest",
      });
    setActiveIdx(i);
  };

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    const onScroll = () => {
      const center = t.scrollLeft + t.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      Array.from(t.children).forEach((child, i) => {
        const el = child as HTMLElement;
        const mid = el.offsetLeft + el.clientWidth / 2;
        const d = Math.abs(mid - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActiveIdx(best);
    };
    t.addEventListener("scroll", onScroll, { passive: true });
    return () => t.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="page-shell">
      <Head>
        <title>Ceramics — Andrew Graves</title>
        <meta
          name="description"
          content="Ceramics work by Andrew Graves — stoneware and porcelain made at CSU Channel Islands."
        />
        <link rel="icon" href="/logo.png" />
      </Head>

      <UniversalHeaderBar />

      {/* Intro */}
      <div
        className="page-main"
        style={{ flex: "none", paddingBottom: 0, gap: 0 }}
      >
        <hgroup>
          <h1>Ceramics</h1>
          <p>
            Ceramics has become a big part of my life in the last few years. I
            teach and produce work with CSU Channel Islands, where I graduated.
          </p>
        </hgroup>
      </div>

      {/* Carousel */}
      <section style={{ paddingBottom: 96 }}>
        <div ref={trackRef} className="ceramics-track">
          {CERAMICS_SERIES.map((series, i) => (
            <article key={series.slug} className="ceramics-card">
              <Link
                href={`/ceramics/${series.slug}`}
                style={{ display: "block" }}
              >
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "4/5",
                    borderRadius: 10,
                    overflow: "hidden",
                    background: "var(--color-placeholder)",
                  }}
                >
                  <Image
                    src={series.photos[0].src}
                    alt={series.title}
                    fill
                    sizes="(max-width: 640px) 85vw, 380px"
                    style={{
                      objectFit: "cover",
                      transition: "transform 400ms cubic-bezier(.2,.8,.2,1)",
                    }}
                    className="ceramics-card-img"
                    priority={i === 0}
                  />
                  <span className="ceramics-card-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
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
                    {series.title}
                  </h2>
                  {series.year && (
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
                      {series.year}
                    </span>
                  )}
                </div>
                {series.material && (
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 12,
                      color: "var(--color-ink-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {series.material} · {series.photos.length} photos
                  </span>
                )}
                {series.tagline && (
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      lineHeight: 1.55,
                      color: "var(--color-ink)",
                      margin: 0,
                    }}
                  >
                    {series.tagline}
                  </p>
                )}
                <Link
                  href={`/ceramics/${series.slug}`}
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
                  View series →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Controls */}
        <div className="ceramics-controls">
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {CERAMICS_SERIES.map((s, i) => (
              <button
                key={s.slug}
                onClick={() => scrollTo(i)}
                aria-label={`Show ${s.title}`}
                style={{
                  width: i === activeIdx ? 32 : 8,
                  height: 8,
                  borderRadius: 999,
                  border: 0,
                  background:
                    i === activeIdx
                      ? "var(--color-ink)"
                      : "var(--color-placeholder)",
                  cursor: "pointer",
                  transition:
                    "width 280ms cubic-bezier(.2,.8,.2,1), background 200ms",
                  padding: 0,
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => scrollTo(Math.max(0, activeIdx - 1))}
              disabled={activeIdx === 0}
              aria-label="Previous series"
              className="ceramics-arrow"
              style={{ opacity: activeIdx === 0 ? 0.35 : 1 }}
            >
              ←
            </button>
            <button
              onClick={() =>
                scrollTo(Math.min(CERAMICS_SERIES.length - 1, activeIdx + 1))
              }
              disabled={activeIdx === CERAMICS_SERIES.length - 1}
              aria-label="Next series"
              className="ceramics-arrow"
              style={{
                opacity: activeIdx === CERAMICS_SERIES.length - 1 ? 0.35 : 1,
              }}
            >
              →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

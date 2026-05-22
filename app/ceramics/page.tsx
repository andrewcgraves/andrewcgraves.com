import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import UniversalHeaderBar from "../../src/Components/UniversalHeaderBar.jsx";
import { getAllSeries } from "../../src/lib/ceramics";

export const metadata: Metadata = {
  title: "Ceramics — Andrew Graves",
  description:
    "Ceramics work by Andrew Graves — stoneware and porcelain made at CSU Channel Islands.",
};

export default function CeramicsLanding() {
  const series = getAllSeries();
  return (
    <div className="page-shell">
      <UniversalHeaderBar />
      <div
        className="page-main"
        style={{ flex: "none", paddingBottom: 0, gap: 0, maxWidth: "none", margin: 0 }}
      >
        <hgroup>
          <h1>Ceramics</h1>
          <p>
            Ceramics has become a big part of my life in the last few years. I have served as an lab
            tech and teachers assistant at California State University Channel Islands since I
            graguated in 2023. It&apos;s such a beautiful place and its inspired me to continue
            working in clay.
          </p>
        </hgroup>
      </div>
      <section className="ceramics-grid-section">
        <div className="ceramics-grid">
          {series.map((s, i) => (
            <article key={s.slug} className="ceramics-card">
              <Link href={`/ceramics/${s.slug}`} style={{ display: "block" }}>
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
                    src={s.photos[0].src}
                    alt={s.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    className="ceramics-card-img"
                    priority={i < 3}
                  />
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
                    {s.title}
                  </h2>
                  {s.year && (
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
                      {s.year}
                    </span>
                  )}
                </div>
                {s.material && (
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 12,
                      color: "var(--color-ink-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {s.material} · {s.photos.length} photos
                  </span>
                )}
                {s.tagline && (
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      lineHeight: 1.55,
                      color: "var(--color-ink)",
                      margin: 0,
                    }}
                  >
                    {s.tagline}
                  </p>
                )}
                <Link
                  href={`/ceramics/${s.slug}`}
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
                  View series <span className="arrow-right">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

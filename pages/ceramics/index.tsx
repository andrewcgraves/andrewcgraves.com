import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import UniversalHeaderBar from "../../src/Components/UniversalHeaderBar";
import { CERAMICS_SERIES } from "../../src/data/ceramics";

export default function CeramicsLanding() {
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

      <div className="page-main" style={{ flex: "none", paddingBottom: 0, gap: 0 }}>
        <hgroup>
          <h1>Ceramics</h1>
          <p>
            Ceramics has become a big part of my life in the last few years. I
            teach and produce work with CSU Channel Islands, where I graduated.
          </p>
        </hgroup>
      </div>

      <section className="ceramics-grid-section">
        <div className="ceramics-grid">
          {CERAMICS_SERIES.map((series, i) => (
            <article key={series.slug} className="ceramics-card">
              <Link href={`/ceramics/${series.slug}`} style={{ display: "block" }}>
                <div style={{ position: "relative", aspectRatio: "4/5", borderRadius: 10, overflow: "hidden", background: "var(--color-placeholder)" }}>
                  <Image
                    src={series.photos[0].src}
                    alt={series.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: "cover", transition: "transform 400ms cubic-bezier(.2,.8,.2,1)" }}
                    className="ceramics-card-img"
                    priority={i < 3}
                  />
                  <span className="ceramics-card-num">{String(i + 1).padStart(2, "0")}</span>
                </div>
              </Link>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16 }}>
                  <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, lineHeight: 1, color: "var(--color-ink-true)", letterSpacing: "-0.01em", margin: 0 }}>
                    {series.title}
                  </h2>
                  {series.year && (
                    <span style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 12, color: "var(--color-ink-muted)", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
                      {series.year}
                    </span>
                  )}
                </div>
                {series.material && (
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--color-ink-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {series.material} · {series.photos.length} photos
                  </span>
                )}
                {series.tagline && (
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.55, color: "var(--color-ink)", margin: 0 }}>
                    {series.tagline}
                  </p>
                )}
                <Link
                  href={`/ceramics/${series.slug}`}
                  style={{ alignSelf: "flex-start", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, color: "var(--color-ink)", textDecoration: "underline", textUnderlineOffset: 3 }}
                >
                  View series →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

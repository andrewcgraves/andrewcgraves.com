import Head from "next/head";

export default function LogoDemo() {
  return (
    <>
      <Head>
        <title>Logo Hover — Mockups</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f4f4f5; font-family: Inter, system-ui, sans-serif; }

        .page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 48px;
          padding: 64px 32px;
        }

        .heading {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #4a4a4f;
        }

        .grid {
          display: flex;
          flex-wrap: wrap;
          gap: 40px;
          justify-content: center;
        }

        /* ── card shell ── */
        .card {
          background: #ffffff;
          border-radius: 16px;
          padding: 40px 32px 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          width: 180px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04);
        }
        .label {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: #4a4a4f;
          text-align: center;
          line-height: 1.4;
          text-transform: uppercase;
        }

        /* ── base logo ── */
        .logo {
          width: 44px;
          height: 44px;
          display: block;
        }

        /* ─────────────────────────────────────── */
        /* 1. COLOR INVERT → coral                 */
        /* ─────────────────────────────────────── */
        .logo-invert {
          border-radius: 11px;
          transition: filter 220ms cubic-bezier(0.2,0.8,0.2,1);
        }
        .card-invert:hover .logo-invert {
          filter: invert(1) sepia(1) saturate(3) hue-rotate(320deg) brightness(1.1);
        }

        /* ─────────────────────────────────────── */
        /* 2. FLOAT + SHADOW                       */
        /* ─────────────────────────────────────── */
        .logo-float {
          border-radius: 11px;
          transition:
            transform 240ms cubic-bezier(0.2,0.8,0.2,1),
            filter 240ms cubic-bezier(0.2,0.8,0.2,1);
        }
        .card-float:hover .logo-float {
          transform: translateY(-4px);
          filter: drop-shadow(0 8px 16px rgba(0,0,0,0.22));
        }

        /* ─────────────────────────────────────── */
        /* 3. SPRING SCALE                         */
        /* ─────────────────────────────────────── */
        @keyframes spring {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.13); }
          65%  { transform: scale(0.97); }
          80%  { transform: scale(1.05); }
          100% { transform: scale(1.04); }
        }
        .logo-spring {
          border-radius: 11px;
          will-change: transform;
        }
        .card-spring:hover .logo-spring {
          animation: spring 380ms cubic-bezier(0.2,0.8,0.2,1) forwards;
        }
        /* reset when unhover so it can re-trigger */
        .card-spring:not(:hover) .logo-spring {
          transform: scale(1);
          transition: transform 240ms cubic-bezier(0.2,0.8,0.2,1);
        }

        /* ─────────────────────────────────────── */
        /* 4. SPIN                                 */
        /* ─────────────────────────────────────── */
        @keyframes spin-once {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .logo-spin {
          border-radius: 11px;
          will-change: transform;
        }
        .card-spin:hover .logo-spin {
          animation: spin-once 500ms cubic-bezier(0.4,0,0.2,1) forwards;
        }
        .card-spin:not(:hover) .logo-spin {
          transition: transform 200ms ease;
        }

        /* ─────────────────────────────────────── */
        /* 5. CORAL FILL                           */
        /* ─────────────────────────────────────── */
        .logo-wrap-coral {
          position: relative;
          width: 44px;
          height: 44px;
          border-radius: 11px;
          overflow: hidden;
        }
        .logo-coral {
          display: block;
          width: 44px;
          height: 44px;
          position: relative;
          z-index: 1;
          transition: filter 240ms cubic-bezier(0.2,0.8,0.2,1);
        }
        .logo-wrap-coral::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #e1665b;
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 300ms cubic-bezier(0.2,0.8,0.2,1);
          z-index: 0;
          border-radius: 11px;
        }
        .card-coral:hover .logo-wrap-coral::before {
          transform: scaleY(1);
        }
        .card-coral:hover .logo-coral {
          filter: invert(1);
        }
      `}</style>

      <main className="page">
        <p className="heading">Logo hover — 5 options</p>

        <div className="grid">

          {/* 1 — Color invert to coral */}
          <div className="card card-invert">
            <img className="logo logo-invert" src="/website-large-dark.svg" alt="logo" />
            <span className="label">1 — Color invert</span>
          </div>

          {/* 2 — Float + shadow */}
          <div className="card card-float">
            <img className="logo logo-float" src="/website-large-dark.svg" alt="logo" />
            <span className="label">2 — Float + shadow</span>
          </div>

          {/* 3 — Spring scale */}
          <div className="card card-spring">
            <img className="logo logo-spring" src="/website-large-dark.svg" alt="logo" />
            <span className="label">3 — Spring scale</span>
          </div>

          {/* 4 — Spin */}
          <div className="card card-spin">
            <img className="logo logo-spin" src="/website-large-dark.svg" alt="logo" />
            <span className="label">4 — Spin</span>
          </div>

          {/* 5 — Coral fill sweep */}
          <div className="card card-coral">
            <div className="logo-wrap-coral">
              <img className="logo logo-coral" src="/website-large-dark.svg" alt="logo" />
            </div>
            <span className="label">5 — Coral fill</span>
          </div>

        </div>

        <p className="heading" style={{ color: '#9ca3af', fontWeight: 400, textTransform: 'none', letterSpacing: '0' }}>
          Hover each logo to preview
        </p>
      </main>
    </>
  );
}

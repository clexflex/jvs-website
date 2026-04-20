"use client";

export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;600;700;800;900&family=Barlow:wght@300;400;500&display=swap');

        *, *::before, *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          height: 100%;
          background: #07080a;
          overflow: hidden;
        }

        /* ─── Root ─── */
        .wip {
          min-height: 100vh;
          min-height: 100dvh;
          background: #07080a;
          color: #ede8db;
          font-family: 'Barlow', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        /* ─── Blueprint grid bg ─── */
        .wip__grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(198, 144, 30, 0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(198, 144, 30, 0.045) 1px, transparent 1px);
          background-size: 72px 72px;
          animation: gridDrift 28s linear infinite;
          pointer-events: none;
        }

        @keyframes gridDrift {
          from { background-position: 0 0; }
          to   { background-position: 72px 72px; }
        }

        /* ─── Diagonal line accents (construction sketch feel) ─── */
        .wip__diag {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          animation: fadeIn 1s ease forwards 2.2s;
        }

        /* ─── Top amber progress bar ─── */
        .wip__topbar {
          position: fixed;
          top: 0; left: 0;
          height: 2px;
          width: 0;
          background: linear-gradient(90deg, #b8760e, #e8a820, #b8760e);
          background-size: 200% 100%;
          animation: barGrow 2.4s cubic-bezier(.22,1,.36,1) forwards,
                     barShimmer 3s ease-in-out infinite 2.4s;
          z-index: 100;
        }

        @keyframes barGrow {
          to { width: 100%; }
        }

        @keyframes barShimmer {
          0%, 100% { background-position: 0% 0; }
          50%       { background-position: 100% 0; }
        }

        /* ─── Corner brackets ─── */
        .wip__corner {
          position: fixed;
          width: 36px;
          height: 36px;
          opacity: 0;
          animation: fadeIn .6s ease forwards;
        }

        .wip__corner--tl {
          top: 22px; left: 22px;
          border-top: 1px solid rgba(198,144,30,.35);
          border-left: 1px solid rgba(198,144,30,.35);
          animation-delay: 1.6s;
        }
        .wip__corner--tr {
          top: 22px; right: 22px;
          border-top: 1px solid rgba(198,144,30,.35);
          border-right: 1px solid rgba(198,144,30,.35);
          animation-delay: 1.7s;
        }
        .wip__corner--bl {
          bottom: 22px; left: 22px;
          border-bottom: 1px solid rgba(198,144,30,.35);
          border-left: 1px solid rgba(198,144,30,.35);
          animation-delay: 1.8s;
        }
        .wip__corner--br {
          bottom: 22px; right: 22px;
          border-bottom: 1px solid rgba(198,144,30,.35);
          border-right: 1px solid rgba(198,144,30,.35);
          animation-delay: 1.9s;
        }

        @keyframes fadeIn {
          to { opacity: 1; }
        }

        /* ─── Center content ─── */
        .wip__center {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 0 28px;
          max-width: 960px;
          width: 100%;
        }

        /* Tag */
        .wip__tag {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: #c8900e;
          margin-bottom: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          opacity: 0;
          animation: riseIn .7s ease forwards .4s;
        }

        .wip__tag::before,
        .wip__tag::after {
          content: '';
          display: block;
          width: 32px;
          height: 1px;
          background: rgba(200,144,14,.35);
        }

        /* Company name */
        .wip__name {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(68px, 13vw, 152px);
          font-weight: 900;
          line-height: .88;
          letter-spacing: -3px;
          text-transform: uppercase;
          color: #ede8db;
          opacity: 0;
          animation: riseIn .85s cubic-bezier(.22,1,.36,1) forwards .65s;
        }

        .wip__name em {
          font-style: normal;
          color: #c8900e;
        }

        /* Divider */
        .wip__divider {
          margin: 30px auto;
          height: 1px;
          width: 0;
          background: rgba(198,144,30,.28);
          animation: expandLine 1s ease forwards 1.2s;
        }

        @keyframes expandLine {
          to { width: min(320px, 80%); }
        }

        /* Sub-message */
        .wip__msg {
          font-size: clamp(13px, 1.8vw, 16px);
          font-weight: 300;
          letter-spacing: .3px;
          color: rgba(237,232,219,.42);
          line-height: 1.75;
          margin-bottom: 44px;
          opacity: 0;
          animation: riseIn .7s ease forwards 1.4s;
        }

        /* Progress */
        .wip__progress-wrap {
          max-width: 400px;
          margin: 0 auto;
          opacity: 0;
          animation: fadeIn .5s ease forwards 1.7s;
        }

        .wip__progress-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .wip__progress-label {
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(237,232,219,.28);
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .wip__dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #c8900e;
          flex-shrink: 0;
          animation: blink 2s ease-in-out infinite 2s;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: .2; }
        }

        .wip__progress-pct {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px;
          letter-spacing: 2px;
          color: #c8900e;
          font-weight: 600;
        }

        .wip__track {
          height: 1px;
          background: rgba(255,255,255,.07);
          position: relative;
        }

        .wip__fill {
          position: absolute;
          top: 0; left: 0;
          height: 100%;
          width: 0;
          background: linear-gradient(90deg, #9a6608, #e8a820);
          animation: fillBar 2.8s cubic-bezier(.4,0,.2,1) forwards 2s;
        }

        @keyframes fillBar {
          to { width: 68%; }
        }

        @keyframes riseIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ─── Builder credit ─── */
        .wip__credit {
          position: fixed;
          bottom: 26px; right: 28px;
          display: flex;
          align-items: center;
          gap: 7px;
          text-decoration: none;
          opacity: 0;
          animation: fadeIn .8s ease forwards 2.8s;
          transition: opacity .3s;
        }

        .wip__credit:hover {
          opacity: .85 !important;
        }

        .wip__credit-by {
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(237,232,219,.2);
        }

        .wip__credit-sep {
          width: 1px;
          height: 10px;
          background: rgba(237,232,219,.12);
        }

        .wip__credit-brand {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(200,144,14,.55);
          transition: color .3s;
        }

        .wip__credit:hover .wip__credit-brand {
          color: #c8900e;
        }

        /* ─── Responsive ─── */
        @media (max-width: 480px) {
          .wip__corner { width: 24px; height: 24px; }
          .wip__corner--tl, .wip__corner--tr { top: 16px; }
          .wip__corner--bl, .wip__corner--br { bottom: 16px; }
          .wip__corner--tl, .wip__corner--bl { left: 16px; }
          .wip__corner--tr, .wip__corner--br { right: 16px; }
          .wip__credit { bottom: 18px; right: 16px; }
          .wip__center { padding: 0 20px; }
        }

        @media (max-width: 360px) {
          .wip__name { letter-spacing: -1px; }
        }
      `}</style>

      <div className="wip">

        {/* Blueprint grid */}
        <div className="wip__grid" />

        {/* Diagonal architectural lines */}
        <svg className="wip__diag" aria-hidden="true" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
             style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}>
          <line x1="-100" y1="900" x2="600" y2="-100" stroke="rgba(198,144,30,0.04)" strokeWidth="1" />
          <line x1="300"  y1="900" x2="1000" y2="-100" stroke="rgba(198,144,30,0.03)" strokeWidth="1" />
          <line x1="800"  y1="900" x2="1540" y2="-100" stroke="rgba(198,144,30,0.04)" strokeWidth="1" />
          <line x1="1100" y1="900" x2="1800" y2="-100" stroke="rgba(198,144,30,0.025)" strokeWidth="1" />
          <line x1="-200" y1="700" x2="400"  y2="-100" stroke="rgba(198,144,30,0.025)" strokeWidth="1" />
        </svg>

        {/* Top loading bar */}
        <div className="wip__topbar" />

        {/* Corner brackets */}
        <div className="wip__corner wip__corner--tl" />
        <div className="wip__corner wip__corner--tr" />
        <div className="wip__corner wip__corner--bl" />
        <div className="wip__corner wip__corner--br" />

        {/* Main content */}
        <div className="wip__center">
          <p className="wip__tag">New Digital Presence</p>

          <h1 className="wip__name">
            JVS<br />
            <em>Enterprises</em>
          </h1>

          <div className="wip__divider" />

          <p className="wip__msg">
            Our new website is under active development.<br />
            Something built with precision is on its way.
          </p>

          <div className="wip__progress-wrap">
            <div className="wip__progress-meta">
              <span className="wip__progress-label">
                <span className="wip__dot" />
                Development in progress
              </span>
              <span className="wip__progress-pct">68%</span>
            </div>
            <div className="wip__track">
              <div className="wip__fill" />
            </div>
          </div>
        </div>

        {/* Builder credit */}
        <a
          href="https://www.fatmangosolutions.com"
          target="_blank"
          rel="noopener noreferrer"
          className="wip__credit"
          aria-label="Built by Fat Mango Solutions"
        >
          <span className="wip__credit-by">Built by</span>
          <div className="wip__credit-sep" />
          <span className="wip__credit-brand">Fat Mango Solutions</span>
        </a>

      </div>
    </>
  );
}
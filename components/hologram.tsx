"use client";

import { useEffect, useState } from "react";
import Photo from "./photo";

type Frame = {
  label: string;
  src: string;
  alt: string;
  caption: string;
};

/** One projection per role, each with a photo of that role being done. */
const frames: Frame[] = [
  {
    label: "BUILDER",
    src: "/images/shades/makerspace.jpg",
    alt: "In a makerspace beside a 3D printer and a pegboard of tools",
    caption: "makerspace, mid-build",
  },
  {
    label: "SPEAKER",
    src: "/images/shades/tedx-letters.jpg",
    alt: "On the TEDx stage behind the letters",
    caption: "TEDx stage",
  },
  {
    label: "FOUNDER",
    src: "/images/shades/strategist.jpg",
    alt: "In a blazer, dressed for a business meeting",
    caption: "before a pitch",
  },
  {
    label: "RESEARCHER",
    src: "/images/gallery/ms-whiteboard.jpg",
    alt: "Working through a diagram at a whiteboard",
    caption: "whiteboard, working it out",
  },
];

const HOLD = 3600;

export default function Hologram() {
  const [i, setI] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced || paused) return;
    const t = setTimeout(() => setI((n) => (n + 1) % frames.length), HOLD);
    return () => clearTimeout(t);
  }, [i, reduced, paused]);

  // Reduced motion gets all four at once, flat, with no cycling.
  if (reduced) {
    return (
      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
        <p className="eyebrow">The projections</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {frames.map((f) => (
            <figure key={f.label} className="panel overflow-hidden">
              <div className="relative aspect-[4/3] w-full">
                <Photo src={f.src} alt={f.alt} hint={f.label} sizes="22rem" />
              </div>
              <figcaption className="p-4">
                <p
                  className="font-display text-lg font-semibold tracking-wider"
                  style={{ color: "var(--text)" }}
                >
                  {f.label}
                </p>
                <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                  {f.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="relative mx-auto mt-24 max-w-5xl px-4 sm:px-6">
      <div className="text-center">
        <p className="eyebrow">The projections</p>
        <h2
          className="font-display mt-3 text-3xl font-semibold sm:text-4xl"
          style={{ color: "var(--text)" }}
        >
          Four modes, one person.
        </h2>
      </div>

      <div
        className="holo-stage relative mx-auto mt-10"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
      >
        {/* emitter beams rising from the base */}
        <div className="holo-beams" aria-hidden />

        <div className="holo-deck">
          {frames.map((f, idx) => {
            const active = idx === i;
            return (
              <figure
                key={f.label}
                className="holo-card"
                aria-hidden={!active}
                style={{
                  opacity: active ? 1 : 0,
                  transform: active
                    ? "translate(-50%, 0) rotateX(6deg) rotateY(-7deg) translateZ(0) scale(1)"
                    : "translate(-50%, 42px) rotateX(26deg) rotateY(-7deg) translateZ(-180px) scale(0.86)",
                  pointerEvents: active ? "auto" : "none",
                  // Fully transparent cards are still painted and
                  // composited every frame; dropping them out of
                  // rendering once the exit finishes keeps only the
                  // visible projection on the compositor.
                  visibility: active ? "visible" : "hidden",
                  transition: active
                    ? "opacity 0.6s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1), visibility 0s"
                    : "opacity 0.6s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1), visibility 0s linear 0.9s",
                }}
              >
                <div className="holo-frame scanline relative">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Photo
                      src={f.src}
                      alt={f.alt}
                      hint={f.label}
                      sizes="(max-width: 640px) 86vw, 30rem"
                      priority={idx === 0}
                    />
                    <span className="holo-tint" aria-hidden />
                  </div>

                  <figcaption className="relative px-5 pb-5 pt-4">
                    <p className="holo-label font-display">{f.label}</p>
                    <p
                      className="mt-1 text-xs tracking-wide"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {f.caption}
                    </p>
                  </figcaption>

                  <span className="holo-corner holo-corner-tl" aria-hidden />
                  <span className="holo-corner holo-corner-tr" aria-hidden />
                  <span className="holo-corner holo-corner-bl" aria-hidden />
                  <span className="holo-corner holo-corner-br" aria-hidden />
                </div>
              </figure>
            );
          })}
        </div>

        {/* glowing plate the projection stands on */}
        <div className="holo-base" aria-hidden />
      </div>

      {/* role switcher */}
      <div className="mt-8 flex flex-wrap justify-center gap-2.5">
        {frames.map((f, idx) => (
          <button
            key={f.label}
            type="button"
            onClick={() => setI(idx)}
            className="pill"
            aria-pressed={idx === i}
            style={{
              cursor: "pointer",
              color: idx === i ? "var(--bg)" : "var(--text-muted)",
              background: idx === i ? "var(--accent)" : "var(--surface)",
              borderColor: idx === i ? "var(--accent)" : "var(--border)",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Photo from "./photo";

type Frame = {
  label: string;
  src: string;
  alt: string;
  caption: string;
};

/** One projection per facet, each with a photo of that facet in action. */
const frames: Frame[] = [
  {
    label: "FOUNDER",
    src: "/images/gallery/hero-portrait.jpg",
    alt: "Sathvika Nivasini against a brick wall",
    caption: "same girl… bigger dreams",
  },
  {
    label: "MAKER",
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
    label: "MUSICIAN",
    src: "/images/shades/veena.jpg",
    alt: "Playing the veena, seated on the floor",
    caption: "Carnatic vocalist & veena player",
  },
  {
    label: "FIGHTER",
    src: "/images/shades/taekwondo.jpg",
    alt: "Mid-kick during a taekwondo class",
    caption: "taekwondo",
  },
  {
    label: "INTERN",
    src: "/images/shades/microsoft-desk.jpg",
    alt: "At a Microsoft office wearing an intern badge",
    caption: "a year with Microsoft CLICK",
  },
  {
    label: "STRATEGIST",
    src: "/images/shades/strategist.jpg",
    alt: "In a blazer, dressed for a business meeting",
    caption: "before a pitch",
  },
];

const HOLD = 3800;
/** Motes drifting up through the light cone. */
const MOTES = [8, 24, 38, 52, 66, 79, 92];

export default function Hologram({ compact = false }: { compact?: boolean }) {
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

  // Reduced motion gets all of them at once, flat, with no projection.
  if (reduced) {
    return (
      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
        <p className="eyebrow">Off the résumé</p>
        <h2
          className="font-display mt-3 text-3xl font-semibold sm:text-4xl"
          style={{ color: "var(--text)" }}
        >
          Different shades of me.
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                <p
                  className="mt-1 text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
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
    <section className={`relative mx-auto max-w-5xl ${compact ? "" : "mt-24 px-4 sm:px-6"}`}>
      {!compact && (
        <div className="text-center">
          <p className="eyebrow">Off the résumé</p>
          <h2
            className="font-display mt-3 text-3xl font-semibold sm:text-4xl"
            style={{ color: "var(--text)" }}
          >
            Different shades of me.
          </h2>
          <p className="lede mx-auto mt-3 max-w-md">
            Same person, different rooms.
          </p>
        </div>
      )}

      <div
        className={`holo-stage relative mx-auto ${compact ? "holo-stage--compact mt-2" : "mt-12"}`}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
      >
        {/* volumetric cone from the emitter */}
        <div className="holo-beams" aria-hidden>
          <span className="holo-beam-shimmer" />
        </div>

        {/* motes drifting up through the beam */}
        <div className="holo-motes" aria-hidden>
          {MOTES.map((left, n) => (
            <span
              key={left}
              style={{
                left: `${left}%`,
                animationDelay: `${n * 1.1}s`,
                animationDuration: `${6 + (n % 4)}s`,
              }}
            />
          ))}
        </div>

        <div className="holo-deck">
          {frames.map((f, idx) => {
            const active = idx === i;
            return (
              <figure
                key={f.label}
                className={`holo-card ${active ? "is-live" : ""}`}
                aria-hidden={!active}
                style={{
                  opacity: active ? 1 : 0,
                  transform: active
                    ? "translate(-50%, 0) rotateX(7deg) rotateY(-8deg) scale(1)"
                    : "translate(-50%, 46px) rotateX(28deg) rotateY(-8deg) translateZ(-200px) scale(0.84)",
                  pointerEvents: active ? "auto" : "none",
                  // Transparent cards are still painted every frame, so
                  // they leave rendering once their exit finishes.
                  visibility: active ? "visible" : "hidden",
                  transition: active
                    ? "opacity 0.55s ease, transform 0.95s cubic-bezier(0.22,1,0.36,1), visibility 0s"
                    : "opacity 0.55s ease, transform 0.95s cubic-bezier(0.22,1,0.36,1), visibility 0s linear 0.95s",
                }}
              >
                <div className="holo-frame relative">
                  <div className="holo-media relative aspect-[4/3] w-full overflow-hidden">
                    <Photo
                      src={f.src}
                      alt={f.alt}
                      hint={f.label}
                      sizes="(max-width: 640px) 86vw, 30rem"
                      priority={idx === 0}
                    />
                    {/* cyan cast, so it reads as light rather than print */}
                    <span className="holo-tint" aria-hidden />
                    {/* red/cyan ghosts offset a hair either way */}
                    <span className="holo-ghost holo-ghost-r" aria-hidden />
                    <span className="holo-ghost holo-ghost-c" aria-hidden />
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

                  {/* fine interlace over the whole pane */}
                  <span className="holo-scanlines" aria-hidden />
                  {/* bright band sweeping down */}
                  <span className="holo-sweep" aria-hidden />

                  <span className="holo-corner holo-corner-tl" aria-hidden />
                  <span className="holo-corner holo-corner-tr" aria-hidden />
                  <span className="holo-corner holo-corner-bl" aria-hidden />
                  <span className="holo-corner holo-corner-br" aria-hidden />
                </div>
              </figure>
            );
          })}
        </div>

        <div className="holo-base" aria-hidden />
        <div className="holo-base-ring" aria-hidden />
      </div>

      <div className={`flex flex-wrap justify-center gap-2 ${compact ? "mt-7" : "mt-10"}`}>
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

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { pillars, projects, type PillarId } from "@/lib/content";

/** Hand-placed so the figure reads as a constellation rather than a scatter. */
const nodePos: Record<string, { x: number; y: number }> = {
  vakshala: { x: 54, y: 31 },
  cctia: { x: 70, y: 47 },
  nirvband: { x: 48, y: 63 },
  photobioreactor: { x: 24, y: 50 },
  "top-the-graph": { x: 39, y: 44 },
};

type Props = {
  active: PillarId | null;
  onSelect: (p: PillarId | null) => void;
};

export default function Constellation({ active, onSelect }: Props) {
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);
  const [drawn, setDrawn] = useState(false);

  // Let the lines draw themselves in once, just after mount.
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 180);
    return () => clearTimeout(t);
  }, []);

  const focus = active;
  const isLit = (slug: string) => {
    const p = projects.find((x) => x.slug === slug)!;
    return !focus || p.pillars.includes(focus);
  };

  const activePillar = pillars.find((p) => p.id === focus);

  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 100 100"
        className="h-auto w-full overflow-visible"
        role="group"
        aria-label="Interactive constellation of interests and projects"
      >
        <defs>
          <radialGradient id="nodeGlow">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="coreGlow">
            <stop offset="0%" stopColor="var(--accent-warm)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--accent-warm)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* soft centre halo */}
        <circle cx="50" cy="47" r="30" fill="url(#coreGlow)" />

        {/* edges: each project links to every pillar it belongs to */}
        <g>
          {projects.flatMap((proj) => {
            const from = nodePos[proj.slug];
            if (!from) return [];
            return proj.pillars.map((pid) => {
              const to = pillars.find((p) => p.id === pid)!;
              const lit =
                isLit(proj.slug) && (!focus || pid === focus);
              return (
                <line
                  key={`${proj.slug}-${pid}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="var(--accent)"
                  strokeWidth={lit ? 0.32 : 0.16}
                  strokeOpacity={lit ? 0.5 : 0.12}
                  strokeDasharray="60"
                  strokeDashoffset={drawn ? 0 : 60}
                  style={{
                    transition:
                      "stroke-dashoffset 1.6s ease-out, stroke-opacity 0.45s ease, stroke-width 0.45s ease",
                  }}
                />
              );
            });
          })}
        </g>

        {/* project nodes */}
        {projects.map((proj) => {
          const pos = nodePos[proj.slug];
          if (!pos) return null;
          const lit = isLit(proj.slug);
          const isHover = hovered === proj.slug;
          return (
            <g
              key={proj.slug}
              transform={`translate(${pos.x} ${pos.y})`}
              onMouseEnter={() => setHovered(proj.slug)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => router.push(`/projects/${proj.slug}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push(`/projects/${proj.slug}`);
                }
              }}
              role="link"
              tabIndex={0}
              aria-label={`${proj.name} — ${proj.tagline}`}
              style={{
                cursor: "pointer",
                opacity: lit ? 1 : 0.25,
                transition: "opacity 0.45s ease",
                outline: "none",
              }}
            >
              <circle r="5" fill="transparent" />
              {isHover && <circle r="3.4" fill="url(#nodeGlow)" />}
              <circle
                r={isHover ? 1.5 : 1.1}
                fill="var(--accent-warm)"
                style={{ transition: "r 0.3s ease" }}
              />
              <text
                y="-2.9"
                textAnchor="middle"
                fill="var(--text)"
                style={{
                  fontSize: "2.5px",
                  fontFamily: "var(--font-sans)",
                  letterSpacing: "0.02em",
                  opacity: isHover || !focus ? 0.9 : 0.55,
                  transition: "opacity 0.3s ease",
                  pointerEvents: "none",
                }}
              >
                {proj.shortName ?? proj.name}
              </text>
            </g>
          );
        })}

        {/* pillar nodes */}
        {pillars.map((p) => {
          const on = focus === p.id;
          return (
            <g
              key={p.id}
              transform={`translate(${p.x} ${p.y})`}
              onClick={() => onSelect(on ? null : p.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(on ? null : p.id);
                }
              }}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              aria-label={`Filter by ${p.label}`}
              style={{ cursor: "pointer", outline: "none" }}
            >
              <circle r="9" fill="transparent" />
              <circle r="7" fill="url(#nodeGlow)" opacity={on ? 1 : 0.35} />
              <circle
                r={on ? 3.2 : 2.6}
                fill="var(--bg)"
                stroke="var(--accent)"
                strokeWidth={on ? 0.7 : 0.4}
                style={{ transition: "r 0.35s ease, stroke-width 0.35s ease" }}
              />
              <circle r={on ? 1.3 : 0.9} fill="var(--accent)" />
              <text
                y={p.y > 50 ? 7.4 : -5.2}
                textAnchor="middle"
                fill={on ? "var(--text)" : "var(--text-muted)"}
                style={{
                  fontSize: "3.1px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  transition: "fill 0.35s ease",
                  pointerEvents: "none",
                }}
              >
                {p.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* caption under the figure */}
      <div className="mt-4 min-h-[3.5rem] text-center">
        {activePillar ? (
          <p
            className="mx-auto max-w-sm text-sm leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            <span style={{ color: "var(--accent)" }}>{activePillar.label}.</span>{" "}
            {activePillar.blurb}
          </p>
        ) : (
          <p className="margin-note">
            Tap a star — the work connected to it lights up.
          </p>
        )}
      </div>
    </div>
  );
}

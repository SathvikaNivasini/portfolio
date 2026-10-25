"use client";

import { useState } from "react";
import Link from "next/link";
import Constellation from "./constellation";
import ProjectCard from "./project-card";
import { pillars, projects, type PillarId } from "@/lib/content";

/**
 * The interactive half of the home page: the constellation and the
 * project grid it filters.
 */
export default function HomeClient() {
  const [active, setActive] = useState<PillarId | null>(null);

  return (
    <>
      <section
        className="relative mx-auto mt-10 max-w-5xl px-4 sm:px-6"
        aria-labelledby="constellation-heading"
      >
        <div className="text-center">
          <p className="eyebrow">The living constellation</p>
          <h2
            id="constellation-heading"
            className="font-display mx-auto mt-3 max-w-xl text-3xl font-semibold sm:text-4xl"
            style={{ color: "var(--text)" }}
          >
            Four interests. One system.
          </h2>
          <p className="lede mx-auto mt-4 max-w-lg">
            Technology, communication, health and entrepreneurship are not
            separate columns on a résumé. They are the same instinct pointed at
            different problems.
          </p>
        </div>

        <div className="relative mx-auto mt-8 max-w-2xl">
          <Constellation active={active} onSelect={setActive} />
        </div>
      </section>

      <section
        id="work"
        className="mx-auto mt-28 max-w-6xl px-4 sm:px-6"
        aria-labelledby="work-heading"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">02 — The invention lab</p>
            <h2
              id="work-heading"
              className="font-display mt-3 text-4xl font-semibold sm:text-5xl"
              style={{ color: "var(--text)" }}
            >
              What I&apos;ve <span className="underline-sketch">built</span>
            </h2>
            <p className="lede mt-5 max-w-lg">
              Five projects across education, mental health, sustainability and
              school infrastructure. Each one opens into a full case study —
              including the parts that did not work.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActive(null)}
              className="pill"
              style={{
                color: active === null ? "var(--bg)" : "var(--text-muted)",
                background: active === null ? "var(--accent)" : "var(--surface)",
                borderColor: active === null ? "var(--accent)" : "var(--border)",
                cursor: "pointer",
              }}
            >
              All
            </button>
            {pillars.map((p) => {
              const on = active === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActive(on ? null : p.id)}
                  className="pill"
                  style={{
                    color: on ? "var(--bg)" : "var(--text-muted)",
                    background: on ? "var(--accent)" : "var(--surface)",
                    borderColor: on ? "var(--accent)" : "var(--border)",
                    cursor: "pointer",
                  }}
                  aria-pressed={on}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard
              key={p.slug}
              project={p}
              dimmed={!!active && !p.pillars.includes(active)}
            />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/projects"
            className="panel panel-hover rounded-full px-6 py-3 text-sm font-medium"
            style={{ color: "var(--text)" }}
          >
            Every project, in depth →
          </Link>
        </div>
      </section>
    </>
  );
}

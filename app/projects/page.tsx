import type { Metadata } from "next";
import ProjectCard from "@/components/project-card";
import Reveal from "@/components/reveal";
import Starfield from "@/components/starfield";
import { projects, statusLabel } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Lab",
  description:
    "Five projects across education, mental health, sustainability and school infrastructure — each with a full case study.",
};

const order = ["live", "building", "research", "archive"] as const;

export default function ProjectsPage() {
  return (
    <div className="px-4 pb-10 pt-32 sm:px-6">
      <section className="relative mx-auto max-w-6xl">
        <Starfield count={45} />
        <Reveal>
          <p className="eyebrow">02 — The invention lab</p>
          <h1
            className="font-display mt-3 text-[clamp(2.4rem,6vw,3.8rem)] font-semibold leading-[1.05]"
            style={{ color: "var(--text)" }}
          >
            Everything I&apos;ve built,
            <br />
            including what broke.
          </h1>
          <p className="lede mt-6 max-w-2xl">
            Each project opens into a full case study: the problem, the
            decisions, the architecture, the failures, where it stands, and what
            I&apos;d do next. Every project is marked with how finished it
            actually is, because most of them are still in progress.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {order.map((s) => (
              <span key={s} className="pill">
                {statusLabel[s]} ·{" "}
                {projects.filter((p) => p.status === s).length}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

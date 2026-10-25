import Link from "next/link";
import Photo from "./photo";
import { statusLabel, type Project } from "@/lib/content";

const pillClass: Record<Project["status"], string> = {
  live: "pill-live",
  building: "pill-building",
  research: "pill-research",
  archive: "pill-archive",
};

export default function ProjectCard({
  project,
  dimmed = false,
}: {
  project: Project;
  dimmed?: boolean;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="panel panel-hover group flex flex-col overflow-hidden"
      style={{
        opacity: dimmed ? 0.32 : 1,
        transition: "opacity 0.45s ease, transform 0.35s ease, border-color 0.35s ease",
      }}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Photo
          src={project.cover}
          alt={`${project.name} — ${project.tagline}`}
          hint={`${project.name} cover`}
          className="h-full w-full transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, color-mix(in srgb, var(--bg) 85%, transparent), transparent 55%)",
          }}
        />
        <span className={`pill ${pillClass[project.status]} absolute left-3 top-3`}>
          <span className="pill-dot" />
          {statusLabel[project.status]}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3
            className="font-display text-xl font-semibold"
            style={{ color: "var(--text)" }}
          >
            {project.name}
          </h3>
          <span className="text-xs" style={{ color: "var(--text-faint)" }}>
            {project.years}
          </span>
        </div>

        <p className="text-sm" style={{ color: "var(--accent)" }}>
          {project.role}
        </p>

        <p
          className="flex-1 text-sm leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          {project.summary}
        </p>

        <span
          className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium transition-transform duration-300 group-hover:translate-x-1"
          style={{ color: "var(--text)" }}
        >
          Read the case study
          <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Photo from "@/components/photo";
import PhotoWall from "@/components/photo-wall";
import Reveal from "@/components/reveal";
import Starfield from "@/components/starfield";
import {
  getProject,
  pillars,
  projects,
  statusLabel,
  type Project,
} from "@/lib/content";

const pillClass: Record<Project["status"], string> = {
  live: "pill-live",
  building: "pill-building",
  research: "pill-research",
  archive: "pill-archive",
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.name,
    description: project.tagline,
    openGraph: { title: project.name, description: project.tagline },
  };
}

/** A titled block of the case study. */
function Section({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <section className="mt-16">
        <div className="flex items-baseline gap-4">
          <span
            className="font-display text-sm"
            style={{ color: "var(--accent)" }}
          >
            {n}
          </span>
          <h2
            className="font-display text-2xl font-semibold sm:text-3xl"
            style={{ color: "var(--text)" }}
          >
            {title}
          </h2>
        </div>
        <div className="hairline mt-4" />
        <div className="mt-6">{children}</div>
      </section>
    </Reveal>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const liveLinks = project.links.filter((l) => l.href);

  return (
    <article>
      {/* ---------- hero ---------- */}
      <header className="relative overflow-hidden px-4 pb-10 pt-32 sm:px-6">
        <Starfield count={50} />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96"
          style={{
            background:
              "radial-gradient(ellipse 55% 100% at 50% 0%, var(--accent-glow), transparent 70%)",
          }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-4xl">
          <Link
            href="/projects"
            className="text-sm transition-opacity hover:opacity-70"
            style={{ color: "var(--text-muted)" }}
          >
            ← The lab
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <span className={`pill ${pillClass[project.status]}`}>
              <span className="pill-dot" />
              {statusLabel[project.status]}
            </span>
            {project.pillars.map((pid) => (
              <span key={pid} className="pill">
                {pillars.find((p) => p.id === pid)?.label}
              </span>
            ))}
          </div>

          <h1
            className="font-display mt-5 text-[clamp(2.4rem,6vw,3.8rem)] font-semibold leading-[1.05]"
            style={{ color: "var(--text)" }}
          >
            {project.name}
          </h1>

          <p
            className="font-display mt-4 max-w-2xl text-xl leading-snug sm:text-2xl"
            style={{ color: "var(--accent-warm)" }}
          >
            {project.tagline}
          </p>

          <div
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            <span>{project.role}</span>
            <span aria-hidden>·</span>
            <span>{project.years}</span>
          </div>

          {liveLinks.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-3">
              {liveLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-85"
                  style={{ background: "var(--accent)", color: "var(--bg)" }}
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* ---------- cover ---------- */}
      <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6">
        <Reveal>
          <div
            className="relative aspect-[16/8] w-full overflow-hidden rounded-2xl"
            style={{ border: "1px solid var(--border)" }}
          >
            <Photo
              src={project.cover}
              alt={`${project.name} cover image`}
              hint={`${project.name} — wide cover image (16:8)`}
              priority
              sizes="(max-width: 1024px) 100vw, 64rem"
            />
          </div>
        </Reveal>
      </div>

      {/* ---------- stats ---------- */}
      <div className="mx-auto mt-10 max-w-4xl px-4 sm:px-6">
        <Reveal>
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {project.stats.map((s) => (
              <div key={s.label} className="panel p-5">
                <dt
                  className="font-display text-2xl font-semibold leading-none sm:text-3xl"
                  style={{ color: "var(--accent)" }}
                >
                  {s.value}
                </dt>
                <dd
                  className="mt-2.5 text-xs leading-snug"
                  style={{ color: "var(--text-muted)" }}
                >
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      {/* ---------- body ---------- */}
      <div className="mx-auto max-w-3xl px-4 pb-10 sm:px-6">
        <Section n="01" title="The problem">
          <div className="prose-case">
            {project.problem.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Section>

        <Section n="02" title="The decisions I made">
          <div className="space-y-4">
            {project.decisions.map((d) => (
              <div key={d.title} className="panel p-6">
                <h3
                  className="font-display text-lg font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  {d.title}
                </h3>
                <p
                  className="mt-2.5 text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section n="03" title="How it's built">
          <div className="space-y-4">
            {project.architecture.map((a) => (
              <div
                key={a.title}
                className="border-l-2 pl-5"
                style={{ borderColor: "var(--border-strong)" }}
              >
                <h3
                  className="font-display text-lg font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  {a.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {a.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-md px-2.5 py-1 text-xs"
                style={{
                  background: "var(--surface)",
                  color: "var(--text-muted)",
                  border: "1px solid var(--border)",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </Section>

        {project.gallery && project.gallery.length > 0 && (
          <Reveal>
            <div className="mt-12">
              <PhotoWall
                items={project.gallery}
                columns={
                  project.gallery.length === 1
                    ? "columns-1 max-w-sm"
                    : "columns-2"
                }
              />
            </div>
          </Reveal>
        )}

        <Section n="04" title="What went wrong">
          <p className="margin-note mb-5">
            the part most portfolios leave out ↓
          </p>
          <ul className="space-y-4">
            {project.failures.map((f, i) => (
              <li
                key={i}
                className="panel p-6"
                style={{
                  borderColor: "color-mix(in srgb, var(--accent-warm) 30%, transparent)",
                }}
              >
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {f}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section n="05" title="Where it stands">
          <ul className="space-y-3">
            {project.results.map((r, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: "var(--accent)" }}
                  aria-hidden
                />
                <span
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {r}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section n="06" title="What I'd do next">
          <ul className="space-y-3">
            {project.next.map((n, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: "var(--accent-warm)" }}
                  aria-hidden
                />
                <span
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {n}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        {/* living portfolio — dated updates */}
        <Section n="07" title="Updates">
          <ol className="relative space-y-5 pl-6">
            <span
              className="absolute bottom-2 left-[3px] top-2 w-px"
              style={{ background: "var(--border-strong)" }}
              aria-hidden
            />
            {project.updates.map((u, i) => (
              <li key={i} className="relative">
                <span
                  className="absolute -left-[21px] top-1.5 h-[7px] w-[7px] rounded-full"
                  style={{
                    background: i === 0 ? "var(--accent)" : "var(--surface-solid)",
                    border: "1px solid var(--border-strong)",
                  }}
                  aria-hidden
                />
                <p className="eyebrow">{u.date}</p>
                <p
                  className="mt-1 text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {u.note}
                </p>
              </li>
            ))}
          </ol>
        </Section>
      </div>

      {/* ---------- next project ---------- */}
      <div className="mx-auto max-w-3xl px-4 pb-8 sm:px-6">
        <div className="hairline mb-8" />
        <Link
          href={`/projects/${next.slug}`}
          className="panel panel-hover flex items-center justify-between gap-6 p-7"
        >
          <div>
            <p className="eyebrow">Next project</p>
            <p
              className="font-display mt-2 text-2xl font-semibold"
              style={{ color: "var(--text)" }}
            >
              {next.name}
            </p>
            <p
              className="mt-1.5 max-w-md text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              {next.tagline}
            </p>
          </div>
          <span className="text-2xl" style={{ color: "var(--accent)" }} aria-hidden>
            →
          </span>
        </Link>
      </div>
    </article>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/photo";
import PhotoWall from "@/components/photo-wall";
import Reveal from "@/components/reveal";
import RoleCard from "@/components/role-card";
import Starfield from "@/components/starfield";
import { communityPrograms, communityRole, press, suvidhaStats } from "@/lib/content";

export const metadata: Metadata = {
  title: "Giving Back",
  description:
    "Free communication and AI education: 240+ students taught across 9 camps, 7k+ learners reached through free workshops, and $10,000+ raised.",
};

export default function CommunityPage() {
  return (
    <div className="pb-10">
      {/* ---------- hero ---------- */}
      <section className="relative overflow-hidden px-4 pt-32 sm:px-6">
        <Starfield count={55} />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96"
          style={{
            background:
              "radial-gradient(ellipse 55% 100% at 50% 0%, var(--accent-glow), transparent 70%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <p className="eyebrow">05 — Giving back</p>
            <h1
              className="font-display mt-3 text-[clamp(2.4rem,6vw,3.8rem)] font-semibold leading-[1.05]"
              style={{ color: "var(--text)" }}
            >
              Teaching what
              <br />
              I was taught.
            </h1>
            <p className="lede mt-6 max-w-2xl">
              Communication coaching is expensive, and the students who need it
              most are usually the ones who cannot buy it. So a share of
              everything I build is free on purpose — the workshops, the app
              for anyone who attends one, and the camps.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <figure className="relative mx-auto max-w-sm">
              <div className="polaroid polaroid-tight tilt-r relative w-full">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Photo
                    src="/images/speaking/teaching.jpg"
                    alt="Teaching a session to a classroom of students"
                    hint="you teaching"
                    priority
                    sizes="(max-width: 1024px) 85vw, 24rem"
                  />
                </div>
                <figcaption className="margin-note mt-3 text-center">
                  free, always ♡
                </figcaption>
              </div>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ---------- the numbers ---------- */}
      <section className="mx-auto mt-20 max-w-5xl px-4 sm:px-6">
        <Reveal>
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ...suvidhaStats,
              { value: "7k+", label: "Learners reached through free workshops" },
            ]
              .slice(0, 4)
              .map((s) => (
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
      </section>

      {/* ---------- suvidha ---------- */}
      <section className="mx-auto mt-20 max-w-5xl px-4 sm:px-6">
        <Reveal>
          <p className="eyebrow">Teaching</p>
          <h2
            className="font-display mt-3 text-3xl font-semibold sm:text-4xl"
            style={{ color: "var(--text)" }}
          >
            Suvidha International Foundation
          </h2>
          <p className="lede mt-3 max-w-2xl">
            A California nonprofit running youth education programmes. I teach
            public speaking and introduced its AI and programming camp.
          </p>
          <div className="mt-6">
            <RoleCard role={communityRole} />
          </div>
        </Reveal>

        {/* press */}
        <Reveal delay={120}>
          <div className="mt-12">
            <p className="eyebrow">In the press</p>
            <p className="lede mt-3 max-w-2xl">
              Three outlets covered the foundation&apos;s expansion of these
              programmes, and my work is featured in each.
            </p>
            <ul className="mt-5 space-y-3">
              {press.map((a) => (
                <li key={a.href}>
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="panel panel-hover flex items-start justify-between gap-5 p-5"
                  >
                    <span>
                      <span
                        className="text-xs font-medium uppercase tracking-wider"
                        style={{ color: "var(--accent)" }}
                      >
                        {a.outlet}
                      </span>
                      <span
                        className="mt-1.5 block text-sm leading-snug"
                        style={{ color: "var(--text)" }}
                      >
                        {a.headline}
                      </span>
                    </span>
                    <span
                      className="shrink-0 text-lg"
                      style={{ color: "var(--accent)" }}
                      aria-hidden
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* ---------- programmes I started ---------- */}
      <section className="mx-auto mt-24 max-w-5xl px-4 sm:px-6">
        <Reveal>
          <p className="eyebrow">Built to be free</p>
          <h2
            className="font-display mt-3 text-3xl font-semibold sm:text-4xl"
            style={{ color: "var(--text)" }}
          >
            Programmes I <span className="underline-sketch">started</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {communityPrograms.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <article className="panel panel-hover flex h-full flex-col p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
                  <h3
                    className="font-display text-xl font-semibold"
                    style={{ color: "var(--text)" }}
                  >
                    {p.name}
                  </h3>
                  <span
                    className="whitespace-nowrap text-sm"
                    style={{ color: "var(--text-faint)" }}
                  >
                    {p.period}
                  </span>
                </div>
                <p className="mt-1.5 text-sm" style={{ color: "var(--accent)" }}>
                  {p.role}
                </p>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {p.summary}
                </p>
                <ul className="mt-4 flex-1 space-y-2.5">
                  {p.points.map((pt, j) => (
                    <li key={j} className="flex gap-3">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: "var(--accent-warm)" }}
                        aria-hidden
                      />
                      <span
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {pt}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={p.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium transition-transform duration-300 hover:translate-x-1"
                  style={{ color: "var(--text)" }}
                >
                  Read the case study <span aria-hidden>→</span>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- photos ---------- */}
      <section className="mx-auto mt-24 max-w-5xl px-4 sm:px-6">
        <Reveal>
          <p className="eyebrow">In the room</p>
        </Reveal>
        <div className="mt-6">
          <PhotoWall
            items={[
              {
                src: "/images/gallery/wings-cards.jpg",
                alt: "Hand-made encouragement cards laid out on a table",
                caption: "every card written by hand",
              },
              {
                src: "/images/gallery/wings-portrait.jpg",
                alt: "At a Wings of Empowerment event",
              },
              {
                src: "/images/speaking/chanakya-talk.jpg",
                alt: "Speaking to an audience beside a slide quoting Chanakya",
              },
            ]}
          />
        </div>
      </section>

      {/* ---------- cta ---------- */}
      <section className="mx-auto mt-20 max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
          <p className="margin-note text-2xl">
            if it helped you, pass it on ♡
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/projects/vakshala"
              className="rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-85"
              style={{ background: "var(--accent)", color: "var(--bg)" }}
            >
              How VakShala works →
            </Link>
            <Link
              href="/experience"
              className="panel panel-hover rounded-full px-6 py-3 text-sm font-medium"
              style={{ color: "var(--text)" }}
            >
              The industry work
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

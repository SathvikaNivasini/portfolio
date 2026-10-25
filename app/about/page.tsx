import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/photo";
import Reveal from "@/components/reveal";
import Starfield from "@/components/starfield";
import {
  certifications,
  milestones,
  pillars,
  profile,
  skills,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "My Story",
  description:
    "From a classroom in Kerala to an engineering bench in Texas — how a builder, speaker and founder got here.",
};

export default function AboutPage() {
  return (
    <div className="pb-10">
      {/* ---------- hero ---------- */}
      <section className="relative overflow-hidden px-4 pt-32 sm:px-6">
        <Starfield count={60} />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96"
          style={{
            background:
              "radial-gradient(ellipse 55% 100% at 50% 0%, var(--accent-glow), transparent 70%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <p className="eyebrow">01 — The origin story</p>
            <h1
              className="font-display mt-3 text-[clamp(2.4rem,6vw,3.8rem)] font-semibold leading-[1.05]"
              style={{ color: "var(--text)" }}
            >
              Ten thousand miles,
              <br />
              one through-line.
            </h1>
            <div className="prose-case mt-7 max-w-xl">
              <p>
                I grew up in India and moved to Texas, and the thing nobody
                tells you about moving countries is how much of your identity
                turns out to have been context. The classroom where everyone
                already knew you were the kid who speaks. The teachers who had
                watched you grow up. All of it stays behind.
              </p>
              <p>
                What came with me was the instinct to build. I wrote my first
                app at eleven, because moving between languages was the problem
                in front of me. By twelve I was pitching it to venture
                capitalists as one of seven winners worldwide out of 11,000+
                entries.
              </p>
              <p>
                <strong>
                  Communication became part of my technical work because
                  engineering that nobody can understand does not help anyone.
                </strong>{" "}
                I have watched brilliant solutions die in rooms where the
                engineer could not explain the stakes, and watched mediocre ones
                win because someone could. So I learned to do both — and then
                built a company teaching other people to do both.
              </p>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="relative mx-auto max-w-sm">
              <div className="polaroid tilt-l relative aspect-[4/5] w-full">
                <div className="relative h-full w-full overflow-hidden">
                  <Photo
                    src="/images/gallery/about-portrait.jpg"
                    alt={profile.name}
                    hint="a warmer, candid portrait of you"
                    sizes="(max-width: 1024px) 85vw, 24rem"
                  />
                </div>
                <p className="margin-note absolute bottom-3 left-0 w-full text-center">
                  big dreams. real work. ♡
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- what connects it ---------- */}
      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2
            className="font-display text-3xl font-semibold sm:text-4xl"
            style={{ color: "var(--text)" }}
          >
            What <span className="underline-sketch">connects</span> it all
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <div className="panel panel-hover h-full p-6">
                <span
                  className="text-lg"
                  style={{ color: "var(--accent)" }}
                  aria-hidden
                >
                  ✦
                </span>
                <h3
                  className="font-display mt-3 text-lg font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  {p.label}
                </h3>
                <p
                  className="mt-2.5 text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {p.blurb}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- timeline ---------- */}
      <section className="mx-auto mt-24 max-w-4xl px-4 sm:px-6">
        <Reveal>
          <p className="eyebrow">A personal timeline</p>
          <h2
            className="font-display mt-3 text-3xl font-semibold sm:text-4xl"
            style={{ color: "var(--text)" }}
          >
            A few moments that moved things.
          </h2>
          <p className="lede mt-4 max-w-xl">
            Not everything — just the turns where the direction actually
            changed.
          </p>
        </Reveal>

        <ol className="relative mt-12 space-y-10 pl-8">
          <span
            className="absolute bottom-3 left-[5px] top-3 w-px"
            style={{ background: "var(--border-strong)" }}
            aria-hidden
          />
          {milestones.map((m, i) => (
            <Reveal key={m.title} delay={i * 50}>
              <li className="relative">
                <span
                  className="absolute -left-[27px] top-2 h-[11px] w-[11px] rounded-full"
                  style={{
                    background: "var(--bg)",
                    border: "2px solid var(--accent)",
                  }}
                  aria-hidden
                />
                <p className="eyebrow">{m.when}</p>
                <h3
                  className="font-display mt-2 text-xl font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  {m.title}
                </h3>
                <p
                  className="mt-2.5 text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {m.body}
                </p>

                {m.images && (
                  <div className="mt-5 grid max-w-md grid-cols-2 gap-3">
                    {m.images.map((img) => (
                      <div
                        key={img.src}
                        className="relative aspect-[4/3] overflow-hidden rounded-lg"
                        style={{ border: "1px solid var(--border)" }}
                      >
                        <Photo
                          src={img.src}
                          alt={img.alt}
                          hint={img.hint}
                          sizes="(max-width: 640px) 45vw, 14rem"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ---------- education + skills ---------- */}
      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="panel h-full p-7">
              <p className="eyebrow">Education</p>
              <h3
                className="font-display mt-3 text-xl font-semibold"
                style={{ color: "var(--text)" }}
              >
                Coppell High School
              </h3>
              <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
                Coppell, TX · Expected May 2027
              </p>
              <div className="hairline my-5" />
              <p className="eyebrow">Intending to study</p>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "var(--text)" }}
              >
                {profile.intended}
              </p>
              <div className="hairline my-5" />
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                4× Honor Roll · National Honor Society, Excalibur Chapter.
                Previously Kendriya Vidyalaya, India (2015–2024) — &ldquo;A&rdquo;
                student, class representative, 2× Star Student.
              </p>
              <div className="hairline my-5" />
              <p className="eyebrow">Clubs</p>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                Coppell Core Tech Innovation Association · Technology Student
                Association · Coppell Speakers Association · Women in Business ·
                Society of Women Engineers
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="panel h-full p-7">
              <p className="eyebrow">What I work with</p>
              <div className="mt-5 space-y-5">
                {Object.entries(skills).map(([group, items]) => (
                  <div key={group}>
                    <p
                      className="text-xs font-medium uppercase tracking-wider"
                      style={{ color: "var(--accent)" }}
                    >
                      {group}
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {items.map((s) => (
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
                  </div>
                ))}
              </div>

              <div className="hairline my-6" />
              <p className="eyebrow">Certifications</p>
              <ul className="mt-3 space-y-1.5">
                {certifications.map((c) => (
                  <li
                    key={c}
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- cta ---------- */}
      <section className="mx-auto mt-20 max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
          <p className="margin-note text-2xl">
            If I&apos;m not challenging myself, I&apos;m standing still. ♡
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/projects"
              className="rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-85"
              style={{ background: "var(--accent)", color: "var(--bg)" }}
            >
              See what I&apos;ve built →
            </Link>
            <Link
              href="/speaking"
              className="panel panel-hover rounded-full px-6 py-3 text-sm font-medium"
              style={{ color: "var(--text)" }}
            >
              The other side of me
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

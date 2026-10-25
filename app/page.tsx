import Link from "next/link";
import Starfield from "@/components/starfield";
import Reveal from "@/components/reveal";
import Photo from "@/components/photo";
import HomeClient from "@/components/home-client";
import { experience, honors, journal, profile, talks } from "@/lib/content";

export default function Home() {
  return (
    <>
      {/* ---------------- 01 · The entrance ---------------- */}
      <section className="relative overflow-hidden px-4 pb-16 pt-32 sm:px-6 sm:pt-36">
        <Starfield count={90} />
        <div
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[34rem] w-[48rem] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse at center, var(--accent-glow), transparent 68%)",
            filter: "blur(10px)",
          }}
          aria-hidden
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          {/* left: name + intro */}
          <div>
            <Reveal>
              <p className="margin-note mb-1 text-xl">Hi, I&apos;m ✦</p>
              <h1
                className="font-display text-[clamp(2.7rem,7vw,4.6rem)] font-semibold leading-[1.02]"
                style={{ color: "var(--text)" }}
              >
                Sathvika
                <br />
                Nivasini
              </h1>
              <p
                className="font-hand mt-2 text-3xl"
                style={{ color: "var(--accent-warm)" }}
              >
                ( Sathvi ✦ )
              </p>
            </Reveal>

            <Reveal delay={120}>
              <p
                className="mt-6 text-[0.7rem] font-medium uppercase tracking-[0.2em]"
                style={{ color: "var(--text-faint)" }}
              >
                {profile.roles.join("  ·  ")}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <p className="lede mt-7 max-w-md">{profile.intro}</p>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#work"
                  className="rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-85"
                  style={{ background: "var(--accent)", color: "var(--bg)" }}
                >
                  Explore my work →
                </Link>
                <Link
                  href="/about"
                  className="panel panel-hover rounded-full px-6 py-3 text-sm font-medium"
                  style={{ color: "var(--text)" }}
                >
                  My story
                </Link>
              </div>
            </Reveal>

            <Reveal delay={360}>
              <div
                className="mt-10 flex items-center gap-3 text-xs"
                style={{ color: "var(--text-faint)" }}
              >
                <span
                  className="inline-block h-1.5 w-1.5 animate-pulse rounded-full"
                  style={{ background: "#6ee7a8" }}
                  aria-hidden
                />
                Currently: Microsoft — Cloud Architecture, Data &amp; AI ·
                Building NirvBand
              </div>
            </Reveal>
          </div>

          {/* right: constellation + a pinned photo */}
          <div className="relative">
            <Reveal delay={160}>
              <HomeClientHeroSlot />
            </Reveal>
          </div>
        </div>

        <Reveal delay={440}>
          <div className="mx-auto mt-14 flex max-w-6xl items-center gap-3">
            <div className="hairline flex-1" />
            <span className="eyebrow shrink-0">Scroll</span>
            <div className="hairline flex-1" />
          </div>
        </Reveal>
      </section>

      {/* constellation + filtered project grid */}
      <HomeClient />

      {/* ---------------- 03 · a glimpse of the story ---------------- */}
      <section className="mx-auto mt-28 max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <div className="relative mx-auto grid max-w-sm grid-cols-2 gap-4">
              <div className="polaroid tilt-l relative col-span-2 aspect-[4/3]">
                <div className="relative h-full w-full overflow-hidden">
                  <Photo
                    src="/images/gallery/india-to-texas.jpg"
                    alt="Sathvika — between India and Texas"
                    hint="a photo that says 'India → Texas'"
                    sizes="(max-width: 1024px) 90vw, 28rem"
                  />
                </div>
                <p className="margin-note absolute bottom-2 left-0 w-full text-center">
                  ten thousand miles, one dream
                </p>
              </div>
              <div className="polaroid tilt-r relative aspect-square">
                <div className="relative h-full w-full overflow-hidden">
                  <Photo
                    src="/images/speaking/tedx-stage.jpg"
                    alt="Speaking on the TEDx stage"
                    hint="you, on a stage"
                    sizes="12rem"
                  />
                </div>
              </div>
              <div className="polaroid tilt-l relative aspect-square">
                <div className="relative h-full w-full overflow-hidden">
                  <Photo
                    src="/images/gallery/calculus-desk.jpg"
                    alt="Calculus notes, a calculator and coffee on a desk"
                    hint="you, building something"
                    sizes="12rem"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="eyebrow">01 — The origin story</p>
            <h2
              className="font-display mt-3 text-4xl font-semibold sm:text-5xl"
              style={{ color: "var(--text)" }}
            >
              From a classroom in India
              <br />
              to an engineering bench in Texas.
            </h2>
            <div className="prose-case mt-6 max-w-xl">
              <p>
                I built my first app at eleven, because moving between languages
                was the problem directly in front of me. At twelve I was pitching
                it to venture capitalists in Silicon Valley as one of seven
                winners worldwide out of 11,000+ entries.
              </p>
              <p>
                Then I moved countries, and had to introduce myself from nothing
                again. That is when communication stopped being a trophy and
                became a tool — the thing that makes engineering matter to
                anyone who is not already an engineer.
              </p>
            </div>
            <Link
              href="/about"
              className="panel panel-hover mt-7 inline-flex rounded-full px-6 py-3 text-sm font-medium"
              style={{ color: "var(--text)" }}
            >
              Read the whole story →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------- 04 · industry ---------------- */}
      <section className="mx-auto mt-28 max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="eyebrow">03 — Inside the industry</p>
          <h2
            className="font-display mt-3 text-4xl font-semibold sm:text-5xl"
            style={{ color: "var(--text)" }}
          >
            Three terms at Microsoft.
          </h2>
          <p className="lede mt-5 max-w-xl">
            Cloud architecture, informatics, security and AI, and business
            strategy — the only Coppell High School student contracted for a
            second year.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {experience.slice(0, 3).map((role, i) => (
            <Reveal key={role.title} delay={i * 90}>
              <article className="panel panel-hover h-full p-6">
                <p className="eyebrow">{role.period}</p>
                <h3
                  className="font-display mt-3 text-lg font-semibold leading-snug"
                  style={{ color: "var(--text)" }}
                >
                  {role.title}
                </h3>
                <p className="mt-1 text-sm" style={{ color: "var(--accent)" }}>
                  {role.org}
                </p>
                {role.note && (
                  <p
                    className="mt-4 text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {role.note}
                  </p>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={240}>
          <div className="mt-8 flex justify-center">
            <Link
              href="/experience"
              className="panel panel-hover rounded-full px-6 py-3 text-sm font-medium"
              style={{ color: "var(--text)" }}
            >
              The full industry record →
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ---------------- 05 · voice ---------------- */}
      <section className="relative mt-28 overflow-hidden py-20">
        <Starfield count={40} />
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, var(--accent-glow), transparent 70%)",
          }}
          aria-hidden
        />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="eyebrow text-center">04 — The other side of me</p>
            <h2
              className="font-display mx-auto mt-3 max-w-2xl text-center text-4xl font-semibold sm:text-5xl"
              style={{ color: "var(--text)" }}
            >
              Ranked #1 in the world
              <br />
              for saying things out loud.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {talks.map((t, i) => (
              <Reveal key={t.title} delay={i * 100}>
                <article className="panel panel-hover h-full p-6">
                  <span className="pill pill-research">
                    <span className="pill-dot" />
                    TEDx
                  </span>
                  <h3
                    className="font-display mt-4 text-2xl font-semibold"
                    style={{ color: "var(--text)" }}
                  >
                    {t.title}
                  </h3>
                  <p className="mt-1.5 text-sm" style={{ color: "var(--accent)" }}>
                    {t.venue} · {t.year}
                  </p>
                  <p
                    className="mt-3 text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {t.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {honors.slice(0, 3).map((h) => (
                <div key={h.title} className="panel p-5">
                  <p className="eyebrow">
                    {h.scope} · {h.year}
                  </p>
                  <p
                    className="mt-2.5 text-sm font-medium leading-snug"
                    style={{ color: "var(--text)" }}
                  >
                    {h.title}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-10 flex justify-center">
              <Link
                href="/speaking"
                className="rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-85"
                style={{ background: "var(--accent)", color: "var(--bg)" }}
              >
                Hear the other side →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- 06 · notebook ---------------- */}
      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">05 — The builder&apos;s notebook</p>
              <h2
                className="font-display mt-3 text-4xl font-semibold sm:text-5xl"
                style={{ color: "var(--text)" }}
              >
                What I&apos;m still
                <br />
                figuring out.
              </h2>
            </div>
            <p className="lede max-w-sm">
              Short entries on what broke, what surprised me, and the results I
              could have quietly left out.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {journal.slice(0, 3).map((e, i) => (
            <Reveal key={e.slug} delay={i * 90}>
              <Link
                href={`/journal#${e.slug}`}
                className="panel panel-hover flex h-full flex-col p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="pill">{e.tag}</span>
                  <span className="text-xs" style={{ color: "var(--text-faint)" }}>
                    {e.date}
                  </span>
                </div>
                <h3
                  className="font-display mt-4 text-lg font-semibold leading-snug"
                  style={{ color: "var(--text)" }}
                >
                  {e.title}
                </h3>
                <p
                  className="mt-3 flex-1 text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {e.body[0].slice(0, 155)}…
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={240}>
          <div className="mt-8 flex justify-center">
            <Link
              href="/journal"
              className="panel panel-hover rounded-full px-6 py-3 text-sm font-medium"
              style={{ color: "var(--text)" }}
            >
              Open the notebook →
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

/**
 * The hero's right-hand column. A pinned photo sits behind the constellation
 * that HomeClient renders further down, so the entrance has a face in it.
 */
function HomeClientHeroSlot() {
  return (
    <div className="relative mx-auto max-w-md">
      <div className="polaroid tilt-r relative aspect-[4/5] w-full">
        <div className="relative h-full w-full overflow-hidden">
          <Photo
            src="/images/speaking/tedx-chsa.jpg"
            alt="Sathvika Nivasini at the TEDx CHSA backdrop"
            hint="your main hero portrait"
            priority
            sizes="(max-width: 1024px) 90vw, 26rem"
          />
        </div>
        <p className="margin-note absolute bottom-3 left-0 w-full text-center">
          same girl… bigger dreams ♡
        </p>
      </div>

    </div>
  );
}

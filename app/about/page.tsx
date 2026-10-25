import type { Metadata } from "next";
import Link from "next/link";
import Clip from "@/components/clip";
import Photo from "@/components/photo";
import PhotoWall from "@/components/photo-wall";
import Reveal from "@/components/reveal";
import Starfield from "@/components/starfield";
import {
  certifications,
  milestones,
  pillars,
  profile,
  skills,
  testimonials,
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
                In competitions and classrooms I kept noticing that the better
                idea did not always win — the clearer explanation usually did.
                So I worked on both, and eventually started coaching other
                students in the half that gets skipped.
              </p>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="relative mx-auto max-w-sm">
              <div className="polaroid tilt-l relative w-full">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Photo
                    src="/images/speaking/tedx-chsa.jpg"
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

      {/* ---------- the circuits ---------- */}
      <section className="mx-auto mt-24 max-w-5xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="eyebrow">Before any of it</p>
            <h2
              className="font-display mt-3 text-3xl font-semibold sm:text-4xl"
              style={{ color: "var(--text)" }}
            >
              A circuit, a notebook,
              <br />
              and an LED that{" "}
              <span className="underline-sketch">finally lit</span>
            </h2>
            <div className="prose-case mt-6">
              <p>
                Long before Azure pipelines and neural networks, this is what
                engineering actually looked like: a breadboard, a 9V battery,
                and a circuit diagram worked out by hand on ruled paper next to
                it.
              </p>
              <p>
                I still think this is the honest version of the job. Most of it
                is not working, and then a small blue light comes on and you
                understand something you did not understand an hour ago.
              </p>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="grid grid-cols-2 gap-5">
              <Clip
                src="/video/circuit-1.mp4"
                poster="/video/circuit-1.jpg"
                label="A breadboard circuit with a blue LED lit, beside handwritten circuit notes"
                caption="it works ♡"
                tilt="tilt-l"
              />
              <Clip
                src="/video/circuit-2.mp4"
                poster="/video/circuit-2.jpg"
                label="A close view of the lit LED on the breadboard"
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-10">
          <PhotoWall
            columns="columns-2 sm:columns-4"
            items={[
              {
                src: "/images/gallery/breadboard.jpg",
                alt: "A breadboard wired with a potentiometer, resistors, a capacitor and two LEDs",
                caption: "wired by hand, every time",
              },
              {
                src: "/images/gallery/lemon-battery.jpg",
                alt: "Two lemons wired through forks, powering a small digital clock",
                ratio: "aspect-[3/4]",
                caption: "two lemons, one working clock",
              },
              {
                src: "/images/gallery/hand-generator.jpg",
                alt: "A hand-cranked generator built from cardboard and wood, mid-spin",
                ratio: "aspect-[3/4]",
                caption: "cranked by hand",
              },
              {
                src: "/images/gallery/jar-build.jpg",
                alt: "A jar mounted on a cardboard base with a wired switch",
                ratio: "aspect-[3/4]",
                caption: "a jar, a switch, an idea",
              },
            ]}
          />
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
                  <div
                    className={`mt-5 grid gap-3 ${
                      m.images.length === 1
                        ? "max-w-[15rem] grid-cols-1"
                        : "max-w-md grid-cols-2"
                    }`}
                  >
                    {m.images.map((img) => (
                      <div
                        key={img.src}
                        className={`relative overflow-hidden rounded-lg ${
                          m.images!.length === 1
                            ? "aspect-square"
                            : "aspect-[4/3]"
                        }`}
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

      {/* ---------- moments ---------- */}
      <section className="mx-auto mt-24 max-w-5xl px-4 sm:px-6">
        <Reveal>
          <p className="eyebrow">Moments</p>
          <h2
            className="font-display mt-3 text-3xl font-semibold sm:text-4xl"
            style={{ color: "var(--text)" }}
          >
            The <span className="underline-sketch">in-between</span> bits
          </h2>
          <p className="lede mt-4 max-w-xl">
            Not everything fits a timeline. These are the ones I kept.
          </p>
        </Reveal>

        <div className="mt-10">
          <PhotoWall
            items={[
              {
                src: "/images/gallery/india-to-texas.jpg",
                alt: "City lights from an airplane window at night",
                ratio: "aspect-[3/4]",
                caption: "ten thousand miles, one dream",
              },
              {
                src: "/images/gallery/wings-portrait.jpg",
                alt: "At a Wings of Empowerment event",
                caption: "wings of empowerment",
              },
              {
                src: "/images/gallery/wings-cards.jpg",
                alt: "Hand-made encouragement cards laid out on a table",
                caption: "every card written by hand",
              },
              {
                src: "/images/gallery/kerala-championship.jpg",
                alt: "On stage at the Kerala Championship of Public Speaking",
                ratio: "aspect-[3/4]",
                caption: "Kerala championship finals",
              },
              {
                src: "/images/gallery/goggles.jpg",
                alt: "Wearing safety goggles in a lab",
                caption: "goggles on ♡",
              },
              {
                src: "/images/gallery/offduty.jpg",
                alt: "Off duty, at a go-kart track",
                caption: "off duty",
              },
            ]}
          />
        </div>
      </section>

      {/* ---------- what someone else says ---------- */}
      <section className="mx-auto mt-24 max-w-3xl px-4 sm:px-6">
        {testimonials.map((t) => (
          <Reveal key={t.name}>
            <figure className="panel relative p-8 sm:p-10">
              <span
                className="font-display absolute -top-5 left-7 text-6xl leading-none"
                style={{ color: "var(--accent)", opacity: 0.35 }}
                aria-hidden
              >
                &ldquo;
              </span>
              <blockquote className="prose-case">
                {t.quote.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </blockquote>
              <figcaption className="mt-6 border-t pt-5">
                <p
                  className="font-display text-lg font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  {t.name}
                </p>
                <p
                  className="mt-1 text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {t.title}
                </p>
                <p className="mt-1.5 text-sm" style={{ color: "var(--accent)" }}>
                  {t.relationship} · {t.date}
                </p>
              </figcaption>

              {t.screenshot && (
                <div className="mt-7">
                  <p className="eyebrow mb-3">As it appears on LinkedIn</p>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block overflow-hidden rounded-xl transition-opacity hover:opacity-90"
                    style={{ border: "1px solid var(--border)" }}
                  >
                    <div className="relative aspect-[755/437] w-full">
                      <Photo
                        src={t.screenshot}
                        alt={`LinkedIn recommendation from ${t.name}`}
                        hint="the LinkedIn recommendation screenshot"
                        sizes="(max-width: 768px) 92vw, 44rem"
                      />
                    </div>
                  </a>
                </div>
              )}
            </figure>
          </Reveal>
        ))}
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
            still figuring a lot of it out ♡
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

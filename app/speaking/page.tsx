import type { Metadata } from "next";
import Photo from "@/components/photo";
import PhotoWall from "@/components/photo-wall";
import Reveal from "@/components/reveal";
import Starfield from "@/components/starfield";
import { honors, otherSide, talks } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Other Side",
  description:
    "TEDx talks, a Toastmasters world championship, writing, teaching, and Carnatic vocals.",
};

export default function SpeakingPage() {
  return (
    <div className="pb-10">
      {/* hero */}
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
        <div className="relative mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <p className="eyebrow">04 — The other side of me</p>
            <h1
              className="font-display mt-3 text-[clamp(2.4rem,6vw,3.8rem)] font-semibold leading-[1.05]"
              style={{ color: "var(--text)" }}
            >
              A voice, not
              <br />
              just a face.
            </h1>
            <p className="lede mt-6 max-w-2xl">
              Seven years of competitive speaking, two TEDx stages, a world
              championship title, 600+ Sanskrit verses, and a stubborn belief
              that communication education should be free. This is the part of
              the portfolio that is not a résumé.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <figure className="relative mx-auto max-w-sm">
              <div className="polaroid tilt-r relative w-full">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Photo
                    src="/images/speaking/tedx-hero.jpg"
                    alt="Sathvika on the TEDx stage beside the TEDx letters"
                    hint="you on the TEDx stage"
                    priority
                    sizes="(max-width: 1024px) 85vw, 26rem"
                  />
                </div>
                <figcaption className="margin-note absolute bottom-3 left-0 w-full text-center">
                  the red letters ♡
                </figcaption>
              </div>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* TEDx */}
      <section className="mx-auto mt-16 max-w-5xl px-4 sm:px-6">
        <div className="grid gap-5 md:grid-cols-2">
          {talks.map((t, i) => (
            <Reveal key={t.title} delay={i * 100}>
              <article className="panel panel-hover h-full overflow-hidden">
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Photo
                    src={`/images/speaking/${
                      i === 0 ? "tedx-2026" : "tedx-2025"
                    }.jpg`}
                    alt={`${t.title} — ${t.venue}`}
                    hint={`photo or still from "${t.title}"`}
                    sizes="(max-width: 768px) 100vw, 32rem"
                  />
                </div>
                <div className="p-6">
                  <span className="pill pill-research">
                    <span className="pill-dot" />
                    TEDx · {t.year}
                  </span>
                  <h2
                    className="font-display mt-4 text-2xl font-semibold"
                    style={{ color: "var(--text)" }}
                  >
                    {t.title}
                  </h2>
                  <p className="mt-1.5 text-sm" style={{ color: "var(--accent)" }}>
                    {t.venue}
                  </p>
                  <p
                    className="mt-3 text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {t.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="eyebrow mt-14">From the TEDx stages</p>
        </Reveal>
        <div className="mt-6">
          <PhotoWall
            items={[
              {
                src: "/images/speaking/tedx-stage.jpg",
                alt: "Speaking on the TEDx stage",
                ratio: "aspect-square",
              },
              {
                src: "/images/speaking/tedx-stage-wide.jpg",
                alt: "Mid-talk on the TEDx stage",
              },
              {
                src: "/images/speaking/chanakya-talk.jpg",
                alt: "Speaking to an audience beside a slide quoting Chanakya",
              },
            ]}
          />
        </div>

        <Reveal delay={260}>
          <p className="margin-note mt-6 text-center text-xl">
            want the video? drop the link and it embeds right here ↑
          </p>
        </Reveal>
      </section>

      {/* photo strip */}
      <section className="mx-auto mt-24 max-w-5xl px-4 sm:px-6">
        <Reveal>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {[
              {
                f: "tedx-stage-wide.jpg",
                a: "Mid-talk on the TEDx stage",
                h: "you mid-speech, on stage",
                t: "tilt-l",
              },
              {
                f: "stage-award.jpg",
                a: "Shaking hands on stage at an awards ceremony",
                h: "with an audience or trophy",
                t: "tilt-r",
              },
              {
                f: "teaching.jpg",
                a: "Teaching a session in a classroom",
                h: "teaching a workshop",
                t: "tilt-l",
              },
              {
                f: "nhs-certificates.jpg",
                a: "Holding certificates at Coppell High School",
                h: "certificates in hand",
                t: "tilt-r",
              },
            ].map((p) => (
              <div
                key={p.f}
                className={`polaroid ${p.t} relative`}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Photo
                    src={`/images/speaking/${p.f}`}
                    alt={p.a}
                    hint={p.h}
                    sizes="(max-width: 640px) 45vw, 16rem"
                  />
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <p className="margin-note mt-10 text-center text-2xl">
            &ldquo;Communication is currency.&rdquo; ✦
          </p>
        </Reveal>
      </section>
      {/* four facets */}
      <section className="mx-auto mt-24 max-w-5xl px-4 sm:px-6">
        <Reveal>
          <h2
            className="font-display text-3xl font-semibold sm:text-4xl"
            style={{ color: "var(--text)" }}
          >
            Four things that aren&apos;t{" "}
            <span className="underline-sketch">engineering</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {otherSide.map((o, i) => (
            <Reveal key={o.title} delay={i * 80}>
              <article className="panel panel-hover h-full p-7">
                <h3
                  className="font-display text-xl font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  {o.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "var(--accent-warm)" }}
                >
                  {o.body}
                </p>
                <div className="hairline my-5" />
                <ul className="space-y-2.5">
                  {o.detail.map((d, j) => (
                    <li key={j} className="flex gap-3">
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full"
                        style={{ background: "var(--accent)" }}
                        aria-hidden
                      />
                      <span
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {d}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* honors */}
      <section className="mx-auto mt-24 max-w-5xl px-4 sm:px-6">
        <Reveal>
          <p className="eyebrow">Honors &amp; awards</p>
          <h2
            className="font-display mt-3 text-3xl font-semibold sm:text-4xl"
            style={{ color: "var(--text)" }}
          >
            The record.
          </h2>
        </Reveal>

        <div className="mt-10 space-y-3">
          {honors.map((h, i) => (
            <Reveal key={h.title} delay={i * 40}>
              <article className="panel panel-hover p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3
                    className="font-display text-lg font-semibold leading-snug"
                    style={{ color: "var(--text)" }}
                  >
                    {h.title}
                  </h3>
                  <span className="pill shrink-0">
                    {h.scope} · {h.year}
                  </span>
                </div>
                <p
                  className="mt-2.5 text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {h.detail}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

    </div>
  );
}

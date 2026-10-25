import type { Metadata } from "next";
import Photo from "@/components/photo";
import Reveal from "@/components/reveal";
import Starfield from "@/components/starfield";
import { experience } from "@/lib/content";

export const metadata: Metadata = {
  title: "Inside the Industry",
  description:
    "Three consecutive terms at Microsoft across cloud architecture, informatics, security, AI and business strategy.",
};

export default function ExperiencePage() {
  return (
    <div className="px-4 pb-10 pt-32 sm:px-6">
      <section className="relative mx-auto max-w-4xl">
        <Starfield count={45} />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96"
          style={{
            background:
              "radial-gradient(ellipse 55% 100% at 50% 0%, var(--accent-glow), transparent 70%)",
          }}
          aria-hidden
        />
        <Reveal>
          <p className="eyebrow">03 — Inside the industry</p>
          <h1
            className="font-display mt-3 text-[clamp(2.4rem,6vw,3.8rem)] font-semibold leading-[1.05]"
            style={{ color: "var(--text)" }}
          >
            What professional
            <br />
            teams taught me.
          </h1>
          <p className="lede mt-6 max-w-2xl">
            Three consecutive terms at Microsoft, plus a selection at Amazon and
            ongoing work with a nonprofit foundation. What follows is the shape
            of the work and what I took from it — no confidential company
            information, by design.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <figure className="mt-12">
            <div className="grid max-w-xl gap-6 sm:grid-cols-2">
              <div className="polaroid tilt-l relative aspect-[3/4]">
                <div className="relative h-full w-full overflow-hidden">
                  <Photo
                    src="/images/gallery/microsoft-office.jpg"
                    alt="Sathvika at a Microsoft office, wearing an intern badge"
                    hint="you at Microsoft"
                    sizes="(max-width: 640px) 85vw, 18rem"
                  />
                </div>
              </div>
              <div className="polaroid tilt-r relative aspect-[3/4]">
                <div className="relative h-full w-full overflow-hidden">
                  <Photo
                    src="/images/gallery/innovation-hub-wall.jpg"
                    alt="Sathvika at the Microsoft Innovation Hub wall"
                    hint="the Innovation Hub"
                    sizes="(max-width: 640px) 85vw, 18rem"
                  />
                </div>
              </div>
            </div>
            <figcaption className="margin-note mt-6">
              grateful for this one ♡
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-14 space-y-5">
          {experience.map((role, i) => (
            <Reveal key={`${role.org}-${role.title}`} delay={i * 70}>
              <article className="panel panel-hover p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h2
                    className="font-display text-xl font-semibold"
                    style={{ color: "var(--text)" }}
                  >
                    {role.title}
                  </h2>
                  <span
                    className="text-sm whitespace-nowrap"
                    style={{ color: "var(--text-faint)" }}
                  >
                    {role.period}
                  </span>
                </div>

                <p className="mt-1.5 text-sm" style={{ color: "var(--accent)" }}>
                  {role.org}
                  {role.location && (
                    <span style={{ color: "var(--text-faint)" }}>
                      {" "}
                      · {role.location}
                    </span>
                  )}
                </p>

                {role.note && (
                  <p
                    className="mt-4 rounded-lg px-4 py-3 text-sm leading-relaxed"
                    style={{
                      background:
                        "color-mix(in srgb, var(--accent) 10%, transparent)",
                      color: "var(--text)",
                    }}
                  >
                    {role.note}
                  </p>
                )}

                <ul className="mt-4 space-y-2.5">
                  {role.points.map((pt, j) => (
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
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="panel mt-10 p-7">
            <p className="eyebrow">What I took from it</p>
            <div className="prose-case mt-4">
              <p>
                The most useful thing I learned at Microsoft was not technical.
                It was that a good architecture proposal and a good pitch are
                the same document aimed at different rooms — and that the
                engineer who can move between those rooms is the one whose work
                actually ships.
              </p>
              <p>
                Gathering client requirements with senior engineers taught me to
                distrust my first understanding of a problem. Presenting
                data-science research to business audiences taught me that the
                number is never the message.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

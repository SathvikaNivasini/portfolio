import type { Metadata } from "next";
import Reveal from "@/components/reveal";
import Starfield from "@/components/starfield";
import { journal } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Builder's Notebook",
  description:
    "Short entries on what broke, what surprised me, and the results I could have quietly left out.",
};

export default function JournalPage() {
  return (
    <div className="px-4 pb-10 pt-32 sm:px-6">
      <section className="relative mx-auto max-w-3xl">
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
          <p className="eyebrow">05 — The builder&apos;s notebook</p>
          <h1
            className="font-display mt-3 text-[clamp(2.4rem,6vw,3.8rem)] font-semibold leading-[1.05]"
            style={{ color: "var(--text)" }}
          >
            Thinking out loud,
            <br />
            in progress.
          </h1>
          <p className="lede mt-6">
            Polished achievements tell you what someone finished. These tell you
            how they think while it is still unfinished — the bias I shipped by
            accident, the result I could have hidden, the project I let die.
          </p>
        </Reveal>

        <div className="mt-16 space-y-5">
          {journal.map((entry, i) => (
            <Reveal key={entry.slug} delay={i * 60}>
              <article id={entry.slug} className="panel scroll-mt-28 p-7 sm:p-9">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="pill">{entry.tag}</span>
                  <span
                    className="text-xs"
                    style={{ color: "var(--text-faint)" }}
                  >
                    {entry.date}
                  </span>
                </div>

                <h2
                  className="font-display mt-5 text-2xl font-semibold leading-snug sm:text-3xl"
                  style={{ color: "var(--text)" }}
                >
                  {entry.title}
                </h2>

                <div className="hairline my-6" />

                <div className="prose-case">
                  {entry.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="margin-note mt-14 text-center text-xl">
            more entries as I break more things ✦
          </p>
        </Reveal>
      </section>
    </div>
  );
}

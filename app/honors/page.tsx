import type { Metadata } from "next";
import CertCard from "@/components/cert-card";
import Photo from "@/components/photo";
import Reveal from "@/components/reveal";
import Starfield from "@/components/starfield";
import { certifications, honors } from "@/lib/content";

export const metadata: Metadata = {
  title: "Honors & Certifications",
  description:
    "Awards from international, national, state and regional competitions, plus industry certifications in robotics, CAD, AI and business.",
};

const scopeOrder = ["International", "National", "State", "Regional", "School"];

export default function HonorsPage() {
  const grouped = scopeOrder
    .map((scope) => ({
      scope,
      items: honors.filter((h) => h.scope === scope),
    }))
    .filter((g) => g.items.length > 0);

  const featured = certifications.filter((c) => c.featured);
  const rest = certifications.filter((c) => !c.featured);

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
        <div className="relative mx-auto max-w-5xl">
          <Reveal>
            <p className="eyebrow">Honors &amp; certifications</p>
            <h1
              className="font-display mt-3 text-[clamp(2.4rem,6vw,3.8rem)] font-semibold leading-[1.05]"
              style={{ color: "var(--text)" }}
            >
              Where the work
              <br />
              has been judged.
            </h1>
            <p className="lede mt-6 max-w-2xl">
              Competitions from international down to school level, and the
              industry certifications behind the engineering work. Where a
              certificate exists, it is linked so the credential can be
              checked.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {grouped.map((g) => (
                <span key={g.scope} className="pill">
                  {g.scope} · {g.items.length}
                </span>
              ))}
              <span className="pill pill-research">
                <span className="pill-dot" />
                {certifications.length} certifications
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- certifications ---------- */}
      <section className="mx-auto mt-20 max-w-5xl px-4 sm:px-6">
        <Reveal>
          <p className="eyebrow">Industry certifications</p>
          <h2
            className="font-display mt-3 text-3xl font-semibold sm:text-4xl"
            style={{ color: "var(--text)" }}
          >
            Credentials, <span className="underline-sketch">verifiable</span>
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {featured.map((c, i) => (
            <Reveal key={c.name} delay={i * 80}>
              <CertCard cert={c} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <p className="eyebrow mt-10">Earlier training</p>
        </Reveal>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((c, i) => (
            <Reveal key={c.name} delay={i * 50}>
              <CertCard cert={c} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- awards by scope ---------- */}
      <section className="mx-auto mt-24 max-w-5xl px-4 sm:px-6">
        <Reveal>
          <p className="eyebrow">Awards</p>
          <h2
            className="font-display mt-3 text-3xl font-semibold sm:text-4xl"
            style={{ color: "var(--text)" }}
          >
            The full list.
          </h2>
        </Reveal>

        {grouped.map((group, gi) => (
          <div key={group.scope} className="mt-12">
            <Reveal>
              <div className="flex items-center gap-4">
                <h3
                  className="font-display text-xl font-semibold"
                  style={{ color: "var(--accent)" }}
                >
                  {group.scope}
                </h3>
                <div className="hairline flex-1" />
                <span
                  className="text-xs"
                  style={{ color: "var(--text-faint)" }}
                >
                  {group.items.length}
                </span>
              </div>
            </Reveal>

            <div className="mt-5 space-y-3">
              {group.items.map((h, i) => (
                <Reveal key={h.title} delay={i * 50}>
                  <article className="panel panel-hover p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h4
                        className="font-display text-lg font-semibold leading-snug"
                        style={{ color: "var(--text)" }}
                      >
                        {h.title}
                      </h4>
                      <span
                        className="whitespace-nowrap text-sm"
                        style={{ color: "var(--text-faint)" }}
                      >
                        {h.year}
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

            {gi === 0 && (
              <Reveal delay={120}>
                <figure className="mt-8 max-w-md">
                  <div className="polaroid polaroid-tight tilt-l relative">
                    <div className="relative aspect-[3/4] w-full overflow-hidden">
                      <Photo
                        src="/images/speaking/nhs-certificates.jpg"
                        alt="Holding certificates at Coppell High School"
                        hint="certificates in hand"
                        sizes="(max-width: 640px) 85vw, 24rem"
                      />
                    </div>
                  </div>
                </figure>
              </Reveal>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}

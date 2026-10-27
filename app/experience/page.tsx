import type { Metadata } from "next";
import Photo from "@/components/photo";
import PhotoWall from "@/components/photo-wall";
import Reveal from "@/components/reveal";
import Starfield from "@/components/starfield";
import RoleCard from "@/components/role-card";
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
              <div className="polaroid tilt-l relative">
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Photo
                    src="/images/gallery/microsoft-office.jpg"
                    alt="Sathvika at a Microsoft office, wearing an intern badge"
                    hint="you at Microsoft"
                    sizes="(max-width: 640px) 85vw, 18rem"
                  />
                </div>
              </div>
              <div className="polaroid tilt-r relative">
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Photo
                    src="/images/gallery/innovation-hub-wall.jpg"
                    alt="Sathvika at the Microsoft Innovation Hub wall"
                    hint="the Innovation Hub"
                    sizes="(max-width: 640px) 85vw, 18rem"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 max-w-xl">
              <div
                className="relative aspect-[4/3] overflow-hidden rounded-xl"
                style={{ border: "1px solid var(--border)" }}
              >
                <Photo
                  src="/images/gallery/ms-whiteboard.jpg"
                  alt="Presenting an account and product-group diagram at a whiteboard"
                  hint="you presenting at a whiteboard"
                  sizes="(max-width: 640px) 90vw, 36rem"
                />
              </div>
            </div>

            <figcaption className="margin-note mt-6">
              grateful for this one ♡
            </figcaption>
          </figure>
        </Reveal>

        <Reveal>
          <div className="mt-16">
            <p className="eyebrow">From the terms</p>
            <h2
              className="font-display mt-3 text-2xl font-semibold sm:text-3xl"
              style={{ color: "var(--text)" }}
            >
              The people and the rooms.
            </h2>
          </div>
        </Reveal>

        <div className="mt-8">
          <PhotoWall
            items={[
              {
                src: "/images/gallery/microsoft-innovation-hub.jpg",
                alt: "At the Microsoft Innovation Hub",
              },
              {
                src: "/images/gallery/ms-colleague-1.jpg",
                alt: "With a Microsoft colleague",
                ratio: "aspect-[3/4]",
              },
              {
                src: "/images/gallery/ms-colleague-2.jpg",
                alt: "With a Microsoft colleague",
              },
              {
                src: "/images/gallery/ms-colleague-3.jpg",
                alt: "With a Microsoft colleague",
              },
              {
                src: "/images/gallery/ms-colleague-4.jpg",
                alt: "With a Microsoft colleague",
              },
              {
                src: "/images/gallery/visionet-team.jpg",
                alt: "With the team at a Microsoft event",
                ratio: "aspect-[3/4]",
              },
              {
                src: "/images/gallery/team-lab.jpg",
                alt: "With teammates in a computer lab",
              },
              {
                src: "/images/gallery/calculus-desk.jpg",
                alt: "Calculus notes, a calculator and coffee",
              },
              {
                src: "/images/gallery/workspace.jpg",
                alt: "A working desk mid-project",
                ratio: "aspect-[3/4]",
              },
            ]}
          />
        </div>

        <div className="mt-14 space-y-5">
          {experience.map((role, i) => (
            <Reveal key={`${role.org}-${role.title}`} delay={i * 70}>
              <RoleCard role={role} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <figure className="mt-16">
            <p className="eyebrow">The Amazon placement</p>
            <div
              className="mt-4 overflow-hidden rounded-xl"
              style={{ border: "1px solid var(--border)" }}
            >
              <div className="relative aspect-[3.5/1] w-full">
                <Photo
                  src="/images/gallery/amazon-offer.jpg"
                  alt="Email confirming selection for the year-long Amazon internship placement for the 2025/2026 school year"
                  hint="the Amazon placement email"
                  sizes="(max-width: 768px) 95vw, 56rem"
                />
              </div>
            </div>
            <figcaption
              className="mt-3 text-xs"
              style={{ color: "var(--text-faint)" }}
            >
              Selected as 1 of 2 students from a school of 4,000+, through the
              Practicum in Entrepreneurship course.
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={200}>
          <div className="panel mt-14 p-7">
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

import Photo from "./photo";
import Reveal from "./reveal";

/**
 * The facets that do not fit a project list. Each frame is labelled, so
 * the wall reads as one person in several modes rather than a gallery.
 */
const shades = [
  {
    src: "/images/shades/veena.jpg",
    label: "the musician",
    alt: "Playing the veena as a child, seated on the floor",
    ratio: "aspect-[4/3]",
  },
  {
    src: "/images/shades/tedx-letters.jpg",
    label: "the speaker",
    alt: "Standing behind the TEDx letters on stage",
    ratio: "aspect-[4/3]",
  },
  {
    src: "/images/shades/karate.jpg",
    label: "the fighter",
    alt: "Mid-kick during a karate class",
    ratio: "aspect-[16/9]",
  },
  {
    src: "/images/shades/makerspace.jpg",
    label: "the maker",
    alt: "In a makerspace beside a 3D printer and a pegboard of tools",
    ratio: "aspect-[4/3]",
  },
  {
    src: "/images/shades/microsoft-desk.jpg",
    label: "the intern",
    alt: "At a Microsoft office wearing an intern badge",
    ratio: "aspect-[4/3]",
  },
];

export default function Shades() {
  return (
    <section className="mx-auto mt-28 max-w-6xl px-4 sm:px-6">
      <Reveal>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Off the résumé</p>
            <h2
              className="font-display mt-3 text-4xl font-semibold sm:text-5xl"
              style={{ color: "var(--text)" }}
            >
              Different{" "}
              <span className="underline-sketch">shades</span> of me.
            </h2>
          </div>
          <p className="lede max-w-sm">
            Carnatic veena, a TEDx stage, a karate mat, a 3D printer, a badge
            at the front desk. Same person, different rooms.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 columns-2 gap-5 sm:columns-3 [column-fill:balance]">
        {shades.map((s, i) => (
          <div key={s.src} className="mb-5 break-inside-avoid">
            <Reveal delay={i * 70}>
              <figure
                className={`polaroid polaroid-tight relative ${
                  i % 2 === 0 ? "tilt-l" : "tilt-r"
                }`}
              >
                <div
                  className={`relative w-full overflow-hidden ${s.ratio}`}
                >
                  <Photo
                    src={s.src}
                    alt={s.alt}
                    hint={s.label}
                    sizes="(max-width: 640px) 45vw, 22rem"
                  />
                </div>
                <figcaption className="margin-note mt-3 text-center text-lg">
                  {s.label}
                </figcaption>
              </figure>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}

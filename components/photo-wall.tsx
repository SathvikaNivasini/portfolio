import Photo from "./photo";
import Reveal from "./reveal";

export type WallItem = {
  src: string;
  alt: string;
  /** Tailwind aspect utility matching the photo, so nothing over-crops. */
  ratio?: string;
  /** Optional caption shown under the frame. */
  caption?: string;
};

/**
 * A scrapbook wall of pinned prints. Uses CSS multi-column so frames of
 * different heights pack together instead of leaving gaps under the
 * short ones, and alternates tilt so it reads as pinned rather than laid
 * out on a grid.
 */
export default function PhotoWall({
  items,
  columns = "columns-2 sm:columns-3",
}: {
  items: WallItem[];
  columns?: string;
}) {
  return (
    <div className={`${columns} gap-5 [column-fill:balance]`}>
      {items.map((item, i) => (
        <div key={item.src} className="mb-5 break-inside-avoid">
          <Reveal delay={i * 60}>
            <figure
              className={`polaroid polaroid-tight relative ${
                i % 2 === 0 ? "tilt-l" : "tilt-r"
              }`}
            >
              <div
                className={`relative w-full overflow-hidden ${
                  item.ratio ?? "aspect-[4/3]"
                }`}
              >
                <Photo
                  src={item.src}
                  alt={item.alt}
                  hint={item.alt}
                  sizes="(max-width: 640px) 45vw, 20rem"
                />
              </div>
              {item.caption && (
                <figcaption className="margin-note mt-3 px-1 text-center text-base leading-tight">
                  {item.caption}
                </figcaption>
              )}
            </figure>
          </Reveal>
        </div>
      ))}
    </div>
  );
}

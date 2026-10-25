"use client";

import { useState } from "react";
import Photo from "./photo";

type Props = {
  id: string;
  title: string;
  /** Local poster, so nothing loads from YouTube until the viewer asks. */
  poster: string;
};

/**
 * A click-to-play facade. YouTube is only contacted once the viewer
 * presses play, which keeps the page fast and avoids third-party
 * tracking on load.
 */
export default function YouTube({ id, title, poster }: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className="relative aspect-video w-full overflow-hidden rounded-2xl"
      style={{ border: "1px solid var(--border)", background: "var(--bg-deep)" }}
    >
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 h-full w-full cursor-pointer"
          aria-label={`Play: ${title}`}
        >
          <Photo
            src={poster}
            alt=""
            hint="talk poster"
            sizes="(max-width: 1024px) 100vw, 56rem"
          />
          <span
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, color-mix(in srgb, var(--bg) 80%, transparent), transparent 60%)",
            }}
            aria-hidden
          />
          <span
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
            style={{ background: "var(--accent)" }}
            aria-hidden
          >
            <span
              className="ml-1 block h-0 w-0"
              style={{
                borderTop: "10px solid transparent",
                borderBottom: "10px solid transparent",
                borderLeft: "16px solid var(--bg)",
              }}
            />
          </span>
          <span
            className="absolute bottom-4 left-5 right-5 text-left text-sm font-medium"
            style={{ color: "var(--text)" }}
          >
            {title}
          </span>
        </button>
      )}
    </div>
  );
}

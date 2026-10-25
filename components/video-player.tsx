"use client";

import { useState } from "react";
import Photo from "./photo";

type Props = {
  src: string;
  poster: string;
  title: string;
  note?: string;
};

/**
 * A local video with sound, loaded only once the viewer presses play.
 * Used for talks, where the audio is the point — unlike the silent
 * workshop clips.
 */
export default function VideoPlayer({ src, poster, title, note }: Props) {
  const [started, setStarted] = useState(false);

  return (
    <figure>
      <div
        className="relative aspect-video w-full overflow-hidden rounded-2xl"
        style={{
          border: "1px solid var(--border)",
          background: "var(--bg-deep)",
        }}
      >
        {started ? (
          <video
            src={src}
            poster={poster}
            controls
            autoPlay
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="group absolute inset-0 h-full w-full cursor-pointer"
            aria-label={`Play: ${title}`}
          >
            <Photo
              src={poster}
              alt=""
              hint="video poster"
              sizes="(max-width: 1024px) 100vw, 48rem"
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
      {note && (
        <figcaption
          className="mt-3 text-xs leading-relaxed"
          style={{ color: "var(--text-faint)" }}
        >
          {note}
        </figcaption>
      )}
    </figure>
  );
}

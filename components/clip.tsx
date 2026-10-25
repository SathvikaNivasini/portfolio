"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  /** Described for anyone who cannot see the clip. */
  label: string;
  caption?: string;
  ratio?: string;
  tilt?: "tilt-l" | "tilt-r";
};

/**
 * A short looping clip with no audio track at all — these are encoded
 * without one, so there is nothing to unmute. Playback waits until the
 * clip is on screen, and holds on the poster frame when the viewer has
 * asked for reduced motion.
 */
export default function Clip({
  src,
  poster,
  label,
  caption,
  ratio = "aspect-[9/16]",
  tilt = "tilt-r",
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Autoplay can still be refused; the poster stays visible if so.
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.3 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <figure className={`polaroid polaroid-tight ${tilt} relative`}>
      <div className={`relative w-full overflow-hidden ${ratio}`}>
        <video
          ref={ref}
          src={reduced ? undefined : src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      {caption && (
        <figcaption className="margin-note mt-3 px-1 text-center text-base leading-tight">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

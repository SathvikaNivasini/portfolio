"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>[]{}=+*#$%&";

/**
 * Resolves the text out of noise, character by character, the first time
 * it is seen. The real string stays in the DOM as the accessible label,
 * so the scramble is decoration rather than the only copy of the words.
 */
export default function Scramble({
  children,
  speed = 28,
  className = "",
}: {
  children: string;
  /** ms per frame. */
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [out, setOut] = useState(children);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = children;

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || done.current) return;
        done.current = true;
        io.disconnect();

        // Scramble only once it is actually on screen. Blanking on mount
        // would leave the text invisible on anything never scrolled to.
        let frame = 0;
        const perChar = 3; // frames each character stays scrambled
        const total = target.length * perChar + 12;

        const id = setInterval(() => {
          frame++;
          let s = "";
          for (let i = 0; i < target.length; i++) {
            const settleAt = i * perChar;
            if (target[i] === " ") {
              s += " ";
            } else if (frame > settleAt) {
              s += target[i];
            } else {
              s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            }
          }
          setOut(s);
          if (frame >= total) {
            clearInterval(id);
            setOut(target);
          }
        }, speed);
      },
      { threshold: 0.5 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [children, speed]);

  return (
    <span ref={ref} className={className} aria-label={children}>
      <span aria-hidden>{out}</span>
    </span>
  );
}

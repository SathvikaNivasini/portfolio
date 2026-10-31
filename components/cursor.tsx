"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A two-part cursor: a small dot that tracks exactly, and a ring that
 * lags behind and swells over anything interactive. Mouse pointers only
 * — touch and reduced motion get the normal cursor, untouched.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!fine || reduced) return;

    setOn(true);
    document.documentElement.classList.add("has-custom-cursor");

    let x = innerWidth / 2;
    let y = innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;
    let hovering = false;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const el = e.target as Element | null;
      hovering = !!el?.closest?.(
        'a, button, [role="button"], [role="link"], input, textarea, select, summary'
      );
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      // the ring eases toward the dot, which gives the trailing feel
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${
          hovering ? 1.9 : 1
        })`;
        ring.current.style.opacity = hovering ? "0.9" : "0.45";
      }
    };

    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!on) return null;

  return (
    <>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] h-[6px] w-[6px] rounded-full"
        style={{ background: "var(--accent)", willChange: "transform" }}
      />
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] h-9 w-9 rounded-full"
        style={{
          border: "1px solid var(--accent)",
          willChange: "transform, opacity",
          transition: "opacity 0.25s ease",
          boxShadow: "0 0 18px var(--accent-glow)",
        }}
      />
    </>
  );
}

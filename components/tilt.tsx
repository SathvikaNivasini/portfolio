"use client";

import { useRef, useState } from "react";

/**
 * Tips the card toward the pointer and lifts a soft highlight under it.
 * Pointer-driven only, so it never runs on touch, and it is skipped
 * entirely when reduced motion is requested.
 */
export default function Tilt({
  children,
  max = 7,
  className = "",
}: {
  children: React.ReactNode;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glow, setGlow] = useState({ x: 50, y: 50, on: false });

  const reduced = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || reduced()) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setStyle({
      transform: `perspective(900px) rotateX(${(0.5 - py) * max * 2}deg) rotateY(${
        (px - 0.5) * max * 2
      }deg) translateZ(0)`,
      transition: "transform 0.08s linear",
    });
    setGlow({ x: px * 100, y: py * 100, on: true });
  };

  const reset = () => {
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg)",
      transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
    });
    setGlow((g) => ({ ...g, on: false }));
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ ...style, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: glow.on ? 1 : 0,
          background: `radial-gradient(28rem circle at ${glow.x}% ${glow.y}%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 45%)`,
        }}
      />
    </div>
  );
}

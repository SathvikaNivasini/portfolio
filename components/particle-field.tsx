"use client";

import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; r: number };

/**
 * A live constellation: drifting nodes that link to their neighbours and
 * bend toward the pointer. Canvas rather than DOM so a few hundred nodes
 * stay cheap, and it halts whenever it is off screen or the tab is
 * hidden so it never burns battery in the background.
 */
export default function ParticleField({
  density = 0.00009,
  linkDist = 130,
  className = "",
}: {
  density?: number;
  linkDist?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let parts: P[] = [];
    let raf = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999, active: false };

    const accent = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim() || "#bfa0f7";

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Scale the node count to the area, and keep it modest on phones.
      // Pairs grow with the square of the node count, so the cap matters
      // more than the density. Low-core machines get fewer still.
      const cores = navigator.hardwareConcurrency || 4;
      const cap = window.innerWidth < 640 ? 34 : cores <= 4 ? 60 : 90;
      const target = Math.round(Math.min(w * h * density, cap));
      parts = Array.from({ length: target }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.4 + 0.5,
      }));
    };

    const step = () => {
      raf = requestAnimationFrame(step);
      if (!visible || document.hidden) return;

      ctx.clearRect(0, 0, w, h);
      const col = accent();

      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;

        // gentle pull toward the pointer, with a hard floor so nodes
        // never slingshot when the cursor sits right on top of one
        if (pointer.active) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 26000 && d2 > 1) {
            const f = 0.035 / Math.max(Math.sqrt(d2), 14);
            p.vx += dx * f;
            p.vy += dy * f;
          }
        }

        // damping keeps the drift from accelerating away
        p.vx *= 0.986;
        p.vy *= 0.986;
        const sp = Math.hypot(p.vx, p.vy);
        if (sp < 0.04) {
          p.vx += (Math.random() - 0.5) * 0.04;
          p.vy += (Math.random() - 0.5) * 0.04;
        }

        if (p.x < 0) p.x += w;
        if (p.x > w) p.x -= w;
        if (p.y < 0) p.y += h;
        if (p.y > h) p.y -= h;
      }

      // Links, batched into a few alpha buckets. Stroking every segment
      // separately costs thousands of draw calls a frame; this is four.
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = col;
      const BUCKETS = 4;
      const paths: Path2D[] = Array.from({ length: BUCKETS }, () => new Path2D());
      const linkSq = linkDist * linkDist;

      for (let i = 0; i < parts.length; i++) {
        const a = parts[i];
        for (let j = i + 1; j < parts.length; j++) {
          const b = parts[j];
          const dx = a.x - b.x;
          if (dx > linkDist || dx < -linkDist) continue;
          const dy = a.y - b.y;
          if (dy > linkDist || dy < -linkDist) continue;
          const d2 = dx * dx + dy * dy;
          if (d2 >= linkSq) continue;
          const t = 1 - Math.sqrt(d2) / linkDist;
          const bucket = Math.min(BUCKETS - 1, (t * BUCKETS) | 0);
          const path = paths[bucket];
          path.moveTo(a.x, a.y);
          path.lineTo(b.x, b.y);
        }
      }

      for (let k = 0; k < BUCKETS; k++) {
        ctx.globalAlpha = ((k + 0.5) / BUCKETS) * 0.3;
        ctx.stroke(paths[k]);
      }

      // nodes
      for (const p of parts) {
        const near =
          pointer.active && Math.hypot(pointer.x - p.x, pointer.y - p.y) < 120;
        ctx.globalAlpha = near ? 0.95 : 0.55;
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(p.x, p.y, near ? p.r * 1.8 : p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = e.pointerType === "mouse";
    };
    const onLeave = () => (pointer.active = false);

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), {
      threshold: 0,
    });
    io.observe(canvas);

    resize();
    raf = requestAnimationFrame(step);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [density, linkDist]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}

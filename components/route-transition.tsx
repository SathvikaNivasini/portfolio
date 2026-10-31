"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Sweeps a panel across the viewport whenever the route changes, so
 * pages hand over rather than snapping. Purely decorative: it sits above
 * the page for a few hundred milliseconds and never blocks input,
 * and it does nothing at all under reduced motion.
 */
export default function RouteTransition() {
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "wipe">("idle");
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setState("wipe");
    const t = setTimeout(() => setState("idle"), 620);
    return () => clearTimeout(t);
  }, [pathname]);

  if (state === "idle") return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[80] overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, transparent 0%, color-mix(in srgb, var(--accent) 22%, transparent) 42%, color-mix(in srgb, var(--accent-warm) 18%, transparent) 58%, transparent 100%)",
          animation: "route-sweep 0.62s cubic-bezier(0.65,0,0.35,1) forwards",
        }}
      />
    </div>
  );
}

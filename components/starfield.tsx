"use client";

import { useMemo } from "react";

/**
 * Deterministic pseudo-random star layout. Seeded so the server and the
 * client agree and React does not complain about a hydration mismatch.
 */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export default function Starfield({ count = 70 }: { count?: number }) {
  const stars = useMemo(() => {
    const rand = seeded(42);
    return Array.from({ length: count }, () => ({
      left: `${rand() * 100}%`,
      top: `${rand() * 100}%`,
      size: `${rand() * 1.8 + 0.6}px`,
      duration: `${rand() * 4 + 3}s`,
      delay: `${rand() * 5}s`,
    }));
  }, [count]);

  return (
    <div className="starfield" aria-hidden>
      {stars.map((s, i) => (
        <span
          key={i}
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDuration: s.duration,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
}

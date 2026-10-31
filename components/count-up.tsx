"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts the numeric part of a stat up on first view, keeping any
 * prefix or suffix intact — "$10,000+" counts the 10,000 and keeps the
 * dollar sign and the plus. Values with no number, like "24–72h", are
 * rendered as they are.
 */
export default function CountUp({
  value,
  duration = 1400,
  className = "",
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Split into prefix / number / suffix, e.g. "$10,000+" or "4.1×10⁻¹⁶".
    const m = value.match(/^([^\d]*)([\d,.]+)(.*)$/);
    if (!m) return;

    const [, prefix, rawNum, suffix] = m;
    const target = parseFloat(rawNum.replace(/,/g, ""));
    if (!isFinite(target)) return;

    const decimals = (rawNum.split(".")[1] || "").length;
    const grouped = rawNum.includes(",");

    const format = (n: number) => {
      const fixed = n.toFixed(decimals);
      const withCommas = grouped
        ? Number(fixed).toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : fixed;
      return `${prefix}${withCommas}${suffix}`;
    };

    setDisplay(format(0));

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || started.current) return;
        started.current = true;
        io.disconnect();

        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / duration, 1);
          // ease-out cubic, so it decelerates into the final number
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(format(target * eased));
          if (p < 1) requestAnimationFrame(tick);
          else setDisplay(value);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

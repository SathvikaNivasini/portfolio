"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: string;
  /** ms between each word. */
  stagger?: number;
  delay?: number;
  className?: string;
  as?: "span" | "div";
};

/**
 * Flies each word up into place on first view. The full string is always
 * in the DOM as one accessible label, so screen readers and search
 * engines never see it as loose fragments.
 */
export default function SplitText({
  children,
  stagger = 55,
  delay = 0,
  className = "",
  as = "span",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as;
  const words = children.split(" ");

  if (reduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag
      ref={ref as never}
      className={className}
      aria-label={children}
      style={{ display: "inline-block" }}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          aria-hidden
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
          }}
        >
          <span
            style={{
              display: "inline-block",
              transform: shown ? "translateY(0)" : "translateY(110%)",
              opacity: shown ? 1 : 0,
              transition: `transform 0.75s cubic-bezier(0.22,1,0.36,1) ${
                delay + i * stagger
              }ms, opacity 0.6s ease ${delay + i * stagger}ms`,
            }}
          >
            {w}
          </span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}

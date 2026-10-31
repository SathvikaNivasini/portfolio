"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  words: string[];
  /** ms per character while typing. */
  typeSpeed?: number;
  /** ms per character while deleting. */
  deleteSpeed?: number;
  /** ms to hold a finished word. */
  holdTime?: number;
  className?: string;
};

/**
 * Types each word, holds it, deletes it, moves on. Falls back to the
 * first word, rendered plainly, when reduced motion is requested — the
 * text is never only available via animation.
 */
export default function Typewriter({
  words,
  typeSpeed = 85,
  deleteSpeed = 45,
  holdTime = 1600,
  className = "",
}: Props) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [mounted, setMounted] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    setMounted(true);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!mounted || reduced || words.length === 0) return;

    const word = words[index % words.length];

    if (!deleting && text === word) {
      timer.current = setTimeout(() => setDeleting(true), holdTime);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      const next = deleting
        ? word.slice(0, text.length - 1)
        : word.slice(0, text.length + 1);
      timer.current = setTimeout(
        () => setText(next),
        deleting ? deleteSpeed : typeSpeed
      );
    }

    return () => clearTimeout(timer.current);
  }, [
    text,
    deleting,
    index,
    words,
    typeSpeed,
    deleteSpeed,
    holdTime,
    reduced,
    mounted,
  ]);

  // Server render and reduced motion both show the first word as-is.
  if (!mounted || reduced) {
    return <span className={className}>{words[0]}</span>;
  }

  return (
    <span className={className}>
      <span aria-live="polite">{text}</span>
      <span
        aria-hidden
        style={{
          display: "inline-block",
          width: "1px",
          marginLeft: "2px",
          alignSelf: "stretch",
          background: "currentColor",
          animation: "caret 1s step-end infinite",
        }}
        className="h-[1em] translate-y-[0.15em]"
      />
    </span>
  );
}

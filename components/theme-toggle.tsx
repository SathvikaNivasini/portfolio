"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    setTheme(stored === "light" ? "light" : "dark");
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode — the toggle still works for this session */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="panel panel-hover flex h-9 w-9 items-center justify-center"
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      title={theme === "dark" ? "Daylight" : "Midnight"}
    >
      <span
        className="text-sm transition-transform duration-500"
        style={{
          color: "var(--accent-warm)",
          transform: mounted && theme === "light" ? "rotate(180deg)" : "none",
        }}
        aria-hidden
      >
        {mounted && theme === "light" ? "☾" : "☀"}
      </span>
    </button>
  );
}

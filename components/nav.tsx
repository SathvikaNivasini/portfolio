"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "./theme-toggle";
import { profile } from "@/lib/content";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Story" },
  { href: "/projects", label: "Lab" },
  { href: "/experience", label: "Industry" },
  { href: "/community", label: "Community" },
  { href: "/speaking", label: "Voice" },
  { href: "/journal", label: "Notebook" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{
        background: scrolled || open ? "color-mix(in srgb, var(--bg) 88%, transparent)" : "transparent",
        backdropFilter: scrolled || open ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled || open ? "blur(16px)" : "none",
        borderBottom: `1px solid ${scrolled || open ? "var(--border)" : "transparent"}`,
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2"
          aria-label="Home"
        >
          <span
            className="font-display text-xl font-semibold tracking-tight"
            style={{ color: "var(--text)" }}
          >
            SN
          </span>
          <span
            className="text-base transition-transform duration-500 group-hover:rotate-90"
            style={{ color: "var(--accent)" }}
            aria-hidden
          >
            ✦
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative rounded-full px-3.5 py-1.5 text-sm transition-colors duration-300"
              style={{
                color: isActive(l.href) ? "var(--text)" : "var(--text-muted)",
                background: isActive(l.href) ? "var(--surface)" : "transparent",
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:opacity-85 sm:inline-flex"
            style={{
              background: "var(--accent)",
              color: "var(--bg)",
            }}
          >
            Let&apos;s connect →
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="panel flex h-9 w-9 items-center justify-center md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className="relative block h-3 w-4">
              <span
                className="absolute left-0 block h-px w-4 transition-all duration-300"
                style={{
                  background: "var(--text)",
                  top: open ? "6px" : "1px",
                  transform: open ? "rotate(45deg)" : "none",
                }}
              />
              <span
                className="absolute left-0 block h-px w-4 transition-all duration-300"
                style={{
                  background: "var(--text)",
                  top: open ? "6px" : "11px",
                  transform: open ? "rotate(-45deg)" : "none",
                }}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className="overflow-hidden transition-all duration-400 md:hidden"
        style={{ maxHeight: open ? "22rem" : "0rem" }}
      >
        <nav className="flex flex-col gap-1 px-4 pb-5 pt-1 sm:px-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2.5 text-sm"
              style={{
                color: isActive(l.href) ? "var(--text)" : "var(--text-muted)",
                background: isActive(l.href) ? "var(--surface)" : "transparent",
              }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 rounded-lg px-3 py-2.5 text-center text-sm font-medium"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            Let&apos;s connect →
          </a>
        </nav>
      </div>
    </header>
  );
}

import Link from "next/link";
import { profile } from "@/lib/content";

const columns = [
  {
    heading: "The site",
    links: [
      { href: "/about", label: "My story" },
      { href: "/projects", label: "The lab" },
      { href: "/experience", label: "Industry" },
      { href: "/speaking", label: "Voice" },
      { href: "/journal", label: "Notebook" },
    ],
  },
  {
    heading: "The work",
    links: [
      { href: "/projects/vakshala", label: "VakShala" },
      { href: "/projects/nirvband", label: "NirvBand" },
      { href: "/projects/photobioreactor", label: "Photobioreactor" },
      { href: "/projects/cctia", label: "CCTIA" },
      { href: "/projects/top-the-graph", label: "Top The Graph" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="relative mt-24 border-t px-4 pb-10 pt-14 sm:px-6"
      style={{ borderColor: "var(--border)", background: "var(--bg-deep)" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-display text-2xl" style={{ color: "var(--text)" }}>
              Let&apos;s build something
              <br />
              worth building.
            </p>
            <p className="lede mt-3 max-w-sm text-[0.95rem]">
              I&apos;m happy to talk about engineering, communication, or
              working on something together.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-4 py-2 text-sm font-medium transition-opacity hover:opacity-85"
                style={{ background: "var(--accent)", color: "var(--bg)" }}
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="panel panel-hover rounded-full px-4 py-2 text-sm"
                style={{ color: "var(--text)" }}
              >
                Email
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <p className="eyebrow mb-3.5">{col.heading}</p>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm transition-colors hover:opacity-100"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hairline my-9" />

        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-xs" style={{ color: "var(--text-faint)" }}>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="margin-note text-base">
            Different pieces. Same vision. ✦
          </p>
        </div>
      </div>
    </footer>
  );
}

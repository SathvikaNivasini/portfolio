import type { Role } from "@/lib/content";

export default function RoleCard({ role }: { role: Role }) {
  const org = role.href ? (
    <a
      href={role.href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline decoration-1 underline-offset-2 transition-opacity hover:opacity-80"
      style={{ color: "var(--accent)" }}
    >
      {role.org} ↗
    </a>
  ) : (
    role.org
  );

  return (
    <article
      id={role.slug}
      className="panel panel-hover scroll-mt-28 p-7"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2
          className="font-display text-xl font-semibold"
          style={{ color: "var(--text)" }}
        >
          {role.title}
        </h2>
        <span
          className="whitespace-nowrap text-sm"
          style={{ color: "var(--text-faint)" }}
        >
          {role.period}
        </span>
      </div>

      <p className="mt-1.5 text-sm" style={{ color: "var(--accent)" }}>
        {org}
        {role.location && (
          <span style={{ color: "var(--text-faint)" }}> · {role.location}</span>
        )}
      </p>

      {role.note && (
        <p
          className="mt-4 rounded-lg px-4 py-3 text-sm leading-relaxed"
          style={{
            background: "color-mix(in srgb, var(--accent) 10%, transparent)",
            color: "var(--text)",
          }}
        >
          {role.note}
        </p>
      )}

      <ul className="mt-4 space-y-2.5">
        {role.points.map((pt, j) => (
          <li key={j} className="flex gap-3">
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: "var(--accent-warm)" }}
              aria-hidden
            />
            <span
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              {pt}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

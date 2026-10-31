import type { Certification } from "@/lib/content";

/**
 * Renders as a link when the certificate file is available, so the
 * credential can be checked rather than taken on trust.
 */
export default function CertCard({ cert }: { cert: Certification }) {
  const inner = (
    <>
      <div className="flex items-start justify-between gap-4">
        <h3
          className="font-display text-base font-semibold leading-snug"
          style={{ color: "var(--text)" }}
        >
          {cert.name}
        </h3>
        {cert.file && (
          <span
            className="shrink-0 text-sm"
            style={{ color: "var(--accent)" }}
            aria-hidden
          >
            ↗
          </span>
        )}
      </div>

      <p className="mt-1.5 text-sm" style={{ color: "var(--accent)" }}>
        {cert.issuer}
        <span style={{ color: "var(--text-faint)" }}> · {cert.date}</span>
      </p>

      {cert.note && (
        <p className="mt-2 text-xs" style={{ color: "var(--text-muted)" }}>
          {cert.note}
        </p>
      )}

      {cert.credentialId && (
        <p
          className="mt-2.5 font-mono text-[0.68rem] tracking-wide"
          style={{ color: "var(--text-faint)" }}
        >
          ID {cert.credentialId}
        </p>
      )}
    </>
  );

  if (cert.file) {
    return (
      <a
        href={cert.file}
        target="_blank"
        rel="noopener noreferrer"
        className="panel panel-hover block h-full p-6"
      >
        {inner}
      </a>
    );
  }

  return <div className="panel h-full p-6">{inner}</div>;
}

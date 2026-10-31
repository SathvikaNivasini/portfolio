import Photo from "./photo";
import type { Certification } from "@/lib/content";

/**
 * Shows the certificate itself where there is one, and links to the PDF
 * so the credential can be checked rather than taken on trust.
 */
export default function CertCard({ cert }: { cert: Certification }) {
  const inner = (
    <>
      {cert.image && (
        <div
          className="relative mb-5 aspect-[4/3] w-full overflow-hidden rounded-lg"
          style={{ background: "#ffffff", border: "1px solid var(--border)" }}
        >
          <Photo
            src={cert.image}
            alt={`${cert.name} certificate issued by ${cert.issuer}`}
            hint={`${cert.name} certificate`}
            className="!object-contain p-2"
            sizes="(max-width: 640px) 92vw, 30rem"
          />
        </div>
      )}

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

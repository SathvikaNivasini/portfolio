import Link from "next/link";
import Starfield from "@/components/starfield";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4 py-32">
      <Starfield count={70} />
      <div className="relative text-center">
        <p className="margin-note text-2xl">lost in the constellation…</p>
        <h1
          className="font-display mt-3 text-5xl font-semibold sm:text-6xl"
          style={{ color: "var(--text)" }}
        >
          404
        </h1>
        <p className="lede mx-auto mt-4 max-w-sm">
          This star isn&apos;t on the map. Let&apos;s get you back to one that
          is.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-85"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            Back home →
          </Link>
          <Link
            href="/projects"
            className="panel panel-hover rounded-full px-6 py-3 text-sm font-medium"
            style={{ color: "var(--text)" }}
          >
            See the lab
          </Link>
        </div>
      </div>
    </div>
  );
}

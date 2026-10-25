"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  /** Shown in the placeholder so the slot is self-documenting. */
  hint?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * An image that degrades into a labelled placeholder when the file is not
 * there yet. Lets the whole site be built and reviewed before the real
 * photos land, without any slot looking broken.
 */
export default function Photo({
  src,
  alt,
  hint,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center ${className}`}
        style={{
          background:
            "linear-gradient(135deg, color-mix(in srgb, var(--accent) 12%, transparent), color-mix(in srgb, var(--accent-warm) 10%, transparent))",
          border: "1px dashed var(--border-strong)",
        }}
        role="img"
        aria-label={alt}
      >
        <span className="text-lg" style={{ color: "var(--accent)" }} aria-hidden>
          ✦
        </span>
        <span
          className="font-hand text-base leading-snug"
          style={{ color: "var(--accent-warm)" }}
        >
          {hint ?? alt}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}

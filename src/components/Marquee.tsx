// src/components/Marquee.tsx
"use client";

import React from "react";

export function Marquee({ items }: { items: string[] }) {
  // Duplicate for seamless loop
  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/20">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-zinc-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-zinc-950 to-transparent" />

      <div className="marquee flex gap-3 py-3">
        {loop.map((t, idx) => (
          <span
            // idx is fine here; list is deterministic and duplicated intentionally
            key={`${t}-${idx}`}
            className="whitespace-nowrap rounded-full border border-zinc-800 bg-zinc-950/40 px-3 py-1 text-xs text-zinc-300"
          >
            {t}
          </span>
        ))}
      </div>

      <style jsx>{`
        .marquee {
          width: max-content;
          animation: scroll 22s linear infinite;
        }
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

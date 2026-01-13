import Link from "next/link";
import React from "react";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-10">{children}</div>
    </div>
  );
}

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] shadow-sm">
      {children}
    </div>
  );
}

export function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="p-6">{children}</div>;
}

export function ButtonLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium
        border border-[rgb(var(--border))] bg-[rgb(var(--surface))] hover:opacity-90 transition"
    >
      {children}
    </Link>
  );
}

export function PrimaryButton({
  children,
  type = "button",
}: {
  children: React.ReactNode;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium
        bg-[rgb(var(--accent))] text-white hover:opacity-90 transition"
    >
      {children}
    </button>
  );
}

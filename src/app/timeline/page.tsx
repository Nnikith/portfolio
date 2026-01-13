// src/app/timeline/page.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type TimelineItem = {
  id: string;
  title: string;
  subtitle?: string;
  time: string;
  body: string;
  tags?: string[];
  links?: { label: string; href: string }[];
};

type Side = "left" | "right";

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(!!mq.matches);
    apply();

    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", apply);
      return () => mq.removeEventListener("change", apply);
    }
    mq.addListener(apply);
    return () => mq.removeListener(apply);
  }, []);

  return reduced;
}

function useInView<T extends Element>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
            break;
          }
        }
      },
      { root: null, threshold: 0.2, rootMargin: "0px 0px -12% 0px", ...options }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs text-zinc-300">
      {children}
    </span>
  );
}

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 text-sm font-medium text-zinc-200 underline decoration-zinc-700 underline-offset-4 hover:text-white hover:decoration-zinc-400"
    >
      {children}
      <span aria-hidden className="text-zinc-500">
        ↗
      </span>
    </a>
  );
}

function Node({ active }: { active: boolean }) {
  return (
    <div className="relative z-10 grid h-5 w-5 place-items-center rounded-full border border-zinc-700 bg-zinc-950">
      <span
        className={[
          "h-2.5 w-2.5 rounded-full bg-zinc-200",
          "transition-transform duration-300",
          active ? "scale-100 motion-safe:animate-pulse" : "scale-90 opacity-70",
        ].join(" ")}
      />
    </div>
  );
}

function Card({
  item,
  side,
  active,
  reducedMotion,
}: {
  item: TimelineItem;
  side: Side;
  active: boolean;
  reducedMotion: boolean;
}) {
  const base = "transition-all duration-500 ease-out will-change-transform";
  const hidden = reducedMotion
    ? "opacity-100 translate-y-0"
    : `opacity-0 translate-y-6 ${side === "left" ? "-translate-x-3" : "translate-x-3"}`;
  const shown = "opacity-100 translate-y-0 translate-x-0";

  return (
    <div className={`${base} ${active ? shown : hidden}`}>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:bg-zinc-900/30">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base font-semibold text-zinc-50">{item.title}</h3>
            <span className="rounded-full border border-zinc-800 bg-zinc-950/40 px-3 py-1 text-xs text-zinc-300">
              {item.time}
            </span>
          </div>

          {item.subtitle ? <p className="text-sm text-zinc-400">{item.subtitle}</p> : null}

          <p className="mt-2 text-sm leading-relaxed text-zinc-300">{item.body}</p>

          {item.tags && item.tags.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
            </div>
          ) : null}

          {item.links && item.links.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-4">
              {item.links.map((l) => (
                <TextLink key={l.href} href={l.href}>
                  {l.label}
                </TextLink>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Row({
  item,
  side,
  index,
}: {
  item: TimelineItem;
  side: Side;
  index: number;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>();
  const isLeft = side === "left";

  // IMPORTANT: prevent overlap by giving each side a fixed/max width and
  // making the opposite side a true placeholder of the same size.
  const CARD_W = "max-w-[520px]"; // tweak if you want wider/narrower cards

  return (
    <div ref={ref} className="relative">
      {/* Desktop: strict 3-column layout with equal side widths */}
      <div className="hidden md:grid md:grid-cols-[minmax(0,1fr),80px,minmax(0,1fr)] md:items-start md:gap-8">
        {/* Left column */}
        <div className="flex justify-end">
          <div className={`w-full ${CARD_W}`}>
            {isLeft ? (
              <Card item={item} side="left" active={inView} reducedMotion={reducedMotion} />
            ) : (
              // placeholder occupies space, avoids collisions
              <div className="h-0 opacity-0" aria-hidden />
            )}
          </div>
        </div>

        {/* Center column (node) */}
        <div className="flex items-start justify-center pt-6">
          <Node active={inView} />
        </div>

        {/* Right column */}
        <div className="flex justify-start">
          <div className={`w-full ${CARD_W}`}>
            {!isLeft ? (
              <Card item={item} side="right" active={inView} reducedMotion={reducedMotion} />
            ) : (
              <div className="h-0 opacity-0" aria-hidden />
            )}
          </div>
        </div>
      </div>

      {/* Mobile: stacked with left rail */}
      <div className="md:hidden">
        <div className="flex items-start gap-4">
          <div className="pt-6">
            <Node active={inView} />
          </div>
          <div className="w-full">
            <Card
              item={item}
              side={index % 2 === 0 ? "left" : "right"}
              active={inView}
              reducedMotion={reducedMotion}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TimelinePage(): JSX.Element {
  const items: TimelineItem[] = useMemo(
    () => [
      {
        id: "exp-amex",
        title: "Software Development Engineer · AMEX",
        subtitle: "New York, NY",
        time: "Dec 2024 — Present",
        body:
          "Built backend data services using Spark + AWS Glue to process 10+ TB/day for near real-time analytics; orchestrated workflows via Airflow; optimized Redshift access patterns; reduced compute cost ~30% via tuning and parallelization.",
        tags: ["AWS", "Spark", "Glue", "Airflow", "Redshift"],
      },
      {
        id: "exp-kpmg",
        title: "Software Engineer · KPMG",
        subtitle: "India",
        time: "Jan 2020 — Dec 2022",
        body:
          "Built streaming pipelines using Kafka + Python to ingest high-volume events; developed ingestion services integrating APIs/SFTP/DBs; migrated on-prem workloads to AWS; optimized PostgreSQL schemas and queries; automated jobs with Python + shell.",
        tags: ["Kafka", "Python", "AWS", "PostgreSQL"],
      },
      {
        id: "proj-crewai",
        title: "CrewAI Interview Prep",
        subtitle: "Project",
        time: "Project",
        body:
          "Python backend tooling focused on modular service design and scalable execution patterns for interview preparation workflows.",
        tags: ["Python", "Backend", "Modular Design"],
        links: [{ label: "GitHub", href: "https://github.com/Nnikith/CrewAi-Interview-Prep" }],
      },
      {
        id: "proj-nrt",
        title: "Near Real-time Analytics Pipelines (AWS + Spark)",
        subtitle: "Project",
        time: "Project",
        body:
          "Pipeline architecture for multi-terabyte daily datasets with orchestration, monitoring, and data quality controls; cost reduction via query optimization and resource tuning.",
        tags: ["AWS", "Spark", "Glue", "Airflow"],
        links: [{ label: "GitHub", href: "https://github.com/Nnikith" }],
      },
      {
        id: "proj-streaming",
        title: "Real-time Streaming Pipelines (Kafka + Python)",
        subtitle: "Project",
        time: "Project",
        body:
          "Event ingestion and streaming patterns for high-throughput telemetry and downstream consumers, with an ops-first focus on resiliency and repeatable runs.",
        tags: ["Kafka", "Python", "Streaming"],
        links: [{ label: "GitHub", href: "https://github.com/Nnikith" }],
      },
      {
        id: "proj-research",
        title: "Handwriting Text Recognition Research",
        subtitle: "Publication · DOI: 10.56726/IRJMETS29660",
        time: "Sep 2022",
        body:
          "Published research on handwriting text recognition using neural-network-based pattern recognition techniques.",
        tags: ["Neural Networks", "Research"],
      },
      {
        id: "cert-ccp",
        title: "AWS Certified Cloud Practitioner",
        subtitle: "Certification",
        time: "Certified",
        body:
          "Validated cloud fundamentals and AWS core services, security concepts, and billing best practices.",
        tags: ["AWS"],
      },
      {
        id: "cert-saa",
        title: "AWS Certified Solutions Architect – Associate",
        subtitle: "Certification",
        time: "Certified",
        body:
          "Validated ability to design secure, resilient, cost-optimized architectures on AWS.",
        tags: ["AWS", "Architecture"],
      },
      {
        id: "cert-dea",
        title: "AWS Certified Data Engineer – Associate (In Progress)",
        subtitle: "Certification",
        time: "In Progress",
        body:
          "In progress — focusing on data ingestion, transformation, governance, and operational best practices on AWS.",
        tags: ["AWS", "Data Engineering"],
      },
    ],
    []
  );

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-6xl px-6 py-10 md:py-16">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium tracking-wide text-zinc-400">Template page</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
              Timeline
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300">
              Alternating left/right timeline with scroll-reveal “pop” animations. Homepage stays as-is.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="/"
              className="rounded-xl border border-zinc-800 bg-zinc-900/30 px-4 py-2 text-sm font-semibold hover:bg-zinc-900"
            >
              Back to home
            </a>
          </div>
        </header>

        <section id="timeline" className="mt-12">
          <div className="relative">
            {/* Center line (desktop) */}
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-zinc-800 md:block" />
            {/* Left rail (mobile) */}
            <div className="absolute left-4 top-0 h-full w-px bg-zinc-800 md:hidden" />

            {/* Extra vertical spacing so nodes/cards never crowd each other */}
            <div className="grid gap-14 md:gap-16">
              {items.map((it, idx) => (
                <Row key={it.id} item={it} side={idx % 2 === 0 ? "left" : "right"} index={idx} />
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-16 border-t border-zinc-900 pt-8 text-xs text-zinc-500">
          <p>Tip: add/remove items here without changing the homepage.</p>
        </footer>
      </div>
    </main>
  );
}

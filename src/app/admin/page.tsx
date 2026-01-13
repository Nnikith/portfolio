"use client";

import { useMemo, useState } from "react";
import { usePortfolio } from "@/components/PortfolioProvider";
import { DEFAULT_PORTFOLIO } from "@/lib/default-portfolio";
import { STORAGE_KEY, type PortfolioData } from "@/lib/portfolio-schema";

function TextArea({
  label,
  value,
  onChange,
  rows = 6,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <div className="mb-2 text-sm font-medium text-zinc-200">{label}</div>
      <textarea
        className="w-full rounded-xl border border-zinc-800 bg-zinc-950/60 p-3 text-sm text-zinc-100 outline-none focus:border-zinc-600"
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export default function AdminPage() {
  const { data, setData, reset, loadedFromStorage } = usePortfolio();
  const [draft, setDraft] = useState<string>(() => JSON.stringify(data, null, 2));
  const [message, setMessage] = useState<string>("");

  const validJson = useMemo(() => {
    try {
      const parsed = JSON.parse(draft) as PortfolioData;
      return parsed;
    } catch {
      return null;
    }
  }, [draft]);

  const apply = () => {
    setMessage("");
    if (!validJson) {
      setMessage("Invalid JSON. Fix syntax and try again.");
      return;
    }
    setData(validJson);
    setMessage("Saved. Homepage now uses the updated data.");
  };

  const exportJson = async () => {
    try {
      await navigator.clipboard.writeText(draft);
      setMessage("Copied JSON to clipboard.");
    } catch {
      setMessage("Could not copy to clipboard (browser blocked).");
    }
  };

  const loadDefault = () => {
    const next = JSON.stringify(DEFAULT_PORTFOLIO, null, 2);
    setDraft(next);
    setMessage("Loaded default template into editor (not saved yet).");
  };

  const clearStorage = () => {
    reset();
    setDraft(JSON.stringify(DEFAULT_PORTFOLIO, null, 2));
    setMessage(`Cleared ${STORAGE_KEY} from localStorage.`);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-5xl px-6 py-10 md:py-16">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">Edit portfolio data</h1>
            <p className="mt-2 text-sm text-zinc-300">
              This page edits your site content via <span className="text-zinc-200">localStorage</span>.
              No backend yet. Later you can replace storage with a CMS/DB.
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Status: {loadedFromStorage ? "Loaded from localStorage" : "Using defaults (no saved data)"}
            </p>
          </div>
          <a
            href="/"
            className="rounded-xl border border-zinc-800 bg-zinc-900/30 px-4 py-2 text-sm font-semibold hover:bg-zinc-900"
          >
            Back to site
          </a>
        </div>

        <div className="mt-8 grid gap-6">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-6">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={apply}
                className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
              >
                Save + apply
              </button>
              <button
                onClick={exportJson}
                className="rounded-xl border border-zinc-800 bg-zinc-900/30 px-4 py-2 text-sm font-semibold hover:bg-zinc-900"
              >
                Copy JSON
              </button>
              <button
                onClick={loadDefault}
                className="rounded-xl border border-zinc-800 bg-zinc-900/30 px-4 py-2 text-sm font-semibold hover:bg-zinc-900"
              >
                Load default template
              </button>
              <button
                onClick={clearStorage}
                className="rounded-xl border border-zinc-800 bg-zinc-900/30 px-4 py-2 text-sm font-semibold hover:bg-zinc-900"
              >
                Clear saved data
              </button>
            </div>

            {message ? <p className="mt-4 text-sm text-zinc-300">{message}</p> : null}
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-6">
            <TextArea label="Portfolio JSON" value={draft} onChange={setDraft} rows={26} />
            <p className="mt-3 text-xs text-zinc-500">
              Tip: keep this JSON valid. Save applies immediately to the homepage.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

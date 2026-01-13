// src/components/PortfolioProvider.tsx
"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_PORTFOLIO } from "@/lib/default-portfolio";
import { STORAGE_KEY, safeParsePortfolioData, type PortfolioData } from "@/lib/portfolio-schema";

type PortfolioContextValue = {
  data: PortfolioData;
  setData: (next: PortfolioData) => void;
  reset: () => void;
  loadedFromStorage: boolean;
};

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setDataState] = useState<PortfolioData>(DEFAULT_PORTFOLIO);
  const [loadedFromStorage, setLoadedFromStorage] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const parsed = safeParsePortfolioData(JSON.parse(raw));
      if (!parsed) return;

      setDataState(parsed);
      setLoadedFromStorage(true);
    } catch {
      // ignore corrupt storage
    }
  }, []);

  const setData = (next: PortfolioData) => {
    setDataState(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore quota issues
    }
  };

  const reset = () => {
    setDataState(DEFAULT_PORTFOLIO);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setLoadedFromStorage(false);
  };

  const value = useMemo(
    () => ({ data, setData, reset, loadedFromStorage }),
    [data, loadedFromStorage]
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error("usePortfolio must be used within PortfolioProvider");
  return ctx;
}

// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { PortfolioProvider } from "@/components/PortfolioProvider";

export const metadata: Metadata = {
  title: "Nikith Neelisetty | Data Engineer",
  description:
    "Portfolio of Nikith Neelisetty — backend engineering, streaming, and data platforms on AWS.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-zinc-950">
      <body className="bg-zinc-950 text-zinc-100 antialiased">
        <PortfolioProvider>{children}</PortfolioProvider>
      </body>
    </html>
  );
}

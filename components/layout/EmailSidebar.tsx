"use client";

import portfolioData from "@/data/portfolio.json";
import type { PortfolioData } from "@/lib/types";

const data = portfolioData as PortfolioData;

export function EmailSidebar() {
  return (
    <div className="fixed bottom-0 left-8 z-40 hidden xl:flex flex-col items-center gap-6">
      <a
        href={`mailto:${data.personal.email}`}
        className="text-xs tracking-widest text-muted transition-colors hover:text-accent"
        style={{ writingMode: "vertical-rl" }}
      >
        {data.personal.email}
      </a>
      <div className="h-24 w-px bg-border" />
    </div>
  );
}

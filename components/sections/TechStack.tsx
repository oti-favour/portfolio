"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechItem } from "@/components/ui/TechItem";
import { useFadeInOut } from "@/hooks/useFadeInOut";
import portfolioData from "@/data/portfolio.json";
import type { PortfolioData } from "@/lib/types";

const data = portfolioData as PortfolioData;

const categories = [
  { key: "languages" as const, label: "Languages" },
  { key: "frameworks" as const, label: "Frameworks" },
  { key: "tools" as const, label: "Tools" },
];

export function TechStack() {
  const containerRef = useFadeInOut<HTMLDivElement>({
    selector: ".tech-category",
  });

  return (
    <section className="px-6 py-32 lg:px-12 lg:py-48">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="My Stack" />
        <div ref={containerRef} className="flex flex-col gap-24 lg:gap-32">
          {categories.map((cat) => (
            <div key={cat.key} className="tech-category flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <h3 className="shrink-0 font-display text-3xl uppercase text-faint lg:w-56 lg:text-4xl">
                {cat.label}
              </h3>
              <div className="grid max-w-3xl grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                {data.techStack[cat.key].map((tech) => (
                  <TechItem key={tech.name} {...tech} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

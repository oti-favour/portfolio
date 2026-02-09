"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import { useFadeInOut } from "@/hooks/useFadeInOut";
import portfolioData from "@/data/portfolio.json";
import type { PortfolioData } from "@/lib/types";

const data = portfolioData as PortfolioData;

export function Experience() {
  const listRef = useFadeInOut<HTMLDivElement>({
    selector: ".experience-entry",
  });

  return (
    <section id="experience" className="px-6 py-40 lg:px-12 lg:py-56">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="Experience" />
        <div ref={listRef} className="space-y-16 lg:space-y-24">
          {data.experience.map((exp) => (
            <div key={`${exp.company}-${exp.role}`} className="experience-entry">
              <ExperienceCard {...exp} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

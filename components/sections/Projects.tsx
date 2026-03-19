"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectListRow } from "@/components/ui/ProjectListRow";
import { useFadeInOut } from "@/hooks/useFadeInOut";
import portfolioData from "@/data/portfolio.json";
import type { PortfolioData } from "@/lib/types";

const data = portfolioData as PortfolioData;

export function Projects() {
  const listRef = useFadeInOut<HTMLDivElement>({
    selector: ".project-row-wrap",
  });

  return (
    <section id="projects" className="px-6 py-40 lg:px-12 lg:py-56">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="Projects" />
        <p className="-mt-6 mb-4 max-w-2xl text-sm text-muted lg:-mt-8 lg:mb-6 lg:text-base">
          Name and summary below — on desktop, hover a row to see a preview.
        </p>
        <p className="mb-12 text-xs text-faint lg:mb-16 xl:hidden">
          Previews appear on larger screens when you hover each project.
        </p>
        <div ref={listRef}>
          {data.projects.map((project) => (
            <div key={`${project.title}-${project.subtitle}`} className="project-row-wrap">
              <ProjectListRow project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

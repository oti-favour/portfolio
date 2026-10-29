"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import portfolioData from "@/data/portfolio.json";
import type { PortfolioData } from "@/lib/types";

const data = portfolioData as PortfolioData;

export function Projects() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    let moved = false;

    const onDown = (e: PointerEvent) => {
      isDown = true;
      moved = false;
      startX = e.pageX;
      startScroll = track.scrollLeft;
      track.classList.add("dragging");
    };
    const onMove = (e: PointerEvent) => {
      if (!isDown) return;
      const dx = e.pageX - startX;
      if (Math.abs(dx) > 4) moved = true;
      track.scrollLeft = startScroll - dx;
    };
    const onUp = () => {
      isDown = false;
      track.classList.remove("dragging");
    };
    // Suppress the click that ends a drag so cards don't open on drag-release.
    const onClickCapture = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };

    track.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    track.addEventListener("click", onClickCapture, true);

    return () => {
      track.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      track.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  const scroll = (dir: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section id="projects" className="py-28 lg:py-40">
      <div className="mx-auto mb-8 flex max-w-7xl items-end justify-between gap-6 px-6 lg:mb-12 lg:px-12">
        <div>
          <SectionHeading title="Works" index="03" />
          <p className="-mt-6 font-mono text-sm text-accent lg:-mt-10">
            works i&apos;m proud of
          </p>
          <p className="mt-2 max-w-md text-sm text-muted">
            Drag sideways or use the arrows, then click to open.
          </p>
        </div>
        <div className="hidden shrink-0 gap-3 md:flex">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Previous works"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Next works"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="carousel-track flex gap-6 overflow-x-auto px-6 py-8 lg:gap-8 lg:px-12"
      >
        {data.projects.map((project, i) => (
          <div
            key={`${project.title}-${project.subtitle}`}
            className="carousel-item w-[280px] shrink-0 sm:w-[340px] lg:w-[400px]"
          >
            <ProjectCard project={project} index={i} />
          </div>
        ))}
        <div className="w-2 shrink-0" aria-hidden="true" />
      </div>
    </section>
  );
}

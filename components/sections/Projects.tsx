"use client";

import { useRef, useCallback, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectRow } from "@/components/ui/ProjectRow";
import { useFadeInOut } from "@/hooks/useFadeInOut";
import portfolioData from "@/data/portfolio.json";
import type { PortfolioData } from "@/lib/types";

const data = portfolioData as PortfolioData;

export function Projects() {
  const listRef = useFadeInOut<HTMLDivElement>({
    selector: ".project-entry",
  });

  const imageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useRef(false);
  const isHovering = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (imageRef.current) {
      gsap.set(imageRef.current, { opacity: 0, scale: 0.9 });
    }

    // Hide image on scroll — prevents stale image when row scrolls out from under cursor
    function onScroll() {
      if (isHovering.current && imageRef.current) {
        isHovering.current = false;
        gsap.to(imageRef.current, { opacity: 0, scale: 0.9, duration: 0.2 });
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleHoverStart = useCallback((index: number, e: React.MouseEvent) => {
    if (!imageRef.current) return;
    isHovering.current = true;
    const project = data.projects[index];
    const bg = project.thumbnail
      ? `url(${project.thumbnail}) center/cover`
      : `linear-gradient(135deg, ${project.color}40 0%, ${project.color}80 50%, #0A0A0A 100%)`;
    imageRef.current.style.background = bg;

    // Position at right edge of row, vertically centered
    const row = e.currentTarget.getBoundingClientRect();
    const imgW = 400;
    const imgH = 280;
    gsap.set(imageRef.current, {
      x: row.right - imgW,
      y: row.top + row.height / 2 - imgH / 2,
    });

    if (reducedMotion.current) {
      imageRef.current.style.opacity = "1";
      return;
    }
    gsap.to(imageRef.current, { opacity: 1, scale: 1, duration: 0.4 });
  }, []);

  const handleHoverEnd = useCallback(() => {
    if (!imageRef.current) return;
    isHovering.current = false;
    if (reducedMotion.current) {
      imageRef.current.style.opacity = "0";
      return;
    }
    gsap.to(imageRef.current, { opacity: 0, scale: 0.9, duration: 0.3 });
  }, []);

  return (
    <section id="projects" className="px-6 py-40 lg:px-12 lg:py-56">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="Projects" />
        <div ref={listRef} className="space-y-12 lg:space-y-20">
          {data.projects.map((project, i) => (
            <div key={project.title} className="project-entry">
              <ProjectRow
                {...project}
                index={i}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Shared hover preview image — positioned at row right edge */}
      <div
        ref={imageRef}
        className="project-hover-image pointer-events-none fixed left-0 top-0 z-50 h-[280px] w-[400px] overflow-hidden rounded-lg"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
    </section>
  );
}

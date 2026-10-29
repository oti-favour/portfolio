"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import portfolioData from "@/data/portfolio.json";
import type { PortfolioData } from "@/lib/types";

const data = portfolioData as PortfolioData;

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Drag to scroll (fine pointers only; touch uses native scrolling)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

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

  // Gentle auto-scroll (desktop only), pauses on hover and while dragging
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let paused = false;
    let dir = 1;
    const SPEED = 0.5;

    const step = () => {
      raf = requestAnimationFrame(step);
      if (paused) return;
      const max = track.scrollWidth - track.clientWidth;
      if (max <= 1) return;
      let next = track.scrollLeft + SPEED * dir;
      if (next >= max) {
        next = max;
        dir = -1;
      } else if (next <= 0) {
        next = 0;
        dir = 1;
      }
      track.scrollLeft = next;
    };

    const pause = () => {
      paused = true;
    };
    const resume = () => {
      paused = false;
    };

    track.addEventListener("pointerenter", pause);
    track.addEventListener("pointerleave", resume);
    track.addEventListener("pointerdown", pause);
    window.addEventListener("pointerup", resume);
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("pointerenter", pause);
      track.removeEventListener("pointerleave", resume);
      track.removeEventListener("pointerdown", pause);
      window.removeEventListener("pointerup", resume);
    };
  }, []);

  // Pop-in reveal on scroll
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const items = sectionRef.current?.querySelectorAll(".carousel-reveal");
      if (!items || !items.length) return;
      gsap.from(items, {
        opacity: 0,
        y: 120,
        rotateZ: (i: number) => (i % 2 === 0 ? -8 : 8),
        scale: 0.8,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.14,
        scrollTrigger: { trigger: trackRef.current, start: "top 85%" },
      });
    },
    { scope: sectionRef }
  );

  const scroll = (dir: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} id="projects" className="py-20 lg:py-28">
      <div className="mx-auto mb-6 flex max-w-7xl items-end justify-between gap-6 px-6 lg:mb-8 lg:px-12">
        <div>
          <SectionHeading title="Works" index="03" />
          <p className="-mt-6 font-mono text-sm text-accent lg:-mt-8">
            works i&apos;m proud of
          </p>
          <p className="mt-2 max-w-md text-sm text-muted">
            Drag or swipe through the works, then open one.
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
        className="carousel-track flex gap-10 overflow-x-auto px-6 py-10 lg:gap-14 lg:px-12"
      >
        {data.projects.map((project, i) => (
          <div
            key={`${project.title}-${project.subtitle}`}
            className="carousel-item w-[280px] shrink-0 sm:w-[320px] lg:w-[380px]"
          >
            <div className="carousel-reveal">
              <ProjectCard project={project} index={i} />
            </div>
          </div>
        ))}
        <div className="w-2 shrink-0" aria-hidden="true" />
      </div>
    </section>
  );
}

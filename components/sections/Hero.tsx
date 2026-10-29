"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { StatCard } from "@/components/ui/StatCard";
import { HeroObject } from "@/components/ui/HeroObject";
import portfolioData from "@/data/portfolio.json";
import type { PortfolioData } from "@/lib/types";

const data = portfolioData as PortfolioData;

function CornerPlus({ className }: { className: string }) {
  return (
    <svg
      className={`absolute h-3 w-3 text-accent ${className}`}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path d="M6 0V12M0 6H12" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Entrance animation: slide lines in
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-line", {
        y: "110%",
        duration: 1,
        stagger: 0.15,
      });

      tl.from(
        bioRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.4"
      );

      if (statsRef.current) {
        tl.from(
          statsRef.current.children,
          {
            y: 30,
            opacity: 0,
            stagger: 0.15,
            duration: 0.7,
          },
          "-=0.4"
        );
      }

      // Fade-out on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "center center",
        end: "bottom top",
        scrub: true,
        animation: gsap.to(sectionRef.current, {
          opacity: 0,
          y: -50,
          ease: "none",
        }),
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen flex-col justify-center px-6 pt-28 lg:px-12"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Meta bar */}
        <div className="mb-8 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted lg:mb-12">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Available for work
          </span>
          <span className="hidden sm:inline">React / Next / Flutter</span>
        </div>

        {/* Framed headline — blueprint detailing */}
        <div className="relative border border-border px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
          <CornerPlus className="-left-1.5 -top-1.5" />
          <CornerPlus className="-right-1.5 -top-1.5" />
          <CornerPlus className="-bottom-1.5 -left-1.5" />
          <CornerPlus className="-bottom-1.5 -right-1.5" />

          <span className="absolute -top-[9px] left-6 bg-background px-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            00 / Intro
          </span>

          {/* The one WebGL moment — layered behind the headline */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <div className="absolute right-0 top-1/2 hidden h-[118%] w-3/5 -translate-y-1/2 lg:block">
              <HeroObject />
            </div>
          </div>

          <div className="relative z-10">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-muted lg:mb-6">
              {data.personal.name}
            </p>
            <h1
              ref={headingRef}
              className="font-display leading-[0.9] text-foreground"
              style={{ fontSize: "clamp(2.5rem, 9vw, 9.5rem)" }}
            >
              <div className="overflow-hidden">
                <div className="hero-line">SOFTWARE</div>
              </div>
              <div className="overflow-hidden" style={{ paddingLeft: "8vw" }}>
                <div className="hero-line">ENGINEER</div>
              </div>
            </h1>
            <p
              ref={bioRef}
              className="mt-6 max-w-xl text-lg leading-relaxed text-light lg:mt-8 lg:text-xl"
            >
              {data.personal.bio}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="mt-10 flex flex-wrap gap-8 lg:mt-14 lg:gap-12"
        >
          {data.stats.map((stat, i) => (
            <StatCard key={stat.label} index={i} {...stat} />
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="pointer-events-none absolute bottom-10 right-8 hidden items-center gap-3 lg:flex"
        style={{ writingMode: "vertical-rl" }}
        aria-hidden="true"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
          Scroll to explore
        </span>
        <span className="h-16 w-px bg-border" />
      </div>
    </section>
  );
}

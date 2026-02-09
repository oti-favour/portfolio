"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { TextScramble } from "@/components/ui/TextScramble";
import { StatCard } from "@/components/ui/StatCard";
import portfolioData from "@/data/portfolio.json";
import type { PortfolioData } from "@/lib/types";

const data = portfolioData as PortfolioData;

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
      className="relative flex min-h-screen flex-col justify-center px-6 pt-24 lg:px-12"
    >
      <div className="mx-auto w-full max-w-7xl">
        <h1
          ref={headingRef}
          className="font-display leading-[0.9] text-foreground"
          style={{ fontSize: "clamp(2.5rem, 9.5vw, 10rem)" }}
        >
          <div className="overflow-hidden">
            <div className="hero-line">
              <TextScramble text="SOFTWARE" />
            </div>
          </div>
          <div className="overflow-hidden" style={{ paddingLeft: "10vw" }}>
            <div className="hero-line">
              <TextScramble text="DEVELOPER" />
            </div>
          </div>
        </h1>
        <p
          ref={bioRef}
          className="mt-6 max-w-xl text-lg leading-relaxed text-light lg:mt-8 lg:text-xl"
        >
          {data.personal.bio}
        </p>
        <div
          ref={statsRef}
          className="mt-12 flex flex-wrap gap-8 lg:mt-16 lg:gap-12"
        >
          {data.stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

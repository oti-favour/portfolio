"use client";

import { useRef } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import portfolioData from "@/data/portfolio.json";
import type { PortfolioData } from "@/lib/types";

const data = portfolioData as PortfolioData;

export function Footer() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".footer-content > *", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <footer ref={containerRef} className="border-t border-border px-6 py-24 lg:px-12">
      <div className="footer-content mx-auto flex max-w-7xl flex-col items-center gap-8 text-center">
        <p className="text-sm uppercase tracking-widest text-muted">
          Have a project in mind?
        </p>
        <h2 className="font-display text-5xl leading-tight text-foreground sm:text-7xl lg:text-8xl">
          Let&apos;s work
          <br />
          <span className="text-accent">together.</span>
        </h2>
        <a
          href={`mailto:${data.personal.email}`}
          className="group flex items-center gap-2 text-lg text-muted transition-colors hover:text-accent"
        >
          <Mail size={20} />
          {data.personal.email}
        </a>
        <div className="flex items-center gap-6">
          <a
            href={data.personal.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted transition-colors hover:text-accent"
          >
            <Github size={20} />
          </a>
          <a
            href={data.personal.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted transition-colors hover:text-accent"
          >
            <Linkedin size={20} />
          </a>
        </div>
        <p className="mt-8 text-xs text-faint">
          &copy; {new Date().getFullYear()} {data.personal.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

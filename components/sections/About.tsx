"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedText } from "@/components/ui/AnimatedText";
import portfolioData from "@/data/portfolio.json";
import type { PortfolioData } from "@/lib/types";

const data = portfolioData as PortfolioData;

export function About() {
  return (
    <section id="about" className="px-6 py-32 lg:px-12 lg:py-48">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="Me" />
        <div className="max-w-5xl">
          <AnimatedText
            as="p"
            className="text-3xl leading-[1.4] font-light text-faint md:text-4xl lg:text-5xl"
          >
            {data.personal.aboutText}
          </AnimatedText>
        </div>
      </div>
    </section>
  );
}

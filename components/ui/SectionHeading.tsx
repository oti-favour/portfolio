"use client";

import { useFadeInOut } from "@/hooks/useFadeInOut";

interface SectionHeadingProps {
  title: string;
  index?: string;
}

export function SectionHeading({ title, index }: SectionHeadingProps) {
  const ref = useFadeInOut<HTMLDivElement>({
    yIn: 30,
    yOut: -20,
  });

  return (
    <div ref={ref} className="mb-12 lg:mb-16">
      <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted lg:mb-5">
        <span className="h-2 w-2 bg-accent" aria-hidden="true" />
        {index && <span className="text-accent">{index}</span>}
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
      </div>
      <h2 className="font-display text-4xl uppercase leading-[0.95] text-foreground lg:text-6xl">
        {title}
      </h2>
    </div>
  );
}

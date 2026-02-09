"use client";

import { useFadeInOut } from "@/hooks/useFadeInOut";

interface SectionHeadingProps {
  title: string;
}

function PinkFlower() {
  return (
    <svg
      className="h-8 w-8 animate-spin text-accent lg:h-10 lg:w-10"
      style={{ animationDuration: "8s" }}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse
          key={angle}
          cx="16"
          cy="16"
          rx="3.5"
          ry="8"
          transform={`rotate(${angle} 16 16)`}
        />
      ))}
      <circle cx="16" cy="16" r="3" />
    </svg>
  );
}

export function SectionHeading({ title }: SectionHeadingProps) {
  const ref = useFadeInOut<HTMLDivElement>({
    yIn: 30,
    yOut: -20,
  });

  return (
    <div ref={ref} className="mb-12 flex items-center gap-4 lg:mb-16">
      <PinkFlower />
      <h2 className="font-display text-4xl uppercase text-foreground lg:text-5xl">
        {title}
      </h2>
    </div>
  );
}

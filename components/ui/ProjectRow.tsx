"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { TextScramble } from "@/components/ui/TextScramble";
import type { Project } from "@/lib/types";

interface ProjectRowProps extends Project {
  index: number;
  onHoverStart: (index: number, e: React.MouseEvent) => void;
  onHoverEnd: () => void;
}

export function ProjectRow({
  title,
  technologies,
  link,
  index,
  onHoverStart,
  onHoverEnd,
}: ProjectRowProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative cursor-pointer py-6 lg:py-8"
      onMouseEnter={(e) => {
        setIsHovered(true);
        onHoverStart(index, e);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onHoverEnd();
      }}
      onClick={() => {
        if (link) window.open(link, "_blank", "noopener,noreferrer");
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="font-display text-4xl text-light lg:text-5xl xl:text-6xl">
            <TextScramble text={title} hover={isHovered} />
          </h3>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full px-3 py-1 text-xs text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        {link && (
          <span className="shrink-0 text-muted transition-colors group-hover:text-accent">
            <ExternalLink size={20} />
          </span>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const {
    title,
    subtitle,
    tagline,
    technologies,
    link,
    githubUrl,
    appStoreUrl,
    playStoreUrl,
    thumbnail,
    thumbnails,
    color,
  } = project;

  const image = thumbnails?.[0] || thumbnail;
  const primaryUrl = link || appStoreUrl || playStoreUrl || githubUrl;
  const [failed, setFailed] = useState(false);

  return (
    <a
      href={primaryUrl}
      target={primaryUrl ? "_blank" : undefined}
      rel={primaryUrl ? "noopener noreferrer" : undefined}
      data-cursor="view"
      className="group block"
    >
      <div
        className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl border border-border p-6 lg:p-8"
        style={{
          background: `linear-gradient(150deg, ${color}14 0%, #FFFFFF 100%)`,
        }}
      >
        <span className="absolute left-4 top-4 z-10 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="absolute right-4 top-4 z-10 text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
          <ArrowUpRight size={20} aria-hidden="true" />
        </span>

        {image && !failed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={`${title} preview`}
            onError={() => setFailed(true)}
            className="max-h-full w-auto max-w-full rounded-md object-contain shadow-sm transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            No preview yet
          </span>
        )}
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-3">
        <h3 className="font-display text-2xl uppercase tracking-tight text-foreground transition-colors group-hover:text-accent lg:text-3xl">
          {title}
        </h3>
        {subtitle && (
          <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
            {subtitle}
          </span>
        )}
      </div>

      {tagline && (
        <p className="mt-1.5 font-mono text-sm text-accent">{tagline}</p>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        {technologies.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-border px-3 py-1 text-xs text-muted"
          >
            {tech}
          </span>
        ))}
      </div>
    </a>
  );
}

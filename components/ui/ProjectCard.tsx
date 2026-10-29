"use client";

import { useState } from "react";
import Image from "next/image";
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
    description,
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
        className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border"
        style={{ background: `linear-gradient(150deg, ${color}14 0%, #FFFFFF 100%)` }}
      >
        <span className="absolute left-4 top-4 z-10 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="absolute right-4 top-4 z-10 text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
          <ArrowUpRight size={20} aria-hidden="true" />
        </span>

        {image && !failed ? (
          <div className="absolute inset-0 p-5 lg:p-7">
            <div className="relative h-full w-full">
              <Image
                src={image}
                alt={`${title} preview`}
                fill
                sizes="(max-width: 640px) 90vw, 420px"
                onError={() => setFailed(true)}
                className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              No preview yet
            </span>
          </div>
        )}
      </div>

      <div className="mt-5">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-display text-2xl uppercase leading-none tracking-tight text-foreground transition-colors group-hover:text-accent lg:text-3xl">
            {title}
          </h3>
          {subtitle && (
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
              {subtitle}
            </span>
          )}
        </div>
        {tagline && <p className="mt-2 font-mono text-sm text-accent">{tagline}</p>}
        {description && (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
            {description}
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          {technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

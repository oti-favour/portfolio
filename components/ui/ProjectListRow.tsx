"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/lib/types";

interface ProjectListRowProps {
  project: Project;
}

export function ProjectListRow({ project }: ProjectListRowProps) {
  const { title, description, link, appStoreUrl, playStoreUrl, color, thumbnail } =
    project;

  const [imgFailed, setImgFailed] = useState(false);
  const hasPreview = Boolean(thumbnail) && !imgFailed;
  const links = [
    link && { href: link, label: "Website" },
    appStoreUrl && { href: appStoreUrl, label: "App Store" },
    playStoreUrl && { href: playStoreUrl, label: "Google Play" },
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <div className="group flex flex-col border-b border-border py-10 lg:flex-row lg:items-center lg:gap-12 lg:py-14">
      <div className="min-w-0 flex-1 lg:max-w-2xl">
        <h3 className="font-display text-3xl uppercase tracking-tight text-foreground lg:text-4xl xl:text-5xl">
          {title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-muted lg:text-lg">
          {description}
        </p>
        {links.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-4">
            {links.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-light"
              >
                <ExternalLink size={14} aria-hidden />
                {label}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Right column: image appears here on hover — never overlaps text */}
      <div
        className="hidden shrink-0 lg:flex lg:w-[380px] lg:items-center lg:justify-end xl:w-[420px]"
        aria-hidden
      >
        <div
          className="w-full opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
          style={{ minHeight: "200px" }}
        >
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-2xl shadow-black/50 lg:p-6">
            <div
              className="flex min-h-[200px] items-center justify-center rounded-xl bg-background/70 px-6 py-8 lg:min-h-[240px] lg:px-8 lg:py-10"
              style={
                hasPreview
                  ? undefined
                  : {
                      background: `linear-gradient(160deg, ${color}22 0%, #1a1a1a 100%)`,
                    }
              }
            >
              {hasPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={thumbnail}
                  alt=""
                  className="max-h-[min(52vh,280px)] w-full object-contain object-center"
                  onError={() => setImgFailed(true)}
                />
              ) : (
                <span className="text-center text-xs uppercase tracking-widest text-muted/40">
                  Add thumbnail in portfolio.json
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

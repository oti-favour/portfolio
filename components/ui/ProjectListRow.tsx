"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/lib/types";

interface ProjectListRowProps {
  project: Project;
}

export function ProjectListRow({ project }: ProjectListRowProps) {
  const {
    title,
    description,
    link,
    githubUrl,
    appStoreUrl,
    playStoreUrl,
    color,
    thumbnail,
    thumbnails,
  } = project;

  const previewSources =
    thumbnails && thumbnails.length > 0
      ? thumbnails
      : thumbnail
        ? [thumbnail]
        : [];

  const [failedUrls, setFailedUrls] = useState(() => new Set<string>());
  const markFailed = (src: string) => {
    setFailedUrls((prev) => new Set(prev).add(src));
  };
  const visibleSources = previewSources.filter((src) => !failedUrls.has(src));
  const hasPreview = visibleSources.length > 0;
  const multiPreview = visibleSources.length > 1;

  const links = [
    link && { href: link, label: "Website" },
    githubUrl && { href: githubUrl, label: "GitHub" },
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
        className={`hidden shrink-0 lg:flex lg:items-center lg:justify-end ${multiPreview ? "lg:w-[440px] xl:w-[500px]" : "lg:w-[380px] xl:w-[420px]"}`}
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
                <div
                  className={
                    multiPreview
                      ? "grid w-full grid-cols-2 gap-3"
                      : "flex w-full justify-center"
                  }
                >
                  {visibleSources.map((src) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={src}
                      src={src}
                      alt=""
                      className={
                        multiPreview
                          ? "max-h-[min(48vh,260px)] w-full object-contain object-center"
                          : "max-h-[min(52vh,280px)] w-full object-contain object-center"
                      }
                      onError={() => markFailed(src)}
                    />
                  ))}
                </div>
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

import type { Experience } from "@/lib/types";

export function ExperienceCard({
  role,
  company,
  startDate,
  endDate,
  description,
  technologies,
}: Experience) {
  return (
    <div className="group flex flex-col gap-3">
      <span className="text-sm font-medium uppercase tracking-widest text-light">
        {company}
      </span>
      <h3 className="font-display text-4xl text-light transition-colors duration-300 group-hover:text-accent lg:text-5xl">
        {role}
      </h3>
      <span className="text-xs uppercase tracking-widest text-muted">
        {startDate} — {endDate}
      </span>
      {description && (
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted lg:text-lg">
          {description}
        </p>
      )}
      {technologies?.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

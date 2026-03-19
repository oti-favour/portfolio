import type { Experience } from "@/lib/types";

export function ExperienceCard({ role, company, startDate, endDate }: Experience) {
  return (
    <div className="group flex flex-col gap-2">
      <span className="text-sm font-medium uppercase tracking-widest text-light">
        {company}
      </span>
      <h3 className="font-display text-4xl text-light transition-colors duration-300 group-hover:text-accent lg:text-5xl">
        {role}
      </h3>
      <span className="text-xs uppercase tracking-widest text-muted">
        {startDate} — {endDate}
      </span>
    </div>
  );
}

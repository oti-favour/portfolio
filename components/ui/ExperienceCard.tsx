import { TextScramble } from "@/components/ui/TextScramble";
import type { Experience } from "@/lib/types";

export function ExperienceCard({ role, company, startDate, endDate }: Experience) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium uppercase tracking-widest text-light">
        {company}
      </span>
      <TextScramble
        text={role}
        className="font-display text-4xl text-light lg:text-5xl"
      />
      <span className="text-xs uppercase tracking-widest text-muted">
        {startDate} — {endDate}
      </span>
    </div>
  );
}

import type { Stat } from "@/lib/types";

interface StatCardProps extends Stat {
  index?: number;
}

export function StatCard({ value, label, index }: StatCardProps) {
  return (
    <div className="flex flex-col gap-1 border-l border-border pl-6">
      {typeof index === "number" && (
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <span className="font-display text-3xl text-accent sm:text-4xl lg:text-5xl">
        {value}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        {label}
      </span>
    </div>
  );
}

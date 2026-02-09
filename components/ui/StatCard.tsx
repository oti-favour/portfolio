import type { Stat } from "@/lib/types";

export function StatCard({ value, label }: Stat) {
  return (
    <div className="flex flex-col gap-1 border-l border-border pl-6">
      <span className="font-display text-3xl text-accent sm:text-4xl lg:text-5xl">
        {value}
      </span>
      <span className="text-xs uppercase tracking-widest text-muted sm:text-sm">
        {label}
      </span>
    </div>
  );
}

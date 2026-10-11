import * as React from "react"
import { cn } from "@/lib/utils"

/** StatsGrid — divided metric row. tabular-nums keeps figures stable. */
export interface Stat { label: string; value: string; hint?: string }
export interface StatsGridProps { stats: Stat[]; className?: string }

export function StatsGrid({ stats, className }: StatsGridProps) {
  return (
    <dl
      className={cn(
        "grid divide-y divide-border rounded-2xl border border-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4",
        "sm:[&>*:nth-child(n+3)]:border-t sm:[&>*]:border-border lg:[&>*]:border-t-0",
        className
      )}
    >
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col gap-1 border-border px-6 py-6 sm:border-l sm:first:border-l-0 lg:border-l">
          <dt className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</dt>
          <dd className="text-3xl font-semibold tabular-nums tracking-tight">{s.value}</dd>
          {s.hint && <span className="text-xs text-muted-foreground">{s.hint}</span>}
        </div>
      ))}
    </dl>
  )
}

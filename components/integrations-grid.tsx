import * as React from "react"
import { cn } from "@/lib/utils"

/** IntegrationsGrid — dense logo tile grid with search-free hover states. */
export interface Integration { name: string; icon?: React.ReactNode }
export interface IntegrationsGridProps { items: Integration[]; className?: string }

export function IntegrationsGrid({ items, className }: IntegrationsGridProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4", className)}>
      {items.map((it) => (
        <div
          key={it.name}
          className={cn(
            "flex items-center gap-3 rounded-xl border border-border bg-card p-4",
            "transition-[border-color,background-color] duration-200 ease-out hover:border-foreground/20 hover:bg-accent"
          )}
        >
          <div className="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-background text-xs font-medium">
            {it.icon ?? it.name.slice(0, 2)}
          </div>
          <span className="truncate text-sm">{it.name}</span>
        </div>
      ))}
    </div>
  )
}

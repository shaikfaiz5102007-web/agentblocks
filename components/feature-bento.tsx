import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * FeatureBento — asymmetric feature grid.
 * Design: concentric radii (outer 2xl, inner xl with p-6), spans read as a
 * deliberate hierarchy rather than a uniform card wall.
 */
export interface BentoItem {
  title: string
  body: string
  icon?: React.ReactNode
  span?: "1" | "2" | "wide"
}
export interface FeatureBentoProps { items: BentoItem[]; className?: string }

export function FeatureBento({ items, className }: FeatureBentoProps) {
  return (
    <div className={cn("grid gap-5 md:grid-cols-3", className)}>
      {items.map((it) => (
        <div
          key={it.title}
          className={cn(
            "group relative overflow-hidden rounded-2xl border border-border bg-card p-6",
            "transition-[border-color,box-shadow] duration-200 ease-out",
            "hover:border-foreground/20 hover:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.4)]",
            it.span === "2" && "md:col-span-2",
            it.span === "wide" && "md:col-span-3"
          )}
        >
          {it.icon && (
            <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl border border-border bg-background text-foreground/70">
              {it.icon}
            </div>
          )}
          <h3 className="text-sm font-medium tracking-tight">{it.title}</h3>
          <p className="mt-2 text-sm text-pretty leading-relaxed text-muted-foreground">
            {it.body}
          </p>
        </div>
      ))}
    </div>
  )
}

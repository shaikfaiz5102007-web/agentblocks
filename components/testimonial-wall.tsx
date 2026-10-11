import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * TestimonialWall — CSS-columns masonry of quote cards.
 * Design: columns avoid JS layout, text-pretty stops orphans, no stagger
 * (routine content, not a staged entrance).
 */
export interface Testimonial { quote: string; name: string; role?: string }
export interface TestimonialWallProps {
  items: Testimonial[]
  columns?: 2 | 3
  className?: string
}

export function TestimonialWall({ items, columns = 3, className }: TestimonialWallProps) {
  return (
    <div
      className={cn(
        "gap-5 [column-fill:_balance]",
        columns === 2 ? "sm:columns-2" : "sm:columns-2 lg:columns-3",
        className
      )}
    >
      {items.map((t, i) => (
        <figure
          key={i}
          className={cn(
            "mb-5 break-inside-avoid rounded-2xl border border-border bg-card p-5",
            "transition-[border-color,box-shadow] duration-200 ease-out",
            "hover:border-foreground/20 hover:shadow-[0_12px_32px_-16px_rgba(0,0,0,0.35)]"
          )}
        >
          <blockquote className="text-sm text-pretty leading-relaxed">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-4 flex flex-col">
            <span className="text-sm font-medium">{t.name}</span>
            {t.role && <span className="text-xs text-muted-foreground">{t.role}</span>}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

import * as React from "react"
import { cn } from "@/lib/utils"

/** FeatureSplit — alternating two-column feature section. */
export interface FeatureSplitProps {
  eyebrow?: string
  headline: string
  body: string
  bullets?: string[]
  media?: React.ReactNode
  reverse?: boolean
  className?: string
}

export function FeatureSplit({ eyebrow, headline, body, bullets, media, reverse, className }: FeatureSplitProps) {
  return (
    <section className={cn("grid items-center gap-10 md:grid-cols-2 md:gap-16", className)}>
      <div className={cn(reverse && "md:order-2")}>
        {eyebrow && (
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {eyebrow}
          </span>
        )}
        <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          {headline}
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{body}</p>
        {bullets && (
          <ul className="mt-6 flex flex-col gap-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm">
                <svg viewBox="0 0 16 16" aria-hidden className="mt-0.5 size-4 shrink-0 text-foreground/60"
                  fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8.5 6.2 11.7 13 5" />
                </svg>
                <span className="text-pretty">{b}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={cn("overflow-hidden rounded-2xl border border-border bg-muted", reverse && "md:order-1")}>
        {media ?? <div className="aspect-[4/3] w-full" />}
      </div>
    </section>
  )
}

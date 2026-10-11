"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * PricingToggle — three-tier pricing table with a monthly/annual switch.
 *
 * Design notes:
 * - concentric radius: outer card rounded-2xl, inner button rounded-lg with p-2
 * - prices use tabular-nums so the toggle doesn't shift layout
 * - the switch is a real <button role="switch">, keyboard accessible
 */
export interface PricingTier {
  name: string
  monthly: number
  annual: number
  features: string[]
  highlighted?: boolean
  ctaLabel?: string
  ctaHref?: string
}

export interface PricingToggleProps {
  tiers: PricingTier[]
  className?: string
}

export function PricingToggle({ tiers, className }: PricingToggleProps) {
  const [annual, setAnnual] = React.useState(true)

  return (
    <div className={cn("flex flex-col items-center gap-10", className)}>
      <div className="inline-flex items-center gap-3 rounded-xl border border-border bg-card p-2">
        <span
          className={cn(
            "px-2 text-sm transition-colors",
            !annual ? "text-foreground" : "text-muted-foreground"
          )}
        >
          Monthly
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={annual}
          aria-label="Toggle annual billing"
          onClick={() => setAnnual((v) => !v)}
          className={cn(
            "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40",
            annual ? "bg-foreground" : "bg-muted"
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 size-5 rounded-full bg-background shadow-sm",
              "transition-transform duration-200 ease-out",
              annual ? "translate-x-[22px]" : "translate-x-0.5"
            )}
          />
        </button>
        <span
          className={cn(
            "px-2 text-sm transition-colors",
            annual ? "text-foreground" : "text-muted-foreground"
          )}
        >
          Annual
          <span className="ml-1.5 rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            −20%
          </span>
        </span>
      </div>

      <div className="grid w-full gap-6 md:grid-cols-3">
        {tiers.map((tier) => {
          const price = annual ? tier.annual : tier.monthly
          return (
            <div
              key={tier.name}
              className={cn(
                "relative flex flex-col rounded-2xl border p-6",
                "transition-[border-color,box-shadow] duration-200",
                tier.highlighted
                  ? "border-foreground/20 bg-card shadow-[0_16px_48px_-16px_rgba(0,0,0,0.35)]"
                  : "border-border bg-card/50"
              )}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-6 rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background">
                  Most popular
                </span>
              )}
              <h3 className="text-sm font-medium text-muted-foreground">
                {tier.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="text-4xl font-semibold tabular-nums tracking-tight">
                  ${price}
                </span>
                <span className="text-sm text-muted-foreground">/mo</span>
              </div>
              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <svg
                      viewBox="0 0 16 16"
                      aria-hidden
                      className="mt-0.5 size-4 shrink-0 text-foreground/60"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 8.5 6.2 11.7 13 5" />
                    </svg>
                    <span className="text-pretty">{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={tier.ctaHref ?? "#"}
                className={cn(
                  "mt-6 inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-medium",
                  "transition-[transform,background-color,color] duration-200 ease-out active:scale-[0.96]",
                  tier.highlighted
                    ? "bg-foreground text-background"
                    : "border border-border bg-background text-foreground hover:bg-accent"
                )}
              >
                {tier.ctaLabel ?? "Get started"}
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}

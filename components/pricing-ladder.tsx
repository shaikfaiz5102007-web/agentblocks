"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * PricingLadder — a four-rung value ladder built on pricing psychology.
 *
 * Applied principles:
 * - Anchoring: the struck-through compare-at price carries the anchor on each rung
 * - Decoy effect: the middle tier is highlighted as "most popular"
 * - Rule of 100: under $100 -> percentage discount ("20% off"), not dollars
 * - Charm pricing: $19 / $39 / $99 (left-digit effect)
 * - Mental accounting: "one-time" is stated on every paid tier
 * - Order bump: a checkout add-on that lifts AOV without touching the entry price
 * - Loss aversion: the value line frames what the buyer would spend rebuilding
 *
 * Design notes:
 * - tabular-nums on every price so toggling never shifts layout
 * - concentric radii (outer rounded-2xl, inner rounded-xl)
 * - exact-property transitions, scale(0.96) press, 44px targets
 */
export interface LadderTier {
  id: string
  name: string
  price: number
  /** what the buyer would otherwise pay — anchor, struck through */
  compareAt?: number
  /** one-line job of this rung */
  role: string
  valueLine: string
  features: string[]
  ctaLabel: string
  ctaHref?: string
  highlighted?: boolean
  badge?: string
}

export interface PricingLadderProps {
  tiers: LadderTier[]
  bump?: { label: string; price: number; note?: string }
  className?: string
}

export function PricingLadder({ tiers, bump, className }: PricingLadderProps) {
  const [bumpOn, setBumpOn] = React.useState(true)

  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <div className="grid w-full items-stretch gap-6 lg:grid-cols-4">
        {tiers.map((t) => {
          const pct = t.compareAt
            ? Math.round(((t.compareAt - t.price) / t.compareAt) * 100)
            : 0
          return (
            <div
              key={t.id}
              className={cn(
                "relative flex flex-col rounded-2xl border p-6",
                "transition-[border-color,box-shadow,transform] duration-200 ease-out",
                t.highlighted
                  ? "border-foreground/25 bg-card shadow-[0_20px_56px_-20px_rgba(0,0,0,0.45)] lg:-mt-3 lg:mb-3"
                  : "border-border bg-card/40 hover:border-border/80"
              )}
            >
              {t.badge && (
                <span className="absolute -top-3 left-6 rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background">
                  {t.badge}
                </span>
              )}

              <h3 className="text-sm font-medium tracking-tight">{t.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{t.role}</p>

              <div className="mt-5 flex items-baseline gap-3">
                <span className="text-4xl font-semibold tabular-nums tracking-tight">
                  ${t.price}
                </span>
                {t.compareAt && (
                  <span className="text-base text-muted-foreground/80 line-through tabular-nums decoration-muted-foreground/50">
                    ${t.compareAt}
                  </span>
                )}
              </div>

              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-muted-foreground">one-time</span>
                {pct > 0 && (
                  <span className="rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 tabular-nums">
                    {pct}% off
                  </span>
                )}
              </div>

              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                {t.valueLine}
              </p>

              <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <svg
                      viewBox="0 0 16 16"
                      aria-hidden
                      className="mt-0.5 size-3.5 shrink-0 text-foreground/50"
                      fill="none" stroke="currentColor" strokeWidth="1.75"
                      strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="M3 8.5 6.2 11.7 13 5" />
                    </svg>
                    <span className="text-pretty">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={t.ctaHref ?? "#"}
                className={cn(
                  "mt-6 inline-flex h-11 items-center justify-center rounded-xl px-4 text-sm font-medium",
                  "transition-[transform,background-color,color,border-color] duration-200 ease-out active:scale-[0.96]",
                  t.highlighted
                    ? "bg-foreground text-background hover:opacity-90"
                    : "border border-border bg-background hover:bg-accent"
                )}
              >
                {t.ctaLabel}
              </a>
            </div>
          )
        })}
      </div>

      {bump && (
        <label
          className={cn(
            "mx-auto flex w-full max-w-xl cursor-pointer items-start gap-3 rounded-2xl border p-4",
            "transition-colors duration-200",
            bumpOn ? "border-foreground/20 bg-card" : "border-border bg-card/40"
          )}
        >
          <input
            type="checkbox"
            checked={bumpOn}
            onChange={(e) => setBumpOn(e.target.checked)}
            className="mt-0.5 size-4 shrink-0 accent-current"
          />
          <span className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">
              Add {bump.label} — ${bump.price}
            </span>
            {bump.note && (
              <span className="text-xs text-muted-foreground">{bump.note}</span>
            )}
          </span>
        </label>
      )}
    </div>
  )
}

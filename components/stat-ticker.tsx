"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * StatTicker — animated count-up number with a label.
 *
 * Design notes:
 * - `tabular-nums` so digits don't reflow while counting (prevents layout shift)
 * - IntersectionObserver-driven: counts once when scrolled into view
 * - reduced-motion users get the final value immediately
 */
export interface StatTickerProps {
  value: number
  label: string
  prefix?: string
  suffix?: string
  durationMs?: number
  decimals?: number
  className?: string
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

export function StatTicker({
  value,
  label,
  prefix = "",
  suffix = "",
  durationMs = 1600,
  decimals = 0,
  className,
}: StatTickerProps) {
  // Start at the final value, not 0: if the observer never fires (SSR, no-JS
  // hydration, headless render, slow connection) the reader sees correct data
  // instead of a broken-looking zero.
  const [display, setDisplay] = React.useState(value)
  const ref = React.useRef<HTMLDivElement>(null)
  const started = React.useRef(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setDisplay(value)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || started.current) continue
          started.current = true
          setDisplay(0)
          const t0 = performance.now()
          const tick = (now: number) => {
            const p = Math.min((now - t0) / durationMs, 1)
            setDisplay(value * easeOutCubic(p))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [value, durationMs])

  const formatted = display.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <div ref={ref} className={cn("flex flex-col gap-1", className)}>
      <span className="text-4xl font-semibold tabular-nums tracking-tight sm:text-5xl">
        {prefix}
        {formatted}
        {suffix}
      </span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  )
}

"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * HeroSpotlight — landing hero with a cursor-following spotlight and gradient mesh.
 *
 * Design notes:
 * - spotlight position is written to CSS custom properties, so the paint stays
 *   on the compositor (no React re-render per mousemove)
 * - headline uses text-wrap: balance; subcopy uses text-wrap: pretty
 * - single fixed-size container: no layout shift on load
 */
export interface HeroSpotlightProps {
  eyebrow?: string
  headline: string
  subcopy?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  className?: string
}

export function HeroSpotlight({
  eyebrow,
  headline,
  subcopy,
  primaryCta,
  secondaryCta,
  className,
}: HeroSpotlightProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  const onMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--mx", `${e.clientX - r.left}px`)
    el.style.setProperty("--my", `${e.clientY - r.top}px`)
  }, [])

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className={cn(
        "relative isolate flex min-h-[560px] w-full items-center justify-center overflow-hidden",
        "bg-background px-6 py-24",
        className
      )}
    >
      {/* gradient mesh */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background:radial-gradient(60%_50%_at_50%_0%,oklch(0.7_0.15_270/0.25),transparent_70%),radial-gradient(40%_40%_at_80%_20%,oklch(0.7_0.15_200/0.2),transparent_70%)]"
      />
      {/* cursor spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(240px_circle_at_var(--mx,50%)_var(--my,50%),oklch(0.8_0.1_270/0.12),transparent_70%)]"
      />

      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        {eyebrow && (
          <span className="mb-6 inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            {eyebrow}
          </span>
        )}

        <h1 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
          {headline}
        </h1>

        {subcopy && (
          <p className="mt-6 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
            {subcopy}
          </p>
        )}

        {(primaryCta || secondaryCta) && (
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            {primaryCta && (
              <a
                href={primaryCta.href}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-foreground px-6 text-sm font-medium text-background transition-transform duration-200 ease-out active:scale-[0.96]"
              >
                {primaryCta.label}
              </a>
            )}
            {secondaryCta && (
              <a
                href={secondaryCta.href}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-6 text-sm font-medium transition-colors duration-200 hover:bg-accent"
              >
                {secondaryCta.label}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

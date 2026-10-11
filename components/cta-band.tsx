import * as React from "react"
import { cn } from "@/lib/utils"

/** CtaBand — full-width closing call to action with a gradient wash. */
export interface CtaBandProps {
  headline: string
  subcopy?: string
  primary?: { label: string; href: string }
  secondary?: { label: string; href: string }
  className?: string
}

export function CtaBand({ headline, subcopy, primary, secondary, className }: CtaBandProps) {
  return (
    <section className={cn("relative isolate overflow-hidden px-6 py-20", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(70%_60%_at_50%_100%,oklch(0.7_0.15_270/0.22),transparent_70%)]"
      />
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          {headline}
        </h2>
        {subcopy && (
          <p className="mt-4 text-pretty text-muted-foreground">{subcopy}</p>
        )}
        {(primary || secondary) && (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {primary && (
              <a href={primary.href}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-foreground px-6 text-sm font-medium text-background transition-transform duration-200 ease-out active:scale-[0.96]">
                {primary.label}
              </a>
            )}
            {secondary && (
              <a href={secondary.href}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-6 text-sm font-medium transition-colors duration-200 hover:bg-accent">
                {secondary.label}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

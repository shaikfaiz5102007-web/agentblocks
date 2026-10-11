"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * FaqAccordion — accessible disclosure list.
 * Design: grid-rows trick animates height without measuring; single-open
 * behaviour reduces cognitive load; aria-expanded wired correctly.
 */
export interface FaqItem { q: string; a: string }
export interface FaqAccordionProps { items: FaqItem[]; className?: string }

export function FaqAccordion({ items, className }: FaqAccordionProps) {
  const [open, setOpen] = React.useState<number | null>(0)

  return (
    <div className={cn("divide-y divide-border rounded-2xl border border-border", className)}>
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div key={i} className="px-5">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors duration-200 hover:text-foreground/80"
            >
              <span className="text-sm font-medium text-pretty">{it.q}</span>
              <svg
                viewBox="0 0 16 16" aria-hidden
                className={cn(
                  "size-4 shrink-0 text-muted-foreground",
                  "transition-transform duration-300 ease-out",
                  isOpen && "rotate-45"
                )}
                fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
              >
                <path d="M8 3v10M3 8h10" />
              </svg>
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="pb-4 text-sm text-pretty leading-relaxed text-muted-foreground">
                  {it.a}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

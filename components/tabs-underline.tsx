"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * TabsUnderline — keyboard-navigable tabs with a sliding underline.
 * Design: roving tabindex, arrow keys, aria-selected; underline is a
 * transform-only indicator so it animates on the compositor.
 */
export interface TabItem { id: string; label: string; content: React.ReactNode }
export interface TabsUnderlineProps { tabs: TabItem[]; className?: string }

export function TabsUnderline({ tabs, className }: TabsUnderlineProps) {
  const [active, setActive] = React.useState(0)
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return
    e.preventDefault()
    const next = e.key === "ArrowRight"
      ? (active + 1) % tabs.length
      : (active - 1 + tabs.length) % tabs.length
    setActive(next)
    refs.current[next]?.focus()
  }

  return (
    <div className={className}>
      <div role="tablist" onKeyDown={onKey} className="relative flex gap-1 border-b border-border">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => { refs.current[i] = el }}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={active === i}
            aria-controls={`panel-${t.id}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            className={cn(
              "relative h-11 px-4 text-sm transition-colors duration-200",
              active === i ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"
            )}
          >
            {t.label}
            {active === i && (
              <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-foreground" />
            )}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`panel-${t.id}`}
          aria-labelledby={`tab-${t.id}`}
          hidden={active !== i}
          className="pt-5 text-sm text-pretty leading-relaxed text-muted-foreground"
        >
          {t.content}
        </div>
      ))}
    </div>
  )
}

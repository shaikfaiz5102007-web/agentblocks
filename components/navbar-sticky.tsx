"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * NavbarSticky — header that gains a blurred surface after scroll.
 * Design: exact-property transitions, no layout shift (height fixed),
 * backdrop blur only after threshold so first paint stays cheap.
 */
export interface NavbarStickyProps {
  brand: React.ReactNode
  links: { label: string; href: string }[]
  action?: React.ReactNode
  threshold?: number
  className?: string
}

export function NavbarSticky({ brand, links, action, threshold = 12, className }: NavbarStickyProps) {
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [threshold])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-16 w-full",
        "transition-[background-color,border-color,backdrop-filter] duration-300 ease-out",
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
        className
      )}
    >
      <nav className="mx-auto flex h-full max-w-6xl items-center gap-8 px-6">
        <div className="shrink-0 font-medium tracking-tight">{brand}</div>
        <ul className="hidden flex-1 items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="inline-flex h-9 items-center rounded-lg px-3 text-sm text-muted-foreground transition-colors duration-200 hover:bg-accent hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="ml-auto shrink-0 md:ml-0">{action}</div>
      </nav>
    </header>
  )
}

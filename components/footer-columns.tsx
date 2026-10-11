import * as React from "react"
import { cn } from "@/lib/utils"

/** FooterColumns — multi-column footer with a legal bar. */
export interface FooterColumn { title: string; links: { label: string; href: string }[] }
export interface FooterColumnsProps {
  brand?: React.ReactNode
  columns: FooterColumn[]
  legal?: string
  className?: string
}

export function FooterColumns({ brand, columns, legal, className }: FooterColumnsProps) {
  return (
    <footer className={cn("border-t border-border px-6 py-14", className)}>
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        {brand && <div className="text-sm text-muted-foreground">{brand}</div>}
        {columns.map((c) => (
          <div key={c.title}>
            <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {c.title}
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-foreground/70 transition-colors duration-200 hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {legal && (
        <div className="mx-auto mt-12 max-w-6xl border-t border-border pt-6 text-xs text-muted-foreground">
          {legal}
        </div>
      )}
    </footer>
  )
}

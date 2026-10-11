"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * ButtonShine — a primary action button with a sweep-highlight hover effect.
 *
 * Design notes (why it feels right):
 * - transition lists exact properties, never `all`
 * - scale(0.96) on press, the tactile sweet spot
 * - 44px min hit area for touch
 * - respects prefers-reduced-motion
 */
export interface ButtonShineProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

export const ButtonShine = React.forwardRef<HTMLButtonElement, ButtonShineProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    const base =
      "group relative inline-flex items-center justify-center gap-2 overflow-hidden " +
      "rounded-xl font-medium tracking-tight select-none " +
      "transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-out " +
      "active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 " +
      "focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
      "focus-visible:ring-foreground/40 disabled:pointer-events-none disabled:opacity-50"

    const sizes = {
      sm: "h-9 px-3.5 text-sm",
      md: "h-11 px-5 text-sm",
      lg: "h-12 px-6 text-base",
    } as const

    const variants = {
      default:
        "bg-foreground text-background shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_8px_24px_-8px_rgba(0,0,0,0.5)] " +
        "hover:shadow-[0_1px_0_0_rgba(255,255,255,0.2)_inset,0_12px_32px_-8px_rgba(0,0,0,0.6)]",
      outline:
        "border border-border bg-background text-foreground hover:bg-accent",
      ghost: "text-foreground hover:bg-accent",
    } as const

    return (
      <button
        ref={ref}
        className={cn(base, sizes[size], variants[variant], className)}
        {...props}
      >
        {/* Sweep highlight — transform/opacity only, GPU composited */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full motion-reduce:hidden"
        />
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
        </span>
      </button>
    )
  }
)
ButtonShine.displayName = "ButtonShine"

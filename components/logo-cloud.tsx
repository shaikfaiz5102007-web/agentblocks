import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * LogoCloud — infinite marquee of wordmarks.
 * Design: transform-only animation (GPU), duplicated track for seamless loop,
 * paused on hover, and hidden entirely for reduced-motion users.
 */
export interface LogoCloudProps {
  logos: string[]
  speedSeconds?: number
  className?: string
}

export function LogoCloud({ logos, speedSeconds = 40, className }: LogoCloudProps) {
  const track = [...logos, ...logos]
  return (
    <div
      className={cn("group relative overflow-hidden", className)}
      style={{ ["--dur" as string]: `${speedSeconds}s` }}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="flex w-max animate-[marquee_var(--dur)_linear_infinite] gap-14 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {track.map((l, i) => (
          <span
            key={i}
            className="shrink-0 select-none text-lg font-medium tracking-tight text-muted-foreground/75 transition-colors duration-200 hover:text-foreground"
          >
            {l}
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  )
}

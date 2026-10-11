import * as React from "react"
import { cn } from "@/lib/utils"

/** MarqueeText — large scrolling headline strip (two rows, opposite directions). */
export interface MarqueeTextProps {
  items: string[]
  reverse?: boolean
  speedSeconds?: number
  className?: string
}

export function MarqueeText({ items, reverse, speedSeconds = 30, className }: MarqueeTextProps) {
  const track = [...items, ...items]
  return (
    <div
      className={cn("group overflow-hidden py-4", className)}
      style={{ ["--dur" as string]: `${speedSeconds}s` }}
    >
      <div
        className={cn(
          "flex w-max gap-8 animate-[marquee2_var(--dur)_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {track.map((t, i) => (
          <span
            key={i}
            className="shrink-0 text-4xl font-semibold tracking-tight text-foreground/25 sm:text-6xl"
          >
            {t}
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee2{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  )
}

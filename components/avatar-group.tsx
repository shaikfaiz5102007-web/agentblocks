import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * AvatarGroup — overlapping avatars with a count overflow.
 * Design: concentric ring (border uses the surface colour so overlaps read
 * cleanly on any background), hover raises one avatar via transform only.
 */
export interface AvatarGroupProps {
  people: { name: string; src?: string }[]
  max?: number
  size?: number
  className?: string
}

export function AvatarGroup({ people, max = 4, size = 36, className }: AvatarGroupProps) {
  const shown = people.slice(0, max)
  const extra = people.length - shown.length

  return (
    <div className={cn("flex items-center", className)}>
      {shown.map((p, i) => (
        <div
          key={p.name}
          title={p.name}
          style={{ width: size, height: size, marginLeft: i === 0 ? 0 : -size / 3, zIndex: shown.length - i }}
          className={cn(
            "relative grid place-items-center overflow-hidden rounded-full",
            "bg-muted text-xs font-medium text-muted-foreground",
            "ring-2 ring-background transition-transform duration-200 ease-out hover:-translate-y-0.5"
          )}
        >
          {p.src ? (
            <img src={p.src} alt={p.name} className="size-full object-cover outline-1 outline-black/10 dark:outline-white/10" />
          ) : (
            p.name.slice(0, 1).toUpperCase()
          )}
        </div>
      ))}
      {extra > 0 && (
        <div
          style={{ width: size, height: size, marginLeft: -size / 3 }}
          className="relative grid place-items-center rounded-full bg-foreground text-xs font-medium text-background ring-2 ring-background"
        >
          +{extra}
        </div>
      )}
    </div>
  )
}

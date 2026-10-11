import * as React from "react"
import { cn } from "@/lib/utils"

/** BentoGallery — image bento grid with hover zoom. */
export interface GalleryItem { src: string; alt: string; span?: "1" | "2" | "tall" }
export interface BentoGalleryProps { items: GalleryItem[]; className?: string }

export function BentoGallery({ items, className }: BentoGalleryProps) {
  return (
    <div className={cn("grid auto-rows-[180px] gap-4 md:grid-cols-3", className)}>
      {items.map((it) => (
        <figure
          key={it.src}
          className={cn(
            "group relative overflow-hidden rounded-2xl border border-border bg-muted",
            it.span === "2" && "md:col-span-2",
            it.span === "tall" && "md:row-span-2",
            !it.span && "md:col-span-1"
          )}
        >
          <img
            src={it.src}
            alt={it.alt}
            loading="lazy"
            className="size-full object-cover outline-1 outline-black/10 transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none dark:outline-white/10"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {it.alt}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

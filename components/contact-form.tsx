"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * ContactForm — labelled form with inline validation states.
 * Design: labels always visible (never placeholder-as-label), 44px targets,
 * error text tied via aria-describedby, focus rings preserved.
 */
export interface Field { name: string; label: string; type?: string; required?: boolean; textarea?: boolean }
export interface ContactFormProps {
  fields: Field[]
  submitLabel?: string
  onSubmit?: (values: Record<string, string>) => void
  className?: string
}

export function ContactForm({ fields, submitLabel = "Send message", onSubmit, className }: ContactFormProps) {
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  const handle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const values: Record<string, string> = {}
    const next: Record<string, string> = {}
    for (const f of fields) {
      const v = String(fd.get(f.name) ?? "").trim()
      values[f.name] = v
      if (f.required && !v) next[f.name] = `${f.label} is required`
      if (f.type === "email" && v && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v))
        next[f.name] = "Enter a valid email address"
    }
    setErrors(next)
    if (Object.keys(next).length === 0) onSubmit?.(values)
  }

  return (
    <form onSubmit={handle} noValidate className={cn("flex flex-col gap-5", className)}>
      {fields.map((f) => {
        const err = errors[f.name]
        const id = `f-${f.name}`
        const common = cn(
          "w-full rounded-xl border bg-background px-3.5 text-sm",
          "transition-[border-color,box-shadow] duration-200 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30",
          err ? "border-red-500/60" : "border-border"
        )
        return (
          <div key={f.name} className="flex flex-col gap-1.5">
            <label htmlFor={id} className="text-sm font-medium">
              {f.label}
              {f.required && <span className="ml-1 text-muted-foreground">*</span>}
            </label>
            {f.textarea ? (
              <textarea id={id} name={f.name} rows={4} aria-describedby={err ? `${id}-err` : undefined}
                aria-invalid={!!err} className={cn(common, "py-2.5")} />
            ) : (
              <input id={id} name={f.name} type={f.type ?? "text"} aria-describedby={err ? `${id}-err` : undefined}
                aria-invalid={!!err} className={cn(common, "h-11")} />
            )}
            {err && <span id={`${id}-err`} className="text-xs text-red-500">{err}</span>}
          </div>
        )
      })}
      <button
        type="submit"
        className="inline-flex h-11 items-center justify-center rounded-xl bg-foreground px-5 text-sm font-medium text-background transition-transform duration-200 ease-out active:scale-[0.96]"
      >
        {submitLabel}
      </button>
    </form>
  )
}

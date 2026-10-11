import React from "react"
import { createRoot } from "react-dom/client"
import { PricingLadder } from "@/components/pricing-ladder"
import "../app/globals.css"

const TIERS = [
  { id: "solo", name: "Solo", price: 19, compareAt: 29, role: "The reflex buy",
    valueLine: "Every component in one pack. Costs less than the time it takes to build one hero section.",
    features: ["All components", "Figma file", "Lifetime updates"], ctaLabel: "Buy Solo" },
  { id: "pro", name: "Pro", price: 39, compareAt: 59, role: "Most buyers land here",
    valueLine: "Source, licence and updates. What you'd spend rebuilding three of these from scratch.",
    features: ["Everything in Solo", "Commercial licence", "Editable source", "Lifetime updates", "New drops monthly"],
    ctaLabel: "Buy Pro", highlighted: true, badge: "Most popular" },
  { id: "team", name: "Team", price: 99, compareAt: 149, role: "For teams shipping together",
    valueLine: "Five seats and a private registry mirror. Priced so one seat costs less than a takeaway lunch.",
    features: ["5 developer seats", "Private registry access", "Priority support", "Invoice billing"],
    ctaLabel: "Buy Team" },
  { id: "studio", name: "Studio", price: 199, compareAt: 299, role: "For agencies & heavy users",
    valueLine: "Unlimited client projects, white-label rights, and a say in what gets built next.",
    features: ["Everything in Pro", "Unlimited client projects", "White-label rights", "Roadmap input", "1:1 setup call"],
    ctaLabel: "Buy Studio" },
]

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <main className="min-h-screen bg-background px-6 py-16 text-foreground">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-baseline gap-3">
          <span className="font-mono text-xs text-muted-foreground">04</span>
          <h2 className="text-lg font-medium tracking-tight">pricing-ladder</h2>
          <span className="ml-auto text-xs text-muted-foreground">
            anchor via compare-at · decoy middle · order bump
          </span>
        </div>
        <PricingLadder
          tiers={TIERS}
          bump={{
            label: "the Figma source file",
            price: 9,
            note: "Auto-layout, variants and design tokens — the same file the components were built from.",
          }}
        />
      </div>
    </main>
  </React.StrictMode>
)

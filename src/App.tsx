import { ButtonShine } from "@/components/button-shine"
import { StatTicker } from "@/components/stat-ticker"
import { PricingToggle } from "@/components/pricing-toggle"
import { HeroSpotlight } from "@/components/hero-spotlight"
import { PricingLadder } from "@/components/pricing-ladder"

function Section({ n, title, note, children }: {
  n: string; title: string; note: string; children: React.ReactNode
}) {
  return (
    <section className="border-t border-border px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-baseline gap-3">
          <span className="font-mono text-xs text-muted-foreground">{n}</span>
          <h2 className="text-lg font-medium tracking-tight">{title}</h2>
          <span className="ml-auto text-xs text-muted-foreground">{note}</span>
        </div>
        {children}
      </div>
    </section>
  )
}

/* The real ladder for AgentBlocks itself — dogfooding the component.
   Ascending so it reads as a climb; the struck compare-at prices carry the
   anchor, and the middle rung is the decoy target. */
const TIERS = [
  {
    id: "solo",
    name: "Solo",
    price: 19,
    compareAt: 29,
    role: "The reflex buy",
    valueLine: "Every component in one pack. Costs less than the time it takes to build one hero section.",
    features: ["All components", "Figma file", "Lifetime updates"],
    ctaLabel: "Buy Solo",
  },
  {
    id: "pro",
    name: "Pro",
    price: 39,
    compareAt: 59,
    role: "Most buyers land here",
    valueLine: "Source, licence and updates. What you'd spend rebuilding three of these from scratch.",
    features: ["Everything in Solo", "Commercial licence", "Editable source", "Lifetime updates", "New drops monthly"],
    ctaLabel: "Buy Pro",
    highlighted: true,
    badge: "Most popular",
  },
  {
    id: "team",
    name: "Team",
    price: 99,
    compareAt: 149,
    role: "For teams shipping together",
    valueLine: "Five seats and a private registry mirror. Priced so one seat costs less than a takeaway lunch.",
    features: ["5 developer seats", "Private registry access", "Priority support", "Invoice billing"],
    ctaLabel: "Buy Team",
  },
  {
    id: "studio",
    name: "Studio",
    price: 199,
    compareAt: 299,
    role: "For agencies & heavy users",
    valueLine: "Unlimited client projects, white-label rights, and a say in what gets built next.",
    features: ["Everything in Pro", "Unlimited client projects", "White-label rights", "Roadmap input", "1:1 setup call"],
    ctaLabel: "Buy Studio",
  },
]

export default function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border px-6 py-5">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <span className="font-mono text-sm">agentblocks</span>
          <span className="text-xs text-muted-foreground">
            5 items · MCP-ready registry
          </span>
        </div>
      </div>

      <HeroSpotlight
        eyebrow="MCP-ready shadcn registry"
        headline="Blocks your AI agent can install for you."
        subcopy="Move your cursor across this section — the spotlight follows it, painted on the compositor with zero React re-renders."
        primaryCta={{ label: "Browse components", href: "#01" }}
        secondaryCta={{ label: "See pricing", href: "#05" }}
      />

      <Section n="01" title="button-shine" note="sweep highlight · press feedback · 44px">
        <div className="flex flex-wrap items-center gap-4">
          <ButtonShine>Start free trial</ButtonShine>
          <ButtonShine variant="outline">View pricing</ButtonShine>
          <ButtonShine variant="ghost">Cancel</ButtonShine>
          <ButtonShine size="lg">Large CTA</ButtonShine>
          <ButtonShine disabled>Disabled</ButtonShine>
        </div>
      </Section>

      <Section n="02" title="stat-ticker" note="counts on scroll · tabular-nums">
        <div className="grid gap-10 sm:grid-cols-3">
          <StatTicker value={128400} label="Jobs recovered" prefix="" />
          <StatTicker value={42} label="Avg. response time" suffix="s" />
          <StatTicker value={99.4} decimals={1} label="Uptime" suffix="%" />
        </div>
      </Section>

      <Section n="03" title="pricing-toggle" note="role=switch · concentric radii">
        <PricingToggle
          tiers={[
            { name: "Starter", monthly: 29, annual: 23, features: ["1 project", "Community support", "Basic analytics"] },
            { name: "Growth", monthly: 79, annual: 63, highlighted: true, ctaLabel: "Start free trial",
              features: ["10 projects", "Priority support", "Advanced analytics", "Custom domains"] },
            { name: "Scale", monthly: 199, annual: 159, features: ["Unlimited projects", "Dedicated support", "SSO & audit logs", "SLA"] },
          ]}
        />
      </Section>

      <Section n="04" title="pricing-ladder" note="anchor first · decoy middle · order bump">
        <PricingLadder
          tiers={TIERS}
          bump={{
            label: "the Figma source file",
            price: 9,
            note: "Auto-layout, variants and design tokens — the same file the components were built from.",
          }}
        />
      </Section>

      <footer className="border-t border-border px-6 py-10 text-center text-xs text-muted-foreground">
        Built with the shadcn registry format · installable via{" "}
        <code className="font-mono">npx shadcn add</code>
      </footer>
    </main>
  )
}

import React from "react"
import { createRoot } from "react-dom/client"
import "../app/globals.css"

import { ButtonShine } from "@/components/button-shine"
import { StatTicker } from "@/components/stat-ticker"
import { PricingToggle } from "@/components/pricing-toggle"
import { HeroSpotlight } from "@/components/hero-spotlight"
import { PricingLadder } from "@/components/pricing-ladder"
import { NavbarSticky } from "@/components/navbar-sticky"
import { FooterColumns } from "@/components/footer-columns"
import { TestimonialWall } from "@/components/testimonial-wall"
import { LogoCloud } from "@/components/logo-cloud"
import { FeatureBento } from "@/components/feature-bento"
import { CtaBand } from "@/components/cta-band"
import { FaqAccordion } from "@/components/faq-accordion"
import { MarqueeText } from "@/components/marquee-text"
import { TabsUnderline } from "@/components/tabs-underline"
import { AvatarGroup } from "@/components/avatar-group"
import { BentoGallery } from "@/components/bento-gallery"
import { StatsGrid } from "@/components/stats-grid"
import { FeatureSplit } from "@/components/feature-split"
import { IntegrationsGrid } from "@/components/integrations-grid"
import { ContactForm } from "@/components/contact-form"

function Block({ n, name, note, children }: {
  n: string; name: string; note: string; children: React.ReactNode
}) {
  return (
    <section id={name} className="border-t border-border px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-baseline gap-3">
          <span className="font-mono text-xs text-muted-foreground">{n}</span>
          <h2 className="text-lg font-medium tracking-tight">{name}</h2>
          <span className="ml-auto text-xs text-muted-foreground">{note}</span>
        </div>
        {children}
      </div>
    </section>
  )
}

const NAV = [
  "button-shine","stat-ticker","pricing-toggle","hero-spotlight","pricing-ladder",
  "navbar-sticky","footer-columns","testimonial-wall","logo-cloud","feature-bento",
  "cta-band","faq-accordion","marquee-text","tabs-underline","avatar-group",
  "bento-gallery","stats-grid","feature-split","integrations-grid","contact-form",
]

function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <NavbarSticky
        brand={<span className="font-mono text-sm">agentblocks</span>}
        links={[
          { label: "Components", href: "#button-shine" },
          { label: "Pricing", href: "#pricing-ladder" },
          { label: "FAQ", href: "#faq-accordion" },
        ]}
        action={<ButtonShine size="sm">Get the pack</ButtonShine>}
      />

      <HeroSpotlight
        eyebrow="20 MCP-ready shadcn components"
        headline="Blocks your AI agent can install for you."
        subcopy="Every component ships in the shadcn registry format, so Cursor, Claude Code and v0 can discover and install them without a browser."
        primaryCta={{ label: "Browse components", href: "#button-shine" }}
        secondaryCta={{ label: "See pricing", href: "#pricing-ladder" }}
      />

      <div className="border-y border-border px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <LogoCloud logos={["Vercel","Linear","Stripe","Supabase","Resend","Raycast","Cursor","Clerk"]} />
        </div>
      </div>

      <Block n="01" name="button-shine" note="sweep highlight · press feedback · 44px">
        <div className="flex flex-wrap items-center gap-4">
          <ButtonShine>Start free trial</ButtonShine>
          <ButtonShine variant="outline">View pricing</ButtonShine>
          <ButtonShine variant="ghost">Cancel</ButtonShine>
          <ButtonShine size="lg">Large CTA</ButtonShine>
          <ButtonShine disabled>Disabled</ButtonShine>
        </div>
      </Block>

      <Block n="02" name="stat-ticker" note="counts on scroll · tabular-nums">
        <div className="grid gap-10 sm:grid-cols-3">
          <StatTicker value={128400} label="Jobs recovered" />
          <StatTicker value={42} label="Avg. response time" suffix="s" />
          <StatTicker value={99.4} decimals={1} label="Uptime" suffix="%" />
        </div>
      </Block>

      <Block n="03" name="stats-grid" note="divided row · responsive borders">
        <StatsGrid stats={[
          { label: "Components", value: "20", hint: "all installable" },
          { label: "Bundle size", value: "4.1kB", hint: "gzipped, per block" },
          { label: "Dependencies", value: "2", hint: "clsx, tailwind-merge" },
          { label: "Licence", value: "MIT", hint: "commercial ok" },
        ]} />
      </Block>

      <Block n="04" name="feature-bento" note="asymmetric spans · hover elevation">
        <FeatureBento items={[
          { title: "MCP-ready by default", body: "The registry index at /r/registry.json is all an AI agent needs. No SDK, no wrapper, no lock-in.", span: "2" },
          { title: "You own the code", body: "Components are copied into your repo, not imported. Edit anything." },
          { title: "Tailwind v4 + React 19", body: "Built on current primitives with no runtime dependency on us." },
          { title: "Accessible", body: "Keyboard support, ARIA wiring and reduced-motion guards are in the components, not bolted on." },
        ]} />
      </Block>

      <Block n="05" name="feature-split" note="alternating layout · bullet list">
        <FeatureSplit
          eyebrow="Why a registry"
          headline="Discovery is the hard part, not the design."
          body="A zip file of components is invisible to the tools people actually build with. A registry is readable by both humans and agents, so the same asset gets found twice as often."
          bullets={["One command install", "Agent-discoverable", "No version to upgrade", "Figma file included"]}
          media={<div className="aspect-[4/3] w-full bg-gradient-to-br from-foreground/10 to-transparent" />}
        />
      </Block>

      <Block n="06" name="integrations-grid" note="dense tiles · hover border">
        <IntegrationsGrid items={[
          { name: "Cursor" }, { name: "Claude Code" }, { name: "v0" }, { name: "Lovable" },
          { name: "Windsurf" }, { name: "Copilot" }, { name: "Codex" }, { name: "OpenCode" },
        ]} />
      </Block>

      <Block n="07" name="bento-gallery" note="image grid · hover zoom">
        <BentoGallery items={[
          { src: "https://picsum.photos/seed/a/900/600", alt: "Dashboard", span: "2" },
          { src: "https://picsum.photos/seed/b/600/600", alt: "Settings" },
          { src: "https://picsum.photos/seed/c/600/600", alt: "Onboarding" },
          { src: "https://picsum.photos/seed/d/900/600", alt: "Reports" },
        ]} />
      </Block>

      <Block n="08" name="testimonial-wall" note="CSS columns · no JS layout">
        <TestimonialWall items={[
          { quote: "Dropped three of these into a client build in an afternoon. The concentric radii alone saved an hour of fiddling.", name: "Ravi K.", role: "Freelance engineer" },
          { quote: "The MCP angle is the reason I bought. My agent just pulls the block it needs.", name: "Dana M.", role: "Product designer" },
          { quote: "Finally components that don't fight my existing tokens.", name: "Tom B.", role: "Agency founder" },
          { quote: "Reduced-motion support already wired. Rare.", name: "Priya S.", role: "Frontend lead" },
        ]} />
      </Block>

      <Block n="09" name="avatar-group" note="overlap ring · +N overflow">
        <div className="flex flex-wrap items-center gap-8">
          <AvatarGroup people={[
            { name: "Ana" }, { name: "Ben" }, { name: "Cara" }, { name: "Dev" },
            { name: "Eli" }, { name: "Fay" }, { name: "Gus" },
          ]} />
          <AvatarGroup people={[{ name: "Ana" }, { name: "Ben" }]} size={28} />
        </div>
      </Block>

      <Block n="10" name="tabs-underline" note="arrow keys · aria-selected">
        <TabsUnderline tabs={[
          { id: "install", label: "Install", content: "Run the shadcn CLI against the registry URL. Dependencies resolve automatically and the source lands in your components folder." },
          { id: "theme", label: "Theming", content: "Every block reads from CSS custom properties, so light and dark mode work without touching component code." },
          { id: "licence", label: "Licence", content: "MIT for the free tier. The commercial licence lifts the attribution requirement for client work." },
        ]} />
      </Block>

      <Block n="11" name="faq-accordion" note="grid-rows height · aria-expanded">
        <FaqAccordion items={[
          { q: "Do I need to be on Tailwind v4?", a: "The components target Tailwind v4 with CSS-first theming. They will work on v3 with minor token adjustments." },
          { q: "Can my AI agent install these?", a: "Yes. Point your agent at the registry URL or add it to components.json and it can browse and install items directly." },
          { q: "What is actually included?", a: "Twenty components, the Figma source, and lifetime updates. No subscription." },
          { q: "Is there a refund policy?", a: "Thirty days, no questions asked. If it does not fit your stack, you get your money back." },
        ]} />
      </Block>

      <Block n="12" name="marquee-text" note="transform-only · pauses on hover">
        <MarqueeText items={["SHIP FASTER", "OWN THE CODE", "MCP READY"]} />
        <MarqueeText items={["NO LOCK-IN", "TAILWIND V4", "REACT 19"]} reverse speedSeconds={38} />
      </Block>

      <Block n="13" name="pricing-toggle" note="role=switch · concentric radii">
        <PricingToggle tiers={[
          { name: "Starter", monthly: 29, annual: 23, features: ["1 project", "Community support", "Basic analytics"] },
          { name: "Growth", monthly: 79, annual: 63, highlighted: true, ctaLabel: "Start free trial",
            features: ["10 projects", "Priority support", "Advanced analytics", "Custom domains"] },
          { name: "Scale", monthly: 199, annual: 159, features: ["Unlimited projects", "Dedicated support", "SSO & audit logs", "SLA"] },
        ]} />
      </Block>

      <Block n="14" name="pricing-ladder" note="compare-at anchor · decoy · order bump">
        <PricingLadder
          tiers={[
            { id: "solo", name: "Solo", price: 19, compareAt: 29, role: "The reflex buy",
              valueLine: "Every component in one pack. Costs less than the time it takes to build one hero section.",
              features: ["All 20 components", "Figma file", "Lifetime updates"], ctaLabel: "Buy Solo" },
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
          ]}
          bump={{ label: "the Figma source file", price: 9,
            note: "Auto-layout, variants and design tokens — the same file the components were built from." }}
        />
      </Block>

      <Block n="15" name="contact-form" note="labels visible · inline validation">
        <div className="max-w-md">
          <ContactForm
            fields={[
              { name: "name", label: "Your name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "message", label: "What are you building?", textarea: true },
            ]}
            submitLabel="Send message"
          />
        </div>
      </Block>

      <CtaBand
        headline="Twenty blocks. One command each."
        subcopy="Free tier on 21st.dev, full pack on Gumroad. Your agent can install them either way."
        primary={{ label: "Get the pack", href: "#pricing-ladder" }}
        secondary={{ label: "Read the docs", href: "#faq-accordion" }}
      />

      <FooterColumns
        brand={<span className="font-mono">agentblocks</span>}
        columns={[
          { title: "Product", links: [{ label: "Components", href: "#button-shine" }, { label: "Pricing", href: "#pricing-ladder" }] },
          { title: "Developers", links: [{ label: "Registry", href: "/r/registry.json" }, { label: "GitHub", href: "https://github.com" }] },
          { title: "Company", links: [{ label: "FAQ", href: "#faq-accordion" }, { label: "Contact", href: "#contact-form" }] },
        ]}
        legal="© 2026 AgentBlocks · MIT for the free tier · Built with the shadcn registry format"
      />

      {/* index of every block, so nothing ships unrendered */}
      <div className="border-t border-border px-6 py-8">
        <div className="mx-auto flex max-w-5xl flex-wrap gap-2">
          {NAV.map((n) => (
            <a key={n} href={`#${n}`}
              className="rounded-lg border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
              {n}
            </a>
          ))}
        </div>
      </div>
    </main>
  )
}

createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>)

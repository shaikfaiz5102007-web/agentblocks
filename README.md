# AgentBlocks — an MCP-ready shadcn component registry

A publishable shadcn registry. Install any block with one command; AI agents can
discover and install them via the shadcn MCP server with zero extra work.

## Components

| Item | Type | What it does |
|---|---|---|
| `button-shine` | ui | Sweep-highlight button, press feedback, 44px target |
| `stat-ticker` | ui | Count-up stat, IntersectionObserver, tabular-nums |
| `pricing-toggle` | block | 3-tier pricing + accessible monthly/annual switch |
| `hero-spotlight` | block | Cursor-following spotlight hero, compositor-only paint |

## Build the registry

```bash
npm install
npm run registry:build     # writes public/r/*.json
```

Output lands in `public/r/` — one JSON per item plus the index at `public/r/registry.json`.

## Install (consumers)

```bash
npx shadcn@latest add https://YOUR-DOMAIN/r/button-shine.json
```

## MCP support — free, if the index exists

shadcn's MCP server works with **any** registry that serves an index at
`/r/registry.json`. No extra code. Consumers add:

```json
{ "registries": { "@agentblocks": "https://YOUR-DOMAIN/r/{name}.json" } }
```

then `npx shadcn@latest mcp init --client claude`. Their agent can now say
"show me the components in the agentblocks registry" and install them.

This is the differentiator: most UI kits ship components with no machine-readable
index. Yours ships both.

## Design standards applied

Every component follows `make-interfaces-feel-better`:
concentric radii, exact-property transitions (never `all`), `scale(0.96)` press,
`tabular-nums` on changing numbers, `text-wrap: balance/pretty`, reduced-motion
guards, and 44px touch targets.

## Publish / monetize

- **Free tier:** publish components to 21st.dev for reach (components are free there).
- **Paid tier:** sell the full bundle on Gumroad / Lemon Squeezy; link it from your
  21st.dev profile via **Studio → Profile → Pro components**.
- **Templates** are the only 21st.dev item with a price field — use those for paid listings.

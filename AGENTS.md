# AGENTS.md — astro_sylents

Astro site for **sylents** (VERVE Water Mobility GmbH) — the first series-ready electric
waterjet for leisure boats. Deploy + server details live in the parent
[`../AGENTS.md`](../AGENTS.md); this file is project-local context.

## Commands

```bash
pnpm dev       # local dev server
pnpm build     # build → dist/
./deploy.sh    # build + scp dist/ to all-inkl (astro.sylents.de)
```

## Design context

**Read [`PRODUCT.md`](PRODUCT.md) before any design work.** It captures the project's
register (`brand`), platform (`web`), users, brand personality (quiet · precise ·
engineered), anti-references, and the strategic design principles that guide every change.

- Design system / tokens: `src/styles/tokens.css` (cyan `#00bcd4`, deep teal `#0d1f24`,
  Montserrat + Geist Sans).
- Direction: **fresh redesign** of the old WordPress/Elementor site (not a faithful port),
  German-primary + bilingual. See the `## Direction` section in PRODUCT.md.
- `DESIGN.md` is not yet generated — run `$impeccable document` to capture it from the
  committed tokens.

## Conventions

- Keep it minimal.
- This file evolves as we go.

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

## Shop-Voranmeldung (Email-Registry)

- Nav „Shop" → `/shop-info/` (DE) / `/en/shop-info/` (EN) — interne Coming-Soon-Seite,
  solange der WP-Shop pausiert. **Pfad `/shop/` nie in Astro anlegen** (kollidiert live
  mit WordPress unter sylents.de/shop/).
- Formular → `public/shop-notify.php` (wird mitdeployt): speichert
  `sylents.de/shop-notify-data/registrations.csv` (**oberhalb** des Docroots, per HTTP
  nicht abrufbar) und mailt hi@sylents.de. Duplikat-Emails werden erkannt.
- Liste ansehen: `ssh all-inkl cat /www/htdocs/w01973ad/sylents.de/shop-notify-data/registrations.csv`

## Dev-Server starten/stoppen

```bash
./dev.sh       # Dev-Server im Vordergrund auf Port 4323 (eigene Pane, Ctrl+C = stop)
./dev.sh down  # killt einen hängengebliebenen Dev-Server auf Port 4323
```

**Regel: NIEMALS `nohup` oder `&` für den Dev-Server** — das erzeugt
Zombie-/Waisen-Prozesse, die Ports blockieren. Immer in einer eigenen
Terminal-Pane im Vordergrund laufen lassen.

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

- **Astro-Technik (Scoping-Fallen, Slider-Muster, Bilder, PHP-Endpoints): [`ASTRO.md`](ASTRO.md)** — vor Code-Arbeit lesen.
- Keep it minimal.
- This file evolves as we go.

# ASTRO.md — astro.sylents.de (projektspezifisch)

**Generelle Astro-Konventionen (Styling/Scripts/SEO/Deploy/Testing): [`../ASTRO.md`](../ASTRO.md)**
— hier nur Sylents-Spezifisches. Projekt-Kontext & Dev-Server-Regel: [`AGENTS.md`](AGENTS.md).

## i18n & Nav (3 Stellen!)

- DE unter `/`, EN unter `/en/` (`astro.config.mjs`, `prefixDefaultLocale: false`).
  Übersetzungen: `src/i18n/ui.ts`, Layout: `src/layouts/SiteLayout.astro` (`lang`-Prop).
- **Ausnahme:** `src/pages/index.astro` (DE-Startseite) ist eigenes vollständiges
  HTML mit eigener Nav. Navigations-Änderungen müssen gepflegt werden an:
  1. `SiteLayout.astro` (Nav-Array), 2. `src/i18n/ui.ts`, 3. `index.astro` (Hardcode).

## Etablierte Bausteine (wiederverwenden)

- Startseiten-Slider: `#outboardSlideshow` (`.slide`/`.slide-btn`/`.slide-dots`)
  und `[data-slideshow]` (`.pslide`/`.pbtn`) in Produktkarten.
- Produktseiten-Galerien: `[data-gallery]` (`.gallery-slide`/`.gallery-nav`/`.gallery-dots`).
- **Dots entstehen per JS → deren Styles brauchen `is:global`** (Fallerfahrung
  2026-11-17: Dots waren live unsichtbar, Details `../ASTRO.md` § 3).
- YouTube-Embeds (`is:inline define:vars`): Hero (`index.astro`) + Wasser-Video
  (`produktseite.astro`), Video-ID `UUnTM2u_i5o`.
- Formular-Feedback per Query-Param: Muster in `shop-info.astro`.

## Bilder

- Produktbilder: `public/products/<kategorie>/` (z. B. `outboard/frontal.png`),
  Boote: `products/sylents-b10e.jpg`. Optimieren vor Deploy (`../ASTRO.md` § 5).
- **Pfad `/shop/` bei sylents.de nicht verwenden, solange der WordPress-Shop dort
  liegt** (Deployment-Konflikt, siehe AGENTS.md). Fällt der WP-Shop weg, ist der
  Pfad wieder frei.

## Formulare & Registry

- Kontakt: all-inkl `formmail.pl` + Honeypot `fax` (Muster `index.astro`).
- Shop-Voranmeldung: `public/shop-notify.php` (Musterbeschreibung `../ASTRO.md` § 9)
  → CSV `sylents.de/shop-notify-data/registrations.csv` (oberhalb Docroot) +
  Mail an hi@sylents.de. Details: AGENTS.md.

## Deploy & Dev

- `./deploy.sh` → `dist/*` per scp nach
  `/www/htdocs/w01973ad/sylents.de/v2/` (überschreibt, löscht nie → Server-Cleanup per `ssh all-inkl rm …`).
- Dev: `./dev.sh` (Port **4323** — 4321/4322 sind auf dieser Maschine belegt).

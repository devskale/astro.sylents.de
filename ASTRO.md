# ASTRO.md — Astro-Technik-Konventionen (astro.sylents.de)

Ergänzt [`AGENTS.md`](AGENTS.md) (Projekt-Kontext, Deploy, Dev-Server-Regeln) um
Astro-spezifische Techniken und Fallstricke. Gilt für alle Arbeiten an `src/`.

## Stack

- **Astro 7**, rein statisch (keine Adapter, kein SSR), pnpm.
- i18n eingebaute Routing-Konfiguration (`astro.config.mjs`):
  `defaultLocale: 'de'`, `prefixDefaultLocale: false` → **DE unter `/`, EN unter `/en/`**.

## Seiten & Layouts

- Fast alle Seiten nutzen `SiteLayout.astro` (Header/Footer, `lang`-Prop, `t()`-Übersetzungen).
  **Ausnahme:** `src/pages/index.astro` (DE-Startseite) ist eigenes vollständiges HTML
  mit eigener Nav — Änderungen an der Navigation müssen **dort UND** in
  `SiteLayout.astro` + `src/i18n/ui.ts` gepflegt werden (3 Stellen!).
- Übersetzungen: Keys in `src/i18n/ui.ts`, Nutzung via `useTranslations(lang)` (siehe SiteLayout).
- Sprache umschalten: `altLangPath(Astro.url)` aus `src/i18n/utils.ts`.
- Neue EN-Seiten nach `src/pages/en/<name>.astro` mit `lang="en"` an SiteLayout.

## Styles — die Scoping-Falle (wichtig!)

Astro-`<style>` ist **scoped**: Selektoren bekommen `[data-astro-cid-…]` und greifen
**nicht** für Elemente, die erst zur Laufzeit per JS erzeugt wurden (`createElement`,
Dots, dynamische Listen). Solche Regeln gehören in einen eigenen Block:

```astro
<style is:global>
  /* nur Klassen verwenden, die exklusiv auf dieser Seite vorkommen */
  .slide-dots .dot { … }
</style>
```

(2026-11-17 hatte genau das beide DE-Slider unsichtbar gemacht — Dots waren unstyled.)

## Slideshow-/Galerie-Muster (bestehende Bausteine)

- Startseite (DE + EN): `#outboardSlideshow` (`.slide` + `.slide-btn` + `.slide-dots`)
  im Intro, `[data-slideshow]` (`.pslide` + `.pbtn`) in Produktkarten.
- Produktseiten: `[data-gallery]` (`.gallery-slide` + `.gallery-nav` + `.gallery-dots`).
- Neue Slider: diese Muster wiederverwenden, nicht neu erfinden. Dot-Styles → `is:global`.

## Scripts

- Interaktives Verhalten: normaler `<script>` (Astro bündelt als Module, läuft nach DOM-Ready).
- YouTube-Player: `<script is:inline define:vars={{ heroVideoId: '…' }}>` — Muster in
  `index.astro` (Hero) und `produktseite.astro` (Wasser-Video).
- Query-Param-Feedback (Formulare): `URLSearchParams` + `history.replaceState` zum
  Aufräumen — Muster in `shop-info.astro`.

## Bilder

- Produktbilder: `public/products/<kategorie>/` (z. B. `outboard/frontal.png`).
- Allgemeine Assets im `public/`-Root; **Dateinamen klein, ohne Leerzeichen/Umlaute**
  (`02_Sylents B1.0e.jpg` → `products/sylents-b10e.jpg`).
- Vor Deploy web-optimieren, z. B.:
  `magick in.jpg -auto-orient -resize x1200 -strip -interlace Plane -quality 82 out.jpg`
- **Pfad `/shop/` bei sylents.de nicht verwenden, solange der WordPress-Shop dort
  liegt** (Deployment-Konflikt, siehe AGENTS.md). Fällt der WP-Shop weg, ist der Pfad
  wieder frei.

## Formulare / PHP auf all-inkl

- Kontaktformular: all-inkl `formmail.pl` (Muster in `index.astro`, Honeypot-Feld `fax`).
- Eigener Endpoint mit Datenspeicherung: `public/<name>.php` wird mit `dist/` mitdeployt.
  Muster `shop-notify.php`: Validierung + Honeypot + Redirect-Whitelist (nur eigene Pfade,
  kein offener Redirect), CSV **oberhalb des Docroots**, Mail via PHP `mail()`
  (`-f`-Parameter setzt den Envelope-Sender).

## Deploy-Merkregel

`deploy.sh` scp't `dist/*` — **überschreibt, löscht nie**. Entfernte Dateien manuell vom
Server nehmen:

```bash
ssh all-inkl 'rm /www/htdocs/w01973ad/sylents.de/v2/<datei>'
```

## Testing

E2E/Smoke-Tests mit **rodney** (Headless-Chrome): `rodney start` → `open` → `waitstable`
→ `js`/`click`/`submit` → `screenshot` → **immer `rodney stop`**. Screenshots nach
`research/` (gitignored). Mobile: `rodney device iphone-x` — danach `rodney device --clear`.

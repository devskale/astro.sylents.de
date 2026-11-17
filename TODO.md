# TODO — sylents-astro

## 1. EN-Version auf Stand der DE-Seite bringen — ✅ erledigt
- [x] `en/index.astro`: Intro-Slideshow (5 × SY3.1: frontal, seitlich, eingeklappt, display, gondel — Pfeile + Dots) statt statischem Einzelbild
- [x] `en/index.astro`: Produktkarten-Slideshow für Outboard (3 Bilder, Pfeile) statt `/outboard.png`
- [x] `en/products.astro`: Produkt-Galerien je Produkt (Outboard 7, Inboard 3, Pod 4 Bilder) + Wasser-Video-Sektion
- [x] `en/team.astro` + `en/career.astro`: geprüft — waren bereits auf DE-Stand
- [x] **Bugfix DE** (`index.astro` + `produktseite.astro`): Dot-Styles waren scoped, Dots werden aber per JS erzeugt → unsichtbar auf Live-Seite. Styles in `is:global`-Blöcke verschoben (DE + EN)

## 2. Shop → interne Voranmeldungs-Seite — ✅ erledigt
- [x] Nav „Shop" zeigt jetzt auf `/shop-info/` (DE) bzw. `/en/shop-info/` (EN) — an allen 3 Stellen (SiteLayout, ui.ts, DE-Index-Nav). Kein externer /shop/-Link mehr im Build.

## 3. Voranmeldung-Seite mit Email-Registry — ✅ erledigt (A-light)
- [x] `public/shop-notify.php`: validiert Email + Consent + Honeypot → anhängen an `registrations.csv` (oberhalb des Docroots: `sylents.de/shop-notify-data/`, per HTTP nicht abrufbar) UND Mail an hi@sylents.de (Duplikate erkannt & markiert, kein offener Redirect)
- [x] `/shop-info/` (DE): „Der Sylents Shop ist im Aufbau" + „Vergünstigungen für Frühbesteller" + Email-Formular, Erfolg-/Fehler-Feedback per Query-Param
- [x] `/en/shop-info/` (EN): gleiche Seite, „early-bird discounts"
- [x] Nav-Eintrag „Shop" → interne Seite
- [ ] Nach Deploy: einmal live testen (Formular absenden, Mail + CSV prüfen) — lokal kein PHP verfügbar
- [ ] Später optional: KAS-Cron mit täglichem CSV-Digest an hi@sylents.de — **nur senden, wenn sich die Liste geändert hat** (Hash/mtime-Vergleich mit Marker-Datei)

## 4. Abschluss — ✅ erledigt (2026-11-17)
- [x] Dev-Check DE + EN (Slideshow-Verhalten via Rodney verifiziert)
- [x] `./deploy.sh` → live auf www.sylents.de, Rodney-Live-Tests: Shop-Info DE (Anmeldung + Duplikat), EN-Slideshows, Formular-Endpoint (303 + CSV + Mail)
- [x] Mobile-Check (iPhone-Emulation) — Nav ohne Burger ist OK so, Partner-Carousel läuft absichtlich horizontal durch
- Offen: `public/02_Sylents B1.0e.jpg` (ungetrackt, mitdeployt) — behalten oder entfernen?
- Offen: Git-Commit + Push (Regel: vorher `git pull --rebase`)

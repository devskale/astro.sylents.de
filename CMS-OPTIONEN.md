# CMS-Optionen für Astro — Recherche (Stand 2026-11-17)

## ✅ FINALE EMPFEHLUNG (17.11.2026, rev. 4): **CaretCMS** — das Tool aus baumschneider
>
> **Entdeckung durch Nachfrage:** In `../baumschneider/` läuft bereits **CaretCMS**
> (`@caretcms/core`, [MIT](https://github.com/web-stacked/caretcms), Astro-Integration,
> v0.6.1) — **produktiv** für timosbaumdienst.com. Es erfüllt alle harten Kriterien:
>
> - ✅ **Visuelles Inline-Editing in-place**: `data-caret`-Attribut an beliebige Elemente →
>   auf der echten Seite klicken, tippen, fertig („Edit where you can see it“) — noch
>   direkter als Tinas Sidebar-Editing. Markdown-Collections werden mit
>   Source-Range-Write-back in die originalen `.md`-Dateien geschrieben.
> - ✅ **Astro-nativ**: `caret()`-Integration, bleibt `output: 'static'` → **all-inkl-Deploy
>   unverändert**, kein Node-Server nötig. Publish = Commit + Webhook → Deploy.
> - ✅ **Kein Ballast**: Content in JSON/Markdown im eigenen Repo („never locked in a
>   vendor database“), Studio-Admin + Seite synchron.
> - ✅ **Free/OSS**: MIT, self-hosted, keine Cloud nötig.
> - ✅ **Prod-Erfahrung im Haus**: Deploy-Pipeline (Webhook-Listener auf ubugrill →
>   `caret-publish-hook.sh`) existiert bereits; bekannte Stolpersteine dokumentiert
>   (z. B. kein Astro-`base`-Prefix-Support in 0.5/0.6).
> - `caretize`-CLI scannt Bestands-Astro-Sites und setzt `data-caret`-Attribute
>   interaktiv — ideal für astro.sylents.de.
>
> **Risiko ehrlich benannt:** sehr jung (Feb 2026), **8 GitHub-Stars**, kleines Org
> (web-stacked), pre-1.0, breaking changes wahrscheinlich. **Gegen Wert:** Content lebt
> als plain Markdown/JSON im Repo → CMS-Wechsel/Absprung jederzeit ohne Datenverlust;
> `data-caret`-Attribute sind dekorativ und entfernbar. TinaCMS bleibt die konservative
> Alternative (13,9k★, mature, gleicher Publish-Trade-off).
>
> **Methodik-Notiz:** CaretCMS wurde in der ersten Recherche verpasst — „best SOTA“-Suchen
> spiegeln nur den SEO-Konsens wider (Caret: 8★, Feb 2026, nicht mal in der offiziellen
> Astro-CMS-Liste). Gefunden erst durch Nachfrage nach dem eigenen Setup in
> `../baumschneider/`. Lektion: bei Projektrecherche zuerst eigenes Umfeld (Sibling-Projekte,
> AGENTS.md-Netzwerk) auf Prior Art prüfen, dann das Web — und Discovery mit alternativen
> Query-Formen (GitHub-Topics, npm, „inline editing Astro“) erweitern, bevor man im
> einmal gefundenen Kandidaten-Frame verifiziert.
>
> Verworfen (final): Headless WP (Ballast) • Keystatic/Pages/Sveltia/Decap (kein visuelles
> Editing) • StudioCMS (Live-Preview = offener Roadmap-Wunsch, Dashboard-only) • Payload/
> Strapi/Directus (Backend-Last/kein OSS) • Cloudflare Workers für StudioCMS • Vercel Hobby
> (ToS) • Sanity/Storyblok/Prismic/CloudCannon (proprietär).
>
> **🔎 Web-Check (17.11.2026), Primär-/Praxisquellen:**
> - **Headless WP + Astro ist 2026 ein ausgereifter Standardweg** — die offiziellen
>   Praxis-Guides ([attowp](https://attowp.com/wordpress-development/headless-wordpress-astro-guide/),
>   [wbcomdesigns](https://wbcomdesigns.com/headless-wordpress-astro/)) bestätigen:
>   Editing bleibt 1:1 WordPress, **aber**: Publish-Trigger muss robust sein (Beispiel
>   aus der Praxis: abgelaufener Deploy-Token → Posts erschienen nie, niemand merkte es
>   → täglicher Safety-Net-Rebuild + `concurrency` in CI einplanen), stale Caches,
>   Live-Preview von Entwürfen ist Zusatzarbeit, Frontend-Plugins (Formulare etc.)
>   müssen im Frontend neu gebaut werden.
> - **WPGraphQL gesund** ([wordpress.org-Plugin-API](https://api.wordpress.org/plugins/info/1.2/?action=plugin_information&request[slug]=wp-graphql):
>   v2.28.0, Update 2026-11-12, 30k aktive Installationen, Rating 98/100).
> - **StudioCMS weiter pre-1.0**: npm `latest` = 0.7.0 (19.10.2026); WYSIWYG ist ein
>   separates Addon-Paket (`@studiocms/wysiwyg` v0.4.2); öffentliche Produktiv-
>   Reviews nicht auffindbar → Ökosystem-Risiko einkalkulieren.
> - **Elementor-Legacy beachten:** das alte WP-Setup war Elementor. Über die WP-REST
>   kommt gerendertes HTML (`content.rendered`) an → Astro kann das via `set:html`
>   konsumieren, Elementor-Editing bliebe also 1:1 erhalten. Sauberer für strukturierte
>   Produktseiten (Galerien, Bulletpoints): Gutenberg/ACF-Felder statt Elementor-Layouts.

Anlass: CMS ist unser größter Pain-Point — Inhalte liegen hart in `.astro`-Templates,
nichts ist redaktionell editierbar. Gesucht: **free & open source**, **Astro-tauglich**,
Editing so nah wie möglich an **WordPress** (Dashboard, Rich-Text, Bild-Upload,
„Speichern → live"). Alle Angaben gegen Primärquellen geprüft (Docs, GitHub-Repos,
Lizenzdateien), Quelle jeweils verlinkt.

## Ausgangslage (dieses Repo)

- Kein `src/content/` — Produktseiten, Team, Texte sind **hartkodiert** (`src/pages/**`).
- Deploy: `./deploy.sh` baut `dist/` und scp't auf **all-inkl** (`astro.sylents.de`).
  all-inkl = PHP/MySQL, **kein Node-Runtime** → Astro läuft dort nur als statischer Output.
- Eigene Server (amd/amd2, siehe `~/code/www`) könnten Node-Dienste hosten, falls ein
  CMS-Backend nötig wäre.

**Wichtig:** Welches CMS wir wählen, ist der kleine Teil. Der große Teil ist Phase 1:
Inhalte in **Astro Content Collections** überführen — das ist die Vorarbeit für *jede*
Option unten.

## Kurzfazit / Empfehlung

| Rang | Option | Warum |
|---|---|---|
| 🥇 | **Keystatic** | Astro-nativ, MIT, Admin-UI läuft in der eigenen Site, Content = Git. Bestes Gesamtpaket für dieses Projekt. |
| 🥈 | **TinaCMS** | Editier-Erlebnis am nächsten an WordPress (visuelles Klick-zum-Bearbeiten auf der echten Seite). Astro ist Tinas Default-Starter. |
| 🥉 | **StudioCMS** | Astro-natives Dashboard-CMS (DB-backed) — am ehesten „WordPress-Gefühl inkl. sofortigem Publizieren“, braucht aber Node-Hosting (**läuft NICHT auf Cloudflare Workers Free** — s. Detailprofil). |
| — | Pages CMS, Sveltia, Payload, Strapi | je nach Anforderung; Detailprofile unten |
| ⚠️ | Directus | **nicht mehr OSI-open-source** (MSCL-Lizenz) |
| Fallback | Headless WordPress | editiert sich exakt wie WordPress; nutzt bestehendes all-inkl-PHP-Hosting |

## Auswahl-Matrix (17.11.2026) — Pflicht: **visuelles Editing**

⭐ = Kriterium Nr. 1 (Pflicht). WP-Feeling: ●●●● = näher an WP-Admin/Elementor.

| CMS | Visuelles Editing ⭐ | WP-Feeling | Astro-nativ | Free/OSS | Sofort live | Läuft wo | Status/Aktivität |
|---|---|---|---|---|---|---|---|
| **CaretCMS** ⭐ neu | ✅ **Inline-Editing in-place** (`data-caret`-Attribut, click-to-edit auf der Seite, [Repo](https://github.com/web-stacked/caretcms)) | ●●●● | ✅ Integration, bleibt `output: 'static'` | ✅ MIT, self-hosted | ⚠️ Publish = Commit + Webhook → Deploy (sofort live nur im Server-Modus) | nichts (Content im Repo; optional Webhook-Listener) | 8★ ⚠️ sehr jung (Feb 2026), **aber Prod-Erfahrung in baumschneider** → **Empfehlung** |
| **TinaCMS** | ✅ **Click-to-edit auf der echten Seite** (`@tinacms/astro`) | ●●●○ | ✅ Default-Starter | ✅ Apache-2.0 | ❌ Rebuild (Min.) | Statisch; TinaCloud free (2 User)/self-host | 13,9k★ aktiv — konservative Alternative |
| **ApostropheCMS** | ✅ In-Context-Editing — **aber nur auf Apostrophe-eigenen Seiten** (mit Astro-Headless eingeschränkt) | ●●●● | ⚠️ Guide (Stub) | ⚠️ MIT-Core, Premium-Module $ | ✅ | Node + DB | 4,7k★ aktiv |
| **StudioCMS** | ❌ Dashboard-WYSIWYG; Live-Preview = offener [Roadmap-Wunsch](https://github.com/withstudiocms/roadmap/discussions/4) | ●●●○ | ✅✅ gebaut für Astro | ✅ MIT | ✅ | Node + libSQL/MySQL/Postgres | 844★, pre-1.0 |
| **Payload** | ⚠️ Live-Preview-iFrame im Admin, kein Click-to-edit | ●●●○ | ⚠️ REST/Beispiel | ✅ MIT | ✅ (Backend) | Next.js-Backend + DB nötig | 45,9k★ sehr aktiv |
| **Keystatic** | ❌ Formular-/Rich-Text-Editing im Admin | ●●○○ | ✅ Integration 1. Klasse | ✅ MIT | ❌ Rebuild | Statisch; Admin-UI in der Site; Cloud free ≤3 User | 2,5k★ aktiv |
| **Pages CMS** | ❌ Externe Formular-UI | ●○○○ | ⚠️ agnostisch (`.pages.yml`) | ✅ MIT | ❌ Rebuild | Nichts (hosted app) / self-host | 4,2k★ aktiv |
| **Sveltia CMS** | ❌ Externe Formular-UI | ●●○○ | ⚠️ agnostisch | ✅ MIT | ❌ Rebuild | Nichts | 3,1k★ aktiv |
| **Decap CMS** | ❌ wie Sveltia (Vorbild) | ●●○○ | ⚠️ agnostisch | ✅ MIT | ❌ Rebuild | Nichts | ⚠️ Pflegemodus |
| **Strapi** | ❌ Admin-Dashboard | ●●●○ | ⚠️ REST/GraphQL | ⚠️ nur CE = MIT | ✅ (Backend) | Node-Backend + DB | 73,5k★ sehr aktiv |
| **Directus** | ❌ Admin-Dashboard | ●●○○ | ⚠️ REST/GraphQL | ❌ **MSCL, kein OSS** | ✅ (Backend) | Node-Backend + DB | 38,7k★ aktiv |
| **WordPress headless** | ✅ Gutenberg/Elementor — aber in WP, nicht auf der Astro-Seite | ●●●● | ⚠️ offizieller Guide | ✅ GPL | ❌ Rebuild | PHP/MySQL (all-inkl ✓) | **verworfen** (alter Ballast) |
| Sanity / Storyblok / Prismic / CloudCannon | ✅ Visual Editing | ●●●● | ✅ | ❌ **proprietär** | ✅ | SaaS | raus (Kriterium OSS) |

## Vergleichstabelle (Stand 17.11.2026)

| Projekt | Lizenz | Stars | Aktivität (pushed) | Content-Ablage | Editing | Für Publish nötig |
|---|---|---|---|---|---|---|
| [Keystatic](https://github.com/thinkmill/keystatic) | MIT | 2,5k | aktiv (2026-11-17) | Git (MD/Markdoc/JSON) | Formular-/Rich-Text-UI in eigener Site (`/keystatic`) | Rebuild (CI) |
| [TinaCMS](https://github.com/tinacms/tinacms) | Apache-2.0 | 13,9k | aktiv (2026-11-17) | Git (MD/MDX/JSON) | **Visuell auf der Seite** | Rebuild (CI) |
| [Pages CMS](https://github.com/hunvreus/pagescms) | MIT | 4,2k | aktiv (2026-10-16) | Git | Hosted UI (app.pagescms.org) oder self-host | Rebuild (CI) |
| [StudioCMS](https://github.com/withstudiocms/studiocms) | MIT | 844 | aktiv (2026-11-17) | libSQL-DB | Dashboard in eigener Site, sofort live | nichts (SSR-Hosting nötig) |
| [Sveltia CMS](https://github.com/sveltia/sveltia-cms) | MIT | 3,1k | aktiv (2026-11-17) | Git | Hosted/lokal, Decap-kompatibel | Rebuild (CI) |
| [Decap CMS](https://github.com/decaporg/decap-cms) | MIT | 19,5k | **Pflegemodus** (nur Chores/Fixes) | Git | wie Sveltia (Vorbild) | Rebuild (CI) |
| [Payload](https://github.com/payloadcms/payload) | MIT | 45,9k | sehr aktiv | DB (Mongo/Postgres…) | Eigenes Admin (Next.js) | nichts (Backend-Hosting) |
| [Strapi](https://github.com/strapi/strapi) | MIT **nur CE** (EE-Ordner kommerziell) | 73,5k | sehr aktiv | DB | Eigenes Admin | nichts (Backend-Hosting) |
| [Directus](https://github.com/directus/directus) | **MSCL-1.0** (kein OSS) | 38,7k | aktiv | DB | Eigenes Admin | nichts (Backend-Hosting) |
| WordPress (headless) | GPL | — | aktiv | MySQL (all-inkl ✓) | **exakt WordPress** | Rebuild (CI) oder SSR |

## Detailprofile

### 1. Keystatic — Empfehlung für dieses Projekt

- **Was:** Git-basiertes CMS von Thinkmill, MIT-Lizenz, [Astro-Integration erster Klasse](https://keystatic.com/docs/installation-astro) (offizieller [Astro-Guide](https://docs.astro.build/en/guides/cms/keystatic/)).
- **Setup:** `npx astro add react markdoc` + `@keystatic/core` + `@keystatic/astro`, `keystatic.config.ts` definiert Collections/Felder → Admin-UI unter `/keystatic` **innerhalb der eigenen Site**. Speichert als Markdown/Markdoc in `src/content/…` — deckt sich 1:1 mit Astro Content Collections.
- **Storage:** `local` (Dev), `GitHub` (Redaktion im Browser, Änderungen = Commits/Branch) oder [Keystatic Cloud](https://keystatic.com/docs/cloud) (**free bis 3 Nutzer/Team**, Pro ab $10/Monat — betrifft nur Auth/Cloud-Images, das CMS selbst bleibt offen).
- **WordPress-artig?** Dashboard + Rich-Text-Editor (Markdoc) + Bildfelder: ja beim *Inhalte-Pflegen*. Kein Klick-zum-Bearbeiten auf der gerenderten Seite, und „Speichern" → Commit → **Rebuild nötig** (CI), bevor die Seite live ist.
- **Rezept dafür:** [Astro Images mit Keystatic](https://keystatic.com/docs/recipes/astro-images), [Admin-UI in Prod deaktivieren](https://keystatic.com/docs/recipes/astro-disable-admin-ui-in-production).

### 2. TinaCMS — am nächsten am WordPress-Gefühl

- **Was:** Git-basiertes CMS mit **Visual Editing** (Redakteur sieht die echte Seite und klickt sich durch die Inhalte), Apache-2.0.
- **Astro:** [Astro ist Tinas empfohlener Default-Starter](https://tina.io/docs/frameworks/astro/) — `@tinacms/astro` liefert vanilla-Astro Rich-Text-Rendering + Ein-Zeilen-Integration; `npx @tinacms/cli init` für Bestandssites.
- **Kosten:** Code komplett offen; Tina Cloud (Hosted-Auth/Editor) hat Free-Tier, Self-Hosting ist dokumentiert. Erst bei Team-Features/Cloud-Dienstleistungen kostenpflichtig.
- **WordPress-artig?** Das **Editieren** ja — Klick auf der Seite, Text ändern, speichern. Aber wie Keystatic: Speichern = Git-Commit → **Rebuild** für die Live-Site.

### 3. StudioCMS — das „echte" Dashboard-CMS für Astro

- **Was:** Community-getriebenes, [Astro-natives CMS](https://studiocms.dev/) („built for Astro with Astro and the community in mind"), MIT, [aktives Repo](https://github.com/withstudiocms/studiocms).
- **Architektur:** Läuft **in** der Astro-App (Server-Modus nötig), speichert in **libSQL/Turso** ([Docs](https://docs.studiocms.dev/)), hat Login/Auth, Dashboard, Plugin-API, SDK + REST.
- **WordPress-artig?** Am ehesten: einloggen, im Dashboard schreiben, **sofort live** (kein Rebuild — der Server rendert on-demand). Dafür: Site braucht Node-Hosting (eigener Server/amd2, Cloudflare etc.) — **all-inkl-statisch reicht nicht**. Kleinste Community der Top-3 (844 Stars).

#### StudioCMS auf Cloudflare Workers (Free)? — Stand 17.11.2026: **nein / nicht supported**

- **Workers-Free-Limits** ([CF-Docs](https://developers.cloudflare.com/workers/platform/limits/)): 100k Requests/Tag, **10 ms CPU/Request** (SSR/Auth laut CF typisch 10–20 ms), 128 MB RAM, Worker-Bundle 64 MiB, `nodejs_compat` seit Compat-Date 2026-08-04 Default.
- **DB wäre nicht das Problem:** [Turso Free](https://turso.tech/pricing) = $0, 100 DBs, 5 GB Storage, 500 Mio. Row-Reads/Monat — mehr als genug für eine Marketing-Site.
- **Das Problem ist StudioCMS selbst:** Core-Paket hängt an [`@effect/platform-node` + `@libsql/client`](https://raw.githubusercontent.com/withstudiocms/studiocms/main/packages/studiocms/package.json), die Templates an Node-Adapter + **sharp** (Node-C++-Bindings). Docs verlangen explizit Node („Bun and Deno are not supported“); **Cloudflare wird nirgends erwähnt** — keine Guide-Seite, kein Template, 0 Treffer im Docs-Repo. Ein Workers-Deploy wäre also ungetestet/unsupported und kann bei jedem Update brechen.
- **Fazit:** StudioCMS braucht einen Node-Host (eigener amd/amd2-Server existiert bereits → €0; sonst Oracle Always-Free-VPS oder PaaS ab ~$5). Für Cloudflare-Free passt stattdessen der Keystatic-Pfad (Admin-UI ist reines React über GitHub-API — Workers-kompatibel; Site kann prerendered sein, nur `/keystatic`-Routen SSR).

### 4. Pages CMS — minimaler Aufwand

- **Was:** [MIT, Git-basiert](https://github.com/hunvreus/pagescms), keine DB/kein Backend: Hosted UI unter [app.pagescms.org](https://app.pagescms.org/) (free nutzbar) **oder** self-host aus dem Repo. Konfiguration (Content-Types, Media, Rich-Text) liegt als `.pages.yml` im Repo.
- **WordPress-artig?** Solide Formular-/Rich-Text-/Media-UI, aber external (nicht in der Site eingebettet) und ohne Visual Editing.

### 5. Sveltia CMS (statt Decap)

- **Was:** [MIT, aktiv](https://github.com/sveltia/sveltia-cms), Drop-in-kompatibel mit Decap-Config; moderne UI, i18n stark.
- **Decap selbst:** 19,5k Stars, aber [nur noch Care-Commits](https://github.com/decaporg/decap-cms/commits) (letzter Release-Commits Okt. 2026, überwiegend chore/fix) — community liest es als Pflegemodus. **Neu nicht mehr anfangen.**

### 6. Payload / Strapi — wenn „Backend-CMS" gewollt ist

- **Payload:** [MIT](https://github.com/payloadcms/payload) (seit v3 komplett), sehr aktiv, [offizielles Astro-Beispiel](https://docs.astro.build/en/guides/cms/payload/). Admin-UI ist Next.js → eigenes Backend-Hosting + DB nötig. Overkill für eine Marketing-Site, stark für Applikationen.
- **Strapi:** sehr aktiv, aber [nur die Community-Edition ist MIT](https://github.com/strapi/strapi/blob/main/LICENSE) — alles im `ee/`-Ordner fällt unter kommerzielle Lizenz. Eigenes Node-Backend + DB nötig.

### 7. ⚠️ Directus — Lizenz-Falle

- Repo-Lizenz-Label `NOASSERTION`, und die [LICENSE](https://raw.githubusercontent.com/directus/directus/main/license) ist die **„Monospace Sustainable Core License (MSCL-1.0-GPL)"** mit Competing-Use-Schranke — **kein OSI-open-source**, erfüllt unser Kriterium nicht (trotz 38,7k Stars). Falls trotzdem erwünscht: Klärung mit Monospace nötig.

### 8. Fallback: Headless WordPress

- [Offizieller Astro-Guide](https://docs.astro.build/en/guides/cms/wordpress/) existiert. WP selbst läuft auf all-inkl (PHP/MySQL vorhanden — das alte Site-Setup), Astro holt Inhalte via REST/GraphQL; mit Plugin (webhook on publish) lässt sich der Rebuild triggern.
- **Pro:** Editing-Erlebnis *exakt* WordPress (das, was die Redaktion kennt), bestehendes Hosting, `wp-theme`-Artefakte im Repo zeigen Vertrautheit.
- **Contra:** Zwei Systeme zu betreiben und zu warten; WP-Security/Updates bleiben als Last.

### Verworfen (nicht open source)

CloudCannon (Astro „Featured Partner", aber proprietär), Sanity, Contentful, Storyblok, Prismic — SaaS, Lizenzen erfüllen das Kriterium nicht.

## Ehrliche Einordnung: „WordPress-like" unter CMS-Kandidaten

1. **Sofort live speichern** (ohne Rebuild): nur DB-backed (StudioCMS, Payload, Strapi, WP-headless).
2. **Auf der Seite klicken und editieren**: nur TinaCMS.
3. **Dashboard + Rich-Text + Mediathek**: alle — Keystatic/Pages/Sveltia kommen inkl. Git-Versionsgeschichte (Better-than-WP: Änderungen sind revertierbar).
4. **Git-Vorteil:** Keystatic/Tina/Pages/Sveltia halten Content im Repo → Code-Review, Rollback, keine zweite Infrastruktur. Dafür Publish-Latenz von Minuten (CI), nicht Sekunden.

## Migrationsweg für astro.sylents.de (unabhängig von der Wahl)

1. **Phase 1 — Content Collections:** Inhalte aus `src/pages/**` extrahieren: `products` (DE/EN-Felder, Galerie-Bilder), `team`, ggf. `news`. Seiten werden zu Renderern ihrer Collections. *(Der eigentliche Aufwand.)*
2. **Phase 2 — CMS dran:** z. B. Keystatic-Config für genau diese Collections (Felder 1:1 abbilden); Redaktion editiert unter `/keystatic`.
3. **Phase 3 — CI-Deploy:** GitHub Action, die bei Push auf `main` buildet und via scp/rsync auf all-inkl deployt (ersetzt das manuelle `./deploy.sh`) — macht aus „Speichern im CMS" einen automatisierten Publish.
4. **Later option:** Falls „sofort live" gewünscht: Umzug auf Node-fähiges Hosting (eigener Server) + StudioCMS bzw. SSR — dann ist Phase 1 identisch wiederverwendbar.

## Quellen

- Astro CMS-Übersicht: <https://docs.astro.build/en/guides/cms/>
- Keystatic Astro-Guide / Cloud / Rezepte: <https://keystatic.com/docs/installation-astro>, <https://keystatic.com/docs/cloud>
- Tina Astro-Guide: <https://tina.io/docs/frameworks/astro/>
- StudioCMS: <https://studiocms.dev/>, <https://docs.studiocms.dev/>
- Pages CMS: <https://pagescms.org/>, <https://github.com/hunvreus/pagescms>
- Sveltia: <https://github.com/sveltia/sveltia-cms>; Decap-Commits: <https://github.com/decaporg/decap-cms>
- Payload-Astro-Guide: <https://docs.astro.build/en/guides/cms/payload/>
- Strapi-Lizenz: <https://github.com/strapi/strapi/blob/main/LICENSE>; Directus-Lizenz: <https://raw.githubusercontent.com/directus/directus/main/license>
- WordPress-Astro-Guide: <https://docs.astro.build/en/guides/cms/wordpress/>

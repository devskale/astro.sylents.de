// Content Collections — Sylents (VERVE Water Mobility GmbH)
// Single source of truth für redaktionelle Inhalte. Seiten rendern aus den
// Collections; keine hartkodierten Texte mehr in .astro-Templates.
//
// Conventions (siehe ../baumschneider/src/content.config.ts):
// - Eine Datei pro Eintrag (glob-Loader, id = Dateiname ohne .md)
// - DE/EN-Felder gepaart in einer Datei (de: / en:) — nichts driftet auseinander
// - Flache, kleine Felder → später 1:1 als data-caret-Bindings editierbar
//   (Muster: collection::eintrag::feld, z. B. "products::outboard::de::name")

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Lokalisierter Text-Block (DE/EN gepaart).
const localeProduct = z.object({
  name: z.string(),
  tag: z.string(),
  power: z.string(),
  points: z.array(z.string()),
});

// Antriebs-Varianten: Außenborder, Innenborder, Pod-Antrieb.
const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    id: z.string(),
    // Reihenfolge auf der Produktseite (1 = zuerst)
    order: z.number().default(99),
    img: z.string(),
    gallery: z.array(z.string()).default([]),
    de: localeProduct,
    en: localeProduct,
  }),
});

// Team-Mitglieder.
const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    img: z.string(),
    order: z.number().default(99),
    de: z.object({ role: z.string(), bio: z.string() }),
    en: z.object({ role: z.string(), bio: z.string() }),
  }),
});

// Startseiten-Texte (home-de / home-en). Assets (Bilder, Logos, SVG-Icons)
// und Hrefs bleiben im Template — hier liegt nur redaktioneller Text.
// target in productCards.cards = Produkt-id für den Anker (#target);
// '' = Link ohne Anker (Pod-Karte verlinkt die Produktseite komplett).
const site = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/site' }),
  schema: z.object({
    locale: z.enum(['de', 'en']),
    title: z.string(),
    metaDescription: z.string(),
    heroTagline: z.string(),
    partnersLabel: z.string(),
    intro: z.object({
      eyebrow: z.string(),
      title: z.string(),
      lead: z.string(),
      tags: z.array(z.string()),
    }),
    benefits: z.object({
      eyebrow: z.string(),
      title: z.string(),
      lead: z.string(),
      cards: z.array(z.object({ title: z.string(), text: z.string() })),
    }),
    productCards: z.object({
      title: z.string(),
      // Label vor der Leistungsangabe ('Leistung' / 'Power')
      labelPower: z.string(),
      moreLabel: z.string(),
      cards: z.array(
        z.object({
          target: z.string(),
          name: z.string(),
          desc: z.string(),
          power: z.string(),
        }),
      ),
    }),
    contact: z.object({
      title: z.string(),
      subtitleLines: z.array(z.string()),
      text: z.string(),
      persons: z.array(z.string()),
      telLabel: z.string(),
      emailLabel: z.string(),
      tel: z.string(),
      email: z.string(),
      form: z.object({
        namePlaceholder: z.string(),
        emailPlaceholder: z.string(),
        messagePlaceholder: z.string(),
        consentPrefix: z.string(),
        consentLinkText: z.string(),
        submit: z.string(),
      }),
    }),
  }),
});

// Karriere-Seite (career-de / career-en). SVG-Icons der Perks bleiben im Template.
const career = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/career' }),
  schema: z.object({
    locale: z.enum(['de', 'en']),
    meta: z.object({ title: z.string(), description: z.string() }),
    hero: z.object({ h1: z.string(), text: z.string() }),
    perksEyebrow: z.string(),
    perksTitle: z.string(),
    perks: z.array(z.object({ title: z.string(), desc: z.string() })),
    jobsEyebrow: z.string(),
    jobsTitle: z.string(),
    // subject = mailto-Betreff (wird im Template URL-kodiert)
    jobs: z.array(z.object({ title: z.string(), meta: z.string(), subject: z.string() })),
    email: z.string(),
    // Text vor dem E-Mail-Link (der Punkt nach dem Link steht im Template)
    note: z.string(),
  }),
});

// Shop-Voranmeldungs-Seite (shopinfo-de / shopinfo-en).
const shopinfo = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/shopinfo' }),
  schema: z.object({
    locale: z.enum(['de', 'en']),
    meta: z.object({ title: z.string(), description: z.string() }),
    hero: z.object({ h1: z.string(), text: z.string() }),
    notify: z.object({
      eyebrow: z.string(),
      title: z.string(),
      lead: z.string(),
      emailLabel: z.string(),
      emailPlaceholder: z.string(),
      consentPrefix: z.string(),
      consentLinkText: z.string(),
      consentSuffix: z.string(),
      submit: z.string(),
      okTitle: z.string(),
      okText: z.string(),
      dupText: z.string(),
      errEmail: z.string(),
      errConsent: z.string(),
      errBot: z.string(),
    }),
  }),
});

// Rechtsseiten (Impressum/Datenschutz/AGB, DE+EN). Body = HTML-Prosa 1:1 aus
// den alten Pages, wird via set:html unverändert injiziert (kein Markdown-
// Transform, damit die Ausgabe byte-identisch bleibt).
const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    locale: z.enum(['de', 'en']),
    page: z.string(),
    title: z.string(),
    description: z.string(),
    breadcrumb: z.string(),
    h1: z.string(),
  }),
});

// Globale Einstellungen (settings-de / settings-en): Nav-Labels, Footer,
// Firmendaten. Ersetzt die Hardcode-Strings aus i18n/ui.ts bzw. den
// duplizierten Inline-Footern.
const settings = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/settings' }),
  schema: z.object({
    locale: z.enum(['de', 'en']),
    nav: z.object({
      home: z.string(),
      products: z.string(),
      career: z.string(),
      team: z.string(),
      shop: z.string(),
    }),
    footer: z.object({
      tagline: z.string(),
      desc: z.string(),
      locations: z.string(),
      hq: z.string(),
      legal: z.string(),
      imprint: z.string(),
      privacy: z.string(),
      terms: z.string(),
      bottom: z.string(),
    }),
    company: z.object({
      name: z.string(),
      street: z.string(),
      city: z.string(),
      register: z.string(),
      hrb: z.string(),
      uid: z.string(),
      iban: z.string(),
      bic: z.string(),
      tel: z.string(),
      email: z.string(),
    }),
    // Dankeseite (Formular-Redirect) — nur DE-Entry nötig, beide Formulare
    // redirecten auf /danke/
    danke: z
      .object({
        title: z.string(),
        heading: z.string(),
        text: z.string(),
        backLabel: z.string(),
        small: z.string(),
      })
      .optional(),
  }),
});

export const collections = { products, team, site, career, shopinfo, legal, settings };

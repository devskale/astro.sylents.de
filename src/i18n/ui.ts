export const languages = {
  de: 'Deutsch',
  en: 'English',
} as const;

export const ui = {
  de: {
    // nav
    'nav.home': 'Home',
    'nav.products': 'Produkte',
    'nav.career': 'Karriere',
    'nav.team': 'Team',
    'nav.shop': 'Shop',
    // footer
    'footer.tagline': 'by VERVE Water Mobility GmbH',
    'footer.desc': 'Elektrische Jetantriebe für Freizeitboote – leise, emissionsfrei, blockierungsfrei.',
    'footer.locations': 'Standorte',
    'footer.hq': 'Firmensitz',
    'footer.legal': 'Rechtliches',
    'footer.imprint': 'Impressum',
    'footer.privacy': 'Datenschutz',
    'footer.terms': 'AGB',
    // common
    'cta.request': 'Anfrage senden',
    'meta.sitelang': 'Sprache',
  },
  en: {
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.career': 'Career',
    'nav.team': 'Team',
    'nav.shop': 'Shop',
    'footer.tagline': 'by VERVE Water Mobility GmbH',
    'footer.desc': 'Electric jet drives for leisure boats – silent, emission-free, blockage-free.',
    'footer.locations': 'Locations',
    'footer.hq': 'Headquarters',
    'footer.legal': 'Legal',
    'footer.imprint': 'Imprint',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'cta.request': 'Request info',
    'meta.sitelang': 'Language',
  },
} as const;

export type Lang = keyof typeof ui;

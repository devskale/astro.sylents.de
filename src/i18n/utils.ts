import { ui, type Lang } from './ui';

export type TranslationKey = keyof typeof ui['de'];

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return 'de';
}

export function useTranslations(lang: Lang) {
  return function t(key: TranslationKey): string {
    return ui[lang][key] ?? ui['de'][key] ?? key;
  };
}

// Map DE slugs <-> EN slugs for the language switch
const slugMap: Record<string, string> = {
  'produktseite': 'products',
  'karriere': 'career',
  'team': 'team',
  'impressum': 'imprint',
  'datenschutz': 'privacy',
  'agb': 'terms',
};
const slugMapReverse: Record<string, string> = Object.fromEntries(
  Object.entries(slugMap).map(([de, en]) => [en, de])
);

export function altLangPath(url: URL): { lang: Lang; path: string } {
  const lang = getLangFromUrl(url);
  const pathname = url.pathname.replace(/\/$/, '');
  if (lang === 'de') {
    // de -> en: prefix /en and translate first segment if needed
    const seg = pathname.split('/')[1] || '';
    const enSeg = slugMap[seg] ?? seg;
    const rest = pathname.split('/').slice(2).join('/');
    const enPath = '/en' + (enSeg ? '/' + enSeg : '') + (rest ? '/' + rest : '');
    return { lang: 'en', path: enPath + '/' };
  }
  // en -> de: strip /en and translate first segment back
  const seg = pathname.split('/')[2] || '';
  const deSeg = slugMapReverse[seg] ?? seg;
  const rest = pathname.split('/').slice(3).join('/');
  const dePath = (deSeg ? '/' + deSeg : '') + (rest ? '/' + rest : '');
  return { lang: 'de', path: (dePath || '/') + (dePath.endsWith('/') ? '' : '/') };
}

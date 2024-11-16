import { Locale } from '@/src/i18n/config';
import { cookies } from 'next/headers';

const dictionaries = {
  ['en']: () => import('@/locales/en.json').then(module => module.default),
  ['de']: () => import('@/locales/de.json').then(module => module.default),
  ['fr']: () => import('@/locales/fr.json').then(module => module.default),
  ['it']: () => import('@/locales/it.json').then(module => module.default),
};

export const getDictionary = async (locale?: Locale) => {
  const header = (await cookies()).get('NEXT_LOCALE');
  const lang = header?.value ?? locale ?? 'en';
  return await dictionaries[lang as Locale]();
};

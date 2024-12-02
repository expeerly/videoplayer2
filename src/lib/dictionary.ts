import { Locale } from '@/src/i18n/config';
import { createTranslator } from 'next-intl';
import { cookies } from 'next/headers';

const dictionaries = {
  ['en']: () => import('@/locales/en.json').then(module => module.default),
  ['de']: () => import('@/locales/de.json').then(module => module.default),
  ['fr']: () => import('@/locales/fr.json').then(module => module.default),
  ['it']: () => import('@/locales/it.json').then(module => module.default),
};

type TranslationParams = {
  [key: string]: string | number;
};

export const getDictionary = async (locale?: Locale) => {
  const header = (await cookies()).get('NEXT_LOCALE');
  const lang = (header?.value ?? locale ?? 'en') as Locale;
  const messages = await dictionaries[lang]();

  // Create a translator instance
  const t = createTranslator({ locale: lang, messages });

  // Function to handle dynamic translations
  const translateWithParams = (key: string, params?: TranslationParams) => {
    try {
      return t(key, params);
    } catch (error) {
      console.error(`Translation error for key "${key}":`, error);
      return key; // Fallback to key if translation fails
    }
  };

  return {
    messages,
    t: translateWithParams,
  };
};

export type SupportedLanguage = 'en' | 'de' | 'fr' | 'it';

export function getLanguageFromRequest(request: Request): SupportedLanguage {
  const lang = request.headers.get('lang');
  if (lang && ['en', 'de', 'fr', 'it'].includes(lang)) {
    return lang as SupportedLanguage;
  }
  return 'en';
}

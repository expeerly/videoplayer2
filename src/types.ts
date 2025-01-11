export type LanguageCode = 'de' | 'en' | 'fr' | 'it';

type LanguageContent = {
  bodyText: string;
  siteTitle: string;
  footerText: string;
  metaDescription: string;
};

// Type for supported language codes

export type LandingPageData = {
  [Key in LanguageCode]: LanguageContent;
};

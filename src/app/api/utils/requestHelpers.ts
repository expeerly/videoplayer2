export type SupportedLanguage = 'en' | 'de' | 'fr' | 'it';

export function getLanguageFromRequest(request: Request): SupportedLanguage {
  const lang = request.headers.get('lang');
  if (lang && ['en', 'de', 'fr', 'it'].includes(lang)) {
    return lang as SupportedLanguage;
  }
  return 'en';
}

export type PaginationParams = {
  page: number;
  limit: number;
  videoCount?: number;
  random?: boolean;
};

export function getPaginationParams(request: Request): PaginationParams {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '4');
  const videoCount = parseInt(searchParams.get('videoCount') || '9');
  const random = searchParams.get('random') === 'true';
  return { page, limit, videoCount, random };
}

export type FilterParams = {
  categories: number[];
  brands: string[];
};

export function getFilterOptions(request: Request): FilterParams {
  const { searchParams } = new URL(request.url);
  const categories = searchParams.get('category') || '';
  const brands = searchParams.get('brand') || '';

  return {
    categories: categories.split(',').filter(Boolean).map(Number),
    brands: brands.split(',').filter(Boolean),
  };
}

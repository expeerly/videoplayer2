/** Supported languages for content localization */
export type SupportedLanguage = 'en' | 'de' | 'fr' | 'it';

/**
 * Extracts the language parameter from the request headers
 * @param {Request} request - The incoming HTTP request
 * @returns {SupportedLanguage} The language code from the request, defaults to 'en'
 */
export function getLanguageFromRequest(request: Request): SupportedLanguage {
  const lang = request.headers.get('lang');
  if (lang && ['en', 'de', 'fr', 'it'].includes(lang)) {
    return lang as SupportedLanguage;
  }
  return 'en';
}

/**
 * Interface for pagination parameters
 */
export interface PaginationParams {
  /** Current page number */
  page: number;
  /** Number of items per page */
  limit: number;
  /** Number of videos to include */
  videoCount?: number;
  /** Whether to randomize results */
  random?: boolean;
}

/**
 * Extracts pagination parameters from the request URL
 * @param {Request} request - The incoming HTTP request
 * @returns {PaginationParams} Pagination parameters with defaults
 */
export function getPaginationParams(request: Request): PaginationParams {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '4');
  const videoCount = parseInt(searchParams.get('videoCount') || '9');
  const random = searchParams.get('random') === 'true';
  return { page, limit, videoCount, random };
}

/**
 * Interface for filter parameters
 */
export interface FilterParams {
  /** Category IDs to filter by */
  categories?: number[];
  /** Brand IDs to filter by */
  brands?: string[];
}

/**
 * Extracts filter parameters from the request URL
 * @param {Request} request - The incoming HTTP request
 * @returns {FilterParams} Filter parameters
 */
export function getFilterOptions(request: Request): FilterParams {
  const { searchParams } = new URL(request.url);
  const categories = searchParams.get('category') || '';
  const brands = searchParams.get('brand') || '';

  return {
    categories: categories.split(',').filter(Boolean).map(Number),
    brands: brands.split(',').filter(Boolean),
  };
}

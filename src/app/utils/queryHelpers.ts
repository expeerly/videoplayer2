import { AllCategoriesData, AllBrandssData } from '@/src/db/types';

type QueryInput = string | string[] | undefined;

/**
 * Normalizes query input to array of strings
 * @param {QueryInput} query - Query input that can be string, array, or undefined
 * @returns {string[]} Normalized array of strings
 */
function normalizeQueryInput(query: QueryInput): string[] {
  if (!query) return [];

  // If it's already an array, filter out empty strings
  if (Array.isArray(query)) {
    return query.filter(Boolean);
  }

  // If it's a string, split by comma and filter empty strings
  return query
    .split(',')
    .map(id => id.trim())
    .filter(Boolean);
}

/**
 * Find matching category IDs by checking all language translations
 * @param {string[]} querySlugs - Array of query slugs to match
 * @param {AllCategoriesData[]} categories - Array of translated categories
 * @returns {string} Comma-separated string of matching category IDs
 */
function findCategoryIds(querySlugs: string[], categories: AllCategoriesData[]): string {
  if (!querySlugs.length || !categories?.length) return '';

  const matchingIds = categories
    .filter(category => {
      // Check if any language version's urlSlug matches any of the query slugs
      return Object.values(category.categoryData).some(langData =>
        querySlugs.includes(langData.urlSlug)
      );
    })
    .map(category => category.id);

  return matchingIds.join(',');
}

/**
 * Find matching brand IDs from brand slugs
 * @param {QueryInput} brandQuery - Brand query (string or array)
 * @param {AllBrandssData} brands - Array of brands
 * @returns {string} Comma-separated string of matching brand IDs
 */
function findBrandIds(brandQuery: QueryInput, brands: AllBrandssData): string {
  if (!brandQuery || !brands?.length) return '';

  // If brandQuery is a string, find single match
  if (!Array.isArray(brandQuery) && typeof brandQuery === 'string') {
    const brand = brands.find(b => b.slug === brandQuery);
    return brand?.id || '';
  }

  // If brandQuery is an array, filter matching brands
  const slugs = normalizeQueryInput(brandQuery);
  const matchingIds = brands.filter(brand => slugs.includes(brand.slug)).map(brand => brand.id);

  return matchingIds.join(',');
}

export function getQueryIds(
  categoryQuery: QueryInput,
  brandQuery: QueryInput,
  allCategories?: AllCategoriesData[],
  allBrands?: AllBrandssData
): { category: string; brand: string } {
  return {
    category: findCategoryIds(normalizeQueryInput(categoryQuery), allCategories || []),
    brand: findBrandIds(brandQuery, allBrands || []),
  };
}

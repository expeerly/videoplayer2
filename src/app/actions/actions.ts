'use server';

import {
  BrandData,
  CategoryData,
  AllCategoriesData,
  LandingPageText,
  Languages,
  AllBrandssData,
  Grid,
} from '@/src/db/types';

import { headers } from 'next/headers';

async function createApiUrl(path: string, queryParams?: Record<string, string | number | boolean>) {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') || 'http';

  const url = new URL(`${protocol}://${host}/api${path}`);

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
}

async function apiRequest<T>(
  path: string,
  options: {
    lang: Languages;
    queryParams?: Record<string, string | number | boolean>;
  }
): Promise<{ data: T; error?: string }> {
  try {
    const url = await createApiUrl(path, options.queryParams);
    console.log('Fetching:', url);

    const response = await fetch(url, {
      headers: {
        lang: options.lang,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    return {
      data: {} as T,
      error: error instanceof Error ? error.message : 'Failed to fetch data',
    };
  }
}

export async function getBrands(
  lang: Languages,
  limit: number = 20,
  random: boolean = false
): Promise<{
  data: BrandData;
  error?: string;
}> {
  return apiRequest<BrandData>('/brand', {
    lang,
    queryParams: { limit, random },
  });
}

export async function getCategories(lang: Languages): Promise<{
  data: CategoryData[];
  error?: string;
}> {
  return apiRequest<CategoryData[]>('/category', { lang });
}

export async function getAllBrands(lang: Languages): Promise<{
  data: AllBrandssData;
  error?: string;
}> {
  return apiRequest<AllBrandssData>('/brand/all', { lang });
}

export async function getAllCategories(lang: Languages): Promise<{
  data: AllCategoriesData[];
  error?: string;
}> {
  return apiRequest<AllCategoriesData[]>('/category/all', { lang });
}

export async function getLandingPageText(
  lang: Languages,
  type: 'Brand' | 'Category' | 'Creator'
): Promise<{
  data: { content: LandingPageText; id: number };
  error?: string;
}> {
  return apiRequest<{ content: LandingPageText; id: number }>('/landingPage', {
    lang,
    queryParams: { type },
  });
}

export async function getGridVideos(
  lang: Languages,
  gridType: 'category' | 'brand' | 'creator',
  page: number = 1,
  limit: number = 4,
  videoCount: number = 9,
  random: boolean = false,
  filter?: {
    category: string;
    brand: string;
  }
): Promise<{
  data: Grid;
  error?: string;
}> {
  return apiRequest<Grid>(`/${gridType}/videos`, {
    lang,
    queryParams: {
      page,
      limit,
      videoCount,
      random,
      ...(filter?.category && { category: filter.category }),
      ...(filter?.brand && { brand: filter.brand }),
    },
  });
}

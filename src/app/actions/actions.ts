//Comment 

'use server';

import {
  BrandData,
  CategoryData,
  AllCategoriesData,
  LandingPageText,
  Languages,
  AllBrandssData,
  Grid,
  ProfileResponse,
  PageInfo,
  Brand,
  VideoResponse,
  VideoDetail,
  GridData,
} from '@/src/db/types';

async function createApiUrl(path: string, queryParams?: Record<string, string | number | boolean>) {
  // const headersList = await headers();
  // const host = headersList.get('host');
  // const protocol = headersList.get('x-forwarded-proto') || 'http';

  const url = new URL(`${process.env.NEXT_ENDPOINT_URL}${path}`);
  // const url = new URL(`${protocol}://${host}/api${path}`);
  // const url = new URL(`http://192.168.100.54:3000/api${path}`);

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
    revalidate?: number;
  }
): Promise<{ data: T; error?: string }> {
  try {
    const url = await createApiUrl(path, options.queryParams);
    console.info('Fetching:', url);

    const fetchOptions: RequestInit & { next?: { revalidate?: number } } = {
      headers: {
        lang: options.lang,
      },
    };

    // Only set cache options if revalidate is not 0
    if (options.revalidate !== 0) {
      fetchOptions.next = { revalidate: 3600 };
      fetchOptions.cache = 'force-cache';
    } else {
      fetchOptions.cache = 'no-store';
    }

    const response = await fetch(url, fetchOptions);
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
  random: boolean = false,
  filter?: {
    category?: string;
    brand?: string;
  }
): Promise<{
  data: BrandData;
  error?: string;
}> {
  return apiRequest<BrandData>('/brand', {
    lang,
    queryParams: {
      limit,
      random,
      ...(filter?.category && { category: filter.category }),
      ...(filter?.brand && { brand: filter.brand }),
    },
    revalidate: random ? 0 : 300,
  });
}

export async function getCategories(
  lang: Languages,
  filter?: {
    category?: string;
    brand?: string;
  }
): Promise<{
  data: CategoryData[];
  error?: string;
}> {
  return apiRequest<CategoryData[]>('/category', {
    lang,
    queryParams: {
      ...(filter?.category && { category: filter.category }),
      ...(filter?.brand && { brand: filter.brand }),
    },
  });
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

export async function getGridVideos({
  lang,
  gridType,
  page = 1,
  limit = 4,
  videoCount = 9,
  random = false,
  filter = {
    category: '',
    brand: '',
  },
}: {
  lang: Languages;
  gridType: 'category' | 'brand' | 'creator';
  page?: number;
  limit?: number;
  videoCount?: number;
  random?: boolean;
  filter?: {
    category: string;
    brand: string;
  };
}): Promise<{
  data: Grid;
  error?: string;
}> {
  return apiRequest<Grid>(`/${gridType}/videos`, {
    lang: lang,
    queryParams: {
      page: page,
      limit: limit,
      videoCount: videoCount,
      random: random,
      ...(filter?.category && { category: filter.category }),
      ...(filter?.brand && { brand: filter.brand }),
    },
    revalidate: random ? 0 : 300,
  });
}

export async function getPageInfo(
  lang: Languages,
  pageType: 'category' | 'brand',
  slug: string
): Promise<{
  data: PageInfo;
  error?: string;
}> {
  return apiRequest<PageInfo>(`/${pageType}/pageInfo/?slug=${encodeURIComponent(slug)}`, {
    lang,
  });
}

export async function getProfile<T extends 'category' | 'brand' | 'creator'>({
  lang,
  gridType,
  id,
  page = 1,
  limit = 4,
  category,
}: {
  lang: Languages;
  gridType: T;
  id: number | string;
  page?: number;
  limit?: number;
  category?: string;
}): Promise<{
  data: T extends 'creator' ? ProfileResponse : Grid;
  error?: string;
}> {
  return apiRequest<T extends 'creator' ? ProfileResponse : Grid>(
    `/${gridType}/${id}${category ? '/?category=' + category : ''}`,
    {
      lang,
      queryParams: {
        page,
        limit,
      },
    }
  );
}

export async function getCounts(): Promise<{
  data: { [key: string]: number };
  error?: string;
}> {
  return apiRequest<{ [key: string]: number }>(`/counts`, { lang: 'en', revalidate: undefined });
}

export async function getLogos(): Promise<{
  data: Partial<Brand>[];
  error?: string;
}> {
  return apiRequest<Partial<Brand>[]>(`/brand/logos`, { lang: 'en', revalidate: undefined });
}

export async function getVideo<T extends boolean = false>({
  videoId,
  lang,
  filters,
  metaInfo = false as T,
}: {
  videoId: string;
  lang: Languages;
  filters?: {
    brandSlug?: string;
    productSlug?: string;
    categorySlug?: string;
  };
  metaInfo?: T;
}): Promise<{
  data: T extends true ? VideoDetail : VideoResponse;
  error?: string;
}> {
  const filtersString = filters
    ? Object.entries(filters)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
    : '';
  return apiRequest<T extends true ? VideoDetail : VideoResponse>(
    `/video/${videoId}?metaInfo=${metaInfo}&${filtersString}`,
    { lang }
  );
}

export async function getRelatedVideos({
  videoId,
  lang,
}: {
  videoId: string;
  lang: Languages;
}): Promise<{
  data: GridData;
  error?: string;
}> {
  return apiRequest<GridData>(`/video/${videoId}/related`, { lang });
}

export async function getAllVideos(lang: Languages): Promise<{
  data: VideoResponse[];
  error?: string;
}> {
  return apiRequest<VideoResponse[]>(`/video/all`, { lang });
}

export async function getAllCreatorsSlug(): Promise<{
  data: {
    id: string;
    slug: string;
  }[];
  error?: string;
}> {
  return apiRequest<{ id: string; slug: string }[]>(`/creator/all`, { lang: 'en' });
}

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

export async function getBrands(
  lang: Languages,
  limit: number = 20,
  random: boolean = false
): Promise<{
  data: BrandData;
  error?: string;
}> {
  try {
    const response = await fetch(
      `${process.env.NEXT_ENDPOINT_URL}/brand?random=${random}&limit=${limit}`,
      {
        headers: {
          lang,
        },
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
    return {
      data: { rows: [] },
      error: 'Failed to fetch brands',
    };
  }
}

export async function getCategories(lang: Languages): Promise<{
  data: CategoryData[];
  error?: string;
}> {
  try {
    const response = await fetch(`${process.env.NEXT_ENDPOINT_URL}/category`, {
      headers: {
        lang,
      },
    });
    return response.json();
  } catch (error) {
    console.log(error);

    return {
      data: [],
      error: 'Failed to fetch categories',
    };
  }
}

export async function getAllBrands(lang: Languages): Promise<{
  data: AllBrandssData;
  error?: string;
}> {
  try {
    const response = await fetch(`${process.env.NEXT_ENDPOINT_URL}/brand/all`, {
      headers: {
        lang,
      },
    });

    return response.json();
  } catch (error) {
    console.log(error);

    return {
      data: [],
      error: 'Failed to fetch brands',
    };
  }
}

export async function getAllCategories(lang: Languages): Promise<{
  data: AllCategoriesData[];
  error?: string;
}> {
  try {
    const response = await fetch(`${process.env.NEXT_ENDPOINT_URL}/category/all`, {
      headers: {
        lang,
      },
    });
    return response.json();
  } catch (error) {
    console.log(error);

    return {
      data: [],
      error: 'Failed to fetch categories',
    };
  }
}

export const getLandingPageText = async (
  lang: Languages,
  type: 'Brand' | 'Category' | 'Creator'
): Promise<{
  data: { content: LandingPageText; id: number };
  error?: string;
}> => {
  try {
    const response = await fetch(`${process.env.NEXT_ENDPOINT_URL}/landingPage/?type=${type}`, {
      headers: {
        lang,
      },
    });
    return response.json();
  } catch (error) {
    console.log(error);

    return {
      data: { content: {}, id: -1 },
      error: 'Failed to fetch landing page text',
    };
  }
};

export const getGridVideos = async (
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
}> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_ENDPOINT_URL}/${gridType}/videos/?page=${page}&limit=${limit}&videoCount=${videoCount}&random=${random}&category=${filter?.category ?? ''}&brand=${filter?.brand ?? ''}`,
      {
        headers: {
          lang,
        },
      }
    );
    return response.json();
  } catch (error) {
    console.log({ error });
    return {
      data: { rows: [], total: 0 },
      error: 'Failed to fetch categories video',
    };
  }
};

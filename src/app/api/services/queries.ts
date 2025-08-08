import { db } from '@/src/db';
import { brand, category, product, video } from '@/src/db/schema';
import { and, eq, exists, inArray, isNotNull, sql } from 'drizzle-orm';
import { FilterParams } from '../utils/requestHelpers';

// Brand queries
export const hasBrandLogo = isNotNull(brand.logo);
export const hasBrandName = isNotNull(brand.brandName);
export const hasBrandVideos = exists(
  db
    .select({ one: sql`1` })
    .from(video)
    .innerJoin(product, eq(video.productId, product.id))
    .where(and(eq(product.brandId, brand.id), eq(video.published, true)))
);

export const isValidBrand = and(hasBrandLogo, hasBrandName, hasBrandVideos);

// Category queries
export const hasCategoryVideos = exists(
  db
    .select({ one: sql`1` })
    .from(video)
    .innerJoin(product, eq(video.productId, product.id))
    .where(and(eq(product.categoryId, category.id), eq(video.published, true)))
);

// Common queries
export const getFilters = ({ categories, brands }: FilterParams) => {
  const categoryFilter = categories?.length ? inArray(product.categoryId, categories) : undefined;
  const brandFilter = brands?.length ? inArray(product.brandId, brands) : undefined;

  return { categoryFilter, brandFilter };
};

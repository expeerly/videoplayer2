import { db } from '@/src/db';
import { brand, product, video } from '@/src/db/schema';
import { and, eq, exists, isNotNull, sql } from 'drizzle-orm';

// Brand queries
export const hasBrandLogo = isNotNull(brand.logo);
export const hasBrandName = isNotNull(brand.brandName);
export const hasBrandVideos = exists(
  db
    .select({ one: sql`1` })
    .from(video)
    .innerJoin(product, eq(video.productId, product.id))
    .where(eq(product.brandId, brand.id))
);

export const isValidBrand = and(hasBrandLogo, hasBrandName, hasBrandVideos);

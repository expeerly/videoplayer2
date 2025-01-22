import { db } from '@/src/db';
import { brand, product, video } from '@/src/db/schema';
import { and, exists, isNotNull, sql } from 'drizzle-orm';

// Brand queries
export const hasBrandLogo = isNotNull(brand.logo);
export const hasBrandName = isNotNull(brand.brandName);
export const hasBrandVideos = exists(
  db
    .select({ one: sql`1` })
    .from(video)
    .where(
      sql`${video.productId} IN (SELECT id FROM ${product} WHERE ${product.brandId} = ${brand.id})`
    )
);

export const isValidBrand = and(hasBrandLogo, hasBrandName, hasBrandVideos);

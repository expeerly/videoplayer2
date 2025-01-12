import { db } from '@/src/db';
import { brand, category, product, video, rating } from '@/src/db/schema';
import { eq, exists, sql, and, inArray } from 'drizzle-orm';
import { Category, CategoryInputType } from '@/src/db/types';
import { FilterParams, PaginationParams, SupportedLanguage } from '../utils/requestHelpers';

/**
 * Creates or updates category data
 * @param input - Category data to be inserted or updated
 */

export async function handleCreateCategory(input: CategoryInputType[]): Promise<Category[]> {
  if (!input || input.length === 0) {
    throw new Error('Input is required and cannot be empty');
  }

  try {
    return await db
      .insert(category)
      .values(input)
      .onConflictDoUpdate({
        target: [category.id],
        set: {
          logo: sql`EXCLUDED."logo"`,
          categoryData: sql`EXCLUDED."categoryData"`,
          updatedAt: sql`CURRENT_TIMESTAMP`,
        },
      })
      .returning();
  } catch (error) {
    console.error('Error creating/updating category:', error);
    throw new Error((error as Error).message);
  }
}

export async function getCategoriesForSlider(
  lang: SupportedLanguage
): Promise<Partial<Category>[]> {
  try {
    return await db
      .select({
        id: category.id,
        logo: category.logo,
        categoryName: sql<string>`("categoryData" -> ${lang} ->> 'categoryName')`.as(
          'categoryName'
        ),
        urlSlug: sql<string>`("categoryData" -> ${lang} ->> 'urlSlug')`.as('urlSlug'),
      })
      .from(category)
      .limit(20);
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error((error as Error).message);
  }
}

export async function getAllCategories(): Promise<Partial<Category>[]> {
  try {
    return await db
      .select({
        id: category.id,
        logo: category.logo,
        categoryData: sql<string>`jsonb_build_object(
          'de', jsonb_build_object(
            'urlSlug', "categoryData"->'de'->>'urlSlug',
            'categoryName', "categoryData"->'de'->>'categoryName'
          ),
          'en', jsonb_build_object(
            'urlSlug', "categoryData"->'en'->>'urlSlug',
            'categoryName', "categoryData"->'en'->>'categoryName'
          ),
          'fr', jsonb_build_object(
            'urlSlug', "categoryData"->'fr'->>'urlSlug',
            'categoryName', "categoryData"->'fr'->>'categoryName'
          ),
          'it', jsonb_build_object(
            'urlSlug', "categoryData"->'it'->>'urlSlug',
            'categoryName', "categoryData"->'it'->>'categoryName'
          )
        )`,
      })
      .from(category)
      .orderBy(sql<string>`("categoryData" -> 'en' ->> 'categoryName')`);
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error((error as Error).message);
  }
}

export async function getCategoryCount(): Promise<{ count: number }> {
  try {
    const count = await db.$count(category);
    return { count };
  } catch (error) {
    console.error('Error fetching category count:', error);
    throw new Error((error as Error).message);
  }
}

export async function handleGetCategoryWithVideos(
  { page, limit, videoCount, random }: PaginationParams,
  lang: SupportedLanguage,
  { categories, brands }: FilterParams
) {
  try {
    console.log({
      categories,
      brands,
      lang,
      page,
      limit,
      videoCount,
      random,
    });
    const offset = (page - 1) * limit;
    const [categoriesResult, categoryCount] = await Promise.all([
      await db
        .select({
          id: category.id,
          logo: category.logo,
          name: sql<string>`("categoryData" -> ${lang} ->> 'categoryName')`.as('categoryName'),
          slug: sql<string>`("categoryData" -> ${lang} ->> 'urlSlug')`.as('urlSlug'),
          info: {
            reviewsCount: sql<number>`(
            SELECT COUNT(*)
            FROM ${video}
            JOIN ${product} ON ${video.productId} = ${product.id}
            WHERE ${product.categoryId} = ${category.id}
          )`.as('reviewsCount'),
          },
          videos: sql<string>`(
            SELECT json_agg(video_data)
            FROM (
              SELECT json_build_object(
                'id', ${video.id},
                'playbackId', ${video.playbackId},
                'videoUrl', ${video.videoUrl},
                'resolution', ${video.resolution},
                'productName', ${product.productName},
                'brandId', ${product.brandId},
                'brandName', ${brand.brandName},
                'brandLogo', ${brand.logo},
                'brandSlug', ${brand.slug},
                'rating', ${rating.rating}
              ) as video_data
              FROM ${video}
              JOIN ${product} ON ${video.productId} = ${product.id}
              JOIN ${brand} ON ${product.brandId} = ${brand.id}
              LEFT JOIN ${rating} ON ${video.productId} = ${rating.productId} AND ${video.creatorId} = ${rating.creatorId}
              WHERE ${product.categoryId} = ${category.id}
              ${brands.length > 0 ? sql`AND ${product.brandId} IN (${sql.join(brands)})` : sql``}
              LIMIT ${videoCount}
            ) subq
          )`,
        })
        .from(category)
        .leftJoin(product, eq(category.id, product.categoryId))
        .where(
          and(
            exists(db.select().from(video).where(eq(video.productId, product.id))),
            categories.length > 0 ? inArray(category.id, categories) : sql`TRUE`
          )
        )
        .groupBy(category.id, category.logo)
        .limit(limit)
        .offset(offset)
        .orderBy(
          random ? sql`RANDOM()` : sql<string>`("categoryData" -> ${lang} ->> 'categoryName')`
        ),
      getCategoryCount(),
    ]);
    return {
      rows: categoriesResult,
      total: categoryCount.count,
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error((error as Error).message);
  }
}

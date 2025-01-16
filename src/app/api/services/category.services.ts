import { db } from '@/src/db';
import { brand, category, product, video, rating } from '@/src/db/schema';
import { eq, exists, sql, and, inArray } from 'drizzle-orm';
import { Category, CategoryInputType } from '@/src/db/types';
import { FilterParams, PaginationParams, SupportedLanguage } from '../utils/requestHelpers';

/**
 * Creates or updates multiple categories
 * @param {CategoryInputType[]} input - Array of category data
 * @returns {Promise<Category[]>} Array of created/updated categories
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

/**
 * Retrieves categories for the slider
 * @param {SupportedLanguage} lang - Language code for content localization
 * @returns {Promise<Partial<Category>[]>} Array of categories for the slider
 */
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

/**
 * Retrieves all categories
 * @returns {Promise<Partial<Category>[]>} Array of categories
 */
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

/**
 * Retrieves the total count of categories
 * @returns {Promise<{ count: number }>} Object containing the total count
 */
export async function getCategoryCount(): Promise<{ count: number }> {
  try {
    const count = await db.$count(category);
    return { count };
  } catch (error) {
    console.error('Error fetching category count:', error);
    throw new Error((error as Error).message);
  }
}

/**
 * Retrieves categories with their associated videos based on pagination and filter parameters
 * @param {PaginationParams} params - Pagination parameters
 * @param {SupportedLanguage} lang - Language code for content localization
 * @param {FilterParams} filters - Filter parameters for categories and brands
 * @returns {Promise<{ rows: Partial<Category>[], total: number }>} Paginated categories with total count
 */
export async function handleGetCategoryWithVideos(
  { page, limit, videoCount, random }: PaginationParams,
  lang: SupportedLanguage,
  { categories, brands }: FilterParams
) {
  try {
    console.log({ page, limit, videoCount, random, lang, categories, brands });
    const offset = (page - 1) * limit;

    // Create filter conditions
    const categoryFilter = categories?.length ? inArray(category.id, categories) : undefined;

    const brandFilter = brands?.length ? inArray(product.brandId, brands) : undefined;

    // Build where conditions
    const whereConditions = [
      exists(
        db
          .select()
          .from(video)
          .innerJoin(product, eq(video.productId, product.id))
          .where(
            and(
              eq(video.productId, product.id),
              eq(product.categoryId, category.id),
              ...(brandFilter ? [brandFilter] : [])
            )
          )
      ),
      ...(categoryFilter ? [categoryFilter] : []),
    ];

    const [categoriesResult, totalCount] = await Promise.all([
      db
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
              ${brandFilter ? sql`AND ${brandFilter}` : sql``}
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
                'productName', COALESCE(${product.productName}->${lang}->>'title', ${product.productName}->'en'->>'title'),
                'productSlug', COALESCE(${product.productSlug}->${lang}->>'title', ${product.productSlug}->'en'->>'title'),
                'categorySlug', ${category.categoryData}->${lang}->'urlSlug',
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
              WHERE ${video.productId} = ${product.id}
              ${brandFilter ? sql`AND ${brandFilter}` : sql``}
              GROUP BY ${product.productSlug}, ${rating.rating}, ${brand.slug}, ${brand.logo}, ${brand.brandName}, ${product.brandId}, ${product.productName}, ${video.id} LIMIT ${videoCount}
            ) subq
          )`,
        })
        .from(category)
        .leftJoin(product, eq(category.id, product.categoryId))
        .where(and(...whereConditions))
        .groupBy(category.id)
        .limit(limit)
        .offset(offset)
        .orderBy(
          random ? sql`RANDOM()` : sql<string>`("categoryData" -> ${lang} ->> 'categoryName')`
        ),

      db
        .select({
          count: sql<number>`COUNT(DISTINCT ${category.id})`,
        })
        .from(category)
        .leftJoin(product, eq(category.id, product.categoryId))
        .where(and(...whereConditions))
        .then(result => result[0].count),
    ]);

    return {
      rows: categoriesResult,
      total: totalCount,
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error((error as Error).message);
  }
}

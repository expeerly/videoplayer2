import { db } from '@/src/db';
import { category } from '@/src/db/schema';
import { sql } from 'drizzle-orm';
import { Category, CategoryInputType } from '@/src/db/types';
import { SupportedLanguage } from '../utils/requestHelpers';

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
  lang: SupportedLanguage = 'en'
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
      .from(category);
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

export async function handleGetCategoryWithVideoss(
  page: number = 1,
  limit: number = 4
  // lang: SupportedLanguage = 'en'
): Promise<{ rows: Partial<Category>[]; total: number }> {
  try {
    const offset = (page - 1) * limit;
    const [categories, categoryCount] = await Promise.all([
      db.query.category.findMany({
        with: {
          products: {
            with: {
              video: true,
              brand: true,
            },
          },
        },
        limit,
        offset,
      }),
      getCategoryCount(),
    ]);
    return {
      rows: categories,
      total: categoryCount.count,
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error((error as Error).message);
  }
}

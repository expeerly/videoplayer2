import { db } from '@/src/db';
import { category } from '@/src/db/schema';
import { sql } from 'drizzle-orm';
import { Category, CategoryInputType } from '@/src/db/types';

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

export async function getCategoriesForSlider(): Promise<Partial<Category>[]> {
  try {
    return await db
      .select({
        id: category.id,
        logo: category.logo,
        categoryData: category.categoryData,
      })
      .from(category);
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error((error as Error).message);
  }
}

/**
 * Gets all categories
 */
export async function getCategory(): Promise<Category[]> {
  try {
    const data = await db.query.category.findMany({});

    if (data) {
      return data;
    } else {
      console.warn('No categories found');
      return [];
    }
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

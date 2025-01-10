import { db } from '@/src/db';
import { landingPage } from '@/src/db/schema';
import { sql } from 'drizzle-orm';
import { LandingPage, LandingPageInputType } from '@/src/db/types';

/**
 * Creates or updates creator data
 * Used for CSV upload functionality
 *
 * @param input - Creator data to be inserted or updated
 * @returns Array of created/updated creators
 */
export async function handleCreateLandingPage(
  input: LandingPageInputType[]
): Promise<LandingPage[]> {
  if (!input || input.length === 0) {
    throw new Error('Input is required and cannot be empty');
  }

  try {
    const data = await db
      .insert(landingPage)
      .values(input)
      .onConflictDoUpdate({
        target: [landingPage.id],
        set: {
          brandsContent: sql`EXCLUDED."brandsContent"`,
          categoriesContent: sql`EXCLUDED."categoriesContent"`,
          creatorsContent: sql`EXCLUDED."creatorsContent"`,
          updatedAt: sql`CURRENT_TIMESTAMP`,
        },
      })
      .returning();

    if (data) {
      return data;
    } else {
      console.warn('No LandingPage content found');
      return [];
    }
  } catch (error) {
    console.error('Error in handleCreateLandingPage:', error);
    throw new Error((error as Error).message);
  }
}

export async function handleGetLandingPage(
  type?: 'Brand' | 'Category' | 'Creator'
): Promise<Partial<LandingPage> | undefined> {
  try {
    const result = await db.query.landingPage.findFirst({
      columns: {
        id: true,
        brandsContent: type === 'Brand' || !type,
        categoriesContent: type === 'Category' || !type,
        creatorsContent: type === 'Creator' || !type,
      },
    });
    return result;
  } catch (error) {
    console.error('Error fetching landing page:', error);
    throw error;
  }
}

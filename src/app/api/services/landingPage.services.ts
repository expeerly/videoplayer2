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

export async function handleGetLandingPage(): Promise<LandingPage | undefined> {
  try {
    const data = await db.query.landingPage.findFirst();
    return data;
  } catch (error) {
    console.error('Error in handleGetLandingPage:', error);
    throw new Error((error as Error).message);
  }
}

export async function getLandingPageCount(): Promise<{ count: number }> {
  try {
    const count = await db.$count(landingPage);
    return { count };
  } catch (error) {
    console.error('Error fetching landing page count:', error);
    throw new Error((error as Error).message);
  }
}

import { db } from '@/src/db';
import { landingPage } from '@/src/db/schema';
import { sql } from 'drizzle-orm';
import { LandingPage, LandingPageInputType } from '@/src/db/types';
import { SupportedLanguage } from '../utils/requestHelpers';

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

export const getLandingPage = async () => {
  try {
    const [result] = await db
      .select({
        id: landingPage.id,
      })
      .from(landingPage)
      .limit(1);

    return result;
  } catch (error) {
    console.error('Error fetching landing page ID:', error);
    throw error;
  }
};

export async function handleGetLandingPageWithLangAndType(
  lang: SupportedLanguage = 'en',
  type?: 'Brand' | 'Category' | 'Creator'
): Promise<Partial<LandingPage> | undefined> {
  try {
    let queryString;
    switch (type) {
      case 'Brand':
        queryString = sql<string>`("brandsContent" -> ${lang})`;
        break;
      case 'Category':
        queryString = sql<string>`("categoriesContent" -> ${lang})`;
        break;
      case 'Creator':
        queryString = sql<string>`("creatorsContent" -> ${lang})`;
        break;
      default:
        throw new Error('Invalid type parameter. Must be one of: Brand, Category, Creator');
    }

    const [result] = await db
      .select({
        id: landingPage.id,
        content: queryString.as('content'),
      })
      .from(landingPage)
      .limit(1);

    return result;
  } catch (error) {
    console.error('Error fetching landing page:', error);
    throw error;
  }
}

import { db } from '@/src/db';
import { headings } from '@/src/db/schema';
import { sql } from 'drizzle-orm';
import { Headings, HeadingsInputType } from '@/src/db/types';

/**
 * Creates or updates headings data
 * Used for CSV upload functionality
 *
 * @param input - Heading data to be inserted or updated
 * @returns Array of created/updated headings
 */
export async function handleCreateHeadings(input: HeadingsInputType[]): Promise<Headings[]> {
  if (!input || input.length === 0) {
    throw new Error('Input is required and cannot be empty');
  }

  try {
    const data = await db
      .insert(headings)
      .values(input)
      .onConflictDoUpdate({
        target: [headings.id],
        set: {
          updatedAt: sql`CURRENT_TIMESTAMP`,
        },
      })
      .returning();

    if (data) {
      return data;
    } else {
      console.warn('Headings not found');
      return [];
    }
  } catch (error) {
    console.error('Error in handleCreateHeadings:', error);
    throw new Error((error as Error).message);
  }
}

export async function handleGetHeadings(): Promise<Headings | undefined> {
  try {
    const data = await db.query.headings.findFirst();
    return data;
  } catch (error) {
    console.error('Error in handleGetHeadings:', error);
    throw new Error((error as Error).message);
  }
}

import { db } from '@/src/db';
import { creator } from '@/src/db/schema';
import { sql } from 'drizzle-orm';
import { Creator, CreatorInputType } from '@/src/db/types';

/**
 * Creates or updates creator data
 * Used for CSV upload functionality
 *
 * @param input - Creator data to be inserted or updated
 * @returns Array of created/updated creators
 */
export async function handleCreateCreator(input: CreatorInputType[]): Promise<Creator[]> {
  if (!input || input.length === 0) {
    throw new Error('Input is required and cannot be empty');
  }

  try {
    const data = await db
      .insert(creator)
      .values(input)
      .onConflictDoUpdate({
        target: [creator.id],
        set: {
          creatorName: sql`EXCLUDED."creatorName"`,
          updatedAt: sql`CURRENT_TIMESTAMP`,
        },
      })
      .returning();

    if (data) {
      return data;
    } else {
      console.warn('No creators found');
      return [];
    }
  } catch (error) {
    console.error('Error in handleCreateCreator:', error);
    throw new Error('Failed to create/update creator');
  }
}

export async function getCreatorsCount(): Promise<{ count: number }> {
  try {
    const count = await db.$count(creator);
    return { count };
  } catch (error) {
    console.error('Error fetching category count:', error);
    throw new Error('Failed to fetch category count');
  }
}

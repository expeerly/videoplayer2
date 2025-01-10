import { db } from '@/src/db';
import { brand } from '@/src/db/schema';
import { and, isNotNull, sql } from 'drizzle-orm';
import { Brand, BrandInputType } from '@/src/db/types';

export async function handleCreateBrand(input: BrandInputType[]): Promise<Brand[]> {
  if (!input || !Array.isArray(input)) {
    throw new Error('Input must be an array of brands');
  }

  try {
    const data = await db
      .insert(brand)
      .values(input)
      .onConflictDoUpdate({
        target: brand.slug,
        set: {
          brandName: sql`EXCLUDED."brandName"`,
          brandData: sql`EXCLUDED."brandData"`,
          logo: sql`EXCLUDED."logo"`,
          updatedAt: sql`CURRENT_TIMESTAMP`,
        },
      })
      .returning();

    if (data) {
      return data;
    } else {
      console.warn('No brands found');
      return [];
    }
  } catch (error) {
    console.error('Error creating/updating brands:', error);
    throw new Error((error as Error).message);
  }
}

/**
 * Gets all brands
 */
export async function handleGetBrand(selectedColumns: string[] = []): Promise<Brand[]> {
  try {
    const columns: { [key: string]: boolean } = {};
    if (selectedColumns.length > 0) {
      selectedColumns.forEach(column => {
        columns[column] = true;
      });
    }
    const data = await db.query.brand.findMany({
      ...(selectedColumns.length > 0 && {
        columns,
        where: and(isNotNull(brand.brandName), isNotNull(brand.logo)),
      }),
    });

    if (!data || data.length === 0) {
      console.warn('No brands found');
      return [];
    }

    return data;
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw new Error('Failed to fetch brands');
  }
}

export async function getBrandsCount(): Promise<{ count: number }> {
  try {
    const count = await db.$count(brand);
    return { count };
  } catch (error) {
    console.error('Error fetching category count:', error);
    throw new Error((error as Error).message);
  }
}

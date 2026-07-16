import { NextRequest, NextResponse } from 'next/server';
import { getBrandsByCategoryIdWithVideos } from '../../services/category.services';
import { handleError } from '../../utils/errorHandler';
import { getLanguageFromRequest, getPaginationParams } from '../../utils/requestHelpers';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ categoryId: string }> }
) {
  const { categoryId } = await params;
  const lang = getLanguageFromRequest(request);
  const pagination = getPaginationParams(request);

  try {
    const categoryBrands = await getBrandsByCategoryIdWithVideos(categoryId, lang, pagination);

    // Parse videos JSON strings to arrays
    const processedData = {
      ...categoryBrands,
      rows: categoryBrands.rows.map((row: Record<string, unknown>) => ({
        ...row,
        videos: row.videos ? JSON.parse(row.videos as string) : [],
      })),
    };

    return NextResponse.json(
      {
        success: true,
        data: processedData,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}

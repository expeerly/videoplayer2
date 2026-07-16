import { NextRequest, NextResponse } from 'next/server';
import { getBrandProductsWithVideos } from '../../services/brand.services';
import { handleError } from '../../utils/errorHandler';
import { getLanguageFromRequest, getPaginationParams } from '../../utils/requestHelpers';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ brandId: string }> }
) {
  const { brandId } = await params;
  const lang = getLanguageFromRequest(request);
  const pagination = getPaginationParams(request);

  try {
    const brandProducts = await getBrandProductsWithVideos(brandId, lang, pagination);

    // Parse videos JSON strings to arrays
    const processedData = {
      ...brandProducts,
      rows: brandProducts.rows.map((row: Record<string, unknown>) => ({
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

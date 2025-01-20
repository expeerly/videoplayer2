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

    return NextResponse.json(
      {
        success: true,
        data: brandProducts,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}

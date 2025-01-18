import { NextRequest, NextResponse } from 'next/server';
import { getBrandsByCategoryIdWithVideos } from '../../services/category.services';
import { handleError } from '../../utils/errorHandler';
import { getLanguageFromRequest, getPaginationParams } from '../../utils/requestHelpers';

export async function GET(request: NextRequest, { params }: { params: { categoryId: string } }) {
  const { categoryId } = await params;
  const lang = getLanguageFromRequest(request);
  const pagination = getPaginationParams(request);

  try {
    const categoryBrands = await getBrandsByCategoryIdWithVideos(categoryId, lang, pagination);

    return NextResponse.json(
      {
        success: true,
        data: categoryBrands,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}

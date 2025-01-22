import { NextResponse } from 'next/server';
import { getBrandInfoWithSlug } from '../../services/brand.services';
import { handleError } from '../../utils/errorHandler';
import { getLanguageFromRequest } from '../../utils/requestHelpers';

export const GET = async (request: Request) => {
  try {
    const lang = getLanguageFromRequest(request);
    const params = new URL(request.url).searchParams;
    const brandSlug = decodeURIComponent(params.get('slug') || '');

    if (!brandSlug) {
      return NextResponse.json(
        {
          success: false,
          error: 'No slug provided',
        },
        { status: 400 }
      );
    }

    const brand = await getBrandInfoWithSlug(brandSlug, lang);

    return NextResponse.json(
      {
        success: true,
        data: brand,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
};

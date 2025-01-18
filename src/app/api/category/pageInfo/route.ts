import { NextResponse } from 'next/server';
import { getCategoryInfoWithSlug } from '../../services/category.services';
import { handleError } from '../../utils/errorHandler';
import { getLanguageFromRequest } from '../../utils/requestHelpers';

export const GET = async (request: Request) => {
  try {
    const lang = getLanguageFromRequest(request);
    const params = new URL(request.url).searchParams;
    const categorySlug = params.get('slug');

    if (!categorySlug) {
      return NextResponse.json(
        {
          success: false,
          error: 'No slug provided',
        },
        { status: 400 }
      );
    }

    const category = await getCategoryInfoWithSlug(categorySlug, lang);

    return NextResponse.json(
      {
        success: true,
        data: category,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
};

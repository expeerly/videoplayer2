import { NextResponse } from 'next/server';
import { handleGetCategoryWithVideoss } from '../../services/category.services';
import { handleError } from '../../utils/errorHandler';

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '4');
    // const lang = getLanguageFromRequest(request);

    const category = await handleGetCategoryWithVideoss(page, limit);

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

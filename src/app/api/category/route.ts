import { NextResponse } from 'next/server';
import { getCategoriesForSlider, handleCreateCategory } from '../services/category.services';
import { handleError } from '../utils/errorHandler';
import { SupportedLanguage } from '../utils/requestHelpers';
import { createRouteHandler } from '../utils/baseRouteHandler';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const category = await handleCreateCategory(body.data);
    return NextResponse.json(
      {
        success: true,
        data: category,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return handleError(error);
  }
};

export const GET = createRouteHandler({
  serviceFunction: async params => {
    return getCategoriesForSlider(params.language as SupportedLanguage, params.filters!);
  },
  includeFilters: true,
  includeLanguage: true,
});

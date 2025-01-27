import { NextResponse } from 'next/server';
import { getAllCategories } from '../../services/category.services';
import { handleError } from '../../utils/errorHandler';

export const GET = async () => {
  try {
    const categories = await getAllCategories();

    return NextResponse.json(
      {
        success: true,
        data: categories,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
};

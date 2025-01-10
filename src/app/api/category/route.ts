import { NextResponse } from 'next/server';
import { getCategoriesForSlider, handleCreateCategory } from '../services/category.services';
import { handleError } from '../utils/errorHandler';

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

export const GET = async () => {
  try {
    const category = await getCategoriesForSlider();
    return NextResponse.json(
      {
        success: true,
        data: category,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return handleError(error);
  }
};

import { NextResponse } from 'next/server';
import { handleError } from '../../utils/errorHandler';
import { getAllCreators } from '../../services/creator.services';

export const GET = async () => {
  try {
    const data = await getAllCreators();

    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
};

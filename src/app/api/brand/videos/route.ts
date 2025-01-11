import { NextResponse } from 'next/server';
import { handleGetBrandsWithVideos } from '../../services/brand.services';
import { handleError } from '../../utils/errorHandler';
import { getPaginationParams } from '../../utils/requestHelpers';

export const GET = async (request: Request) => {
  try {
    const params = getPaginationParams(request);

    const category = await handleGetBrandsWithVideos(params);

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

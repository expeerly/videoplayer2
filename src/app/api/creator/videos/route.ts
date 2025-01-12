import { NextResponse } from 'next/server';
import { handleGetCreatorWithVideos } from '../../services/creator.services';
import { handleError } from '../../utils/errorHandler';
import { getPaginationParams } from '../../utils/requestHelpers';

export const GET = async (request: Request) => {
  try {
    const params = getPaginationParams(request);

    const category = await handleGetCreatorWithVideos(params);

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

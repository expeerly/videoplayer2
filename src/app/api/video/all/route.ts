import { NextResponse } from 'next/server';
import { getLanguageFromRequest } from '../../utils/requestHelpers';
import { handleError } from '../../utils/errorHandler';
import { getAllVideos } from '../../services/video.services';

export const GET = async (request: Request) => {
  try {
    const lang = getLanguageFromRequest(request);
    const data = await getAllVideos(lang);

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

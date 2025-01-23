import { NextResponse } from 'next/server';
import { getExploreVideos } from '../../services/video.services';
import { getLanguageFromRequest } from '../../utils/requestHelpers';
import { handleError } from '../../utils/errorHandler';

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get('videoId') || '';

    const lang = getLanguageFromRequest(request);
    const videoIds = videoId
      .split(',')
      .filter(Boolean)
      .map(id => Number(id));
    const video = await getExploreVideos(videoIds, lang);

    if (!video) {
      return NextResponse.json({ success: false, message: 'Video not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: video });
  } catch (error) {
    return handleError(error);
  }
};

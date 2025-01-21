import { NextResponse } from 'next/server';
import { getVideoById } from '../../services/video.services';
import { handleError } from '../../utils/errorHandler';
import { getLanguageFromRequest } from '../../utils/requestHelpers';

export const GET = async (req: Request, { params }: { params: Promise<{ videoId: string }> }) => {
  try {
    const { videoId } = await params;

    const lang = getLanguageFromRequest(req);

    if (!videoId) {
      return NextResponse.json(
        { success: false, message: 'Video ID is required' },
        { status: 400 }
      );
    }

    const video = await getVideoById(videoId, lang);

    if (!video) {
      return NextResponse.json({ success: false, message: 'Video not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: video });
  } catch (error) {
    return handleError(error);
  }
};

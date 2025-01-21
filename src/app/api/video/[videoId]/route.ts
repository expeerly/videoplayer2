import { NextResponse } from 'next/server';
import { getVideoById } from '../../services/video.services';
import { handleError } from '../../utils/errorHandler';

export const GET = async (req: Request, { params }: { params: { videoId: string } }) => {
  try {
    const { videoId } = params;
    console.log({ videoId });
    if (!videoId) {
      return NextResponse.json(
        { success: false, message: 'Video ID is required' },
        { status: 400 }
      );
    }

    const video = await getVideoById(videoId);

    if (!video) {
      return NextResponse.json({ success: false, message: 'Video not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: video });
  } catch (error) {
    return handleError(error);
  }
};

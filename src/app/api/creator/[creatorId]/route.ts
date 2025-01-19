import { NextRequest, NextResponse } from 'next/server';
import { getCreatorByIdWithVideos } from '../../services/creator.services';
import { handleError } from '../../utils/errorHandler';
import { getLanguageFromRequest } from '../../utils/requestHelpers';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ creatorId: string }> }
) {
  const { creatorId } = await params;
  const lang = getLanguageFromRequest(request);

  try {
    const creator = await getCreatorByIdWithVideos(creatorId, lang);

    return NextResponse.json(
      {
        success: true,
        data: creator,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}

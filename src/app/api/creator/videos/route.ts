import { handleGetCreatorWithVideos } from '../../services/creator.services';
import { createRouteHandler } from '../../utils/baseRouteHandler';
import { SupportedLanguage } from '../../utils/requestHelpers';

/**
 * GET endpoint for retrieving creators with their associated videos
 * Supports pagination and optional video count parameter
 *
 * @route GET /api/creator/videos
 * @param {Object} request - Next.js request object
 * @param {string} request.query.page - Page number for pagination
 * @param {string} request.query.limit - Number of items per page
 * @param {string} request.query.videoCount - Optional number of videos to include per creator
 * @param {string} request.query.random - Optional flag to randomize results
 * @returns {Promise<NextResponse>} JSON response with creators and metadata
 */
export const GET = createRouteHandler({
  serviceFunction: async params => {
    return handleGetCreatorWithVideos(
      params.pagination,
      params.language as SupportedLanguage,
      params.filters!
    );
  },
  includeFilters: true,
  includeLanguage: true,
});

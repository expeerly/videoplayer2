import { handleGetCategoryWithVideos } from '../../services/category.services';
import { createRouteHandler } from '../../utils/baseRouteHandler';
import { SupportedLanguage } from '../../utils/requestHelpers';

/**
 * GET endpoint for retrieving categories with their associated videos
 * Supports pagination, language filtering, and additional filter parameters
 *
 * @route GET /api/category/videos
 * @param {Object} request - Next.js request object
 * @param {string} request.query.page - Page number for pagination
 * @param {string} request.query.limit - Number of items per page
 * @param {string} request.query.categories - Comma-separated category IDs
 * @param {string} request.query.brands - Comma-separated brand IDs
 * @returns {Promise<NextResponse>} JSON response with categories and metadata
 */
export const GET = createRouteHandler({
  serviceFunction: async params => {
    return handleGetCategoryWithVideos(
      params.pagination,
      params.language as SupportedLanguage,
      params.filters!
    );
  },
  includeLanguage: true,
  includeFilters: true,
});

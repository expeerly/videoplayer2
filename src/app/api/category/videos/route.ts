import { handleGetCategoryWithVideos } from '../../services/category.services';
import { createRouteHandler } from '../../utils/baseRouteHandler';
import { SupportedLanguage } from '../../utils/requestHelpers';

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

import { handleGetBrandsWithVideos } from '../../services/brand.services';
import { createRouteHandler } from '../../utils/baseRouteHandler';
import { SupportedLanguage } from '../../utils/requestHelpers';

export const GET = createRouteHandler({
  serviceFunction: async params => {
    return handleGetBrandsWithVideos(
      params.pagination,
      params.language as SupportedLanguage,
      params.filters!
    );
  },
  includeFilters: true,
  includeLanguage: true,
});

import { handleGetBrandsWithVideos } from '../../services/brand.services';
import { createRouteHandler } from '../../utils/baseRouteHandler';

export const GET = createRouteHandler({
  serviceFunction: async params => {
    return handleGetBrandsWithVideos(params.pagination);
  },
});

import { handleGetCreatorWithVideos } from '../../services/creator.services';
import { createRouteHandler } from '../../utils/baseRouteHandler';

export const GET = createRouteHandler({
  serviceFunction: async params => {
    return handleGetCreatorWithVideos(params.pagination);
  },
});

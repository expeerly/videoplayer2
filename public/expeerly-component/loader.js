import { b as bootstrapLazy } from './index-6424e9ac.js';
export { s as setNonce } from './index-6424e9ac.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

const defineCustomElements = async (win, options) => {
  if (typeof window === 'undefined') return undefined;
  await globalScripts();
  return bootstrapLazy([["expeerly-component_2",[[1,"expeerly-component",{"gtin":[1],"accessKey":[1,"access-key"],"type":[1],"maxVideos":[2,"max-videos"],"theme":[1],"storeId":[1,"store-id"],"accentColor":[1,"accent-color"],"locale":[1],"loading":[32],"errorMessage":[32],"reviews":[32],"playingPlaybackId":[32],"rateLimited":[32]}],[1,"expeerly-fly-widget",{"accessKey":[513,"access-key"],"brandId":[513,"brand-id"],"brand":[1],"theme":[1],"position":[1],"zIndex":[2,"z-index"],"locale":[1],"expanded":[32],"loading":[32],"errorMessage":[32],"currentIndex":[32],"videos":[32],"totalReviews":[32],"avgRating":[32],"viewportSlides":[32],"playingPlaybackId":[32],"playingId":[32]},null,{"accessKey":["propsChanged"],"brandId":["propsChanged"]}]]],["my-component",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]],["my-component2",[[1,"my-component2"]]]], options);
};

export { defineCustomElements };

//# sourceMappingURL=loader.js.map
import { b as bootstrapLazy } from './index-e05416ab.js';
export { s as setNonce } from './index-e05416ab.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

const defineCustomElements = async (win, options) => {
  if (typeof window === 'undefined') return undefined;
  await globalScripts();
  return bootstrapLazy([["expeerly-carousel",[[1,"expeerly-carousel",{"gtin":[1],"theme":[1],"maxVideos":[2,"max-videos"],"storeId":[1,"store-id"],"reviews":[32],"loading":[32],"errorMessage":[32],"currentSlide":[32]}]]],["expeerly-component",[[1,"expeerly-component",{"gtin":[1],"type":[1],"maxVideos":[2,"max-videos"],"theme":[1],"storeId":[1,"store-id"],"accentColor":[1,"accent-color"],"locale":[1],"loading":[32],"errorMessage":[32],"reviews":[32]}]]],["my-component",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]]], options);
};

export { defineCustomElements };

//# sourceMappingURL=loader.js.map
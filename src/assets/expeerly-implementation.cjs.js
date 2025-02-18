/* eslint-disable @typescript-eslint/no-require-imports */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1337b78.js');
const appGlobals = require('./app-globals-3a1e7e63.js');

/*
 Stencil Client Patch Browser v4.26.0 | MIT Licensed | https://stenciljs.com
 */
var patchBrowser = () => {
  const importMeta =
    typeof document === 'undefined'
      ? new (require('u' + 'rl').URL)('file:' + __filename).href
      : (document.currentScript && document.currentScript.src) ||
        new URL('expeerly-implementation.cjs.js', document.baseURI).href;
  const opts = {};
  if (importMeta !== '') {
    opts.resourcesUrl = new URL('.', importMeta).href;
  }
  return index.promiseResolve(opts);
};

patchBrowser().then(async options => {
  await appGlobals.globalScripts();
  return index.bootstrapLazy(
    [
      [
        'expeerly-component.cjs',
        [
          [
            1,
            'expeerly-component',
            {
              gtin: [1],
              type: [1],
              maxVideos: [2, 'max-videos'],
              theme: [1],
              storeId: [1, 'store-id'],
              accentColor: [1, 'accent-color'],
              locale: [1],
              loading: [32],
              errorMessage: [32],
              reviews: [32],
            },
          ],
        ],
      ],
      ['my-component.cjs', [[1, 'my-component', { first: [1], middle: [1], last: [1] }]]],
    ],
    options
  );
});

exports.setNonce = index.setNonce;

//# sourceMappingURL=expeerly-implementation.cjs.js.map

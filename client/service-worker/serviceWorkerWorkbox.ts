// import { createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
// import { registerRoute, NavigationRoute } from 'workbox-routing';
// import { skipWaiting, clientsClaim } from 'workbox-core';

// declare const self: Window & ServiceWorkerGlobalScope;

// skipWaiting();
// clientsClaim();
// const precacheManifest = [].concat(self.__WB_MANIFEST || []);
// precacheAndRoute(precacheManifest);

// const handler = createHandlerBoundToURL('/SportsZilla/client/public/index.html');
// const navigationRoute = new NavigationRoute(handler, {
//   denylist: [/^\/_/, /\/[^/?]+\.[^/]+$/],
// });
// registerRoute(navigationRoute);
const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html', 'offline.html', '../src/index.scss', '../src/index.tsx'];
const self1 = this;
// Install SW
self1.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  )
});
// Listen for requests
self1.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then((cachedResponse) => {
        return  fetch(e.request) || cachedResponse
      }).catch(() => caches.match('offline.html'))
  )
});
// Activate the SW
self1.addEventListener('activate', (e) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);
  e.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(cacheName => {
        if(!cacheWhitelist.includes(cacheName)) {
          return caches.delete(cacheName);
        }
      })
    ))
  )
});
// notification click
// self1.addEventListener('notificationclick', event => {
//   const notification = event.notification;
//   const action = event.action;
//   if (action === 'close') {
//     notification.close();
//   } else {
//     // self1.clients.openWindow('http://localhost:3000/myTrips')
//   }
// })
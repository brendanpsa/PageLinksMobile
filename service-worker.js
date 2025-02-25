const CACHE_NAME = 'page-links-cache-v1';
const urlsToCache = [
  '/',
  './index.html',
  './favicon.svg',
  './manifest.json',
  './mobicons/Google_G.svg',
  './mobicons/Perplexity.svg',
  './mobicons/odb.svg',
  './mobicons/rocket.svg',
  './mobicons/YouTube.svg',
  './mobicons/ALDI.svg'
];

// Install the service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Cache and return requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Update the service worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
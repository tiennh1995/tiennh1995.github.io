const filesToCache = [
  '/index.html',
  '/data.txt'
];

const staticCacheName = 'pages-cache-v1';

self.addEventListener('install', event => {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
      cache.addAll(filesToCache);
    })
  );
});

document.querySelector('.button').addEventListener('click', function(event) {
  event.preventDefault();
  caches.open(staticCacheName).then(function(cache) {
    cache.matchAll('/data.txt').then(function(response) {
      response.forEach(function(element, index, array) {
        console.log(element);
      });
    });
  })
});

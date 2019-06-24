const filesToCache = [
	'index.html',
	'/data.json'
];

const staticCacheName = 'dictionary';

self.addEventListener('install', event => {
  console.log('Service worker is working!');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
      cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.open(staticCacheName).then(function(cache) {
  		return cache.match(event.request).then(function (response) {
    		return response || fetch(event.request).then(function(response) {
    			cache.put(event.request, response.clone());
    			if(response['url'].includes('json')) {
    				return response.json();
    			} else {
    				return response;
    			}
    		});
  		});
  	})
	);
});

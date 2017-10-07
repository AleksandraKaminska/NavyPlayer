const CACHE_NAME = 'NavyPlayer-1.0.0';

// List of files which are store in cache.
let filesToCache = [
    '/',
    '/css/style.css.map',
    '/images/play.png',
    '/images/pause.png',
    '/js/out.js'
];

self.addEventListener('install', (evt) => {
    // console.log('install', evt);
    evt.waitUntil(
        Promise.resolve()
            .then(() => {
                return caches.open(CACHE_NAME);
            })
            .then((cache) => {
                return cache.addAll(CACHED_FILES);
            })
            .then(() => {
                self.skipWaiting();
            })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => {
                return Promise.all(keys
                    .filter((key) => {
                        return key !== CACHE_NAME;
                    })
                    .map((key) => {
                        return caches.delete(key);
                    })
                );
            })
    );
});

function fetchAndCache(request, cache) {
    return fetch(request)
        .then((response) => {
            cache.put(request, response.clone());
            // console.log('fetch (online)', request.url);
            return response;
        })
        .catch(() => {
            // console.log('fetch (cache)', request.url);
            return cache.match(request);
        })
}

function networkFirst(evt) {
    evt.respondWith(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return fetchAndCache(evt.request, cache);
            })
    );
}

self.addEventListener('fetch', (evt) => {
    networkFirst(evt);
});

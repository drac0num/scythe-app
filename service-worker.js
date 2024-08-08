const CACHE_NAME = 'scythe-cache-v1';
const urlsToCache = [
    '/',
    '/scythe-app/index.html',
    '/scythe-app/styles.css',
    '/scythe-app/app.js',
    '/scythe-app/manifest.json',
    '/scythe-app/icon-192.png',
    '/scythe-app/icon-512.png'
];

// Installations-Event
self.addEventListener('install', event => {
    console.log('Service Worker: Installieren');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching files');
                return cache.addAll(urlsToCache);
            })
    );
});

// Aktivierungs-Event
self.addEventListener('activate', event => {
    console.log('Service Worker: Aktivieren');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Löschen alter Cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch-Event
self.addEventListener('fetch', event => {
    console.log('Fetch-Event:', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response; // Antwort aus dem Cache zurückgeben
                }
                return fetch(event.request); // Netzwerkanfrage durchführen
            })
    );
});

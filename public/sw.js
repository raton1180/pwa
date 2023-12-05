importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js');

workbox.setConfig({
    debug: false,
});

// Precaching - Cache static assets during install
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

// StaleWhileRevalidate strategy for GET requests
workbox.routing.registerRoute(
    /.*/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'get-cache',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            }),
        ],
    })
);

// Background Sync for POST requests
const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin('syncQueue', {
    maxRetentionTime: 60 * 60, // Max retention time in seconds
});

workbox.routing.registerRoute(
    ({ request }) => request.method === 'POST',
    new workbox.strategies.NetworkOnly({
        plugins: [bgSyncPlugin],
    }),
    'POST'
);

self.addEventListener('fetch', (event) => {
    if (event.request.method === 'POST' && navigator.onLine) {
        event.respondWith(
            fetch(event.request.clone()).catch(() => {
                // If the fetch fails, the request will be retried later
                const bgSync = new workbox.backgroundSync.BackgroundSync({
                    plugins: [bgSyncPlugin],
                });
                return bgSync.enqueue(event.request.clone());
            })
        );
    }
});

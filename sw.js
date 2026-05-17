// Service Worker — Kochplaner Offline Cache
// Version: 1.0 — bei Updates einfach CACHE_VERSION erhöhen

const CACHE_VERSION = 'kochplaner-v1';
const CACHE_NAME = CACHE_VERSION;

// Alle lokalen Dateien die gecacht werden sollen
const CACHE_ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './icon-192.svg',
    './icon-512.svg',
];

// ── Install ────────────────────────────────────────────────────────────────
// Läuft einmalig beim ersten Laden — speichert alle lokalen Assets
self.addEventListener('install', event => {
    console.log('[SW] Installing v' + CACHE_VERSION);
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(CACHE_ASSETS))
            .then(() => self.skipWaiting()) // Sofort aktivieren
    );
});

// ── Activate ───────────────────────────────────────────────────────────────
// Läuft nach Update — löscht alte Cache-Versionen
self.addEventListener('activate', event => {
    console.log('[SW] Activating v' + CACHE_VERSION);
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => {
                        console.log('[SW] Deleting old cache:', key);
                        return caches.delete(key);
                    })
            )
        ).then(() => self.clients.claim())
    );
});

// ── Fetch ──────────────────────────────────────────────────────────────────
// Strategie:
//   Lokale Assets  → Cache-first (blitzschnell, offline-fähig)
//   Externe Bilder → Network-first mit Fallback-Placeholder
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    const isLocal = url.origin === self.location.origin;
    const isImage = url.hostname.includes('loremflickr') || url.hostname.includes('unsplash');

    if (isLocal) {
        // Cache-first für lokale Dateien
        event.respondWith(
            caches.match(event.request).then(cached => {
                if (cached) return cached;
                return fetch(event.request).then(response => {
                    // Erfolgreiche Antworten auch cachen
                    if (response && response.status === 200) {
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                    }
                    return response;
                });
            })
        );
    } else if (isImage) {
        // Network-first für externe Bilder — bei Fehler: SVG-Placeholder
        event.respondWith(
            fetch(event.request).catch(() => {
                return new Response(
                    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200">
                        <rect width="400" height="200" fill="#e8f0fe"/>
                        <text x="50%" y="45%" font-size="48" text-anchor="middle" dy=".1em">🍽️</text>
                        <text x="50%" y="72%" font-size="14" text-anchor="middle" fill="#667eea">Offline – kein Bild verfügbar</text>
                    </svg>`,
                    { headers: { 'Content-Type': 'image/svg+xml' } }
                );
            })
        );
    }
    // Alles andere: normaler Browser-Request
});

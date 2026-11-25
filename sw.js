// Minimal service worker: offline cache for core pages (PWA install + push-ready)
// Network-first, bypassing the HTTP cache, so devotees always get the latest pages; the cache is only an offline fallback.
// Bump CACHE whenever you want every visitor's offline copy cleared.
const CACHE = 'rk-v2';
const CORE = ['index.html', 'poojas.html', 'track.html', 'panchangam.html', 'assets/app.js', 'assets/data.js', 'assets/tw.js', 'assets/style.css', '404.html'];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).catch(() => {})); });
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request, { cache: 'no-store' }).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request).then(r => r || caches.match('404.html'))));
});
self.addEventListener('push', e => {
  const d = e.data ? e.data.json() : { title: 'Sri Navapasana Raja Murugan', body: 'Live stream starting now 🪔' };
  e.waitUntil(self.registration.showNotification(d.title, { body: d.body, icon: 'assets/logo.svg' }));
});

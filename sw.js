// Minimal service worker: offline cache for core pages (PWA install + push-ready)
const CACHE = 'rk-v1';
const CORE = ['index.html', 'poojas.html', 'track.html', 'panchangam.html', 'assets/app.js', 'assets/data.js', 'assets/tw.js', 'assets/style.css', '404.html'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).catch(() => {})));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request).then(r => r || caches.match('404.html'))));
});
self.addEventListener('push', e => {
  const d = e.data ? e.data.json() : { title: 'Sri Raja Kuberar', body: 'Live stream starting now 🪔' };
  e.waitUntil(self.registration.showNotification(d.title, { body: d.body, icon: 'assets/logo.svg' }));
});

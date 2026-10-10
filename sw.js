// Жива вода — offline cache. Bump VERSION on every release.
const VERSION = 'zhyva-voda-v10';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isPage = req.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname.endsWith('/');
  // Everything: answer from cache instantly, refresh the cache in the background.
  // A new version shows on the next launch — the app never waits for the network.
  e.respondWith(caches.open(VERSION).then(async c => {
    const key = isPage ? './index.html' : req;
    const hit = await c.match(key, { ignoreSearch: isPage });
    const net = fetch(req).then(res => { if (res && (res.ok || res.type === 'opaque')) c.put(key, res.clone()); return res; }).catch(() => null);
    if (hit) { e.waitUntil(net); return hit; }
    return (await net) || (isPage ? c.match('./index.html') : Response.error());
  }));
});

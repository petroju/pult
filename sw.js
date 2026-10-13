// Жива вода — offline cache. Bump VERSION on every release.
const VERSION = 'zhyva-voda-v27';
const CORE = ['./', './index.html', './manifest.webmanifest', './zhyva-192.png', './zhyva-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // GitHub API, fonts etc. — straight to the network, never cached
  if (url.pathname.endsWith('/hw.json')) { e.respondWith(fetch(req).catch(() => caches.match(req, { ignoreSearch: true }))); return; }
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
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || './';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) if ('focus' in c) { if ('navigate' in c) c.navigate(url).catch(() => {}); return c.focus(); }
    return self.clients.openWindow(url);
  }));
});

/* Basket service worker — cache-first so the app opens with no network.
   Field sessions happen where connectivity is poor; this is the point. */
const CACHE = 'basket-v3';
const CORE = ['./', 'index.html', 'styles.css', 'strings.js', 'app.js',
  'manifest.webmanifest', 'icon.svg', 'icon-maskable.svg', 'xlsx.js',
  'img/cassava.png', 'img/maize.png', 'img/yam.png',
  'img/pepper.png', 'img/tomato.png', 'img/okra.png', 'img/hero.png',
  /*FONTS*/];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE)
    .then(c => Promise.allSettled(CORE.map(u => c.add(u))))
    .then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const { request } = e;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== location.origin) return;
  e.respondWith(
    caches.match(request).then(hit => hit || fetch(request).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(request, copy)); }
      return res;
    }).catch(() => caches.match('index.html')))
  );
});

const CACHE_NAME = "from-dad-shell-v1";
const ASSETS = ["./","./index.html","./manifest.json","./icons/icon-192.png","./icons/icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (url.host.includes("googleapis.com") && url.pathname.includes("/files/") && url.search.includes("alt=media")) return;
  if (e.request.destination === "document") {
    e.respondWith(fetch(e.request).then(r => {
      const copy = r.clone();
      caches.open(CACHE_NAME).then(c => c.put(e.request, copy));
      return r;
    }).catch(() => caches.match(e.request)));
  } else {
    e.respondWith(caches.match(e.request).then(m => m || fetch(e.request)));
  }
});

const CACHE_PREFIX = "aventuras-isabella-";
const CACHE_NAME = `${CACHE_PREFIX}v2`;
const ALPHABET_SLUGS = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "n-tilde",
  "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
];
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.json",
  "./assets/generated/character-master.webp",
  "./assets/generated/scene-01-question.webp",
  "./assets/generated/scene-02-evaporation.webp",
  "./assets/generated/scene-03-condensation.webp",
  "./assets/generated/scene-04-rain.webp",
  "./assets/generated/scene-05-cycle.webp",
  "./assets/audio-es/01-pregunta.mp3",
  "./assets/audio-es/02-sol.mp3",
  "./assets/audio-es/03-evaporacion.mp3",
  "./assets/audio-es/04-condensacion.mp3",
  "./assets/audio-es/05-lluvia.mp3",
  "./assets/audio-es/06-ciclo.mp3",
  "./assets/audio-es/07-final.mp3",
  "./assets/generated/alphabet/cover.webp",
  ...ALPHABET_SLUGS.map(slug => `./assets/generated/alphabet/letter-${slug}.webp`),
  "./assets/audio-es/alphabet/00-intro.mp3",
  ...ALPHABET_SLUGS.map((slug, index) => `./assets/audio-es/alphabet/${String(index + 1).padStart(2, "0")}-${slug}.mp3`),
  "./assets/audio-es/alphabet/28-final.mp3",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map(key => caches.delete(key))
  )));
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).catch(() => caches.match("./index.html")));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached ?? fetch(event.request)));
});

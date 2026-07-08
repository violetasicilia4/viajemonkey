const CACHE_VERSION = "v3";
const CACHE_NAME = `monkeytrip-shell-${CACHE_VERSION}`;

const APP_SHELL = [
  "/",
  "/index.html",
  "/assets/index-crgr9kqv-v2.js",
  "/assets/index-bbdv7vmt.css",
  "/manifest.webmanifest",
  "/offline.html",
  "/icons/icon-192-v2.png",
  "/icons/icon-512-v2.png",
  "/icons/icon-512-maskable-v2.png",
  "/icons/apple-touch-icon-v2.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Never cache API calls: they're optional/dynamic, and failures are handled by the app's own fallback logic.
  if (url.pathname.startsWith("/api/")) return;

  // Navigations (opening/reloading the app): try network first so users get fresh HTML when online,
  // fall back to the cached shell, then to the offline page as a last resort.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put("/index.html", copy));
          return response;
        })
        .catch(() => caches.match("/index.html").then((cached) => cached || caches.match("/offline.html")))
    );
    return;
  }

  // Static assets (JS/CSS/icons/manifest): cache-first for instant offline loads,
  // refreshing the cache in the background when the network is available.
  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || networkFetch;
    })
  );
});

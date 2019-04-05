/*self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open("video-store").then(function(cache) {
      return cache.addAll([
        "/pwa-examples/a2hs/",
        "/pwa-examples/a2hs/index.html",
        "/pwa-examples/a2hs/index.js",
        "/pwa-examples/a2hs/style.css",
        "/pwa-examples/a2hs/images/fox1.jpg",
        "/pwa-examples/a2hs/images/fox2.jpg",
        "/pwa-examples/a2hs/images/fox3.jpg",
        "/pwa-examples/a2hs/images/fox4.jpg"
      ]);
    })
  );
});
*/
const cacheName = "v1";

const cacheAssets = ["/index.html", "/style.css"];

self.addEventListener("install", e => {
  console.log("service Worker installed");

  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log("service worker : caching files");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  console.log("service Worker activated");
});

self.addEventListener("fetch", function(e) {
  console.log("service worker: fetched");
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

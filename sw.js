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
self.registration.showNotification("Hello Test notifications", {
  body: "Hello test paragraph",
  icon: "/icon/fox-icon.png",
  badge: "/icon/fox-icon.png",
  image:
    "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  actions: [
    {
      action: "add",
      title: "Add",
      icon: "https://image.flaticon.com/icons/svg/61/61112.svg"
    },
    {
      action: "rate",
      title: "Rate",
      icon: "https://image.flaticon.com/icons/svg/61/61112.svg"
    }
  ]
});

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

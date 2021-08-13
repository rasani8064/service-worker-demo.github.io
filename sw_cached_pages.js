const cacheName = "v1";

const cacheAssets = [
  "index.html",
  "about.html",
  "/css/style.css",
  "/js/main.js",
];

// Call install event

self.addEventListener("install", (e) => {
  console.log("Service Worler:installed");
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("Service worker: Caching files");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// Call Activate event

self.addEventListener("activate", (e) => {
  console.log("Service Worler:activated");
  // remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("Service Worker :Clearing old Cahe");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fecth event
self.addEventListener("fetch", (e) => {
  console.log("Servicve Worker : fetching");
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});

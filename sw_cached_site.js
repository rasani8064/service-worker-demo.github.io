const cacheName = "v2";

// Call install event

self.addEventListener("install", (e) => {
  console.log("Service Worler:installed");
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
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        //make a copy of response
        const resClone = res.clone();

        //open cache
        caches.open(cacheName).then((cache) => {
          //add Response to cache
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch((err) => caches.match(e.request).then((res) => res))
  );
});

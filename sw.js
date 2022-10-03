const cacheName = "gus-client-cache";

const addResourcesToCache = async resources => {
    const cache = await caches.open(cacheName);
    await cache.addAll(resources);
}

const putInCache = async (request, response) => {
    const cache = await caches.open(cacheName);
    await cache.put(request, response);
};

const cacheFirst = async (request, preloadResponsePromise, fallbackUrl) => {
    const responseFromCache = await caches.match(request);

    if (responseFromCache) {
        return responseFromCache;
    }

    try {
        const responseFromNetwork = await fetch(request);
        putInCache(request, responseFromNetwork.clone());
        return responseFromNetwork;
    } catch(error) {
        const fallbackResponse = await caches.match(fallbackUrl);
        if (fallbackResponse) {
            return fallbackResponse;
        }

        return new Response('Network error!', {
            status: 408,
            headers: { "Content-Type": "text/plain" }
        });
    }    
}

const deleteCache = async key => {
    await caches.delete(key);
};

const deleteOldCaches = async () => {
    const cacheKeepList = [cacheName];
    const keyList = await caches.keys();
    const cachesToDelete = keyList.filter(key => !cacheKeepList.includes(key));
    await Promise.all(cachesToDelete.map(deleteCache));
};

self.addEventListener("activate", event => {
    event.waitUntil(deleteOldCaches());
});

self.addEventListener("install", event => {
    event.waitUntil(
        addResourcesToCache([
            "./index.html",
            "./style.css",
            "./sth_went_wrong_fallback.png"
        ])
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(cacheFirst({
        request: event.request,
        fallbackUrl: "./sth_went_wrong_fallback.png"
    }));
});
const cacheName = "gus-client-cache";

const addResourcesToCache = async resources => {
    console.log("Adding resources to cache", resources);
    const cache = await caches.open(cacheName);
    await cache.addAll(resources);
}

const putInCache = async (request, response) => {
    console.log("Adding request and response to cache", request, response);
    const cache = await caches.open(cacheName);
    await cache.put(request, response);
};

// Implemented following the cache-first-then-network pattern
const cacheFirst = async ({ request, preloadResponsePromise, fallbackUrl }) => {

    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
        console.log("Returning response from cache", responseFromCache);
        return responseFromCache;
    }

    const preloadResponse = await preloadResponsePromise;
    if (preloadResponse) {
        console.log("Returning preload response", preloadResponse);
        putInCache(request, preloadResponse.clone());
        return preloadResponse;
    }

    try {
        const responseFromNetwork = await fetch(request);
        putInCache(request, responseFromNetwork.clone());
        console.log("Returning response from network", responseFromNetwork);
        return responseFromNetwork;
    } catch(error) {
        const fallbackResponse = await caches.match(fallbackUrl);
        if (fallbackResponse) {
            console.log("Returning fallback response", fallbackResponse);
            return fallbackResponse;
        }

        return new Response('Network error!', {
            status: 408,
            headers: { "Content-Type": "text/plain" }
        });
    }    
}

const deleteCache = async key => {
    console.log("Deleting cache", key);
    await caches.delete(key);
};

const deleteOldCaches = async () => {
    console.log("Deleting old caches");
    const cacheKeepList = [cacheName];
    const keyList = await caches.keys();
    const cachesToDelete = keyList.filter(key => !cacheKeepList.includes(key));
    await Promise.all(cachesToDelete.map(deleteCache));
    console.log("Finished deleting old caches");
};

const enableNavigationPreload = async () => {
    console.log("Enable navigation preload");
    if (self.registration.navigationPreload) {
        console.log("Navigation preload enabled");
        await self.registration.navigationPreload.enable();
    }
};

// This fires once the old service worker is gone, and your new service worker is able to control clients. 
// This is the ideal time to do stuff that you couldn't do while the old worker was still in use,
// such as migrating databases and clearing caches.
self.addEventListener("activate", event => {
    console.log("'activate' event");
    // Turning off navigation preload as it throws error on page reload:
    // the service worker navigation preload request was cancelled before 'preloadresponse' settled
    // event.waitUntil(enableNavigationPreload());
    event.waitUntil(deleteOldCaches());
});

// 'install' event happens first and only once.
// By default, a page's fetches won't go through a service worker 
// unless the page request itself went through a service worker.
// If you alter your service worker script the browser considers 
// it a different service worker, and it'll get its own install event.
self.addEventListener("install", event => {
    console.log("'install' event");
    event.waitUntil(
        addResourcesToCache([
            "./index.html",
            "./style.css",
            "./sth_went_wrong_fallback.png"
        ])
    );
});

self.addEventListener('fetch', (event) => {
    console.log("'fetch' event");
    event.respondWith(cacheFirst({
        request: event.request,
        preloadResponsePromise: event.preloadResponse,
        fallbackUrl: "./sth_went_wrong_fallback.png"
    }));
});
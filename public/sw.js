self.addEventListener('install', function(event) {
  self.skipWaiting()
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
});

async function fetchNetworkFirst(request) {
  try {
    const response = await fetch(request)
    const cache = await caches.open('cache')
    cache.put(request.url, response.clone())
    return response
  } catch {
    return caches.match(request)
  }
}

self.addEventListener('fetch', function(event) {
  const isHTML = event.request.headers.get('Accept').includes('text/html')
  const isCSS = event.request.headers.get('Accept').includes('text/css')
  const isJS = event.request.headers.get('Accept').includes('text/javascript')
  const isFont = event.request.url.includes('fonts.gstatic.com')
  if(isHTML || isCSS || isJS || isFont) {
    event.respondWith(fetchNetworkFirst(event.request))
  }
});
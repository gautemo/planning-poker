self.addEventListener('install', function(event) {
  self.skipWaiting()
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
});
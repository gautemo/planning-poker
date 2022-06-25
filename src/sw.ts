import { clientsClaim } from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching'

declare let self: ServiceWorkerGlobalScope

precacheAndRoute(self.__WB_MANIFEST)

self.addEventListener('install', function(event) {
  self.skipWaiting()
  clientsClaim()
});
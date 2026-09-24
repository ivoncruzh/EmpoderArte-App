self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",async event=>{
  await caches.keys().then(keys=>Promise.all(keys.map(k=>caches.delete(k))));
  await self.clients.claim();
});
self.addEventListener("fetch",event=>{});

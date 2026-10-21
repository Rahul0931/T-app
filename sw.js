// T service worker — keeps the app working offline
const CACHE='t-69d63b0717';
const FILES=["./", "icon-192.png", "icon-512.png", "icon-maskable.png", "manifest.json", "xlsx.js"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('t-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);if(u.origin!==location.origin)return;
  if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put('./',cp));return res}).catch(()=>caches.match('./')));return}
  e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp))}return res})));
});

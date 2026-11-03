const CACHE="vipra-shell-v1";
const FILES=["./","./index.html","./manifest.webmanifest","./icons/icon-192.png","./icons/icon-512.png","./icons/icon-512-maskable.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
// Cache only local static app files; never cache Supabase, auth, chart, chat, or API data.
self.addEventListener("fetch",e=>{
 const r=e.request,u=new URL(r.url);
 if(r.method!=="GET"||u.origin!==self.location.origin)return;
 if(u.pathname.includes("/functions/")||u.pathname.includes("/rest/")||u.pathname.includes("/storage/"))return;
 if(r.mode==="navigate"){e.respondWith(fetch(r).catch(()=>caches.match("./index.html")));return}
 if(FILES.some(p=>new URL(p,self.registration.scope).href===r.url))
   e.respondWith(caches.match(r).then(c=>c||fetch(r)));
});

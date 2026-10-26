/* Service worker: يفتح الموقع بدون إنترنت. شبكة أولاً، ثم الكاش. غيّري رقم النسخة عند تحديث الملفات. */
const C='yc-v14',A=['./','index.html','css/style.css','css/premium.css','js/api.js','js/i18n.js','js/app.js','js/features.js','js/premium.js','js/kyc.js','js/draft.js','css/draft.css','css/addons.css','js/addons.js','wireframes.html','manifest.webmanifest','icons/logo.png','icons/icon-192.png','icons/apple-touch-icon.png','icons/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp)).catch(()=>{})}return res}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))));
});

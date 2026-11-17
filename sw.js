// Офлайн-режим для телефона. Версия меняется при каждой пересборке пакета.
const V = "vietcoco-31eadbd6aa";
const FILES = ["./", "3d.html", "VIETCOCO_business_plan.pdf", "VIETCOCO_teaser.pdf", "baza.html", "img/ceh_au.jpg", "img/ceh_b1.jpg", "img/genplan.jpg", "img/hero.jpg", "img/icon-180.png", "img/icon-192.png", "img/icon-512.png", "img/izometria.jpg", "img/karta_au.jpg", "img/karta_kubiki.jpg", "img/kubiki.jpg", "img/liniya_au_viz.jpg", "img/oborud/agico_ceh1.jpg", "img/oborud/agico_ceh2.jpg", "img/oborud/agico_ceh3.jpg", "img/oborud/agico_pult.jpg", "img/oborud/beston_3d.jpg", "img/oborud/beston_obshchiy.jpg", "img/oborud/dingli_au_aktivaciya.jpg", "img/oborud/dingli_au_ceh.jpg", "img/oborud/dingli_au_liniya_3d.jpg", "img/oborud/dingli_au_pech.jpg", "img/oborud/dingli_au_pult.jpg", "img/oborud/dingli_au_shema.jpg", "img/oborud/dingli_kub_ceh.jpg", "img/oborud/dingli_kub_ceh2.jpg", "img/oborud/dingli_kub_liniya_3d.jpg", "img/oborud/dingli_kub_ploshchadka.jpg", "img/oborud/xuye_ceh.jpg", "img/oborud/xuye_karbon.jpg", "img/oborud/xuye_liniya.jpg", "img/peredely.svg", "img/poster_oblet_3d.jpg", "img/poster_oblet_foto.jpg", "img/poster_rolik_investor.jpg", "img/potoki.jpg", "img/prichal.jpg", "img/skorlupa.jpg", "img/skorlupa2.jpg", "index.html", "karta.html", "manifest.webmanifest"];
self.addEventListener("install", e => { self.skipWaiting();
  e.waitUntil(caches.open(V).then(c => Promise.all(FILES.map(f => c.add(new Request(f, {cache: "reload"})).catch(() => null))))); });
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k))))
  .then(() => self.clients.claim())));
self.addEventListener("fetch", e => {
  const r = e.request; if (r.method !== "GET" || r.headers.has("range")) return;
  e.respondWith(caches.match(r, {ignoreSearch: true}).then(hit => hit || fetch(r).then(resp => {
    if (resp.ok && new URL(r.url).origin === location.origin && !r.url.includes("/media/")) {
      const cp = resp.clone(); caches.open(V).then(c => c.put(r, cp)); }
    return resp; }).catch(() => caches.match("./index.html"))));
});

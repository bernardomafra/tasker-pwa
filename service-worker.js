const cacheName = 'tasker-pwa-v1.0';

const htmlFiles = ['/index.html', '/new-list.html'];

const cssFiles = [
  '/styles/global.css',
  '/styles/toast.css',
  '/styles/font.css',
  '/styles/colors.css',
  '/styles/list-common.css',
  '/styles/layout.css',
  '/styles/bottom-tab.css',
  '/styles/pages/home.css',
  '/styles/pages/list.css',
  '/styles/pages/new-list.css',
];

const jsFiles = [
  '/js/toast.js',
  '/js/storage.js',
  '/js/loaders.js',
  '/js/bottom-tab.js',
  '/js/pages/home.js',
];

const assetsFiles = [
  'assets/icons/arrow-left.png',
  'assets/icons/check.png',
  'assets/icons/delete.png',
  'assets/icons/edit.png',
  'assets/icons/magnify.png',
  'assets/icons/plus.png',
  'assets/icons/settings.png',
  'assets/icons/uncheck.png',
  'assets/splashscreens/ipad_splash.png',
  'assets/splashscreens/ipadpro1_splash.png',
  'assets/splashscreens/ipadpro2_splash.png',
  'assets/splashscreens/ipadpro3_splash.png',
  'assets/splashscreens/iphone5_splash.png',
  'assets/splashscreens/iphone6_splash.png',
  'assets/splashscreens/iphoneplus_splash.png',
  'assets/splashscreens/iphonex_splash.png',
  'assets/splashscreens/iphonexr_splash.png',
  'assets/splashscreens/iphonexsmax_splash.png',
  'assets/logo-192px.png',
  'assets/logo-512px.png',
  'assets/logo-no-subtitle.png',
  'assets/logo-only.png',
  'assets/logo-with-bg.png',
  'assets/logo.png',
];

const pathsToCache = [
  '/',
  '/manifest.webmanifest',
  ...htmlFiles,
  ...cssFiles,
  ...jsFiles,
  ...assetsFiles,
];

// Armazena todos os arquivos no cache atual
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      cache.addAll(pathsToCache);
    }),
  );
});

// Recupera todos os nomes de cache e apaga aqueles
// que forem diferentes do cache atual
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        }),
      );
    }),
  );
});

// Tenta servir o arquivo do cache atual. Se não for possível,
// baixa o recurso da web e o armazena localmente, antes de entregar
// uma cópia para o usuário.
// self.addEventListener('fetch', function (event) {
//   let response = caches.open(cacheName).then((cache) => {
//     return cache.match(event.request).then((resource) => {
//       if (resource) return resource;
//       return fetch(event.request).then((resource) => {
//         cache.put(event.request, resource.clone());
//         return resource;
//       });
//     });
//   });
//   event.respondWith(response);
// });

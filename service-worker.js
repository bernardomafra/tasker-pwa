const cacheName = 'tasker-pwa-v12.1';

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
  '/styles/pages/new-list.css'
];

const jsFiles = [
  '/js/toast.js',
  '/js/loaders.js',
  '/js/bottom-tab.js',
  '/js/pages/home.js',
  '/js/pages/new-list.js',
  '/js/pages/new-task.js',
  '/js/pages/list.js',
  '/js/pages/my-lists.js',
  '/js/storage.js'
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

self.addEventListener('install', (e) => {
  caches.open(cacheName).then((cache) => cache.addAll(pathsToCache));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.open(cacheName).then((cache) => {
      return cache.match(e.request).then((resp) => {
        // Request found in current cache, or fetch the file
        return (
          resp ||
          fetch(e.request)
            .then((response) => {
              // Cache the newly fetched file for next time
              cache.put(e.request, response.clone());
              return response;
              // Fetch failed, user is offline
            })
            .catch(() => {
              // Look in the whole cache to load a fallback version of the file
              return caches.match(e.request).then((fallback) => {
                return fallback;
              });
            })
        );
      });
    }),
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keyList) =>
        Promise.all(
          keyList.map((key) =>
            key != cacheName ? caches.delete(key) : Promise.resolve(),
          ),
        ),
      ),
  );
});

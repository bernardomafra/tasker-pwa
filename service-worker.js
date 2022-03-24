const cacheName = 'tasker-pwa-v5.1';

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
 'assets/appicons/android-icon-36x36.png',
  'assets/appicons/android-icon-48x48.png',
  'assets/appicons/android-icon-72x72.png',
  'assets/appicons/android-icon-96x96.png',
  'assets/appicons/android-icon-144x144.png',
  'assets/appicons/android-icon-192x192.png',
  'assets/appicons/apple-icon-57x57.png',
  'assets/appicons/apple-icon-60x60.png',
  'assets/appicons/apple-icon-72x72.png',
  'assets/appicons/apple-icon-76x76.png',
  'assets/appicons/apple-icon-114x114.png',
  'assets/appicons/apple-icon-120x120.png',
  'assets/appicons/apple-icon-144x144.png',
  'assets/appicons/apple-icon-152x152.png',
  'assets/appicons/apple-icon-180x180.png',
  'assets/appicons/apple-icon-precomposed.png',
  'assets/appicons/apple-icon.png',
  'assets/appicons/favicon-16x16.png',
  'assets/appicons/favicon-32x32.png',
  'assets/appicons/favicon-96x96.png',
  'assets/appicons/favicon.ico',
  'assets/appicons/logo-192px.png',
  'assets/appicons/logo-512px.png',
  'assets/appicons/logo-no-subtitle.png',
  'assets/appicons/logo-only.png',
  'assets/appicons/logo-with-bg.png',
  'assets/appicons/logo.png',
  'assets/appicons/ms-icon-70x70.png',
  'assets/appicons/ms-icon-144x144.png',
  'assets/appicons/ms-icon-150x150.png',
  'assets/appicons/ms-icon-310x310.png'
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

function loadCss() {
  document.body.style.visibility = 'visible';
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('service-worker.js')
      .then((res) => console.log('service worker registered on', res.scope))
      .catch((err) => console.log('service worker not registered', err));
  }
}

window.addEventListener('load', () => {
  loadCss();
  registerServiceWorker();
});

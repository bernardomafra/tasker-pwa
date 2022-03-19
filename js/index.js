function loadCss() {
  document.body.style.visibility = 'visible';
}

// Inicialize o deferredPrompt para posteriormente mostrar o prompt de instalação do navegador.
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Impede que o mini-infobar apareça em mobile
  e.preventDefault();
  // Guarda evento para que possa ser disparado depois.
  deferredPrompt = e;
  // Atualiza UI notifica usuário que pode instalar PWA
  showInstallPromotion();
  // Opcionalmente, enviar eventos de analytics que promo de instalação PWA foi mostrado.
  console.log(`'beforeinstallprompt' event was fired.`);
});

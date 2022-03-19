function loadCss() {
  document.body.style.visibility = 'visible';
}

window.addEventListener('load', () => {
  // Inicialize o deferredPrompt para posteriormente mostrar o prompt de instalação do navegador.
  let deferredPrompt;
  let pwaInstallButton = document.getElementById('btn-install-pwa');

  function showInstallPromotion() {
    pwaInstallButton.style.display = 'block';
  }

  function hideInstallPromotion() {
    pwaInstallButton.style.display = 'none';
  }

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

  pwaInstallButton.addEventListener('click', async () => {
    // Esconde a promoção de instalação fornecida pelo app
    hideInstallPromotion();
    // Mostra prompt de instalação
    deferredPrompt.prompt();
    // Espera usuário responder ao prompt
    const { outcome } = await deferredPrompt.userChoice;
    // Opcionalmente, enviar evento analytics com resultado da escolha do usuário
    console.log(`User response to the install prompt: ${outcome}`);
    // Usamos o prompt e não podemos usar de novo; jogue fora
    deferredPrompt = null;
  });

  window.addEventListener('appinstalled', () => {
    // Esconder a promoção de instalação fornecida pela app
    hideInstallPromotion();
    // Limpar o deferredPrompt para que seja coletado
    deferredPrompt = null;
    // Opcionalmente, enviar evento de analytics para indicar instalação com sucesso
    console.log('PWA was installed');
  });
});

function loadCss() {
  document.body.style.visibility = 'visible';

  document.body.style.position = 'fixed';
  document.body.style.top = `-${window.scrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
}

window.addEventListener('load', () => {
  loadCss();
});

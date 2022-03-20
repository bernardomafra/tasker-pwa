function loadCss() {
  document.body.style.visibility = 'visible';
}

function addStoreReferenceInPage() {
  const storageReference = document.createElement('script');
  storageReference.setAttribute('src', 'js/storage.js');
  document.body.appendChild(storageReference);
}

window.addEventListener('load', () => {
  loadCss();
  addStoreReferenceInPage();
});

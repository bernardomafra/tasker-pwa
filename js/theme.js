window.addEventListener('load', () => {
  const theme = localStorage.getItem('theme');
  if (theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  const toggle = document.querySelector('button.theme-switcher');
  const logo = document.getElementById('tasker-logo');
  let icon = document.createElement('img');
  icon.setAttribute(
    'src',
    `assets/icons/${theme === 'dark' ? 'light' : 'dark'}.png`,
  );
  toggle.appendChild(icon);
  toggle.addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      icon.setAttribute('src', 'assets/icons/light.png');

      logo.setAttribute('src', 'assets/light-logo-only.png');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      icon.setAttribute('src', 'assets/icons/dark.png');
      logo.setAttribute('src', 'assets/logo-only.png');
    }

    toggle.replaceChildren(icon);
  });
});

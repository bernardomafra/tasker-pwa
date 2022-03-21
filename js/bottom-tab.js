(function (root, factory) {
  try {
    // commonjs
    if (typeof exports === 'object') {
      module.exports = factory();
      // global
    } else {
      root.toast = factory();
    }
  } catch (error) {
    console.log(
      'Isomorphic compatibility is not supported at this time for toast.',
    );
  }
})(this, function () {
  // We need DOM to be ready
  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('DOMContentLoaded', init);
  }

  bottomTab = {
    open: function () {
      console.error(
        [
          'DOM has not finished loading.',
          '\tInvoke open method when DOMs readyState is complete',
        ].join('\n'),
      );
    },
    close: function () {
      console.error(
        [
          'DOM has not finished loading.',
          '\tInvoke close method when DOMs readyState is complete',
        ].join('\n'),
      );
    },
  };

  const tabs = document.querySelectorAll('button.tab');
  hideTabs();

  function init() {
    document.body.style.position = 'relative';

    const container = document.querySelector('.bottom-tab');
    container.id = 'tasker-bottom-tab';
    document.body.appendChild(container);

    // @Override
    // Replace open method when DOM has finished loading

    bottomTab.isOpen = false;
    bottomTab.open = function (options) {
      container.classList.add('open');
      showTabs();
      bottomTab.isOpen = true;

      if (options?.callback) options.callback();
    };

    bottomTab.close = function (options) {
      bottomTab.isOpen = false;

      container.classList.remove('open');
      hideTabs();

      if (options?.callback) options.callback();
    };
  }

  function hideTabs() {
    tabs.forEach((tab) => (tab.style.display = 'none'));
  }

  function showTabs() {
    tabs.forEach((tab) => (tab.style.display = 'block'));
  }

  return bottomTab;
});

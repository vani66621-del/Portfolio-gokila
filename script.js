(() => {
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('.navlinks');

  if (menu && nav) {
    const closeMenu = () => {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    };

    menu.addEventListener('click', () => {
      const isOpen = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(isOpen));
      nav.classList.toggle('open', isOpen);
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  const email = 'vani66621@gmail.com';
  const copyButton = document.querySelector('#copy-email');
  const copyStatus = document.querySelector('#copy-status');

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (_) {
        // Continue to the local fallback.
      }
    }

    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    field.style.pointerEvents = 'none';
    document.body.appendChild(field);
    field.select();
    field.setSelectionRange(0, field.value.length);

    let copied = false;
    try {
      copied = document.execCommand('copy');
    } catch (_) {
      copied = false;
    }
    field.remove();
    return copied;
  }

  if (copyButton && copyStatus) {
    copyButton.addEventListener('click', async () => {
      const copied = await copyText(email);
      copyStatus.textContent = copied
        ? 'Email address copied.'
        : 'Copy is unavailable here. Select the email address shown above.';
    });
  }

  const processTabs = [...document.querySelectorAll('.process-tab')];

  function selectStep(index, shouldFocus = false) {
    processTabs.forEach((tab, tabIndex) => {
      const active = tabIndex === index;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      if (panel) panel.hidden = !active;
    });
    if (shouldFocus && processTabs[index]) processTabs[index].focus();
  }

  processTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectStep(index));
    tab.addEventListener('keydown', (event) => {
      let next = index;
      if (event.key === 'ArrowDown') next = (index + 1) % processTabs.length;
      else if (event.key === 'ArrowUp') next = (index - 1 + processTabs.length) % processTabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = processTabs.length - 1;
      else return;

      event.preventDefault();
      selectStep(next, true);
    });
  });
})();

const dropdownComponentWrappers = document.querySelectorAll('[data-pos-component="Dropdown"]');
dropdownComponentWrappers.forEach(dropdownComponentWrapper => {
  const trigger = dropdownComponentWrapper.querySelector('[data-dropdown-trigger]');
  const content = dropdownComponentWrapper.querySelector('[data-dropdown-content]');
  const arrow = dropdownComponentWrapper.querySelector('[data-dropdown-arrow]');
  let resizeTimeout;

  const toggle = () => {
    content.classList.toggle('hidden');
    if (content.getAttribute('aria-hidden') === 'true') {
      content.setAttribute('aria-hidden', 'false');
    } else {
      content.setAttribute('aria-hidden', 'true');
    }
    positionArrow();
  };


  const close = (event) => {
    event.stopPropagation();
    content.classList.add('hidden');
    content.setAttribute('aria-hidden', 'true');
  };

  const watchClickOutside = (event) => {
    const didClickedOutside = !dropdownComponentWrapper.contains(event.target);
    if (didClickedOutside) {
      close(event);
    }
  };

  const supportKeyboardNavigation = (event) => {
    // press ESC -> close dropdown
    if (event.keyCode === 27) {
      close(event);
    }
  };

  const positionArrow = () => {
    if (!arrow) return;
    const toggleSize = trigger.getBoundingClientRect();
    const contentSize = content.getBoundingClientRect();
    const arrowSize = arrow.getBoundingClientRect();

    arrow.style.left = toggleSize.left - contentSize.left + toggleSize.width / 2 - arrowSize.width / 2 + 'px';
    arrow.classList.remove('invisible');
  };

  const positionOnResize = () => {
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(positionArrow, 200);
  };

  window.addEventListener('resize', positionOnResize);
  trigger.addEventListener('click', toggle);
  document.addEventListener('click', watchClickOutside);
  content.addEventListener('click', close);
  dropdownComponentWrapper.addEventListener('keydown', supportKeyboardNavigation);
});

const popupOpeners = document.querySelectorAll('[data-popup-open-id]');
popupOpeners.forEach(opener => {
  opener.addEventListener('click', (event) => {
    const popupId= opener.getAttribute('data-popup-open-id');
    const popup = document.querySelector(`[data-popup-id="${popupId}"]`);
    const backdrop = document.querySelector(`[data-backdrop-id="${popupId}"]`);
    popup.classList.toggle("hidden");
    backdrop.classList.toggle("hidden");

    if (!popup.classList.contains('hidden')) {
      const firstInput = popup.querySelector('input');
      if (firstInput) {
        firstInput.focus();
      }
    } else {
      console.log('close')
    }
  });
});

const popups = document.querySelectorAll('[data-popup-id]');
popups.forEach(popup => {
  popup.addEventListener("keydown", event => {
    if (event.keyCode === 27) {
      const popupId = popup.getAttribute('data-popup-id');
      const backdrop = document.querySelector(`[data-backdrop-id="${popupId}"]`);
      popup.classList.toggle("hidden");
      backdrop.classList.toggle("hidden");
    }
  });
});

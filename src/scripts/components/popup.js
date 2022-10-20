const popupOpeners = document.querySelectorAll('[data-popup-open-id]');
popupOpeners.forEach(opener => {
  opener.addEventListener('click', (event) => {
    const popupId= opener.getAttribute('data-popup-open-id');
    const popup = document.querySelector(`[data-popup-id="${popupId}"]`);
    const backdrop = document.querySelector(`[data-backdrop-id="${popupId}"]`);
    popup.classList.toggle("hidden");
    backdrop.classList.toggle("hidden");
  });
});


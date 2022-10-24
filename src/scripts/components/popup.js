// opener buttons
const popupOpeners = document.querySelectorAll('[data-popup-open-id]');
popupOpeners.forEach(opener => {
  opener.addEventListener('click', (event) => {
    event.stopPropagation();
    const popupId = opener.getAttribute('data-popup-open-id');
    togglePopup(popupId);
  });
});

const popups = document.querySelectorAll('[data-popup-id]');
popups.forEach(popup => {
  const popupId = popup.getAttribute('data-popup-id');
  // popup close by ESC
  popup.addEventListener("keydown", event => {
    if (event.keyCode === 27) {
      closePopup(popupId);
    }
  });
  document.addEventListener("click", (event) => {
    const didClickedOutside = !popup.contains(event.target);
    if (didClickedOutside) {
      closePopup(popupId);
    }
  });
});

const togglePopup = (popupId, forceClose = false) => {
  const popup = document.querySelector(`[data-popup-id="${popupId}"]`);
  const backdrop = document.querySelector(`[data-backdrop-id="${popupId}"]`);
  if (forceClose) {
    popup.classList.add("hidden");
    backdrop.classList.add("hidden");
  } else {
    popup.classList.toggle("hidden");
    backdrop.classList.toggle("hidden");
  }

  // open
  if (!forceClose && !popup.classList.contains('hidden')) {
    popup.setAttribute("aria-hidden", false);
    const firstInput = popup.querySelector('input');
    if (firstInput) {
      firstInput.focus();
    }
  // close
  } else {
    popup.setAttribute("aria-hidden", true);
  }
}

const closePopup = popupId => {
  togglePopup(popupId, true);
}

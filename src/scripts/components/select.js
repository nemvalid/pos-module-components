const selectComponentsWrapper = document.querySelector('[data-pos-component="Select"]');
if (selectComponentsWrapper) {
  selectComponentsWrapper.querySelectorAll('[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', (event) => {
      const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
      checkBoxes.forEach(checkBox => {
        const tag = document.querySelector(`[data-pos-select-tag="${checkBox.id}"]`);
        if (checkBox.checked) {
          tag.classList.remove('hidden');
        } else {
          tag.classList.add('hidden');
        }
      });
    });
  });
};

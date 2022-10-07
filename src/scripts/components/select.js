const selectComponentsWrapper = document.querySelector('[data-pos-component="Select"]');
if (selectComponentsWrapper) {
  const placeholder = selectComponentsWrapper.querySelector('.placeholder');
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

      const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
      if (checkedBoxes.length) {
        placeholder.classList.add('hidden');
      } else {
        placeholder.classList.remove('hidden');
      }
    });
  });

  const opener = selectComponentsWrapper.querySelector('.pos-select-opener');
  opener.addEventListener('click', (event) => {
    const options = selectComponentsWrapper.querySelector('.pos-select-options');
    options.classList.toggle("hidden");
  });
};

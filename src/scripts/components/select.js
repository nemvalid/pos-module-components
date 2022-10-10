const selectComponentsWrappers = document.querySelectorAll('[data-pos-component="Select"]');
selectComponentsWrappers.forEach(selectComponentsWrapper => {
  const placeholder = selectComponentsWrapper.querySelector('.placeholder');
  selectComponentsWrapper.querySelectorAll('[type="checkbox"], [type="radio"]').forEach(checkbox => {
    checkbox.addEventListener('change', (event) => {
      const checkBoxes = selectComponentsWrapper.querySelectorAll('input[type="checkbox"], [type="radio"]');
      checkBoxes.forEach(checkBox => {
        const tag = selectComponentsWrapper.querySelector(`[data-pos-select-tag="${checkBox.id}"]`);
        if (checkBox.checked) {
          tag.classList.remove('hidden');
        } else {
          tag.classList.add('hidden');
        }
      });

      const checkedBoxes = selectComponentsWrapper.querySelectorAll('[type="checkbox"]:checked, [type="radio"]:checked');
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

    const openerIcons = selectComponentsWrapper.querySelectorAll('.pos-select-opener > div');
    openerIcons[0].classList.toggle("hidden");
    openerIcons[1].classList.toggle("hidden");
  });
});

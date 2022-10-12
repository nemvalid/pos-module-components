const selectComponentsWrappers = document.querySelectorAll('[data-pos-component="Select"]');
selectComponentsWrappers.forEach(selectComponentsWrapper => {
  const placeholder = selectComponentsWrapper.querySelector('.placeholder');
  const opener = selectComponentsWrapper.querySelector('.pos-select-opener');

  /* open */
  const toggleOpen = (event) => {
    const options = selectComponentsWrapper.querySelector('.pos-select-custom__options');
    options.classList.toggle("hidden");
    const openerIcons = selectComponentsWrapper.querySelectorAll('.pos-select-opener > div');
    openerIcons[0].classList.toggle("hidden");
    openerIcons[1].classList.toggle("hidden");
  };

  opener.addEventListener('click', toggleOpen);
  placeholder.addEventListener('click', toggleOpen);

  /* multiselect */
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

  /* simple select */
  const nativeSelect = selectComponentsWrapper.querySelector('.pos-select-native');

  selectComponentsWrapper.querySelectorAll('.pos-select-custom__options > div').forEach(option => {
    const value = option.getAttribute("data-value");
    option.addEventListener('click', () => {
      nativeSelect.value = value;
      toggleOpen();
    });
  });

});

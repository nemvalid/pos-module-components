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

  /* single select */
  const nativeSelect = selectComponentsWrapper.querySelector('.pos-select-simple-native');
  if (nativeSelect) {
    const tagWrapper = selectComponentsWrapper.querySelector('.pos-select-custom__tags');
    tagWrapper.addEventListener('click', toggleOpen);
    const singleSelectTagSelect = () => {
      const tags = selectComponentsWrapper.querySelectorAll('.pos-select-custom__tags > div');
      tags.forEach(tag => {
        const tagValue = tag.getAttribute("data-value");
        if (tagValue == nativeSelect.value) {
          tag.classList.remove('hidden');
        } else {
          tag.classList.add('hidden');
        }
      })

      const options = selectComponentsWrapper.querySelectorAll('.pos-select-custom__options > div');
      options.forEach(option => {
        const optionValue = option.getAttribute("data-value");
        if (optionValue == nativeSelect.value) {
          option.classList.add('bg-highlighted');
        } else {
          option.classList.remove('bg-highlighted');
        }
      })

      if (nativeSelect.value) {
        placeholder.classList.add('hidden');
      } else {
        placeholder.classList.remove('hidden');
      }
    }

    /* single select - custom select*/
    selectComponentsWrapper.querySelectorAll('.pos-select-custom__options > div').forEach(option => {
      const value = option.getAttribute("data-value");
      option.addEventListener('click', () => {
        nativeSelect.value = value;
        toggleOpen();
        singleSelectTagSelect();
      });
    });

    /* single select - native select*/
    nativeSelect.addEventListener('change', (event) => {
      singleSelectTagSelect();
    });
  }

});

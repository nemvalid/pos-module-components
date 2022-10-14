const selectComponentsWrappers = document.querySelectorAll('[data-pos-component="Select"]');
selectComponentsWrappers.forEach(selectComponentsWrapper => {
  const placeholder = selectComponentsWrapper.querySelector('.placeholder');
  const opener = selectComponentsWrapper.querySelector('.pos-select-opener');

  /* toggle open for custom select */
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
  const nativeMultiSelect = selectComponentsWrapper.querySelector('.pos-select-multi-native');
  if (nativeMultiSelect) {
    selectComponentsWrapper.querySelectorAll('[type="checkbox"]').forEach(checkbox => {
      /* multi select - custom select*/
      checkbox.addEventListener('change', () => {
        const option = selectComponentsWrapper.querySelector(`option[value="${checkbox.value}"]`);
        option.selected = !option.selected;

        const tag = selectComponentsWrapper.querySelector(`[data-value="${checkbox.value}"]`);
        tag.classList.toggle('hidden');

        const checkedBoxes = selectComponentsWrapper.querySelectorAll('[type="checkbox"]:checked');
        if (checkedBoxes.length) {
          placeholder.classList.add('hidden');
        } else {
          placeholder.classList.remove('hidden');
        }
      });
    });

    const tags = selectComponentsWrapper.querySelectorAll('.pos-select-multi-custom__tags > div');
    tags.forEach(tag => {
      tag.addEventListener('click', () => {
        const tagValue = tag.getAttribute("data-value");
        const checkbox = selectComponentsWrapper.querySelector(`input[value="${tagValue}"]`);
        checkbox.click();
        const option = selectComponentsWrapper.querySelector(`option[value="${tagValue}"]`);
        option.selected = false;
        tag.classList.add('hidden');
      });
    });

    /* multi select - native select*/
    nativeMultiSelect.addEventListener('change', () => {
      const selectedOptions = selectComponentsWrapper.querySelectorAll('.pos-select-multi-native > option');

      selectedOptions.forEach(option => {
        console.log(option);
        const optionValue = option.value;
        const checkbox = selectComponentsWrapper.querySelector(`input[value="${optionValue}"]`);
        const tag = selectComponentsWrapper.querySelector(`[data-value="${optionValue}"]`);
        if (option.selected) {
          checkbox.checked = true;
          tag.classList.remove('hidden');
        } else {
          checkbox.checked = false;
          tag.classList.add('hidden');
        }
        const checkedBoxes = selectComponentsWrapper.querySelectorAll('[type="checkbox"]:checked');
        if (checkedBoxes.length) {
          placeholder.classList.add('hidden');
        } else {
          placeholder.classList.remove('hidden');
        }
      });
    });
  }

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
    nativeSelect.addEventListener('change', () => {
      singleSelectTagSelect();
    });
  }

});

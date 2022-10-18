const selectComponentsWrappers = document.querySelectorAll('[data-pos-component="Select"]');
selectComponentsWrappers.forEach(selectComponentsWrapper => {
  const placeholder = selectComponentsWrapper.querySelector('.pos-select__placeholder');
  const opener = selectComponentsWrapper.querySelector('.pos-select__opener');
  const options = selectComponentsWrapper.querySelector('.pos-select__options');
  const head = selectComponentsWrapper.querySelector('.pos-select__head');

  let optionHoveredIndex = -1;

  /* toggle open for custom select */
  const toggleOpen = (event) => {
    event.stopPropagation();
    options.classList.toggle("hidden");
    const openerIcons = selectComponentsWrapper.querySelectorAll('.pos-select__opener > div');
    openerIcons[0].classList.toggle("hidden");
    openerIcons[1].classList.toggle("hidden");
  };

  const closeOptions = (event) => {
    event.stopPropagation();
    options.classList.add("hidden");
    const openerIcons = selectComponentsWrapper.querySelectorAll('.pos-select__opener > div');
    openerIcons[0].classList.remove("hidden");
    openerIcons[1].classList.add("hidden");
    updateCustomSelectHovered(-1);
  };

  const watchClickOutside = (event) => {
    const didClickedOutside = !selectComponentsWrapper.contains(event.target);
    if (didClickedOutside) {
      closeOptions(event);
    }
  }

  const updateCustomSelectHovered = (newIndex) => {
    const prevOption = options.children[optionHoveredIndex];
    const option = options.children[newIndex];

    if (prevOption) {
      prevOption.classList.remove("bg-highlighted");
    }
    if (option) {
      option.classList.add("bg-highlighted");
    }

    optionHoveredIndex = newIndex;
  }

  const supportKeyboardNavigation = (event) => {
    // press down -> go next
    if (event.keyCode === 40 && optionHoveredIndex < options.children.length - 1 ) {
      event.preventDefault(); // prevent page scrolling
      updateCustomSelectHovered(optionHoveredIndex + 1);
    }

    // press up -> go previous
    if (event.keyCode === 38 && optionHoveredIndex > 0) {
      event.preventDefault(); // prevent page scrolling
      updateCustomSelectHovered(optionHoveredIndex - 1);
    }

    // press Enter or space -> select the option
    if (event.keyCode === 13 || event.keyCode === 32) {
      event.preventDefault();
      if (optionHoveredIndex == -1) {
        toggleOpen(event);
      } else {
        const checkbox = options.children[optionHoveredIndex].querySelector('[type="checkbox"]');
        if (checkbox) {
          checkbox.click();
        } else {
          options.children[optionHoveredIndex].click();
        }
      }
    }

    // press ESC -> close selectCustom
    if (event.keyCode === 27) {
      closeOptions(event);
    }
  }

  head.addEventListener('click', toggleOpen);
  document.addEventListener("click", watchClickOutside);
  opener.addEventListener('click', toggleOpen);
  placeholder.addEventListener('click', toggleOpen);
  selectComponentsWrapper.addEventListener("keydown", supportKeyboardNavigation);


  /* multiselect */
  const nativeMultiSelect = selectComponentsWrapper.querySelector('.pos-select--multi-native');
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

    const tags = selectComponentsWrapper.querySelectorAll('.pos-select__tags > div');
    tags.forEach(tag => {
      tag.addEventListener('click', (event) => {
        event.stopPropagation();
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
      const selectedOptions = selectComponentsWrapper.querySelectorAll('.pos-select--multi-native > option');

      selectedOptions.forEach(option => {
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
  const nativeSelect = selectComponentsWrapper.querySelector('.pos-select--simple-native');
  if (nativeSelect) {
    const tagWrapper = selectComponentsWrapper.querySelector('.pos-select__tags');
    tagWrapper.addEventListener('click', toggleOpen);
    const singleSelectTagSelect = () => {
      const tags = selectComponentsWrapper.querySelectorAll('.pos-select__tags > div');
      tags.forEach(tag => {
        const tagValue = tag.getAttribute("data-value");
        if (tagValue == nativeSelect.value) {
          tag.classList.remove('hidden');
        } else {
          tag.classList.add('hidden');
        }
      })

      const options = selectComponentsWrapper.querySelectorAll('.pos-select__options > div');
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
    selectComponentsWrapper.querySelectorAll('.pos-select__options > div').forEach(option => {
      const value = option.getAttribute("data-value");
      option.addEventListener('click', (event) => {
        nativeSelect.value = value;
        toggleOpen(event);
        singleSelectTagSelect();
      });
    });

    /* single select - native select*/
    nativeSelect.addEventListener('change', () => {
      singleSelectTagSelect();
    });
  }

});

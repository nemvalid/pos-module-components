const accordionWrappers = document.querySelectorAll('[data-pos-component="Accordion"]');
accordionWrappers.forEach(accordionWrapper => {
  const titles = accordionWrapper.querySelectorAll('.pos-accordion__title');

  titles.forEach(title => {
    title.addEventListener('click', () => {
      const panel = title.nextElementSibling;
      const icon = title.firstElementChild;
      icon.classList.toggle("rotate-180");
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  })


});

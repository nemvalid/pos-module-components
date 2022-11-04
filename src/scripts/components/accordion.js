const accordionWrappers = document.querySelectorAll('[data-pos-component="Accordion"]');
accordionWrappers.forEach(accordionWrapper => {
  const titles = accordionWrapper.querySelectorAll('.pos-accordion__title');
  //  const panel = accordionWrapper.querySelector('.pos-accordion__panel');

  titles.forEach(title => {
    title.addEventListener('click', () => {
      const panel = title.nextElementSibling;
      panel.classList.toggle("hidden");
    });
  })


});

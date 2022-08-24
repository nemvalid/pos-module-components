const iconComponentsWrapper = document.querySelector('[data-styleguide-component="Icon"]');
if (iconComponentsWrapper) {
  iconComponentsWrapper.querySelectorAll('svg').forEach(svgElement => {
    const name = svgElement.getAttribute('data-icon');
    svgElement.parentElement.insertAdjacentHTML('beforeend', name);
    svgElement.parentElement.style.display = 'inline-grid';
    svgElement.parentElement.style.justifyItems = 'center';
    svgElement.parentElement.style.width = '180px';
    svgElement.parentElement.style.marginBottom = '16px';
  });
};

console.log('styleguide')

/* The main entry file for the production (components) bundle */
import './styles/components.css';
import './scripts/components/flash';
import './scripts/components/select';
import './scripts/components/popup';
import './scripts/components/accordion';
import './scripts/components/tabs';
import './scripts/components/more-less';
import './scripts/components/dropdown';
import './scripts/components/flash';

const COMPONENT_MODULES = [
 'select',
 'popup',
 'accordion',
 'tabs',
 'more-less',
 'dropdown'
];

window.posComponents = window.posComponents || {};

const initialize = async (component) => {
  let components = [];
  if (Array.isArray(component)) {
    components = component;
  } else if (!component) {
    components = COMPONENT_MODULES;
  } else {
    components.push(component);
  }

  for (component of components) {
    const elements = document.querySelectorAll(`[data-pos-component="${component}"]:not([data-pos-initialized])`);
    if (elements.length) {
      const componentModule = await import(`./scripts/components/${component}`);
      componentModule.default(elements);
      Array.from(elements).map(e => e.setAttribute('data-pos-initialized', true));
    }
  }
};

window.posComponents.initialize = initialize;
document.addEventListener('DOMContentLoaded', () => initialize());

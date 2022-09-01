const defaultColors = require('./colors.default');

function parseColor(colorName) {
  return ({ opacityVariable, opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(--${colorName}, ${defaultColors[colorName]}), ${opacityValue})`;
    }
    if (opacityVariable !== undefined) {
      return `rgba(var(--${colorName}, ${defaultColors[colorName]}), var(${opacityVariable}, 1))`;
    }
    return `rgb(var(--${colorName}))`;
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  /* TODO: further optimizations needed */
  content: [
    "../public/views/partials/{atoms,molecules,organisms,pages,templates}/*.liquid}",
    "../../**/public/views/pages/**/*.liquid",
    "../../**/public/views/partials/**/*.liquid",
    "./scripts/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'prominent': parseColor('prominent'),
        'normal': parseColor('normal'),
        'supplementary': parseColor('supplementary'),
        'graphic': parseColor('graphic'),
        'inverted': parseColor('inverted'),
        'interactive-graphic': parseColor('interactive-graphic'),
        'interactive-text': parseColor('interactive-text'),
        'interactive-hover': parseColor('interactive-hover'),
        'interactive-disabled': parseColor('interactive-disabled'),
        'colorful': parseColor('colorful'),
        'colorful-hover': parseColor('colorful-hover'),
        'colorful-foreground': parseColor('colorful-foreground'),
        'colorful-supplementary': parseColor('colorful-supplementary'),
        'gradient1-from': parseColor('gradient1-from'),
        'gradient1-to': parseColor('gradient1-to'),
        'gradient2-from': parseColor('gradient2-from'),
        'gradient2-to': parseColor('gradient2-to'),
        'panel': parseColor('panel'),
        'panel-shadow': parseColor('panel-shadow'),
        'base': parseColor('base'),
        'highlighted': parseColor('highlighted'),
        'divider': parseColor('divider'),
        'input': parseColor('input'),
        'input-border': parseColor('input-border'),
        'input-foreground': parseColor('input-foreground'),
        'button-primary': parseColor('button-primary'),
        'button-primary-hover': parseColor('button-primary-hover'),
        'button-primary-foreground': parseColor('button-primary-foreground'),
        'button-primary-foreground-hover': parseColor('button-primary-foreground-hover'),
        'button-secondary': parseColor('button-secondary'),
        'button-secondary-hover': parseColor('button-secondary-hover'),
        'button-secondary-foreground': parseColor('button-secondary-foreground'),
        'button-secondary-foreground-hover': parseColor('button-secondary-foreground-hover'),
        'important': parseColor('important'),
        'important-hover': parseColor('important-hover'),
        'important-disabled': parseColor('important-disabled'),
        'confirmation': parseColor('confirmation'),
        'confirmation-hover': parseColor('confirmation-hover'),
        'confirmation-disabled': parseColor('confirmation-disabled'),
        'warning': parseColor('warning'),
        'warning-hover': parseColor('warning-hover'),
        'warning-disabled': parseColor('warning-disabled')
      },
      boxShadow: {
        'card': `0px 0px 5px rgba(${defaultColors['panel-shadow']})`
      }
    },
  },
  plugins: [],
};

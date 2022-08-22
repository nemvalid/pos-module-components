# Component Library Module

Provides [atomic](https://atomicdesign.bradfrost.com/table-of-contents/) Liquid components for pOS projects and renders a dynamic style guide.

## Usage

Once you installed the module you can use the atomic buiding blocks with [theme_render_rc](https://documentation.platformos.com/api-reference/liquid/platformos-tags#theme_render_rc) or a standard `render` tag.
If you'd like to use the component override functionality provided by `theme_render_rc` you can set up the search path preference order in your project's `config.yml`:
```
theme_search_paths:
  - overrides
  - modules/{{ context.constants.THEME }}
  - modules
```

And in your project you can render the component: 
```
{% liquid 
  assign button_params = '{}' | parse_json | hash_merge: variant: 'primary', content: 'Click me'
  theme_render_rc 'components/atoms/button', params: params.button_params
%}
```

This way `theme_render_rc` will first look for component overrides in the `app/views/partials/overrides` folder. This is where you can define your project-specific component overrides if needed, following the naming convention of `app/views/partials/overrides/components/{atoms|molecules|organisms}/{componentName}.liquid`
Your project-level component overrides have the highest priority, giving you the ability to match your project requirements while still using the shared component library.

The next search path is `modules/{{ context.constants.THEME }}` which is a dynamic path pointing to the currently selected / active theme provided by the [Theme Manager Module](https://github.com/Platform-OS/pos-module-theme-manager). This allows [theme modules](https://github.com/Platform-OS/pos-theme-module-template) to have their own theme-specific component overrides that'd take precedence over the default components.

The last path is `modules` which (based on the Component Library Module's machine name being "components") will render the provided component from the Component Library as a fallback.

## Colors and configuration

If you use a standard theme and the Theme Manager Module than they can provide you the necessary configuration context from the current theme.  
For more details you can check the Theme Manager Module's documentation: https://github.com/Platform-OS/pos-module-theme-manager/blob/master/README.md

## Hooks

The Component Libarary Module implements the `hook_admin_menu` hook to add the Styleguide page link to the admin if the [Admin Module](https://github.com/Platform-OS/pos-module-admin) is added to your project.
It also implements the `hook_module_info` hook to register itself to the Module registry provided by the [Core Module](https://github.com/Platform-OS/pos-module-core).

## Styleguide and Component meta

The module provides a dynamically rendered styleguide page at the `/styleguide` url.
The styleguide renders every component that is available in your project, and applies the currently selected theme (if available) via the [Theme Manager Module](https://github.com/Platform-OS/pos-module-theme-manager) (it's an optional dependency). If there is no theme in the current project, or the theme manager module is not available then it'll use its fallback theme settings and colors from [/src/colors.default.js](https://github.com/Platform-OS/pos-module-components/blob/master/src/colors.default.js).

The styleguide uses the component metadata to show the docs section for every component and to display the component variants automatically.
The component meta is a standard frontmatter section in the component source (docs-as-code ftw!) which serves two purposes: It shows the available params you can pass to the component, and it acts as a "component config blueprint" for the styleguide for the component variants.

It's possible that for a component we don't want to show every combination of the possible param values in the styleguide. In this case you as a component developer can provide a _styleguide params_ object in the following format:
```
---
metadata:
  name: Human-readable name of the component
  params:
    param1: param1 value
    param2:
      - param2 value 1
      - param2 value 2
    content: Example content 
  styleguide:
    params:
      param1: param1 value to be used in the styleguide
      param2: param2 value to be used in the styleguide
---
```

## Development

The component library is a standalone module and it has its own frontend stack and frontend build.
It uses tailwind css under the hood but it doesn't mean that you have to use it in your project. During the frontend build it generates its own minified css bundle which you can add to the `<head>` of your app source: https://github.com/Platform-OS/pos-module-components/blob/master/public/assets/components.css.
If you take a look at the [tailwind config file](https://github.com/Platform-OS/pos-module-components/blob/master/src/tailwind.config.js) you'll notice that it doesn't have any hardcoded colors or other design tokens. It uses [CSS custom properties (CSS variables)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) instead which makes it possible to change the look&feel of the components run-time -- by providing the necessary CSS propery declarations in your app. This is exactly how the Theme Manager Module provides the theme configuration to your app.

If you also prefer to use tailwind in your pOS project then you can reuse the tailwind config file from the component library source folder and add it to your root app's frontend build. The only thing you need to remember is to add a default colorscheme file and modify your tailwind content configuration in your main frontend build to include CSS rules from the Component Library Module's view files (and other sources if needed). For more details on content configation see https://tailwindcss.com/docs/content-configuration 
In this case you don't need to add the production css bundle from the component library, as your main project css will contain everything you need.

Please never change the source files or the configuration in the `modules/components` folder (this is also true for every other module). 
Monkey-patching is bad for the environment and to your health as it can easily lead to unexpected results or make it hard to update your modules.
If you need a component to look differently you can always create an override for that specific component in your app or as a custom module in your project repository.
If you find a bug or you have a suggestion please reach out on slack or open a github issue.

# Laravel Mix / Webpack 2 / Patternlab frontend
(c) drunomics GmbH, hello@drunomics.com

## External resources
* Laravel mix documentation: https://laravel.com/docs/5.4/mix
* Webpack 2 documentation: https://webpack.js.org/concepts/
* Twig documentation: https://twig.sensiolabs.org/doc/2.x/

## Overview

* Assets are built using webpack 2. Laravel mix is used as configuration base
  and provides us with a fluent API for further configuration of webpack.
* Components come with SCSS, Javascript (ES6) and twig files. Optionally they
  may contain and use further resources like images or fonts.
* The app (e.g. Drupal 8) can embed and leverage components directly via Twig.
* Dependencies are managed via npm only (no bower etc).
* Javascript is written in ES6 and uses ES6 modules; e.g. see 
  http://2ality.com/2014/09/es6-modules-final.html.

### Folders

* assets: Contains generated assets only. This includes Javascript, CSS as well 
  as images, fonts etc. referenced in CSS or JS.
* pattern-lab: Contains the pattern-lab installation and config. The generated
  build lands in pattern-lab/public.
* src: Contains all the source files, that are:
  * css: Contains sass which is not component-related, i.e. mixins and general
    config.
  * icons: Contains SVG files out of which an icon font will be built.
  * js: Contains the Javascript source files (ES6) which are not component
    related, i.e. usually just basic setup. As all JS, those files are
    transpiled with Babel.
  * components: Here is the interesting part - all frontend components. Those
    are split into:
    * base: Base-setup like colors, breakpoints and styling of elements, e.g.
      form elements. Template files in base are just for demonstration purposes.
    * atom: Small, re-usable components - like links, buttons or specific form
      elements.
    * site-elements: Contains various site elements like menus and breadcrumbs.
    * layouts: Contains re-usable layouts.
    * site-regions: Contains components that represent complete site-regions
      and typically consist of smaller site-elements; e.g. header, footer or a 
      sidebar.
    * content: Various content elements; i.e. all the editorial content, its
      various display variants and lists or grids of it.
    * pages: Complete pages, showing some preview content.
  
## Configuration overview
 
* package.json: Contains all dev-dependencies (for building) and front-end
  dependencies (CSS/SCSS, Javascript).
* The main config file is `webpack.mix.js` which configures webpack with the
  help of Laravel mix.
* The icon font config is in src/icons/00-icon.font.json. The icon font gets
  generated by the webfonts-loader: https://github.com/jeerbl/webfonts-loader
* Pattern-lab is configured in pattern-lab/config/config.yml and manages its
  dependencies in pattern-lab/composer.json via composer.

## Prerequisites / Setup

- Node 6.10.* (LTS boron) or later is required 
- Optional: Manage node versions using NVM
- Run `npm install` once.

### Using NVM (Node version manager)

See https://github.com/creationix/nvm

* Installation: 
  * Follow https://github.com/creationix/nvm#install-script
  * Then run:
```
   nvm install lts/boron
```
* Usage:
```
   # lts/boron is configured in .nvmrc
   nvm use  
   # Switch back to the default
   nvm use system
```

## Usage

* Build assets and pattern-lab

  `./scripts/build.sh`
  
* Clean build

  `./scripts/clean-build.sh`

* Compile assets only

  * Make sure to build at least once first
  * Run `npm run build`

* Compile assets (production mode)

  * Make sure to build at least once first
  * Run `npm run production`

* Development:
  * Watch (assets only)
  
    `npm run dev`
  * Watch - with Patternlab
  
    `npm run dev:pl`

## Todos
- Add html-loader and load images from twig templates.
- Complete icon font handling
- More docs.

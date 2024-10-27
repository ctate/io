# PostCSS

Extend the PostCSS config and plugins added by Next.js with your own.

## Examples

- Tailwind CSS Example: github.com/vercel/next.js/tree/canary/examples/with-tailwindcss

## Default Behavior

Next.js compiles CSS for its built-in CSS support using PostCSS.

Out of the box, with no configuration, Next.js compiles CSS with the following transformations:

- Autoprefixer automatically adds vendor prefixes to CSS rules (back to IE11).
- Cross-browser Flexbox bugs are corrected to behave like the spec.
- New CSS features are automatically compiled for Internet Explorer 11 compatibility:
  - `all` Property
  - Break Properties
  - `font-variant` Property
  - Gap Properties
  - Media Query Ranges

By default, CSS Grid and Custom Properties (CSS variables) are **not compiled** for IE11 support.

To compile CSS Grid Layout for IE11, place the following comment at the top of your CSS file:

```css
/* autoprefixer grid: autoplace */
```

You can enable IE11 support for CSS Grid Layout in your entire project by configuring autoprefixer as shown below:

```json
{
  "plugins": [
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        "autoprefixer": {
          "flexbox": "no-2009",
          "grid": "autoplace"
        },
        "stage": 3,
        "features": {
          "custom-properties": false
        }
      }
    ]
  ]
}
```

CSS variables are not compiled because it is not possible to safely do so. If you must use variables, consider using Sass variables which are compiled away by Sass.

## Customizing Target Browsers

Next.js allows you to configure the target browsers for Autoprefixer and compiled CSS features through Browserslist.

To customize Browserslist, create a `browserslist` key in your `package.json`:

```json
{
  "browserslist": [">0.3%", "not dead", "not op_mini all"]
}
```

## CSS Modules

No configuration is needed to support CSS Modules. To enable CSS Modules for a file, rename the file to have the extension `.module.css`.

## Customizing Plugins

**Warning**: When you define a custom PostCSS configuration file, Next.js completely disables the default behavior. Be sure to manually configure all the features you need compiled, including Autoprefixer. You also need to install any plugins included in your custom configuration manually.

To customize the PostCSS configuration, create a `postcss.config.json` file in the root of your project.

This is the default configuration used by Next.js:

```json
{
  "plugins": [
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        "autoprefixer": {
          "flexbox": "no-2009"
        },
        "stage": 3,
        "features": {
          "custom-properties": false
        }
      }
    ]
  ]
}
```

Next.js also allows the file to be named `.postcssrc.json`, or to be read from the `postcss` key in `package.json`.

It is also possible to configure PostCSS with a `postcss.config.js` file, which is useful when you want to conditionally include plugins based on environment:

```js
module.exports = {
  plugins:
    process.env.NODE_ENV === 'production'
      ? [
          'postcss-flexbugs-fixes',
          [
            'postcss-preset-env',
            {
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
              features: {
                'custom-properties': false,
              },
            },
          ],
        ]
      : [
          // No transformations in development
        ],
}
```

Next.js also allows the file to be named `.postcssrc.js`.

Do not use `require()` to import the PostCSS Plugins. Plugins must be provided as strings.

If your `postcss.config.js` needs to support other non-Next.js tools in the same project, use the interoperable object-based format instead:

```js
module.exports = {
  plugins: {
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'custom-properties': false,
      },
    },
  },
}
```
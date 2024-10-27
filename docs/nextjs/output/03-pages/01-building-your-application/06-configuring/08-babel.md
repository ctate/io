# Babel

Extend the babel preset added by Next.js with your own configs.

## Examples

- Customizing babel configuration: GitHub repository for examples.

Next.js includes the `next/babel` preset to your app, which includes everything needed to compile React applications and server-side code. If you want to extend the default Babel configs, it's possible.

## Adding Presets and Plugins

To start, define a `.babelrc` file (or `babel.config.js`) in the root directory of your project. If such a file is found, it will be considered the source of truth and must define what Next.js needs, which is the `next/babel` preset.

Example `.babelrc` file:

```json
{
  "presets": ["next/babel"],
  "plugins": []
}
```

To add presets/plugins without configuring them:

```json
{
  "presets": ["next/babel"],
  "plugins": ["@babel/plugin-proposal-do-expressions"]
}
```

## Customizing Presets and Plugins

To add presets/plugins with custom configuration, modify the `next/babel` preset as follows:

```json
{
  "presets": [
    [
      "next/babel",
      {
        "preset-env": {},
        "transform-runtime": {},
        "styled-jsx": {},
        "class-properties": {}
      }
    ]
  ],
  "plugins": []
}
```

For more options for each config, refer to Babel's documentation.

**Good to know**:
- Next.js uses the current Node.js version for server-side compilations.
- The `modules` option on `"preset-env"` should be kept to `false`; otherwise, webpack code splitting is turned off.
# Supported Browsers

Next.js supports modern browsers with zero configuration:

- Chrome 64+
- Edge 79+
- Firefox 67+
- Opera 51+
- Safari 12+

## Browserslist

To target specific browsers or features, Next.js supports Browserslist configuration in your `package.json` file. The default configuration is:

```json
{
  "browserslist": [
    "chrome 64",
    "edge 79",
    "firefox 67",
    "opera 51",
    "safari 12"
  ]
}
```

## Polyfills

Next.js injects widely used polyfills, including:

- **fetch()** — Replacing: `whatwg-fetch` and `unfetch`.
- **URL** — Replacing: the `url` package (Node.js API).
- **Object.assign()** — Replacing: `object-assign`, `object.assign`, and `core-js/object/assign`.

Dependencies that include these polyfills will be eliminated from the production build to avoid duplication. Next.js will only load these polyfills for browsers that require them, minimizing bundle size.

### Custom Polyfills

For features not supported by your target browsers (e.g., IE 11), you need to add polyfills yourself. Add a top-level import for the specific polyfill in your Custom `<App>` or the individual component.

## JavaScript Language Features

Next.js allows the use of the latest JavaScript features, including:

- Async/await (ES2017)
- Object Rest/Spread Properties (ES2018)
- Dynamic `import()` (ES2020)
- Optional Chaining (ES2020)
- Nullish Coalescing (ES2020)
- Class Fields and Static Properties (ES2022)
- and more!

### TypeScript Features

Next.js has built-in TypeScript support.

### Customizing Babel Config (Advanced)

You can customize Babel configuration.
# crossOrigin

Use the `crossOrigin` option to add a crossOrigin tag on the `script` tags generated by `next/script`.

Use the `crossOrigin` option to add a `crossOrigin` attribute in all `<script>` tags generated by the `next/script` component and `next/head` components, and define how cross-origin requests should be handled.

```js
// next.config.js
module.exports = {
  crossOrigin: 'anonymous',
}
```

## Options

- `'anonymous'`: Adds `crossOrigin="anonymous"` attribute.
- `'use-credentials'`: Adds `crossOrigin="use-credentials"`.
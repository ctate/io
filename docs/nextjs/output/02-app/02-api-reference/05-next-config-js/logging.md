# Logging

Configure how data fetches are logged to the console when running Next.js in development mode.

You can configure the logging level and whether the full URL is logged to the console when running Next.js in development mode. Currently, `logging` only applies to data fetching using the `fetch` API. It does not yet apply to other logs inside of Next.js.

Example configuration to log full URLs:

```js
module.exports = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}
```

Any `fetch` requests that are restored from the Server Components HMR cache are not logged by default. However, this can be enabled by setting `logging.fetches.hmrRefreshes` to `true`.

Example configuration to enable logging for HMR refreshes:

```js
module.exports = {
  logging: {
    fetches: {
      hmrRefreshes: true,
    },
  },
}
```

You can also disable the development logging by setting `logging` to `false`.

Example configuration to disable logging:

```js
module.exports = {
  logging: false,
}
```
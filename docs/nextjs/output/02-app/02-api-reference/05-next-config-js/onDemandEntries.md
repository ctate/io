# onDemandEntries

Configure how Next.js will dispose and keep in memory pages created in development.

Next.js exposes options to control how the server disposes or retains built pages in development.

To change the defaults, open `next.config.js` and add the `onDemandEntries` config:

```js
module.exports = {
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
}
```
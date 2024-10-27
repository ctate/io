# reactMaxHeadersLength

The maximum length of the headers emitted by React and added to the response.

During static rendering, React can emit headers that can be added to the response. These headers can improve performance by allowing the browser to preload resources like fonts, scripts, and stylesheets. The default value is 6000, but you can override this value by configuring the `reactMaxHeadersLength` option in `next.config.js`:

```js
module.exports = {
  reactMaxHeadersLength: 1000,
}
```

Note: This option is only available in App Router.

Depending on the type of proxy between the browser and the server, headers can be truncated. If using a reverse proxy that doesn't support long headers, set a lower value to prevent truncation.
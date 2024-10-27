# compress

Next.js provides gzip compression to compress rendered content and static files, applicable only with the server target.

By default, Next.js uses `gzip` to compress rendered content and static files when using `next start` or a custom server. This optimization is for applications without pre-configured compression. If compression is already configured via a custom server, Next.js will not add compression.

**Good to know:**
- When hosting on Vercel, compression uses `brotli` first, then `gzip`.
- Check if compression is enabled and the algorithm used by examining the `Accept-Encoding` (browser accepted options) and `Content-Encoding` (currently used) headers in the response.

## Disabling compression

To disable **compression**, set the `compress` config option to `false`:

```js
module.exports = {
  compress: false,
}
```

Disabling compression is not recommended unless you have compression configured on your server, as it reduces bandwidth usage and improves application performance.

## Changing the compression algorithm

To change your compression algorithm, configure your custom server and set the `compress` option to `false` in your `next.config.js` file. For example, if using nginx and wanting to switch to `brotli`, set the `compress` option to `false` to allow nginx to handle compression.

**Good to know:**
- For Next.js applications on Vercel, compression is managed by Vercel's Edge Network, not Next.js.
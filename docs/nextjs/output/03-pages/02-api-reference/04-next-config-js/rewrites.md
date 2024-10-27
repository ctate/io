# Rewrites

Add rewrites to your Next.js app.

## Overview

Rewrites allow you to map an incoming request path to a different destination path. This can be useful for various scenarios, such as redirecting users to a different page or serving content from a different location without changing the URL in the browser.

## Configuration

To add rewrites to your Next.js application, you need to modify the `next.config.js` file. Here’s how to do it:

```javascript
module.exports = {
  async rewrites() {
    return [
      {
        source: '/old-path',
        destination: '/new-path', // Matched parameters can be used in the destination
      },
      {
        source: '/another-old-path/:slug*',
        destination: '/another-new-path/:slug*',
      },
    ]
  },
}
```

## Notes

- The `source` field defines the incoming request path.
- The `destination` field defines where the request should be redirected.
- You can use dynamic segments in the `source` and `destination` paths.
- Rewrites do not change the URL in the browser, making them ideal for maintaining SEO.

## Use Cases

- Redirecting users from outdated URLs to new ones.
- Serving content from a different path without exposing the internal structure.
- Creating clean URLs for API endpoints.

## Conclusion

Rewrites are a powerful feature in Next.js that enhance routing capabilities and improve user experience. By configuring them in `next.config.js`, you can easily manage how requests are handled in your application.
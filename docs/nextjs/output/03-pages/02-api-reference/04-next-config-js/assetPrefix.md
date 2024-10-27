# assetPrefix

Learn how to use the assetPrefix config option to configure your CDN.

## Overview

The `assetPrefix` option in your Next.js configuration allows you to specify a custom prefix for your static assets. This is particularly useful when you are serving your assets from a CDN or a different domain.

## Usage

To set the `assetPrefix`, add it to your `next.config.js` file:

```javascript
module.exports = {
  assetPrefix: 'https://cdn.example.com/',
}
```

Replace `https://cdn.example.com/` with the URL of your CDN.

## Considerations

- Ensure that the specified `assetPrefix` is accessible and correctly configured to serve your static assets.
- This option is beneficial for improving load times and reducing latency by leveraging a CDN.

## Conclusion

Using the `assetPrefix` configuration can enhance the performance of your Next.js application by optimizing the delivery of static assets.
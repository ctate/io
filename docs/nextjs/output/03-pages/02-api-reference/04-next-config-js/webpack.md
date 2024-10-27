# Custom Webpack Config

Learn how to customize the webpack config used by Next.js.

## Overview

Next.js allows you to customize the webpack configuration to suit your project's needs. This can be done by modifying the `next.config.js` file.

## Customizing Webpack

To customize the webpack configuration, you need to export a function from your `next.config.js` file. This function receives the default webpack configuration as an argument, which you can modify.

### Example

```javascript
// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    // Modify the config as needed
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
      };
    }
    return config;
  },
};
```

## Important Notes

- Ensure that any changes you make do not break the default behavior of Next.js.
- Test your configuration thoroughly to avoid issues during development and production builds.

## Additional Resources

For more information, refer to the Next.js documentation on customizing webpack.
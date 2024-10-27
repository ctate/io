# basePath

Use `basePath` to deploy a Next.js application under a sub-path of a domain.

## Overview

The `basePath` configuration option allows you to specify a sub-path for your Next.js application. This is useful when you want to serve your application from a specific path rather than the root of the domain.

## Configuration

To set the `basePath`, add it to your `next.config.js` file:

```javascript
module.exports = {
  basePath: '/your-sub-path',
}
```

Replace `/your-sub-path` with the desired sub-path for your application.

## Important Notes

- Ensure that your server is configured to handle requests to the specified `basePath`.
- All routes in your application will be prefixed with the `basePath`.
- Static assets should also be served from the `basePath`.

## Example

If your `basePath` is set to `/blog`, your application will be accessible at:

- `https://yourdomain.com/blog`
- All routes will be prefixed, e.g., `/blog/about`, `/blog/contact`.

## Conclusion

Using `basePath` is essential for deploying Next.js applications in sub-paths, ensuring proper routing and asset management.
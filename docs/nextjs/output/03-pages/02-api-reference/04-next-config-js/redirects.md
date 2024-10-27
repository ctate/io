# Redirects

Add redirects to your Next.js app.

## Overview

Redirects allow you to send users from one URL to another. This is useful for maintaining SEO and providing a better user experience.

## Configuration

To set up redirects in your Next.js application, you need to modify the `next.config.js` file. Here’s how to do it:

1. Open your `next.config.js` file.
2. Add a `redirects` function that returns an array of redirect objects.

### Example

```javascript
module.exports = {
  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true, // This is a permanent redirect (308)
      },
      {
        source: '/another-old-path',
        destination: '/another-new-path',
        permanent: false, // This is a temporary redirect (307)
      },
    ]
  },
}
```

## Redirect Object Properties

- **source**: The path to match for the redirect.
- **destination**: The path to redirect to.
- **permanent**: A boolean indicating if the redirect is permanent (true) or temporary (false).

## Notes

- Redirects are processed before rendering the page.
- Ensure that the source paths do not conflict with existing routes in your application.

For more information, refer to the Next.js documentation on redirects.
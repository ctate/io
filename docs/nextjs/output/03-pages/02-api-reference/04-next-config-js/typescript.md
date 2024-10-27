# TypeScript in Next.js

Next.js reports TypeScript errors by default. To opt-out of this behavior, follow the instructions below.

## Opting Out of TypeScript Error Reporting

To disable TypeScript error reporting in your Next.js application, you can modify your `next.config.js` file. Add the following configuration:

```javascript
module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
}
```

This setting will allow you to build your application without TypeScript errors halting the process. However, it is recommended to address TypeScript errors to maintain code quality.

## Important Notes

- Disabling TypeScript error reporting may lead to runtime errors that could have been caught during development.
- Regularly review and fix TypeScript errors to ensure the stability and reliability of your application.

For more information, refer to the official Next.js documentation.
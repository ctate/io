# onDemandEntries

Configure how Next.js will dispose and keep in memory pages created in development.

## Configuration Options

- **maxInactiveAge**: The maximum age (in milliseconds) of an inactive page before it is disposed of. Default is 1000 * 60 * 60 (1 hour).
  
- **pagesBufferLength**: The number of pages that are kept in memory. Default is 2.

## Usage

To configure onDemandEntries, add the following to your `next.config.js`:

```javascript
module.exports = {
  onDemandEntries: {
    maxInactiveAge: 1000 * 60 * 60, // 1 hour
    pagesBufferLength: 2,
  },
}
```

## Notes

- This configuration is only applicable in development mode.
- Adjusting these settings can help optimize memory usage during development, especially in larger applications.
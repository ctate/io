# exportPathMap

## Description
Customize the pages that will be exported as HTML files when using `next export`.

## Usage
The `exportPathMap` function allows you to define a mapping of your application's routes to the HTML files that will be generated during the export process. This is particularly useful for customizing the output of static pages.

## Example
```javascript
module.exports = {
  exportPathMap: async function(defaultPathMap) {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/contact': { page: '/contact' },
    }
  },
}
```

## Notes
- The function receives the default path map as an argument, which can be modified or replaced entirely.
- Ensure that all paths you want to export are included in the returned object.

## Additional Information
For more details, refer to the official Next.js documentation.
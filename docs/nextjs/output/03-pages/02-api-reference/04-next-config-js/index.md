# next.config.js Options

Learn about the options available in next.config.js for the Pages Router.

## Options Overview

next.config.js is a configuration file for Next.js applications. It allows developers to customize various aspects of their application.

### Key Options

1. **reactStrictMode**: Enables React's Strict Mode for the application.
2. **swcMinify**: Enables the SWC compiler for minifying JavaScript.
3. **images**: Configuration options for image optimization.
4. **env**: Define environment variables that can be accessed in the application.
5. **basePath**: Set a base path for the application.
6. **trailingSlash**: Control whether to add a trailing slash to URLs.
7. **i18n**: Internationalization settings for the application.

### Example Configuration

```javascript
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['example.com'],
  },
  env: {
    CUSTOM_KEY: 'value',
  },
  basePath: '/base',
  trailingSlash: true,
  i18n: {
    locales: ['en-US', 'fr'],
    defaultLocale: 'en-US',
  },
};
```

### Additional Information

For more detailed information on each option, refer to the official Next.js documentation.
# Optimize Third-Party Scripts in Next.js

Optimize third-party scripts in your Next.js application using the built-in `next/script` Component.

## Overview

The `next/script` component allows you to load third-party scripts efficiently, improving performance and user experience.

## Usage

To use the `next/script` component, import it into your Next.js application:

```javascript
import Script from 'next/script';
```

You can then add scripts to your pages as follows:

```javascript
<Script
  src="https://example.com/script.js"
  strategy="lazyOnload"
  onLoad={() => {
    console.log('Script loaded successfully');
  }}
/>
```

## Script Loading Strategies

The `next/script` component supports several loading strategies:

- **beforeInteractive**: Load the script before the page becomes interactive.
- **afterInteractive**: Load the script after the page becomes interactive.
- **lazyOnload**: Load the script during idle time after the page has loaded.

## Benefits

Using the `next/script` component provides several benefits:

- Improved performance by controlling when scripts are loaded.
- Reduced layout shifts and improved user experience.
- Easy integration with third-party libraries.

## Conclusion

Utilizing the `next/script` component in your Next.js application allows for optimized loading of third-party scripts, enhancing overall performance and user experience.
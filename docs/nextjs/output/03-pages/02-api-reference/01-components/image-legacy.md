# Image (Legacy)

Backwards compatible Image Optimization with the Legacy Image component.

## Overview

Starting with Next.js 13, the `next/image` component was rewritten for improved performance and developer experience. The old `next/image` was renamed to `next/legacy/image` for backwards compatibility.

## Comparison

Changes from `next/legacy/image` to `next/image`:

- Removes `<span>` wrapper around `<img>` for native computed aspect ratio.
- Adds support for canonical `style` prop.
- Removes `layout`, `objectFit`, and `objectPosition` props in favor of `style` or `className`.
- Removes `IntersectionObserver` for native lazy loading.
- Changes `alt` prop from optional to required.
- Changes `onLoadingComplete` callback to receive reference to `<img>` element.

## Required Props

### src

Must be a statically imported image file or a path string (absolute URL or internal path). 

- External URLs require configuration of remotePatterns.
- Animated images or unknown formats are served as-is.
- SVG format is blocked unless `unoptimized` or `dangerouslyAllowSVG` is enabled.

### width

Represents either rendered or original width in pixels, depending on `layout` and `sizes` properties. Required except for statically imported images or those with `layout="fill"`.

### height

Represents either rendered or original height in pixels, depending on `layout` and `sizes` properties. Required except for statically imported images or those with `layout="fill"`.

## Optional Props

### layout

Defines the layout behavior of the image:

- `intrinsic`: Scales down to fit the container.
- `fixed`: Sized to exact width and height.
- `responsive`: Scales to fit the container.
- `fill`: Grows to fill the container.

### loader

Custom function to resolve URLs, overriding the default loader in `next.config.js`.

### sizes

String providing width information at different breakpoints, affecting performance for `layout="responsive"` or `layout="fill"`.

### quality

Integer between `1` and `100` for image quality, defaulting to `75`.

### priority

When true, the image is considered high priority and lazy loading is disabled.

### placeholder

Placeholder while the image loads, can be `blur` or `empty`.

### Advanced Props

#### style

Allows passing CSS styles to the image element.

#### objectFit

Defines how the image fits into its parent container when using `layout="fill"`.

#### objectPosition

Defines how the image is positioned within its parent element when using `layout="fill"`.

#### onLoadingComplete

Callback invoked once the image is loaded.

#### loading

Defaults to `lazy`, can be set to `eager`.

#### blurDataURL

Data URL used as a placeholder before the image loads, effective with `placeholder="blur"`.

#### lazyBoundary

Bounding box for lazy loading detection, defaulting to `"200px"`.

#### lazyRoot

Ref pointing to the scrollable parent element, defaulting to `null`.

#### unoptimized

When true, the source image is served as-is. Defaults to `false`.

## Configuration Options

### Remote Patterns

Configuration required to use external images for security. Defined in `next.config.js`.

### Domains

Deprecated since Next.js 14 in favor of strict remotePatterns.

### Loader Configuration

Configure a cloud provider for image optimization in `next.config.js`.

### Built-in Loaders

Includes default, Vercel, Imgix, Cloudinary, Akamai, and custom loaders.

### Device Sizes

Specify device width breakpoints in `next.config.js`.

### Image Sizes

Specify image widths in `next.config.js`.

### Acceptable Formats

Default formats detected via the request's `Accept` header.

## Caching Behavior

Images are optimized dynamically and cached. Cache status can be determined by the `x-nextjs-cache` response header.

### Minimum Cache TTL

Configure TTL for cached optimized images in `next.config.js`.

### Disable Static Imports

Disable static image imports in `next.config.js`.

### Dangerously Allow SVG

Allows serving SVG images with the default Image Optimization API.

### contentDispositionType

Sets the `Content-Disposition` header for added protection.

### Animated Images

Bypasses Image Optimization for animated images, serving them as-is. Use `unoptimized` prop to bypass optimization explicitly.

## Version History

| Version   | Changes                                     |
| --------- | ------------------------------------------- |
| `v13.0.0` | `next/image` renamed to `next/legacy/image` |
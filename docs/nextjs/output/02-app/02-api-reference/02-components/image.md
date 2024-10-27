# Optimize Images in your Next.js Application using the built-in `next/image` Component

This API reference will help you understand how to use props and configuration options available for the Image Component. For features and usage, please see the Image Component page.

```jsx
import Image from 'next/image'

export default function Page() {
  return (
    <Image
      src="/profile.png"
      width={500}
      height={500}
      alt="Picture of the author"
    />
  )
}
```

## Props

Here's a summary of the props available for the Image Component:

| Prop                                      | Example                                  | Type            | Status     |
| ----------------------------------------- | ---------------------------------------- | --------------- | ---------- |
| `src`                                     | `src="/profile.png"`                     | String          | Required   |
| `width`                                   | `width={500}`                            | Integer (px)    | Required   |
| `height`                                  | `height={500}`                           | Integer (px)    | Required   |
| `alt`                                     | `alt="Picture of the author"`            | String          | Required   |
| `loader`                                  | `loader={imageLoader}`                   | Function        | -          |
| `fill`                                    | `fill={true}`                            | Boolean         | -          |
| `sizes`                                   | `sizes="(max-width: 768px) 100vw, 33vw"` | String          | -          |
| `quality`                                 | `quality={80}`                           | Integer (1-100) | -          |
| `priority`                                | `priority={true}`                        | Boolean         | -          |
| `placeholder`                             | `placeholder="blur"`                     | String          | -          |
| `style`                                   | `style={{objectFit: "contain"}}`         | Object          | -          |
| `onLoadingComplete`                       | `onLoadingComplete={img => done()}`     | Function        | Deprecated |
| `onLoad`                                  | `onLoad={event => done()}`              | Function        | -          |
| `onError`                                 | `onError={event => fail()}`             | Function        | -          |
| `loading`                                 | `loading="lazy"`                         | String          | -          |
| `blurDataURL`                             | `blurDataURL="data:image/jpeg..."`       | String          | -          |
| `overrideSrc`                             | `overrideSrc="/seo.png"`                 | String          | -          |

## Required Props

The Image Component requires the following properties: `src`, `alt`, `width`, and `height` (or `fill`).

```jsx
import Image from 'next/image'

export default function Page() {
  return (
    <div>
      <Image
        src="/profile.png"
        width={500}
        height={500}
        alt="Picture of the author"
      />
    </div>
  )
}
```

### `src`

Must be one of the following:

- A statically imported image file
- A path string (absolute external URL or internal path)

### `width`

Represents the intrinsic image width in pixels. Required, except for statically imported images or images with the `fill` property.

### `height`

Represents the intrinsic image height in pixels. Required, except for statically imported images or images with the `fill` property.

### `alt`

Describes the image for screen readers and search engines. Should contain text that could replace the image without changing the meaning of the page. If the image is purely decorative, the `alt` property should be an empty string (`alt=""`).

## Optional Props

### `loader`

A custom function used to resolve image URLs.

### `fill`

A boolean that causes the image to fill the parent element. The parent element must assign `position: "relative"`, `position: "fixed"`, or `position: "absolute"` style.

### `sizes`

A string that provides information about how wide the image will be at different breakpoints.

### `quality`

The quality of the optimized image, an integer between `1` and `100`. Defaults to `75`.

### `priority`

When true, the image will be considered high priority and preload. Lazy loading is automatically disabled for images using priority.

### `placeholder`

A placeholder to use while the image is loading. Possible values are `blur`, `empty`, or `data:image/...`. Defaults to `empty`.

### `style`

Allows passing CSS styles to the underlying image element.

### `onLoad`

A callback function invoked once the image is completely loaded.

### `onError`

A callback function invoked if the image fails to load.

### `loading`

The loading behavior of the image. Defaults to `lazy`.

### `blurDataURL`

A Data URL to be used as a placeholder image before the `src` image successfully loads.

### `unoptimized`

When true, the source image will be served as-is instead of changing quality, size, or format. Defaults to `false`.

### `overrideSrc`

Overrides the `src` attribute generated for SEO purposes.

### `decoding`

A hint to the browser indicating if it should wait for the image to be decoded before presenting other content updates. Defaults to `async`.

## Configuration Options

### `localPatterns`

Configure `localPatterns` in your `next.config.js` file to allow specific paths to be optimized.

### `remotePatterns`

Configuration required to use external images to protect your application from malicious users.

### `domains`

Deprecated since Next.js 14 in favor of strict `remotePatterns`.

### `loaderFile`

If using a cloud provider to optimize images, configure the `loaderFile` in your `next.config.js`.

## Advanced

### `deviceSizes`

Specify a list of device width breakpoints using the `deviceSizes` property in `next.config.js`.

### `imageSizes`

Specify a list of image widths using the `images.imageSizes` property in your `next.config.js`.

### `formats`

Configure the default image formats for the Image Optimization API.

## Caching Behavior

Images are optimized dynamically upon request and stored in the cache. The cache status can be determined by reading the value of the `x-nextjs-cache` response header.

### `minimumCacheTTL`

Configure the Time to Live (TTL) in seconds for cached optimized images.

### `disableStaticImages`

Disable the feature that allows importing static files.

### `dangerouslyAllowSVG`

Allow serving SVG images with the default Image Optimization API.

### `contentDispositionType`

Set the `Content-Disposition` header for added protection.

## Animated Images

The default loader will automatically bypass Image Optimization for animated images.

## Responsive Images

The default generated `srcset` contains `1x` and `2x` images. You can render a responsive image using various methods.

### Theme Detection CSS

Create a component that wraps two `<Image>` components to display a different image for light and dark mode.

### getImageProps

Call `getImageProps()` to get the props that would be passed to the underlying `<img>` element.

## Known Browser Bugs

This `next/image` component uses browser native lazy loading, which may fallback to eager loading for older browsers. 

## Version History

| Version    | Changes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `v15.0.0`  | `decoding` prop added. `contentDispositionType` configuration default changed to `attachment`.                                                                                                                                                                                                                                                                                                                                                                                                                |
| `v14.2.0`  | `overrideSrc` prop added.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `v14.1.0`  | `getImageProps()` is stable.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `v14.0.0`  | `onLoadingComplete` prop and `domains` config deprecated.                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `v13.4.14` | `placeholder` prop support for `data:/image...`                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `v13.2.0`  | `contentDispositionType` configuration added.                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `v13.0.6`  | `ref` prop added.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `v13.0.0`  | The `next/image` import was renamed to `next/legacy/image`. The `next/future/image` import was renamed to `next/image`.                                                                                                                                                                                                                                                                                                                                                                                     |
| `v12.3.0`  | `remotePatterns` and `unoptimized` configuration is stable.                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `v12.2.0`  | Experimental `remotePatterns` and experimental `unoptimized` configuration added.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `v12.1.1`  | `style` prop added.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `v12.1.0`  | `dangerouslyAllowSVG` and `contentSecurityPolicy` configuration added.                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `v12.0.9`  | `lazyRoot` prop added.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `v12.0.0`  | `formats` configuration added.<br/>AVIF support added.                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `v11.1.0`  | `onLoadingComplete` and `lazyBoundary` props added.                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `v11.0.0`  | `src` prop support for static import.<br/>`placeholder` prop added.<br/>`blurDataURL` prop added.                                                                                                                                                                                                                                                                                                                                                                                                             |
| `v10.0.5`  | `loader` prop added.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `v10.0.1`  | `layout` prop added.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `v10.0.0`  | `next/image` introduced.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
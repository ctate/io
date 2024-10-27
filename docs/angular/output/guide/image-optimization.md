# Getting started with NgOptimizedImage

The `NgOptimizedImage` directive simplifies the adoption of performance best practices for loading images. It prioritizes the loading of the Largest Contentful Paint (LCP) image by:

- Automatically setting the `fetchpriority` attribute on the `<img>` tag
- Lazy loading other images by default
- Generating a preconnect link tag in the document head
- Generating a `srcset` attribute
- Creating a preload hint if the app uses SSR

Additionally, `NgOptimizedImage` enforces image best practices, including:

- Using image CDN URLs for optimizations
- Preventing layout shifts by requiring `width` and `height`
- Warning for incorrect `width` or `height`
- Warning for visually distorted images

**Note:** The `NgOptimizedImage` directive is stable in Angular version 15 and backported to versions 13.4.0 and 14.3.0.

## Getting Started

1. **Import `NgOptimizedImage` directive**  
   Import from `@angular/common`:

   ```typescript
   import { NgOptimizedImage } from '@angular/common';
   ```

   Include it in the `imports` array of a standalone component or NgModule:

   ```typescript
   imports: [
     NgOptimizedImage,
     // ...
   ],
   ```

2. **(Optional) Set up a Loader**  
   An image loader is not required but enhances performance features, including automatic `srcset`s. Refer to the Configuring an Image Loader section for guidance.

3. **Enable the directive**  
   Replace the image's `src` attribute with `ngSrc`:

   ```html
   <img ngSrc="cat.jpg">
   ```

   For built-in third-party loaders, omit the base URL path from `src`.

4. **Mark images as `priority`**  
   Always mark the LCP image as `priority`:

   ```html
   <img ngSrc="cat.jpg" width="400" height="200" priority>
   ```

   This applies optimizations like `fetchpriority=high` and `loading=eager`.

5. **Include Width and Height**  
   Specify `width` and `height` to prevent layout shifts:

   ```html
   <img ngSrc="cat.jpg" width="400" height="200">
   ```

   For responsive images, use the intrinsic size of the image file.

## Using `fill` mode

To have an image fill a containing element, use the `fill` attribute:

```html
<img ngSrc="cat.jpg" fill>
```

Use the `object-fit` CSS property to control how the image fills its container. Ensure the parent element is styled with `position: "relative"`, `position: "fixed"`, or `position: "absolute"`.

## How to migrate your background image

1. Remove the `background-image` style from the containing element.
2. Ensure the containing element has `position: "relative"`, `position: "fixed"`, or `position: "absolute"`.
3. Create a new image element as a child of the containing element using `ngSrc`.
4. Add the `fill` attribute without `height` and `width`.
5. If this image might be your LCP element, add the `priority` attribute.

## Using placeholders

### Automatic placeholders

Add the `placeholder` attribute to display a low-resolution placeholder:

```html
<img ngSrc="cat.jpg" width="400" height="200" placeholder>
```

The default size for generated placeholders is 30px wide, adjustable via the `IMAGE_CONFIG` provider.

### Data URL placeholders

Specify a placeholder using a base64 data URL:

```html
<img ngSrc="cat.jpg" width="400" height="200" placeholder="data:image/png;base64,iVBORw0K...">
```

Keep base64 placeholders under 4KB to avoid increasing bundle size.

### Non-blurred placeholders

To render a placeholder without blur, provide a `placeholderConfig` argument:

```html
<img ngSrc="cat.jpg" width="400" height="200" placeholder [placeholderConfig]="{blur: false}">
```

## Adjusting image styling

If `width` and `height` attributes cause distortion, add `height: auto` or `width: auto` to your styles. Consider using `fill` mode for better control.

## Performance Features

### Add resource hints

Automatically generated preconnect links ensure quick loading of the LCP image. If not generated, manually add a preconnect link in the document head:

```html
<link rel="preconnect" href="https://my.cdn.origin" />
```

### Request images at the correct size with automatic `srcset`

`NgOptimizedImage` generates an appropriate `srcset` based on the `sizes` attribute.

#### Fixed-size images

For fixed-size images, no `sizes` attribute is needed. Example `srcset`:

```html
<img ... srcset="image-400w.jpg 1x, image-800w.jpg 2x">
```

#### Responsive images

Define a `sizes` attribute for responsive images:

```html
<img ngSrc="cat.jpg" width="400" height="200" sizes="100vw">
```

### Disabling automatic srcset generation

To disable `srcset` generation for a single image, add the `disableOptimizedSrcset` attribute:

```html
<img ngSrc="about.jpg" disableOptimizedSrcset>
```

### Disabling image lazy loading

Set the `loading` attribute to disable lazy loading for non-priority images:

```html
<img ngSrc="cat.jpg" width="400" height="200" loading="eager">
```

### Advanced 'sizes' values

Use media query syntax in the `sizes` attribute for varying widths:

```html
<img ngSrc="cat.jpg" width="400" height="200" sizes="(max-width: 768px) 100vw, 50vw">
```

## Configuring an image loader for `NgOptimizedImage`

A loader generates an image transformation URL. `NgOptimizedImage` provides a generic loader and supports third-party image services.

### Built-in Loaders

To use a third-party image service loader, add the provider factory to the `providers` array:

```typescript
providers: [
  provideImgixLoader('https://my.base.url/'),
],
```

### Custom Loaders

Provide a custom loader function using the `IMAGE_LOADER` DI token:

```typescript
providers: [
  {
    provide: IMAGE_LOADER,
    useValue: (config: ImageLoaderConfig) => {
      return `https://example.com/images?src=${config.src}&width=${config.width}`;
    },
  },
],
```

## Frequently Asked Questions

### Does NgOptimizedImage support the `background-image` css property?

No, but it accommodates having an image as the background of another element. Refer to the migration section for details.

### Why can't I use `src` with `NgOptimizedImage`?

The `ngSrc` attribute is used to prevent the browser from eagerly downloading the image before optimizations are applied.

### Why is a preconnect element not being generated for my image domain?

Preconnect generation relies on static analysis. Ensure the image domain is directly included in the loader parameter.

### Can I use two different image domains in the same page?

Yes, by writing a custom image loader that uses the `loaderParams` property to specify which image CDN to use.

### Can you add a new built-in loader for my preferred CDN?

Currently, no new built-in loaders are planned. Developers are encouraged to publish additional loaders as third-party packages.

### Can I use this with the `<picture>` tag?

No, but this feature is on the roadmap.

### How do I find my LCP image with Chrome DevTools?

1. Use the performance tab to start profiling and reload the page.
2. Select "LCP" in the timings section.
3. Find the LCP element in the "related node" row.
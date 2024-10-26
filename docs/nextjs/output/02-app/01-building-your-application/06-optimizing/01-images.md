# Image Optimization
Optimize your images with the built-in `next/image` component.

## Introduction
According to [Web Almanac](https://almanac.httparchive.org), images account for a huge portion of the typical website’s [page weight](https://almanac.httparchive.org/en/2022/page-weight#content-type-and-file-formats) and can have a sizable impact on your website's [LCP performance](https://almanac.httparchive.org/en/2022/performance#lcp-image-optimization).

## Usage
```js
import Image from 'next/image'
```

### Local Images
To use a local image, `import` your `.jpg`, `.png`, or `.webp` image files.

```jsx
import Image from 'next/image'
import profilePic from './me.png'

export default function Page() {
  return (
    <Image
      src={profilePic}
      alt="Picture of the author"
    />
  )
}
```

### Remote Images
To use a remote image, the `src` property should be a URL string.

```jsx
import Image from 'next/image'

export default function Page() {
  return (
    <Image
      src="https://s3.amazonaws.com/my-bucket/profile.png"
      alt="Picture of the author"
      width={500}
      height={500}
    />
  )
}
```

## Priority
You should add the `priority` property to the image that will be the [Largest Contentful Paint (LCP) element](https://web.dev/lcp/#what-elements-are-considered) for each page.

```jsx
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <h1>My Homepage</h1>
      <Image
        src="/me.png"
        alt="Picture of the author"
        width={500}
        height={500}
        priority
      />
      <p>Welcome to my homepage!</p>
    </>
  )
}
```

## Image Sizing
One of the ways that images most commonly hurt performance is through _layout shift_, where the image pushes other elements around on the page as it loads in.

```jsx
import Image from 'next/image'
import mountains from '../public/mountains.jpg'

export default function Responsive() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Image
        alt="Mountains"
        src={mountains}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    </div>
  )
}
```

## Styling
Styling the Image component is similar to styling a normal `<img>` element, but there are a few guidelines to keep in mind:

- Use `className` or `style`, not `styled-jsx`.
- When using `fill`, the parent element must have `position: relative`
- When using `fill`, the parent element must have `display: block`

## Examples
### Responsive

```jsx
import Image from 'next/image'
import mountains from '../public/mountains.jpg'

export default function Responsive() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Image
        alt="Mountains"
        src={mountains}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    </div>
  )
}
```

### Fill Container

```jsx
import Image from 'next/image'
import mountains from '../public/mountains.jpg'

export default function Fill() {
  return (
    <div
      style={{
        display: 'grid',
        gridGap: '8px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, auto))',
      }}
    >
      <div style={{ position: 'relative', height: '400px' }}>
        <Image
          alt="Mountains"
          src={mountains}
          fill
          sizes="(min-width: 808px) 50vw, 100vw"
          style={{
            objectFit: 'cover', // cover, contain, none
          }}
        />
      </div>
      {/* And more images in the grid... */}
    </div>
  )
}
```

### Background Image

```jsx
import Image from 'next/image'
import mountains from '../public/mountains.jpg'

export default function Background() {
  return (
    <Image
      alt="Mountains"
      src={mountains}
      placeholder="blur"
      quality={100}
      fill
      sizes="100vw"
      style={{
        objectFit: 'cover',
      }}
    />
  )
}
```

## Other Properties
[**View all properties available to the `next/image` component.**](https://nextjs.org/docs/api-reference/next/image)

## Configuration
The `next/image` component and Next.js Image Optimization API can be configured in the [`next.config.js` file](https://nextjs.org/docs/api-reference/next.config.js). These configurations allow you to [enable remote images](https://nextjs.org/docs/api-reference/next/image#remotepatterns), [define custom image breakpoints](https://nextjs.org/docs/api-reference/next/image#devicesizes), [change caching behavior](https://nextjs.org/docs/api-reference/next/image#caching-behavior) and more.

[**Read the full image configuration documentation for more information.**](https://nextjs.org/docs/api-reference/next/image#configuration-options)
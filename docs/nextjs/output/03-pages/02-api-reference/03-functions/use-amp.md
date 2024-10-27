# useAmp

Enable AMP in a page, and control the way Next.js adds AMP to the page with the AMP config.

## Examples

- AMP example: GitHub repository for Next.js examples.

AMP support is one of our advanced features. For more information, refer to the AMP documentation.

To enable AMP, add the following config to your page:

```jsx
export const config = { amp: true }
```

The `amp` config accepts the following values:

- `true`: The page will be AMP-only.
- `'hybrid'`: The page will have two versions, one with AMP and another one with HTML.

## AMP First Page

Example of an AMP-only page:

```jsx
export const config = { amp: true }

function About(props) {
  return <h3>My AMP About Page!</h3>
}

export default About
```

Characteristics of an AMP-only page:

- No Next.js or React client-side runtime.
- Automatically optimized with AMP Optimizer, improving performance by up to 42%.
- User-accessible (optimized) version and a search-engine indexable (unoptimized) version.

## Hybrid AMP Page

Example of a hybrid AMP page:

```jsx
import { useAmp } from 'next/amp'

export const config = { amp: 'hybrid' }

function About(props) {
  const isAmp = useAmp()

  return (
    <div>
      <h3>My AMP About Page!</h3>
      {isAmp ? (
        <amp-img
          width="300"
          height="300"
          src="/my-img.jpg"
          alt="a cool image"
          layout="responsive"
        />
      ) : (
        <img width="300" height="300" src="/my-img.jpg" alt="a cool image" />
      )}
    </div>
  )
}

export default About
```

Characteristics of a hybrid AMP page:

- Rendered as traditional HTML (default) and AMP HTML (by adding `?amp=1` to the URL).
- AMP version has valid optimizations applied with AMP Optimizer for search-engine indexability.

The page uses `useAmp`, a React Hook that returns `true` if the page is using AMP, and `false` otherwise.
# noImgElement

Prevent usage of `<img>` element in a Next.js project.

**Diagnostic Category: `lint/nursery/noImgElement`**

**Since**: `v1.9.4`

This rule is part of the nursery group.

Sources: 
- Same as: `@next/no-img-element`

Using the `<img>` element can result in slower Largest Contentful Paint (LCP)
and higher bandwidth usage, as it lacks the optimizations provided by the `<Image />`
component from `next/image`. Next.js's `<Image />` automatically optimizes images
by serving responsive sizes and using modern formats, improving performance and reducing bandwidth.

If your project is self-hosted, ensure that you have sufficient storage and have
installed the `sharp` package to support optimized images. When deploying to managed
hosting providers, be aware of potential additional costs or usage.

## Examples

### Invalid

```jsx
<img alt="Foo" />
```

```jsx
<div>
  <img alt="Foo" />
</div>
```

### Valid

```jsx
<img />
```

```jsx
<Image src="https://example.com/hero.jpg" />
```

```jsx
<picture>
  <source srcSet="https://example.com/hero.avif" type="image/avif" />
  <source srcSet="https://example.com/hero.webp" type="image/webp" />
  <img src="https://example.com/hero.jpg" />
</picture>
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options
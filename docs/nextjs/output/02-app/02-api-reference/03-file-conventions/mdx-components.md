# mdx-components.js

API reference for the mdx-components.js file.

The `mdx-components.js|tsx` file is **required** to use `@next/mdx` with App Router and will not work without it. Additionally, you can use it to customize styles.

Use the file `mdx-components.tsx` (or `.js`) in the root of your project to define MDX Components. For example, at the same level as `pages` or `app`, or inside `src` if applicable.

```tsx
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}
```

```js
export function useMDXComponents(components) {
  return {
    ...components,
  }
}
```

## Exports

### `useMDXComponents` function

The file must export a single function, either as a default export or named `useMDXComponents`.

```tsx
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}
```

```js
export function useMDXComponents(components) {
  return {
    ...components,
  }
}
```

## Params

### `components`

When defining MDX Components, the export function accepts a single parameter, `components`. This parameter is an instance of `MDXComponents`.

- The key is the name of the HTML element to override.
- The value is the component to render instead.

Good to know: Remember to pass all other components (i.e. `...components`) that do not have overrides.

## Version History

| Version   | Changes              |
| --------- | -------------------- |
| `v13.1.2` | MDX Components added |
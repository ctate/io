# default.js

## Description
API Reference for the default.js file.

## Overview
The `default.js` file is used to render a fallback within Parallel Routes when Next.js cannot recover a slot's active state after a full-page load.

During soft navigation, Next.js tracks the active state (subpage) for each slot. However, for hard navigations (full-page load), Next.js cannot recover the active state. In this case, a `default.js` file can be rendered for subpages that don't match the current URL.

### Folder Structure Example
The `@team` slot has a `settings` page, but `@analytics` does not.

When navigating to `/settings`, the `@team` slot will render the `settings` page while maintaining the currently active page for the `@analytics` slot.

On refresh, Next.js will render a `default.js` for `@analytics`. If `default.js` doesn't exist, a `404` is rendered instead.

Additionally, since `children` is an implicit slot, you also need to create a `default.js` file to render a fallback for `children` when Next.js cannot recover the active state of the parent page.

## Reference

### `params` (optional)
A promise that resolves to an object containing the dynamic route parameters from the root segment down to the slot's subpages. 

Example:
```tsx
export default async function Default({
  params,
}: {
  params: Promise<{ artist: string }>
}) {
  const artist = (await params).artist
}
```

```jsx
export default async function Default({ params }) {
  const artist = (await params).artist
}
```

| Example                                    | URL          | `params`                                     |
| ------------------------------------------ | ------------ | -------------------------------------------- |
| `app/[artist]/@sidebar/default.js`         | `/zack`      | `Promise<{ artist: 'zack' }>`                |
| `app/[artist]/[album]/@sidebar/default.js` | `/zack/next` | `Promise<{ artist: 'zack', album: 'next' }>` |

- Since the `params` prop is a promise, you must use `async/await` or React's `use` function to access the values.
  - In version 14 and earlier, `params` was a synchronous prop. To help with backwards compatibility, you can still access it synchronously in Next.js 15, but this behavior will be deprecated in the future.
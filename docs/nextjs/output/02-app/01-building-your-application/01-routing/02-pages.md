# Pages

A page is UI that is **unique** to a route. You can define a page by default exporting a component from a `page.js` file.

## Creating a Page

To create your `index` page, add the `page.js` file inside the `app` directory.

### Example

```tsx
// `app/page.tsx` is the UI for the `/` URL
export default function Page() {
  return <h1>Hello, Home page!</h1>
}
```

```jsx
// `app/page.js` is the UI for the `/` URL
export default function Page() {
  return <h1>Hello, Home page!</h1>
}
```

## Creating Further Pages

To create further pages, create a new folder and add the `page.js` file inside it. For example, to create a page for the `/dashboard` route, create a new folder called `dashboard`, and add the `page.js` file inside it.

### Example

```tsx
// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Page() {
  return <h1>Hello, Dashboard Page!</h1>
}
```

```jsx
// `app/dashboard/page.js` is the UI for the `/dashboard` URL
export default function Page() {
  return <h1>Hello, Dashboard Page!</h1>
}
```

## Good to Know

* The `.js`, `.jsx`, or `.tsx` file extensions can be used for Pages.
* A page is always the leaf of the route subtree.
* A `page.js` file is required to make a route segment publicly accessible.
* Pages are Server Components by default, but can be set to a Client Component.
* Pages can fetch data.
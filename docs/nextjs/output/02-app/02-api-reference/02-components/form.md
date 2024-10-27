# Form

Learn how to use the `<Form>` component to handle form submissions and search params updates with client-side navigation.

The `<Form>` component extends the HTML `<form>` element to provide prefetching of loading UI, client-side navigation on submission, and progressive enhancement. It's useful for forms that update URL search params, reducing boilerplate code.

## Basic Usage

```tsx
import Form from 'next/form'

export default function Page() {
  return (
    <Form action="/search">
      <input name="query" />
      <button type="submit">Submit</button>
    </Form>
  )
}
```

```jsx
import Form from 'next/form'

export default function Search() {
  return (
    <Form action="/search">
      <input name="query" />
      <button type="submit">Submit</button>
    </Form>
  )
}
```

## Reference

The behavior of the `<Form>` component depends on whether the `action` prop is a string or a function.

- When `action` is a **string**, the `<Form>` behaves like a native HTML form using a **`GET`** method. The form data is encoded into the URL as search params, and when submitted, it navigates to the specified URL. Next.js:
  - Prefetches the path when the form becomes visible, preloading shared UI, resulting in faster navigation.
  - Performs client-side navigation instead of a full page reload, retaining shared UI and client-side state.
  
- When `action` is a **function** (Server Action), `<Form>` behaves like a React form, executing the action upon submission.

### `action` (string) Props

When `action` is a string, the `<Form>` component supports the following props:

| Prop      | Example            | Type                            | Required |
| --------- | ------------------ | ------------------------------- | -------- |
| `action`  | `action="/search"` | `string` (URL or relative path) | Yes      |
| `replace` | `replace={false}`  | `boolean`                       | -        |
| `scroll`  | `scroll={true}`    | `boolean`                       | -        |

- **`action`**: The URL or path to navigate to when the form is submitted. An empty string will navigate to the same route with updated search params.
- **`replace`**: Replaces the current history state instead of pushing a new one. Default is `false`.
- **`scroll`**: Controls the scroll behavior during navigation. Defaults to `true`.

### `action` (function) Props

When `action` is a function, the `<Form>` component supports the following prop:

| Prop     | Example             | Type                       | Required |
| -------- | ------------------- | -------------------------- | -------- |
| `action` | `action={myAction}` | `function` (Server Action) | Yes      |

- **`action`**: The Server Action to be called when the form is submitted.

> **Good to know**: When `action` is a function, the `replace` and `scroll` props are ignored.

### Caveats

- **`formAction`**: Can be used in a `<button>` or `<input type="submit">` to override the `action` prop. This approach doesn't support prefetching.
- **`onSubmit`**: Can handle form submission logic, but calling `event.preventDefault()` will override `<Form>` behavior.
- **`method`, `encType`, `target`**: Not supported as they override `<Form>` behavior. Use the HTML `<form>` element instead.
- **`<input type="file">`**: Submitting this input type with a string action will match browser behavior by submitting the filename instead of the file object.

## Examples

### Search Form

Create a search form that navigates to a search results page:

```tsx
import Form from 'next/form'

export default function Page() {
  return (
    <Form action="/search">
      <input name="query" />
      <button type="submit">Submit</button>
    </Form>
  )
}
```

When the user submits the form, the data will be encoded into the URL as search params, e.g., `/search?query=abc`.

On the results page, access the query using the `searchParams` prop to fetch data.

```tsx
import { getSearchResults } from '@/lib/search'

export default async function SearchPage({ searchParams }) {
  const results = await getSearchResults(searchParams.query)
  return <div>...</div>
}
```

### Mutations with Server Actions

Perform mutations by passing a function to the `action` prop.

```tsx
import Form from 'next/form'
import { createPost } from '@/posts/actions'

export default function Page() {
  return (
    <Form action={createPost}>
      <input name="title" />
      <button type="submit">Create Post</button>
    </Form>
  )
}
```

After a mutation, redirect to the new resource using the `redirect` function.

```tsx
'use server'
import { redirect } from 'next/navigation'

export async function createPost(formData) {
  // Create a new post
  redirect(`/posts/${data.id}`)
}
```

In the new page, fetch data using the `params` prop.

```tsx
import { getPost } from '@/posts/data'

export default async function PostPage({ params }) {
  const data = await getPost(params.id)
  return <div><h1>{data.title}</h1></div>
}
```
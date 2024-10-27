# useSelectedLayoutSegments

**Description**: API Reference for the useSelectedLayoutSegments hook.

`useSelectedLayoutSegments` is a **Client Component** hook that lets you read the active route segments **below** the Layout it is called from. It is useful for creating UI in parent Layouts that need knowledge of active child segments such as breadcrumbs.

## Example Usage

```tsx
'use client'

import { useSelectedLayoutSegments } from 'next/navigation'

export default function ExampleClientComponent() {
  const segments = useSelectedLayoutSegments()

  return (
    <ul>
      {segments.map((segment, index) => (
        <li key={index}>{segment}</li>
      ))}
    </ul>
  )
}
```

```jsx
'use client'

import { useSelectedLayoutSegments } from 'next/navigation'

export default function ExampleClientComponent() {
  const segments = useSelectedLayoutSegments()

  return (
    <ul>
      {segments.map((segment, index) => (
        <li key={index}>{segment}</li>
      ))}
    </ul>
  )
}
```

**Good to know**:
- Since `useSelectedLayoutSegments` is a Client Component hook, and Layouts are Server Components by default, `useSelectedLayoutSegments` is usually called via a Client Component that is imported into a Layout.
- The returned segments include Route Groups, which you might not want to be included in your UI. You can use the `filter()` array method to remove items that start with a bracket.

## Parameters

```tsx
const segments = useSelectedLayoutSegments(parallelRoutesKey?: string)
```

`useSelectedLayoutSegments` _optionally_ accepts a `parallelRoutesKey`, which allows you to read the active route segment within that slot.

## Returns

`useSelectedLayoutSegments` returns an array of strings containing the active segments one level down from the layout the hook was called from, or an empty array if none exist.

**Example**: Given the Layouts and URLs below, the returned segments would be:

| Layout                    | Visited URL           | Returned Segments           |
| ------------------------- | --------------------- | --------------------------- |
| `app/layout.js`           | `/`                   | `[]`                        |
| `app/layout.js`           | `/dashboard`          | `['dashboard']`             |
| `app/layout.js`           | `/dashboard/settings` | `['dashboard', 'settings']` |
| `app/dashboard/layout.js` | `/dashboard`          | `[]`                        |
| `app/dashboard/layout.js` | `/dashboard/settings` | `['settings']`              |

## Version History

| Version   | Changes                                 |
| --------- | --------------------------------------- |
| `v13.0.0` | `useSelectedLayoutSegments` introduced. |
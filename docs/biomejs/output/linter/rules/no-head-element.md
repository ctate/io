# noHeadElement

Prevent usage of `<head>` element in a Next.js project.

**Diagnostic Category: `lint/nursery/noHeadElement`**

**Since**: `v1.9.4`

This rule is part of the nursery group.

Sources: 
- Same as: `@next/no-head-element`

Next.js provides a specialized `<Head />` component from `next/head` that manages
the `<head>` tag for optimal server-side rendering, client-side navigation, and
automatic deduplication of tags such as `<meta>` and `<title>`.

This rule only checks files that are outside of the `app/` directory, as it's typically
handled differently in Next.js.

## Examples

### Invalid

```jsx
function Index() {
  return (
    <head>
      <title>Invalid</title>
    </head>
  )
}
```

```text
code-block.jsx:2:11 lint/nursery/noHeadElement 
 Don't use <head> element.
 
1 │ function Index() {
2 │   return (
 │          ^
 │          ^
 │          ^
 │          ^
 │          ^
3 │     <head>
 │     <title>Invalid</title>
4 │     </head>
 
 Using the <head> element can cause unexpected behavior in a Next.js application. Use <Head /> from next/head instead.
```

### Valid

```jsx
import Head from 'next/head'

function Index() {
  return (
    <Head>
      <title>All good!</title>
    </Head>
  )
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options
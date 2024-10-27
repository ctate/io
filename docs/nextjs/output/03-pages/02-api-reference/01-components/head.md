# Add Custom Elements to the Head of Your Page

Add custom elements to the `head` of your page with the built-in Head component.

## Examples

- Head Elements: github.com/vercel/next.js/tree/canary/examples/head-elements
- Layout Component: github.com/vercel/next.js/tree/canary/examples/layout-component

## Usage

We expose a built-in component for appending elements to the `head` of the page:

```jsx
import Head from 'next/head'

function IndexPage() {
  return (
    <div>
      <Head>
        <title>My page title</title>
      </Head>
      <p>Hello world!</p>
    </div>
  )
}

export default IndexPage
```

## Avoid Duplicated Tags

To avoid duplicate tags in your `head`, use the `key` property to ensure the tag is only rendered once:

```jsx
import Head from 'next/head'

function IndexPage() {
  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Head>
        <meta property="og:title" content="My new title" key="title" />
      </Head>
      <p>Hello world!</p>
    </div>
  )
}

export default IndexPage
```

In this case, only the second `<meta property="og:title" />` is rendered. `meta` tags with duplicate `key` attributes are automatically handled.

**Good to know**: `<title>` and `<base>` tags are automatically checked for duplicates by Next.js, so using `key` is not necessary for these tags.

The contents of `head` get cleared upon unmounting the component, so ensure each page completely defines what it needs in `head`, without making assumptions about what other pages added.

## Use Minimal Nesting

`title`, `meta`, or any other elements (e.g., `script`) need to be contained as **direct** children of the `Head` element, or wrapped into a maximum of one level of `<React.Fragment>` or arrays—otherwise, the tags won't be correctly picked up on client-side navigations.

## Use next/script for Scripts

We recommend using `next/script` in your component instead of manually creating a `<script>` in `next/head`.

## No html or body Tags

You **cannot** use `<Head>` to set attributes on `<html>` or `<body>` tags. This will result in a `next-head-count is missing` error. `next/head` can only handle tags inside the HTML `<head>` tag.
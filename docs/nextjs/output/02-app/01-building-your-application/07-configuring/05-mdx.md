# Markdown and MDX

Learn how to configure MDX and use it in your Next.js apps.

Markdown is a lightweight markup language used to format text. It allows you to write using plain text syntax and convert it to structurally valid HTML. It's commonly used for writing content on websites and blogs.

Example:

```md
I **love** using Next.js
```

Output:

```html
<p>I <strong>love</strong> using <a href="#">Next.js</a></p>
```

MDX is a superset of markdown that lets you write JSX directly in your markdown files. It allows for dynamic interactivity and embedding React components within your content.

Next.js supports both local MDX content and remote MDX files fetched dynamically on the server. The Next.js plugin transforms markdown and React components into HTML, supporting usage in Server Components.

## Install dependencies

Install the `@next/mdx` package and related packages to configure Next.js for processing markdown and MDX:

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
```

## Configure `next.config.mjs`

Update the `next.config.mjs` file to configure it to use MDX:

```js
import createMDX from '@next/mdx'

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

export default withMDX(nextConfig)
```

## Add an `mdx-components.tsx` file

Create an `mdx-components.tsx` (or `.js`) file in the root of your project to define global MDX Components:

```tsx
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}
```

## Rendering MDX

You can render MDX using Next.js's file-based routing or by importing MDX files into other pages.

### Using file-based routing

Create a new MDX page within the `/app` or `/pages` directory:

```txt
  my-project
  ├── app
  │   └── mdx-page
  │       └── page.(mdx/md)
  ├── mdx-components.(tsx/js)
  └── package.json
```

You can use MDX in these files and import React components directly inside your MDX page:

```mdx
import { MyComponent } from 'my-component'

# Welcome to my MDX page!

This is some **bold** and _italics_ text.

This is a list in markdown:

- One
- Two
- Three

Checkout my React component:

<MyComponent />
```

### Using imports

Create a new page within the `/app` or `/pages` directory and an MDX file wherever you'd like:

```txt
  my-project
  ├── app
  │   └── mdx-page
  │       └── page.(tsx/js)
  ├── markdown
  │   └── welcome.(mdx/md)
  ├── mdx-components.(tsx/js)
  └── package.json
```

Import the MDX file inside the page to display the content:

```tsx
import Welcome from '@/markdown/welcome.mdx'

export default function Page() {
  return <Welcome />
}
```

## Using custom styles and components

Markdown maps to native HTML elements. To style your markdown, provide custom components that map to the generated HTML elements.

### Global styles and components

Adding styles and components in `mdx-components.tsx` will affect all MDX files in your application:

```tsx
import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 style={{ color: 'red', fontSize: '48px' }}>{children}</h1>
    ),
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        {...(props as ImageProps)}
      />
    ),
    ...components,
  }
}
```

### Local styles and components

Apply local styles and components to specific pages by passing them into imported MDX components:

```tsx
import Welcome from '@/markdown/welcome.mdx'

function CustomH1({ children }) {
  return <h1 style={{ color: 'blue', fontSize: '100px' }}>{children}</h1>
}

const overrideComponents = {
  h1: CustomH1,
}

export default function Page() {
  return <Welcome components={overrideComponents} />
}
```

### Shared layouts

To share a layout across MDX pages, create a layout component:

```tsx
export default function MdxLayout({ children }) {
  return <div style={{ color: 'blue' }}>{children}</div>
}
```

Then, import the layout component into the MDX page and wrap the MDX content in the layout.

## Frontmatter

Frontmatter is a YAML-like key/value pairing used to store data about a page. `@next/mdx` does not support frontmatter by default, but you can use solutions like `remark-frontmatter`, `remark-mdx-frontmatter`, or `gray-matter`.

You can use exports like any other JavaScript component:

```mdx
export const metadata = {
  author: 'John Doe',
}

# Blog post
```

## Remark and Rehype Plugins

You can provide `remark` and `rehype` plugins to transform the MDX content. For example, use `remark-gfm` to support GitHub Flavored Markdown.

```js
import remarkGfm from 'remark-gfm'
import createMDX from '@next/mdx'

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
})
```

## Remote MDX

Fetch MDX files or content dynamically on the server. Use `next-mdx-remote` for this purpose.

```tsx
import { MDXRemote } from 'next-mdx-remote/rsc'

export default async function RemoteMdxPage() {
  const res = await fetch('https://...')
  const markdown = await res.text()
  return <MDXRemote source={markdown} />
}
```

## Deep Dive: How do you transform markdown into HTML?

React does not natively understand markdown. Use `remark` and `rehype` to transform markdown into HTML.

```js
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'

async function main() {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process('Hello, Next.js!')

  console.log(String(file))
}
```

## Using the Rust-based MDX compiler (experimental)

Next.js supports a new MDX compiler written in Rust. To use it, configure `next.config.js`:

```js
module.exports = withMDX({
  experimental: {
    mdxRs: true,
  },
})
```

## Helpful Links

- MDX
- `@next/mdx`
- remark
- rehype
- Markdoc
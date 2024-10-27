# Absolute Imports and Module Path Aliases

Configure module path aliases that allow you to remap certain import paths.

Next.js has in-built support for the "paths" and "baseUrl" options of `tsconfig.json` and `jsconfig.json` files. These options allow you to alias project directories to absolute paths, making it easier to import modules. 

## Absolute Imports

The `baseUrl` configuration option allows you to import directly from the root of the project.

Example configuration:

```json
{
  "compilerOptions": {
    "baseUrl": "."
  }
}
```

Example usage:

```tsx
// components/button.tsx
export default function Button() {
  return <button>Click me</button>
}

// app/page.tsx
import Button from 'components/button'

export default function HomePage() {
  return (
    <>
      <h1>Hello World</h1>
      <Button />
    </>
  )
}
```

## Module Aliases

You can use the "paths" option to alias module paths. For example, the following configuration maps `@/components/*` to `components/*`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["components/*"]
    }
  }
}
```

Example usage:

```tsx
// components/button.tsx
export default function Button() {
  return <button>Click me</button>
}

// app/page.tsx
import Button from '@/components/button'

export default function HomePage() {
  return (
    <>
      <h1>Hello World</h1>
      <Button />
    </>
  )
}
```

Each of the "paths" are relative to the `baseUrl` location. For example:

```json
{
  "compilerOptions": {
    "baseUrl": "src/",
    "paths": {
      "@/styles/*": ["styles/*"],
      "@/components/*": ["components/*"]
    }
  }
}
```

Example usage:

```tsx
// app/page.tsx
import Button from '@/components/button'
import '@/styles/styles.css'
import Helper from 'utils/helper'

export default function HomePage() {
  return (
    <Helper>
      <h1>Hello World</h1>
      <Button />
    </Helper>
  )
}
```
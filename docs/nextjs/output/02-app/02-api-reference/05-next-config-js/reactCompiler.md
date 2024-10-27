# reactCompiler

Enable the React Compiler to automatically optimize component rendering.

**Version:** experimental

Next.js 15 RC introduced support for the React Compiler. The compiler improves performance by automatically optimizing component rendering, reducing the need for manual memoization through APIs such as `useMemo` and `useCallback`.

## Installation

Upgrade to Next.js 15 and install the `babel-plugin-react-compiler`:

```bash
npm install babel-plugin-react-compiler
```

## Configuration

Add the `experimental.reactCompiler` option in `next.config.js`:

### TypeScript

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
}

export default nextConfig
```

### JavaScript

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
}

module.exports = nextConfig
```

## Opt-in Mode

Optionally, configure the compiler to run in "opt-in" mode:

### TypeScript

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: {
      compilationMode: 'annotation',
    },
  },
}

export default nextConfig
```

### JavaScript

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: {
      compilationMode: 'annotation',
    },
  },
}

module.exports = nextConfig
```

**Note:** The React Compiler is currently only usable in Next.js through a Babel plugin, which opts out of Next.js's default Rust-based compiler, potentially resulting in slower build times. Support for the React Compiler as the default compiler is in progress.

Learn more about the React Compiler and the available Next.js config options.
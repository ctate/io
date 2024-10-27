# turbo

Configure Next.js with Turbopack-specific options.

The `turbo` option lets you customize Turbopack to transform different files and change how modules are resolved.

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      // ...
    },
  },
}

export default nextConfig
```

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      // ...
    },
  },
}

module.exports = nextConfig
```

**Good to know**:
- Turbopack for Next.js does not require loaders or loader configuration for built-in functionality. It has built-in support for CSS and compiling modern JavaScript, so there's no need for `css-loader`, `postcss-loader`, or `babel-loader` if using `@babel/preset-env`.

## Reference

### Options

The following options are available for the `turbo` configuration:

- `rules`: List of unsupported webpack loaders to apply when running with Turbopack.
- `resolveAlias`: Map aliased imports to modules to load in their place.
- `resolveExtensions`: List of extensions to resolve when importing files.
- `moduleIdStrategy`: Assign module IDs.
- `useSwcCss`: Use `swc_css` instead of `lightningcss` for Turbopack.
- `treeshaking`: Enable tree shaking for the turbopack dev server and build.
- `memoryLimit`: A target memory limit for turbo, in bytes.

### Supported loaders

The following loaders have been tested to work with Turbopack's webpack loader implementation:

- babel-loader
- @svgr/webpack
- svg-inline-loader
- yaml-loader
- string-replace-loader
- raw-loader
- sass-loader

## Examples

### Configuring webpack loaders

If you need loader support beyond what's built in, many webpack loaders already work with Turbopack. There are currently some limitations:

- Only a core subset of the webpack loader API is implemented.
- Only loaders that return JavaScript code are supported.
- Options passed to webpack loaders must be plain JavaScript primitives, objects, and arrays.

To configure loaders, add the names of the loaders you've installed and any options in `next.config.js`, mapping file extensions to a list of loaders:

```js
module.exports = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
}
```

**Good to know**: Prior to Next.js version 13.4.4, `turbo.rules` was named `turbo.loaders` and only accepted file extensions like `.mdx` instead of `*.mdx`.

### Resolving aliases

Turbopack can be configured to modify module resolution through aliases, similar to webpack's resolve.alias configuration.

To configure resolve aliases, map imported patterns to their new destination in `next.config.js`:

```js
module.exports = {
  experimental: {
    turbo: {
      resolveAlias: {
        underscore: 'lodash',
        mocha: { browser: 'mocha/browser-entry.js' },
      },
    },
  },
}
```

This aliases imports of the `underscore` package to the `lodash` package. In other words, `import underscore from 'underscore'` will load the `lodash` module instead of `underscore`.

Turbopack also supports conditional aliasing through this field, similar to Node.js' conditional exports. Currently, only the `browser` condition is supported.

### Resolving custom extensions

Turbopack can be configured to resolve modules with custom extensions, similar to webpack's resolve.extensions configuration.

To configure resolve extensions, use the `resolveExtensions` field in `next.config.js`:

```js
module.exports = {
  experimental: {
    turbo: {
      resolveExtensions: [
        '.mdx',
        '.tsx',
        '.ts',
        '.jsx',
        '.js',
        '.mjs',
        '.json',
      ],
    },
  },
}
```

This overwrites the original resolve extensions with the provided list. Make sure to include the default extensions.

For more information and guidance for how to migrate your app to Turbopack from webpack, see Turbopack's documentation on webpack compatibility.

### Assigning module IDs

Turbopack currently supports two strategies for assigning module IDs:

- `'named'`: Assigns readable module IDs based on the module's path and functionality.
- `'deterministic'`: Assigns small hashed numeric module IDs, which are mostly consistent between builds and help with long-term caching.

If not set, Turbopack will use `'named'` for development builds and `'deterministic'` for production builds.

To configure the module IDs strategy, use the `moduleIdStrategy` field in `next.config.js`:

```js
module.exports = {
  experimental: {
    turbo: {
      moduleIdStrategy: 'deterministic',
    },
  },
}
```

## Version History

- `13.0.0`: `experimental.turbo` introduced.
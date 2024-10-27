# Next.js Compiler

The Next.js Compiler, written in Rust using SWC, allows Next.js to transform and minify your JavaScript code for production. This replaces Babel for individual files and Terser for minifying output bundles.

Compilation using the Next.js Compiler is 17x faster than Babel and is enabled by default since Next.js version 12. If you have an existing Babel configuration or are using unsupported features, your application will opt-out of the Next.js Compiler and continue using Babel.

## Why SWC?

SWC is an extensible Rust-based platform for the next generation of fast developer tools. It can be used for compilation, minification, bundling, and more, and is designed to be extended. We chose to build on SWC for several reasons:

- **Extensibility:** SWC can be used as a Crate inside Next.js without forking the library.
- **Performance:** Achieved ~3x faster Fast Refresh and ~5x faster builds in Next.js.
- **WebAssembly:** Rust's support for WASM is essential for supporting all platforms.
- **Community:** The Rust community and ecosystem are growing.

## Supported Features

### Styled Components

To enable styled-components support, update to the latest version of Next.js and modify your `next.config.js`:

```js
module.exports = {
  compiler: {
    styledComponents: true,
  },
}
```

For advanced configurations, you can set individual properties for styled-components compilation.

### Jest

The Next.js Compiler simplifies configuring Jest with Next.js. Update to the latest version of Next.js and modify your `jest.config.js`:

```js
const nextJest = require('next/jest')
const createJestConfig = nextJest({ dir: './' })
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}
module.exports = createJestConfig(customJestConfig)
```

### Relay

To enable Relay support, update your `next.config.js`:

```js
module.exports = {
  compiler: {
    relay: {
      src: './',
      artifactDirectory: './__generated__',
      language: 'typescript',
      eagerEsModules: false,
    },
  },
}
```

### Remove React Properties

To remove JSX properties, update your `next.config.js`:

```js
module.exports = {
  compiler: {
    reactRemoveProperties: true,
  },
}
```

For custom properties:

```js
module.exports = {
  compiler: {
    reactRemoveProperties: { properties: ['^data-custom$'] },
  },
}
```

### Remove Console

To remove all `console.*` calls:

```js
module.exports = {
  compiler: {
    removeConsole: true,
  },
}
```

To exclude `console.error`:

```js
module.exports = {
  compiler: {
    removeConsole: {
      exclude: ['error'],
    },
  },
}
```

### Legacy Decorators

To enable legacy decorators, update your `jsconfig.json` or `tsconfig.json`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

### importSource

To use `jsxImportSource`, update your `jsconfig.json` or `tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsxImportSource": "theme-ui"
  }
}
```

### Emotion

To enable Emotion support, update your `next.config.js`:

```js
module.exports = {
  compiler: {
    emotion: boolean | {
      sourceMap?: boolean,
      autoLabel?: 'never' | 'dev-only' | 'always',
      labelFormat?: string,
      importMap?: {
        [packageName: string]: {
          [exportName: string]: {
            canonicalImport?: [string, string],
            styledBaseImport?: [string, string],
          }
        }
      },
    },
  },
}
```

### Minification

Next.js' SWC compiler is used for minification by default since v13. To disable Terser:

```js
module.exports = {
  swcMinify: false,
}
```

### Module Transpilation

To automatically transpile and bundle dependencies, update your `next.config.js`:

```js
module.exports = {
  transpilePackages: ['@acme/ui', 'lodash-es'],
}
```

### Experimental Features

#### SWC Trace Profiling

To enable SWC trace profiling:

```js
module.exports = {
  experimental: {
    swcTraceProfiling: true,
  },
}
```

#### SWC Plugins (experimental)

To configure SWC's experimental plugin support:

```js
module.exports = {
  experimental: {
    swcPlugins: [
      [
        'plugin',
        {
          ...pluginOptions,
        },
      ],
    ],
  },
}
```

## Unsupported Features

If your application has a `.babelrc` file, Next.js will fall back to using Babel for transforming individual files. If using a custom Babel setup, share your configuration for potential support in the future.

## Version History

- `v13.1.0`: Module Transpilation and Modularize Imports stable.
- `v13.0.0`: SWC Minifier enabled by default.
- `v12.3.0`: SWC Minifier stable.
- `v12.2.0`: SWC Plugins experimental support added.
- `v12.1.0`: Added support for various features including Styled Components and Jest.
- `v12.0.0`: Next.js Compiler introduced.
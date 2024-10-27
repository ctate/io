# Turbopack

Turbopack is an incremental bundler optimized for JavaScript and TypeScript, written in Rust, and built into Next.js.

## Usage

Turbopack can be used in Next.js in both the `pages` and `app` directories for faster local development. To enable Turbopack, use the `--turbopack` flag when running the Next.js development server.

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

## Supported Features

Turbopack in Next.js requires zero configuration for most users and can be extended for more advanced use cases. To learn more about the currently supported features for Turbopack, refer to the API Reference.

## Unsupported Features

Turbopack currently only supports `next dev` and does not support `next build`. The following features are currently not supported:

- Turbopack leverages Lightning CSS, which doesn't support some low usage CSS Modules features:
  - `:local` and `:global` as standalone pseudo classes (only function variant supported).
  - The @value rule (superseded by CSS variables).
  - `:import` and `:export` ICSS rules.
- Invalid CSS comment syntax (e.g., `//`):
  - CSS comments should be written as `/* comment */`.
- `webpack()` configuration in `next.config.js`:
  - Turbopack replaces Webpack; webpack configuration is not supported.
- Babel (`.babelrc`):
  - Turbopack uses the SWC compiler for all transpilation and optimizations.
- Creating a root layout automatically in App Router:
  - This behavior is not supported; an error will prompt manual addition of a root layout.
- `@next/font` (legacy font support):
  - Deprecated in favor of `next/font`, which is fully supported with Turbopack.
- Relay transforms:
  - Planned for future implementation.
- Blocking `.css` imports in `pages/_document.tsx`:
  - Currently blocked with Webpack; future implementation planned.
- `experimental.typedRoutes`:
  - Planned for future implementation.
- `experimental.nextScriptWorkers`:
  - Planned for future implementation.
- `experimental.sri.algorithm`:
  - Planned for future implementation.
- `experimental.fallbackNodePolyfills`:
  - Planned for future implementation.
- `experimental.esmExternals`:
  - Not planning to support legacy esmExternals configuration.
- AMP:
  - Not planning to support AMP with Turbopack.
- Yarn PnP:
  - Not planning to support Yarn PnP with Turbopack.
- `experimental.urlImports`:
  - Not planning to support `experimental.urlImports` with Turbopack.
- `:import` and `:export` ICSS rules:
  - Not planning to support these rules as Lightning CSS does not support them.
- `unstable_allowDynamic` configuration in edge runtime.

## Generating Trace Files

Trace files allow the Next.js team to investigate and improve performance metrics and memory usage. To generate a trace file, append `NEXT_TURBOPACK_TRACING=1` to the `next dev --turbopack` command, which will generate a `.next/trace.log` file.

When reporting issues related to Turbopack performance and memory usage, please include the trace file in your GitHub issue.
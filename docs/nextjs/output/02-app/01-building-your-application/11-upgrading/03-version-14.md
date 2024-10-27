# Version 14

Upgrade your Next.js Application from Version 13 to 14.

## Upgrading from 13 to 14

To update to Next.js version 14, run the following command using your preferred package manager:

```bash
npm i next@latest react@latest react-dom@latest eslint-config-next@latest
```

```bash
yarn add next@latest react@latest react-dom@latest eslint-config-next@latest
```

```bash
pnpm up next react react-dom eslint-config-next --latest
```

```bash
bun add next@latest react@latest react-dom@latest eslint-config-next@latest
```

Good to know: If you are using TypeScript, ensure you also upgrade `@types/react` and `@types/react-dom` to their latest versions.

### v14 Summary

- The minimum Node.js version has been bumped from 16.14 to 18.17, since 16.x has reached end-of-life.
- The `next export` command has been removed in favor of `output: 'export'` config. Please see the documentation for more information.
- The `next/server` import for `ImageResponse` was renamed to `next/og`. A codemod is available to safely and automatically rename your imports.
- The `@next/font` package has been fully removed in favor of the built-in `next/font`. A codemod is available to safely and automatically rename your imports.
- The WASM target for `next-swc` has been removed.
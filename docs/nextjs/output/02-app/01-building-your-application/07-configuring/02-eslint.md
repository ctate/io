# ESLint

Next.js provides an integrated ESLint experience by default. These conformance rules help you use Next.js optimally.

Next.js provides an integrated ESLint experience out of the box. Add `next lint` as a script to `package.json`:

```json
{
  "scripts": {
    "lint": "next lint"
  }
}
```

Run `npm run lint` or `yarn lint`:

```bash
yarn lint
```

If ESLint is not configured, you will be guided through the installation and configuration process.

```bash
yarn lint
```

You will see a prompt like this:

```
? How would you like to configure ESLint?
❯ Strict (recommended)  
  Base  
  Cancel
```

Select one of the following options:

- **Strict**: Includes Next.js' base ESLint configuration and a stricter Core Web Vitals rule-set. Recommended for first-time ESLint setup.

  ```json
  {
    "extends": "next/core-web-vitals"
  }
  ```

- **Base**: Includes Next.js' base ESLint configuration.

  ```json
  {
    "extends": "next"
  }
  ```

- **Cancel**: No ESLint configuration. Select this only if you plan to set up your own custom configuration.

If you select either configuration option, Next.js will install `eslint` and `eslint-config-next` as dependencies and create an `.eslintrc.json` file in your project root.

Run `next lint` to catch errors. ESLint will also run during every build (`next build`). Errors will fail the build; warnings will not.

We recommend using an appropriate integration to view warnings and errors directly in your code editor during development.

## ESLint Config

The default configuration (`eslint-config-next`) provides an optimal linting experience. If ESLint is not configured, use `next lint` to set it up.

Recommended rule-sets from the following ESLint plugins are used within `eslint-config-next`:

- eslint-plugin-react
- eslint-plugin-react-hooks
- eslint-plugin-next

This takes precedence over the configuration from `next.config.js`.

## ESLint Plugin

Next.js provides an ESLint plugin, `eslint-plugin-next`, bundled within the base configuration to catch common issues in a Next.js application. The full set of rules includes:

- @next/next/google-font-display: Enforce font-display behavior with Google Fonts.
- @next/next/google-font-preconnect: Ensure `preconnect` is used with Google Fonts.
- @next/next/inline-script-id: Enforce `id` attribute on `next/script` components with inline content.
- @next/next/next-script-for-ga: Prefer `next/script` component for inline Google Analytics scripts.
- @next/next/no-assign-module-variable: Prevent assignment to the `module` variable.
- @next/next/no-async-client-component: Prevent client components from being async functions.
- @next/next/no-before-interactive-script-outside-document: Prevent usage of `next/script`'s `beforeInteractive` strategy outside of `pages/_document.js`.
- @next/next/no-css-tags: Prevent manual stylesheet tags.
- @next/next/no-document-import-in-page: Prevent importing `next/document` outside of `pages/_document.js`.
- @next/next/no-duplicate-head: Prevent duplicate usage of `<Head>` in `pages/_document.js`.
- @next/next/no-head-element: Prevent usage of `<head>` element.
- @next/next/no-head-import-in-document: Prevent usage of `next/head` in `pages/_document.js`.
- @next/next/no-html-link-for-pages: Prevent usage of `<a>` elements for internal Next.js navigation.
- @next/next/no-img-element: Prevent usage of `<img>` element due to slower LCP and higher bandwidth.
- @next/next/no-page-custom-font: Prevent page-only custom fonts.
- @next/next/no-script-component-in-head: Prevent usage of `next/script` in `next/head`.
- @next/next/no-styled-jsx-in-document: Prevent usage of `styled-jsx` in `pages/_document.js`.
- @next/next/no-sync-scripts: Prevent synchronous scripts.
- @next/next/no-title-in-document-head: Prevent usage of `<title>` with `Head` component from `next/document`.
- @next/next/no-typos: Prevent common typos in Next.js's data fetching functions.
- @next/next/no-unwanted-polyfillio: Prevent duplicate polyfills from Polyfill.io.

If ESLint is already configured, extend from this plugin directly instead of including `eslint-config-next`.

### Custom Settings

#### `rootDir`

For projects where Next.js isn't installed in the root directory (e.g., monorepos), specify the Next.js application location using the `settings` property in your `.eslintrc`:

```json
{
  "extends": "next",
  "settings": {
    "next": {
      "rootDir": "packages/my-app/"
    }
  }
}
```

`rootDir` can be a path, glob, or an array of paths/globs.

## Linting Custom Directories and Files

By default, Next.js runs ESLint for all files in the `pages/`, `app/`, `components/`, `lib/`, and `src/` directories. Specify directories using the `dirs` option in `next.config.js` for production builds:

```js
module.exports = {
  eslint: {
    dirs: ['pages', 'utils'],
  },
}
```

Use the `--dir` and `--file` flags with `next lint` to lint specific directories and files:

```bash
next lint --dir pages --dir utils --file bar.js
```

## Caching

To improve performance, ESLint caches processed file information by default in `.next/cache`. Use the `--no-cache` flag to disable the cache if needed.

```bash
next lint --no-cache
```

## Disabling Rules

Modify or disable rules from supported plugins using the `rules` property in your `.eslintrc`:

```json
{
  "extends": "next",
  "rules": {
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off"
  }
}
```

### Core Web Vitals

The `next/core-web-vitals` rule set is enabled when `next lint` is run for the first time with the **strict** option selected.

```json
{
  "extends": "next/core-web-vitals"
}
```

This updates `eslint-plugin-next` to error on rules affecting Core Web Vitals.

### TypeScript

Using `create-next-app --typescript` adds TypeScript-specific lint rules with `next/typescript`:

```json
{
  "extends": ["next/core-web-vitals", "next/typescript"]
}
```

These rules are based on `plugin:@typescript-eslint/recommended`.

## Usage With Other Tools

### Prettier

To avoid conflicts with Prettier, include `eslint-config-prettier` in your ESLint config.

Install the dependency:

```bash
npm install --save-dev eslint-config-prettier
```

Add `prettier` to your ESLint config:

```json
{
  "extends": ["next", "prettier"]
}
```

### lint-staged

To use `next lint` with lint-staged, add the following to the `.lintstagedrc.js` file:

```js
const path = require('path')

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
}
```

## Migrating Existing Config

### Recommended Plugin Ruleset

If ESLint is already configured and you have certain plugins installed or specific `parserOptions`, consider extending directly from the Next.js ESLint plugin:

```js
module.exports = {
  extends: [
    'plugin:@next/next/recommended',
  ],
}
```

Install the plugin:

```bash
npm install --save-dev @next/eslint-plugin-next
```

This prevents collisions or errors from importing the same plugin across multiple configurations.

### Additional Configurations

If using a separate ESLint configuration, ensure `eslint-config-next` is extended last:

```json
{
  "extends": ["eslint:recommended", "next"]
}
```

The `next` configuration handles default values for `parser`, `plugins`, and `settings`. Avoid re-declaring these properties unless necessary.
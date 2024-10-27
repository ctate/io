# Codemods

Codemods are transformations that run on your codebase programmatically, allowing a large number of changes to be applied without manual intervention. Next.js provides Codemod transformations to help upgrade your codebase when an API is updated or deprecated.

## Usage

In your terminal, navigate to your project's folder, then run:

```
npx @next/codemod <transform> <path>
```

- `transform` - name of transform
- `path` - files or directory to transform
- `--dry` - Do a dry-run, no code will be edited
- `--print` - Prints the changed output for comparison

## Codemods

### 15.0

#### Transform App Router Route Segment Config `runtime` value from `experimental-edge` to `edge`

**Transform:** `app-dir-runtime-config-experimental-edge`

```
npx @next/codemod@latest app-dir-runtime-config-experimental-edge .
```

Transforms Route Segment Config `runtime` value `experimental-edge` to `edge`.

#### Migrate to async Dynamic APIs

**Transform:** `next-async-request-api`

```
npx @next/codemod@latest next-async-request-api .
```

Transforms dynamic APIs (`cookies()`, `headers()`, `draftMode()`) to be properly awaited or wrapped with `React.use()`.

#### Replace `geo` and `ip` properties of `NextRequest` with `@vercel/functions`

**Transform:** `next-request-geo-ip`

```
npx @next/codemod@latest next-request-geo-ip .
```

Transforms `geo` and `ip` properties of `NextRequest` to use `@vercel/functions`.

#### Transform `next/dynamic` imports accessing named exports to return an object with a `default` property

**Transform:** `next-dynamic-access-named-export`

```
npx @next/codemod@latest next-dynamic-access-named-export .
```

Transforms dynamic imports using `next/dynamic` to ensure they return an object with a `default` property.

### 14.0

#### Migrate `ImageResponse` imports

**Transform:** `next-og-import`

```
npx @next/codemod@latest next-og-import .
```

Moves imports from `next/server` to `next/og`.

#### Use `viewport` export

**Transform:** `metadata-to-viewport-export`

```
npx @next/codemod@latest metadata-to-viewport-export .
```

Migrates certain viewport metadata to `viewport` export.

### 13.2

#### Use Built-in Font

**Transform:** `built-in-next-font`

```
npx @next/codemod@latest built-in-next-font .
```

Uninstalls `@next/font` package and transforms imports to the built-in `next/font`.

### 13.0

#### Rename Next Image Imports

**Transform:** `next-image-to-legacy-image`

```
npx @next/codemod@latest next-image-to-legacy-image .
```

Renames `next/image` imports to `next/legacy/image` and `next/future/image` to `next/image`.

#### Migrate to the New Image Component

**Transform:** `next-image-experimental`

```
npx @next/codemod@latest next-image-experimental .
```

Migrates from `next/legacy/image` to the new `next/image`.

#### Remove `<a>` Tags From Link Components

**Transform:** `new-link`

```
npx @next/codemod@latest new-link .
```

Removes `<a>` tags inside Link Components or adds a `legacyBehavior` prop where auto-fixing can't be applied.

### 11

#### Migrate from CRA

**Transform:** `cra-to-next`

```
npx @next/codemod cra-to-next
```

Migrates a Create React App project to Next.js.

### 10

#### Add React imports

**Transform:** `add-missing-react-import`

```
npx @next/codemod add-missing-react-import
```

Transforms files that do not import `React` to include the import.

### 9

#### Transform Anonymous Components into Named Components

**Transform:** `name-default-component`

```
npx @next/codemod name-default-component
```

Transforms anonymous components into named components for compatibility with Fast Refresh.

### 8

#### Transform AMP HOC into page config

**Transform:** `withamp-to-config`

```
npx @next/codemod withamp-to-config
```

Transforms the `withAmp` HOC into Next.js page configuration.

### 6

#### Use `withRouter`

**Transform:** `url-to-withrouter`

```
npx @next/codemod url-to-withrouter
```

Transforms the deprecated `url` property to use `withRouter`.
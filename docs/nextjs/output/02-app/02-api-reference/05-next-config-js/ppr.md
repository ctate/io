# Partial Prerendering in Next.js

Partial Prerendering (PPR) enables the combination of static and dynamic components within the same route.

## Using Partial Prerendering

### Incremental Adoption (Version 15)

In Next.js 15, you can incrementally adopt Partial Prerendering in layouts and pages by setting the `ppr` option in `next.config.js` to `incremental`, and exporting the `experimental_ppr` route config option at the top of the file:

**next.config.ts**
```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    ppr: 'incremental',
  },
}

export default nextConfig
```

**next.config.js**
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: 'incremental',
  },
}

module.exports = nextConfig
```

**app/page.tsx**
```tsx
import { Suspense } from "react"
import { StaticComponent, DynamicComponent, Fallback } from "@/app/ui"

export const experimental_ppr = true

export default function Page() {
  return (
    <>
      <StaticComponent />
      <Suspense fallback={<Fallback />}>
        <DynamicComponent />
      </Suspense>
    </>
  );
}
```

**app/page.js**
```jsx
import { Suspense } from "react"
import { StaticComponent, DynamicComponent, Fallback } from "@/app/ui"

export const experimental_ppr = true

export default function Page() {
  return (
    <>
      <StaticComponent />
      <Suspense fallback={<Fallback />}>
        <DynamicComponent />
      </Suspense>
    </>
  );
}
```

### Important Notes

- Routes without `experimental_ppr` default to `false` and will not be prerendered using PPR. Explicit opt-in is required for each route.
- `experimental_ppr` applies to all children of the route segment, including nested layouts and pages. It only needs to be added to the top segment of a route.
- To disable PPR for child segments, set `experimental_ppr` to `false` in the child segment.

### Version Changes

| Version   | Changes                                     |
| --------- | ------------------------------------------- |
| `v15.0.0` | experimental `incremental` value introduced |
| `v14.0.0` | experimental `ppr` introduced               |
# sassOptions

`sassOptions` allow you to configure the Sass compiler.

TypeScript Example:

```ts
import type { NextConfig } from 'next'

const sassOptions = {
  additionalData: `
    $var: red;
  `,
}

const nextConfig: NextConfig = {
  sassOptions: {
    ...sassOptions,
    implementation: 'sass-embedded',
  },
}

export default nextConfig
```

JavaScript Example:

```js
/** @type {import('next').NextConfig} */

const sassOptions = {
  additionalData: `
    $var: red;
  `,
}

const nextConfig = {
  sassOptions: {
    ...sassOptions,
    implementation: 'sass-embedded',
  },
}

module.exports = nextConfig
```

Good to know: `sassOptions` are not typed outside of `implementation` because Next.js does not maintain the other possible properties.
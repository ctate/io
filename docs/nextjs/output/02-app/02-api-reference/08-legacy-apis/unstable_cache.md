# unstable_cache

API Reference for the unstable_cache function.

**Warning**: This API will be deprecated in future versions. In version 15, use the `use cache` directive instead.

`unstable_cache` allows you to cache the results of expensive operations, like database queries, and reuse them across multiple requests.

```jsx
import { getUser } from './data';
import { unstable_cache } from 'next/cache';

const getCachedUser = unstable_cache(
  async (id) => getUser(id),
  ['my-app-user']
);

export default async function Component({ userID }) {
  const user = await getCachedUser(userID);
  ...
}
```

**Good to know**:
- Accessing dynamic data sources such as `headers` or `cookies` inside a cache scope is not supported. Use `headers` outside of the cached function and pass the required dynamic data as an argument.
- This API uses Next.js' built-in Data Cache to persist the result across requests and deployments.

**Warning**: This API is unstable and may change in the future. Migration documentation and codemods will be provided as this API stabilizes.

## Parameters

```jsx
const data = unstable_cache(fetchData, keyParts, options)()
```

- `fetchData`: An asynchronous function that fetches the data to cache. It must return a `Promise`.
- `keyParts`: An optional array of keys for additional cache identification. Use it when external variables are used without being passed as parameters.
- `options`: An object controlling cache behavior, containing:
  - `tags`: An array of tags for cache invalidation. Not used for unique function identification.
  - `revalidate`: Number of seconds after which the cache should be revalidated. Omit or pass `false` to cache indefinitely.

## Returns

`unstable_cache` returns a function that, when invoked, returns a Promise resolving to the cached data. If the data is not cached, the provided function is invoked, and its result is cached and returned.

## Example

```tsx
import { unstable_cache } from 'next/cache';

export default async function Page({ params }: { params: { userId: string } }) {
  const getCachedUser = unstable_cache(
    async () => {
      return { id: params.userId };
    },
    [params.userId],
    {
      tags: ['users'],
      revalidate: 60,
    }
  );

  //...
}
```

```jsx
import { unstable_cache } from 'next/cache';

export default async function Page({ params }) {
  const getCachedUser = unstable_cache(
    async () => {
      return { id: params.userId };
    },
    [params.userId],
    {
      tags: ["users"],
      revalidate: 60,
    }
  );

  //...
}
```

## Version History

| Version   | Changes                      |
| --------- | ---------------------------- |
| `v14.0.0` | `unstable_cache` introduced. |
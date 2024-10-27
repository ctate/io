# fetch

API reference for the extended fetch function.

Next.js extends the Web `fetch()` API to allow each request on the server to set its own persistent caching and revalidation semantics.

In the browser, the `cache` option indicates how a fetch request will interact with the browser's HTTP cache. With this extension, `cache` indicates how a server-side fetch request will interact with the framework's persistent Data Cache.

You can call `fetch` with `async` and `await` directly within Server Components.

```tsx
export default async function Page() {
  let data = await fetch('https://api.vercel.app/blog')
  let posts = await data.json()
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

```jsx
export default async function Page() {
  let data = await fetch('https://api.vercel.app/blog')
  let posts = await data.json()
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

## `fetch(url, options)`

Since Next.js extends the Web `fetch()` API, you can use any of the native options available.

### `options.cache`

Configure how the request should interact with Next.js Data Cache.

```ts
fetch(`https://...`, { cache: 'force-cache' | 'no-store' })
```

- **`no-store`** (default): Next.js fetches the resource from the remote server on every request without looking in the cache, and it will not update the cache with the downloaded resource.
- **`force-cache`**: Next.js looks for a matching request in its Data Cache.
  - If there is a match and it is fresh, it will be returned from the cache.
  - If there is no match or a stale match, Next.js will fetch the resource from the remote server and update the cache with the downloaded resource.

### `options.next.revalidate`

```ts
fetch(`https://...`, { next: { revalidate: false | 0 | number } })
```

Set the cache lifetime of a resource (in seconds).

- **`false`** - Cache the resource indefinitely. Semantically equivalent to `revalidate: Infinity`. The HTTP cache may evict older resources over time.
- **`0`** - Prevent the resource from being cached.
- **`number`** - (in seconds) Specify the resource should have a cache lifetime of at most `n` seconds.

Good to know:
- If an individual `fetch()` request sets a `revalidate` number lower than the default `revalidate` of a route, the whole route revalidation interval will be decreased.
- If two fetch requests with the same URL in the same route have different `revalidate` values, the lower value will be used.
- It is not necessary to set the `cache` option if `revalidate` is set to a number.
- Conflicting options such as `{ revalidate: 3600, cache: 'no-store' }` will cause an error.

### `options.next.tags`

```ts
fetch(`https://...`, { next: { tags: ['collection'] } })
```

Set the cache tags of a resource. Data can then be revalidated on-demand using revalidateTag. The max length for a custom tag is 256 characters and the max tag items is 64.

## Troubleshooting

### Fetch `cache: 'no-store'` not showing fresh data in development

Next.js caches fetch responses in Server Components across Hot Module Replacement (HMR) in local development for faster responses and to reduce costs for billed API calls.

By default, the HMR cache applies to all fetch requests, including those with the `cache: 'no-store'` option. This means uncached requests will not show fresh data between HMR refreshes. However, the cache will be cleared on navigation or full-page reloads.

See the serverComponentsHmrCache docs for more information.

## Version History

| Version   | Changes             |
| --------- | ------------------- |
| `v13.0.0` | `fetch` introduced. |
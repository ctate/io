# generateSitemaps

Learn how to use the `generateSitemaps` function to create multiple sitemaps for your application.

## Returns

The `generateSitemaps` function returns an array of objects with an `id` property.

## URLs

In production, generated sitemaps are available at `/.../sitemap/[id].xml`. For example, `/product/sitemap/1.xml`.

In development, view the generated sitemap at `/.../sitemap.xml/[id]`. For example, `/product/sitemap.xml/1`. This difference is temporary and will follow the production format.

## Example

To split a sitemap using `generateSitemaps`, return an array of objects with the sitemap `id`. Use the `id` to generate unique sitemaps.

```ts
import { BASE_URL } from '@/app/lib/constants'

export async function generateSitemaps() {
  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const start = id * 50000
  const end = start + 50000
  const products = await getProducts(
    `SELECT id, date FROM products WHERE id BETWEEN ${start} AND ${end}`
  )
  return products.map((product) => ({
    url: `${BASE_URL}/product/${product.id}`,
    lastModified: product.date,
  }))
}
```

```js
import { BASE_URL } from '@/app/lib/constants'

export async function generateSitemaps() {
  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]
}

export default async function sitemap({ id }) {
  const start = id * 50000
  const end = start + 50000
  const products = await getProducts(
    `SELECT id, date FROM products WHERE id BETWEEN ${start} AND ${end}`
  )
  return products.map((product) => ({
    url: `${BASE_URL}/product/${id}`,
    lastModified: product.date,
  }))
}
```

Next Steps: Learn how to create sitemaps for your Next.js application. Related link: app/api-reference/file-conventions/metadata/sitemap.
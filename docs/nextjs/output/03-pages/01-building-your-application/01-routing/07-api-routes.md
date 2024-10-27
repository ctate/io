# API Routes

Next.js supports API Routes, allowing you to build your API within your Next.js app.

## Overview

API routes provide a solution to build a public API with Next.js. Any file inside the `pages/api` folder is mapped to `/api/*` and treated as an API endpoint. They are server-side only and do not increase client-side bundle size.

### Example API Route

```ts
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ message: 'Hello from Next.js!' })
}
```

### Important Notes

- API Routes do not specify CORS headers, meaning they are same-origin only by default.
- API Routes cannot be used with static exports. Route Handlers in the App Router can be used instead.
- API Routes are affected by `pageExtensions` configuration in `next.config.js`.

## Parameters

```tsx
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // ...
}
```

- `req`: An instance of http.IncomingMessage.
- `res`: An instance of http.ServerResponse.

## HTTP Methods

Handle different HTTP methods using `req.method`:

```ts
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Process a POST request
  } else {
    // Handle any other HTTP method
  }
}
```

## Request Helpers

API Routes provide built-in request helpers:

- `req.cookies`: Contains cookies sent by the request.
- `req.query`: Contains the query string.
- `req.body`: Contains the body parsed by content-type.

### Custom Config

Every API Route can export a `config` object to change default configurations:

```js
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
  maxDuration: 5,
}
```

- `bodyParser`: Automatically enabled; set to `false` to consume the body as a Stream.
- `responseLimit`: Automatically enabled; can be set to `false` or a specific size.

## Response Helpers

The Server Response object includes helper methods:

- `res.status(code)`: Sets the status code.
- `res.json(body)`: Sends a JSON response.
- `res.send(body)`: Sends the HTTP response.
- `res.redirect([status,] path)`: Redirects to a specified path or URL.
- `res.revalidate(urlPath)`: Revalidates a page on demand.

### Example Responses

#### JSON Response

```ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await someAsyncOperation()
    res.status(200).json({ result })
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}
```

#### HTTP Response

```ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await someAsyncOperation()
    res.status(200).send({ result })
  } catch (err) {
    res.status(500).send({ error: 'failed to fetch data' })
  }
}
```

#### Redirect Example

```ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, message } = req.body
  try {
    await handleFormInputAsync({ name, message })
    res.redirect(307, '/')
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch data' })
  }
}
```

## Dynamic API Routes

API Routes support dynamic routes, following the same file naming rules used for pages.

```ts
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { pid } = req.query
  res.end(`Post: ${pid}`)
}
```

### Catch-All API Routes

Catch all paths can be matched by adding three dots (`...`) inside brackets.

```ts
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query
  res.end(`Post: ${slug.join(', ')}`)
}
```

### Optional Catch-All API Routes

Optional catch-all routes can be created using double brackets (`[[...slug]]`).

## Caveats

- Predefined API routes take precedence over dynamic API routes, which take precedence over catch-all API routes.

## Edge API Routes

For using API Routes with the Edge Runtime, consider adopting the App Router and using Route Handlers instead. The function signature is isomorphic for both Edge and Node.js runtimes.
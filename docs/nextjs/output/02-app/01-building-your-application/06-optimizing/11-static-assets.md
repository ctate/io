# Static Assets in `public`

Next.js allows you to serve static files, like images, in the `public` directory. Files inside `public` can be referenced by your code starting from the base URL (`/`).

For example, the file `public/avatars/me.png` can be viewed by visiting the `/avatars/me.png` path. The code to display that image might look like:

```jsx
import Image from 'next/image'

export function Avatar({ id, alt }) {
  return <Image src={`/avatars/${id}.png`} alt={alt} width="64" height="64" />
}

export function AvatarOfMe() {
  return <Avatar id="me" alt="A portrait of me" />
}
```

## Caching

Next.js cannot safely cache assets in the `public` folder because they may change. The default caching headers applied are:

```
Cache-Control: public, max-age=0
```

## Robots, Favicons, and Others

The folder is also useful for `robots.txt`, `favicon.ico`, Google Site Verification, and any other static files (including `.html`). Ensure that there is no static file with the same name as a file in the `pages/` directory, as this will result in an error.

For static metadata files, such as `robots.txt`, `favicon.ico`, etc., you should use special metadata files inside the `app` folder.

### Good to Know

- The directory must be named `public`. The name cannot be changed and it's the only directory used to serve static assets.
- Only assets that are in the `public` directory at build time will be served by Next.js. Files added at request time won't be available. It is recommended to use a third-party service like Vercel Blob for persistent file storage.
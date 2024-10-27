# NextRequest

API Reference for NextRequest.

NextRequest extends the Web Request API with additional convenience methods.

## `cookies`

Read or mutate the `Set-Cookie` header of the request.

### `set(name, value)`

Set a cookie with the given value on the request.

```ts
request.cookies.set('show-banner', 'false')
```

### `get(name)`

Return the value of the cookie by name. Returns `undefined` if not found.

```ts
request.cookies.get('show-banner')
```

### `getAll()`

Return all cookies on the request or values of a specific cookie name.

```ts
request.cookies.getAll('experiments')
request.cookies.getAll()
```

### `delete(name)`

Delete the cookie from the request.

```ts
request.cookies.delete('experiments')
```

### `has(name)`

Return `true` if the cookie exists on the request.

```ts
request.cookies.has('experiments')
```

### `clear()`

Remove the `Set-Cookie` header from the request.

```ts
request.cookies.clear()
```

## `nextUrl`

Extends the native URL API with additional convenience methods, including Next.js specific properties.

```ts
request.nextUrl.pathname
request.nextUrl.searchParams
```

### Available Options

**Pages Router Properties:**

- `basePath`: string - The base path of the URL.
- `buildId`: string | undefined - The build identifier of the Next.js application.
- `defaultLocale`: string | undefined - The default locale for internationalization.
- `domainLocale`:
  - `defaultLocale`: string - The default locale within a domain.
  - `domain`: string - The domain associated with a specific locale.
  - `http`: boolean | undefined - Indicates if the domain is using HTTP.
- `locales`: string[] | undefined - An array of available locales.
- `locale`: string | undefined - The currently active locale.
- `url`: URL - The URL object.

**App Router Properties:**

- `basePath`: string - The base path of the URL.
- `buildId`: string | undefined - The build identifier of the Next.js application.
- `pathname`: string - The pathname of the URL.
- `searchParams`: Object - The search parameters of the URL.

Note: The internationalization properties from the Pages Router are not available for usage in the App Router.

## Version History

| Version   | Changes                 |
| --------- | ----------------------- |
| `v15.0.0` | `ip` and `geo` removed. |
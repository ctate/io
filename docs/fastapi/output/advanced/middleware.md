# Advanced Middleware

In the main tutorial, you learned how to add Custom Middleware to your application and how to handle CORS with the `CORSMiddleware`. This section covers the use of other middlewares.

## Adding ASGI Middlewares

FastAPI is based on Starlette and implements the ASGI specification, allowing the use of any ASGI middleware. Middleware must follow the ASGI spec but does not need to be specifically designed for FastAPI or Starlette.

ASGI middlewares are classes that expect an ASGI app as the first argument. Documentation for third-party ASGI middlewares typically shows usage like this:

```Python
from unicorn import UnicornMiddleware

app = SomeASGIApp()

new_app = UnicornMiddleware(app, some_config="rainbow")
```

FastAPI provides a simpler method using `app.add_middleware()`:

```Python
from fastapi import FastAPI
from unicorn import UnicornMiddleware

app = FastAPI()

app.add_middleware(UnicornMiddleware, some_config="rainbow")
```

`app.add_middleware()` takes a middleware class as the first argument and any additional arguments for the middleware.

## Integrated Middlewares

FastAPI includes several middlewares for common use cases. You can also use middlewares directly from Starlette.

### `HTTPSRedirectMiddleware`

Enforces that all incoming requests must be `https` or `wss`. Requests to `http` or `ws` will be redirected to the secure scheme.

```Python
{!../../docs_src/advanced_middleware/tutorial001.py!}
```

### `TrustedHostMiddleware`

Enforces that all incoming requests have a correctly set `Host` header to guard against HTTP Host Header attacks.

```Python
{!../../docs_src/advanced_middleware/tutorial002.py!}
```

Supported arguments:

- `allowed_hosts`: A list of allowed domain names. Wildcard domains like `*.example.com` are supported. Use `allowed_hosts=["*"]` to allow any hostname or omit the middleware.

Invalid requests will receive a `400` response.

### `GZipMiddleware`

Handles GZip responses for requests with `"gzip"` in the `Accept-Encoding` header, supporting both standard and streaming responses.

```Python
{!../../docs_src/advanced_middleware/tutorial003.py!}
```

Supported arguments:

- `minimum_size`: Minimum response size in bytes for GZip compression. Defaults to `500`.
- `compresslevel`: Integer from 1 to 9 for GZip compression speed and file size. Defaults to `9`.

## Other Middlewares

Many other ASGI middlewares are available, such as:

- Uvicorn's `ProxyHeadersMiddleware`
- MessagePack

For more middlewares, check Starlette's Middleware documentation and the ASGI Awesome List.
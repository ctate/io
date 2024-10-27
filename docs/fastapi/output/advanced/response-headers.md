# Response Headers

## Use a `Response` Parameter

You can declare a parameter of type `Response` in your path operation function, similar to how you can for cookies. You can then set headers in that temporal response object.

```Python
{!../../docs_src/response_headers/tutorial002.py!}
```

You can return any object you need, such as a dict or a database model. If you declared a `response_model`, it will still be used to filter and convert the returned object.

FastAPI will use that temporal response to extract the headers (including cookies and status code) and include them in the final response, which contains the value you returned, filtered by any `response_model`.

You can also declare the `Response` parameter in dependencies and set headers (and cookies) in them.

## Return a `Response` Directly

You can add headers when returning a `Response` directly. Create a response as described in the documentation and pass the headers as an additional parameter:

```Python
{!../../docs_src/response_headers/tutorial001.py!}
```

**Technical Details**

You can use `from starlette.responses import Response` or `from starlette.responses import JSONResponse`. FastAPI provides the same `starlette.responses` as `fastapi.responses` for convenience. Most available responses come directly from Starlette. The `Response` can frequently be used to set headers and cookies, and FastAPI also provides it at `fastapi.Response`.

## Custom Headers

Custom proprietary headers can be added using the 'X-' prefix. If you want custom headers to be visible to a client in a browser, you need to add them to your CORS configurations using the `expose_headers` parameter, as documented in Starlette's CORS documentation.
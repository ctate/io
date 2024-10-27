# Handling Errors

When using your API, clients may encounter various error situations, such as:

- Insufficient privileges for an operation.
- Lack of access to a resource.
- Non-existent items.

In these cases, return an **HTTP status code** in the **400** range (400 to 499), indicating a client error.

## Use `HTTPException`

To return HTTP error responses, use `HTTPException`.

### Import `HTTPException`

```Python
from fastapi import HTTPException
```

### Raise an `HTTPException` in your code

`HTTPException` is a standard Python exception with additional API-related data. Raise it instead of returning it. If raised in a utility function, it will terminate the request immediately.

Example of raising an exception for a non-existent item:

```Python
raise HTTPException(status_code=404, detail="Item not found")
```

### The resulting response

For a request to `http://example.com/items/foo` (existing item), the response will be:

```JSON
{
  "item": "The Foo Wrestlers"
}
```

For a request to `http://example.com/items/bar` (non-existent item), the response will be:

```JSON
{
  "detail": "Item not found"
}
```

When raising an `HTTPException`, any JSON-convertible value can be passed as the `detail` parameter.

## Add custom headers

To add custom headers to HTTP errors, use:

```Python
from fastapi import HTTPException
```

## Install custom exception handlers

You can add custom exception handlers using Starlette's exception utilities. For example, to handle a custom `UnicornException` globally:

```Python
@app.exception_handler(UnicornException)
async def unicorn_exception_handler(request: Request, exc: UnicornException):
    return JSONResponse(
        status_code=418,
        content={"message": f"Oops! {exc.name} did something. There goes a rainbow..."},
    )
```

## Override the default exception handlers

**FastAPI** has default exception handlers for `HTTPException` and `RequestValidationError`. You can override these handlers.

### Override request validation exceptions

To override the default handler for invalid data:

```Python
from fastapi.exceptions import RequestValidationError

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return PlainTextResponse("1 validation error", status_code=422)
```

### Override the `HTTPException` error handler

To return plain text instead of JSON for `HTTPException` errors:

```Python
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return PlainTextResponse(str(exc.detail), status_code=exc.status_code)
```

### Use the `RequestValidationError` body

The `RequestValidationError` contains the invalid request body, which can be logged or returned to the user:

```Python
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={"detail": exc.errors(), "body": exc.body},
    )
```

### FastAPI's `HTTPException` vs Starlette's `HTTPException`

**FastAPI**'s `HTTPException` accepts any JSON-able data for the `detail` field, while Starlette's only accepts strings. Register exception handlers for Starlette's `HTTPException` to catch exceptions raised by Starlette or its extensions.

### Reuse **FastAPI**'s exception handlers

To use default exception handlers from **FastAPI**, import them from `fastapi.exception_handlers`:

```Python
from fastapi.exception_handlers import http_exception_handler
```
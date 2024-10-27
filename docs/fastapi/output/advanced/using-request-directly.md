# Using the Request Directly

You can declare the parts of the request you need with their types, such as:

- Path parameters
- Headers
- Cookies
- Etc.

**FastAPI** validates, converts, and generates documentation for your API automatically. However, there are situations where you might need to access the `Request` object directly.

## Details about the `Request` object

Since **FastAPI** is built on **Starlette**, you can use Starlette's `Request` object directly when necessary. Accessing data from the `Request` object directly (e.g., reading the body) will not be validated, converted, or documented by FastAPI. Any other parameters declared normally (e.g., the body with a Pydantic model) will still be validated and documented.

## Use the `Request` object directly

To get the client's IP address/host inside your path operation function, you need to access the request directly.

```Python
{!../../docs_src/using_request_directly/tutorial001.py!}
```

By declaring a path operation function parameter with the type being `Request`, **FastAPI** will pass the `Request` in that parameter.

**Tip:** When declaring a path parameter alongside the request parameter, the path parameter will be extracted, validated, converted to the specified type, and annotated with OpenAPI. You can declare any other parameter normally and still access the `Request`.

## `Request` documentation

For more details about the `Request` object, refer to the official Starlette documentation site.

**Note:** You can also use `from starlette.requests import Request`. **FastAPI** provides it directly for your convenience, but it comes from Starlette.
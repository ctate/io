# Return a Response Directly

When you create a FastAPI path operation, you can return various data types: a dict, a list, a Pydantic model, a database model, etc. By default, FastAPI automatically converts the return value to JSON using the `jsonable_encoder`. This JSON-compatible data is then placed inside a `JSONResponse` for sending to the client.

You can also return a `JSONResponse` directly from your path operations, which is useful for returning custom headers or cookies.

## Return a Response

You can return any `Response` or subclass of it. `JSONResponse` is a subclass of `Response`. When you return a `Response`, FastAPI passes it directly without any data conversion, providing flexibility to return any data type and override data declarations or validations.

## Using the jsonable_encoder in a Response

Since FastAPI does not modify a returned `Response`, you must ensure its contents are ready. For instance, you cannot place a Pydantic model in a `JSONResponse` without converting it to a dict with JSON-compatible types. Use `jsonable_encoder` to convert your data before passing it to a response:

```Python
{!../../docs_src/response_directly/tutorial001.py!}
```

You can also use `from starlette.responses import JSONResponse`. FastAPI provides the same `starlette.responses` as `fastapi.responses` for developer convenience, with most responses coming directly from Starlette.

## Returning a custom Response

To return a custom response, such as XML, you can place your XML content in a string, put that in a `Response`, and return it:

```Python
{!../../docs_src/response_directly/tutorial002.py!}
```

## Notes

When returning a `Response` directly, its data is not validated, converted, or documented automatically. However, you can document it as described in Additional Responses in OpenAPI. Later sections will show how to use and declare these custom Responses while maintaining automatic data conversion and documentation.
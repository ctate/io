# Response Cookies

## Use a Response Parameter

You can declare a parameter of type `Response` in your path operation function. You can then set cookies in that temporal response object.

```Python
{!../../docs_src/response_cookies/tutorial002.py!}
```

You can return any object you need, such as a dict or a database model. If you declared a `response_model`, it will still be used to filter and convert the returned object.

FastAPI will use that temporal response to extract the cookies (as well as headers and status code) and include them in the final response, which contains the value you returned, filtered by any `response_model`.

You can also declare the `Response` parameter in dependencies and set cookies (and headers) in them.

## Return a Response Directly

You can create cookies when returning a `Response` directly in your code. To do this, create a response as described in Return a Response Directly. Then set cookies in it and return it:

```Python
{!../../docs_src/response_cookies/tutorial001.py!}
```

**Tip:** If you return a response directly instead of using the `Response` parameter, FastAPI will return it directly. Ensure your data is of the correct type, e.g., compatible with JSON if returning a `JSONResponse`, and that you are not sending any data that should have been filtered by a `response_model`.

### More Info

**Technical Details:** You can use `from starlette.responses import Response` or `from starlette.responses import JSONResponse`. FastAPI provides the same `starlette.responses` as `fastapi.responses` for convenience, but most available responses come directly from Starlette. The `Response` can frequently be used to set headers and cookies, and FastAPI also provides it at `fastapi.Response`.

To see all available parameters and options, check the documentation in Starlette.
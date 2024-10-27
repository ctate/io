# Custom Response - HTML, Stream, File, Others

By default, FastAPI returns responses using JSONResponse. You can override this by returning a Response directly. However, if you return a Response (or any subclass like JSONResponse), the data won't be automatically converted, and documentation won't be generated automatically, including the specific "media type" in the HTTP header Content-Type.

You can declare the Response you want to use in the path operation decorator using the response_class parameter. The contents returned from your path operation function will be placed inside that Response. If the Response has a JSON media type (application/json), like JSONResponse and UJSONResponse, the data returned will be automatically converted and filtered with any Pydantic response_model declared in the path operation decorator.

**Note:** If you use a response class with no media type, FastAPI will expect your response to have no content, and it will not document the response format in its generated OpenAPI docs.

## Use ORJSONResponse

For performance, you can install and use orjson and set the response to be ORJSONResponse. Import the Response subclass you want to use and declare it in the path operation decorator. For large responses, returning a Response directly is much faster than returning a dictionary, as FastAPI inspects every item to ensure it is serializable as JSON.

```Python
{!../../docs_src/custom_response/tutorial001b.py!}
```

**Info:** The parameter response_class will also define the "media type" of the response, setting the HTTP header Content-Type to application/json, which will be documented in OpenAPI.

**Tip:** ORJSONResponse is only available in FastAPI, not in Starlette.

## HTML Response

To return an HTML response directly from FastAPI, use HTMLResponse. Import HTMLResponse and pass it as the parameter response_class in your path operation decorator.

```Python
{!../../docs_src/custom_response/tutorial002.py!}
```

**Info:** The parameter response_class will define the "media type" of the response, setting the HTTP header Content-Type to text/html, which will be documented in OpenAPI.

### Return a Response

You can override the response directly in your path operation by returning it. For example, returning an HTMLResponse could look like:

```Python
{!../../docs_src/custom_response/tutorial003.py!}
```

**Warning:** A Response returned directly by your path operation function won't be documented in OpenAPI, and won't be visible in the automatic interactive docs.

**Info:** The actual Content-Type header, status code, etc., will come from the Response object returned.

### Document in OpenAPI and Override Response

To override the response from inside the function while documenting the "media type" in OpenAPI, use the response_class parameter and return a Response object. The response_class will be used only for documenting the OpenAPI path operation.

#### Return an HTMLResponse Directly

For example:

```Python
{!../../docs_src/custom_response/tutorial004.py!}
```

In this example, the function generate_html_response() generates and returns a Response instead of returning HTML as a string. By returning the result of calling generate_html_response(), you return a Response that overrides the default FastAPI behavior while allowing FastAPI to document it in OpenAPI.

## Available Responses

Here are some available responses. You can use Response to return anything else or create a custom subclass.

**Note:** You could also use from starlette.responses import HTMLResponse. FastAPI provides the same starlette.responses as fastapi.responses for convenience.

### Response

The main Response class, from which all other responses inherit. It accepts the following parameters:

- content: A str or bytes.
- status_code: An int HTTP status code.
- headers: A dict of strings.
- media_type: A str giving the media type (e.g., "text/html").

FastAPI (Starlette) will automatically include a Content-Length header and a Content-Type header based on the media_type.

```Python
{!../../docs_src/response_directly/tutorial002.py!}
```

### HTMLResponse

Returns an HTML response from text or bytes.

### PlainTextResponse

Returns a plain text response from text or bytes.

```Python
{!../../docs_src/custom_response/tutorial005.py!}
```

### JSONResponse

Returns an application/json encoded response. This is the default response used in FastAPI.

### ORJSONResponse

A fast alternative JSON response using orjson. This requires installing orjson (e.g., pip install orjson).

### UJSONResponse

An alternative JSON response using ujson. This requires installing ujson (e.g., pip install ujson).

**Warning:** ujson is less careful than Python's built-in implementation in handling some edge cases.

```Python
{!../../docs_src/custom_response/tutorial001.py!}
```

**Tip:** ORJSONResponse might be a faster alternative.

### RedirectResponse

Returns an HTTP redirect, using a 307 status code (Temporary Redirect) by default. You can return a RedirectResponse directly:

```Python
{!../../docs_src/custom_response/tutorial006.py!}
```

Or use it in the response_class parameter:

```Python
{!../../docs_src/custom_response/tutorial006b.py!}
```

You can also use the status_code parameter combined with the response_class parameter:

```Python
{!../../docs_src/custom_response/tutorial006c.py!}
```

### StreamingResponse

Streams the response body using an async generator or a normal generator/iterator.

```Python
{!../../docs_src/custom_response/tutorial007.py!}
```

#### Using StreamingResponse with File-like Objects

You can create a generator function to iterate over a file-like object (e.g., from open()). This allows you to stream the response without reading it all into memory.

```Python
{!../../docs_src/custom_response/tutorial008.py!}
```

### FileResponse

Asynchronously streams a file as the response. It takes the following arguments:

- path: The file path to stream.
- headers: Any custom headers to include.
- media_type: A string giving the media type (inferred from filename or path if unset).
- filename: Included in the response Content-Disposition.

File responses will include appropriate Content-Length, Last-Modified, and ETag headers.

```Python
{!../../docs_src/custom_response/tutorial009.py!}
```

You can also use the response_class parameter:

```Python
{!../../docs_src/custom_response/tutorial009b.py!}
```

## Custom Response Class

You can create a custom response class by inheriting from Response. For example, to use orjson with custom settings, create a CustomORJSONResponse that returns indented and formatted JSON.

```Python
{!../../docs_src/custom_response/tutorial009c.py!}
```

## Default Response Class

When creating a FastAPI class instance or an APIRouter, specify the default response class using the default_response_class parameter.

```Python
{!../../docs_src/custom_response/tutorial010.py!}
```

**Tip:** You can still override response_class in path operations.

## Additional Documentation

You can declare the media type and other details in OpenAPI using responses: Additional Responses in OpenAPI.
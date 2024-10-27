# About FastAPI

FastAPI is a modern web framework for building APIs with Python 3.6+ based on standard Python type hints. It is designed to be easy to use, fast, and efficient. FastAPI draws inspiration from several frameworks and libraries, focusing on performance and developer experience. It leverages asynchronous programming and automatic generation of OpenAPI documentation, making it a powerful choice for building APIs.

# Additional Responses in OpenAPI

This is a rather advanced topic. If you are starting with FastAPI, you might not need this.

You can declare additional responses with various status codes, media types, and descriptions. These additional responses will be included in the OpenAPI schema and will appear in the API documentation. Ensure you return a `Response` like `JSONResponse` directly, with your status code and content.

## Additional Response with `model`

You can pass a `responses` parameter to your path operation decorators. It receives a dictionary where the keys are status codes (e.g., `200`), and the values are dictionaries containing information for each response. Each response dictionary can have a key `model`, which contains a Pydantic model, similar to `response_model`. FastAPI will generate its JSON Schema and include it in the OpenAPI.

For example, to declare a response with a status code `404` and a Pydantic model `Message`, you can write:

```Python
{!../../docs_src/additional_responses/tutorial001.py!}
```

Keep in mind that you must return the `JSONResponse` directly.

The `model` key is not part of OpenAPI. FastAPI will take the Pydantic model, generate the JSON Schema, and place it correctly in the OpenAPI schema under the `content` key, which contains another JSON object. This object has a media type key (e.g., `application/json`) that contains another JSON object with a `schema` key referencing the global JSON Schemas.

The generated responses in the OpenAPI for this path operation will be:

```JSON
{
    "responses": {
        "404": {
            "description": "Additional Response",
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/components/schemas/Message"
                    }
                }
            }
        },
        "200": {
            "description": "Successful Response",
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/components/schemas/Item"
                    }
                }
            }
        },
        "422": {
            "description": "Validation Error",
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/components/schemas/HTTPValidationError"
                    }
                }
            }
        }
    }
}
```

The schemas are referenced in another part of the OpenAPI schema:

```JSON
{
    "components": {
        "schemas": {
            "Message": {
                "title": "Message",
                "required": [
                    "message"
                ],
                "type": "object",
                "properties": {
                    "message": {
                        "title": "Message",
                        "type": "string"
                    }
                }
            },
            "Item": {
                "title": "Item",
                "required": [
                    "id",
                    "value"
                ],
                "type": "object",
                "properties": {
                    "id": {
                        "title": "Id",
                        "type": "string"
                    },
                    "value": {
                        "title": "Value",
                        "type": "string"
                    }
                }
            },
            "ValidationError": {
                "title": "ValidationError",
                "required": [
                    "loc",
                    "msg",
                    "type"
                ],
                "type": "object",
                "properties": {
                    "loc": {
                        "title": "Location",
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "msg": {
                        "title": "Message",
                        "type": "string"
                    },
                    "type": {
                        "title": "Error Type",
                        "type": "string"
                    }
                }
            },
            "HTTPValidationError": {
                "title": "HTTPValidationError",
                "type": "object",
                "properties": {
                    "detail": {
                        "title": "Detail",
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/ValidationError"
                        }
                    }
                }
            }
        }
    }
}
```

## Additional Media Types for the Main Response

You can use the `responses` parameter to add different media types for the same main response. For example, you can declare that your path operation can return a JSON object (media type `application/json`) or a PNG image:

```Python
{!../../docs_src/additional_responses/tutorial002.py!}
```

You must return the image using a `FileResponse` directly. Unless you specify a different media type in your `responses` parameter, FastAPI will assume the response has the same media type as the main response class (default `application/json`).

## Combining Information

You can combine response information from multiple sources, including `response_model`, `status_code`, and `responses` parameters. You can declare a `response_model` with a default status code `200` (or a custom one) and then add additional information in `responses`.

For example, you can declare a response with a status code `404` that uses a Pydantic model and has a custom description, and a response with a status code `200` that uses your `response_model` but includes a custom example:

```Python
{!../../docs_src/additional_responses/tutorial003.py!}
```

## Combine Predefined Responses and Custom Ones

You can have predefined responses that apply to many path operations and combine them with custom responses needed for each path operation. Use the Python technique of "unpacking" a dictionary:

```Python
old_dict = {
    "old key": "old value",
    "second old key": "second old value",
}
new_dict = {**old_dict, "new key": "new value"}
```

You can use this technique to reuse predefined responses in your path operations and combine them with additional custom ones:

```Python
{!../../docs_src/additional_responses/tutorial004.py!}
```

## More Information about OpenAPI Responses

To see what you can include in the responses, check these sections in the OpenAPI specification:

- OpenAPI Responses Object
- OpenAPI Response Object

# Additional Status Codes

By default, FastAPI returns responses using a JSONResponse, placing the content from your path operation inside that JSONResponse. It uses the default status code or the one set in your path operation.

## Additional Status Codes

To return additional status codes apart from the main one, return a Response directly, such as a JSONResponse, and set the additional status code directly.

For example, if you want a path operation to update items and return HTTP status code 200 "OK" when successful, but also accept new items and return HTTP status code 201 "Created" when items didn't exist before, you can achieve this by importing JSONResponse and returning your content there directly, setting the desired status_code.

### Example Code

Python 3.10+:
```Python
{!> ../../docs_src/additional_status_codes/tutorial001_an_py310.py!}
```

Python 3.9+:
```Python
{!> ../../docs_src/additional_status_codes/tutorial001_an_py39.py!}
```

Python 3.8+:
```Python
{!> ../../docs_src/additional_status_codes/tutorial001_an.py!}
```

Python 3.10+ non-Annotated:
```Python
{!> ../../docs_src/additional_status_codes/tutorial001_py310.py!}
```

Python 3.8+ non-Annotated:
```Python
{!> ../../docs_src/additional_status_codes/tutorial001.py!}
```

### Important Notes

When returning a Response directly, it will be returned as is and won't be serialized with a model. Ensure it contains the desired data and that the values are valid JSON (if using JSONResponse).

You can also use `from starlette.responses import JSONResponse`. FastAPI provides the same starlette.responses as fastapi.responses for convenience, but most available responses come directly from Starlette, including status.

## OpenAPI and API Docs

If you return additional status codes and responses directly, they won't be included in the OpenAPI schema (API docs) because FastAPI cannot know beforehand what you will return. You can document this in your code using Additional Responses.

# Advanced Dependencies

## Parameterized Dependencies

Dependencies can be parameterized to allow setting parameters without declaring multiple functions or classes. For example, a dependency can check if the query parameter `q` contains specific content, which can be parameterized.

## Callable Instance

In Python, an instance of a class can be made callable by defining the `__call__` method. This allows FastAPI to check for additional parameters and sub-dependencies, passing values to parameters in the path operation function.

### Example Code

```Python
class FixedContentQueryChecker:
    def __init__(self, fixed_content: str):
        self.fixed_content = fixed_content

    def __call__(self, q: str):
        return self.fixed_content in q
```

## Parameterizing the Instance

The `__init__` method can be used to declare parameters for the instance, allowing the dependency to be parameterized.

### Example Code

```Python
checker = FixedContentQueryChecker("bar")
```

## Using the Instance as a Dependency

The instance can be used in a `Depends(checker)` instead of `Depends(FixedContentQueryChecker)`. FastAPI will call the instance with the query parameter:

```Python
checker(q="somequery")
```

The result will be passed as the value of the dependency in the path operation function as the parameter `fixed_content_included`.

### Example Code

```Python
@app.get("/items/")
async def read_items(fixed_content_included: bool = Depends(checker)):
    return {"fixed_content_included": fixed_content_included}
```

## Note

These examples illustrate the concept of parameterized dependencies. Similar implementations are used in security utility functions. Understanding this concept will help in grasping how those tools work.

# Async Tests

You have already seen how to test your FastAPI applications using the provided TestClient. Up to now, you have only seen how to write synchronous tests, without using async functions.

Being able to use asynchronous functions in your tests could be useful, for example, when you're querying your database asynchronously. Imagine you want to test sending requests to your FastAPI application and then verify that your backend successfully wrote the correct data in the database, while using an async database library.

## pytest.mark.anyio

If we want to call asynchronous functions in our tests, our test functions have to be asynchronous. AnyIO provides a neat plugin for this, allowing us to specify that some test functions are to be called asynchronously.

## HTTPX

Even if your FastAPI application uses normal def functions instead of async def, it is still an async application underneath.

The TestClient does some magic inside to call the asynchronous FastAPI application in your normal def test functions, using standard pytest. However, this magic doesn't work anymore when we're using it inside asynchronous functions. By running our tests asynchronously, we can no longer use the TestClient inside our test functions.

The TestClient is based on HTTPX, and we can use it directly to test the API.

## Example

For a simple example, consider a file structure similar to the one described in Bigger Applications and Testing:

```
.
├── app
│   ├── __init__.py
│   ├── main.py
│   └── test_main.py
```

The file `main.py` would have:

```Python
{!../../docs_src/async_tests/main.py!}
```

The file `test_main.py` would have the tests for `main.py`, which could look like this:

```Python
{!../../docs_src/async_tests/test_main.py!}
```

## Run it

You can run your tests as usual via:

```console
$ pytest

---> 100%
```

## In Detail

The marker `@pytest.mark.anyio` tells pytest that this test function should be called asynchronously:

```Python hl_lines="7"
{!../../docs_src/async_tests/test_main.py!}
```

Note that the test function is now async def instead of just def as before when using the TestClient.

Then we can create an AsyncClient with the app and send async requests to it, using await.

```Python hl_lines="9-12"
{!../../docs_src/async_tests/test_main.py!}
```

This is the equivalent to:

```Python
response = client.get('/')
```

...that we used to make our requests with the TestClient.

Note that we're using async/await with the new AsyncClient - the request is asynchronous.

If your application relies on lifespan events, the AsyncClient won't trigger these events. To ensure they are triggered, use LifespanManager from florimondmanca/asgi-lifespan.

## Other Asynchronous Function Calls

As the testing function is now asynchronous, you can now also call (and await) other async functions apart from sending requests to your FastAPI application in your tests, exactly as you would call them anywhere else in your code.

If you encounter a RuntimeError: Task attached to a different loop when integrating asynchronous function calls in your tests (e.g., when using MongoDB's MotorClient), remember to instantiate objects that need an event loop only within async functions, e.g., an '@app.on_event("startup")' callback.

# Behind a Proxy

In some situations, you might need to use a proxy server like Traefik or Nginx with a configuration that adds an extra path prefix that is not seen by your application. In these cases, you can use `root_path` to configure your application.

The `root_path` is a mechanism provided by the ASGI specification (that FastAPI is built on, through Starlette) and is used to handle these specific cases. It is also used internally when mounting sub-applications.

## Proxy with a Stripped Path Prefix

Having a proxy with a stripped path prefix means that you could declare a path at `/app` in your code, but then add a layer on top (the proxy) that would put your FastAPI application under a path like `/api/v1`. In this case, the original path `/app` would actually be served at `/api/v1/app`, even though all your code is written assuming there's just `/app`.

The proxy would be "stripping" the path prefix on the fly before transmitting the request to the app server (probably Uvicorn via FastAPI CLI), keeping your application convinced that it is being served at `/app`, so you don't have to update all your code to include the prefix `/api/v1`.

However, when you open the integrated docs UI, it would expect to get the OpenAPI schema at `/openapi.json`, instead of `/api/v1/openapi.json`. The frontend needs to fetch the OpenAPI schema at `/api/v1/openapi.json`.

```mermaid
graph LR
browser("Browser")
proxy["Proxy on http://0.0.0.0:9999/api/v1/app"]
server["Server on http://127.0.0.1:8000/app"]
browser --> proxy
proxy --> server
```

The IP `0.0.0.0` is commonly used to mean that the program listens on all the IPs available in that machine/server.

The docs UI would also need the OpenAPI schema to declare that this API server is located at `/api/v1`. For example:

```json
{
    "openapi": "3.1.0",
    "servers": [
        {
            "url": "/api/v1"
        }
    ],
    "paths": {
        // More stuff here
    }
}
```

In this example, the "Proxy" could be something like Traefik, and the server would be something like FastAPI CLI with Uvicorn, running your FastAPI application.

### Providing the `root_path`

To achieve this, you can use the command line option `--root-path`:

```console
$ fastapi run main.py --root-path /api/v1
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

If you use Hypercorn, it also has the option `--root-path`.

### Checking the Current `root_path`

You can get the current `root_path` used by your application for each request; it is part of the `scope` dictionary (that's part of the ASGI spec). Here we are including it in the message just for demonstration purposes.

```Python
{!../../docs_src/behind_a_proxy/tutorial001.py!}
```

If you start Uvicorn with:

```console
$ fastapi run main.py --root-path /api/v1
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

The response would be something like:

```json
{
    "message": "Hello World",
    "root_path": "/api/v1"
}
```

### Setting the `root_path` in the FastAPI App

Alternatively, if you don't have a way to provide a command line option like `--root-path`, you can set the `root_path` parameter when creating your FastAPI app:

```Python
{!../../docs_src/behind_a_proxy/tutorial002.py!}
```

Passing the `root_path` to FastAPI would be equivalent to passing the `--root-path` command line option to Uvicorn or Hypercorn.

### About `root_path`

Keep in mind that the server (Uvicorn) won't use that `root_path` for anything else than passing it to the app. If you go to http://127.0.0.1:8000/app, you will see the normal response:

```json
{
    "message": "Hello World",
    "root_path": "/api/v1"
}
```

Uvicorn will expect the proxy to access it at http://127.0.0.1:8000/app, and then it would be the proxy's responsibility to add the extra `/api/v1` prefix on top.

## About Proxies with a Stripped Path Prefix

A proxy with a stripped path prefix is only one of the ways to configure it. In many cases, the default will be that the proxy doesn't have a stripped path prefix. In such a case, the proxy would listen on something like `https://myawesomeapp.com`, and if the browser goes to `https://myawesomeapp.com/api/v1/app`, the proxy (without a stripped path prefix) would access Uvicorn at the same path: `http://127.0.0.1:8000/api/v1/app`.

## Testing Locally with Traefik

You can easily run the experiment locally with Traefik. Download Traefik, it's a single binary; you can extract the compressed file and run it directly from the terminal. Then create a file `traefik.toml` with:

```toml
[entryPoints]
  [entryPoints.http]
    address = ":9999"

[providers]
  [providers.file]
    filename = "routes.toml"
```

This tells Traefik to listen on port 9999 and to use another file `routes.toml`.

Now create that other file `routes.toml`:

```toml
[http]
  [http.middlewares]
    [http.middlewares.api-stripprefix.stripPrefix]
      prefixes = ["/api/v1"]

  [http.routers]
    [http.routers.app-http]
      entryPoints = ["http"]
      service = "app"
      rule = "PathPrefix(`/api/v1`)"
      middlewares = ["api-stripprefix"]

  [http.services]
    [http.services.app]
      [http.services.app.loadBalancer]
        [[http.services.app.loadBalancer.servers]]
          url = "http://127.0.0.1:8000"
```

This file configures Traefik to use the path prefix `/api/v1`. Traefik will redirect its requests to your Uvicorn running on `http://127.0.0.1:8000`.

Now start Traefik:

```console
$ ./traefik --configFile=traefik.toml
INFO[0000] Configuration loaded from file: /home/user/awesomeapi/traefik.toml
```

And now start your app, using the `--root-path` option:

```console
$ fastapi run main.py --root-path /api/v1
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

### Check the Responses

Now, if you go to the URL with the port for Uvicorn: http://127.0.0.1:8000/app, you will see the normal response:

```json
{
    "message": "Hello World",
    "root_path": "/api/v1"
}
```

Notice that even though you are accessing it at `http://127.0.0.1:8000/app`, it shows the `root_path` of `/api/v1`, taken from the option `--root-path`.

Now open the URL with the port for Traefik, including the path prefix: http://127.0.0.1:9999/api/v1/app. You get the same response:

```json
{
    "message": "Hello World",
    "root_path": "/api/v1"
}
```

The idea is that everyone would access the app through the proxy, so the version with the path prefix `/api/v1` is the "correct" one. The version without the path prefix (http://127.0.0.1:8000/app) is exclusively for the proxy (Traefik) to access it.

### Check the Docs UI

The "official" way to access the app would be through the proxy with the path prefix. If you try the docs UI served by Uvicorn directly, without the path prefix in the URL, it won't work, because it expects to be accessed through the proxy. 

You can check it at http://127.0.0.1:8000/docs. 

But if you access the docs UI at the "official" URL using the proxy with port `9999`, at `/api/v1/docs`, it works correctly!

This is because FastAPI uses this `root_path` to create the default `server` in OpenAPI with the URL provided by `root_path`.

## Additional Servers

By default, FastAPI will create a `server` in the OpenAPI schema with the URL for the `root_path`. You can also provide other alternative `servers`, for example, if you want the same docs UI to interact with both a staging and a production environment. If you pass a custom list of `servers` and there's a `root_path`, FastAPI will insert a "server" with this `root_path` at the beginning of the list.

```Python
{!../../docs_src/behind_a_proxy/tutorial003.py!}
```

Will generate an OpenAPI schema like:

```json
{
    "openapi": "3.1.0",
    "servers": [
        {
            "url": "/api/v1"
        },
        {
            "url": "https://stag.example.com",
            "description": "Staging environment"
        },
        {
            "url": "https://prod.example.com",
            "description": "Production environment"
        }
    ],
    "paths": {
        // More stuff here
    }
}
```

In the docs UI at http://127.0.0.1:9999/api/v1/docs, it would show the auto-generated server with a `url` value of `/api/v1`, taken from the `root_path`.

### Disable Automatic Server from `root_path`

If you don't want FastAPI to include an automatic server using the `root_path`, you can use the parameter `root_path_in_servers=False`:

```Python
{!../../docs_src/behind_a_proxy/tutorial004.py!}
```

And then it won't include it in the OpenAPI schema.

## Mounting a Sub-Application

If you need to mount a sub-application while also using a proxy with `root_path`, you can do it normally, as you would expect. FastAPI will internally use the `root_path` smartly, so it will just work.

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

# Using Dataclasses

FastAPI is built on top of Pydantic, allowing the use of `dataclasses` similarly to Pydantic models for declaring requests and responses. 

Pydantic provides internal support for `dataclasses`, enabling FastAPI to convert standard dataclasses to Pydantic's version. This supports:

- Data validation
- Data serialization
- Data documentation

While dataclasses can't perform all functions of Pydantic models, they can be useful for existing dataclasses in web APIs.

## Dataclasses in `response_model`

Dataclasses can be used in the `response_model` parameter, automatically converting them to Pydantic dataclasses. This ensures their schema appears in the API documentation.

## Dataclasses in Nested Data Structures

Dataclasses can be combined with other type annotations to create nested data structures. If issues arise with API documentation, switch from standard `dataclasses` to `pydantic.dataclasses`, which serves as a drop-in replacement.

1. Import `field` from standard `dataclasses`.
2. Use `pydantic.dataclasses` as a replacement.
3. The `Author` dataclass can include a list of `Item` dataclasses.
4. Use the `Author` dataclass in the `response_model` parameter.
5. Other standard type annotations can be used with dataclasses.
6. Return a dictionary containing lists of dataclasses, with FastAPI serializing the data to JSON.
7. The `response_model` can use a list of `Author` dataclasses.
8. Path operation functions can use regular `def` instead of `async def`.
9. The function may return dictionaries instead of dataclasses, with FastAPI converting the response using the `response_model`.

Dataclasses can be combined with various type annotations to form complex data structures.

## Learn More

Dataclasses can be combined with Pydantic models, inherited, or included in custom models. For further information, refer to the Pydantic documentation on dataclasses.

## Version

This feature is available since FastAPI version 0.67.0.

# Lifespan Events

You can define logic that should be executed before the application starts up. This code will be executed once, before the application starts receiving requests.

Similarly, you can define logic that should be executed when the application is shutting down. This code will be executed once, after handling possibly many requests.

This code covers the whole application lifespan, which is important for setting up resources that are shared among requests and need to be cleaned up afterwards, such as a database connection pool or loading a shared machine learning model.

## Use Case

Imagine you have machine learning models that you want to use to handle requests. These models are shared among requests, and loading the model can take considerable time due to reading data from disk. You want to load it before handling requests, but only right before the application starts receiving requests, not while the code is being loaded.

## Lifespan

You can define startup and shutdown logic using the `lifespan` parameter of the FastAPI app and a context manager.

Create an async function `lifespan()` with `yield`:

```Python
{!../../docs_src/events/tutorial003.py!}
```

Before the `yield`, simulate the expensive startup operation of loading the model. This code will be executed before the application starts taking requests. After the `yield`, unload the model, which will be executed after the application finishes handling requests, right before shutdown.

### Lifespan Function

The async function with `yield` is similar to Dependencies with `yield`. The first part of the function executes before the application starts, and the part after the `yield` executes after the application has finished.

### Async Context Manager

The function is decorated with `@asynccontextmanager`, converting it into an async context manager. You can use it with `async with`:

```Python
async with lifespan(app):
    await do_stuff()
```

Before entering the `with` block, the code before the `yield` executes, and after exiting the block, the code after the `yield` executes. Pass the `lifespan` async context manager to FastAPI.

## Alternative Events (deprecated)

The recommended way to handle startup and shutdown is using the `lifespan` parameter. If you provide a `lifespan` parameter, `startup` and `shutdown` event handlers will not be called.

### `startup` Event

To add a function that runs before the application starts, declare it with the event `"startup"`:

```Python
{!../../docs_src/events/tutorial001.py!}
```

The startup event handler function will initialize items, and the application won't start receiving requests until all startup event handlers have completed.

### `shutdown` Event

To add a function that runs when the application is shutting down, declare it with the event `"shutdown"`:

```Python
{!../../docs_src/events/tutorial002.py!}
```

The shutdown event handler function will write a line to a file.

### `startup` and `shutdown` Together

The logic for startup and shutdown is often connected. Using the `lifespan` is now recommended for better management of shared logic and resources.

## Technical Details

This is part of the Lifespan Protocol defined in the ASGI technical specification. You can read more about the Starlette lifespan handlers in Starlette's documentation.

## Sub Applications

Lifespan events (startup and shutdown) will only be executed for the main application, not for sub applications.

# Generate Clients

FastAPI is based on the OpenAPI specification, providing automatic compatibility with various tools, including automatic API documentation via Swagger UI. A notable advantage is the ability to generate clients (SDKs) for your API in multiple programming languages.

## OpenAPI Client Generators

Numerous tools exist for generating clients from OpenAPI. A common tool is OpenAPI Generator. For frontend development, an interesting alternative is openapi-ts.

## Client and SDK Generators - Sponsor

Several company-backed client and SDK generators based on OpenAPI (FastAPI) offer additional features on top of high-quality generated SDKs/clients. Some of these companies sponsor FastAPI, ensuring its continued development and a healthy ecosystem. Examples include:

- Speakeasy
- Stainless
- liblab

Many other companies provide similar services that can be found online.

## Generate a TypeScript Frontend Client

### FastAPI Application Example

A simple FastAPI application can be created as follows:

```Python
# Python 3.9+
{!> ../../docs_src/generate_clients/tutorial001_py39.py!}
```

```Python
# Python 3.8+
{!> ../../docs_src/generate_clients/tutorial001.py!}
```

The path operations define the models used for request and response payloads, utilizing the models `Item` and `ResponseMessage`.

### API Docs

The API docs display schemas for data sent in requests and received in responses, derived from the app's OpenAPI schema.

### Generate a TypeScript Client

#### Install openapi-ts

Install openapi-ts in your frontend code:

```console
$ npm install @hey-api/openapi-ts --save-dev
```

#### Generate Client Code

To generate the client code, use the command line application `openapi-ts`. Add the following script to your `package.json`:

```JSON
{
  "name": "frontend-app",
  "version": "1.0.0",
  "scripts": {
    "generate-client": "openapi-ts --input http://localhost:8000/openapi.json --output ./src/client --client axios"
  },
  "devDependencies": {
    "@hey-api/openapi-ts": "^0.27.38",
    "typescript": "^4.6.2"
  }
}
```

Run the script:

```console
$ npm run generate-client
```

This command generates code in `./src/client` using `axios`.

### Try Out the Client Code

You can import and use the client code, benefiting from autocompletion for methods and payloads.

## FastAPI App with Tags

For larger FastAPI apps, tags can be used to separate different groups of path operations. Example:

```Python
# Python 3.9+
{!> ../../docs_src/generate_clients/tutorial002_py39.py!}
```

```Python
# Python 3.8+
{!> ../../docs_src/generate_clients/tutorial002.py!}
```

### Generate a TypeScript Client with Tags

Generating a client for a FastAPI app using tags will separate the client code based on those tags, resulting in organized client code.

### Client Method Names

Generated method names may not be clean, as they use the OpenAPI internal operation ID. FastAPI ensures unique operation IDs by combining the function name, path, and HTTP method.

## Custom Operation IDs and Better Method Names

You can modify the generation of operation IDs for simpler method names. Ensure each operation ID remains unique, possibly by using tags.

### Custom Generate Unique ID Function

Customize the unique ID function for path operations. Example:

```Python
# Python 3.9+
{!> ../../docs_src/generate_clients/tutorial003_py39.py!}
```

```Python
# Python 3.8+
{!> ../../docs_src/generate_clients/tutorial003.py!}
```

### Generate a TypeScript Client with Custom Operation IDs

Regenerating the client will yield improved method names, reflecting the tag and function name without URL path information.

### Preprocess the OpenAPI Specification for the Client Generator

To eliminate duplicated information in method names, preprocess the OpenAPI JSON to remove prefixed tags. Example scripts:

```Python
# Python
{!> ../../docs_src/generate_clients/tutorial004.py!}
```

```Javascript
# Node.js
{!> ../../docs_src/generate_clients/tutorial004.js!}
```

### Generate a TypeScript Client with the Preprocessed OpenAPI

Modify `package.json` to use the local OpenAPI file:

```JSON
{
  "name": "frontend-app",
  "version": "1.0.0",
  "scripts": {
    "generate-client": "openapi-ts --input ./openapi.json --output ./src/client --client axios"
  },
  "devDependencies": {
    "@hey-api/openapi-ts": "^0.27.38",
    "typescript": "^4.6.2"
  }
}
```

After generating the new client, you will have clean method names with autocompletion and inline errors.

## Benefits

Using automatically generated clients provides autocompletion for methods, request payloads, and response payloads, along with inline errors. Updates to the backend code can be reflected in the frontend by regenerating the client, allowing for early error detection during development.

# Advanced User Guide

## Additional Features

The main Tutorial - User Guide should be enough to give you a tour through all the main features of **FastAPI**.

In the next sections, you will see other options, configurations, and additional features.

**Tip:** The next sections are **not necessarily "advanced"**. It is possible that for your use case, the solution is in one of them.

## Read the Tutorial First

You could still use most of the features in **FastAPI** with the knowledge from the main Tutorial - User Guide. The next sections assume you have already read it and know those main ideas.

## External Courses

Although the Tutorial - User Guide and this **Advanced User Guide** are written as a guided tutorial (like a book) and should be enough for you to **learn FastAPI**, you might want to complement it with additional courses. Alternatively, you may prefer other courses that adapt better to your learning style.

Some course providers sponsor FastAPI, ensuring the continued and healthy development of FastAPI and its ecosystem. This shows their commitment to FastAPI and its community, as they aim to provide you with a good learning experience and ensure you have a good and healthy framework.

You might want to try their courses:

* Talk Python Training - fastapi-courses
* Test-Driven Development - tdd-fastapi

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

# OpenAPI Callbacks

You can create an API with a path operation that triggers a request to an external API created by another developer, often the same developer using your API. This process is called a "callback," where your API sends a request to the external API.

## An App with Callbacks

For example, consider an app that allows creating invoices with fields such as `id`, `title` (optional), `customer`, and `total`. The external developer will create an invoice in your API using a POST request. Your API will then:

- Send the invoice to a customer of the external developer.
- Collect the payment.
- Send a notification back to the API user (the external developer) via a POST request to the external API (the callback).

## The Normal FastAPI App

Initially, the API app will have a path operation that receives an `Invoice` body and a query parameter `callback_url` containing the callback URL. 

```Python
{!../../docs_src/openapi_callbacks/tutorial001.py!}
```

The `callback_url` query parameter uses a Pydantic Url type.

The new addition is `callbacks=invoices_callback_router.routes` as an argument to the path operation decorator.

## Documenting the Callback

The callback code will depend on your API app and may vary significantly. A simple callback might look like this:

```Python
callback_url = "https://example.com/api/v1/invoices/events/"
httpx.post(callback_url, json={"description": "Invoice paid", "paid": True})
```

The critical part is ensuring that the external developer implements the external API correctly according to the data your API will send in the callback request body.

This documentation will appear in the Swagger UI at `/docs`, guiding external developers on how to build the external API.

## Write the Callback Documentation Code

This code is for documenting how the external API should look. You can create automatic documentation for an API with FastAPI, which will help document the external API by creating the necessary path operation(s).

### Create a Callback APIRouter

First, create a new `APIRouter` for the callbacks.

```Python
{!../../docs_src/openapi_callbacks/tutorial001.py!}
```

### Create the Callback Path Operation

Use the created `APIRouter` to define the callback path operation. It should resemble a normal FastAPI path operation:

- It should declare the body it will receive, e.g., `body: InvoiceEvent`.
- It could declare the response it should return, e.g., `response_model=InvoiceEventReceived`.

```Python
{!../../docs_src/openapi_callbacks/tutorial001.py!}
```

Key differences from a normal path operation:

- It doesn't need actual code since your app will not call this code; the function can simply use `pass`.
- The path can include an OpenAPI 3 expression, allowing the use of variables from the original request sent to your API.

### The Callback Path Expression

The callback path can include an OpenAPI 3 expression containing parts of the original request. For example:

```Python
"{$callback_url}/invoices/{$request.body.id}"
```

If the external developer sends a request to your API with:

```
https://yourapi.com/invoices/?callback_url=https://www.external.org/events
```

and a JSON body of:

```JSON
{
    "id": "2expen51ve",
    "customer": "Mr. Richie Rich",
    "total": "9999"
}
```

Your API will process the invoice and send a callback request to the external API:

```
https://www.external.org/events/invoices/2expen51ve
```

with a JSON body like:

```JSON
{
    "description": "Payment celebration",
    "paid": true
}
```

It expects a response from the external API with a JSON body like:

```JSON
{
    "ok": true
}
```

### Add the Callback Router

Now that you have the callback path operation(s) in the callback router, use the `callbacks` parameter in your API's path operation decorator to pass the `.routes` attribute from that callback router:

```Python
{!../../docs_src/openapi_callbacks/tutorial001.py!}
```

### Check the Docs

Start your app and navigate to the documentation at `http://127.0.0.1:8000/docs`. You will see a "Callbacks" section for your path operation, detailing how the external API should be structured.

# OpenAPI Webhooks

Webhooks allow your API to notify users' applications by sending requests with data, typically to inform them of events. This process reverses the usual flow where users send requests to your API; instead, your API sends requests to their systems.

## Webhook Process

1. **Define Message**: You specify the message and the body of the request in your code.
2. **Trigger Events**: You determine when your app will send these requests or events.
3. **User Configuration**: Users provide the URL where your app should send requests, often through a web dashboard.

You are responsible for the logic to register URLs for webhooks and the code to send requests, which you can implement in your own code.

## Documenting Webhooks with FastAPI and OpenAPI

Using FastAPI with OpenAPI, you can define webhook names, the types of HTTP operations (e.g., `POST`, `PUT`), and the request bodies your app will send. This simplifies the process for users to implement their APIs to receive webhook requests, potentially allowing them to autogenerate some of their API code.

Webhooks are available in OpenAPI 3.1.0 and above, supported by FastAPI 0.99.0 and above.

## Creating a FastAPI Application with Webhooks

In a FastAPI application, use the `webhooks` attribute to define webhooks similarly to path operations, for example with `@app.webhooks.post()`.

```Python
{!../../docs_src/openapi_webhooks/tutorial001.py!}
```

The defined webhooks will appear in the OpenAPI schema and the automatic documentation UI.

The `app.webhooks` object is an `APIRouter`, similar to what you would use for structuring your app with multiple files.

When defining webhooks, you do not declare a path (like `/items/`). Instead, the text you provide is an identifier for the webhook (the event name), such as in `@app.webhooks.post("new-subscription")`, where `new-subscription` is the webhook name. Users will define the actual URL path for receiving webhook requests elsewhere.

### Accessing Documentation

Start your app and navigate to the documentation at 127.0.0.1:8000/docs. You will see the usual path operations along with the defined webhooks.

# Path Operation Advanced Configuration

## OpenAPI operationId

You can set the OpenAPI `operationId` for your path operation using the parameter `operation_id`. Ensure it is unique for each operation.

### Using the path operation function name as the operationId

To use your API's function names as `operationId`s, iterate over all of them and override each path operation's `operation_id` using their `APIRoute.name`. Do this after adding all your path operations.

**Note:** If you manually call `app.openapi()`, update the `operationId`s before that. Ensure each path operation function has a unique name, even across different modules.

## Exclude from OpenAPI

To exclude a path operation from the generated OpenAPI schema, use the parameter `include_in_schema` and set it to `False`.

## Advanced description from docstring

Limit the lines used from the docstring of a path operation function for OpenAPI by adding an `\f` (escaped "form feed" character). This truncates the output for OpenAPI at this point, while allowing other tools to use the rest.

## Additional Responses

You can declare additional responses with their models, status codes, etc. Refer to the documentation about Additional Responses in OpenAPI for more details.

## OpenAPI Extra

When declaring a path operation, FastAPI automatically generates relevant metadata for the OpenAPI schema, including `tags`, `parameters`, `requestBody`, `responses`, etc. You can extend this schema using the parameter `openapi_extra`.

### OpenAPI Extensions

The `openapi_extra` parameter can be used to declare OpenAPI Extensions. This extension will appear at the bottom of the specific path operation in the automatic API docs and in the resulting OpenAPI schema.

### Custom OpenAPI path operation schema

The dictionary in `openapi_extra` merges with the automatically generated OpenAPI schema. You can add additional data to the schema, even if you are not using FastAPI's automatic features.

### Custom OpenAPI content type

You can use a Pydantic model to define the JSON Schema included in the custom OpenAPI schema section for the path operation, even if the request data type is not JSON. This allows you to declare the request content type as YAML, for example, while still using a Pydantic model to generate the JSON Schema.

**Note:** In Pydantic version 1, the method to get the JSON Schema for a model was `Item.schema()`, while in Pydantic version 2, it is `Item.model_json_schema()`. Similarly, the method to parse and validate an object changed from `Item.parse_obj()` in version 1 to `Item.model_validate()` in version 2.

# Response - Change Status Code

You can set a default Response Status Code. However, there are cases where you need to return a different status code than the default.

## Use Case

For instance, you may want to return an HTTP status code of "OK" (200) by default. If the data doesn't exist, you want to create it and return an HTTP status code of "CREATED" (201). You still want to filter and convert the data returned with a response model.

In such cases, you can use a Response parameter.

## Use a Response Parameter

Declare a parameter of type Response in your path operation function, similar to how you would for cookies and headers. You can then set the status_code in that temporal response object.

```Python
{!../../docs_src/response_change_status_code/tutorial001.py!}
```

You can return any object you need, such as a dict or a database model. If you declared a response_model, it will still be used to filter and convert the returned object.

FastAPI will use that temporal response to extract the status code (as well as cookies and headers) and include them in the final response, which contains the value you returned, filtered by any response_model.

You can also declare the Response parameter in dependencies and set the status code there. Note that the last one to be set will take precedence.

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

# HTTP Basic Auth

HTTP Basic Auth allows applications to authenticate users via a header containing a username and password. If the credentials are not provided, an HTTP 401 "Unauthorized" error is returned, along with a `WWW-Authenticate` header indicating `Basic` and an optional `realm` parameter. This prompts the browser to request the username and password.

## Simple HTTP Basic Auth

1. Import `HTTPBasic` and `HTTPBasicCredentials`.
2. Create a security scheme using `HTTPBasic`.
3. Use the security scheme with a dependency in your path operation.
4. It returns an object of type `HTTPBasicCredentials`, which contains the `username` and `password`.

When accessing the URL for the first time, the browser will prompt for credentials.

## Check the Username

To verify the username and password, use the Python standard module `secrets`. The `secrets.compare_digest()` function requires `bytes` or a `str` with ASCII characters. Convert the `username` and `password` to `bytes` using UTF-8 encoding before comparison.

Example:

```Python
if not (credentials.username == "stanleyjobson") or not (credentials.password == "swordfish"):
    # Return some error
    ...
```

Using `secrets.compare_digest()` protects against timing attacks.

### Timing Attacks

Timing attacks occur when attackers guess usernames and passwords. For instance, if an attacker tries `johndoe` and `love123`, the application may quickly return "Incorrect username or password" after the first character comparison. However, if they try `stanleyjobsox`, the application takes longer to respond, revealing that some characters were correct.

Attackers can exploit this timing difference to deduce correct characters, potentially guessing the username and password over time.

### Fix with `secrets.compare_digest()`

Using `secrets.compare_digest()` ensures that all comparisons take the same amount of time, regardless of the input. This mitigates the risk of timing attacks.

### Return the Error

If the credentials are incorrect, return an `HTTPException` with a status code of 401 and include the `WWW-Authenticate` header to prompt the browser for login credentials again.

# Advanced Security

## Additional Features

There are extra features to handle security apart from those covered in the Tutorial - User Guide: Security.

Note: The next sections are not necessarily "advanced," and it is possible that for your use case, the solution is in one of them.

## Read the Tutorial First

The next sections assume you have already read the main Tutorial - User Guide: Security. They are all based on the same concepts but allow for some extra functionalities.

# OAuth2 Scopes

OAuth2 scopes can be used directly with FastAPI, allowing for a fine-grained permission system integrated into your OpenAPI application and API documentation. This mechanism is utilized by major authentication providers like Facebook, Google, GitHub, Microsoft, and Twitter to provide specific permissions to users and applications.

## Overview

OAuth2 scopes are defined as a list of strings separated by spaces, representing permissions. In OpenAPI, security schemes can declare and use these scopes. Common examples include:
- `users:read`
- `users:write`
- `instagram_basic` (Facebook/Instagram)
- `https://www.googleapis.com/auth/drive` (Google)

## Global View

The following changes are made to the examples in the main Tutorial - User Guide for OAuth2 with Password (and hashing), Bearer with JWT tokens, now using OAuth2 scopes.

### OAuth2 Security Scheme

Declare the OAuth2 security scheme with available scopes, such as `me` and `items`. The `scopes` parameter receives a dictionary with each scope as a key and its description as the value.

### JWT Token with Scopes

Modify the token path operation to return the requested scopes. The `OAuth2PasswordRequestForm` includes a `scopes` property with a list of strings representing the scopes received in the request.

### Declare Scopes in Path Operations and Dependencies

Declare that the path operation for `/users/me/items/` requires the scope `items` using `Security` from FastAPI. The `Security` function allows for declaring dependencies and specifying scopes.

### Use SecurityScopes

Update the dependency `get_current_user` to include a parameter of type `SecurityScopes`, which contains all required scopes.

### Use the Scopes

The `security_scopes` parameter will have a property `scopes` with a list of all required scopes. An `HTTPException` can be raised if the required scopes are not included in the token.

### Verify the Username and Data Shape

Verify that a `username` is provided and extract the scopes. Validate the data with a Pydantic model, ensuring it matches the expected structure.

### Verify the Scopes

Check that all required scopes are included in the token received. Raise an `HTTPException` if any required scopes are missing.

### Dependency Tree and Scopes

The dependency tree illustrates how scopes are inherited through dependencies. Each path operation can declare its own required scopes, which are then checked against the token.

### More Details About SecurityScopes

`SecurityScopes` can be used at any point in the dependency tree, allowing for flexible scope management across different path operations.

## Check It

In the API docs, you can authenticate and specify which scopes to authorize. If no scopes are selected, access to certain endpoints will be restricted based on the permissions granted.

## About Third Party Integrations

When building an OAuth2 application for third-party integrations, consider using the implicit flow or code flow for enhanced security. FastAPI provides utilities for various OAuth2 authentication flows in `fastapi.security.oauth2`.

## Security in Decorator Dependencies

You can define a list of `Security` dependencies in the decorator's `dependencies` parameter, similar to how `Depends` is used.

# Settings and Environment Variables

Your application may require external settings or configurations, such as secret keys, database credentials, and email service credentials. These settings are often variable and can be sensitive, so they are typically provided as environment variables.

## Types and Validation

Environment variables can only handle text strings, as they must be compatible with various programs and operating systems. Any value read from an environment variable in Python will be a `str`, and any type conversion or validation must be handled in code.

## Pydantic Settings

Pydantic offers a utility for managing settings from environment variables.

### Install pydantic-settings

Create and activate your virtual environment, then install the `pydantic-settings` package:

```
$ pip install pydantic-settings
```

It is also included when you install the `all` extras with:

```
$ pip install "fastapi[all]"
```

### Create the Settings Object

Import `BaseSettings` from Pydantic and create a subclass. Declare class attributes with type annotations and default values, using validation features similar to Pydantic models.

#### Example for Pydantic v2

```Python
{!> ../../docs_src/settings/tutorial001.py!}
```

#### Example for Pydantic v1

```Python
{!> ../../docs_src/settings/tutorial001_pv1.py!}
```

When you create an instance of the `Settings` class, Pydantic reads environment variables in a case-insensitive manner, converting and validating the data accordingly.

### Use the Settings

You can use the `settings` object in your application:

```Python
{!../../docs_src/settings/tutorial001.py!}
```

### Run the Server

Run the server with environment variables:

```
$ ADMIN_EMAIL="deadpool@example.com" APP_NAME="ChimichangApp" fastapi run main.py
```

The `admin_email` will be set to `"deadpool@example.com"` and `app_name` to `"ChimichangApp"`.

## Settings in Another Module

You can place settings in a separate module, such as `config.py`:

```Python
{!../../docs_src/settings/app01/config.py!}
```

And use it in `main.py`:

```Python
{!../../docs_src/settings/app01/main.py!}
```

## Settings in a Dependency

You can provide settings from a dependency instead of using a global `settings` object. This is useful for testing, as you can easily override a dependency.

### Config File Example

Your `config.py` file could look like this:

```Python
{!../../docs_src/settings/app02/config.py!}
```

### Main App File Example

Create a dependency that returns a new `config.Settings()`.

#### Example for Python 3.9+

```Python
{!> ../../docs_src/settings/app02_an_py39/main.py!}
```

#### Example for Python 3.8+

```Python
{!> ../../docs_src/settings/app02_an/main.py!}
```

### Settings and Testing

You can provide a different settings object during testing by creating a dependency override for `get_settings`:

```Python
{!../../docs_src/settings/app02/test_main.py!}
```

## Reading a .env File

For many settings that change frequently, you can use a `.env` file to read them as environment variables. This file is commonly referred to as a "dotenv."

### Example .env File

```bash
ADMIN_EMAIL="deadpool@example.com"
APP_NAME="ChimichangApp"
```

### Read Settings from .env

Update your `config.py`:

#### Example for Pydantic v2

```Python
{!> ../../docs_src/settings/app03_an/config.py!}
```

#### Example for Pydantic v1

```Python
{!> ../../docs_src/settings/app03_an/config_pv1.py!}
```

### Creating the Settings Only Once with lru_cache

To avoid reading the `.env` file multiple times, use the `@lru_cache` decorator to create the `Settings` object only once:

#### Example for Python 3.9+

```Python
{!> ../../docs_src/settings/app03_an_py39/main.py!}
```

#### Example for Python 3.8+

```Python
{!> ../../docs_src/settings/app03_an/main.py!}
```

## Recap

Pydantic Settings allows you to manage application settings with the power of Pydantic models. You can simplify testing with dependencies, use `.env` files, and avoid redundant file reads with `@lru_cache`.

# Sub Applications - Mounts

To create two independent FastAPI applications with their own OpenAPI and documentation UIs, you can have a main app and "mount" one or more sub-applications.

## Mounting a FastAPI Application

"Mounting" refers to adding an independent application at a specific path, which handles all operations under that path.

### Top-level Application

First, create the main FastAPI application and its path operations:

```Python
# Example code for top-level application
```

### Sub-application

Next, create your sub-application and its path operations. This sub-application is a standard FastAPI application that will be mounted:

```Python
# Example code for sub-application
```

### Mount the Sub-application

In your top-level application, mount the sub-application at the desired path, for example, `/subapi`:

```Python
# Example code for mounting the sub-application
```

### Check the Automatic API Docs

Run the FastAPI command with your file:

```console
$ fastapi dev main.py
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

Open the documentation at http://127.0.0.1:8000/docs to see the automatic API docs for the main app, which includes only its own path operations.

Then, access the sub-application docs at http://127.0.0.1:8000/subapi/docs to view its automatic API docs, which include only its own path operations under the `/subapi` prefix.

Both user interfaces will function correctly, allowing interaction with each specific app or sub-app.

### Technical Details: `root_path`

When mounting a sub-application, FastAPI communicates the mount path using a mechanism from the ASGI specification called `root_path`. This allows the sub-application to use the path prefix for its documentation UI. Sub-applications can also have their own mounted sub-applications, and FastAPI will manage all `root_path`s automatically. 

For more information on `root_path` and its explicit usage, refer to the section about Behind a Proxy.

# Templates

You can use any template engine with FastAPI. A common choice is Jinja2, which is also used by Flask and other tools. Utilities are available to configure it easily in your FastAPI application (provided by Starlette).

## Install dependencies

Create a virtual environment, activate it, and install `jinja2`:

```
$ pip install jinja2
```

## Using Jinja2Templates

1. Import `Jinja2Templates`.
2. Create a `templates` object for reuse.
3. Declare a `Request` parameter in the path operation that returns a template.
4. Use the `templates` object to render and return a `TemplateResponse`, passing the template name, request object, and a context dictionary with key-value pairs for the Jinja2 template.

```Python
{!../../docs_src/templates/tutorial001.py!}
```

**Note:** Before FastAPI 0.108.0 and Starlette 0.29.0, the `name` was the first parameter, and the `request` object was included in the context dictionary.

**Tip:** By declaring `response_class=HTMLResponse`, the docs UI will recognize that the response will be HTML.

**Technical Details:** You can also use `from starlette.templating import Jinja2Templates`. FastAPI provides `starlette.templating` as `fastapi.templating` for convenience, but most responses come from Starlette.

## Writing templates

Create a template at `templates/item.html`:

```jinja
{!../../docs_src/templates/templates/item.html!}
```

### Template Context Values

In the HTML:

```jinja
Item ID: {{ id }}
```

This will display the `id` from the context dictionary:

```Python
{"id": id}
```

For example, with an ID of `42`, it renders:

```html
Item ID: 42
```

### Template url_for Arguments

You can use `url_for()` in the template, which takes the same arguments as your path operation function. For example:

```jinja
<a href="{{ url_for('read_item', id=id) }}">
```

With an ID of `42`, this renders:

```html
<a href="/items/42">
```

## Templates and static files

You can also use `url_for()` for static files mounted with `name="static"`:

```jinja
{!../../docs_src/templates/templates/item.html!}
```

This links to a CSS file at `static/styles.css`:

```CSS
{!../../docs_src/templates/static/styles.css!}
```

The CSS file will be served automatically by your FastAPI application at the URL `/static/styles.css`.

## More details

For more details, including how to test templates, check Starlette's documentation on templates.

# Testing Dependencies with Overrides

## Overriding Dependencies During Testing

In certain scenarios, you may want to override a dependency during testing. This allows you to prevent the original dependency and its sub-dependencies from running. Instead, you can provide a different dependency that will be used solely for tests, offering a value that can replace the original dependency's value.

### Use Cases: External Service

For example, consider an external authentication provider that you need to call. You send it a token, and it returns an authenticated user. This provider may charge you per request and could take longer to respond than if you used a fixed mock user for tests. You might want to test the external provider once but avoid calling it for every test. In this case, you can override the dependency that calls the provider and use a custom dependency that returns a mock user only for your tests.

### Using the `app.dependency_overrides` Attribute

Your FastAPI application has an attribute `app.dependency_overrides`, which is a simple dictionary. To override a dependency for testing, use the original dependency (a function) as the key and your dependency override (another function) as the value. FastAPI will then call the override instead of the original dependency.

#### Example Code Snippets

For Python 3.10+:

```Python
{!> ../../docs_src/dependency_testing/tutorial001_an_py310.py!}
```

For Python 3.9+:

```Python
{!> ../../docs_src/dependency_testing/tutorial001_an_py39.py!}
```

For Python 3.8+:

```Python
{!> ../../docs_src/dependency_testing/tutorial001_an.py!}
```

For Python 3.10+ non-Annotated:

```Python
{!> ../../docs_src/dependency_testing/tutorial001_py310.py!}
```

For Python 3.8+ non-Annotated:

```Python
{!> ../../docs_src/dependency_testing/tutorial001.py!}
```

### Tips

- Prefer using the `Annotated` version if possible.
- You can set a dependency override for any dependency used in your FastAPI application, including those in path operation functions, decorators, or `.include_router()` calls.
- To reset your overrides, set `app.dependency_overrides` to an empty dictionary:

```Python
app.dependency_overrides = {}
```

- If you want to override a dependency only during specific tests, set the override at the beginning of the test function and reset it at the end.

# Testing Events: Startup - Shutdown

To run your event handlers (`startup` and `shutdown`) in tests, utilize the `TestClient` with a `with` statement:

```Python
{!../../docs_src/app_testing/tutorial003.py!}
```

# Testing WebSockets

You can use the same `TestClient` to test WebSockets. For this, use the `TestClient` in a `with` statement, connecting to the WebSocket:

```Python
{!../../docs_src/app_testing/tutorial002.py!}
```

For more details, check Starlette's documentation for testing WebSockets.

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

# WebSockets

You can use WebSockets with FastAPI.

## Install WebSockets

Create a virtual environment, activate it, and install `websockets`:

```console
$ pip install websockets
```

## WebSockets Client

In production, you would typically use a frontend framework like React, Vue.js, or Angular to communicate with your WebSocket backend. Alternatively, a native mobile application can communicate directly with the WebSocket backend.

For this example, we will use a simple HTML document with JavaScript, which is not optimal for production but serves as a basic server-side example:

```Python
{!../../docs_src/websockets/tutorial001.py!}
```

## Create a WebSocket

In your FastAPI application, create a WebSocket:

```Python
{!../../docs_src/websockets/tutorial001.py!}
```

You can also use `from starlette.websockets import WebSocket`. FastAPI provides the same `WebSocket` for convenience.

## Await for Messages and Send Messages

In your WebSocket route, you can await for messages and send messages:

```Python
{!../../docs_src/websockets/tutorial001.py!}
```

You can receive and send binary, text, and JSON data.

## Try It

If your file is named `main.py`, run your application with:

```console
$ fastapi dev main.py
```

Open your browser at http://127.0.0.1:8000. You will see a simple page where you can type messages in the input box and send them. Your FastAPI application with WebSockets will respond back, allowing you to send and receive multiple messages over the same WebSocket connection.

## Using Depends and Others

In WebSocket endpoints, you can import from FastAPI and use:

- Depends
- Security
- Cookie
- Header
- Path
- Query

They work the same way as for other FastAPI endpoints:

```Python
{!> ../../docs_src/websockets/tutorial002_an_py310.py!}
```

```Python
{!> ../../docs_src/websockets/tutorial002_an_py39.py!}
```

```Python
{!> ../../docs_src/websockets/tutorial002_an.py!}
```

```Python
{!> ../../docs_src/websockets/tutorial002_py310.py!}
```

```Python
{!> ../../docs_src/websockets/tutorial002.py!}
```

As this is a WebSocket, it doesn't make sense to raise an `HTTPException`; instead, raise a `WebSocketException`. You can use a closing code from valid codes defined in the specification.

### Try the WebSockets with Dependencies

If your file is named `main.py`, run your application with:

```console
$ fastapi dev main.py
```

Open your browser at http://127.0.0.1:8000. You can set the "Item ID" used in the path and the "Token" used as a query parameter.

With that, you can connect the WebSocket and send and receive messages.

## Handling Disconnections and Multiple Clients

When a WebSocket connection is closed, `await websocket.receive_text()` will raise a `WebSocketDisconnect` exception, which you can catch and handle:

```Python
{!> ../../docs_src/websockets/tutorial003_py39.py!}
```

```Python
{!> ../../docs_src/websockets/tutorial003.py!}
```

To try it out, open the app with several browser tabs, write messages, and then close one of the tabs. This will raise the `WebSocketDisconnect` exception, and all other clients will receive a message indicating that a client has left the chat.

The app is a minimal example to demonstrate handling and broadcasting messages to several WebSocket connections. However, it only works while the process is running and with a single process. For a more robust solution, consider using encode/broadcaster.

## More Info

To learn more about the options, check Starlette's documentation for:

- The WebSocket class
- Class-based WebSocket handling

# Including WSGI - Flask, Django, others

You can mount WSGI applications such as Flask and Django using `WSGIMiddleware`.

## Using `WSGIMiddleware`

Import `WSGIMiddleware` and wrap your WSGI application (e.g., Flask) with the middleware. Then, mount it under a specified path.

```Python
{!../../docs_src/wsgi/tutorial001.py!}
```

## Check it

Requests under the path `/v1/` will be handled by the Flask application, while the rest will be handled by FastAPI.

Accessing the following URLs will yield:

- For Flask: 
  - URL: http://localhost:8000/v1/
  - Response: 
    ```txt
    Hello, World from Flask!
    ```

- For FastAPI: 
  - URL: http://localhost:8000/v2
  - Response: 
    ```JSON
    {
        "message": "Hello World"
    }
    ```

# Alternatives, Inspiration and Comparisons

## Intro

**FastAPI** was inspired by the work of previous frameworks and tools. The goal was to create a new framework that combined the best ideas from existing tools while utilizing Python 3.6+ type hints.

## Previous Tools

### Django

Django is a popular Python framework used for building systems like Instagram. It is tightly coupled with relational databases, making it challenging to use with NoSQL databases. It was designed for backend HTML generation rather than modern API creation.

### Django REST Framework

Django REST Framework enhances Django's API capabilities and was one of the first to offer automatic API documentation. It inspired **FastAPI** to include an automatic API documentation web user interface.

### Flask

Flask is a microframework that allows flexibility in using NoSQL databases. Its simplicity and decoupling of components inspired **FastAPI** to adopt a micro-framework approach and a straightforward routing system.

### Requests

**FastAPI** is not an alternative to **Requests**, but it draws inspiration from its intuitive design and sensible defaults. **Requests** is used to interact with APIs, while **FastAPI** is for building them.

### Swagger / OpenAPI

The desire for automatic API documentation led to the adoption of Swagger, which later became OpenAPI. **FastAPI** integrates standards-based user interface tools like Swagger UI and ReDoc.

### Flask REST Frameworks

Many Flask REST frameworks were found to be discontinued or unfit for use.

### Marshmallow

Marshmallow provides data serialization and validation. It inspired **FastAPI** to use code for defining schemas that automatically provide data types and validation.

### Webargs

Webargs is used for parsing incoming request data and was created by the same developers as Marshmallow. It inspired **FastAPI** to implement automatic validation of incoming request data.

### APISpec

APISpec generates OpenAPI schemas but requires YAML definitions in docstrings, which can lead to maintenance issues. **FastAPI** was inspired to support OpenAPI without such limitations.

### Flask-apispec

Flask-apispec integrates Webargs, Marshmallow, and APISpec to generate OpenAPI schemas automatically, inspiring **FastAPI** to generate OpenAPI schemas from the same code that defines serialization and validation.

### NestJS (and Angular)

NestJS is a JavaScript framework inspired by Angular, featuring a dependency injection system. It inspired **FastAPI** to use Python types for editor support and to minimize code repetition.

### Sanic

Sanic is a fast Python framework based on `asyncio`. It inspired **FastAPI** to achieve high performance, leading to its foundation on Starlette.

### Falcon

Falcon is a minimal high-performance framework that requires manual data validation and serialization. It inspired **FastAPI** to find ways to achieve great performance while allowing optional response parameters.

### Molten

Molten shares similar ideas with **FastAPI** but is based on WSGI and has a more verbose configuration. It inspired **FastAPI** to define extra validations for data types using default values.

### Hug

Hug was one of the first frameworks to use Python type hints for API parameter types. It inspired **FastAPI** to declare parameters and generate schemas automatically.

### APIStar

APIStar was a promising framework that used Python type hints and the OpenAPI standard. It inspired **FastAPI** to exist and improve upon its features.

## Used by FastAPI

### Pydantic

Pydantic is used for data validation, serialization, and documentation based on Python type hints, making it intuitive and fast.

### Starlette

Starlette is a lightweight ASGI framework that provides core web functionality. **FastAPI** builds on Starlette, adding features like automatic data validation and OpenAPI schema generation.

### Uvicorn

Uvicorn is a fast ASGI server recommended for running **FastAPI** applications. It supports asynchronous multi-process servers.

## Benchmarks and Speed

For comparisons of Uvicorn, Starlette, and FastAPI, refer to the benchmarks section.

# Concurrency and async / await

Details about the `async def` syntax for path operation functions and some background about asynchronous code, concurrency, and parallelism.

## In a hurry?

If you are using third-party libraries that require `await`, declare your path operation functions with `async def`:

```Python
@app.get('/')
async def read_results():
    results = await some_library()
    return results
```

You can only use `await` inside functions created with `async def`.

If a third-party library does not support `await`, declare your path operation functions with `def`:

```Python
@app.get('/')
def results():
    results = some_library()
    return results
```

If your application does not need to wait for external responses, use `async def`. If unsure, use `def`.

You can mix `def` and `async def` in your path operation functions. FastAPI will handle them appropriately, ensuring asynchronous performance optimizations.

## Technical Details

Modern Python supports asynchronous code using coroutines with `async` and `await` syntax.

### Asynchronous Code

Asynchronous code allows the program to wait for an operation to complete without blocking. During this wait, the program can perform other tasks. This is particularly useful for I/O operations, which are slower than CPU operations.

### Concurrency and Burgers

**Concurrency** refers to multiple tasks making progress without necessarily executing simultaneously, while **parallelism** involves tasks running at the same time.

#### Concurrent Burgers

In a concurrent scenario, you place an order and wait while doing other activities, like chatting, until your order is ready.

#### Parallel Burgers

In a parallel scenario, multiple cashiers take orders and prepare food simultaneously. You must wait at the counter for your order, which limits your ability to engage in other activities.

### Burger Conclusion

For web applications, concurrency is often more beneficial due to the nature of I/O-bound operations. FastAPI leverages this for high performance.

### Is concurrency better than parallelism?

No, concurrency is not inherently better than parallelism. It is more effective in scenarios with significant waiting times, such as web applications. In CPU-bound tasks, parallelism is preferable.

### Concurrency + Parallelism: Web + Machine Learning

FastAPI supports both concurrency for web development and parallelism for CPU-bound tasks, making it suitable for data science and machine learning applications.

## `async` and `await`

To define asynchronous code, use `async def` and `await`:

```Python
burgers = await get_burgers(2)
```

`await` must be used within an `async def` function:

```Python
async def get_burgers(number: int):
    return burgers
```

You cannot call an `async def` function without `await`:

```Python
burgers = get_burgers(2)  # This won't work
```

### More technical details

Functions defined with `async def` must be called within other `async def` functions. FastAPI handles this for you.

### Write your own async code

FastAPI is built on Starlette, which is compatible with asyncio and Trio. You can use AnyIO for advanced concurrency patterns.

### Other forms of asynchronous code

The `async` and `await` syntax simplifies working with asynchronous code compared to previous methods like threads or callbacks.

## Coroutines

A coroutine is the result of an `async def` function. It can be paused and resumed, allowing for efficient asynchronous programming.

## Conclusion

Modern Python supports asynchronous code through coroutines with `async` and `await`, enabling FastAPI's impressive performance.

## Very Technical Details

### Path operation functions

When using `def`, FastAPI runs the function in an external threadpool to avoid blocking the server. For trivial compute-only functions, prefer `async def`.

### Dependencies

Dependencies defined with `def` run in an external threadpool, while those with `async def` are awaited.

### Sub-dependencies

You can mix dependencies with `def` and `async def`. FastAPI will manage their execution appropriately.

### Other utility functions

Utility functions can be defined with either `def` or `async def`. FastAPI's behavior depends on how you call them.

# Benchmarks

Independent TechEmpower benchmarks show FastAPI applications running under Uvicorn as one of the fastest Python frameworks available, only below Starlette and Uvicorn themselves (used internally by FastAPI).

## Benchmarks and Speed

When checking benchmarks, it is common to see several tools of different types compared as equivalent. Specifically, Uvicorn, Starlette, and FastAPI are often compared together among many other tools.

The simpler the problem solved by the tool, the better performance it will get. Most benchmarks do not test the additional features provided by the tool.

### Hierarchy

- **Uvicorn**: an ASGI server
  - **Starlette**: (uses Uvicorn) a web microframework
    - **FastAPI**: (uses Starlette) an API microframework with several additional features for building APIs, including data validation.

### Performance Insights

- **Uvicorn**:
  - Best performance due to minimal extra code apart from the server itself.
  - Not typically used to write applications directly; doing so would require including much of the code provided by Starlette or FastAPI, resulting in similar overhead.
  - Compare Uvicorn against other application servers like Daphne, Hypercorn, and uWSGI.

- **Starlette**:
  - Next best performance after Uvicorn, as it runs on Uvicorn and incurs additional overhead from executing more code.
  - Provides tools for building simple web applications with routing based on paths.
  - Compare Starlette against web frameworks or microframeworks like Sanic, Flask, and Django.

- **FastAPI**:
  - Cannot be faster than Starlette since it uses it as a foundation.
  - Offers additional features essential for building APIs, such as data validation and serialization, along with automatic documentation generated at startup without runtime overhead.
  - If using Starlette or another tool directly, you would need to implement data validation and serialization yourself, leading to similar overhead as FastAPI.
  - Using FastAPI saves development time, reduces bugs, and minimizes lines of code while maintaining comparable performance.
  - Compare FastAPI against frameworks that provide integrated automatic data validation, serialization, and documentation, such as Flask-apispec, NestJS, and Molten.

# Deploy FastAPI on Cloud Providers

You can use virtually any cloud provider to deploy your FastAPI application. Most major cloud providers have guides to assist with deploying FastAPI.

## Cloud Providers - Sponsors

Some cloud providers sponsor FastAPI, ensuring the continued and healthy development of FastAPI and its ecosystem. This demonstrates their commitment to FastAPI and its community, aiming to provide not only good service but also a robust framework.

You might want to try their services and follow their guides:

* Platform.sh - docs.platform.sh/languages/python.html?utm_source=fastapi-signup&utm_medium=banner&utm_campaign=FastAPI-signup-June-2023
* Porter - docs.porter.run/language-specific-guides/fastapi
* Coherence - www.withcoherence.com/?utm_medium=advertising&utm_source=fastapi&utm_campaign=website

# Deployments Concepts

When deploying a FastAPI application or any web API, several concepts are crucial for finding the most appropriate deployment method. Key concepts include:

- Security - HTTPS
- Running on startup
- Restarts
- Replication (number of processes running)
- Memory
- Previous steps before starting

The ultimate goal is to serve API clients securely, avoid disruptions, and utilize compute resources efficiently.

## Security - HTTPS

HTTPS provides encryption for your API, typically managed by an external component known as a TLS Termination Proxy. This component is responsible for renewing HTTPS certificates.

### Example Tools for HTTPS

- Traefik: Automatically handles certificate renewals
- Caddy: Automatically handles certificate renewals
- Nginx: Requires an external component like Certbot for certificate renewals
- HAProxy: Requires an external component like Certbot for certificate renewals
- Kubernetes with an Ingress Controller like Nginx: Requires an external component like cert-manager for certificate renewals
- Handled internally by a cloud provider

Alternatively, you can use a cloud service that simplifies HTTPS setup, though it may come with restrictions or additional costs.

## Program and Process

Understanding the difference between a "program" and a "process" is essential.

### What is a Program

A program refers to:

- The code you write (Python files)
- An executable file (e.g., python, uvicorn)
- A program while it is running on the operating system (known as a process)

### What is a Process

A process is:

- A program currently running on the operating system
- Managed by the operating system, executing code and using CPU and memory
- Capable of being terminated, stopping execution

Multiple processes of the same program can run simultaneously.

## Running on Startup

Web APIs should ideally run continuously to ensure client access. 

### In a Remote Server

Using `fastapi run` (with Uvicorn) manually works during development but may fail if the connection to the server is lost or if the server restarts.

### Run Automatically on Startup

To ensure the server program starts automatically, a separate program is typically used to manage this.

### Example Tools to Run at Startup

- Docker
- Kubernetes
- Docker Compose
- Systemd
- Supervisor
- Handled internally by a cloud provider

## Restarts

Ensuring your application restarts after failures is crucial.

### We Make Mistakes

Software often contains bugs, and developers continuously improve code, which may introduce new bugs.

### Small Errors Automatically Handled

FastAPI typically contains errors to the request that triggered them, allowing the application to continue functioning.

### Bigger Errors - Crashes

Severe errors may crash the entire application. An external component should be responsible for restarting the process after such crashes.

### Example Tools to Restart Automatically

- Docker
- Kubernetes
- Docker Compose
- Systemd
- Supervisor
- Handled internally by a cloud provider

## Replication - Processes and Memory

Running a FastAPI application in a single process can serve multiple clients, but multiple worker processes are often necessary.

### Multiple Processes - Workers

If a single process cannot handle the client load, multiple processes (workers) can be run concurrently, distributing requests among them.

### Worker Processes and Ports

Only one process can listen on a specific port and IP address. A single process must manage communication to multiple worker processes.

### Memory per Process

Each process consumes its own memory. For example, if a machine learning model uses 1 GB of RAM, four worker processes will consume 4 GB total.

### Multiple Processes - An Example

A Manager Process listens on the port and communicates with Worker Processes that handle requests and computations.

### Examples of Replication Tools and Strategies

- Uvicorn with `--workers`
- Kubernetes and other distributed container systems
- Cloud services that manage replication

## Previous Steps Before Starting

Certain steps, like database migrations, may need to be performed before starting the application, ideally by a single process to avoid duplication.

### Examples of Previous Steps Strategies

- An "Init Container" in Kubernetes
- A bash script that runs the previous steps before starting the application

## Resource Utilization

Maximizing resource utilization is essential. Aim for a balance between using available resources and avoiding crashes.

## Recap

Key concepts for deploying your application include:

- Security - HTTPS
- Running on startup
- Restarts
- Replication (number of processes running)
- Memory
- Previous steps before starting

Understanding these concepts will help you make informed decisions when configuring and optimizing your deployments.

# FastAPI in Containers - Docker

When deploying FastAPI applications, a common approach is to build a **Linux container image** using **Docker**. This allows for deployment in various environments. Advantages of using Linux containers include **security**, **replicability**, and **simplicity**.

## What is a Container

Containers are a lightweight way to package applications with all dependencies while keeping them isolated. They run using the host's Linux kernel, consuming minimal resources compared to full virtual machines. Containers have their own isolated processes, file systems, and networks, simplifying deployment and security.

## What is a Container Image

A **container image** is a static version of all files, environment variables, and the default command for a container. It is not running or executed; it is merely packaged files and metadata. A **container** refers to the running instance of the image, which can create or change files and environment variables, but these changes do not persist in the underlying image.

## Container Images

Docker is a primary tool for creating and managing container images. There is a public Docker Hub with pre-made official container images for various tools and applications, such as Python, PostgreSQL, MySQL, MongoDB, and Redis. Using pre-made images simplifies the process of combining different tools.

## Containers and Processes

A container image includes metadata about the default program to run when the container starts. A container runs as long as the main process is active. While a container typically has a single process, it can start subprocesses, but it cannot run without at least one active process.

## Build a Docker Image for FastAPI

To build a Docker image for FastAPI from scratch using the official Python image:

### Package Requirements

Create a `requirements.txt` file with package names and versions, for example:

```
fastapi[standard]>=0.113.0,<0.114.0
pydantic>=2.7.0,<3.0.0
```

Install dependencies with:

```
$ pip install -r requirements.txt
```

### Create the FastAPI Code

1. Create an `app` directory.
2. Create an empty `__init__.py` file.
3. Create a `main.py` file with the following content:

```Python
from typing import Union
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
```

### Dockerfile

Create a `Dockerfile` in the project directory:

```Dockerfile
FROM python:3.9

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./app /code/app

CMD ["fastapi", "run", "app/main.py", "--port", "80"]
```

### Behind a TLS Termination Proxy

If running behind a TLS Termination Proxy, add `--proxy-headers`:

```Dockerfile
CMD ["fastapi", "run", "app/main.py", "--proxy-headers", "--port", "80"]
```

### Build the Docker Image

To build the container image, navigate to the project directory and run:

```
$ docker build -t myimage .
```

### Start the Docker Container

Run a container based on your image:

```
$ docker run -d --name mycontainer -p 80:80 myimage
```

## Check it

Access the application at:

```
http://127.0.0.1/items/5?q=somequery
```

You should see:

```JSON
{"item_id": 5, "q": "somequery"}
```

## Interactive API docs

Access the interactive API documentation at:

```
http://127.0.0.1/docs
```

## Alternative API docs

Access the alternative documentation at:

```
http://127.0.0.1/redoc
```

## Build a Docker Image with a Single-File FastAPI

If your FastAPI application is a single file, adjust the `Dockerfile` accordingly:

```Dockerfile
FROM python:3.9

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./main.py /code/

CMD ["fastapi", "run", "main.py", "--port", "80"]
```

## Deployment Concepts

Containers simplify the process of building and deploying applications. Key deployment concepts include:

- HTTPS
- Running on startup
- Restarts
- Replication
- Memory
- Previous steps before starting

## HTTPS

HTTPS is typically handled externally by another tool, such as Traefik, or by a cloud provider.

## Running on Startup and Restarts

Container management tools like Docker and Kubernetes can easily enable containers to run on startup and restart on failure.

## Replication - Number of Processes

In a cluster, replication is managed at the cluster level rather than within individual containers. Use a single Uvicorn process per container to simplify management.

## Load Balancer

A load balancer distributes requests among multiple containers running the application.

## One Process per Container

For optimal performance, use a single Uvicorn process per container, especially in a clustered environment.

## Containers with Multiple Processes

In some cases, you may want multiple Uvicorn worker processes within a single container. Use the `--workers` option to specify the number of workers.

## Memory

Define memory limits for containers to ensure efficient resource usage, especially for memory-intensive applications.

## Previous Steps Before Starting

Use separate containers for initialization tasks or run them in the same container before starting the main application process.

## Base Docker Image

Avoid using deprecated base images. Instead, build your own image from scratch based on the official Python image.

## Deploy the Container Image

Deploy the container image using various methods, including Docker Compose, Kubernetes, or cloud services.

## Docker Image with `uv`

For projects managed with `uv`, refer to their Docker guide for integration.

## Recap

Using container systems simplifies handling deployment concepts. Build a container image from scratch based on the official Python Docker image to maximize productivity and minimize build times.

# About HTTPS

HTTPS is more complex than simply being "enabled" or not.

**Tip:** If you're in a hurry, proceed to the next sections for step-by-step instructions on setting everything up using different techniques.

To learn the basics of HTTPS from a consumer perspective, check howhttps.works.

From a developer's perspective, consider the following:

- For HTTPS, the server must have certificates generated by a third party.
  - Certificates are acquired from the third party, not generated.
- Certificates have a lifetime; they expire and need to be renewed.
- Encryption occurs at the TCP level, which is below HTTP.
  - Certificate and encryption handling happens before HTTP.
- TCP only recognizes IP addresses, not domains.
  - Domain information is included in the HTTP data.
- HTTPS certificates certify a specific domain, but encryption occurs at the TCP level before the domain is known.
- By default, only one HTTPS certificate can exist per IP address, regardless of server size or application count.
  - There is a solution: the SNI extension to the TLS protocol.
- SNI allows a single server with one IP address to have multiple HTTPS certificates and serve multiple domains/applications.
  - A single component must manage all HTTPS certificates on the server.
- After establishing a secure connection, the communication protocol remains HTTP.
  - Contents are encrypted, but sent using the HTTP protocol.

Typically, one program (the TLS Termination Proxy) manages all HTTPS aspects: receiving encrypted HTTPS requests, sending decrypted HTTP requests to the application (e.g., FastAPI), and encrypting HTTP responses before sending them back to the client.

**Options for TLS Termination Proxy:**
- Traefik (handles certificate renewals)
- Caddy (handles certificate renewals)
- Nginx
- HAProxy

## Let's Encrypt

Before Let's Encrypt, HTTPS certificates were sold by trusted third parties, requiring cumbersome processes and significant costs. Let's Encrypt, a project from the Linux Foundation, provides free HTTPS certificates in an automated manner. These certificates use standard cryptographic security and are short-lived (about 3 months), enhancing security through their reduced lifespan. Domains are securely verified, and certificate renewal is automated, allowing for secure HTTPS indefinitely.

## HTTPS for Developers

### Domain Name

Start by acquiring a domain name and configuring it in a DNS server. Obtain a cloud server with a fixed public IP address. Configure an "A record" in the DNS server to point your domain to the server's public IP address.

**Tip:** This domain name setup occurs before HTTPS, but it's essential as everything depends on the domain and IP address.

### DNS

The browser checks DNS servers for the IP of the domain (e.g., someapp.example.com). The DNS servers provide the public IP address of your server.

### TLS Handshake Start

The browser communicates with the IP address on port 443 (the HTTPS port) to establish a connection and decide on cryptographic keys.

This interaction is called the TLS handshake.

### TLS with SNI Extension

Only one process can listen on a specific port for a specific IP address. The TLS Termination Proxy listens on port 443 and accesses one or more TLS certificates. Using the SNI extension, it determines which TLS certificate to use based on the domain expected by the client (e.g., someapp.example.com).

The client verifies the certificate's validity and, using it, the client and TLS Termination Proxy agree on encryption for the TCP communication, completing the TLS handshake.

### HTTPS Request

With an encrypted TCP connection established, the client sends an HTTPS request, which is an HTTP request over an encrypted TLS connection.

### Decrypt the Request

The TLS Termination Proxy decrypts the request and transmits the plain HTTP request to the application (e.g., Uvicorn running FastAPI).

### HTTP Response

The application processes the request and sends a plain HTTP response to the TLS Termination Proxy.

### HTTPS Response

The TLS Termination Proxy encrypts the response using the agreed cryptography and sends it back to the browser. The browser verifies the response's validity and decrypts it for processing.

### Multiple Applications

Multiple applications can run on the same server, as long as they do not use the same combination of public IP and port. The TLS Termination Proxy can handle HTTPS and certificates for multiple domains and applications.

### Certificate Renewal

Certificates expire approximately 3 months after acquisition. A renewal program must prove domain ownership to Let's Encrypt. Popular renewal methods include:

- Modifying DNS records (requires DNS provider API support).
- Running a server on the public IP during the renewal process.

Having a separate system to handle HTTPS with a TLS Termination Proxy is beneficial for managing certificate renewals without downtime.

## Recap

Having HTTPS is critical. Most developer effort involves understanding these concepts. Once familiar, you can combine and configure tools to manage HTTPS effectively. Future chapters will provide concrete examples of setting up HTTPS for FastAPI applications.

# Deployment

Deploying a FastAPI application is relatively easy.

## What Does Deployment Mean

To deploy an application means to perform the necessary steps to make it available to the users. For a web API, this typically involves placing it on a remote machine with a server program that ensures good performance and stability, allowing users to access the application efficiently and without interruptions. This contrasts with the development stages, where code is frequently changed, broken, and fixed, requiring constant restarts of the development server.

## Deployment Strategies

There are several ways to deploy a FastAPI application, depending on your specific use case and the tools you use. You could deploy a server yourself using a combination of tools, utilize a cloud service that handles part of the work for you, or explore other options. 

Key concepts and techniques for deploying a FastAPI application will be discussed in the following sections.

# Run a Server Manually

## Use the `fastapi run` Command

To serve your FastAPI application, use the following command:

```console
$ fastapi run main.py
INFO    Using path main.py
INFO    Resolved absolute path /home/user/code/awesomeapp/main.py
INFO    Searching for package file structure from directories with __init__.py files
INFO    Importing from /home/user/code/awesomeapp

 ╭─ Python module file ─╮
 │                      │
 │  🐍 main.py          │
 │                      │
 ╰──────────────────────╯

INFO    Importing module main
INFO    Found importable FastAPI app

 ╭─ Importable FastAPI app ─╮
 │                          │
 │  from main import app   │
 │                          │
 ╰──────────────────────────╯

INFO    Using import string main:app

 ╭─────────── FastAPI CLI - Production mode ───────────╮
 │                                                     │
 │  Serving at: http://0.0.0.0:8000                    │
 │                                                     │
 │  API docs: http://0.0.0.0:8000/docs                 │
 │                                                     │
 │  Running in production mode, for development use:   │
 │                                                     │
 │  fastapi dev                                        │
 │                                                     │
 ╰─────────────────────────────────────────────────────╯

INFO:     Started server process [2306215]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

This command is suitable for starting your FastAPI app in various environments, such as containers or servers.

## ASGI Servers

FastAPI is an ASGI web framework, which is a standard for building Python web frameworks and servers. To run a FastAPI application on a remote server, you need an ASGI server program like Uvicorn, which is included by default with the `fastapi` command.

Alternatives include:

- Uvicorn: High-performance ASGI server.
- Hypercorn: ASGI server compatible with HTTP/2 and Trio.
- Daphne: ASGI server built for Django Channels.
- Granian: Rust HTTP server for Python applications.
- NGINX Unit: Lightweight web application runtime.

## Server Machine and Server Program

The term "server" can refer to both the remote/cloud computer (physical or virtual machine) and the program running on that machine (e.g., Uvicorn). Common terms for the remote machine include server, machine, VM (virtual machine), and node.

## Install the Server Program

FastAPI comes with Uvicorn as its production server, which can be started with the `fastapi run` command. You can also install an ASGI server manually.

To install Uvicorn, create a virtual environment, activate it, and run:

```console
$ pip install "uvicorn[standard]"
```

Adding `standard` installs recommended extra dependencies, including `uvloop`, which enhances concurrency performance. Installing FastAPI with `pip install "fastapi[standard]"` also includes `uvicorn[standard]`.

## Run the Server Program

If you installed an ASGI server manually, use the following command to run your FastAPI application:

```console
$ uvicorn main:app --host 0.0.0.0 --port 80

INFO:     Uvicorn running on http://0.0.0.0:80 (Press CTRL+C to quit)
```

The command `uvicorn main:app` refers to:

- `main`: the file `main.py` (the Python module).
- `app`: the object created inside `main.py` with `app = FastAPI()`.

This is equivalent to:

```Python
from main import app
```

Each ASGI server has a similar command; refer to their documentation for specifics.

Uvicorn and other servers support a `--reload` option useful during development. However, it consumes more resources and is less stable, so it should not be used in production.

## Deployment Concepts

The examples provided run the server program (e.g., Uvicorn), starting a single process that listens on all IPs (`0.0.0.0`) on a predefined port (e.g., `80`). 

Consider additional factors for deployment, such as:

- Security - HTTPS
- Running on startup
- Restarts
- Replication (number of processes)
- Memory management
- Pre-start steps

Further details and strategies for handling these concepts will be covered in subsequent chapters.

# Server Workers - Uvicorn with Workers

## Overview

When deploying applications, you may want to replicate processes to utilize multiple cores and handle more requests. This guide shows how to use Uvicorn with worker processes using the `fastapi` or `uvicorn` commands.

## Multiple Workers

You can start multiple workers with the `--workers` command line option.

### Using FastAPI Command

To use the `fastapi` command:

```
$ fastapi run --workers 4 main.py
INFO    Using path main.py
INFO    Resolved absolute path /home/user/code/awesomeapp/main.py
INFO    Searching for package file structure from directories with __init__.py files
INFO    Importing from /home/user/code/awesomeapp
INFO    Importing module main
INFO    Found importable FastAPI app
INFO    Using import string main:app
INFO    Serving at: http://0.0.0.0:8000
INFO    API docs: http://0.0.0.0:8000/docs
INFO    Running in production mode, for development use: fastapi dev
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started parent process [27365]
INFO:     Started server process [27368]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Started server process [27369]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Started server process [27370]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Started server process [27367]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

### Using Uvicorn Command

To use the `uvicorn` command directly:

```
$ uvicorn main:app --host 0.0.0.0 --port 8080 --workers 4
INFO:     Uvicorn running on http://0.0.0.0:8080 (Press CTRL+C to quit)
INFO:     Started parent process [27365]
INFO:     Started server process [27368]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Started server process [27369]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Started server process [27370]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Started server process [27367]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

The `--workers` option specifies the number of worker processes to start.

## Deployment Concepts

Using multiple workers helps with replication and can assist with restarts. Other deployment concepts to consider include:

- Security - HTTPS
- Running on startup
- Restarts
- Memory
- Previous steps before starting

## Containers and Docker

In the next chapter, strategies for handling deployment concepts in containers, such as Docker and Kubernetes, will be discussed. You will learn how to build your own image to run a single Uvicorn process.

## Recap

You can utilize multiple worker processes with the `--workers` option in the `fastapi` or `uvicorn` commands to leverage multi-core CPUs and run multiple processes in parallel. This setup is beneficial for your own deployment system while managing other deployment concepts.

# About FastAPI Versions

FastAPI is in production use across many applications, with 100% test coverage. Development is ongoing, with frequent feature additions and bug fixes. Current versions are `0.x.x`, indicating potential breaking changes, in line with Semantic Versioning conventions.

You can create production applications with FastAPI now, ensuring you use a version compatible with your code.

## Pin Your FastAPI Version

Pin the FastAPI version to the specific latest version that works for your application. For example, if using version `0.112.0`, specify it in a `requirements.txt` file as:

```txt
fastapi[standard]==0.112.0
```

Alternatively, you can pin it with:

```txt
fastapi[standard]>=0.112.0,<0.113.0
```

This allows for versions `0.112.0` and above, but below `0.113.0` (e.g., `0.112.2` is acceptable).

Other package management tools like `uv`, Poetry, and Pipenv also support defining specific package versions.

## Available Versions

Check available versions in the Release Notes.

## About Versions

Following Semantic Versioning, any version below `1.0.0` may introduce breaking changes. FastAPI adheres to the convention that "PATCH" version changes are for bug fixes and non-breaking changes.

The "PATCH" is the last number in a version (e.g., in `0.2.3`, the PATCH version is `3`).

You can pin to a version like:

```txt
fastapi>=0.45.0,<0.46.0
```

Breaking changes and new features are introduced in "MINOR" versions.

The "MINOR" is the middle number in a version (e.g., in `0.2.3`, the MINOR version is `2`).

## Upgrading FastAPI Versions

Add tests for your application. FastAPI simplifies testing (thanks to Starlette); refer to the Testing documentation.

After adding tests, upgrade FastAPI to a more recent version and verify functionality by running your tests. If everything works and tests pass, pin FastAPI to the new version.

## About Starlette

Do not pin the version of Starlette. Different FastAPI versions will use specific newer versions of Starlette. Allow FastAPI to manage the correct Starlette version.

## About Pydantic

Pydantic includes tests for FastAPI, ensuring compatibility with new versions (above `1.0.0`). You can pin Pydantic to any version above `1.0.0` that suits your needs, for example:

```txt
pydantic>=2.7.0,<3.0.0
```

# Environment Variables

An environment variable (also known as "env var") is a variable that exists outside of the Python code, in the operating system, and can be read by Python code or other programs. Environment variables are useful for handling application settings and as part of the installation of Python.

## Create and Use Env Vars

You can create and use environment variables in the shell (terminal) without needing Python.

### Linux, macOS, Windows Bash

```console
// Create an env var MY_NAME
$ export MY_NAME="Wade Wilson"

// Use it with other programs
$ echo "Hello $MY_NAME"

Hello Wade Wilson
```

### Windows PowerShell

```console
// Create an env var MY_NAME
$ $Env:MY_NAME = "Wade Wilson"

// Use it with other programs
$ echo "Hello $Env:MY_NAME"

Hello Wade Wilson
```

## Read env vars in Python

You can create environment variables outside of Python and read them in Python. For example, in a file `main.py`:

```Python
import os

name = os.getenv("MY_NAME", "World")
print(f"Hello {name} from Python")
```

### Linux, macOS, Windows Bash

```console
// Without setting the env var
$ python main.py

Hello World from Python

// Set the env var and call again
$ export MY_NAME="Wade Wilson"
$ python main.py

Hello Wade Wilson from Python
```

### Windows PowerShell

```console
// Without setting the env var
$ python main.py

Hello World from Python

// Set the env var and call again
$ $Env:MY_NAME = "Wade Wilson"
$ python main.py

Hello Wade Wilson from Python
```

Environment variables can be set for a specific program invocation:

```console
// Create an env var MY_NAME in line for this program call
$ MY_NAME="Wade Wilson" python main.py

Hello Wade Wilson from Python

// The env var no longer exists afterwards
$ python main.py

Hello World from Python
```

## Types and Validation

Environment variables can only handle text strings. Any value read in Python from an environment variable will be a `str`, and any conversion or validation must be done in code.

## `PATH` Environment Variable

The `PATH` environment variable is used by operating systems to find programs to run. It consists of directories separated by a colon `:` on Linux and macOS, and by a semicolon `;` on Windows.

### Example `PATH` Values

#### Linux, macOS

```plaintext
/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
```

#### Windows

```plaintext
C:\Program Files\Python312\Scripts;C:\Program Files\Python312;C:\Windows\System32
```

When you type a command in the terminal, the operating system looks for the program in each directory listed in the `PATH`.

### Installing Python and Updating the `PATH`

When installing Python, you may be asked to update the `PATH` environment variable.

#### Linux, macOS

If Python is installed in `/opt/custompython/bin`, the `PATH` may look like this:

```plaintext
/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/custompython/bin
```

#### Windows

If Python is installed in `C:\opt\custompython\bin`, the `PATH` may look like this:

```plaintext
C:\Program Files\Python312\Scripts;C:\Program Files\Python312;C:\Windows\System32;C:\opt\custompython\bin
```

### Command Execution

When you type:

```console
$ python
```

#### Linux, macOS

The system finds the `python` program in `/opt/custompython/bin` and runs it.

#### Windows

The system finds the `python` program in `C:\opt\custompython\bin\python` and runs it.

## Conclusion

This documentation provides a basic understanding of environment variables and their usage in Python. They are applicable in various development scenarios, including the next section on Virtual Environments.

# External Links and Articles

FastAPI has a great community that is constantly growing. There are many posts, articles, tools, and projects related to FastAPI. Here's an incomplete list of some of them.

If you have an article, project, tool, or anything related to FastAPI that is not yet listed here, create a Pull Request adding it.

## Section Name

### Language Name

* Title by Author.

## Projects

Latest GitHub projects with the topic fastapi:

# FastAPI CLI

FastAPI CLI is a command line program for serving FastAPI apps and managing FastAPI projects.

When you install FastAPI (e.g., with `pip install "fastapi[standard]"`), it includes the `fastapi-cli` package, which provides the `fastapi` command in the terminal.

To run your FastAPI app for development, use the `fastapi dev` command:

```console
$ fastapi dev main.py
INFO    Using path main.py
INFO    Resolved absolute path /home/user/code/awesomeapp/main.py
INFO    Searching for package file structure from directories with __init__.py files
INFO    Importing from /home/user/code/awesomeapp

 ╭─ Python module file ─╮
 │                      │
 │  🐍 main.py          │
 │                      │
 ╰──────────────────────╯

INFO    Importing module main
INFO    Found importable FastAPI app

 ╭─ Importable FastAPI app ─╮
 │                          │
 │  from main import app   │
 │                          │
 ╰──────────────────────────╯

INFO    Using import string main:app

 ╭────────── FastAPI CLI - Development mode ───────────╮
 │                                                     │
 │  Serving at: http://127.0.0.1:8000                  │
 │                                                     │
 │  API docs: http://127.0.0.1:8000/docs               │
 │                                                     │
 │  Running in development mode, for production use:   │
 │                                                     │
 │  fastapi run                                        │
 │                                                     │
 ╰─────────────────────────────────────────────────────╯

INFO:     Will watch for changes in these directories: ['/home/user/code/awesomeapp']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [2265862] using WatchFiles
INFO:     Started server process [2265873]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

The `fastapi` command is FastAPI CLI. It takes the path to your Python program (e.g., `main.py`), detects the FastAPI instance (commonly named `app`), determines the import process, and serves it.

For production, use `fastapi run`.

Internally, FastAPI CLI uses Uvicorn, a high-performance, production-ready ASGI server.

## `fastapi dev`

Running `fastapi dev` initiates development mode. By default, auto-reload is enabled, reloading the server when code changes are made. This feature is resource-intensive and less stable, so it should only be used for development. It listens on the IP address `127.0.0.1` (localhost).

## `fastapi run`

Executing `fastapi run` starts FastAPI in production mode. By default, auto-reload is disabled. It listens on the IP address `0.0.0.0`, making it publicly accessible. This is the typical way to run it in production, such as in a container.

In most cases, a "termination proxy" should handle HTTPS, depending on your deployment setup.

# FastAPI People

FastAPI has an amazing community that welcomes people from all backgrounds.

## Creator

I am the creator of **FastAPI**. You can read more about that in Help FastAPI - Get Help - Connect with the author.

**FastAPI** receives a lot of support from the community. Here are some contributions:

- Help others with questions in GitHub.
- Create Pull Requests.
- Review Pull Requests, especially important for translations.
- Help manage the repository (team members).

A round of applause to them. 👏 🙇

## Team

This is the current list of team members. They have different levels of involvement and permissions, and they can perform repository management tasks.

Although the team members have the permissions to perform privileged tasks, all help from others maintaining FastAPI is very much appreciated! 🙇‍♂️

## FastAPI Experts

These users have been helping others the most with questions in GitHub. They have proven to be **FastAPI Experts** by assisting many others.

You could become an official FastAPI Expert too! Just help others with questions in GitHub.

### FastAPI Experts - Last Month

These users have been helping others the most with questions in GitHub during the last month.

### FastAPI Experts - 3 Months

These users have been helping others the most with questions in GitHub during the last 3 months.

### FastAPI Experts - 6 Months

These users have been helping others the most with questions in GitHub during the last 6 months.

### FastAPI Experts - 1 Year

These users have been helping others the most with questions in GitHub during the last year.

### FastAPI Experts - All Time

Here are the all-time **FastAPI Experts**. These users have helped others the most with questions in GitHub through all time.

## Top Contributors

Here are the **Top Contributors**. These users have created the most Pull Requests that have been merged, contributing source code, documentation, translations, etc.

There are many other contributors (more than a hundred), you can see them all in the FastAPI GitHub Contributors page.

## Top Translation Reviewers

These users are the **Top Translation Reviewers**. They have the power to approve translations of the documentation, ensuring availability in several languages.

## Sponsors

These are the **Sponsors** supporting my work with **FastAPI** (and others), mainly through GitHub Sponsors.

### Gold Sponsors

### Silver Sponsors

### Bronze Sponsors

### Individual Sponsors

## About the data - technical details

The main intention of this page is to highlight the effort of the community to help others, especially including efforts that are normally less visible, like helping others with questions and reviewing Pull Requests with translations.

The data is calculated each month. Here, contributions from sponsors are also highlighted. The algorithm, sections, thresholds, etc., may be updated as needed.

# Features

## FastAPI Features

**FastAPI** provides the following:

### Based on Open Standards

- OpenAPI for API creation, including path operations, parameters, request bodies, security, etc.
- Automatic data model documentation with JSON Schema.
- Designed around these standards, allowing for automatic client code generation in many languages.

### Automatic Documentation

Interactive API documentation and exploration web user interfaces based on OpenAPI, with two included by default:

- Swagger UI for interactive exploration and testing of your API.
- ReDoc as an alternative API documentation option.

### Just Modern Python

Utilizes standard Python type declarations (via Pydantic) with no new syntax to learn. Example usage:

```Python
from datetime import date
from pydantic import BaseModel

def main(user_id: str):
    return user_id

class User(BaseModel):
    id: int
    name: str
    joined: date
```

### Editor Support

Designed for an intuitive development experience with autocompletion in various editors, including:

- Visual Studio Code
- PyCharm

### Short

Sensible defaults for everything, with optional configurations. It works out of the box.

### Validation

Validation for various Python data types, including:

- JSON objects (dict)
- JSON arrays (list)
- String fields with min/max lengths
- Numbers with min/max values

Handles validation for more exotic types like URL, Email, UUID, etc., using Pydantic.

### Security and Authentication

Integrated security and authentication without compromising databases or data models. Supports:

- HTTP Basic
- OAuth2 with JWT tokens
- API keys in headers, query parameters, cookies, etc.

### Dependency Injection

An easy-to-use, powerful Dependency Injection system that supports:

- Hierarchical dependencies
- Automatic handling by the framework
- Automatic validation for path operation parameters

### Unlimited Plug-ins

No need for external plug-ins; any integration is simple to use with dependencies.

### Tested

- 100% test coverage
- 100% type-annotated codebase
- Used in production applications

## Starlette Features

**FastAPI** is fully compatible with Starlette, inheriting its features:

- High performance, comparable to NodeJS and Go
- WebSocket support
- In-process background tasks
- Startup and shutdown events
- Test client built on HTTPX
- CORS, GZip, Static Files, Streaming responses
- Session and Cookie support
- 100% test coverage
- 100% type-annotated codebase

## Pydantic Features

**FastAPI** is based on Pydantic, ensuring compatibility with additional Pydantic code:

- No new schema definition language; uses Python types
- Works well with IDEs and linters
- Validates complex structures with hierarchical models
- Extensible with custom data types and validation methods
- 100% test coverage

# Help FastAPI - Get Help

Do you like FastAPI? Would you like to help FastAPI, other users, and the author? Or would you like to get help with FastAPI? There are simple ways to help and get help.

## Subscribe to the newsletter

You can subscribe to the infrequent FastAPI and friends newsletter to stay updated about:
- News about FastAPI and friends
- Guides
- Features
- Breaking changes
- Tips and tricks

## Follow FastAPI on Twitter

Follow @fastapi on Twitter to get the latest news about FastAPI.

## Star FastAPI in GitHub

You can "star" FastAPI in GitHub by clicking the star button at the top right of the repository. By adding a star, other users will find it more easily and see that it has been useful for others.

## Watch the GitHub repository for releases

You can "watch" FastAPI in GitHub by clicking the "watch" button at the top right. Select "Releases only" to receive notifications via email whenever there's a new release of FastAPI with bug fixes and new features.

## Connect with the author

You can connect with Sebastián Ramírez (tiangolo), the author. You can:
- Follow me on GitHub to see other Open Source projects.
- Follow me on Twitter or Mastodon to share how you use FastAPI and hear about announcements.
- Follow me on LinkedIn for updates.
- Read my articles on Dev.to or Medium.

## Tweet about FastAPI

Tweet about FastAPI and let others know why you like it. I love to hear how FastAPI is being used.

## Vote for FastAPI

- Vote for FastAPI in Slant.
- Vote for FastAPI in AlternativeTo.
- Say you use FastAPI on StackShare.

## Help others with questions in GitHub

You can help others with their questions in:
- GitHub Discussions
- GitHub Issues

If you help a lot, you may become an official FastAPI Expert. Remember to be kind; the FastAPI community values kindness and respect.

### How to help others with questions

1. **Understand the question**: Check the purpose and clarity of the question. Ask for more details if needed.
2. **Reproduce the problem**: Request a minimal, reproducible example to understand the issue better.
3. **Suggest solutions**: Provide possible answers and consider the underlying problem for better solutions.
4. **Ask to close**: If you solve their problem, ask them to mark your comment as the answer or close the issue.

## Watch the GitHub repository

You can "watch" FastAPI in GitHub to receive notifications about new issues, questions, or discussions.

## Ask Questions

You can create a new question in the GitHub repository to ask about a problem or suggest a new feature.

## Review Pull Requests

You can help review pull requests. Keep in mind to:
- Understand the problem the PR is solving.
- Check the code and run it locally.
- Ensure the PR has tests that fail before and pass after the changes.

## Create a Pull Request

You can contribute to the source code with Pull Requests, such as:
- Fixing typos in documentation.
- Sharing articles or resources about FastAPI.
- Translating documentation.
- Proposing new documentation sections.
- Fixing issues or adding new features with tests.

## Help Maintain FastAPI

Help maintain FastAPI by:
- Assisting others with questions in GitHub.
- Reviewing Pull Requests.

These tasks are crucial for maintaining FastAPI and ensuring it advances.

## Join the chat

Join the Discord chat server to engage with the FastAPI community. For questions, use GitHub Discussions for better chances of receiving help.

### Don't use the chat for questions

Avoid asking questions in chat as they may not receive answers. Use GitHub for structured questions and answers.

## Sponsor the author

You can financially support the author through GitHub sponsors. You can also become a Silver or Gold sponsor for FastAPI.

## Sponsor the tools that power FastAPI

You can sponsor:
- Samuel Colvin (Pydantic)
- Encode (Starlette, Uvicorn)

Thanks!

# History, Design and Future

Some time ago, a **FastAPI** user asked:

> What’s the history of this project? It seems to have come from nowhere to awesome in a few weeks [...]

Here's a little bit of that history.

## Alternatives

I have been creating APIs with complex requirements for several years (Machine Learning, distributed systems, asynchronous jobs, NoSQL databases, etc.), leading several teams of developers. As part of that, I needed to investigate, test, and use many alternatives.

The history of **FastAPI** is largely the history of its predecessors. 

**FastAPI** wouldn't exist if not for the previous work of others. There have been many tools created before that have helped inspire its creation. I avoided creating a new framework for several years, initially trying to solve all the features covered by **FastAPI** using various frameworks, plug-ins, and tools. Eventually, it became clear that creating something that provided all these features, taking the best ideas from previous tools, and combining them effectively was necessary, utilizing language features that weren't available before (Python 3.6+ type hints).

## Investigation

Using previous alternatives allowed me to learn from them, take ideas, and combine them effectively. It was clear that **FastAPI** should be based on standard Python type hints and existing standards. Before starting to code **FastAPI**, I spent several months studying the specs for OpenAPI, JSON Schema, OAuth2, etc., understanding their relationships, overlaps, and differences.

## Design

I spent time designing the developer "API" I wanted as a user of **FastAPI**. I tested several ideas in popular Python editors: PyCharm, VS Code, and Jedi-based editors. According to the Python Developer Survey, which covers about 80% of users, **FastAPI** was specifically tested with the editors used by most Python developers. This ensures that its benefits should work for virtually all editors, allowing for reduced code duplication, completion everywhere, type and error checks, and an overall improved development experience.

## Requirements

After testing several alternatives, I decided to use **Pydantic** for its advantages. I contributed to it to ensure full compliance with JSON Schema, support for different constraint declaration methods, and improved editor support (type checks, autocompletion). During development, I also contributed to **Starlette**, another key requirement.

## Development

By the time I started creating **FastAPI**, most pieces were already in place: the design was defined, the requirements and tools were ready, and the knowledge about the standards and specifications was clear and fresh.

## Future

**FastAPI** is proving useful for many people and is being chosen over previous alternatives for various use cases. Many developers and teams, including mine, already depend on **FastAPI** for their projects. However, there are still many improvements and features to come. **FastAPI** has a promising future ahead, and your help is greatly appreciated.

# Conditional OpenAPI

You can configure OpenAPI conditionally using settings and environment variables, and even disable it entirely.

## About Security, APIs, and Documentation

Hiding documentation user interfaces in production is not a valid method to protect your API. This approach does not enhance security; the path operations remain accessible. Security flaws in your code will persist regardless of documentation visibility. Concealing documentation complicates interaction with your API and may hinder debugging in production. This practice can be seen as a form of security through obscurity.

To secure your API effectively, consider the following measures:

- Define Pydantic models for request bodies and responses.
- Configure required permissions and roles using dependencies.
- Store only password hashes, never plaintext passwords.
- Utilize established cryptographic tools, such as Passlib and JWT tokens.
- Implement granular permission controls with OAuth2 scopes as needed.

However, there may be specific scenarios where you need to disable API documentation for certain environments (e.g., production) based on environment variable configurations.

## Conditional OpenAPI from Settings and Environment Variables

You can use Pydantic settings to configure your generated OpenAPI and documentation UIs. 

Example:

```Python
{!../../docs_src/conditional_openapi/tutorial001.py!}
```

In this example, the setting `openapi_url` is declared with a default of `"/openapi.json"`. This setting is used when creating the FastAPI app.

To disable OpenAPI (including the UI docs), set the environment variable `OPENAPI_URL` to an empty string:

```console
$ OPENAPI_URL= uvicorn main:app

INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

Accessing the URLs `/openapi.json`, `/docs`, or `/redoc` will result in a `404 Not Found` error:

```JSON
{
    "detail": "Not Found"
}
```

# Configure Swagger UI

You can configure additional Swagger UI parameters.

To configure them, pass the `swagger_ui_parameters` argument when creating the `FastAPI()` app object or to the `get_swagger_ui_html()` function.

`swagger_ui_parameters` receives a dictionary with the configurations passed to Swagger UI directly. FastAPI converts the configurations to JSON for compatibility with JavaScript.

## Disable Syntax Highlighting

By default, syntax highlighting is enabled. To disable it, set `syntaxHighlight` to `False`. This will prevent Swagger UI from showing syntax highlighting.

## Change the Theme

You can set the syntax highlighting theme using the key `"syntaxHighlight.theme"`.

This configuration changes the syntax highlighting color theme.

## Change Default Swagger UI Parameters

FastAPI includes default configuration parameters suitable for most use cases. You can override any of them by setting a different value in the `swagger_ui_parameters` argument. For example, to disable `deepLinking`, pass the appropriate settings to `swagger_ui_parameters`.

## Other Swagger UI Parameters

To see all possible configurations, refer to the official documentation for Swagger UI parameters.

## JavaScript-only Settings

Swagger UI allows configurations as JavaScript-only objects (e.g., JavaScript functions). FastAPI includes these JavaScript-only `presets` settings:

```JavaScript
presets: [
    SwaggerUIBundle.presets.apis,
    SwaggerUIBundle.SwaggerUIStandalonePreset
]
```

These are JavaScript objects, not strings, so they cannot be passed from Python code directly. To use JavaScript-only configurations, override all the Swagger UI path operations and manually write any necessary JavaScript.

# Custom Docs UI Static Assets (Self-Hosting)

The API docs utilize Swagger UI and ReDoc, which require JavaScript and CSS files. By default, these files are served from a CDN. However, customization is possible by setting a specific CDN or serving the files locally.

## Custom CDN for JavaScript and CSS

To use a different CDN, such as `https://unpkg.com/`, follow these steps:

### Disable Automatic Docs

Disable the automatic docs by setting their URLs to `None` when creating your FastAPI app:

```Python
{!../../docs_src/custom_docs_ui/tutorial001.py!}
```

### Include Custom Docs

Create path operations for the custom docs using FastAPI's internal functions:

- `openapi_url`: URL for the OpenAPI schema.
- `title`: Title of your API.
- `oauth2_redirect_url`: Use `app.swagger_ui_oauth2_redirect_url` for the default.
- `swagger_js_url`: Custom CDN URL for JavaScript.
- `swagger_css_url`: Custom CDN URL for CSS.

```Python
{!../../docs_src/custom_docs_ui/tutorial001.py!}
```

### Create Path Operation to Test

Create a path operation to test the setup:

```Python
{!../../docs_src/custom_docs_ui/tutorial001.py!}
```

### Test It

Access your docs at http://127.0.0.1:8000/docs. Reload the page to load assets from the new CDN.

## Self-Hosting JavaScript and CSS for Docs

Self-hosting is useful for offline access or local networks. Follow these steps to serve files locally.

### Project File Structure

Create a directory for static files:

```
.
├── app
│   ├── __init__.py
│   ├── main.py
└── static/
```

### Download the Files

Download the necessary static files and place them in the `static/` directory:

- Swagger UI:
  - `swagger-ui-bundle.js`
  - `swagger-ui.css`
- ReDoc:
  - `redoc.standalone.js`

Your file structure should look like this:

```
.
├── app
│   ├── __init__.py
│   ├── main.py
└── static
    ├── redoc.standalone.js
    ├── swagger-ui-bundle.js
    └── swagger-ui.css
```

### Serve the Static Files

Import `StaticFiles` and mount it in your FastAPI app:

```Python
{!../../docs_src/custom_docs_ui/tutorial002.py!}
```

### Test the Static Files

Start your application and access http://127.0.0.1:8000/static/redoc.standalone.js. You should see the JavaScript file for ReDoc.

### Disable Automatic Docs for Static Files

Disable automatic docs by setting their URLs to `None`:

```Python
{!../../docs_src/custom_docs_ui/tutorial002.py!}
```

### Include Custom Docs for Static Files

Create path operations for the custom docs, similar to the custom CDN setup:

```Python
{!../../docs_src/custom_docs_ui/tutorial002.py!}
```

### Create Path Operation to Test Static Files

Create a path operation to test the static files:

```Python
{!../../docs_src/custom_docs_ui/tutorial002.py!}
```

### Test Static Files UI

Disconnect your WiFi and access http://127.0.0.1:8000/docs. You should be able to view and interact with the API docs without Internet access.

# Custom Request and APIRoute Class

In some cases, you may want to override the logic used by the `Request` and `APIRoute` classes. This can be a good alternative to logic in middleware, especially if you want to read or manipulate the request body before it is processed by your application.

**Warning:** This is an "advanced" feature. If you are just starting with FastAPI, you might want to skip this section.

## Use Cases

Some use cases include:

- Converting non-JSON request bodies to JSON (e.g., msgpack).
- Decompressing gzip-compressed request bodies.
- Automatically logging all request bodies.

## Handling Custom Request Body Encodings

Let's see how to create a custom `Request` subclass to decompress gzip requests and an `APIRoute` subclass to use that custom request class.

### Create a Custom `GzipRequest` Class

This example demonstrates how to create a `GzipRequest` class that overwrites the `Request.body()` method to decompress the body if the appropriate header is present. If there's no `gzip` in the header, it will not attempt to decompress the body, allowing the same route class to handle both gzip-compressed and uncompressed requests.

```Python
# Example code for GzipRequest class
```

### Create a Custom `GzipRoute` Class

Next, create a custom subclass of `fastapi.routing.APIRoute` that uses the `GzipRequest`. This subclass will overwrite the method `APIRoute.get_route_handler()`, which returns a function that receives a request and returns a response. Here, it creates a `GzipRequest` from the original request.

```Python
# Example code for GzipRoute class
```

**Technical Details:** A `Request` has a `request.scope` attribute, which is a Python dictionary containing metadata related to the request. It also has a `request.receive` function to "receive" the body of the request. Both `scope` and `receive` are part of the ASGI specification and are necessary to create a new `Request` instance. For more information, refer to Starlette's documentation about Requests.

The function returned by `GzipRequest.get_route_handler` converts the `Request` to a `GzipRequest`, allowing it to decompress the data (if necessary) before passing it to the path operations. The request body will be automatically decompressed when loaded by FastAPI.

## Accessing the Request Body in an Exception Handler

To access the request body in an exception handler, handle the request inside a `try`/`except` block:

```Python
# Example code for accessing request body in exception handler
```

If an exception occurs, the `Request` instance will still be in scope, allowing you to read and use the request body when handling the error:

```Python
# Example code for using request body in error handling
```

## Custom `APIRoute` Class in a Router

You can set the `route_class` parameter of an `APIRouter`:

```Python
# Example code for setting route_class in APIRouter
```

In this example, the path operations under the router will use the custom `TimedRoute` class, which adds an extra `X-Response-Time` header in the response with the time it took to generate the response:

```Python
# Example code for TimedRoute class
```

# Extending OpenAPI

In some cases, you may need to modify the generated OpenAPI schema. This section explains how to do that.

## The Normal Process

A `FastAPI` application has an `.openapi()` method that returns the OpenAPI schema. During application creation, a path operation for `/openapi.json` (or your specified `openapi_url`) is registered, returning a JSON response from the application's `.openapi()` method.

By default, the `.openapi()` method checks the `.openapi_schema` property for contents. If empty, it generates the schema using the utility function `fastapi.openapi.utils.get_openapi`, which takes the following parameters:

- `title`: The OpenAPI title shown in the docs.
- `version`: The version of your API, e.g., `2.5.0`.
- `openapi_version`: The OpenAPI specification version used, defaulting to `3.1.0`.
- `summary`: A short summary of the API.
- `description`: The API description, which can include markdown and will be shown in the docs.
- `routes`: A list of routes, each representing registered path operations from `app.routes`.

Note: The `summary` parameter is available in OpenAPI 3.1.0 and above, supported by FastAPI 0.99.0 and above.

## Overriding the Defaults

You can use the same utility function to generate the OpenAPI schema and override any necessary parts. For example, to add ReDoc's OpenAPI extension for a custom logo:

### Normal FastAPI

Write your FastAPI application as usual.

### Generate the OpenAPI Schema

Use the utility function to generate the OpenAPI schema within a `custom_openapi()` function.

### Modify the OpenAPI Schema

Add the ReDoc extension by including a custom `x-logo` in the `info` object of the OpenAPI schema.

### Cache the OpenAPI Schema

Utilize the `.openapi_schema` property as a cache to store your generated schema. This prevents the schema from being regenerated with each request, allowing it to be generated once and reused.

### Override the Method

Replace the `.openapi()` method with your new function.

### Check It

Visit the local URL to see your custom logo in use.

# General - How To - Recipes

Here are several pointers to other places in the documentation for general or frequent questions.

## Filter Data - Security

To ensure that you don't return more data than you should, read the documentation for Tutorial - Response Model - Return Type.

## Documentation Tags - OpenAPI

To add tags to your path operations and group them in the documentation UI, read the documentation for Tutorial - Path Operation Configurations - Tags.

## Documentation Summary and Description - OpenAPI

To add a summary and description to your path operations and show them in the documentation UI, read the documentation for Tutorial - Path Operation Configurations - Summary and Description.

## Documentation Response Description - OpenAPI

To define the description of the response shown in the documentation UI, read the documentation for Tutorial - Path Operation Configurations - Response Description.

## Documentation Deprecate a Path Operation - OpenAPI

To deprecate a path operation and show it in the documentation UI, read the documentation for Tutorial - Path Operation Configurations - Deprecation.

## Convert Any Data to JSON-Compatible

To convert any data to JSON-compatible format, read the documentation for Tutorial - JSON Compatible Encoder.

## OpenAPI Metadata - Docs

To add metadata to your OpenAPI schema, including a license, version, contact, etc., read the documentation for Tutorial - Metadata and Docs URLs.

## OpenAPI Custom URL

To customize the OpenAPI URL or remove it, read the documentation for Tutorial - Metadata and Docs URLs.

## OpenAPI Docs URLs

To update the URLs used for the automatically generated documentation user interfaces, read the documentation for Tutorial - Metadata and Docs URLs.

# GraphQL

FastAPI is based on the ASGI standard, making it easy to integrate any GraphQL library compatible with ASGI. You can combine normal FastAPI path operations with GraphQL in the same application.

**GraphQL** solves specific use cases and has advantages and disadvantages compared to common web APIs. Evaluate if the benefits for your use case compensate for the drawbacks.

## GraphQL Libraries

Here are some GraphQL libraries with ASGI support that can be used with FastAPI:

- Strawberry
  - Documentation for FastAPI available.
- Ariadne
  - Documentation for FastAPI integration available.
- Tartiflette
  - Tartiflette ASGI provides ASGI integration.
- Graphene
  - starlette-graphene3 is available for integration.

## GraphQL with Strawberry

Strawberry is the recommended library for working with GraphQL due to its design, which closely aligns with FastAPI's type annotations. While other libraries may be preferred based on specific use cases, Strawberry is a strong suggestion.

Example of integrating Strawberry with FastAPI:

```Python
{!../../docs_src/graphql/tutorial001.py!}
```

Learn more about Strawberry in the Strawberry documentation and the documentation for Strawberry with FastAPI.

## Older `GraphQLApp` from Starlette

Previous versions of Starlette included a `GraphQLApp` class for integration with Graphene. This class has been deprecated, but you can migrate to starlette-graphene3, which covers the same use case with an almost identical interface.

**Tip:** If you need GraphQL, consider using Strawberry, as it is based on type annotations rather than custom classes and types.

## Learn More

Learn more about GraphQL in the official GraphQL documentation. You can also read more about each of the libraries described above in their respective documentation.

# How To - Recipes

This section contains various recipes or "how to" guides for several topics. Most ideas are independent, and you should only study them if they apply directly to your project. 

If something seems interesting and useful, feel free to explore it; otherwise, you may skip it.

Tip: For a structured learning experience with FastAPI, refer to the Tutorial - User Guide chapter by chapter instead.

# Separate OpenAPI Schemas for Input and Output

When using Pydantic v2, the generated OpenAPI is more accurate than before. In some cases, it will have two JSON Schemas in OpenAPI for the same Pydantic model, for input and output, depending on default values.

## Pydantic Models for Input and Output

Consider a Pydantic model with default values.

### Model for Input

When used as input, the `description` field will not be required due to its default value of `None`.

### Input Model in Docs

In the documentation, the `description` field does not have a red asterisk, indicating it is not required.

### Model for Output

When used as output, the same model will ensure that if no value is returned for `description`, it will still have the default value.

### Model for Output Response Data

In the response, even if the code does not add anything to the `description` field, the JSON response will contain the default value (`null`). This means the field will always be present, but its value may be `None`.

Clients using the API can assume the field will always be there, even if it has the default value of `None`. In OpenAPI, this field should be marked as required.

Thus, the JSON Schema for a model can differ based on its use for input or output:
- For input, `description` is not required.
- For output, `description` is required (and may be `None` or `null`).

### Model for Output in Docs

In the documentation, both `name` and `description` are marked as required with a red asterisk.

### Model for Input and Output in Docs

In the available Schemas in OpenAPI, there are two: `Item-Input` (where `description` is not required) and `Item-Output` (where `description` is required).

With Pydantic v2, API documentation is more precise, enhancing autogenerated clients and SDKs for a better developer experience.

## Do not Separate Schemas

In some cases, you may want the same schema for input and output. This is useful if you have autogenerated client code/SDKs that you do not want to update immediately.

To disable this feature in FastAPI, use the parameter `separate_input_output_schemas=False`.

Support for `separate_input_output_schemas` was added in FastAPI 0.102.0.

### Same Schema for Input and Output Models in Docs

With this setting, there will be a single schema for input and output, with `description` marked as not required. This behavior is consistent with Pydantic v1.

# Testing a Database

You can study about databases, SQL, and SQLModel in the SQLModel documentation.

There's a mini tutorial on using SQLModel with FastAPI.

That tutorial includes a section about testing SQL databases.

# FastAPI

FastAPI is a modern, high-performance web framework for building APIs with Python based on standard Python type hints.

## Key Features

- **Fast**: Very high performance, comparable to NodeJS and Go.
- **Fast to code**: Increases development speed by 200% to 300%.
- **Fewer bugs**: Reduces human-induced errors by about 40%.
- **Intuitive**: Excellent editor support with completion everywhere.
- **Easy**: Designed for ease of use and learning.
- **Short**: Minimizes code duplication and reduces bugs.
- **Robust**: Produces production-ready code with automatic interactive documentation.
- **Standards-based**: Fully compatible with OpenAPI and JSON Schema.

## Sponsors

For a list of sponsors, visit the FastAPI website.

## Opinions

- Kabir Khan, Microsoft: "I'm using FastAPI a ton these days... planning to use it for all of my team's ML services."
- Piero Molino, Uber: "We adopted the FastAPI library to spawn a REST server for predictions."
- Kevin Glisson, Netflix: "Netflix is pleased to announce the open-source release of our crisis management orchestration framework: Dispatch, built with FastAPI."
- Brian Okken, Python Bytes: "I’m over the moon excited about FastAPI. It’s so fun!"
- Timothy Crosley, Hug creator: "What you've built looks super solid and polished... it's really inspiring."
- Ines Montani, Explosion AI: "If you're looking to learn one modern framework for building REST APIs, check out FastAPI."
- Deon Pillsbury, Cisco: "I would highly recommend FastAPI. It is beautifully designed, simple to use, and highly scalable."

## Typer: The FastAPI of CLIs

If you are building a CLI app, check out Typer, which is intended to be the FastAPI of CLIs.

## Requirements

FastAPI relies on:
- Starlette for web components.
- Pydantic for data handling.

## Installation

Create and activate a virtual environment, then install FastAPI:

```
$ pip install "fastapi[standard]"
```

## Example

### Create it

Create a file `main.py` with:

```Python
from typing import Union
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
```

### Run it

Run the server with:

```
$ fastapi dev main.py
```

### Check it

Open your browser at http://127.0.0.1:8000/items/5?q=somequery to see the JSON response.

### Interactive API docs

Access the automatic interactive API documentation at:
- Swagger UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc

## Example Upgrade

Modify `main.py` to handle a body from a `PUT` request:

```Python
from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float
    is_offer: Union[bool, None] = None

@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    return {"item_name": item.name, "item_id": item_id}
```

## Performance

FastAPI applications running under Uvicorn are among the fastest Python frameworks available.

## Dependencies

FastAPI depends on Pydantic and Starlette.

### Standard Dependencies

Install with `pip install "fastapi[standard]"` to include optional dependencies like:
- email-validator
- httpx
- jinja2
- python-multipart
- uvicorn

### Without Standard Dependencies

Install with `pip install fastapi` to exclude optional dependencies.

### Additional Optional Dependencies

Consider installing:
- pydantic-settings for settings management.
- orjson for ORJSONResponse support.
- ujson for UJSONResponse support.

## License

This project is licensed under the terms of the MIT license.

Learn FastAPI

This documentation serves as an introductory guide and tutorial for learning FastAPI. It can be viewed as a book or a course, and it is the official and recommended method for mastering FastAPI.

# Repository Management Tasks

These tasks can be performed to manage the FastAPI repository by team members.

This section is useful only to team members with permissions to manage the repository.

If you are a team member of FastAPI, you can help with everything on Help FastAPI - Get Help the same ways as external contributors. Additionally, there are some tasks that only you can perform.

## General Instructions

### Be Nice

First of all, be nice. 

When things are difficult, try to find the good side. Thank others for their effort and interest, even if you disagree. Use emojis to convey emotion. 

Avoid bitter sarcasm or passive-aggressive comments. Be direct and specific in your responses. For difficult conversations, you can ask @tiangolo to handle it directly.

## Edit PR Titles

- Start the PR title with an emoji from gitmoji.
- Use the emoji character, not the GitHub code.
- Start the title with a verb (e.g., Add, Refactor, Fix).
- Use imperative form (e.g., Add support for teleporting).
- Make the title descriptive about what it achieves.
- Do not finish the title with a period.
- For translations, start with 🌐 and then Add {language} translation for followed by the translated file path.

Once the PR is merged, a GitHub Action will use the PR title to update the latest changes automatically.

## Add Labels to PRs

Use a supported label from the latest-changes list of labels:

- `breaking`: Breaking Changes
- `security`: Security Fixes
- `feature`: Features
- `bug`: Fixes
- `refactor`: Refactors
- `upgrade`: Upgrades
- `docs`: Docs
- `lang-all`: Translations
- `internal`: Internal

Ensure that one of the above labels is added, as some tools may add labels that are not used in the release notes.

## Add Labels to Translation PRs

For translation PRs, add the `lang-all` label and a specific language label (e.g., `lang-es` for Spanish). Also, add the `awaiting-review` label to notify reviewers.

## Merge Translation PRs

For Spanish, the final review will be done by @tiangolo. For other languages, confirm:

- The title is correct.
- It has the labels `lang-all` and `lang-{lang code}`.
- The PR changes only one or two Markdown files for the same language.
- The translation maintains the original structure and content.
- Admonition sections are not changed or translated.

## First Translation PR

For the first translation of a language, it will include `docs/{lang code}/docs/index.md` and `docs/{lang code}/mkdocs.yml`. Create a GitHub Discussion for the new language and add the appropriate labels.

## Review PRs

If a PR lacks explanation, ask for more information. Ensure:

- A feature PR has documentation.
- Documentation includes source example files.
- Tests are included and pass after applying the PR.
- Coverage remains at 100%.

You can add commits to tweak the PR as needed.

## FastAPI People PRs

Monthly, a GitHub Action updates the FastAPI People data. If tests pass, you can merge it immediately.

## External Links PRs

Check that new links are in the correct category and language, are functional, and contain the required fields (author, link, title). Ensure the PR has the right labels before merging.

## Dependabot PRs

For direct dependencies, do not merge without review. For internal dependencies, merge if tests pass and there are no obvious breaking changes.

## Mark GitHub Discussions Answers

When a question in GitHub Discussions has been answered, mark the answer by clicking "Mark as answer". Filter discussions by unanswered questions.

# Repository Management

This document describes the management and maintenance of the FastAPI repository.

## Owner

The creator and owner of the FastAPI repository is @tiangolo. The owner conducts the final review of each pull request (PR) before merging and makes the final decisions on the project, serving as the Benevolent Dictator For Life (BDFL).

## Team

A team assists in managing and maintaining the project, with varying levels of permissions and specific instructions.

Team members can perform tasks such as:

- Adding labels to PRs
- Editing PR titles
- Adding commits on top of PRs to make adjustments
- Marking answers in GitHub Discussions
- Merging specific types of PRs

Current team members can be found in the FastAPI People - Team document.

Joining the team is by invitation only, and the owner can update or remove permissions, instructions, or membership.

## FastAPI Experts

Individuals who actively assist others in GitHub Discussions may become FastAPI Experts. This is typically the best way to contribute to the project.

## External Contributions

External contributions are welcomed and appreciated, including answering questions and submitting PRs. There are many ways to help maintain FastAPI.

FastAPI and Friends Newsletter

For more information, visit the Mailjet website.

# Full Stack FastAPI Template

Templates are designed to be flexible and customizable, allowing you to modify them to fit your project's requirements. This template provides an excellent starting point with initial setup, security, database, and some API endpoints already configured.

GitHub Repository: Full Stack FastAPI Template

## Technology Stack and Features

- **FastAPI** for the Python backend API.
    - **SQLModel** for Python SQL database interactions (ORM).
    - **Pydantic** for data validation and settings management.
    - **PostgreSQL** as the SQL database.
- **React** for the frontend.
    - Using TypeScript, hooks, and Vite as part of a modern frontend stack.
    - **Chakra UI** for frontend components.
    - An automatically generated frontend client.
    - **Playwright** for End-to-End testing.
    - Dark mode support.
- **Docker Compose** for development and production.
- Secure password hashing by default.
- JWT token authentication.
- Email-based password recovery.
- Tests with **Pytest**.
- **Traefik** as a reverse proxy/load balancer.
- Deployment instructions using Docker Compose, including setting up a frontend Traefik proxy for automatic HTTPS certificates.
- CI (continuous integration) and CD (continuous deployment) based on GitHub Actions.

# Python Types Intro

Python supports optional "type hints" (also called "type annotations"). These type hints allow declaring the type of a variable, enhancing editor and tool support.

This tutorial covers the essentials of Python type hints, particularly in the context of FastAPI, which leverages these hints for various advantages.

## Motivation

Consider a simple function that takes `first_name` and `last_name`, converts the first letter of each to uppercase, and concatenates them. Without type hints, you may struggle with method names and autocompletion. Adding type hints improves editor support and error checking.

### Edit it

Modify the function parameters from:

```Python
    first_name, last_name
```

to:

```Python
    first_name: str, last_name: str
```

This change introduces type hints, enhancing autocompletion and error detection.

## Declaring Types

Type hints can be declared primarily in function parameters. You can use standard Python types such as:

- `int`
- `float`
- `bool`
- `bytes`

### Generic Types with Type Parameters

Generic types like `dict`, `list`, `set`, and `tuple` can have internal types. Use the `typing` module to declare these types.

#### Newer Versions of Python

From Python 3.6 onwards, the syntax is compatible with all versions, including 3.9 and 3.10. Newer versions simplify type annotations, allowing you to use built-in types directly.

#### List

To define a variable as a list of strings:

**Python 3.9+**

```Python
items: list[str]
```

**Python 3.8+**

```Python
from typing import List
items: List[str]
```

#### Tuple and Set

Declare tuples and sets similarly:

**Python 3.9+**

```Python
items_t: tuple[int, int, str]
items_s: set[bytes]
```

**Python 3.8+**

```Python
from typing import Tuple, Set
items_t: Tuple[int, int, str]
items_s: Set[bytes]
```

#### Dict

To define a dictionary:

**Python 3.9+**

```Python
prices: dict[str, float]
```

**Python 3.8+**

```Python
from typing import Dict
prices: Dict[str, float]
```

#### Union

Declare a variable that can be multiple types using `Union`:

**Python 3.10+**

```Python
item: int | str
```

**Python 3.8+**

```Python
from typing import Union
item: Union[int, str]
```

#### Possibly `None`

To indicate a value could be a specific type or `None`, use `Optional`:

```Python
from typing import Optional
name: Optional[str]
```

In Python 3.10, you can use:

```Python
name: str | None
```

#### Using `Union` or `Optional`

For versions below 3.10, prefer `Union[SomeType, None]` over `Optional[SomeType]` for clarity.

#### Generic Types

Generic types can be used with built-in types and from the `typing` module:

**Python 3.10+**

```Python
items: list[str]
```

**Python 3.8+**

```Python
from typing import List
items: List[str]
```

### Classes as Types

You can declare a class as the type of a variable. For example, if you have a class `Person`, you can declare:

```Python
one_person: Person
```

## Pydantic Models

Pydantic is a library for data validation, allowing you to define data shapes as classes with typed attributes. FastAPI is built on Pydantic, leveraging its capabilities for data validation and conversion.

## Type Hints with Metadata Annotations

Python allows adding metadata to type hints using `Annotated`.

**Python 3.9+**

```Python
from typing import Annotated
```

In versions below 3.9, import `Annotated` from `typing_extensions`.

## Type Hints in FastAPI

FastAPI utilizes type hints for:

- Editor support
- Type checks
- Defining requirements for request parameters
- Data conversion and validation
- API documentation using OpenAPI

By using standard Python types, FastAPI simplifies development and enhances functionality.

# APIRouter Class Reference

The `APIRouter` class can be imported from FastAPI as follows:

```python
from fastapi import APIRouter
```

## Attributes and Methods

The `APIRouter` class includes the following members:

- websocket
- include_router
- get
- put
- post
- delete
- options
- head
- patch
- trace
- on_event

# Background Tasks - BackgroundTasks

You can declare a parameter in a path operation function or dependency function with the type BackgroundTasks to schedule the execution of background tasks after the response is sent.

Import it directly from fastapi:

```python
from fastapi import BackgroundTasks
```

# Dependencies - `Depends()` and `Security()`

## `Depends()`

Dependencies are managed using the `Depends()` function, which accepts a callable. 

Import it from `fastapi`:

```python
from fastapi import Depends
```

## `Security()`

For scenarios involving security (authorization, authentication, etc.), you can use dependencies with `Depends()`. However, to declare OAuth2 scopes, use `Security()` instead.

Import `Security()` from `fastapi`:

```python
from fastapi import Security
```

# Encoders - jsonable_encoder

The `jsonable_encoder` function in FastAPI is used to convert data types into a format that is JSON serializable. This is particularly useful when working with complex data types such as Pydantic models, SQLAlchemy models, or other custom objects.

## Usage

```python
from fastapi.encoders import jsonable_encoder

data = {"key": "value"}
json_compatible_data = jsonable_encoder(data)
```

## Parameters

- `obj`: The object to be converted into a JSON-compatible format.
- `include`: A set of fields to include in the output.
- `exclude`: A set of fields to exclude from the output.
- `by_alias`: Whether to use field aliases defined in Pydantic models.
- `exclude_unset`: Whether to exclude unset fields from the output.

## Returns

Returns a JSON-compatible version of the input object.

## Example

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float

@app.post("/items/")
async def create_item(item: Item):
    json_compatible_item_data = jsonable_encoder(item)
    return json_compatible_item_data
```

## Notes

- The function handles various data types, including lists and dictionaries.
- It is particularly useful for preparing data for responses in FastAPI endpoints.

# Exceptions - HTTPException and WebSocketException

These exceptions can be raised to indicate errors to the client.

When an exception is raised, the execution is aborted, allowing you to raise these exceptions from anywhere in the code to terminate a request and display the error to the client.

You can use:

- HTTPException
- WebSocketException

These exceptions can be imported directly from fastapi:

```python
from fastapi import HTTPException, WebSocketException
```

HTTPException

WebSocketException

# FastAPI Class Reference

The `FastAPI` class can be imported from the `fastapi` module:

```python
from fastapi import FastAPI
```

## Attributes and Methods

- **Attributes:**
  - openapi_version
  - webhooks
  - state
  - dependency_overrides
  - openapi
  - websocket
  - include_router

- **Methods:**
  - get
  - put
  - post
  - delete
  - options
  - head
  - patch
  - trace
  - on_event
  - middleware
  - exception_handler

`HTTPConnection` class

To define dependencies compatible with both HTTP and WebSockets, use a parameter that accepts an `HTTPConnection` instead of a `Request` or a `WebSocket`.

Import it from fastapi.requests:

```python
from fastapi.requests import HTTPConnection
```

# FastAPI Reference

This document provides a reference for the FastAPI code API, including classes, functions, parameters, attributes, and all components available for use in applications.

For a comprehensive learning experience, refer to the FastAPI Tutorial.

# Middleware

Several middlewares are available from Starlette.

For more information, refer to the FastAPI documentation for Middleware.

## CORSMiddleware

Import from FastAPI:

```python
from fastapi.middleware.cors import CORSMiddleware
```

## GZipMiddleware

Import from FastAPI:

```python
from fastapi.middleware.gzip import GZipMiddleware
```

## HTTPSRedirectMiddleware

Import from FastAPI:

```python
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
```

## TrustedHostMiddleware

Import from FastAPI:

```python
from fastapi.middleware.trustedhost import TrustedHostMiddleware
```

## WSGIMiddleware

Import from FastAPI:

```python
from fastapi.middleware.wsgi import WSGIMiddleware
```

OpenAPI Documentation

Utilities for handling OpenAPI automatic UI documentation, including:

- Swagger UI (default at /docs)
- ReDoc (default at /redoc)

Functions:

- fastapi.openapi.docs.get_swagger_ui_html
- fastapi.openapi.docs.get_redoc_html
- fastapi.openapi.docs.get_swagger_ui_oauth2_redirect_html
- fastapi.openapi.docs.swagger_ui_default_parameters

OpenAPI Utilities

Several utilities are available to handle OpenAPI. Typically, these utilities are not necessary unless you have a specific advanced use case that requires them.

OpenAPI Pydantic models are utilized for generating and validating the OpenAPI specifications. These models are part of the FastAPI framework and facilitate the creation of API documentation and validation processes.

# Request Parameters

Reference information for request parameters used in path operation functions or dependency functions with `Annotated` to retrieve data from the request:

- `Query()`
- `Path()`
- `Body()`
- `Cookie()`
- `Header()`
- `Form()`
- `File()`

Import all directly from `fastapi`:

```python
from fastapi import Body, Cookie, File, Form, Header, Path, Query
```

Documentation for each parameter:

- fastapi.Query
- fastapi.Path
- fastapi.Body
- fastapi.Cookie
- fastapi.Header
- fastapi.Form
- fastapi.File

# Request Class

You can declare a parameter in a path operation function or dependency to be of type `Request` to access the raw request object directly, without any validation.

Import it from FastAPI:

```python
from fastapi import Request
```

Tip: To define dependencies compatible with both HTTP and WebSockets, use a parameter that takes an `HTTPConnection` instead of a `Request` or a `WebSocket`.

# Response Class

You can declare a parameter in a path operation function or dependency as type `Response` to set data for the response, such as headers or cookies.

You can also create an instance of `Response` and return it from your path operations.

Import it directly from FastAPI:

```python
from fastapi import Response
```

# Custom Response Classes - File, HTML, Redirect, Streaming, etc.

You can create instances of several custom response classes and return them directly from your path operations.

Import them from fastapi.responses:

```python
from fastapi.responses import (
    FileResponse,
    HTMLResponse,
    JSONResponse,
    ORJSONResponse,
    PlainTextResponse,
    RedirectResponse,
    Response,
    StreamingResponse,
    UJSONResponse,
)
```

## FastAPI Responses

### UJSONResponse
- charset
- status_code
- media_type
- body
- background
- raw_headers
- render
- init_headers
- headers
- set_cookie
- delete_cookie

### ORJSONResponse
- charset
- status_code
- media_type
- body
- background
- raw_headers
- render
- init_headers
- headers
- set_cookie
- delete_cookie

## Starlette Responses

### FileResponse
- chunk_size
- charset
- status_code
- media_type
- body
- background
- raw_headers
- render
- init_headers
- headers
- set_cookie
- delete_cookie

### HTMLResponse
- charset
- status_code
- media_type
- body
- background
- raw_headers
- render
- init_headers
- headers
- set_cookie
- delete_cookie

### JSONResponse
- charset
- status_code
- media_type
- body
- background
- raw_headers
- render
- init_headers
- headers
- set_cookie
- delete_cookie

### PlainTextResponse
- charset
- status_code
- media_type
- body
- background
- raw_headers
- render
- init_headers
- headers
- set_cookie
- delete_cookie

### RedirectResponse
- charset
- status_code
- media_type
- body
- background
- raw_headers
- render
- init_headers
- headers
- set_cookie
- delete_cookie

### Response
- charset
- status_code
- media_type
- body
- background
- raw_headers
- render
- init_headers
- headers
- set_cookie
- delete_cookie

### StreamingResponse
- body_iterator
- charset
- status_code
- media_type
- body
- background
- raw_headers
- render
- init_headers
- headers
- set_cookie
- delete_cookie

# Security Tools

To declare dependencies with OAuth2 scopes, use `Security()`. You must define the dependable, which is the callable passed as a parameter to `Depends()` or `Security()`.

Multiple tools are available to create these dependables, which integrate into OpenAPI for automatic documentation, client generation, and SDKs.

Import the following from `fastapi.security`:

```python
from fastapi.security import (
    APIKeyCookie,
    APIKeyHeader,
    APIKeyQuery,
    HTTPAuthorizationCredentials,
    HTTPBasic,
    HTTPBasicCredentials,
    HTTPBearer,
    HTTPDigest,
    OAuth2,
    OAuth2AuthorizationCodeBearer,
    OAuth2PasswordBearer,
    OAuth2PasswordRequestForm,
    OAuth2PasswordRequestFormStrict,
    OpenIdConnect,
    SecurityScopes,
)
```

## API Key Security Schemes

- APIKeyCookie
- APIKeyHeader
- APIKeyQuery

## HTTP Authentication Schemes

- HTTPBasic
- HTTPBearer
- HTTPDigest

## HTTP Credentials

- HTTPAuthorizationCredentials
- HTTPBasicCredentials

## OAuth2 Authentication

- OAuth2
- OAuth2AuthorizationCodeBearer
- OAuth2PasswordBearer

## OAuth2 Password Form

- OAuth2PasswordRequestForm
- OAuth2PasswordRequestFormStrict

## OAuth2 Security Scopes in Dependencies

- SecurityScopes

## OpenID Connect

- OpenIdConnect

# Static Files - `StaticFiles`

The `StaticFiles` class is used to serve static files such as JavaScript, CSS, images, etc.

Import it from `fastapi.staticfiles`:

```python
from fastapi.staticfiles import StaticFiles
```

Refer to the FastAPI documentation for more information on Static Files.

# Status Codes

You can import the `status` module from `fastapi`:

```python
from fastapi import status
```

`status` is provided directly by Starlette and contains a group of named constants (variables) with integer status codes.

For example:

- 200: `status.HTTP_200_OK`
- 403: `status.HTTP_403_FORBIDDEN`
- etc.

This allows for convenient access to HTTP (and WebSocket) status codes in your app, utilizing autocompletion for the names without needing to memorize the integer codes.

## Example

```python
from fastapi import FastAPI, status

app = FastAPI()

@app.get("/items/", status_code=status.HTTP_418_IM_A_TEAPOT)
def read_items():
    return [{"name": "Plumbus"}, {"name": "Portal Gun"}]
```

# Templating - Jinja2Templates

The `Jinja2Templates` class is used to render Jinja templates.

Import it from `fastapi.templating`:

```python
from fastapi.templating import Jinja2Templates
```

For more information, refer to the FastAPI documentation for Templates.

# Test Client - TestClient

The `TestClient` class allows you to test FastAPI applications without establishing an actual HTTP and socket connection, enabling direct communication with the FastAPI code.

You can import it directly from fastapi.testclient:

```python
from fastapi.testclient import TestClient
```

# UploadFile Class

Define path operation function parameters as type `UploadFile` to receive files from requests. 

Import it from FastAPI:

```python
from fastapi import UploadFile
```

Attributes of `UploadFile`:

- file
- filename
- size
- headers
- content_type
- read
- write
- seek
- close

# WebSockets

To define WebSockets, declare a parameter of type `WebSocket` to read data from the client and send data to it. This is provided by Starlette and can be imported from FastAPI:

```python
from fastapi import WebSocket
```

**Tip:** For dependencies compatible with both HTTP and WebSockets, use an `HTTPConnection` parameter instead of `Request` or `WebSocket`.

## fastapi.WebSocket Members

- scope
- app
- url
- base_url
- headers
- query_params
- path_params
- cookies
- client
- state
- url_for
- client_state
- application_state
- receive
- send
- accept
- receive_text
- receive_bytes
- receive_json
- iter_text
- iter_bytes
- iter_json
- send_text
- send_bytes
- send_json
- close

When a client disconnects, a `WebSocketDisconnect` exception is raised, which can be caught. Import it from FastAPI:

```python
from fastapi import WebSocketDisconnect
```

## Additional Classes for WebSockets

Additional classes for handling WebSockets can be imported from FastAPI:

```python
from fastapi.websockets import WebSocketDisconnect, WebSocketState
```

Resources

Additional resources, external links, articles, and more.

# Background Tasks

You can define background tasks to be run after returning a response. This is useful for operations that need to happen after a request, but that the client doesn't have to wait for before receiving the response. Examples include:

- Email notifications sent after performing an action.
- Processing data, such as accepting a file and processing it in the background.

## Using BackgroundTasks

First, import `BackgroundTasks` and define a parameter in your path operation function with a type declaration of `BackgroundTasks`:

```Python
from fastapi import BackgroundTasks

@app.post("/send-notification/")
async def send_notification(email: str, background_tasks: BackgroundTasks):
    background_tasks.add_task(write_notification, email, message="some notification")
    return {"message": "Notification sent"}
```

FastAPI will create the object of type `BackgroundTasks` for you and pass it as that parameter.

## Create a Task Function

Create a function to be run as the background task. It can be an `async def` or normal `def` function. For example, a function that writes to a file:

```Python
def write_notification(email: str, message: str):
    with open("log.txt", "a") as log:
        log.write(f"Notification sent to {email}: {message}\n")
```

## Add the Background Task

Inside your path operation function, pass your task function to the background tasks object with the method `.add_task()`:

```Python
background_tasks.add_task(write_notification, email, message="some notification")
```

## Dependency Injection

Using `BackgroundTasks` works with the dependency injection system. You can declare a parameter of type `BackgroundTasks` at multiple levels: in a path operation function, in a dependency, or in a sub-dependency. FastAPI merges all background tasks and runs them afterwards.

### Example for Python 3.10+

```Python
@app.post("/process/")
async def process_data(background_tasks: BackgroundTasks):
    background_tasks.add_task(write_to_log, "Processing started")
    return {"message": "Processing started"}
```

### Example for Python 3.9+

```Python
@app.post("/process/")
async def process_data(background_tasks: BackgroundTasks):
    background_tasks.add_task(write_to_log, "Processing started")
    return {"message": "Processing started"}
```

### Example for Python 3.8+

```Python
@app.post("/process/")
async def process_data(background_tasks: BackgroundTasks):
    background_tasks.add_task(write_to_log, "Processing started")
    return {"message": "Processing started"}
```

In these examples, messages will be written to the `log.txt` file after the response is sent.

## Technical Details

The class `BackgroundTasks` comes from `starlette.background`. It is included directly in FastAPI, allowing you to import it from `fastapi` and avoid importing the alternative `BackgroundTask`. Using `BackgroundTasks` allows it to be used as a path operation function parameter, with FastAPI handling the rest.

## Caveat

For heavy background computation that doesn't need to run in the same process, consider using tools like Celery. They require more complex configurations and allow running background tasks in multiple processes and servers. For small tasks, like sending an email notification, use `BackgroundTasks`.

## Recap

Import and use `BackgroundTasks` with parameters in path operation functions and dependencies to add background tasks.

# Bigger Applications - Multiple Files

When building an application or web API, it's common to structure your code across multiple files. FastAPI offers tools to help organize your application while maintaining flexibility.

## Example File Structure

Consider the following file structure:

```
.
├── app
│   ├── __init__.py
│   ├── main.py
│   ├── dependencies.py
│   └── routers
│       ├── __init__.py
│       ├── items.py
│       └── users.py
│   └── internal
│       ├── __init__.py
│       └── admin.py
```

### Explanation of Structure

- The `app` directory is a Python package due to the presence of `__init__.py`.
- `app/main.py` is a module: `app.main`.
- `app/dependencies.py` is another module: `app.dependencies`.
- `app/routers/` is a subpackage: `app.routers`.
- `app/routers/items.py` is a submodule: `app.routers.items`.
- `app/routers/users.py` is another submodule: `app.routers.users`.
- `app/internal/` is another subpackage: `app.internal`.
- `app/internal/admin.py` is a submodule: `app.internal.admin`.

## `APIRouter`

For handling user-related path operations, use `APIRouter` in `app/routers/users.py`.

### Importing `APIRouter`

Import and create an instance of `APIRouter` similarly to `FastAPI`:

```python
from fastapi import APIRouter

router = APIRouter()
```

### Declaring Path Operations

Use `APIRouter` to declare path operations:

```python
@router.get("/users/")
async def read_users():
    ...
```

`APIRouter` supports the same options as `FastAPI`, including parameters, responses, dependencies, and tags.

## Dependencies

Place shared dependencies in `app/dependencies.py`. For example, to read a custom `X-Token` header:

```python
from fastapi import Depends

def get_token_header(x_token: str = Header(...)):
    ...
```

## Another Module with `APIRouter`

For item-related endpoints in `app/routers/items.py`, you can simplify code by using shared parameters:

```python
router = APIRouter(
    prefix="/items",
    tags=["items"],
    responses={404: {"description": "Not found"}},
    dependencies=[Depends(get_token_header)],
)
```

## Importing Dependencies

Use relative imports to access dependencies in `app/routers/items.py`:

```python
from ..dependencies import get_token_header
```

## Adding Custom Tags, Responses, and Dependencies

You can add additional tags and responses to specific path operations:

```python
@router.get("/items/{item_id}", tags=["items", "custom"])
async def read_item(item_id: str):
    ...
```

## Main `FastAPI`

In `app/main.py`, import and use `FastAPI`:

```python
from fastapi import FastAPI

app = FastAPI()
```

### Importing `APIRouter`

Import routers using relative imports:

```python
from .routers import items, users
```

### Including Routers

Include the routers in the main application:

```python
app.include_router(users.router)
app.include_router(items.router)
```

## Including an `APIRouter` with Custom Parameters

If you have an `APIRouter` in `app/internal/admin.py`, you can include it with custom parameters:

```python
app.include_router(admin.router, prefix="/admin", tags=["admin"], dependencies=[Depends(get_token_header)])
```

## Adding Path Operations Directly

You can also add path operations directly to the FastAPI app:

```python
@app.get("/custom-path")
async def custom_path():
    ...
```

## Check the Automatic API Docs

Run your app and access the automatic API docs at `http://127.0.0.1:8000/docs`.

## Include the Same Router Multiple Times

You can include the same router multiple times with different prefixes:

```python
app.include_router(items.router, prefix="/api/v1")
app.include_router(items.router, prefix="/api/latest")
```

## Include an `APIRouter` in Another

You can include an `APIRouter` within another using:

```python
router.include_router(other_router)
```

Ensure this is done before including the router in the FastAPI app.

# Body - Fields

You can declare additional validation and metadata in path operation function parameters with `Query`, `Path`, and `Body`, as well as inside Pydantic models using Pydantic's `Field`.

## Import `Field`

First, import `Field`:

```Python
# Python 3.10+
from pydantic import Field

# Python 3.9+
from pydantic import Field

# Python 3.8+
from pydantic import Field
```

Prefer to use the `Annotated` version if possible.

```Python
# Python 3.10+ non-Annotated
from pydantic import Field

# Python 3.8+ non-Annotated
from pydantic import Field
```

**Note:** `Field` is imported directly from `pydantic`, not from `fastapi` like `Query`, `Path`, `Body`, etc.

## Declare model attributes

You can use `Field` with model attributes:

```Python
# Python 3.10+
from pydantic import BaseModel, Field

# Python 3.9+
from pydantic import BaseModel, Field

# Python 3.8+
from pydantic import BaseModel, Field
```

Prefer to use the `Annotated` version if possible.

```Python
# Python 3.10+ non-Annotated
from pydantic import BaseModel, Field

# Python 3.8+ non-Annotated
from pydantic import BaseModel, Field
```

`Field` works similarly to `Query`, `Path`, and `Body`, sharing the same parameters.

**Technical Details:** `Query`, `Path`, and others create objects of subclasses of a common `Param` class, which is a subclass of Pydantic's `FieldInfo` class. Pydantic's `Field` returns an instance of `FieldInfo`. `Body` also returns objects of a subclass of `FieldInfo`. When importing `Query`, `Path`, and others from `fastapi`, those are functions that return special classes.

**Tip:** Each model's attribute with a type, default value, and `Field` has the same structure as a path operation function's parameter, using `Field` instead of `Path`, `Query`, and `Body`.

## Add extra information

You can declare extra information in `Field`, `Query`, `Body`, etc., which will be included in the generated JSON Schema. More details on adding extra information will be provided later in the documentation.

**Warning:** Extra keys passed to `Field` will also appear in the resulting OpenAPI schema. Some OpenAPI tools may not work with your generated schema if these keys are not part of the OpenAPI specification.

## Recap

Use Pydantic's `Field` to declare extra validations and metadata for model attributes. You can also use extra keyword arguments to pass additional JSON Schema metadata.

# Body - Multiple Parameters

## Mix `Path`, `Query` and body parameters

You can mix `Path`, `Query`, and request body parameter declarations freely, and FastAPI will handle them appropriately. Body parameters can be declared as optional by setting the default to `None`.

### Python 3.10+

```Python
{!> ../../docs_src/body_multiple_params/tutorial001_an_py310.py!}
```

### Python 3.9+

```Python
{!> ../../docs_src/body_multiple_params/tutorial001_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/body_multiple_params/tutorial001_an.py!}
```

### Python 3.10+ non-Annotated

```Python
{!> ../../docs_src/body_multiple_params/tutorial001_py310.py!}
```

### Python 3.8+ non-Annotated

```Python
{!> ../../docs_src/body_multiple_params/tutorial001.py!}
```

Note: The `item` from the body is optional due to its `None` default value.

## Multiple body parameters

You can declare multiple body parameters, such as `item` and `user`. FastAPI will use the parameter names as keys in the body.

### Python 3.10+

```Python
{!> ../../docs_src/body_multiple_params/tutorial002_py310.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/body_multiple_params/tutorial002.py!}
```

Expected body format:

```JSON
{
    "item": {
        "name": "Foo",
        "description": "The pretender",
        "price": 42.0,
        "tax": 3.2
    },
    "user": {
        "username": "dave",
        "full_name": "Dave Grohl"
    }
}
```

FastAPI will automatically convert and validate the data.

## Singular values in body

To add a singular value like `importance` to the body, use `Body` to specify it as a body key.

### Python 3.10+

```Python
{!> ../../docs_src/body_multiple_params/tutorial003_an_py310.py!}
```

### Python 3.9+

```Python
{!> ../../docs_src/body_multiple_params/tutorial003_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/body_multiple_params/tutorial003_an.py!}
```

### Python 3.10+ non-Annotated

```Python
{!> ../../docs_src/body_multiple_params/tutorial003_py310.py!}
```

### Python 3.8+ non-Annotated

```Python
{!> ../../docs_src/body_multiple_params/tutorial003.py!}
```

Expected body format:

```JSON
{
    "item": {
        "name": "Foo",
        "description": "The pretender",
        "price": 42.0,
        "tax": 3.2
    },
    "user": {
        "username": "dave",
        "full_name": "Dave Grohl"
    },
    "importance": 5
}
```

## Multiple body params and query

You can declare additional query parameters alongside body parameters. Singular values are interpreted as query parameters by default.

### Python 3.10+

```Python
{!> ../../docs_src/body_multiple_params/tutorial004_an_py310.py!}
```

### Python 3.9+

```Python
{!> ../../docs_src/body_multiple_params/tutorial004_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/body_multiple_params/tutorial004_an.py!}
```

### Python 3.10+ non-Annotated

```Python
{!> ../../docs_src/body_multiple_params/tutorial004_py310.py!}
```

### Python 3.8+ non-Annotated

```Python
{!> ../../docs_src/body_multiple_params/tutorial004.py!}
```

Body also has validation and metadata parameters similar to `Query` and `Path`.

## Embed a single body parameter

To expect a JSON with a key `item` containing the model contents, use `Body(embed=True)`.

### Python 3.10+

```Python
{!> ../../docs_src/body_multiple_params/tutorial005_an_py310.py!}
```

### Python 3.9+

```Python
{!> ../../docs_src/body_multiple_params/tutorial005_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/body_multiple_params/tutorial005_an.py!}
```

### Python 3.10+ non-Annotated

```Python
{!> ../../docs_src/body_multiple_params/tutorial005_py310.py!}
```

### Python 3.8+ non-Annotated

```Python
{!> ../../docs_src/body_multiple_params/tutorial005.py!}
```

Expected body format:

```JSON
{
    "item": {
        "name": "Foo",
        "description": "The pretender",
        "price": 42.0,
        "tax": 3.2
    }
}
```

## Recap

You can add multiple body parameters to your path operation function. FastAPI will handle the data correctly, validate it, and document the schema. You can also declare singular values as part of the body and embed the body in a key even with a single parameter.

# Body - Nested Models

With FastAPI, you can define, validate, document, and use arbitrarily deeply nested models (thanks to Pydantic).

## List fields

You can define an attribute to be a subtype, such as a Python list. This will make `tags` a list, although it doesn't declare the type of the elements.

## List fields with type parameter

Python has a specific way to declare lists with internal types, or "type parameters":

### Import typing's List

In Python 3.9 and above, you can use the standard `list` for type annotations. In Python versions before 3.9, import `List` from the `typing` module.

### Declare a list with a type parameter

To declare types with type parameters, like `list`, `dict`, `tuple`:

- For Python versions lower than 3.9, import their equivalent from the `typing` module.
- Pass the internal type(s) as "type parameters" using square brackets.

In Python 3.9:
```Python
my_list: list[str]
```
In versions before 3.9:
```Python
from typing import List
my_list: List[str]
```

Use this standard syntax for model attributes with internal types. For example, `tags` can be a "list of strings".

## Set types

If tags shouldn't repeat, declare `tags` as a set of strings. This will convert duplicate data to a set of unique items.

## Nested Models

Each attribute of a Pydantic model has a type, which can be another Pydantic model. You can declare deeply nested JSON objects with specific attribute names, types, and validations.

### Define a submodel

For example, define an `Image` model.

### Use the submodel as a type

You can use it as the type of an attribute. FastAPI will expect a body similar to:
```JSON
{
    "name": "Foo",
    "description": "The pretender",
    "price": 42.0,
    "tax": 3.2,
    "tags": ["rock", "metal", "bar"],
    "image": {
        "url": "http://example.com/baz.jpg",
        "name": "The Foo live"
    }
}
```
This provides editor support, data conversion, validation, and automatic documentation.

## Special types and validation

You can use complex singular types that inherit from `str`. For example, declare a `url` field as an instance of Pydantic's `HttpUrl` instead of a `str`. The string will be checked to be a valid URL.

## Attributes with lists of submodels

You can use Pydantic models as subtypes of `list`, `set`, etc. This will expect a JSON body like:
```JSON
{
    "name": "Foo",
    "description": "The pretender",
    "price": 42.0,
    "tax": 3.2,
    "tags": ["rock", "metal", "bar"],
    "images": [
        {
            "url": "http://example.com/baz.jpg",
            "name": "The Foo live"
        },
        {
            "url": "http://example.com/dave.jpg",
            "name": "The Baz"
        }
    ]
}
```

## Deeply nested models

You can define arbitrarily deeply nested models.

## Bodies of pure lists

If the top-level value of the JSON body is a JSON array, declare the type in the function parameter:
```Python
images: List[Image]
```
or in Python 3.9 and above:
```Python
images: list[Image]
```

## Editor support everywhere

You get editor support for items inside lists. Incoming dicts are converted automatically, and your output is converted to JSON.

## Bodies of arbitrary dicts

You can declare a body as a dict with keys of some type and values of another type. This is useful for receiving keys that you don't already know. For example, accept any dict with `int` keys and `float` values:
```Python
weights: Dict[int, float]
```

Keep in mind that JSON only supports `str` as keys, but Pydantic will convert and validate them.

## Recap

With FastAPI, you have maximum flexibility provided by Pydantic models, while keeping your code simple, short, and elegant. Benefits include:

- Editor support
- Data conversion
- Data validation
- Schema documentation
- Automatic docs

# Body - Updates

## Update replacing with `PUT`

To update an item, use the HTTP `PUT` operation. You can utilize `jsonable_encoder` to convert input data into a JSON-compatible format (e.g., converting `datetime` to `str`).

```Python
{!> ../../docs_src/body_updates/tutorial001_py310.py!}
```

```Python
{!> ../../docs_src/body_updates/tutorial001_py39.py!}
```

```Python
{!> ../../docs_src/body_updates/tutorial001.py!}
```

`PUT` replaces existing data. For example, if you update the item `bar` with:

```Python
{
    "name": "Barz",
    "price": 3,
    "description": None,
}
```

The missing attribute `"tax": 20.2` will default to `"tax": 10.5`, resulting in the new data being saved with `tax` as `10.5`.

## Partial updates with `PATCH`

You can also use the HTTP `PATCH` operation for partial updates, allowing you to send only the data you want to change.

`PATCH` is less commonly used than `PUT`, and many teams prefer using `PUT` for all updates. FastAPI allows you to choose either method.

### Using Pydantic's `exclude_unset` parameter

To receive partial updates, use the `exclude_unset` parameter in Pydantic's model's `.model_dump()` method.

```Python
{!> ../../docs_src/body_updates/tutorial002_py310.py!}
```

```Python
{!> ../../docs_src/body_updates/tutorial002_py39.py!}
```

```Python
{!> ../../docs_src/body_updates/tutorial002.py!}
```

### Using Pydantic's `update` parameter

Create a copy of the existing model using `.model_copy()` and pass the `update` parameter with the data to update.

```Python
{!> ../../docs_src/body_updates/tutorial002_py310.py!}
```

```Python
{!> ../../docs_src/body_updates/tutorial002_py39.py!}
```

```Python
{!> ../../docs_src/body_updates/tutorial002.py!}
```

### Partial updates recap

To apply partial updates:

- Optionally use `PATCH` instead of `PUT`.
- Retrieve the stored data.
- Place that data in a Pydantic model.
- Generate a `dict` without default values from the input model (using `exclude_unset`).
- Create a copy of the stored model, updating its attributes with the received partial updates (using the `update` parameter).
- Convert the copied model to a JSON-compatible format (using `jsonable_encoder`).
- Save the data to your database.
- Return the updated model.

```Python
{!> ../../docs_src/body_updates/tutorial002_py310.py!}
```

```Python
{!> ../../docs_src/body_updates/tutorial002_py39.py!}
```

```Python
{!> ../../docs_src/body_updates/tutorial002.py!}
```

You can use this technique with an HTTP `PUT` operation, but the example uses `PATCH` for clarity.

Note that the input model is still validated. To allow partial updates that can omit all attributes, ensure the model has all attributes marked as optional. For distinguishing between models for updates and creation, refer to Extra Models documentation.

# Request Body

When sending data from a client (e.g., a browser) to your API, it is sent as a **request body**. 

A **request body** is the data sent by the client, while a **response body** is the data your API sends back. Your API typically sends a **response body**, but clients do not always need to send a **request body**; sometimes they only request a path with query parameters.

To declare a **request body**, use Pydantic models for their benefits.

To send data, use one of the following methods: `POST`, `PUT`, `DELETE`, or `PATCH`. Sending a body with a `GET` request is discouraged due to undefined behavior in specifications, but it is supported by FastAPI for complex use cases. However, it won't be documented in interactive Swagger UI, and proxies may not support it.

## Import Pydantic's `BaseModel`

Import `BaseModel` from `pydantic`:

```Python
from pydantic import BaseModel
```

## Create your data model

Declare your data model as a class that inherits from `BaseModel`, using standard Python types for attributes:

```Python
class Item(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None
```

The model above represents a JSON object like:

```JSON
{
    "name": "Foo",
    "description": "An optional description",
    "price": 45.2,
    "tax": 3.5
}
```

The `description` and `tax` attributes are optional.

## Declare it as a parameter

To add it to your path operation, declare it similarly to path and query parameters:

```Python
@app.post("/items/")
async def create_item(item: Item):
```

## Results

With this declaration, **FastAPI** will:

- Read the request body as JSON.
- Convert types as needed.
- Validate the data, returning clear errors for invalid data.
- Provide the received data in the parameter `item`, with editor support for attributes and types.
- Generate JSON Schema definitions for your model, usable elsewhere in your project.
- Include schemas in the generated OpenAPI schema for automatic documentation UIs.

## Automatic docs

The JSON Schemas of your models will be part of your OpenAPI generated schema and shown in interactive API docs.

## Editor support

In your editor, you will receive type hints and completion for the model attributes, along with error checks for incorrect type operations. This design was thoroughly tested to ensure compatibility with various editors, including Visual Studio Code and PyCharm.

## Use the model

Inside the function, access all attributes of the model object directly:

```Python
@app.post("/items/")
async def create_item(item: Item):
    return item.name
```

## Request body + path parameters

You can declare path parameters and request body simultaneously. FastAPI will recognize which parameters come from the path and which from the request body.

```Python
@app.post("/items/{item_id}")
async def update_item(item_id: int, item: Item):
```

## Request body + path + query parameters

You can declare body, path, and query parameters together. FastAPI will correctly identify each parameter's source.

```Python
@app.get("/items/{item_id}")
async def read_item(item_id: int, q: str = None, item: Item):
```

The function parameters will be recognized as follows:

- Parameters declared in the path are treated as path parameters.
- Singular type parameters (e.g., `int`, `str`) are treated as query parameters.
- Parameters of Pydantic model type are treated as request body.

## Without Pydantic

If you prefer not to use Pydantic models, you can use **Body** parameters. Refer to the documentation for more details on Body parameters.

# Cookie Parameter Models

If you have a group of cookies that are related, you can create a Pydantic model to declare them. This allows you to re-use the model in multiple places and declare validations and metadata for all parameters at once.

Note: This is supported since FastAPI version 0.115.0.

Tip: This same technique applies to Query, Cookie, and Header.

## Cookies with a Pydantic Model

Declare the cookie parameters that you need in a Pydantic model, and then declare the parameter as Cookie:

Python 3.10+ Example:
```Python
{!> ../../docs_src/cookie_param_models/tutorial001_an_py310.py!}
```

Python 3.9+ Example:
```Python
{!> ../../docs_src/cookie_param_models/tutorial001_an_py39.py!}
```

Python 3.8+ Example:
```Python
{!> ../../docs_src/cookie_param_models/tutorial001_an.py!}
```

Python 3.10+ non-Annotated Example:
Tip: Prefer to use the Annotated version if possible.
```Python
{!> ../../docs_src/cookie_param_models/tutorial001_py310.py!}
```

Python 3.8+ non-Annotated Example:
Tip: Prefer to use the Annotated version if possible.
```Python
{!> ../../docs_src/cookie_param_models/tutorial001.py!}
```

FastAPI will extract the data for each field from the cookies received in the request and provide the Pydantic model you defined.

## Check the Docs

You can see the defined cookies in the docs UI at /docs. 

Info: Browsers handle cookies in special ways and do not easily allow JavaScript to access them. In the API docs UI at /docs, you will see the documentation for cookies for your path operations. However, even if you fill the data and click "Execute," the cookies won't be sent due to JavaScript limitations, resulting in an error message.

## Forbid Extra Cookies

In some special use cases, you might want to restrict the cookies that you want to receive. You can use Pydantic's model configuration to forbid any extra fields:

Python 3.9+ Example:
```Python
{!> ../../docs_src/cookie_param_models/tutorial002_an_py39.py!}
```

Python 3.8+ Example:
```Python
{!> ../../docs_src/cookie_param_models/tutorial002_an.py!}
```

Python 3.8+ non-Annotated Example:
Tip: Prefer to use the Annotated version if possible.
```Python
{!> ../../docs_src/cookie_param_models/tutorial002.py!}
```

If a client tries to send extra cookies, they will receive an error response. For example, if the client sends a `santa_tracker` cookie with a value of `good-list-please`, the client will receive an error response indicating that the `santa_tracker` cookie is not allowed:

```json
{
    "detail": [
        {
            "type": "extra_forbidden",
            "loc": ["cookie", "santa_tracker"],
            "msg": "Extra inputs are not permitted",
            "input": "good-list-please"
        }
    ]
}
```

## Summary

You can use Pydantic models to declare cookies in FastAPI.

# Cookie Parameters

You can define Cookie parameters similarly to how you define Query and Path parameters.

## Import Cookie

First, import Cookie:

**Python 3.10+**
```Python
from fastapi import Cookie
```

**Python 3.9+**
```Python
from fastapi import Cookie
```

**Python 3.8+**
```Python
from fastapi import Cookie
```

**Python 3.10+ non-Annotated**
*Tip: Prefer to use the Annotated version if possible.*
```Python
from fastapi import Cookie
```

**Python 3.8+ non-Annotated**
*Tip: Prefer to use the Annotated version if possible.*
```Python
from fastapi import Cookie
```

## Declare Cookie Parameters

Then declare the cookie parameters using the same structure as with Path and Query. You can define the default value as well as any extra validation or annotation parameters:

**Python 3.10+**
```Python
@app.get("/")
async def read_item(item: str = Cookie(...)):
    return {"item": item}
```

**Python 3.9+**
```Python
@app.get("/")
async def read_item(item: str = Cookie(...)):
    return {"item": item}
```

**Python 3.8+**
```Python
@app.get("/")
async def read_item(item: str = Cookie(...)):
    return {"item": item}
```

**Python 3.10+ non-Annotated**
*Tip: Prefer to use the Annotated version if possible.*
```Python
@app.get("/")
async def read_item(item: str = Cookie(...)):
    return {"item": item}
```

**Python 3.8+ non-Annotated**
*Tip: Prefer to use the Annotated version if possible.*
```Python
@app.get("/")
async def read_item(item: str = Cookie(...)):
    return {"item": item}
```

## Technical Details

Cookie is a "sister" class of Path and Query. It also inherits from the same common Param class. When you import Query, Path, Cookie, and others from fastapi, those are actually functions that return special classes.

## Info

To declare cookies, you need to use Cookie; otherwise, the parameters would be interpreted as query parameters.

## Recap

Declare cookies with Cookie, using the same common pattern as Query and Path.

# CORS (Cross-Origin Resource Sharing)

CORS refers to situations when a frontend running in a browser has JavaScript code that communicates with a backend in a different origin.

## Origin

An origin is the combination of protocol (http, https), domain (myapp.com, localhost, localhost.tiangolo.com), and port (80, 443, 8080). Examples of different origins include:

- http://localhost
- https://localhost
- http://localhost:8080

Even if they are all in localhost, they are different origins due to different protocols or ports.

## Steps

If a frontend is running at http://localhost:8080 and tries to communicate with a backend at http://localhost (default port 80), the browser sends an HTTP OPTIONS request to the backend. If the backend sends appropriate headers authorizing communication from http://localhost:8080, the frontend can proceed with its request.

The backend must have a list of allowed origins, which should include http://localhost:8080 for proper functionality.

## Wildcards

A wildcard "*" can be used to allow all origins, but this excludes credentials (Cookies, Authorization headers). It is better to specify allowed origins explicitly.

## Use CORSMiddleware

Configure CORSMiddleware in your FastAPI application by:

- Importing CORSMiddleware.
- Creating a list of allowed origins.
- Adding it as middleware to your FastAPI application.

You can specify whether your backend allows:

- Credentials (Authorization headers, Cookies).
- Specific HTTP methods (POST, PUT) or all with "*".
- Specific HTTP headers or all with "*".

The default parameters of CORSMiddleware are restrictive, requiring explicit enabling of origins, methods, or headers for cross-domain use.

### Supported Arguments

- `allow_origins`: List of permitted origins (e.g., ['https://example.org']). Use ['*'] to allow any origin.
- `allow_origin_regex`: Regex string to match against origins (e.g., 'https://.*\.example\.org').
- `allow_methods`: List of allowed HTTP methods for cross-origin requests (defaults to ['GET']). Use ['*'] to allow all methods.
- `allow_headers`: List of supported HTTP request headers (defaults to []). Use ['*'] to allow all headers. Accept, Accept-Language, Content-Language, and Content-Type are always allowed for simple CORS requests.
- `allow_credentials`: Indicates support for cookies in cross-origin requests (defaults to False). Cannot be set to ['*'] if credentials are allowed.
- `expose_headers`: Response headers accessible to the browser (defaults to []).
- `max_age`: Maximum time in seconds for browsers to cache CORS responses (defaults to 600).

### CORS Request Types

1. **CORS Preflight Requests**: OPTIONS requests with Origin and Access-Control-Request-Method headers. The middleware intercepts and responds with appropriate CORS headers and a 200 or 400 response.
   
2. **Simple Requests**: Requests with an Origin header. The middleware passes the request through normally but includes appropriate CORS headers in the response.

## More Info

For more information about CORS, refer to the Mozilla CORS documentation.

You can also use `from starlette.middleware.cors import CORSMiddleware`. FastAPI provides several middlewares in fastapi.middleware for developer convenience, but most come directly from Starlette.

# Debugging

You can connect the debugger in your editor, such as Visual Studio Code or PyCharm.

## Call `uvicorn`

In your FastAPI application, import and run `uvicorn` directly:

```Python
{!../../docs_src/debugging/tutorial001.py!}
```

### About `__name__ == "__main__"`

The purpose of `__name__ == "__main__"` is to execute code when your file is called directly, for example:

```console
$ python myapp.py
```

This code will not run if the file is imported, like in:

```Python
from myapp import app
```

#### More details

If your file is named `myapp.py` and you run it with:

```console
$ python myapp.py
```

the internal variable `__name__` will be `"__main__"`, allowing the line:

```Python
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

to execute.

If you import that module in another file, such as `importer.py`:

```Python
from myapp import app

# Some more code
```

the variable `__name__` will not be `"__main__"`, and the line:

```Python
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

will not execute.

For more information, check the official Python docs on `__main__`.

## Run your code with your debugger

You can run the Uvicorn server directly from your code using the debugger.

In Visual Studio Code:

- Go to the "Debug" panel.
- Select "Add configuration...".
- Choose "Python".
- Run the debugger with the option "Python: Current File (Integrated Terminal)".

In PyCharm:

- Open the "Run" menu.
- Select "Debug...".
- Choose the file to debug (e.g., `main.py`).

The server will start with your FastAPI code, stopping at your breakpoints.

# Classes as Dependencies

Before diving deeper into the Dependency Injection system, let's upgrade the previous example.

## A `dict` from the previous example

In the previous example, we were returning a `dict` from our dependency ("dependable"):

```Python
# Python 3.10+
{!> ../../docs_src/dependencies/tutorial001_an_py310.py!}

# Python 3.9+
{!> ../../docs_src/dependencies/tutorial001_an_py39.py!}

# Python 3.8+
{!> ../../docs_src/dependencies/tutorial001_an.py!}

# Python 3.10+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/dependencies/tutorial001_py310.py!}

# Python 3.8+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/dependencies/tutorial001.py!}
```

But then we get a `dict` in the parameter `commons` of the path operation function. Editors can't provide a lot of support (like completion) for `dict`s, because they can't know their keys and value types. We can do better...

## What makes a dependency

Dependencies can be declared as functions or other callables. A "callable" in Python is anything that can be executed like a function.

For example:

```Python
class Cat:
    def __init__(self, name: str):
        self.name = name

fluffy = Cat(name="Mr Fluffy")
```

In this case, `fluffy` is an instance of the class `Cat`, and to create `fluffy`, you are "calling" `Cat`. Thus, a Python class is also a callable.

In FastAPI, you can use a Python class as a dependency. FastAPI checks if it is a callable and analyzes the parameters for that callable, processing them similarly to the parameters for a path operation function, including sub-dependencies.

We can change the dependency "dependable" `common_parameters` to the class `CommonQueryParams`:

```Python
# Python 3.10+
{!> ../../docs_src/dependencies/tutorial002_an_py310.py!}

# Python 3.9+
{!> ../../docs_src/dependencies/tutorial002_an_py39.py!}

# Python 3.8+
{!> ../../docs_src/dependencies/tutorial002_an.py!}

# Python 3.10+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/dependencies/tutorial002_py310.py!}

# Python 3.8+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/dependencies/tutorial002.py!}
```

Pay attention to the `__init__` method used to create the instance of the class:

```Python
# Python 3.10+
{!> ../../docs_src/dependencies/tutorial002_an_py310.py!}

# Python 3.9+
{!> ../../docs_src/dependencies/tutorial002_an_py39.py!}

# Python 3.8+
{!> ../../docs_src/dependencies/tutorial002_an.py!}

# Python 3.10+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/dependencies/tutorial002_py310.py!}

# Python 3.8+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/dependencies/tutorial002.py!}
```

It has the same parameters as our previous `common_parameters`:

```Python
# Python 3.10+
{!> ../../docs_src/dependencies/tutorial001_an_py310.py!}

# Python 3.9+
{!> ../../docs_src/dependencies/tutorial001_an_py39.py!}

# Python 3.8+
{!> ../../docs_src/dependencies/tutorial001_an.py!}

# Python 3.10+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/dependencies/tutorial001_py310.py!}

# Python 3.8+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/dependencies/tutorial001.py!}
```

Those parameters are what FastAPI will use to "solve" the dependency. In both cases, it will have:

- An optional `q` query parameter that is a `str`.
- A `skip` query parameter that is an `int`, with a default of `0`.
- A `limit` query parameter that is an `int`, with a default of `100`.

In both cases, the data will be converted, validated, documented on the OpenAPI schema, etc.

## Use it

Now you can declare your dependency using this class:

```Python
# Python 3.10+
{!> ../../docs_src/dependencies/tutorial002_an_py310.py!}

# Python 3.9+
{!> ../../docs_src/dependencies/tutorial002_an_py39.py!}

# Python 3.8+
{!> ../../docs_src/dependencies/tutorial002_an.py!}

# Python 3.10+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/dependencies/tutorial002_py310.py!}

# Python 3.8+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/dependencies/tutorial002.py!}
```

FastAPI calls the `CommonQueryParams` class, creating an instance that will be passed as the parameter `commons` to your function.

## Type annotation vs `Depends`

Notice how we write `CommonQueryParams` twice in the above code:

```Python
commons: Annotated[CommonQueryParams, Depends(CommonQueryParams)]
```

```Python
commons: CommonQueryParams = Depends(CommonQueryParams)
```

The last `CommonQueryParams` in `Depends(CommonQueryParams)` is what FastAPI will use to know what the dependency is. It extracts the declared parameters and calls it.

The first `CommonQueryParams` in `commons: Annotated[CommonQueryParams, ...` does not have any special meaning for FastAPI. You could write:

```Python
commons: Annotated[Any, Depends(CommonQueryParams)]
```

```Python
commons = Depends(CommonQueryParams)
```

As in:

```Python
# Python 3.10+
{!> ../../docs_src/dependencies/tutorial003_an_py310.py!}

# Python 3.9+
{!> ../../docs_src/dependencies/tutorial003_an_py39.py!}

# Python 3.8+
{!> ../../docs_src/dependencies/tutorial003_an.py!}

# Python 3.10+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/dependencies/tutorial003_py310.py!}

# Python 3.8+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/dependencies/tutorial003.py!}
```

Declaring the type is encouraged for editor support with code completion and type checks.

## Shortcut

To avoid code repetition, FastAPI provides a shortcut for cases where the dependency is specifically a class that FastAPI will call to create an instance of the class itself.

Instead of writing:

```Python
commons: Annotated[CommonQueryParams, Depends(CommonQueryParams)]
```

```Python
commons: CommonQueryParams = Depends(CommonQueryParams)
```

You can write:

```Python
commons: Annotated[CommonQueryParams, Depends()]
```

```Python
commons: CommonQueryParams = Depends()
```

The same example would then look like:

```Python
# Python 3.10+
{!> ../../docs_src/dependencies/tutorial004_an_py310.py!}

# Python 3.9+
{!> ../../docs_src/dependencies/tutorial004_an_py39.py!}

# Python 3.8+
{!> ../../docs_src/dependencies/tutorial004_an.py!}

# Python 3.10+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/dependencies/tutorial004_py310.py!}

# Python 3.8+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/dependencies/tutorial004.py!}
```

FastAPI will know what to do. If that seems more confusing than helpful, disregard it; you don't need it. It is just a shortcut to minimize code repetition.

# Dependencies in Path Operation Decorators

In some cases, you may not need the return value of a dependency inside your path operation function, or the dependency may not return a value. However, you still need it to be executed. Instead of declaring a path operation function parameter with `Depends`, you can add a list of `dependencies` to the path operation decorator.

## Add Dependencies to the Path Operation Decorator

The path operation decorator receives an optional argument `dependencies`, which should be a list of `Depends()`.

### Python 3.9+

```Python
{!> ../../docs_src/dependencies/tutorial006_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/dependencies/tutorial006_an.py!}
```

### Python 3.8 Non-Annotated

**Tip:** Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/dependencies/tutorial006.py!}
```

These dependencies will be executed the same way as normal dependencies, but their value (if they return any) won't be passed to your path operation function.

**Tip:** Some editors check for unused function parameters and show them as errors. Using these dependencies in the path operation decorator ensures they are executed while avoiding editor/tooling errors. This can also help prevent confusion for new developers who might see an unused parameter and think it's unnecessary.

**Info:** In this example, we use invented custom headers `X-Key` and `X-Token`. In real cases, when implementing security, you would benefit more from using the integrated Security utilities.

## Dependencies Errors and Return Values

You can use the same dependency functions you normally use.

### Dependency Requirements

Dependencies can declare request requirements (like headers) or other sub-dependencies.

### Python 3.9+

```Python
{!> ../../docs_src/dependencies/tutorial006_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/dependencies/tutorial006_an.py!}
```

### Python 3.8 Non-Annotated

**Tip:** Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/dependencies/tutorial006.py!}
```

### Raise Exceptions

These dependencies can raise exceptions, just like normal dependencies.

### Python 3.9+

```Python
{!> ../../docs_src/dependencies/tutorial006_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/dependencies/tutorial006_an.py!}
```

### Python 3.8 Non-Annotated

**Tip:** Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/dependencies/tutorial006.py!}
```

### Return Values

Dependencies can return values or not; the values won't be used. You can reuse a normal dependency (that returns a value) you already use elsewhere, and even though the value won't be used, the dependency will be executed.

### Python 3.9+

```Python
{!> ../../docs_src/dependencies/tutorial006_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/dependencies/tutorial006_an.py!}
```

### Python 3.8 Non-Annotated

**Tip:** Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/dependencies/tutorial006.py!}
```

## Dependencies for a Group of Path Operations

Later, when reading about how to structure bigger applications, possibly with multiple files, you will learn how to declare a single `dependencies` parameter for a group of path operations.

## Global Dependencies

Next, we will see how to add dependencies to the whole FastAPI application, so that they apply to each path operation.

# Dependencies with Yield

FastAPI supports dependencies that perform additional steps after finishing. To implement this, use `yield` instead of `return`, placing the extra steps after the `yield`.

**Tip:** Use `yield` only once per dependency.

**Technical Details:**
Any function valid for `@contextlib.contextmanager` or `@contextlib.asynccontextmanager` can be used as a FastAPI dependency. FastAPI utilizes these decorators internally.

## A Database Dependency with Yield

You can create a database session and close it after finishing. Only the code before and including the `yield` statement executes before creating a response. The yielded value is injected into path operations and other dependencies, while the code after the `yield` executes after the response is delivered.

**Tip:** You can use `async` or regular functions; FastAPI handles both correctly.

## A Dependency with Yield and Try

Using a `try` block in a dependency with `yield` allows you to catch exceptions thrown during its use. You can handle specific exceptions with `except SomeException`. Use `finally` to ensure exit steps execute regardless of exceptions.

## Sub-dependencies with Yield

You can create sub-dependencies of any size, all capable of using `yield`. FastAPI ensures the exit code in each dependency with `yield` runs in the correct order. Dependencies can depend on one another, and you can mix dependencies that use `yield` and those that use `return`.

**Technical Details:** This functionality relies on Python's Context Managers, which FastAPI uses internally.

## Dependencies with Yield and HTTPException

You can raise an `HTTPException` in the exit code after the `yield`. This technique is advanced and typically unnecessary, as exceptions can be raised in the application code.

## Dependencies with Yield and Except

If you catch an exception in a dependency with `yield` and do not raise it again, FastAPI will not recognize the exception, leading to an HTTP 500 Internal Server Error without logs.

### Always Raise in Dependencies with Yield and Except

If you catch an exception, you should re-raise the original exception unless raising another `HTTPException`. This ensures the server logs the error.

## Execution of Dependencies with Yield

The execution sequence involves the client starting a request, running code up to `yield`, and handling exceptions as they arise. Only one response is sent to the client, which cannot be changed afterward.

**Tip:** This diagram illustrates the flow of exceptions, including `HTTPException`, through dependencies with `yield`.

## Dependencies with Yield, HTTPException, Except, and Background Tasks

**Warning:** This section contains technical details primarily relevant for users of FastAPI versions prior to 0.106.0.

### Dependencies with Yield and Except, Technical Details

In versions before FastAPI 0.110.0, unhandled exceptions captured in dependencies with `yield` would be forwarded to exception handlers. This behavior changed to prevent unhandled memory consumption.

### Background Tasks and Dependencies with Yield, Technical Details

Before FastAPI 0.106.0, raising exceptions after `yield` was not possible. This was changed to allow better resource management, encouraging the creation of resources for background tasks within the tasks themselves.

## Context Managers

### What are Context Managers

Context Managers are Python objects used in a `with` statement, ensuring resources are properly managed. For example, using `with open(...)` ensures files are closed after use.

### Using Context Managers in Dependencies with Yield

**Warning:** This is an advanced concept. Beginners may want to skip it.

You can create Context Managers by defining a class with `__enter__()` and `__exit__()` methods. You can also use `with` or `async with` statements inside FastAPI dependencies with `yield`.

**Tip:** FastAPI internally uses `@contextlib.contextmanager` and `@contextlib.asynccontextmanager` for dependencies with `yield`, but you do not need to use these decorators in your FastAPI dependencies.

# Global Dependencies

For certain applications, you may want to add dependencies to the entire application. Similar to adding `dependencies` to path operation decorators, you can add them to the `FastAPI` application. In this case, they will be applied to all path operations in the application.

## Code Examples

### Python 3.9+

```Python
{!> ../../docs_src/dependencies/tutorial012_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/dependencies/tutorial012_an.py!}
```

### Python 3.8 Non-Annotated

**Tip:** Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/dependencies/tutorial012.py!}
```

The concepts from the section on adding `dependencies` to path operation decorators still apply, but in this case, they affect all path operations in the app.

## Dependencies for Groups of Path Operations

When structuring larger applications, you will learn how to declare a single `dependencies` parameter for a group of path operations.

# Dependencies

**FastAPI** features a powerful and intuitive **Dependency Injection** system, designed for easy integration of components.

## What is "Dependency Injection"

"Dependency Injection" allows your code (specifically, your *path operation functions*) to declare required dependencies. **FastAPI** manages the provision of these dependencies, which is useful for:

- Shared logic
- Database connections
- Security and authentication
- Minimizing code repetition

## First Steps

### Create a Dependency

A dependency is a function that accepts parameters similar to a *path operation function*.

```Python
# Example for Python 3.10+
def common_parameters(q: str = None, skip: int = 0, limit: int = 100):
    return {"q": q, "skip": skip, "limit": limit}
```

This dependency expects:
- An optional query parameter `q` (type `str`)
- An optional query parameter `skip` (type `int`, default `0`)
- An optional query parameter `limit` (type `int`, default `100`)

It returns a `dict` with these values.

**Note:** FastAPI added support for `Annotated` in version 0.95.0. Upgrade to at least 0.95.1 to use `Annotated`.

### Import `Depends`

```Python
from fastapi import Depends
```

### Declare the Dependency

Use `Depends` in your *path operation function* parameters:

```Python
@app.get("/items/")
async def read_items(commons: dict = Depends(common_parameters)):
    return commons
```

**FastAPI** will:
- Call the dependency function with the correct parameters
- Assign the result to the parameter in your *path operation function*

## Share `Annotated` Dependencies

To reduce code duplication, you can store `Annotated` values in a variable:

```Python
from fastapi import Depends
from typing import Annotated

Commons = Annotated[dict, Depends(common_parameters)]
```

This preserves type information for autocompletion and inline errors.

## To `async` or Not to `async`

You can define dependencies using either `async def` or `def`. **FastAPI** handles both seamlessly.

## Integrated with OpenAPI

All request declarations, validations, and requirements of your dependencies are integrated into the OpenAPI schema, enhancing interactive documentation.

## Simple Usage

*Path operation functions* are called by **FastAPI** when a matching path and operation occur. With Dependency Injection, you can specify additional dependencies that **FastAPI** will execute before your function.

## **FastAPI** Plug-ins

Integrations can be built using the Dependency Injection system, allowing for numerous interactions with minimal code.

## **FastAPI** Compatibility

The simplicity of the dependency injection system ensures compatibility with:
- Relational databases
- NoSQL databases
- External packages and APIs
- Authentication and authorization systems
- Monitoring systems
- Response data injection systems

## Simple and Powerful

The hierarchical dependency injection system is simple yet powerful, allowing for dependencies to define their own dependencies. **FastAPI** resolves all dependencies and sub-dependencies automatically.

For example, different permission requirements can be added to various API endpoints using dependencies:

```mermaid
graph TB

current_user(["current_user"])
active_user(["active_user"])
admin_user(["admin_user"])
paying_user(["paying_user"])

public["/items/public/"]
private["/items/private/"]
activate_user["/users/{user_id}/activate"]
pro_items["/items/pro/"]

current_user --> active_user
active_user --> admin_user
active_user --> paying_user

current_user --> public
active_user --> private
admin_user --> activate_user
paying_user --> pro_items
```

## Integrated with **OpenAPI**

Dependencies add parameters and validations to your *path operations*, which **FastAPI** incorporates into the OpenAPI schema for interactive documentation.

# Sub-dependencies

You can create dependencies that have sub-dependencies, which can be as deep as needed. FastAPI will handle resolving them.

## First Dependency: "dependable"

You can create a first dependency ("dependable") as follows:

**Python 3.10+**
```Python
{!> ../../docs_src/dependencies/tutorial005_an_py310.py!}
```

**Python 3.9+**
```Python
{!> ../../docs_src/dependencies/tutorial005_an_py39.py!}
```

**Python 3.8+**
```Python
{!> ../../docs_src/dependencies/tutorial005_an.py!}
```

**Python 3.10 non-Annotated**
> Prefer to use the `Annotated` version if possible.
```Python
{!> ../../docs_src/dependencies/tutorial005_py310.py!}
```

**Python 3.8 non-Annotated**
> Prefer to use the `Annotated` version if possible.
```Python
{!> ../../docs_src/dependencies/tutorial005.py!}
```

This dependency declares an optional query parameter `q` as a `str` and returns it. This example is simple but illustrates how sub-dependencies work.

## Second Dependency: "dependable" and "dependant"

You can create another dependency function (a "dependable") that also declares its own dependency (making it a "dependant"):

**Python 3.10+**
```Python
{!> ../../docs_src/dependencies/tutorial005_an_py310.py!}
```

**Python 3.9+**
```Python
{!> ../../docs_src/dependencies/tutorial005_an_py39.py!}
```

**Python 3.8+**
```Python
{!> ../../docs_src/dependencies/tutorial005_an.py!}
```

**Python 3.10 non-Annotated**
> Prefer to use the `Annotated` version if possible.
```Python
{!> ../../docs_src/dependencies/tutorial005_py310.py!}
```

**Python 3.8 non-Annotated**
> Prefer to use the `Annotated` version if possible.
```Python
{!> ../../docs_src/dependencies/tutorial005.py!}
```

Parameters declared:
- This function is a dependency ("dependable") and also declares another dependency, depending on `query_extractor` and assigning its value to `q`.
- It declares an optional `last_query` cookie as a `str`. If no query `q` is provided, it uses the last query saved in a cookie.

## Use the Dependency

You can use the dependency as follows:

**Python 3.10+**
```Python
{!> ../../docs_src/dependencies/tutorial005_an_py310.py!}
```

**Python 3.9+**
```Python
{!> ../../docs_src/dependencies/tutorial005_an_py39.py!}
```

**Python 3.8+**
```Python
{!> ../../docs_src/dependencies/tutorial005_an.py!}
```

**Python 3.10 non-Annotated**
> Prefer to use the `Annotated` version if possible.
```Python
{!> ../../docs_src/dependencies/tutorial005_py310.py!}
```

**Python 3.8 non-Annotated**
> Prefer to use the `Annotated` version if possible.
```Python
{!> ../../docs_src/dependencies/tutorial005.py!}
```

Notice that only one dependency is declared in the path operation function, `query_or_cookie_extractor`. FastAPI will resolve `query_extractor` first and pass its results to `query_or_cookie_extractor`.

```mermaid
graph TB
query_extractor(["query_extractor"])
query_or_cookie_extractor(["query_or_cookie_extractor"])
read_query["/items/"]
query_extractor --> query_or_cookie_extractor --> read_query
```

## Using the Same Dependency Multiple Times

If a dependency is declared multiple times for the same path operation, FastAPI will call that sub-dependency only once per request. It will cache the returned value and pass it to all dependants needing it in that request. 

To call the dependency at every step in the same request instead of using the cached value, set `use_cache=False` when using `Depends`:

**Python 3.8+**
```Python
async def needy_dependency(fresh_value: Annotated[str, Depends(get_value, use_cache=False)]):
    return {"fresh_value": fresh_value}
```

**Python 3.8+ non-Annotated**
> Prefer to use the `Annotated` version if possible.
```Python
async def needy_dependency(fresh_value: str = Depends(get_value, use_cache=False)):
    return {"fresh_value": fresh_value}
```

## Recap

The Dependency Injection system is simple, consisting of functions similar to path operation functions. It allows for arbitrarily deeply nested dependency graphs. 

This may seem less useful with simple examples, but its utility will become apparent in chapters about security and the code it can save.

# JSON Compatible Encoder

In certain situations, you may need to convert a data type (such as a Pydantic model) into a format compatible with JSON (like a `dict`, `list`, etc.), especially for storage in a database.

**FastAPI** provides the `jsonable_encoder()` function for this purpose.

## Using the `jsonable_encoder`

Consider a database `fake_db` that only accepts JSON-compatible data. For instance, it does not accept `datetime` objects, which must be converted to a `str` in ISO format.

Similarly, the database cannot accept a Pydantic model (an object with attributes) but only a `dict`. The `jsonable_encoder` function facilitates this conversion.

It takes an object, such as a Pydantic model, and returns a JSON-compatible version:

```Python
# Python 3.10+
{!> ../../docs_src/encoder/tutorial001_py310.py!}
```

```Python
# Python 3.8+
{!> ../../docs_src/encoder/tutorial001.py!}
```

In this example, `jsonable_encoder` converts the Pydantic model to a `dict` and the `datetime` to a `str`. The output can be encoded using the Python standard `json.dumps()`.

The function does not return a large `str` containing JSON data; instead, it returns a standard Python data structure (e.g., a `dict`) with values and sub-values that are all JSON-compatible.

Note: `jsonable_encoder` is used internally by **FastAPI** to convert data but is also useful in various other scenarios.

# Extra Data Types

You can use complex data types in addition to common ones like `int`, `float`, `str`, and `bool`. Features include:

- Great editor support
- Data conversion from incoming requests
- Data conversion for response data
- Data validation
- Automatic annotation and documentation

## Other Data Types

Additional data types include:

- **UUID**: A standard "Universally Unique Identifier". Represented as a `str` in requests and responses.
  
- **datetime.datetime**: A Python `datetime.datetime`. Represented as a `str` in ISO 8601 format (e.g., `2008-09-15T15:53:00+05:00`).
  
- **datetime.date**: A Python `datetime.date`. Represented as a `str` in ISO 8601 format (e.g., `2008-09-15`).
  
- **datetime.time**: A Python `datetime.time`. Represented as a `str` in ISO 8601 format (e.g., `14:23:55.003`).
  
- **datetime.timedelta**: A Python `datetime.timedelta`. Represented as a `float` of total seconds. Can also be represented as "ISO 8601 time diff encoding".
  
- **frozenset**: Treated as a `set` in requests and responses. In requests, a list is read, duplicates are eliminated, and it is converted to a `set`. In responses, the `set` is converted to a `list`. The schema specifies unique values using JSON Schema's `uniqueItems`.
  
- **bytes**: Standard Python `bytes`. Treated as `str` in requests and responses. The schema specifies it as a `str` with `binary` format.
  
- **Decimal**: Standard Python `Decimal`. Handled the same as a `float` in requests and responses.

## Example

Example path operation with parameters using some of the above types:

```Python
# Python 3.10+
{!> ../../docs_src/extra_data_types/tutorial001_an_py310.py!}
```

```Python
# Python 3.9+
{!> ../../docs_src/extra_data_types/tutorial001_an_py39.py!}
```

```Python
# Python 3.8+
{!> ../../docs_src/extra_data_types/tutorial001_an.py!}
```

```Python
# Python 3.10+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/extra_data_types/tutorial001_py310.py!}
```

```Python
# Python 3.8+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/extra_data_types/tutorial001.py!}
```

Parameters inside the function have their natural data type, allowing for normal date manipulations:

```Python
# Python 3.10+
{!> ../../docs_src/extra_data_types/tutorial001_an_py310.py!}
```

```Python
# Python 3.9+
{!> ../../docs_src/extra_data_types/tutorial001_an_py39.py!}
```

```Python
# Python 3.8+
{!> ../../docs_src/extra_data_types/tutorial001_an.py!}
```

```Python
# Python 3.10+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/extra_data_types/tutorial001_py310.py!}
```

```Python
# Python 3.8+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/extra_data_types/tutorial001.py!}
```

# Extra Models

It is common to have multiple related models, especially for user models:

- The **input model** requires a password.
- The **output model** should exclude the password.
- The **database model** typically needs a hashed password.

**Warning:** Never store plaintext passwords. Always store a "secure hash" for verification.

## Multiple Models

Here’s a general idea of how the models could look with their password fields:

**Python 3.10+ Example:**
```Python
{!> ../../docs_src/extra_models/tutorial001_py310.py!}
```

**Python 3.8+ Example:**
```Python
{!> ../../docs_src/extra_models/tutorial001.py!}
```

**Note:** In Pydantic v1, the method was called `.dict()`, which is deprecated in Pydantic v2 and renamed to `.model_dump()`. Use `.model_dump()` if using Pydantic v2.

### About `**user_in.dict()`

`user_in` is a Pydantic model of class `UserIn`. Pydantic models have a `.dict()` method that returns a `dict` with the model's data.

Example:
```Python
user_in = UserIn(username="john", password="secret", email="john.doe@example.com")
user_dict = user_in.dict()
```

Output:
```Python
{
    'username': 'john',
    'password': 'secret',
    'email': 'john.doe@example.com',
    'full_name': None,
}
```

**Unwrapping a `dict`:**
Passing `user_dict` to a function with `**user_dict` unwraps it into key-value arguments:
```Python
UserInDB(**user_dict)
```

**Creating a Pydantic model from another:**
```Python
user_dict = user_in.dict()
UserInDB(**user_dict)
```

**Adding extra keyword arguments:**
```Python
UserInDB(**user_in.dict(), hashed_password=hashed_password)
```

**Warning:** The supporting functions `fake_password_hasher` and `fake_save_user` are for demonstration only and do not provide real security.

## Reduce Duplication

Reducing code duplication is essential in FastAPI to minimize bugs and security issues. Models can share data and attribute names by declaring a `UserBase` model as a base for other models.

**Python 3.10+ Example:**
```Python
{!> ../../docs_src/extra_models/tutorial002_py310.py!}
```

**Python 3.8+ Example:**
```Python
{!> ../../docs_src/extra_models/tutorial002.py!}
```

## `Union` or `anyOf`

You can declare a response as the `Union` of two or more types, defined in OpenAPI with `anyOf`. Use `typing.Union`:

**Note:** Include the most specific type first in `Union`.

**Python 3.10+ Example:**
```Python
{!> ../../docs_src/extra_models/tutorial003_py310.py!}
```

**Python 3.8+ Example:**
```Python
{!> ../../docs_src/extra_models/tutorial003.py!}
```

### `Union` in Python 3.10

When passing `Union[PlaneItem, CarItem]` as an argument value, use `Union` instead of the vertical bar for type annotations.

## List of Models

Declare responses of lists of objects using `typing.List` (or `list` in Python 3.9+):

**Python 3.9+ Example:**
```Python
{!> ../../docs_src/extra_models/tutorial004_py39.py!}
```

**Python 3.8+ Example:**
```Python
{!> ../../docs_src/extra_models/tutorial004.py!}
```

## Response with Arbitrary `dict`

Declare a response using a plain arbitrary `dict` with `typing.Dict` (or `dict` in Python 3.9+):

**Python 3.9+ Example:**
```Python
{!> ../../docs_src/extra_models/tutorial005_py39.py!}
```

**Python 3.8+ Example:**
```Python
{!> ../../docs_src/extra_models/tutorial005.py!}
```

## Recap

Utilize multiple Pydantic models and inheritance for different states of an entity, such as a user with variations including `password`, `password_hash`, and no password.

# First Steps

The simplest FastAPI file could look like this:

Copy that to a file `main.py`.

Run the live server:

```console
$ fastapi dev main.py
INFO    Using path main.py
INFO    Resolved absolute path /home/user/code/awesomeapp/main.py
INFO    Searching for package file structure from directories with __init__.py files
INFO    Importing from /home/user/code/awesomeapp

 ╭─ Python module file ─╮
 │                      │
 │  🐍 main.py          │
 │                      │
 ╰──────────────────────╯

INFO    Importing module main
INFO    Found importable FastAPI app

 ╭─ Importable FastAPI app ─╮
 │                          │
 │  from main import app   │
 │                          │
 ╰──────────────────────────╯

INFO    Using import string main:app

╭────────── FastAPI CLI - Development mode ───────────╮
│                                                     │
│  Serving at: http://127.0.0.1:8000                  │
│                                                     │
│  API docs: http://127.0.0.1:8000/docs               │
│                                                     │
│  Running in development mode, for production use:   │
│                                                     │
│  fastapi run                                        │
│                                                     │
╰─────────────────────────────────────────────────────╯

INFO:     Will watch for changes in these directories: ['/home/user/code/awesomeapp']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [2265862] using WatchFiles
INFO:     Started server process [2265873]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

In the output, there's a line with something like:

```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

That line shows the URL where your app is being served on your local machine.

### Check it

Open your browser at http://127.0.0.1:8000.

You will see the JSON response as:

```JSON
{"message": "Hello World"}
```

### Interactive API docs

Now go to http://127.0.0.1:8000/docs.

You will see the automatic interactive API documentation (provided by Swagger UI).

### Alternative API docs

And now, go to http://127.0.0.1:8000/redoc.

You will see the alternative automatic documentation (provided by ReDoc).

### OpenAPI

**FastAPI** generates a "schema" with all your API using the **OpenAPI** standard for defining APIs.

#### "Schema"

A "schema" is a definition or description of something. Not the code that implements it, but just an abstract description.

#### API "schema"

In this case, OpenAPI is a specification that dictates how to define a schema of your API.

This schema definition includes your API paths, the possible parameters they take, etc.

#### Data "schema"

The term "schema" might also refer to the shape of some data, like a JSON content.

In that case, it would mean the JSON attributes and data types they have, etc.

#### OpenAPI and JSON Schema

OpenAPI defines an API schema for your API. And that schema includes definitions (or "schemas") of the data sent and received by your API using **JSON Schema**, the standard for JSON data schemas.

#### Check the `openapi.json`

If you are curious about how the raw OpenAPI schema looks like, FastAPI automatically generates a JSON (schema) with the descriptions of all your API.

You can see it directly at: http://127.0.0.1:8000/openapi.json.

It will show a JSON starting with something like:

```JSON
{
    "openapi": "3.1.0",
    "info": {
        "title": "FastAPI",
        "version": "0.1.0"
    },
    "paths": {
        "/items/": {
            "get": {
                "responses": {
                    "200": {
                        "description": "Successful Response",
                        "content": {
                            "application/json": {
...
```

#### What is OpenAPI for

The OpenAPI schema powers the two interactive documentation systems included.

There are dozens of alternatives, all based on OpenAPI. You could easily add any of those alternatives to your application built with **FastAPI**.

You could also use it to generate code automatically for clients that communicate with your API, such as frontend, mobile, or IoT applications.

## Recap, step by step

### Step 1: import `FastAPI`

`FastAPI` is a Python class that provides all the functionality for your API.

### Step 2: create a `FastAPI` "instance"

Here the `app` variable will be an "instance" of the class `FastAPI`. This will be the main point of interaction to create all your API.

### Step 3: create a *path operation*

#### Path

"Path" refers to the last part of the URL starting from the first `/`.

So, in a URL like:

```
https://example.com/items/foo
```

...the path would be:

```
/items/foo
```

A "path" is also commonly called an "endpoint" or a "route".

While building an API, the "path" is the main way to separate "concerns" and "resources".

#### Operation

"Operation" refers to one of the HTTP "methods":

* `POST`
* `GET`
* `PUT`
* `DELETE`
* `OPTIONS`
* `HEAD`
* `PATCH`
* `TRACE`

When building APIs, you normally use these specific HTTP methods to perform a specific action.

Normally you use:

* `POST`: to create data.
* `GET`: to read data.
* `PUT`: to update data.
* `DELETE`: to delete data.

In OpenAPI, each of the HTTP methods is called an "operation".

#### Define a *path operation decorator*

The `@app.get("/")` tells **FastAPI** that the function below is in charge of handling requests that go to:

* the path `/`
* using a `GET` operation

That `@something` syntax in Python is called a "decorator". A "decorator" takes the function below and does something with it.

In our case, this decorator tells **FastAPI** that the function below corresponds to the **path** `/` with an **operation** `get`.

You can also use the other operations:

* `@app.post()`
* `@app.put()`
* `@app.delete()`
* `@app.options()`
* `@app.head()`
* `@app.patch()`
* `@app.trace()`

You are free to use each operation (HTTP method) as you wish. **FastAPI** doesn't enforce any specific meaning.

### Step 4: define the **path operation function**

This is our "**path operation function**":

* **path**: is `/`.
* **operation**: is `get`.
* **function**: is the function below the "decorator" (below `@app.get("/")`).

This is a Python function. It will be called by **FastAPI** whenever it receives a request to the URL "`/`" using a `GET` operation.

### Step 5: return the content

You can return a `dict`, `list`, singular values as `str`, `int`, etc. You can also return Pydantic models. There are many other objects and models that will be automatically converted to JSON.

## Recap

* Import `FastAPI`.
* Create an `app` instance.
* Write a **path operation decorator** using decorators like `@app.get("/")`.
* Define a **path operation function**; for example, `def root(): ...`.
* Run the development server using the command `fastapi dev`.

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

# Header Parameter Models

To manage related **header parameters**, create a **Pydantic model**. This allows for **reusability** and the ability to declare validations and metadata for all parameters simultaneously.

**Note:** This feature is supported since FastAPI version `0.115.0`.

## Header Parameters with a Pydantic Model

Declare the **header parameters** in a **Pydantic model**, then declare the parameter as `Header`:

### Python 3.10+

```Python
{!> ../../docs_src/header_param_models/tutorial001_an_py310.py!}
```

### Python 3.9+

```Python
{!> ../../docs_src/header_param_models/tutorial001_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/header_param_models/tutorial001_an.py!}
```

### Python 3.10+ non-Annotated

**Tip:** Prefer using the `Annotated` version if possible.

```Python
{!> ../../docs_src/header_param_models/tutorial001_py310.py!}
```

### Python 3.9+ non-Annotated

**Tip:** Prefer using the `Annotated` version if possible.

```Python
{!> ../../docs_src/header_param_models/tutorial001_py39.py!}
```

### Python 3.8+ non-Annotated

**Tip:** Prefer using the `Annotated` version if possible.

```Python
{!> ../../docs_src/header_param_models/tutorial001_py310.py!}
```

**FastAPI** will **extract** data for each field from the **headers** in the request and provide the defined Pydantic model.

## Check the Docs

Required headers can be viewed in the docs UI at `/docs`.

## Forbid Extra Headers

To restrict the headers received, use Pydantic's model configuration to `forbid` any `extra` fields:

### Python 3.10+

```Python
{!> ../../docs_src/header_param_models/tutorial002_an_py310.py!}
```

### Python 3.9+

```Python
{!> ../../docs_src/header_param_models/tutorial002_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/header_param_models/tutorial002_an.py!}
```

### Python 3.10+ non-Annotated

**Tip:** Prefer using the `Annotated` version if possible.

```Python
{!> ../../docs_src/header_param_models/tutorial002_py310.py!}
```

### Python 3.9+ non-Annotated

**Tip:** Prefer using the `Annotated` version if possible.

```Python
{!> ../../docs_src/header_param_models/tutorial002_py39.py!}
```

### Python 3.8+ non-Annotated

**Tip:** Prefer using the `Annotated` version if possible.

```Python
{!> ../../docs_src/header_param_models/tutorial002.py!}
```

If a client sends **extra headers**, they will receive an **error** response. For example, if a `tool` header with a value of `plumbus` is sent, the response will indicate that the header parameter `tool` is not allowed:

```json
{
    "detail": [
        {
            "type": "extra_forbidden",
            "loc": ["header", "tool"],
            "msg": "Extra inputs are not permitted",
            "input": "plumbus"
        }
    ]
}
```

## Summary

Use **Pydantic models** to declare **headers** in **FastAPI**.

# Header Parameters

You can define Header parameters similarly to `Query`, `Path`, and `Cookie` parameters.

## Import `Header`

First, import `Header`:

**Python 3.10+**
```Python
from fastapi import Header
```

**Python 3.9+**
```Python
from fastapi import Header
```

**Python 3.8+**
```Python
from fastapi import Header
```

**Python 3.10+ non-Annotated**
*Tip: Prefer to use the `Annotated` version if possible.*

```Python
from fastapi import Header
```

**Python 3.8+ non-Annotated**
*Tip: Prefer to use the `Annotated` version if possible.*

```Python
from fastapi import Header
```

## Declare `Header` parameters

Declare the header parameters using the same structure as with `Path`, `Query`, and `Cookie`. You can define the default value and any extra validation or annotation parameters:

**Python 3.10+**
```Python
@api.get("/items/")
async def read_items(x_token: str = Header(...)):
```

**Python 3.9+**
```Python
@api.get("/items/")
async def read_items(x_token: str = Header(...)):
```

**Python 3.8+**
```Python
@api.get("/items/")
async def read_items(x_token: str = Header(...)):
```

**Python 3.10+ non-Annotated**
*Tip: Prefer to use the `Annotated` version if possible.*

```Python
@api.get("/items/")
async def read_items(x_token: str = Header(...)):
```

**Python 3.8+ non-Annotated**
*Tip: Prefer to use the `Annotated` version if possible.*

```Python
@api.get("/items/")
async def read_items(x_token: str = Header(...)):
```

## Technical Details

`Header` is a "sister" class of `Path`, `Query`, and `Cookie`, inheriting from the common `Param` class. When importing `Query`, `Path`, `Header`, and others from `fastapi`, they are functions returning special classes.

To declare headers, use `Header`; otherwise, parameters will be interpreted as query parameters.

## Automatic conversion

`Header` provides additional functionality. Standard headers are separated by a hyphen (`-`), but a variable like `user-agent` is invalid in Python. By default, `Header` converts parameter names from underscore (`_`) to hyphen (`-`). HTTP headers are case-insensitive, allowing you to declare them in snake_case.

To disable automatic conversion of underscores to hyphens, set the `convert_underscores` parameter of `Header` to `False`:

**Python 3.10+**
```Python
@api.get("/items/")
async def read_items(user_agent: str = Header(..., convert_underscores=False)):
```

**Python 3.9+**
```Python
@api.get("/items/")
async def read_items(user_agent: str = Header(..., convert_underscores=False)):
```

**Python 3.8+**
```Python
@api.get("/items/")
async def read_items(user_agent: str = Header(..., convert_underscores=False)):
```

**Python 3.10+ non-Annotated**
*Tip: Prefer to use the `Annotated` version if possible.*

```Python
@api.get("/items/")
async def read_items(user_agent: str = Header(..., convert_underscores=False)):
```

**Python 3.8+ non-Annotated**
*Tip: Prefer to use the `Annotated` version if possible.*

```Python
@api.get("/items/")
async def read_items(user_agent: str = Header(..., convert_underscores=False)):
```

*Warning: Before setting `convert_underscores` to `False`, note that some HTTP proxies and servers disallow headers with underscores.*

## Duplicate headers

You can receive duplicate headers, meaning the same header with multiple values. Define these cases using a list in the type declaration. You will receive all values from the duplicate header as a Python list.

For example, to declare a header `X-Token` that can appear multiple times:

**Python 3.10+**
```Python
@api.get("/items/")
async def read_items(x_token: list[str] = Header(...)):
```

**Python 3.9+**
```Python
@api.get("/items/")
async def read_items(x_token: list[str] = Header(...)):
```

**Python 3.8+**
```Python
@api.get("/items/")
async def read_items(x_token: list[str] = Header(...)):
```

**Python 3.10+ non-Annotated**
*Tip: Prefer to use the `Annotated` version if possible.*

```Python
@api.get("/items/")
async def read_items(x_token: list[str] = Header(...)):
```

**Python 3.9+ non-Annotated**
*Tip: Prefer to use the `Annotated` version if possible.*

```Python
@api.get("/items/")
async def read_items(x_token: list[str] = Header(...)):
```

**Python 3.8+ non-Annotated**
*Tip: Prefer to use the `Annotated` version if possible.*

```Python
@api.get("/items/")
async def read_items(x_token: list[str] = Header(...)):
```

If you send two HTTP headers like:

```
X-Token: foo
X-Token: bar
```

The response would be:

```JSON
{
    "X-Token values": [
        "bar",
        "foo"
    ]
}
```

## Recap

Declare headers with `Header`, using the same common pattern as `Query`, `Path`, and `Cookie`. FastAPI will handle the conversion of underscores in your variables.

# Tutorial - User Guide

This tutorial demonstrates how to use FastAPI with its features, step by step. Each section builds on the previous ones but is structured to allow direct access to specific topics for solving API needs. It serves as a future reference for your requirements.

## Run the Code

All code blocks can be copied and used directly as they are tested Python files. To run any example, copy the code to a file named `main.py`, and start FastAPI with:

```console
$ fastapi dev main.py
INFO    Using path main.py
INFO    Resolved absolute path /home/user/code/awesomeapp/main.py
INFO    Searching for package file structure from directories with __init__.py files
INFO    Importing from /home/user/code/awesomeapp

 ╭─ Python module file ─╮
 │                      │
 │  🐍 main.py          │
 │                      │
 ╰──────────────────────╯

INFO    Importing module main
INFO    Found importable FastAPI app

 ╭─ Importable FastAPI app ─╮
 │                          │
 │  from main import app   │
 │                          │
 ╰──────────────────────────╯

INFO    Using import string main:app

╭────────── FastAPI CLI - Development mode ───────────╮
│                                                     │
│  Serving at: http://127.0.0.1:8000                  │
│                                                     │
│  API docs: http://127.0.0.1:8000/docs               │
│                                                     │
│  Running in development mode, for production use:   │
│                                                     │
│  fastapi run                                        │
│                                                     │
╰─────────────────────────────────────────────────────╯

INFO:     Will watch for changes in these directories: ['/home/user/code/awesomeapp']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [2265862] using WatchFiles
INFO:     Started server process [2265873]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

It is highly encouraged to write or copy the code, edit it, and run it locally. Using it in your editor showcases the benefits of FastAPI, including minimal code, type checks, and autocompletion.

## Install FastAPI

The first step is to install FastAPI. Create a virtual environment, activate it, and then install FastAPI:

```console
$ pip install "fastapi[standard]"
```

When you install with `pip install "fastapi[standard]"`, it includes default optional standard dependencies. If you prefer not to have those optional dependencies, you can install it with `pip install fastapi`.

## Advanced User Guide

An **Advanced User Guide** is available for later reading. It builds on this tutorial, using the same concepts while teaching additional features. It is recommended to first complete the **Tutorial - User Guide** to build a complete application, then extend it using ideas from the **Advanced User Guide**.

# Metadata and Docs URLs

You can customize several metadata configurations in your FastAPI application.

## Metadata for API

You can set the following fields used in the OpenAPI specification and the automatic API docs UIs:

- **title**: `str` - The title of the API.
- **summary**: `str` - A short summary of the API. Available since OpenAPI 3.1.0, FastAPI 0.99.0.
- **description**: `str` - A short description of the API. It can use Markdown.
- **version**: `string` - The version of the API (e.g., `2.5.0`).
- **terms_of_service**: `str` - A URL to the Terms of Service for the API.
- **contact**: `dict` - Contact information for the API, containing:
  - **name**: `str` - The identifying name of the contact person/organization.
  - **url**: `str` - The URL pointing to the contact information.
  - **email**: `str` - The email address of the contact person/organization.
- **license_info**: `dict` - License information for the API, containing:
  - **name**: `str` - REQUIRED if license_info is set. The license name used for the API.
  - **identifier**: `str` - An SPDX license expression for the API. Mutually exclusive with the url field. Available since OpenAPI 3.1.0, FastAPI 0.99.0.
  - **url**: `str` - A URL to the license used for the API.

You can set them as follows:

```Python
{!../../docs_src/metadata/tutorial001.py!}
```

You can write Markdown in the description field, and it will be rendered in the output.

With this configuration, the automatic API docs would look like:

![API Docs Example](image01.png)

## License Identifier

Since OpenAPI 3.1.0 and FastAPI 0.99.0, you can set the license_info with an identifier instead of a URL.

Example:

```Python
{!../../docs_src/metadata/tutorial001_1.py!}
```

## Metadata for Tags

You can add additional metadata for the different tags used to group your path operations with the parameter openapi_tags. It takes a list containing one dictionary for each tag.

Each dictionary can contain:

- **name**: (required) `str` - The same tag name used in the tags parameter in your path operations and APIRouter.
- **description**: `str` - A short description for the tag. It can have Markdown.
- **externalDocs**: `dict` - Describing external documentation with:
  - **description**: `str` - A short description for the external docs.
  - **url**: (required) `str` - The URL for the external documentation.

### Create Metadata for Tags

Create metadata for your tags and pass it to the openapi_tags parameter:

```Python
{!../../docs_src/metadata/tutorial004.py!}
```

You can use Markdown inside of the descriptions.

You don't have to add metadata for all the tags that you use.

### Use Your Tags

Use the tags parameter with your path operations (and APIRouter) to assign them to different tags:

```Python
{!../../docs_src/metadata/tutorial004.py!}
```

### Check the Docs

Now, if you check the docs, they will show all the additional metadata:

![Tags Metadata Example](image02.png)

### Order of Tags

The order of each tag metadata dictionary defines the order shown in the docs UI.

## OpenAPI URL

By default, the OpenAPI schema is served at /openapi.json. You can configure it with the parameter openapi_url.

Example:

```Python
{!../../docs_src/metadata/tutorial002.py!}
```

To disable the OpenAPI schema completely, set openapi_url=None, which will also disable the documentation user interfaces that use it.

## Docs URLs

You can configure the two documentation user interfaces included:

- **Swagger UI**: served at /docs.
  - Set its URL with the parameter docs_url.
  - Disable it by setting docs_url=None.
- **ReDoc**: served at /redoc.
  - Set its URL with the parameter redoc_url.
  - Disable it by setting redoc_url=None.

Example:

```Python
{!../../docs_src/metadata/tutorial003.py!}
```

# Middleware

You can add middleware to FastAPI applications.

A "middleware" is a function that processes every request before it is handled by any specific path operation and every response before it is returned.

- It takes each request that comes to your application.
- It can modify the request or execute any necessary code.
- It passes the request to be processed by the rest of the application (by some path operation).
- It takes the response generated by the application.
- It can modify the response or execute any necessary code.
- It returns the response.

**Technical Details**: If you have dependencies with `yield`, the exit code will run after the middleware. Background tasks will run after all middleware.

## Create a Middleware

To create a middleware, use the decorator `@app.middleware("http")` on top of a function.

The middleware function receives:

- The `request`.
- A function `call_next` that receives the `request` as a parameter.
  - This function passes the request to the corresponding path operation.
  - It returns the response generated by the corresponding path operation.
- You can further modify the response before returning it.

```Python
{!../../docs_src/middleware/tutorial001.py!}
```

**Tip**: Custom proprietary headers can be added using the 'X-' prefix. If you want a client in a browser to see custom headers, add them to your CORS configurations using the parameter `expose_headers` documented in Starlette's CORS docs.

**Technical Details**: You could also use `from starlette.requests import Request`. FastAPI provides it as a convenience, but it comes directly from Starlette.

### Before and After the Response

You can run code with the request before any path operation receives it and after the response is generated, before returning it. For example, you could add a custom header `X-Process-Time` containing the time in seconds that it took to process the request and generate a response:

```Python
{!../../docs_src/middleware/tutorial001.py!}
```

**Tip**: Use `time.perf_counter()` instead of `time.time()` for more precise measurements.

## Other Middlewares

You can read more about other middlewares in the Advanced User Guide: Advanced Middleware. You will learn how to handle Cross-Origin Resource Sharing (CORS) with a middleware in the next section.

# Path Operation Configuration

You can configure your path operation decorator with several parameters.

## Response Status Code

Define the HTTP `status_code` for your path operation response. You can use an integer code, like `404`, or use shortcut constants from `status`.

```Python
from starlette import status
```

**FastAPI** provides `starlette.status` as `fastapi.status` for convenience.

## Tags

Add tags to your path operation by passing the `tags` parameter with a list of strings.

Tags will be included in the OpenAPI schema and used by automatic documentation interfaces.

### Tags with Enums

For larger applications, consider using an `Enum` to maintain consistent tags across related path operations.

```Python
from enum import Enum

class Tags(Enum):
    tag1 = "tag1"
    tag2 = "tag2"
```

## Summary and Description

You can add a `summary` and `description` to your path operation.

## Description from Docstring

For longer descriptions, use the function docstring. FastAPI will read the description from there, allowing Markdown formatting.

## Response Description

Specify the response description with the `response_description` parameter. 

Note that `response_description` refers specifically to the response, while `description` refers to the path operation in general. OpenAPI requires a response description; if not provided, FastAPI will generate a default one.

## Deprecate a Path Operation

To mark a path operation as deprecated without removing it, use the `deprecated` parameter. It will be clearly marked in the interactive documentation.

## Recap

Easily configure and add metadata to your path operations by passing parameters to the path operation decorators.

# Path Parameters and Numeric Validations

You can declare validations and metadata for path parameters using `Path`, similar to how you do for query parameters with `Query`.

## Import Path

Import `Path` from `fastapi`, and import `Annotated`:

```Python
from fastapi import Path
from typing import Annotated
```

## Declare Metadata

You can declare parameters for `Path` just like for `Query`. For example, to declare a `title` metadata value for the path parameter `item_id`:

```Python
item_id: int = Path(..., title="The ID of the item to retrieve")
```

A path parameter is always required as it must be part of the path.

## Order the Parameters as Needed

You can declare parameters in any order. For example, if you want to declare a required `str` query parameter `q` and a path parameter `item_id`:

```Python
def read_item(q: str, item_id: int = Path(...)):
    return {"item_id": item_id, "q": q}
```

If using `Annotated`, the order does not matter.

## Number Validations: Greater Than or Equal

You can declare number constraints with `ge` (greater than or equal):

```Python
item_id: int = Path(..., ge=1)
```

## Number Validations: Greater Than and Less Than or Equal

You can also use `gt` (greater than) and `le` (less than or equal):

```Python
item_id: int = Path(..., gt=1, le=10)
```

## Number Validations: Floats, Greater Than and Less Than

Number validations also apply to `float` values. For example, to require a value greater than `0`:

```Python
value: float = Path(..., gt=0)
```

## Recap

With `Query`, `Path`, and others, you can declare metadata and validations:

- `gt`: greater than
- `ge`: greater than or equal
- `lt`: less than
- `le`: less than or equal

`Query`, `Path`, and similar classes are functions that return instances of classes with the same name, allowing for better type handling in editors.

# Path Parameters

Path parameters can be declared using the syntax of Python format strings:

```Python
{!../../docs_src/path_params/tutorial001.py!}
```

The value of the path parameter `item_id` is passed to your function as the argument `item_id`. For example, accessing `/items/foo` will return:

```JSON
{"item_id":"foo"}
```

## Path Parameters with Types

You can specify the type of a path parameter using Python type annotations:

```Python
{!../../docs_src/path_params/tutorial002.py!}
```

In this case, `item_id` is declared as an `int`. Accessing `/items/3` will return:

```JSON
{"item_id":3}
```

The function receives the value as a Python `int`, not a string.

## Data Validation

Accessing `/items/foo` will result in an HTTP error:

```JSON
{
  "detail": [
    {
      "type": "int_parsing",
      "loc": [
        "path",
        "item_id"
      ],
      "msg": "Input should be a valid integer, unable to parse string as an integer",
      "input": "foo"
    }
  ]
}
```

This error occurs because `item_id` is not an `int`. The same error will appear for a `float` value.

## Documentation

Accessing `/docs` provides automatic, interactive API documentation, integrating Swagger UI.

## Standards-Based Benefits

The generated schema follows the OpenAPI standard, allowing for alternative API documentation via ReDoc at `/redoc`.

## Pydantic

Data validation is handled by Pydantic, allowing the use of type declarations with various data types.

## Order Matters

When defining path operations, ensure that specific paths are declared before more general ones to avoid conflicts:

```Python
{!../../docs_src/path_params/tutorial003.py!}
```

## Predefined Values

To restrict path parameter values, use a Python `Enum`:

### Create an Enum Class

Import `Enum` and create a subclass that inherits from `str` and `Enum`:

```Python
{!../../docs_src/path_params/tutorial005.py!}
```

### Declare a Path Parameter

Use the enum class for type annotation:

```Python
{!../../docs_src/path_params/tutorial005.py!}
```

### Working with Enumerations

You can compare and access the value of enumeration members:

```Python
{!../../docs_src/path_params/tutorial005.py!}
```

Return enum members from your path operation, which will be converted to their corresponding values in the response:

```JSON
{
  "model_name": "alexnet",
  "message": "Deep Learning FTW!"
}
```

## Path Parameters Containing Paths

For a path operation like `/files/{file_path}`, you can declare a path parameter to contain a path using:

```
/files/{file_path:path}
```

This allows for URLs like `/files/home/johndoe/myfile.txt`.

## Recap

Using FastAPI with standard Python type declarations provides:

* Editor support: error checks, autocompletion
* Data parsing
* Data validation
* API annotation and automatic documentation

This is a key advantage of FastAPI compared to other frameworks.

# Query Parameter Models

To manage related **query parameters**, create a **Pydantic model**. This allows for **reusability** and the ability to declare validations and metadata for all parameters simultaneously.

**Note:** This feature is supported since FastAPI version 0.115.0.

## Query Parameters with a Pydantic Model

Declare the **query parameters** in a **Pydantic model**, then use `Query` to declare the parameter.

### Python 3.10+

```Python
{!> ../../docs_src/query_param_models/tutorial001_an_py310.py!}
```

### Python 3.9+

```Python
{!> ../../docs_src/query_param_models/tutorial001_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/query_param_models/tutorial001_an.py!}
```

### Python 3.10+ non-Annotated

**Tip:** Prefer the `Annotated` version if possible.

```Python
{!> ../../docs_src/query_param_models/tutorial001_py310.py!}
```

### Python 3.9+ non-Annotated

**Tip:** Prefer the `Annotated` version if possible.

```Python
{!> ../../docs_src/query_param_models/tutorial001_py39.py!}
```

### Python 3.8+ non-Annotated

**Tip:** Prefer the `Annotated` version if possible.

```Python
{!> ../../docs_src/query_param_models/tutorial001_py310.py!}
```

**FastAPI** will extract data for each field from the **query parameters** in the request and provide the defined Pydantic model.

## Check the Docs

View the query parameters in the docs UI at `/docs`.

## Forbid Extra Query Parameters

To restrict the query parameters received, use Pydantic's model configuration to `forbid` any `extra` fields.

### Python 3.10+

```Python
{!> ../../docs_src/query_param_models/tutorial002_an_py310.py!}
```

### Python 3.9+

```Python
{!> ../../docs_src/query_param_models/tutorial002_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/query_param_models/tutorial002_an.py!}
```

### Python 3.10+ non-Annotated

**Tip:** Prefer the `Annotated` version if possible.

```Python
{!> ../../docs_src/query_param_models/tutorial002_py310.py!}
```

### Python 3.9+ non-Annotated

**Tip:** Prefer the `Annotated` version if possible.

```Python
{!> ../../docs_src/query_param_models/tutorial002_py39.py!}
```

### Python 3.8+ non-Annotated

**Tip:** Prefer the `Annotated` version if possible.

```Python
{!> ../../docs_src/query_param_models/tutorial002.py!}
```

If a client sends extra data in the **query parameters**, they will receive an **error** response. For example, if a client sends a `tool` query parameter with a value of `plumbus`:

```http
https://example.com/items/?limit=10&tool=plumbus
```

The response will indicate that the `tool` query parameter is not allowed:

```json
{
    "detail": [
        {
            "type": "extra_forbidden",
            "loc": ["query", "tool"],
            "msg": "Extra inputs are not permitted",
            "input": "plumbus"
        }
    ]
}
```

## Summary

Use **Pydantic models** to declare **query parameters** in **FastAPI**. 

**Tip:** Pydantic models can also be used to declare cookies and headers, which will be covered later in the tutorial.

# Query Parameters and String Validations

FastAPI allows you to declare additional information and validation for your parameters.

## Example Application

The query parameter `q` is of type `Union[str, None]` (or `str | None` in Python 3.10), meaning it can be a `str` or `None`, with a default value of `None`, indicating it's not required.

## Additional Validation

We will enforce that if `q` is provided, its length does not exceed 50 characters.

### Import `Query` and `Annotated`

Import:
- `Query` from `fastapi`
- `Annotated` from `typing` (or `typing_extensions` in Python below 3.9)

### Use `Annotated` in the Type for the `q` Parameter

Wrap the type annotation with `Annotated`:

```Python
q: Annotated[str | None] = None
```

or for Python 3.8:

```Python
q: Annotated[Union[str, None]] = None
```

### Add `Query` to `Annotated` in the `q` Parameter

Add `Query` inside `Annotated` and set `max_length` to `50`:

```Python
q: Annotated[str | None, Query(max_length=50)] = None
```

or for Python 3.8:

```Python
q: Annotated[Union[str, None], Query(max_length=50)] = None
```

FastAPI will validate the data, show a clear error for invalid data, and document the parameter in the OpenAPI schema.

## Alternative (Old): `Query` as the Default Value

In older versions of FastAPI, you would use `Query` as the default value:

```Python
q: Union[str, None] = Query(default=None, max_length=50)
```

or for Python 3.10:

```Python
q: str | None = Query(default=None, max_length=50)
```

## Add More Validations

You can also add a `min_length`:

```Python
q: Annotated[str | None, Query(min_length=3, max_length=50)] = None
```

or for Python 3.8:

```Python
q: Annotated[Union[str, None], Query(min_length=3, max_length=50)] = None
```

## Add Regular Expressions

Define a `pattern` that the parameter should match:

```Python
q: Annotated[str | None, Query(pattern="^fixedquery$")] = None
```

or for Python 3.8:

```Python
q: Annotated[Union[str, None], Query(pattern="^fixedquery$")] = None
```

## Default Values

You can use default values other than `None`:

```Python
q: Annotated[str, Query(min_length=3, default="fixedquery")] = "fixedquery"
```

or for Python 3.8:

```Python
q: Union[str, None] = Query(default="fixedquery", min_length=3)
```

## Required Parameters

To make `q` required, simply omit the default value:

```Python
q: Annotated[str, Query(min_length=3)]
```

or for Python 3.8:

```Python
q: Union[str, None] = Query(min_length=3)
```

### Required with Ellipsis (`...`)

You can explicitly declare that a value is required by setting the default to `...`:

```Python
q: Annotated[str, Query(...)]
```

or for Python 3.8:

```Python
q: Union[str, None] = Query(...)
```

## Query Parameter List / Multiple Values

To declare a query parameter that can appear multiple times:

```Python
q: Annotated[list[str], Query()]
```

or for Python 3.8:

```Python
q: list[str] = Query()
```

## Declare More Metadata

You can add more information about the parameter, such as `title` and `description`:

```Python
q: Annotated[str, Query(title="Query Parameter", description="This is a query parameter.")]
```

or for Python 3.8:

```Python
q: Union[str, None] = Query(title="Query Parameter", description="This is a query parameter.")
```

## Alias Parameters

To use an alias for a parameter:

```Python
q: Annotated[str, Query(alias="item-query")]
```

or for Python 3.8:

```Python
q: Union[str, None] = Query(alias="item-query")
```

## Deprecating Parameters

To mark a parameter as deprecated:

```Python
q: Annotated[str, Query(deprecated=True)]
```

or for Python 3.8:

```Python
q: Union[str, None] = Query(deprecated=True)
```

## Exclude Parameters from OpenAPI

To exclude a query parameter from the OpenAPI schema:

```Python
q: Annotated[str, Query(include_in_schema=False)]
```

or for Python 3.8:

```Python
q: Union[str, None] = Query(include_in_schema=False)
```

## Recap

You can declare additional validations and metadata for your parameters, including:
- Generic validations: `alias`, `title`, `description`, `deprecated`
- Validations specific for strings: `min_length`, `max_length`, `pattern`

# Query Parameters

When you declare function parameters that are not part of the path parameters, they are interpreted as query parameters.

The query consists of key-value pairs after the `?` in a URL, separated by `&`. For example, in the URL:

```
http://127.0.0.1:8000/items/?skip=0&limit=10
```

The query parameters are:

- `skip`: value `0`
- `limit`: value `10`

These parameters are strings by default but can be converted to specified Python types (e.g., `int`).

The same processes for path parameters apply to query parameters:

- Editor support
- Data parsing
- Data validation
- Automatic documentation

## Defaults

Query parameters can be optional and have default values. For example, `skip=0` and `limit=10` are defaults. Accessing:

```
http://127.0.0.1:8000/items/
```

is equivalent to:

```
http://127.0.0.1:8000/items/?skip=0&limit=10
```

If you access:

```
http://127.0.0.1:8000/items/?skip=20
```

The parameter values will be:

- `skip=20`
- `limit=10`

## Optional Parameters

You can declare optional query parameters by setting their default to `None`. 

In this case, the function parameter `q` will be optional and default to `None`.

FastAPI recognizes `item_id` as a path parameter and `q` as a query parameter.

## Query Parameter Type Conversion

You can declare `bool` types, which will be converted. For example, accessing:

```
http://127.0.0.1:8000/items/foo?short=1
```

or variations like `short=True`, `short=true`, `short=on`, or `short=yes` will result in `short` being `True`. Any other value will result in `False`.

## Multiple Path and Query Parameters

You can declare multiple path and query parameters simultaneously. FastAPI identifies them by name, and the order of declaration does not matter.

## Required Query Parameters

To make a query parameter required, do not declare a default value. For example:

```Python
needy: str
```

If you access:

```
http://127.0.0.1:8000/items/foo-item
```

without the required `needy` parameter, you will receive an error indicating that the field is required.

To successfully access the endpoint, include the required parameter:

```
http://127.0.0.1:8000/items/foo-item?needy=sooooneedy
```

This will return:

```JSON
{
    "item_id": "foo-item",
    "needy": "sooooneedy"
}
```

You can define parameters as required, with default values, or optional. 

In this case, there are three query parameters:

- `needy`: required `str`
- `skip`: optional `int` with a default value of `0`
- `limit`: optional `int`

You can also use `Enum`s similarly to path parameters.

# Request Files

You can define files to be uploaded by the client using `File`.

To receive uploaded files, first install `python-multipart`.

Make sure you create a virtual environment, activate it, and then install it, for example:

```
$ pip install python-multipart
```

This is because uploaded files are sent as "form data".

## Import `File`

Import `File` and `UploadFile` from `fastapi`:

### Python 3.9+

```Python
{!> ../../docs_src/request_files/tutorial001_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/request_files/tutorial001_an.py!}
```

### Python 3.8+ non-Annotated

Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/request_files/tutorial001.py!}
```

## Define `File` Parameters

Create file parameters the same way you would for `Body` or `Form`:

### Python 3.9+

```Python
{!> ../../docs_src/request_files/tutorial001_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/request_files/tutorial001_an.py!}
```

### Python 3.8+ non-Annotated

Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/request_files/tutorial001.py!}
```

`File` is a class that inherits directly from `Form`. When you import `Query`, `Path`, `File`, and others from `fastapi`, those are functions that return special classes.

To declare File bodies, you need to use `File`, otherwise the parameters would be interpreted as query parameters or body (JSON) parameters.

The files will be uploaded as "form data". If you declare the type of your path operation function parameter as `bytes`, FastAPI will read the file for you and you will receive the contents as `bytes`. This will work well for small files, but for larger files, you might benefit from using `UploadFile`.

## File Parameters with `UploadFile`

Define a file parameter with a type of `UploadFile`:

### Python 3.9+

```Python
{!> ../../docs_src/request_files/tutorial001_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/request_files/tutorial001_an.py!}
```

### Python 3.8+ non-Annotated

Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/request_files/tutorial001.py!}
```

Using `UploadFile` has several advantages over `bytes`:

- You don't have to use `File()` in the default value of the parameter.
- It uses a "spooled" file: a file stored in memory up to a maximum size limit, and after passing this limit, it will be stored on disk.
- This means it will work well for large files like images, videos, large binaries, etc., without consuming all the memory.
- You can get metadata from the uploaded file.
- It has a file-like `async` interface.
- It exposes a `SpooledTemporaryFile` object that you can pass directly to other libraries that expect a file-like object.

### `UploadFile` Attributes

- `filename`: A `str` with the original file name that was uploaded (e.g., `myimage.jpg`).
- `content_type`: A `str` with the content type (MIME type / media type) (e.g., `image/jpeg`).
- `file`: A `SpooledTemporaryFile` (a file-like object). This is the actual Python file object that you can pass directly to other functions or libraries that expect a "file-like" object.

`UploadFile` has the following `async` methods:

- `write(data)`: Writes `data` (`str` or `bytes`) to the file.
- `read(size)`: Reads `size` (`int`) bytes/characters of the file.
- `seek(offset)`: Goes to the byte position `offset` (`int`) in the file.
- `close()`: Closes the file.

As all these methods are `async`, you need to "await" them.

For example, inside of an `async` path operation function, you can get the contents with:

```Python
contents = await myfile.read()
```

If you are inside of a normal `def` path operation function, you can access the `UploadFile.file` directly:

```Python
contents = myfile.file.read()
```

## What is "Form Data"

HTML forms send data to the server using a special encoding, different from JSON. FastAPI will read that data from the right place instead of JSON.

Data from forms is normally encoded using the media type `application/x-www-form-urlencoded` when it doesn't include files. When the form includes files, it is encoded as `multipart/form-data`. If you use `File`, FastAPI will know it has to get the files from the correct part of the body.

You can declare multiple `File` and `Form` parameters in a path operation, but you can't declare `Body` fields that you expect to receive as JSON, as the request will have the body encoded using `multipart/form-data` instead of `application/json`.

## Optional File Upload

You can make a file optional by using standard type annotations and setting a default value of `None`:

### Python 3.10+

```Python
{!> ../../docs_src/request_files/tutorial001_02_an_py310.py!}
```

### Python 3.9+

```Python
{!> ../../docs_src/request_files/tutorial001_02_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/request_files/tutorial001_02_an.py!}
```

### Python 3.10+ non-Annotated

Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/request_files/tutorial001_02_py310.py!}
```

### Python 3.8+ non-Annotated

Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/request_files/tutorial001_02.py!}
```

## `UploadFile` with Additional Metadata

You can also use `File()` with `UploadFile` to set additional metadata:

### Python 3.9+

```Python
{!> ../../docs_src/request_files/tutorial001_03_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/request_files/tutorial001_03_an.py!}
```

### Python 3.8+ non-Annotated

Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/request_files/tutorial001_03.py!}
```

## Multiple File Uploads

You can upload several files at the same time, associated with the same "form field" sent using "form data". Declare a list of `bytes` or `UploadFile`:

### Python 3.9+

```Python
{!> ../../docs_src/request_files/tutorial002_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/request_files/tutorial002_an.py!}
```

### Python 3.9+ non-Annotated

Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/request_files/tutorial002_py39.py!}
```

### Python 3.8+ non-Annotated

Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/request_files/tutorial002.py!}
```

You will receive a list of `bytes` or `UploadFile`s.

### Multiple File Uploads with Additional Metadata

You can use `File()` to set additional parameters for `UploadFile`:

### Python 3.9+

```Python
{!> ../../docs_src/request_files/tutorial003_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/request_files/tutorial003_an.py!}
```

### Python 3.9+ non-Annotated

Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/request_files/tutorial003_py39.py!}
```

### Python 3.8+ non-Annotated

Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/request_files/tutorial003.py!}
```

## Recap

Use `File`, `bytes`, and `UploadFile` to declare files to be uploaded in the request, sent as form data.

# Form Models

You can use Pydantic models to declare form fields in FastAPI.

To use forms, first install `python-multipart`. Make sure you create a virtual environment, activate it, and then install it:

```
$ pip install python-multipart
```

This is supported since FastAPI version `0.113.0`.

## Pydantic Models for Forms

Declare a Pydantic model with the fields you want to receive as form fields, and then declare the parameter as `Form`:

### Python 3.9+

```Python
{!> ../../docs_src/request_form_models/tutorial001_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/request_form_models/tutorial001_an.py!}
```

### Python 3.8+ non-Annotated

Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/request_form_models/tutorial001.py!}
```

FastAPI will extract the data for each field from the form data in the request and provide the Pydantic model you defined.

## Check the Docs

You can verify it in the docs UI at `/docs`.

## Forbid Extra Form Fields

In some cases, you might want to restrict the form fields to only those declared in the Pydantic model and forbid any extra fields. This is supported since FastAPI version `0.114.0`.

You can use Pydantic's model configuration to forbid any extra fields:

### Python 3.9+

```Python
{!> ../../docs_src/request_form_models/tutorial002_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/request_form_models/tutorial002_an.py!}
```

### Python 3.8+ non-Annotated

Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/request_form_models/tutorial002.py!}
```

If a client tries to send extra data, they will receive an error response. For example, if the client sends:

- `username`: `Rick`
- `password`: `Portal Gun`
- `extra`: `Mr. Poopybutthole`

They will receive an error response indicating that the field `extra` is not allowed:

```json
{
    "detail": [
        {
            "type": "extra_forbidden",
            "loc": ["body", "extra"],
            "msg": "Extra inputs are not permitted",
            "input": "Mr. Poopybutthole"
        }
    ]
}
```

## Summary

You can use Pydantic models to declare form fields in FastAPI.

# Request Forms and Files

You can define files and form fields simultaneously using `File` and `Form`.

To receive uploaded files and/or form data, first install `python-multipart`.

Make sure to create a virtual environment, activate it, and then install it:

```
$ pip install python-multipart
```

## Import `File` and `Form`

### Python 3.9+

```Python
{!> ../../docs_src/request_forms_and_files/tutorial001_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/request_forms_and_files/tutorial001_an.py!}
```

### Python 3.8+ non-Annotated

Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/request_forms_and_files/tutorial001.py!}
```

## Define `File` and `Form` parameters

Create file and form parameters similarly to how you would for `Body` or `Query`:

### Python 3.9+

```Python
{!> ../../docs_src/request_forms_and_files/tutorial001_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/request_forms_and_files/tutorial001_an.py!}
```

### Python 3.8+ non-Annotated

Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/request_forms_and_files/tutorial001.py!}
```

The files and form fields will be uploaded as form data, and you will receive the files and form fields. You can declare some files as `bytes` and others as `UploadFile`.

**Warning:** You can declare multiple `File` and `Form` parameters in a path operation, but you cannot declare `Body` fields that you expect to receive as JSON. The request will have the body encoded using `multipart/form-data` instead of `application/json`. This is part of the HTTP protocol, not a limitation of FastAPI.

## Recap

Use `File` and `Form` together when you need to receive data and files in the same request.

# Form Data

When you need to receive form fields instead of JSON, use `Form`.

## Installation

To use forms, first install `python-multipart`. Create a virtual environment, activate it, and then install it:

```
$ pip install python-multipart
```

## Import `Form`

Import `Form` from `fastapi`:

### Python 3.9+

```Python
{!> ../../docs_src/request_forms/tutorial001_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/request_forms/tutorial001_an.py!}
```

### Python 3.8+ non-Annotated

Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/request_forms/tutorial001.py!}
```

## Define `Form` Parameters

Create form parameters similarly to `Body` or `Query`:

### Python 3.9+

```Python
{!> ../../docs_src/request_forms/tutorial001_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/request_forms/tutorial001_an.py!}
```

### Python 3.8+ non-Annotated

Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/request_forms/tutorial001.py!}
```

For example, in the OAuth2 "password flow," you must send `username` and `password` as form fields. The specification requires these fields to be named exactly `username` and `password`, sent as form fields, not JSON.

With `Form`, you can declare configurations similar to `Body`, including validation, examples, and aliases (e.g., `user-name` instead of `username`).

`Form` is a class that inherits directly from `Body`. To declare form bodies, use `Form` explicitly; otherwise, parameters will be interpreted as query parameters or body (JSON) parameters.

## About "Form Fields"

HTML forms send data to the server using a special encoding, different from JSON. FastAPI will read that data correctly.

Data from forms is typically encoded using the media type `application/x-www-form-urlencoded`. When forms include files, they are encoded as `multipart/form-data`.

You can read more about these encodings and form fields in the MDN web docs for POST.

**Warning:** You can declare multiple `Form` parameters in a path operation, but you cannot declare `Body` fields expected to receive JSON, as the request body will be encoded using `application/x-www-form-urlencoded` instead of `application/json`. This is part of the HTTP protocol.

## Recap

Use `Form` to declare form data input parameters.

# Response Model - Return Type

You can declare the type used for the response by annotating the path operation function return type. You can use type annotations similarly to input data in function parameters, including Pydantic models, lists, dictionaries, and scalar values like integers and booleans.

FastAPI will use this return type to:

- **Validate** the returned data. If the data is invalid (e.g., a missing field), it indicates that your app code is broken, resulting in a server error instead of incorrect data. This ensures that clients receive the expected data shape.
- Add a **JSON Schema** for the response in the OpenAPI path operation, which will be used by automatic documentation and client code generation tools.
- **Limit and filter** the output data to what is defined in the return type, which is crucial for security.

## `response_model` Parameter

In some cases, you may want to return data that does not exactly match the declared type. For example, you might want to return a dictionary or a database object but declare it as a Pydantic model. This allows the Pydantic model to handle data documentation and validation.

If you added the return type annotation, tools would raise an error if the function returns a type different from what was declared. In such cases, you can use the path operation decorator parameter `response_model` instead of the return type.

You can use the `response_model` parameter in any path operation:

- `@app.get()`
- `@app.post()`
- `@app.put()`
- `@app.delete()`

`response_model` receives the same type you would declare for a Pydantic model field, such as a Pydantic model or a list of Pydantic models (e.g., `List[Item]`). FastAPI will use this `response_model` for data documentation, validation, and to convert and filter the output data.

If you have strict type checks in your editor, you can declare the function return type as `Any` to indicate that you are intentionally returning anything. FastAPI will still perform data documentation, validation, and filtering with the `response_model`.

### `response_model` Priority

If both a return type and a `response_model` are declared, the `response_model` takes priority. This allows you to add correct type annotations to your functions while still enabling FastAPI to perform data validation and documentation using the `response_model`. You can also use `response_model=None` to disable creating a response model for that path operation.

## Return the Same Input Data

You can declare a `UserIn` model that contains a plaintext password:

```Python
# Example for Python 3.10+
{!> ../../docs_src/response_model/tutorial002_py310.py!}
```

```Python
# Example for Python 3.8+
{!> ../../docs_src/response_model/tutorial002.py!}
```

Using this model, you can declare both input and output:

```Python
# Example for Python 3.10+
{!> ../../docs_src/response_model/tutorial002_py310.py!}
```

```Python
# Example for Python 3.8+
{!> ../../docs_src/response_model/tutorial002.py!}
```

This approach may not be a problem if the same user is sending the password. However, using the same model for another path operation could expose user passwords to every client.

**Warning:** Never store or send a user's plaintext password in a response unless you are fully aware of the implications.

## Add an Output Model

Instead, create an input model with the plaintext password and an output model without it:

```Python
# Example for Python 3.10+
{!> ../../docs_src/response_model/tutorial003_py310.py!}
```

```Python
# Example for Python 3.8+
{!> ../../docs_src/response_model/tutorial003.py!}
```

Even if the path operation function returns the same input user containing the password:

```Python
# Example for Python 3.10+
{!> ../../docs_src/response_model/tutorial003_py310.py!}
```

```Python
# Example for Python 3.8+
{!> ../../docs_src/response_model/tutorial003.py!}
```

You can declare the `response_model` as `UserOut`, which does not include the password:

```Python
# Example for Python 3.10+
{!> ../../docs_src/response_model/tutorial003_py310.py!}
```

```Python
# Example for Python 3.8+
{!> ../../docs_src/response_model/tutorial003.py!}
```

FastAPI will filter out all data not declared in the output model.

### `response_model` or Return Type

If the two models differ, annotating the function return type as `UserOut` would cause a type error. Therefore, you must declare it in the `response_model` parameter.

## Return Type and Data Filtering

You may want to annotate the function with one type while returning something that includes more data. FastAPI should filter the data using the response model, ensuring that only the fields declared in the response model are included.

You can use classes and inheritance to achieve this:

```Python
# Example for Python 3.10+
{!> ../../docs_src/response_model/tutorial003_01_py310.py!}
```

```Python
# Example for Python 3.8+
{!> ../../docs_src/response_model/tutorial003_01.py!}
```

This approach provides tooling support while allowing FastAPI to filter data.

### Type Annotations and Tooling

`BaseUser` has base fields, and `UserIn` inherits from `BaseUser`, adding the `password` field. The function return type is annotated as `BaseUser`, but a `UserIn` instance is returned. This is valid because `UserIn` is a subclass of `BaseUser`.

### FastAPI Data Filtering

FastAPI ensures that only fields declared in the type are returned, preventing excessive data exposure.

## Other Return Type Annotations

You may return something that is not a valid Pydantic field and annotate it for tooling support.

### Return a Response Directly

Returning a Response directly is a common case:

```Python
# Example for Python 3.10+
{!> ../../docs_src/response_model/tutorial003_02.py!}
```

FastAPI handles this automatically because the return type annotation is a class (or subclass) of `Response`.

### Annotate a Response Subclass

You can also use a subclass of `Response` in the type annotation:

```Python
# Example for Python 3.10+
{!> ../../docs_src/response_model/tutorial003_03.py!}
```

### Invalid Return Type Annotations

Returning an arbitrary object that is not a valid Pydantic type will cause FastAPI to fail when trying to create a Pydantic response model from that type annotation:

```Python
# Example for Python 3.10+
{!> ../../docs_src/response_model/tutorial003_04_py310.py!}
```

```Python
# Example for Python 3.8+
{!> ../../docs_src/response_model/tutorial003_04.py!}
```

### Disable Response Model

You can disable response model generation by setting `response_model=None`:

```Python
# Example for Python 3.10+
{!> ../../docs_src/response_model/tutorial003_05_py310.py!}
```

```Python
# Example for Python 3.8+
{!> ../../docs_src/response_model/tutorial003_05.py!}
```

## Response Model Encoding Parameters

Your response model can have default values:

```Python
# Example for Python 3.10+
{!> ../../docs_src/response_model/tutorial004_py310.py!}
```

- `description: Union[str, None] = None` has a default of `None`.
- `tax: float = 10.5` has a default of `10.5`.
- `tags: List[str] = []` has a default of an empty list.

You might want to omit these from the result if they were not actually stored.

### Use the `response_model_exclude_unset` Parameter

Set the path operation decorator parameter `response_model_exclude_unset=True`:

```Python
# Example for Python 3.10+
{!> ../../docs_src/response_model/tutorial004_py310.py!}
```

This will exclude default values from the response.

### Data with Values for Fields with Defaults

If your data has values for fields with default values, they will be included in the response.

### Data with the Same Values as the Defaults

If the data has the same values as the defaults, FastAPI will include them in the response since they were set explicitly.

### `response_model_include` and `response_model_exclude`

You can use the parameters `response_model_include` and `response_model_exclude` to include or exclude specific attributes in the output.

```Python
# Example for Python 3.10+
{!> ../../docs_src/response_model/tutorial005_py310.py!}
```

```Python
# Example for Python 3.8+
{!> ../../docs_src/response_model/tutorial005.py!}
```

### Using Lists Instead of Sets

If you use a list or tuple instead of a set, FastAPI will convert it to a set and work correctly:

```Python
# Example for Python 3.10+
{!> ../../docs_src/response_model/tutorial006_py310.py!}
```

```Python
# Example for Python 3.8+
{!> ../../docs_src/response_model/tutorial006.py!}
```

## Recap

Use the path operation decorator's parameter `response_model` to define response models and ensure private data is filtered out. Use `response_model_exclude_unset` to return only explicitly set values.

# Response Status Code

You can specify a response model and declare the HTTP status code for the response using the `status_code` parameter in any of the path operations:

- `@app.get()`
- `@app.post()`
- `@app.put()`
- `@app.delete()`

The `status_code` parameter is part of the decorator method (e.g., `get`, `post`), not the path operation function.

The `status_code` parameter accepts a number representing the HTTP status code or an `IntEnum`, such as Python's `http.HTTPStatus`.

It will:

- Return the specified status code in the response.
- Document it in the OpenAPI schema.

Some response codes indicate that the response does not have a body. FastAPI will produce OpenAPI docs stating there is no response body.

## About HTTP Status Codes

In HTTP, a numeric status code of 3 digits is sent as part of the response. These codes have associated names, but the number is the key part.

- `100` and above: "Information" (rarely used directly; cannot have a body).
- **`200`** and above: "Successful" responses (most commonly used).
  - `200`: Default status code, means "OK".
  - `201`: "Created", used after creating a new record.
  - `204`: "No Content", used when there is no content to return.
- **`300`** and above: "Redirection" (may or may not have a body; `304` must not have one).
- **`400`** and above: "Client error" responses (commonly used).
  - `404`: "Not Found".
  - `400`: Generic client error.
- `500` and above: Server errors (rarely used directly; indicates issues in application code or server).

To learn more about each status code, refer to the MDN documentation about HTTP status codes.

## Shortcut to Remember the Names

You can use convenience variables from `fastapi.status` to avoid memorizing each code's meaning. They hold the same number and allow for easier autocomplete in your editor.

You could also use `from starlette import status`. FastAPI provides `starlette.status` as `fastapi.status` for convenience.

## Changing the Default

In the Advanced User Guide, you will learn how to return a different status code than the default you are declaring here.

# Declare Request Example Data

You can declare examples of the data your app can receive in several ways.

## Extra JSON Schema Data in Pydantic Models

You can declare `examples` for a Pydantic model that will be added to the generated JSON Schema.

### Python 3.10+ Pydantic v2

```Python
{!> ../../docs_src/schema_extra_example/tutorial001_py310.py!}
```

### Python 3.10+ Pydantic v1

```Python
{!> ../../docs_src/schema_extra_example/tutorial001_py310_pv1.py!}
```

### Python 3.8+ Pydantic v2

```Python
{!> ../../docs_src/schema_extra_example/tutorial001.py!}
```

### Python 3.8+ Pydantic v1

```Python
{!> ../../docs_src/schema_extra_example/tutorial001_pv1.py!}
```

The extra info will be added as-is to the output JSON Schema for that model and will be used in the API docs.

### Pydantic v2

In Pydantic version 2, use the attribute `model_config`, which takes a `dict`. Set `"json_schema_extra"` with a `dict` containing any additional data, including `examples`.

### Pydantic v1

In Pydantic version 1, use an internal class `Config` and `schema_extra`. Set `schema_extra` with a `dict` containing any additional data, including `examples`.

## Field Additional Arguments

When using `Field()` with Pydantic models, you can also declare additional `examples`:

### Python 3.10+

```Python
{!> ../../docs_src/schema_extra_example/tutorial002_py310.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/schema_extra_example/tutorial002.py!}
```

## Examples in JSON Schema - OpenAPI

When using any of the following, you can declare a group of `examples` with additional information that will be added to their JSON Schemas inside OpenAPI:

- `Path()`
- `Query()`
- `Header()`
- `Cookie()`
- `Body()`
- `Form()`
- `File()`

### Body with Examples

Here we pass `examples` containing one example of the data expected in `Body()`:

### Python 3.10+

```Python
{!> ../../docs_src/schema_extra_example/tutorial003_an_py310.py!}
```

### Python 3.9+

```Python
{!> ../../docs_src/schema_extra_example/tutorial003_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/schema_extra_example/tutorial003_an.py!}
```

### Python 3.10+ Non-Annotated

```Python
{!> ../../docs_src/schema_extra_example/tutorial003_py310.py!}
```

### Python 3.8+ Non-Annotated

```Python
{!> ../../docs_src/schema_extra_example/tutorial003.py!}
```

### Body with Multiple Examples

You can also pass multiple `examples`:

### Python 3.10+

```Python
{!> ../../docs_src/schema_extra_example/tutorial004_an_py310.py!}
```

### Python 3.9+

```Python
{!> ../../docs_src/schema_extra_example/tutorial004_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/schema_extra_example/tutorial004_an.py!}
```

### Python 3.10+ Non-Annotated

```Python
{!> ../../docs_src/schema_extra_example/tutorial004_py310.py!}
```

### Python 3.8+ Non-Annotated

```Python
{!> ../../docs_src/schema_extra_example/tutorial004.py!}
```

When you do this, the examples will be part of the internal JSON Schema for that body data. However, as of the time of writing, Swagger UI does not support showing multiple examples for the data in JSON Schema.

### OpenAPI-Specific Examples

OpenAPI has supported a different field called `examples`, which goes in the details for each path operation, not inside each JSON Schema. This OpenAPI-specific `examples` is a `dict` with multiple examples, each with extra information.

### Using the `openapi_examples` Parameter

You can declare the OpenAPI-specific `examples` in FastAPI with the parameter `openapi_examples` for:

- `Path()`
- `Query()`
- `Header()`
- `Cookie()`
- `Body()`
- `Form()`
- `File()`

Each specific example `dict` in the `examples` can contain:

- `summary`: Short description for the example.
- `description`: A long description that can contain Markdown text.
- `value`: The actual example shown, e.g., a `dict`.
- `externalValue`: Alternative to `value`, a URL pointing to the example.

### Python 3.10+

```Python
{!> ../../docs_src/schema_extra_example/tutorial005_an_py310.py!}
```

### Python 3.9+

```Python
{!> ../../docs_src/schema_extra_example/tutorial005_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/schema_extra_example/tutorial005_an.py!}
```

### Python 3.10+ Non-Annotated

```Python
{!> ../../docs_src/schema_extra_example/tutorial005_py310.py!}
```

### Python 3.8+ Non-Annotated

```Python
{!> ../../docs_src/schema_extra_example/tutorial005.py!}
```

## Technical Details

If you are using FastAPI version 0.99.0 or above, you can probably skip these details.

Before OpenAPI 3.1.0, OpenAPI used an older version of JSON Schema, which did not have `examples`. OpenAPI added its own `example` field.

### JSON Schema's `examples` Field

JSON Schema later added an `examples` field. OpenAPI 3.1.0 is based on the latest version of JSON Schema, which includes this new field. The new `examples` field takes precedence over the old `example` field, which is now deprecated.

### Pydantic and FastAPI Examples

When you add `examples` inside a Pydantic model, that example is added to the JSON Schema for that model. This JSON Schema is included in the OpenAPI of your API and used in the docs UI.

### Swagger UI and OpenAPI-Specific Examples

FastAPI 0.103.0 added support for declaring the OpenAPI-specific `examples` field with the new parameter `openapi_examples`.

### Summary

Upgrade to FastAPI 0.99.0 or above for a simpler, consistent, and intuitive experience.

# Security - First Steps

Imagine you have a backend API in one domain and a frontend in another domain or a different path of the same domain (or in a mobile application). You want the frontend to authenticate with the backend using a username and password. We can use OAuth2 to build that with FastAPI.

## Create `main.py`

Copy the example into a file named `main.py`:

### Python 3.9+

```Python
{!> ../../docs_src/security/tutorial001_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/security/tutorial001_an.py!}
```

### Python 3.8+ non-Annotated

```Python
{!> ../../docs_src/security/tutorial001.py!}
```

## Run it

The `python-multipart` package is automatically installed with FastAPI when you run the command `pip install "fastapi[standard]"`. If you use `pip install fastapi`, the `python-multipart` package is not included by default. To install it manually, create a virtual environment, activate it, and then run:

```console
$ pip install python-multipart
```

Run the example with:

```console
$ fastapi dev main.py
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

## Check it

Go to the interactive docs at: http://127.0.0.1:8000/docs. You will see an "Authorize" button and a lock icon in the top-right corner of your path operation. Clicking it will show an authorization form for entering a username and password.

This interactive tool is useful for documenting your API and can be used by the frontend team, third-party applications, and for debugging.

## The `password` flow

The `password` flow is one of the OAuth2 methods for handling security and authentication. In this case, the FastAPI application handles both the API and authentication.

1. The user enters the username and password in the frontend and submits.
2. The frontend sends the credentials to a specific URL in the API (declared with `tokenUrl="token"`).
3. The API checks the credentials and responds with a token.
   - A token is a string used to verify the user and typically expires after some time.
4. The frontend stores the token temporarily.
5. When fetching more data from the API, the frontend sends an `Authorization` header with the token.

## FastAPI's `OAuth2PasswordBearer`

FastAPI provides tools to implement security features. In this example, we will use OAuth2 with the Password flow and a Bearer token via the `OAuth2PasswordBearer` class.

When creating an instance of `OAuth2PasswordBearer`, pass the `tokenUrl` parameter, which indicates the URL the client will use to send the credentials.

### Python 3.9+

```Python hl_lines="8"
{!> ../../docs_src/security/tutorial001_an_py39.py!}
```

### Python 3.8+

```Python hl_lines="7"
{!> ../../docs_src/security/tutorial001_an.py!}
```

### Python 3.8+ non-Annotated

```Python hl_lines="6"
{!> ../../docs_src/security/tutorial001.py!}
```

The `tokenUrl="token"` refers to a relative URL. This ensures your application works even in advanced use cases like being behind a proxy.

This parameter does not create the endpoint but indicates that the client should use `/token` to obtain the token. This information is used in OpenAPI and the interactive API documentation.

The `oauth2_scheme` variable is an instance of `OAuth2PasswordBearer` and can be called as:

```Python
oauth2_scheme(some, parameters)
```

### Use it

You can pass `oauth2_scheme` in a dependency with `Depends`.

### Python 3.9+

```Python hl_lines="12"
{!> ../../docs_src/security/tutorial001_an_py39.py!}
```

### Python 3.8+

```Python hl_lines="11"
{!> ../../docs_src/security/tutorial001_an.py!}
```

### Python 3.8+ non-Annotated

```Python hl_lines="10"
{!> ../../docs_src/security/tutorial001.py!}
```

This dependency provides a string assigned to the `token` parameter of the path operation function. FastAPI will use this dependency to define a security scheme in the OpenAPI schema.

## What it does

It checks the request for the `Authorization` header, verifies if it contains a Bearer token, and returns the token as a string. If the header is missing or invalid, it responds with a 401 status code error (UNAUTHORIZED).

You can test this in the interactive docs.

## Recap

With just a few extra lines, you have implemented a basic form of security.

# Get Current User

In the previous chapter, the security system provided the path operation function with a `token` as a `str`.

## Create a User Model

First, create a Pydantic user model. Pydantic can be used to declare bodies and can be utilized elsewhere.

```Python
# Python 3.10+
{!> ../../docs_src/security/tutorial002_an_py310.py!}

# Python 3.9+
{!> ../../docs_src/security/tutorial002_an_py39.py!}

# Python 3.8+
{!> ../../docs_src/security/tutorial002_an.py!}

# Python 3.10+ non-Annotated
{!> ../../docs_src/security/tutorial002_py310.py!}

# Python 3.8+ non-Annotated
{!> ../../docs_src/security/tutorial002.py!}
```

## Create a `get_current_user` Dependency

Create a dependency `get_current_user`. This dependency will use the `oauth2_scheme` created earlier. It will receive a `token` as a `str` from the sub-dependency.

```Python
# Python 3.10+
{!> ../../docs_src/security/tutorial002_an_py310.py!}

# Python 3.9+
{!> ../../docs_src/security/tutorial002_an_py39.py!}

# Python 3.8+
{!> ../../docs_src/security/tutorial002_an.py!}

# Python 3.10+ non-Annotated
{!> ../../docs_src/security/tutorial002_py310.py!}

# Python 3.8+ non-Annotated
{!> ../../docs_src/security/tutorial002.py!}
```

## Get the User

`get_current_user` will utilize a utility function that takes a token as a `str` and returns the Pydantic `User` model.

```Python
# Python 3.10+
{!> ../../docs_src/security/tutorial002_an_py310.py!}

# Python 3.9+
{!> ../../docs_src/security/tutorial002_an_py39.py!}

# Python 3.8+
{!> ../../docs_src/security/tutorial002_an.py!}

# Python 3.10+ non-Annotated
{!> ../../docs_src/security/tutorial002_py310.py!}

# Python 3.8+ non-Annotated
{!> ../../docs_src/security/tutorial002.py!}
```

## Inject the Current User

Use `Depends` with `get_current_user` in the path operation.

```Python
# Python 3.10+
{!> ../../docs_src/security/tutorial002_an_py310.py!}

# Python 3.9+
{!> ../../docs_src/security/tutorial002_an_py39.py!}

# Python 3.8+
{!> ../../docs_src/security/tutorial002_an.py!}

# Python 3.10+ non-Annotated
{!> ../../docs_src/security/tutorial002_py310.py!}

# Python 3.8+ non-Annotated
{!> ../../docs_src/security/tutorial002.py!}
```

Declare the type of `current_user` as the Pydantic model `User` for completion and type checks.

The dependency system allows for multiple dependencies returning a `User` model.

## Other Models

You can retrieve the current user in path operation functions and manage security at the Dependency Injection level using `Depends`. You are not limited to a specific data model; any model or data can be used for security requirements.

## Code Size

This example may seem verbose due to the combination of security, data models, utility functions, and path operations. However, the security and dependency injection code is written once and can be reused across multiple endpoints.

Path operations can be concise:

```Python
# Python 3.10+
{!> ../../docs_src/security/tutorial002_an_py310.py!}

# Python 3.9+
{!> ../../docs_src/security/tutorial002_an_py39.py!}

# Python 3.8+
{!> ../../docs_src/security/tutorial002_an.py!}

# Python 3.10+ non-Annotated
{!> ../../docs_src/security/tutorial002_py310.py!}

# Python 3.8+ non-Annotated
{!> ../../docs_src/security/tutorial002.py!}
```

## Recap

You can now retrieve the current user directly in your path operation function. The next step is to add a path operation for the user/client to send the `username` and `password`.

# Security

Security, authentication, and authorization are complex topics that often require significant effort and code, sometimes comprising over 50% of the total codebase. FastAPI offers tools to simplify these processes, allowing for standard implementation without extensive study of security specifications.

## In a hurry?

If you need to implement security with username and password authentication immediately, proceed to the next chapters.

## OAuth2

OAuth2 is a specification for handling authentication and authorization, covering various complex use cases, including third-party authentication (e.g., "login with Facebook, Google, Twitter, GitHub"). 

### OAuth 1

OAuth 1 is an older, more complex specification that included direct encryption methods. It is less popular today. OAuth2 does not specify encryption methods, assuming applications are served over HTTPS.

## OpenID Connect

OpenID Connect extends OAuth2, clarifying ambiguities to enhance interoperability. For instance, Google login utilizes OpenID Connect, while Facebook has its own version of OAuth2.

### OpenID (not "OpenID Connect")

OpenID was a separate specification aimed at similar goals as OpenID Connect but was not based on OAuth2. It is not widely used today.

## OpenAPI

OpenAPI (formerly Swagger) is the open specification for building APIs and is part of the Linux Foundation. FastAPI is built on OpenAPI, enabling automatic interactive documentation and code generation.

OpenAPI defines several security schemes:

- `apiKey`: An application-specific key from:
  - A query parameter
  - A header
  - A cookie
- `http`: Standard HTTP authentication systems, including:
  - `bearer`: A header `Authorization` with a value of `Bearer ` plus a token (inherited from OAuth2)
  - HTTP Basic authentication
  - HTTP Digest, etc.
- `oauth2`: Various OAuth2 security methods (called "flows"):
  - `implicit`
  - `clientCredentials`
  - `authorizationCode`
  - `password`: Suitable for direct application authentication.
- `openIdConnect`: Defines automatic discovery of OAuth2 authentication data, as specified in OpenID Connect.

## FastAPI Utilities

FastAPI provides tools in the `fastapi.security` module to simplify the use of these security mechanisms. Subsequent chapters will demonstrate how to add security to your API using these tools and how they integrate into the interactive documentation system.

# OAuth2 with Password (and Hashing), Bearer with JWT Tokens

This documentation outlines how to secure an application using JWT tokens and secure password hashing.

## About JWT

JWT (JSON Web Tokens) is a standard for encoding a JSON object into a compact string. A JWT looks like this:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

JWTs are not encrypted but are signed, allowing verification of the issuer. Tokens can have expiration times, after which users must re-authenticate. Modifications to the token can be detected due to signature mismatches.

## Install `PyJWT`

To generate and verify JWT tokens in Python, install `PyJWT`:

```console
$ pip install pyjwt
```

If using digital signature algorithms like RSA or ECDSA, install the cryptography library with:

```console
$ pip install "pyjwt[crypto]"
```

## Password Hashing

Hashing converts a password into a non-reversible string. The same password always produces the same hash, but the original password cannot be retrieved from the hash. This protects user passwords in case of database theft.

## Install `passlib`

`PassLib` is a Python package for handling password hashes, supporting various secure algorithms. The recommended algorithm is "Bcrypt". Install it as follows:

```console
$ pip install "passlib[bcrypt]"
```

## Hash and Verify Passwords

Import necessary tools from `passlib` and create a PassLib context for hashing and verifying passwords. Implement utility functions for hashing, verifying, and authenticating users.

### Example Code

```Python
# Example code for hashing and verifying passwords
```

## Handle JWT Tokens

Import the required modules and create a random secret key for signing JWT tokens. Use the command:

```console
$ openssl rand -hex 32
```

Set the `SECRET_KEY` variable with the generated key and define the `ALGORITHM` as `"HS256"`. Create a utility function to generate access tokens.

### Example Code

```Python
# Example code for handling JWT tokens
```

## Update Dependencies

Modify `get_current_user` to decode and verify the JWT token. If the token is invalid, return an HTTP error.

### Example Code

```Python
# Example code for updating dependencies
```

## Update the `/token` Path Operation

Create a `timedelta` for token expiration and generate a JWT access token.

### Example Code

```Python
# Example code for updating the /token path operation
```

## Technical Details about the JWT "subject" `sub`

The `sub` key in a JWT identifies the user. It can also be used for other entities, such as cars or blog posts. To avoid ID collisions, prefix the `sub` value with a unique identifier.

## Check It

Run the server and access the documentation interface. Use the credentials:

- Username: `johndoe`
- Password: `secret`

The plaintext password is never exposed in the code, only the hashed version.

## Advanced Usage with Scopes

OAuth2 scopes allow you to define specific permissions for a JWT token. This can be used to restrict access to certain API functionalities.

## Recap

This guide provides the foundation for setting up a secure FastAPI application using OAuth2 and JWT. FastAPI offers flexibility and integrates well with packages like `passlib` and `PyJWT`, allowing for secure and standard protocol implementation without compromising on features or security.

# Simple OAuth2 with Password and Bearer

This documentation outlines the implementation of a complete security flow using OAuth2 with FastAPI.

## Get the `username` and `password`

Utilize FastAPI security utilities to obtain the `username` and `password`. According to OAuth2 specifications for the "password flow", the client must send `username` and `password` as form data. The field names must be exactly `username` and `password`.

### `scope`

The client can also send a form field named `scope`, which is a string of scopes separated by spaces. Common examples include:

- `users:read`
- `users:write`
- `instagram_basic`
- `https://www.googleapis.com/auth/drive`

In OAuth2, a "scope" is simply a string that declares a specific permission.

## Code to get the `username` and `password`

Use `OAuth2PasswordRequestForm` as a dependency in the path operation for `/token`:

```Python
from fastapi import FastAPI, Depends
from fastapi.security import OAuth2PasswordRequestForm

app = FastAPI()

@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # Your logic here
```

`OAuth2PasswordRequestForm` includes:

- `username`
- `password`
- Optional `scope`
- Optional `grant_type` (should be `password`)
- Optional `client_id`
- Optional `client_secret`

### Use the form data

The `OAuth2PasswordRequestForm` instance will have a `scopes` attribute containing a list of strings for each scope sent.

Retrieve user data from the database using the `username`. If the user does not exist, return an error using `HTTPException`:

```Python
from fastapi import HTTPException

user = fake_db.get(form_data.username)
if not user:
    raise HTTPException(status_code=400, detail="Incorrect username or password")
```

### Check the password

Use a password hashing system to verify the password. If the passwords do not match, return the same error.

#### Password hashing

Hashing converts a password into a non-reversible string. This ensures that even if the database is compromised, plaintext passwords are not exposed.

```Python
if not verify_password(form_data.password, user.hashed_password):
    raise HTTPException(status_code=400, detail="Incorrect username or password")
```

#### About `**user_dict`

`UserInDB(**user_dict)` allows passing user data as key-value arguments.

## Return the token

The response from the `token` endpoint must be a JSON object containing:

- `token_type`: should be `bearer`
- `access_token`: a string containing the access token

For this example, return the `username` as the token:

```Python
return {"access_token": form_data.username, "token_type": "bearer"}
```

## Update the dependencies

Create an additional dependency `get_current_active_user` that uses `get_current_user`. This ensures that only active users are retrieved.

```Python
@app.get("/users/me")
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user
```

## See it in action

Open the interactive docs at: http://127.0.0.1:8000/docs.

### Authenticate

Use the following credentials:

- User: `johndoe`
- Password: `secret`

### Get your own user data

Perform a `GET` request to `/users/me` to retrieve user data:

```JSON
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "full_name": "John Doe",
  "disabled": false,
  "hashed_password": "fakehashedsecret"
}
```

If logged out and the same operation is attempted, an HTTP 401 error will be returned:

```JSON
{
  "detail": "Not authenticated"
}
```

### Inactive user

Attempt to authenticate with an inactive user:

- User: `alice`
- Password: `secret2`

A "Inactive user" error will be returned:

```JSON
{
  "detail": "Inactive user"
}
```

## Recap

You now have the tools to implement a complete security system based on `username` and `password` for your API. The next chapter will cover secure password hashing and JWT tokens.

# SQL (Relational) Databases

FastAPI does not require a SQL (relational) database, but you can use any database you prefer. This example uses SQLModel.

SQLModel is built on top of SQLAlchemy and Pydantic, created by the same author of FastAPI, making it ideal for FastAPI applications that require SQL databases.

You can use any SQL or NoSQL database library you want; FastAPI does not enforce any specific choice.

SQLModel supports any database compatible with SQLAlchemy, including:

- PostgreSQL
- MySQL
- SQLite
- Oracle
- Microsoft SQL Server, etc.

This example uses SQLite for its simplicity, as it operates with a single file and has built-in Python support. For production, consider using a database server like PostgreSQL.

There is an official project generator for FastAPI and PostgreSQL, including a frontend and additional tools: https://github.com/fastapi/full-stack-fastapi-template.

For more comprehensive learning about databases or SQL, refer to the SQLModel documentation.

## Install SQLModel

Create and activate your virtual environment, then install SQLModel:

```console
$ pip install sqlmodel
```

## Create the App with a Single Model

We will create a basic version of the app with a single SQLModel model, which will be enhanced later for security and versatility.

### Create Models

Import SQLModel and create a database model:

The `Hero` class resembles a Pydantic model but has some differences:

- `table=True` indicates this is a table model, representing a table in the SQL database.
- `Field(primary_key=True)` designates `id` as the primary key in the SQL database.
- `Field(index=True)` creates a SQL index for faster lookups.

### Create an Engine

A SQLModel engine holds connections to the database. You will have one engine object for all code connecting to the same database.

Using `check_same_thread=False` allows FastAPI to use the same SQLite database across different threads, ensuring a single SQLModel session per request.

### Create the Tables

Add a function to create tables for all table models using `SQLModel.metadata.create_all(engine)`.

### Create a Session Dependency

A Session stores objects in memory and tracks changes, using the engine to communicate with the database. Create a FastAPI dependency with `yield` to provide a new Session for each request.

### Create Database Tables on Startup

Create the database tables when the application starts. For production, consider using a migration script.

SQLModel will have migration utilities wrapping Alembic, but for now, you can use Alembic directly.

### Create a Hero

Each SQLModel model is also a Pydantic model, allowing it to be used in type annotations. Declare a parameter of type `Hero` to read from the JSON body and return it.

Use the SessionDep dependency to add the new Hero to the Session, commit changes, refresh the data, and return it.

### Read Heroes

Read Heroes from the database using `select()`, with options for pagination.

### Read One Hero

Read a single Hero from the database.

### Delete a Hero

Delete a Hero from the database.

### Run the App

Run the app:

```console
$ fastapi dev main.py

INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

Access the `/docs` UI to see FastAPI using these models to document the API and validate data.

## Update the App with Multiple Models

Refactor the app to enhance security and versatility. The previous version allowed clients to set the `id` of the Hero, which should be managed by the backend or database.

### Create Multiple Models

In SQLModel, any model class with `table=True` is a table model, while those without it are data models (Pydantic models).

#### HeroBase - the base class

Create a `HeroBase` model with shared fields:

- `name`
- `age`

#### Hero - the table model

Create `Hero`, the actual table model, with additional fields:

- `id`
- `secret_name`

#### HeroPublic - the public data model

Create a `HeroPublic` model to be returned to API clients, excluding `secret_name`.

#### HeroCreate - the data model to create a hero

Create a `HeroCreate` model to validate data from clients, including `secret_name`.

#### HeroUpdate - the data model to update a hero

Create a `HeroUpdate` model with optional fields for updating a hero.

### Create with HeroCreate and return a HeroPublic

Receive a `HeroCreate` data model in the request, create a `Hero` table model, and return it as a `HeroPublic` response model.

### Read Heroes with HeroPublic

Read Heroes using `response_model=list[HeroPublic]` for validation and serialization.

### Read One Hero with HeroPublic

Read a single hero using the HeroPublic model.

### Update a Hero with HeroUpdate

Update a hero using an HTTP PATCH operation, excluding unset values.

### Delete a Hero Again

Deleting a hero remains similar to previous implementations.

### Run the App Again

Run the app again:

```console
$ fastapi dev main.py

INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

Access the updated `/docs` API UI.

## Recap

Use SQLModel to interact with a SQL database, simplifying code with data models and table models. For more information, refer to the SQLModel documentation and the longer tutorial on using SQLModel with FastAPI.

# Static Files

You can serve static files automatically from a directory using `StaticFiles`.

## Use `StaticFiles`

- Import `StaticFiles`.
- "Mount" a `StaticFiles()` instance in a specific path.

```Python
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
```

You could also use `from starlette.staticfiles import StaticFiles`.

**FastAPI** provides the same `starlette.staticfiles` as `fastapi.staticfiles` for convenience, but it comes directly from Starlette.

### What is "Mounting"

"Mounting" means adding a complete "independent" application in a specific path, which handles all the sub-paths. This differs from using an `APIRouter`, as a mounted application is completely independent. The OpenAPI and documentation from your main application won't include anything from the mounted application.

## Details

The first `"/static"` refers to the sub-path this "sub-application" will be "mounted" on. Any path that starts with `"/static"` will be handled by it.

The `directory="static"` refers to the name of the directory that contains your static files.

The `name="static"` gives it a name that can be used internally by **FastAPI**.

All these parameters can be adjusted according to the needs and specific details of your application.

## More info

For more details and options, check Starlette's documentation about Static Files.

# Testing

Thanks to Starlette, testing FastAPI applications is easy and enjoyable. It is based on HTTPX, which is designed based on Requests, making it familiar and intuitive. You can use pytest directly with FastAPI.

## Using `TestClient`

To use `TestClient`, first install `httpx`. Create a virtual environment, activate it, and then install it:

```
$ pip install httpx
```

Import `TestClient`. Create a `TestClient` by passing your FastAPI application to it. Create functions with a name that starts with `test_` (standard pytest conventions). Use the `TestClient` object the same way as you do with httpx. Write simple `assert` statements with standard Python expressions.

```Python
{!../../docs_src/app_testing/tutorial001.py!}
```

Notice that the testing functions are normal `def`, not `async def`. Calls to the client are also normal calls, not using `await`, allowing you to use pytest directly without complications.

You could also use `from starlette.testclient import TestClient`. FastAPI provides the same `starlette.testclient` as `fastapi.testclient` for convenience.

If you want to call async functions in your tests apart from sending requests to your FastAPI application, refer to the Async Tests in the advanced tutorial.

## Separating tests

In a real application, you would typically have your tests in a different file. Your FastAPI application might also be composed of several files/modules.

### FastAPI app file

Assuming a file structure as described in Bigger Applications:

```
.
├── app
│   ├── __init__.py
│   └── main.py
```

In `main.py`, you have your FastAPI app:

```Python
{!../../docs_src/app_testing/main.py!}
```

### Testing file

You could have a file `test_main.py` with your tests in the same Python package:

```
.
├── app
│   ├── __init__.py
│   ├── main.py
│   └── test_main.py
```

Because this file is in the same package, you can use relative imports to import the object `app` from the `main` module:

```Python
{!../../docs_src/app_testing/test_main.py!}
```

## Testing: extended example

Let's extend this example and add more details to see how to test different parts.

### Extended FastAPI app file

Continuing with the same file structure:

```
.
├── app
│   ├── __init__.py
│   ├── main.py
│   └── test_main.py
```

Assuming `main.py` has additional path operations, including a `GET` operation that could return an error and a `POST` operation that could return several errors, both requiring an `X-Token` header.

```Python
{!> ../../docs_src/app_testing/app_b_an_py310/main.py!}
```

```Python
{!> ../../docs_src/app_testing/app_b_an_py39/main.py!}
```

```Python
{!> ../../docs_src/app_testing/app_b_an/main.py!}
```

```Python
{!> ../../docs_src/app_testing/app_b_py310/main.py!}
```

```Python
{!> ../../docs_src/app_testing/app_b/main.py!}
```

### Extended testing file

Update `test_main.py` with the extended tests:

```Python
{!> ../../docs_src/app_testing/app_b/test_main.py!}
```

To pass information in the request, refer to HTTPX or Requests documentation. For example:

- To pass a path or query parameter, add it to the URL.
- To pass a JSON body, pass a Python object (e.g., a dict) to the `json` parameter.
- For Form Data, use the `data` parameter.
- For headers, use a dict in the `headers` parameter.
- For cookies, use a dict in the `cookies` parameter.

For more information about passing data to the backend, check the HTTPX documentation.

Note that the `TestClient` receives data that can be converted to JSON, not Pydantic models. If you have a Pydantic model in your test, use the `jsonable_encoder` described in JSON Compatible Encoder.

## Run it

After that, install `pytest`. Create a virtual environment, activate it, and install it:

```
$ pip install pytest
```

It will detect the files and tests automatically, execute them, and report the results. Run the tests with:

```
$ pytest

================ test session starts ================
platform linux -- Python 3.6.9, pytest-5.3.5, py-1.8.1, pluggy-0.13.1
rootdir: /home/user/code/superawesome-cli/app
plugins: forked-1.1.3, xdist-1.31.0, cov-2.8.1
collected 6 items

test_main.py ......                            [100%]

================= 1 passed in 0.03s =================
```

# Virtual Environments

When working on Python projects, it is advisable to use a **virtual environment** to isolate the packages installed for each project.

## Create a Project

1. Create a directory for your project:
   ```console
   $ cd
   $ mkdir code
   $ cd code
   $ mkdir awesome-project
   $ cd awesome-project
   ```

## Create a Virtual Environment

Create a virtual environment **inside your project**:
```console
$ python -m venv .venv
```

### Alternative with `uv`
If you have `uv` installed:
```console
$ uv venv
```

## Activate the Virtual Environment

Activate the virtual environment to ensure any Python command or package installation uses it.

### Linux, macOS
```console
$ source .venv/bin/activate
```

### Windows PowerShell
```console
$ .venv\Scripts\Activate.ps1
```

### Windows Bash
```console
$ source .venv/Scripts/activate
```

## Check the Virtual Environment is Active

To verify the virtual environment is active:

### Linux, macOS, Windows Bash
```console
$ which python
```

### Windows PowerShell
```console
$ Get-Command python
```

## Upgrade `pip`

To upgrade `pip`:
```console
$ python -m pip install --upgrade pip
```

## Add `.gitignore`

To exclude the `.venv` directory from Git:
```console
$ echo "*" > .venv/.gitignore
```

## Install Packages

After activating the environment, install packages as needed.

### Install Packages Directly
Using `pip`:
```console
$ pip install "fastapi[standard]"
```

Using `uv`:
```console
$ uv pip install "fastapi[standard]"
```

### Install from `requirements.txt`
Using `pip`:
```console
$ pip install -r requirements.txt
```

Using `uv`:
```console
$ uv pip install -r requirements.txt
```

## Run Your Program

Run your program using the Python from the virtual environment:
```console
$ python main.py
```

## Configure Your Editor

Configure your editor to use the virtual environment for features like autocompletion and inline errors.

## Deactivate the Virtual Environment

To deactivate the virtual environment:
```console
$ deactivate
```

## Why Virtual Environments

Virtual environments prevent conflicts between package versions across different projects. Each project can maintain its own dependencies without affecting others.

## What are Virtual Environments

A virtual environment is a directory where you can install packages specific to a project, avoiding global environment conflicts.

## What Does Activating a Virtual Environment Mean

Activating a virtual environment modifies the `PATH` variable, prioritizing the virtual environment's Python interpreter.

## Checking a Virtual Environment

To check if a virtual environment is active, use:
```console
$ which python
```
or
```console
$ Get-Command python
```

## Why Deactivate a Virtual Environment

Deactivate the virtual environment when switching projects to avoid using the wrong Python interpreter.

## Alternatives

For managing virtual environments and dependencies, consider using `uv`, which simplifies the process of managing projects.

## Conclusion

Understanding virtual environments enhances your ability to manage dependencies effectively, leading to fewer conflicts and smoother development experiences.
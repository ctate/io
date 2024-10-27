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
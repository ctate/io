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
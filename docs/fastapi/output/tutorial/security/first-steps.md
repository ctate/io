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
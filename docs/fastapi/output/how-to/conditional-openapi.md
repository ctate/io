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
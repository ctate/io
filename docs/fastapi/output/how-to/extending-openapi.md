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
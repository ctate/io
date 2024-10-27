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
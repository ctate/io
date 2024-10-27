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
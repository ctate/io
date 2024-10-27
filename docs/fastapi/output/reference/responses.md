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
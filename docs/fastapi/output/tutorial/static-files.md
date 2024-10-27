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
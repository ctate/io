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
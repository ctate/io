# Header Parameters

You can define Header parameters similarly to `Query`, `Path`, and `Cookie` parameters.

## Import `Header`

First, import `Header`:

**Python 3.10+**
```Python
from fastapi import Header
```

**Python 3.9+**
```Python
from fastapi import Header
```

**Python 3.8+**
```Python
from fastapi import Header
```

**Python 3.10+ non-Annotated**
*Tip: Prefer to use the `Annotated` version if possible.*

```Python
from fastapi import Header
```

**Python 3.8+ non-Annotated**
*Tip: Prefer to use the `Annotated` version if possible.*

```Python
from fastapi import Header
```

## Declare `Header` parameters

Declare the header parameters using the same structure as with `Path`, `Query`, and `Cookie`. You can define the default value and any extra validation or annotation parameters:

**Python 3.10+**
```Python
@api.get("/items/")
async def read_items(x_token: str = Header(...)):
```

**Python 3.9+**
```Python
@api.get("/items/")
async def read_items(x_token: str = Header(...)):
```

**Python 3.8+**
```Python
@api.get("/items/")
async def read_items(x_token: str = Header(...)):
```

**Python 3.10+ non-Annotated**
*Tip: Prefer to use the `Annotated` version if possible.*

```Python
@api.get("/items/")
async def read_items(x_token: str = Header(...)):
```

**Python 3.8+ non-Annotated**
*Tip: Prefer to use the `Annotated` version if possible.*

```Python
@api.get("/items/")
async def read_items(x_token: str = Header(...)):
```

## Technical Details

`Header` is a "sister" class of `Path`, `Query`, and `Cookie`, inheriting from the common `Param` class. When importing `Query`, `Path`, `Header`, and others from `fastapi`, they are functions returning special classes.

To declare headers, use `Header`; otherwise, parameters will be interpreted as query parameters.

## Automatic conversion

`Header` provides additional functionality. Standard headers are separated by a hyphen (`-`), but a variable like `user-agent` is invalid in Python. By default, `Header` converts parameter names from underscore (`_`) to hyphen (`-`). HTTP headers are case-insensitive, allowing you to declare them in snake_case.

To disable automatic conversion of underscores to hyphens, set the `convert_underscores` parameter of `Header` to `False`:

**Python 3.10+**
```Python
@api.get("/items/")
async def read_items(user_agent: str = Header(..., convert_underscores=False)):
```

**Python 3.9+**
```Python
@api.get("/items/")
async def read_items(user_agent: str = Header(..., convert_underscores=False)):
```

**Python 3.8+**
```Python
@api.get("/items/")
async def read_items(user_agent: str = Header(..., convert_underscores=False)):
```

**Python 3.10+ non-Annotated**
*Tip: Prefer to use the `Annotated` version if possible.*

```Python
@api.get("/items/")
async def read_items(user_agent: str = Header(..., convert_underscores=False)):
```

**Python 3.8+ non-Annotated**
*Tip: Prefer to use the `Annotated` version if possible.*

```Python
@api.get("/items/")
async def read_items(user_agent: str = Header(..., convert_underscores=False)):
```

*Warning: Before setting `convert_underscores` to `False`, note that some HTTP proxies and servers disallow headers with underscores.*

## Duplicate headers

You can receive duplicate headers, meaning the same header with multiple values. Define these cases using a list in the type declaration. You will receive all values from the duplicate header as a Python list.

For example, to declare a header `X-Token` that can appear multiple times:

**Python 3.10+**
```Python
@api.get("/items/")
async def read_items(x_token: list[str] = Header(...)):
```

**Python 3.9+**
```Python
@api.get("/items/")
async def read_items(x_token: list[str] = Header(...)):
```

**Python 3.8+**
```Python
@api.get("/items/")
async def read_items(x_token: list[str] = Header(...)):
```

**Python 3.10+ non-Annotated**
*Tip: Prefer to use the `Annotated` version if possible.*

```Python
@api.get("/items/")
async def read_items(x_token: list[str] = Header(...)):
```

**Python 3.9+ non-Annotated**
*Tip: Prefer to use the `Annotated` version if possible.*

```Python
@api.get("/items/")
async def read_items(x_token: list[str] = Header(...)):
```

**Python 3.8+ non-Annotated**
*Tip: Prefer to use the `Annotated` version if possible.*

```Python
@api.get("/items/")
async def read_items(x_token: list[str] = Header(...)):
```

If you send two HTTP headers like:

```
X-Token: foo
X-Token: bar
```

The response would be:

```JSON
{
    "X-Token values": [
        "bar",
        "foo"
    ]
}
```

## Recap

Declare headers with `Header`, using the same common pattern as `Query`, `Path`, and `Cookie`. FastAPI will handle the conversion of underscores in your variables.
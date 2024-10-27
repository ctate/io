# Cookie Parameters

You can define Cookie parameters similarly to how you define Query and Path parameters.

## Import Cookie

First, import Cookie:

**Python 3.10+**
```Python
from fastapi import Cookie
```

**Python 3.9+**
```Python
from fastapi import Cookie
```

**Python 3.8+**
```Python
from fastapi import Cookie
```

**Python 3.10+ non-Annotated**
*Tip: Prefer to use the Annotated version if possible.*
```Python
from fastapi import Cookie
```

**Python 3.8+ non-Annotated**
*Tip: Prefer to use the Annotated version if possible.*
```Python
from fastapi import Cookie
```

## Declare Cookie Parameters

Then declare the cookie parameters using the same structure as with Path and Query. You can define the default value as well as any extra validation or annotation parameters:

**Python 3.10+**
```Python
@app.get("/")
async def read_item(item: str = Cookie(...)):
    return {"item": item}
```

**Python 3.9+**
```Python
@app.get("/")
async def read_item(item: str = Cookie(...)):
    return {"item": item}
```

**Python 3.8+**
```Python
@app.get("/")
async def read_item(item: str = Cookie(...)):
    return {"item": item}
```

**Python 3.10+ non-Annotated**
*Tip: Prefer to use the Annotated version if possible.*
```Python
@app.get("/")
async def read_item(item: str = Cookie(...)):
    return {"item": item}
```

**Python 3.8+ non-Annotated**
*Tip: Prefer to use the Annotated version if possible.*
```Python
@app.get("/")
async def read_item(item: str = Cookie(...)):
    return {"item": item}
```

## Technical Details

Cookie is a "sister" class of Path and Query. It also inherits from the same common Param class. When you import Query, Path, Cookie, and others from fastapi, those are actually functions that return special classes.

## Info

To declare cookies, you need to use Cookie; otherwise, the parameters would be interpreted as query parameters.

## Recap

Declare cookies with Cookie, using the same common pattern as Query and Path.
# Path Parameters and Numeric Validations

You can declare validations and metadata for path parameters using `Path`, similar to how you do for query parameters with `Query`.

## Import Path

Import `Path` from `fastapi`, and import `Annotated`:

```Python
from fastapi import Path
from typing import Annotated
```

## Declare Metadata

You can declare parameters for `Path` just like for `Query`. For example, to declare a `title` metadata value for the path parameter `item_id`:

```Python
item_id: int = Path(..., title="The ID of the item to retrieve")
```

A path parameter is always required as it must be part of the path.

## Order the Parameters as Needed

You can declare parameters in any order. For example, if you want to declare a required `str` query parameter `q` and a path parameter `item_id`:

```Python
def read_item(q: str, item_id: int = Path(...)):
    return {"item_id": item_id, "q": q}
```

If using `Annotated`, the order does not matter.

## Number Validations: Greater Than or Equal

You can declare number constraints with `ge` (greater than or equal):

```Python
item_id: int = Path(..., ge=1)
```

## Number Validations: Greater Than and Less Than or Equal

You can also use `gt` (greater than) and `le` (less than or equal):

```Python
item_id: int = Path(..., gt=1, le=10)
```

## Number Validations: Floats, Greater Than and Less Than

Number validations also apply to `float` values. For example, to require a value greater than `0`:

```Python
value: float = Path(..., gt=0)
```

## Recap

With `Query`, `Path`, and others, you can declare metadata and validations:

- `gt`: greater than
- `ge`: greater than or equal
- `lt`: less than
- `le`: less than or equal

`Query`, `Path`, and similar classes are functions that return instances of classes with the same name, allowing for better type handling in editors.
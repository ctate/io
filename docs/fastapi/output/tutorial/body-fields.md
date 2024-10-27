# Body - Fields

You can declare additional validation and metadata in path operation function parameters with `Query`, `Path`, and `Body`, as well as inside Pydantic models using Pydantic's `Field`.

## Import `Field`

First, import `Field`:

```Python
# Python 3.10+
from pydantic import Field

# Python 3.9+
from pydantic import Field

# Python 3.8+
from pydantic import Field
```

Prefer to use the `Annotated` version if possible.

```Python
# Python 3.10+ non-Annotated
from pydantic import Field

# Python 3.8+ non-Annotated
from pydantic import Field
```

**Note:** `Field` is imported directly from `pydantic`, not from `fastapi` like `Query`, `Path`, `Body`, etc.

## Declare model attributes

You can use `Field` with model attributes:

```Python
# Python 3.10+
from pydantic import BaseModel, Field

# Python 3.9+
from pydantic import BaseModel, Field

# Python 3.8+
from pydantic import BaseModel, Field
```

Prefer to use the `Annotated` version if possible.

```Python
# Python 3.10+ non-Annotated
from pydantic import BaseModel, Field

# Python 3.8+ non-Annotated
from pydantic import BaseModel, Field
```

`Field` works similarly to `Query`, `Path`, and `Body`, sharing the same parameters.

**Technical Details:** `Query`, `Path`, and others create objects of subclasses of a common `Param` class, which is a subclass of Pydantic's `FieldInfo` class. Pydantic's `Field` returns an instance of `FieldInfo`. `Body` also returns objects of a subclass of `FieldInfo`. When importing `Query`, `Path`, and others from `fastapi`, those are functions that return special classes.

**Tip:** Each model's attribute with a type, default value, and `Field` has the same structure as a path operation function's parameter, using `Field` instead of `Path`, `Query`, and `Body`.

## Add extra information

You can declare extra information in `Field`, `Query`, `Body`, etc., which will be included in the generated JSON Schema. More details on adding extra information will be provided later in the documentation.

**Warning:** Extra keys passed to `Field` will also appear in the resulting OpenAPI schema. Some OpenAPI tools may not work with your generated schema if these keys are not part of the OpenAPI specification.

## Recap

Use Pydantic's `Field` to declare extra validations and metadata for model attributes. You can also use extra keyword arguments to pass additional JSON Schema metadata.
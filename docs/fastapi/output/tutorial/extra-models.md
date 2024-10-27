# Extra Models

It is common to have multiple related models, especially for user models:

- The **input model** requires a password.
- The **output model** should exclude the password.
- The **database model** typically needs a hashed password.

**Warning:** Never store plaintext passwords. Always store a "secure hash" for verification.

## Multiple Models

Here’s a general idea of how the models could look with their password fields:

**Python 3.10+ Example:**
```Python
{!> ../../docs_src/extra_models/tutorial001_py310.py!}
```

**Python 3.8+ Example:**
```Python
{!> ../../docs_src/extra_models/tutorial001.py!}
```

**Note:** In Pydantic v1, the method was called `.dict()`, which is deprecated in Pydantic v2 and renamed to `.model_dump()`. Use `.model_dump()` if using Pydantic v2.

### About `**user_in.dict()`

`user_in` is a Pydantic model of class `UserIn`. Pydantic models have a `.dict()` method that returns a `dict` with the model's data.

Example:
```Python
user_in = UserIn(username="john", password="secret", email="john.doe@example.com")
user_dict = user_in.dict()
```

Output:
```Python
{
    'username': 'john',
    'password': 'secret',
    'email': 'john.doe@example.com',
    'full_name': None,
}
```

**Unwrapping a `dict`:**
Passing `user_dict` to a function with `**user_dict` unwraps it into key-value arguments:
```Python
UserInDB(**user_dict)
```

**Creating a Pydantic model from another:**
```Python
user_dict = user_in.dict()
UserInDB(**user_dict)
```

**Adding extra keyword arguments:**
```Python
UserInDB(**user_in.dict(), hashed_password=hashed_password)
```

**Warning:** The supporting functions `fake_password_hasher` and `fake_save_user` are for demonstration only and do not provide real security.

## Reduce Duplication

Reducing code duplication is essential in FastAPI to minimize bugs and security issues. Models can share data and attribute names by declaring a `UserBase` model as a base for other models.

**Python 3.10+ Example:**
```Python
{!> ../../docs_src/extra_models/tutorial002_py310.py!}
```

**Python 3.8+ Example:**
```Python
{!> ../../docs_src/extra_models/tutorial002.py!}
```

## `Union` or `anyOf`

You can declare a response as the `Union` of two or more types, defined in OpenAPI with `anyOf`. Use `typing.Union`:

**Note:** Include the most specific type first in `Union`.

**Python 3.10+ Example:**
```Python
{!> ../../docs_src/extra_models/tutorial003_py310.py!}
```

**Python 3.8+ Example:**
```Python
{!> ../../docs_src/extra_models/tutorial003.py!}
```

### `Union` in Python 3.10

When passing `Union[PlaneItem, CarItem]` as an argument value, use `Union` instead of the vertical bar for type annotations.

## List of Models

Declare responses of lists of objects using `typing.List` (or `list` in Python 3.9+):

**Python 3.9+ Example:**
```Python
{!> ../../docs_src/extra_models/tutorial004_py39.py!}
```

**Python 3.8+ Example:**
```Python
{!> ../../docs_src/extra_models/tutorial004.py!}
```

## Response with Arbitrary `dict`

Declare a response using a plain arbitrary `dict` with `typing.Dict` (or `dict` in Python 3.9+):

**Python 3.9+ Example:**
```Python
{!> ../../docs_src/extra_models/tutorial005_py39.py!}
```

**Python 3.8+ Example:**
```Python
{!> ../../docs_src/extra_models/tutorial005.py!}
```

## Recap

Utilize multiple Pydantic models and inheritance for different states of an entity, such as a user with variations including `password`, `password_hash`, and no password.
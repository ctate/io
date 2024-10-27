# Python Types Intro

Python supports optional "type hints" (also called "type annotations"). These type hints allow declaring the type of a variable, enhancing editor and tool support.

This tutorial covers the essentials of Python type hints, particularly in the context of FastAPI, which leverages these hints for various advantages.

## Motivation

Consider a simple function that takes `first_name` and `last_name`, converts the first letter of each to uppercase, and concatenates them. Without type hints, you may struggle with method names and autocompletion. Adding type hints improves editor support and error checking.

### Edit it

Modify the function parameters from:

```Python
    first_name, last_name
```

to:

```Python
    first_name: str, last_name: str
```

This change introduces type hints, enhancing autocompletion and error detection.

## Declaring Types

Type hints can be declared primarily in function parameters. You can use standard Python types such as:

- `int`
- `float`
- `bool`
- `bytes`

### Generic Types with Type Parameters

Generic types like `dict`, `list`, `set`, and `tuple` can have internal types. Use the `typing` module to declare these types.

#### Newer Versions of Python

From Python 3.6 onwards, the syntax is compatible with all versions, including 3.9 and 3.10. Newer versions simplify type annotations, allowing you to use built-in types directly.

#### List

To define a variable as a list of strings:

**Python 3.9+**

```Python
items: list[str]
```

**Python 3.8+**

```Python
from typing import List
items: List[str]
```

#### Tuple and Set

Declare tuples and sets similarly:

**Python 3.9+**

```Python
items_t: tuple[int, int, str]
items_s: set[bytes]
```

**Python 3.8+**

```Python
from typing import Tuple, Set
items_t: Tuple[int, int, str]
items_s: Set[bytes]
```

#### Dict

To define a dictionary:

**Python 3.9+**

```Python
prices: dict[str, float]
```

**Python 3.8+**

```Python
from typing import Dict
prices: Dict[str, float]
```

#### Union

Declare a variable that can be multiple types using `Union`:

**Python 3.10+**

```Python
item: int | str
```

**Python 3.8+**

```Python
from typing import Union
item: Union[int, str]
```

#### Possibly `None`

To indicate a value could be a specific type or `None`, use `Optional`:

```Python
from typing import Optional
name: Optional[str]
```

In Python 3.10, you can use:

```Python
name: str | None
```

#### Using `Union` or `Optional`

For versions below 3.10, prefer `Union[SomeType, None]` over `Optional[SomeType]` for clarity.

#### Generic Types

Generic types can be used with built-in types and from the `typing` module:

**Python 3.10+**

```Python
items: list[str]
```

**Python 3.8+**

```Python
from typing import List
items: List[str]
```

### Classes as Types

You can declare a class as the type of a variable. For example, if you have a class `Person`, you can declare:

```Python
one_person: Person
```

## Pydantic Models

Pydantic is a library for data validation, allowing you to define data shapes as classes with typed attributes. FastAPI is built on Pydantic, leveraging its capabilities for data validation and conversion.

## Type Hints with Metadata Annotations

Python allows adding metadata to type hints using `Annotated`.

**Python 3.9+**

```Python
from typing import Annotated
```

In versions below 3.9, import `Annotated` from `typing_extensions`.

## Type Hints in FastAPI

FastAPI utilizes type hints for:

- Editor support
- Type checks
- Defining requirements for request parameters
- Data conversion and validation
- API documentation using OpenAPI

By using standard Python types, FastAPI simplifies development and enhances functionality.
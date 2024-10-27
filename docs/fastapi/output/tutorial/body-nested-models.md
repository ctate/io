# Body - Nested Models

With FastAPI, you can define, validate, document, and use arbitrarily deeply nested models (thanks to Pydantic).

## List fields

You can define an attribute to be a subtype, such as a Python list. This will make `tags` a list, although it doesn't declare the type of the elements.

## List fields with type parameter

Python has a specific way to declare lists with internal types, or "type parameters":

### Import typing's List

In Python 3.9 and above, you can use the standard `list` for type annotations. In Python versions before 3.9, import `List` from the `typing` module.

### Declare a list with a type parameter

To declare types with type parameters, like `list`, `dict`, `tuple`:

- For Python versions lower than 3.9, import their equivalent from the `typing` module.
- Pass the internal type(s) as "type parameters" using square brackets.

In Python 3.9:
```Python
my_list: list[str]
```
In versions before 3.9:
```Python
from typing import List
my_list: List[str]
```

Use this standard syntax for model attributes with internal types. For example, `tags` can be a "list of strings".

## Set types

If tags shouldn't repeat, declare `tags` as a set of strings. This will convert duplicate data to a set of unique items.

## Nested Models

Each attribute of a Pydantic model has a type, which can be another Pydantic model. You can declare deeply nested JSON objects with specific attribute names, types, and validations.

### Define a submodel

For example, define an `Image` model.

### Use the submodel as a type

You can use it as the type of an attribute. FastAPI will expect a body similar to:
```JSON
{
    "name": "Foo",
    "description": "The pretender",
    "price": 42.0,
    "tax": 3.2,
    "tags": ["rock", "metal", "bar"],
    "image": {
        "url": "http://example.com/baz.jpg",
        "name": "The Foo live"
    }
}
```
This provides editor support, data conversion, validation, and automatic documentation.

## Special types and validation

You can use complex singular types that inherit from `str`. For example, declare a `url` field as an instance of Pydantic's `HttpUrl` instead of a `str`. The string will be checked to be a valid URL.

## Attributes with lists of submodels

You can use Pydantic models as subtypes of `list`, `set`, etc. This will expect a JSON body like:
```JSON
{
    "name": "Foo",
    "description": "The pretender",
    "price": 42.0,
    "tax": 3.2,
    "tags": ["rock", "metal", "bar"],
    "images": [
        {
            "url": "http://example.com/baz.jpg",
            "name": "The Foo live"
        },
        {
            "url": "http://example.com/dave.jpg",
            "name": "The Baz"
        }
    ]
}
```

## Deeply nested models

You can define arbitrarily deeply nested models.

## Bodies of pure lists

If the top-level value of the JSON body is a JSON array, declare the type in the function parameter:
```Python
images: List[Image]
```
or in Python 3.9 and above:
```Python
images: list[Image]
```

## Editor support everywhere

You get editor support for items inside lists. Incoming dicts are converted automatically, and your output is converted to JSON.

## Bodies of arbitrary dicts

You can declare a body as a dict with keys of some type and values of another type. This is useful for receiving keys that you don't already know. For example, accept any dict with `int` keys and `float` values:
```Python
weights: Dict[int, float]
```

Keep in mind that JSON only supports `str` as keys, but Pydantic will convert and validate them.

## Recap

With FastAPI, you have maximum flexibility provided by Pydantic models, while keeping your code simple, short, and elegant. Benefits include:

- Editor support
- Data conversion
- Data validation
- Schema documentation
- Automatic docs
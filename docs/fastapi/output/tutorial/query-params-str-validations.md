# Query Parameters and String Validations

FastAPI allows you to declare additional information and validation for your parameters.

## Example Application

The query parameter `q` is of type `Union[str, None]` (or `str | None` in Python 3.10), meaning it can be a `str` or `None`, with a default value of `None`, indicating it's not required.

## Additional Validation

We will enforce that if `q` is provided, its length does not exceed 50 characters.

### Import `Query` and `Annotated`

Import:
- `Query` from `fastapi`
- `Annotated` from `typing` (or `typing_extensions` in Python below 3.9)

### Use `Annotated` in the Type for the `q` Parameter

Wrap the type annotation with `Annotated`:

```Python
q: Annotated[str | None] = None
```

or for Python 3.8:

```Python
q: Annotated[Union[str, None]] = None
```

### Add `Query` to `Annotated` in the `q` Parameter

Add `Query` inside `Annotated` and set `max_length` to `50`:

```Python
q: Annotated[str | None, Query(max_length=50)] = None
```

or for Python 3.8:

```Python
q: Annotated[Union[str, None], Query(max_length=50)] = None
```

FastAPI will validate the data, show a clear error for invalid data, and document the parameter in the OpenAPI schema.

## Alternative (Old): `Query` as the Default Value

In older versions of FastAPI, you would use `Query` as the default value:

```Python
q: Union[str, None] = Query(default=None, max_length=50)
```

or for Python 3.10:

```Python
q: str | None = Query(default=None, max_length=50)
```

## Add More Validations

You can also add a `min_length`:

```Python
q: Annotated[str | None, Query(min_length=3, max_length=50)] = None
```

or for Python 3.8:

```Python
q: Annotated[Union[str, None], Query(min_length=3, max_length=50)] = None
```

## Add Regular Expressions

Define a `pattern` that the parameter should match:

```Python
q: Annotated[str | None, Query(pattern="^fixedquery$")] = None
```

or for Python 3.8:

```Python
q: Annotated[Union[str, None], Query(pattern="^fixedquery$")] = None
```

## Default Values

You can use default values other than `None`:

```Python
q: Annotated[str, Query(min_length=3, default="fixedquery")] = "fixedquery"
```

or for Python 3.8:

```Python
q: Union[str, None] = Query(default="fixedquery", min_length=3)
```

## Required Parameters

To make `q` required, simply omit the default value:

```Python
q: Annotated[str, Query(min_length=3)]
```

or for Python 3.8:

```Python
q: Union[str, None] = Query(min_length=3)
```

### Required with Ellipsis (`...`)

You can explicitly declare that a value is required by setting the default to `...`:

```Python
q: Annotated[str, Query(...)]
```

or for Python 3.8:

```Python
q: Union[str, None] = Query(...)
```

## Query Parameter List / Multiple Values

To declare a query parameter that can appear multiple times:

```Python
q: Annotated[list[str], Query()]
```

or for Python 3.8:

```Python
q: list[str] = Query()
```

## Declare More Metadata

You can add more information about the parameter, such as `title` and `description`:

```Python
q: Annotated[str, Query(title="Query Parameter", description="This is a query parameter.")]
```

or for Python 3.8:

```Python
q: Union[str, None] = Query(title="Query Parameter", description="This is a query parameter.")
```

## Alias Parameters

To use an alias for a parameter:

```Python
q: Annotated[str, Query(alias="item-query")]
```

or for Python 3.8:

```Python
q: Union[str, None] = Query(alias="item-query")
```

## Deprecating Parameters

To mark a parameter as deprecated:

```Python
q: Annotated[str, Query(deprecated=True)]
```

or for Python 3.8:

```Python
q: Union[str, None] = Query(deprecated=True)
```

## Exclude Parameters from OpenAPI

To exclude a query parameter from the OpenAPI schema:

```Python
q: Annotated[str, Query(include_in_schema=False)]
```

or for Python 3.8:

```Python
q: Union[str, None] = Query(include_in_schema=False)
```

## Recap

You can declare additional validations and metadata for your parameters, including:
- Generic validations: `alias`, `title`, `description`, `deprecated`
- Validations specific for strings: `min_length`, `max_length`, `pattern`
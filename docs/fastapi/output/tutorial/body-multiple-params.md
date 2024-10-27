# Body - Multiple Parameters

## Mix `Path`, `Query` and body parameters

You can mix `Path`, `Query`, and request body parameter declarations freely, and FastAPI will handle them appropriately. Body parameters can be declared as optional by setting the default to `None`.

### Python 3.10+

```Python
{!> ../../docs_src/body_multiple_params/tutorial001_an_py310.py!}
```

### Python 3.9+

```Python
{!> ../../docs_src/body_multiple_params/tutorial001_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/body_multiple_params/tutorial001_an.py!}
```

### Python 3.10+ non-Annotated

```Python
{!> ../../docs_src/body_multiple_params/tutorial001_py310.py!}
```

### Python 3.8+ non-Annotated

```Python
{!> ../../docs_src/body_multiple_params/tutorial001.py!}
```

Note: The `item` from the body is optional due to its `None` default value.

## Multiple body parameters

You can declare multiple body parameters, such as `item` and `user`. FastAPI will use the parameter names as keys in the body.

### Python 3.10+

```Python
{!> ../../docs_src/body_multiple_params/tutorial002_py310.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/body_multiple_params/tutorial002.py!}
```

Expected body format:

```JSON
{
    "item": {
        "name": "Foo",
        "description": "The pretender",
        "price": 42.0,
        "tax": 3.2
    },
    "user": {
        "username": "dave",
        "full_name": "Dave Grohl"
    }
}
```

FastAPI will automatically convert and validate the data.

## Singular values in body

To add a singular value like `importance` to the body, use `Body` to specify it as a body key.

### Python 3.10+

```Python
{!> ../../docs_src/body_multiple_params/tutorial003_an_py310.py!}
```

### Python 3.9+

```Python
{!> ../../docs_src/body_multiple_params/tutorial003_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/body_multiple_params/tutorial003_an.py!}
```

### Python 3.10+ non-Annotated

```Python
{!> ../../docs_src/body_multiple_params/tutorial003_py310.py!}
```

### Python 3.8+ non-Annotated

```Python
{!> ../../docs_src/body_multiple_params/tutorial003.py!}
```

Expected body format:

```JSON
{
    "item": {
        "name": "Foo",
        "description": "The pretender",
        "price": 42.0,
        "tax": 3.2
    },
    "user": {
        "username": "dave",
        "full_name": "Dave Grohl"
    },
    "importance": 5
}
```

## Multiple body params and query

You can declare additional query parameters alongside body parameters. Singular values are interpreted as query parameters by default.

### Python 3.10+

```Python
{!> ../../docs_src/body_multiple_params/tutorial004_an_py310.py!}
```

### Python 3.9+

```Python
{!> ../../docs_src/body_multiple_params/tutorial004_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/body_multiple_params/tutorial004_an.py!}
```

### Python 3.10+ non-Annotated

```Python
{!> ../../docs_src/body_multiple_params/tutorial004_py310.py!}
```

### Python 3.8+ non-Annotated

```Python
{!> ../../docs_src/body_multiple_params/tutorial004.py!}
```

Body also has validation and metadata parameters similar to `Query` and `Path`.

## Embed a single body parameter

To expect a JSON with a key `item` containing the model contents, use `Body(embed=True)`.

### Python 3.10+

```Python
{!> ../../docs_src/body_multiple_params/tutorial005_an_py310.py!}
```

### Python 3.9+

```Python
{!> ../../docs_src/body_multiple_params/tutorial005_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/body_multiple_params/tutorial005_an.py!}
```

### Python 3.10+ non-Annotated

```Python
{!> ../../docs_src/body_multiple_params/tutorial005_py310.py!}
```

### Python 3.8+ non-Annotated

```Python
{!> ../../docs_src/body_multiple_params/tutorial005.py!}
```

Expected body format:

```JSON
{
    "item": {
        "name": "Foo",
        "description": "The pretender",
        "price": 42.0,
        "tax": 3.2
    }
}
```

## Recap

You can add multiple body parameters to your path operation function. FastAPI will handle the data correctly, validate it, and document the schema. You can also declare singular values as part of the body and embed the body in a key even with a single parameter.
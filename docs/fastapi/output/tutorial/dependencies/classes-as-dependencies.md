# Classes as Dependencies

Before diving deeper into the Dependency Injection system, let's upgrade the previous example.

## A `dict` from the previous example

In the previous example, we were returning a `dict` from our dependency ("dependable"):

```Python
# Python 3.10+
{!> ../../docs_src/dependencies/tutorial001_an_py310.py!}

# Python 3.9+
{!> ../../docs_src/dependencies/tutorial001_an_py39.py!}

# Python 3.8+
{!> ../../docs_src/dependencies/tutorial001_an.py!}

# Python 3.10+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/dependencies/tutorial001_py310.py!}

# Python 3.8+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/dependencies/tutorial001.py!}
```

But then we get a `dict` in the parameter `commons` of the path operation function. Editors can't provide a lot of support (like completion) for `dict`s, because they can't know their keys and value types. We can do better...

## What makes a dependency

Dependencies can be declared as functions or other callables. A "callable" in Python is anything that can be executed like a function.

For example:

```Python
class Cat:
    def __init__(self, name: str):
        self.name = name

fluffy = Cat(name="Mr Fluffy")
```

In this case, `fluffy` is an instance of the class `Cat`, and to create `fluffy`, you are "calling" `Cat`. Thus, a Python class is also a callable.

In FastAPI, you can use a Python class as a dependency. FastAPI checks if it is a callable and analyzes the parameters for that callable, processing them similarly to the parameters for a path operation function, including sub-dependencies.

We can change the dependency "dependable" `common_parameters` to the class `CommonQueryParams`:

```Python
# Python 3.10+
{!> ../../docs_src/dependencies/tutorial002_an_py310.py!}

# Python 3.9+
{!> ../../docs_src/dependencies/tutorial002_an_py39.py!}

# Python 3.8+
{!> ../../docs_src/dependencies/tutorial002_an.py!}

# Python 3.10+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/dependencies/tutorial002_py310.py!}

# Python 3.8+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/dependencies/tutorial002.py!}
```

Pay attention to the `__init__` method used to create the instance of the class:

```Python
# Python 3.10+
{!> ../../docs_src/dependencies/tutorial002_an_py310.py!}

# Python 3.9+
{!> ../../docs_src/dependencies/tutorial002_an_py39.py!}

# Python 3.8+
{!> ../../docs_src/dependencies/tutorial002_an.py!}

# Python 3.10+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/dependencies/tutorial002_py310.py!}

# Python 3.8+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/dependencies/tutorial002.py!}
```

It has the same parameters as our previous `common_parameters`:

```Python
# Python 3.10+
{!> ../../docs_src/dependencies/tutorial001_an_py310.py!}

# Python 3.9+
{!> ../../docs_src/dependencies/tutorial001_an_py39.py!}

# Python 3.8+
{!> ../../docs_src/dependencies/tutorial001_an.py!}

# Python 3.10+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/dependencies/tutorial001_py310.py!}

# Python 3.8+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/dependencies/tutorial001.py!}
```

Those parameters are what FastAPI will use to "solve" the dependency. In both cases, it will have:

- An optional `q` query parameter that is a `str`.
- A `skip` query parameter that is an `int`, with a default of `0`.
- A `limit` query parameter that is an `int`, with a default of `100`.

In both cases, the data will be converted, validated, documented on the OpenAPI schema, etc.

## Use it

Now you can declare your dependency using this class:

```Python
# Python 3.10+
{!> ../../docs_src/dependencies/tutorial002_an_py310.py!}

# Python 3.9+
{!> ../../docs_src/dependencies/tutorial002_an_py39.py!}

# Python 3.8+
{!> ../../docs_src/dependencies/tutorial002_an.py!}

# Python 3.10+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/dependencies/tutorial002_py310.py!}

# Python 3.8+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/dependencies/tutorial002.py!}
```

FastAPI calls the `CommonQueryParams` class, creating an instance that will be passed as the parameter `commons` to your function.

## Type annotation vs `Depends`

Notice how we write `CommonQueryParams` twice in the above code:

```Python
commons: Annotated[CommonQueryParams, Depends(CommonQueryParams)]
```

```Python
commons: CommonQueryParams = Depends(CommonQueryParams)
```

The last `CommonQueryParams` in `Depends(CommonQueryParams)` is what FastAPI will use to know what the dependency is. It extracts the declared parameters and calls it.

The first `CommonQueryParams` in `commons: Annotated[CommonQueryParams, ...` does not have any special meaning for FastAPI. You could write:

```Python
commons: Annotated[Any, Depends(CommonQueryParams)]
```

```Python
commons = Depends(CommonQueryParams)
```

As in:

```Python
# Python 3.10+
{!> ../../docs_src/dependencies/tutorial003_an_py310.py!}

# Python 3.9+
{!> ../../docs_src/dependencies/tutorial003_an_py39.py!}

# Python 3.8+
{!> ../../docs_src/dependencies/tutorial003_an.py!}

# Python 3.10+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/dependencies/tutorial003_py310.py!}

# Python 3.8+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/dependencies/tutorial003.py!}
```

Declaring the type is encouraged for editor support with code completion and type checks.

## Shortcut

To avoid code repetition, FastAPI provides a shortcut for cases where the dependency is specifically a class that FastAPI will call to create an instance of the class itself.

Instead of writing:

```Python
commons: Annotated[CommonQueryParams, Depends(CommonQueryParams)]
```

```Python
commons: CommonQueryParams = Depends(CommonQueryParams)
```

You can write:

```Python
commons: Annotated[CommonQueryParams, Depends()]
```

```Python
commons: CommonQueryParams = Depends()
```

The same example would then look like:

```Python
# Python 3.10+
{!> ../../docs_src/dependencies/tutorial004_an_py310.py!}

# Python 3.9+
{!> ../../docs_src/dependencies/tutorial004_an_py39.py!}

# Python 3.8+
{!> ../../docs_src/dependencies/tutorial004_an.py!}

# Python 3.10+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/dependencies/tutorial004_py310.py!}

# Python 3.8+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/dependencies/tutorial004.py!}
```

FastAPI will know what to do. If that seems more confusing than helpful, disregard it; you don't need it. It is just a shortcut to minimize code repetition.
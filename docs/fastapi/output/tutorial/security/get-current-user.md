# Get Current User

In the previous chapter, the security system provided the path operation function with a `token` as a `str`.

## Create a User Model

First, create a Pydantic user model. Pydantic can be used to declare bodies and can be utilized elsewhere.

```Python
# Python 3.10+
{!> ../../docs_src/security/tutorial002_an_py310.py!}

# Python 3.9+
{!> ../../docs_src/security/tutorial002_an_py39.py!}

# Python 3.8+
{!> ../../docs_src/security/tutorial002_an.py!}

# Python 3.10+ non-Annotated
{!> ../../docs_src/security/tutorial002_py310.py!}

# Python 3.8+ non-Annotated
{!> ../../docs_src/security/tutorial002.py!}
```

## Create a `get_current_user` Dependency

Create a dependency `get_current_user`. This dependency will use the `oauth2_scheme` created earlier. It will receive a `token` as a `str` from the sub-dependency.

```Python
# Python 3.10+
{!> ../../docs_src/security/tutorial002_an_py310.py!}

# Python 3.9+
{!> ../../docs_src/security/tutorial002_an_py39.py!}

# Python 3.8+
{!> ../../docs_src/security/tutorial002_an.py!}

# Python 3.10+ non-Annotated
{!> ../../docs_src/security/tutorial002_py310.py!}

# Python 3.8+ non-Annotated
{!> ../../docs_src/security/tutorial002.py!}
```

## Get the User

`get_current_user` will utilize a utility function that takes a token as a `str` and returns the Pydantic `User` model.

```Python
# Python 3.10+
{!> ../../docs_src/security/tutorial002_an_py310.py!}

# Python 3.9+
{!> ../../docs_src/security/tutorial002_an_py39.py!}

# Python 3.8+
{!> ../../docs_src/security/tutorial002_an.py!}

# Python 3.10+ non-Annotated
{!> ../../docs_src/security/tutorial002_py310.py!}

# Python 3.8+ non-Annotated
{!> ../../docs_src/security/tutorial002.py!}
```

## Inject the Current User

Use `Depends` with `get_current_user` in the path operation.

```Python
# Python 3.10+
{!> ../../docs_src/security/tutorial002_an_py310.py!}

# Python 3.9+
{!> ../../docs_src/security/tutorial002_an_py39.py!}

# Python 3.8+
{!> ../../docs_src/security/tutorial002_an.py!}

# Python 3.10+ non-Annotated
{!> ../../docs_src/security/tutorial002_py310.py!}

# Python 3.8+ non-Annotated
{!> ../../docs_src/security/tutorial002.py!}
```

Declare the type of `current_user` as the Pydantic model `User` for completion and type checks.

The dependency system allows for multiple dependencies returning a `User` model.

## Other Models

You can retrieve the current user in path operation functions and manage security at the Dependency Injection level using `Depends`. You are not limited to a specific data model; any model or data can be used for security requirements.

## Code Size

This example may seem verbose due to the combination of security, data models, utility functions, and path operations. However, the security and dependency injection code is written once and can be reused across multiple endpoints.

Path operations can be concise:

```Python
# Python 3.10+
{!> ../../docs_src/security/tutorial002_an_py310.py!}

# Python 3.9+
{!> ../../docs_src/security/tutorial002_an_py39.py!}

# Python 3.8+
{!> ../../docs_src/security/tutorial002_an.py!}

# Python 3.10+ non-Annotated
{!> ../../docs_src/security/tutorial002_py310.py!}

# Python 3.8+ non-Annotated
{!> ../../docs_src/security/tutorial002.py!}
```

## Recap

You can now retrieve the current user directly in your path operation function. The next step is to add a path operation for the user/client to send the `username` and `password`.
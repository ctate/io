# Cookie Parameter Models

If you have a group of cookies that are related, you can create a Pydantic model to declare them. This allows you to re-use the model in multiple places and declare validations and metadata for all parameters at once.

Note: This is supported since FastAPI version 0.115.0.

Tip: This same technique applies to Query, Cookie, and Header.

## Cookies with a Pydantic Model

Declare the cookie parameters that you need in a Pydantic model, and then declare the parameter as Cookie:

Python 3.10+ Example:
```Python
{!> ../../docs_src/cookie_param_models/tutorial001_an_py310.py!}
```

Python 3.9+ Example:
```Python
{!> ../../docs_src/cookie_param_models/tutorial001_an_py39.py!}
```

Python 3.8+ Example:
```Python
{!> ../../docs_src/cookie_param_models/tutorial001_an.py!}
```

Python 3.10+ non-Annotated Example:
Tip: Prefer to use the Annotated version if possible.
```Python
{!> ../../docs_src/cookie_param_models/tutorial001_py310.py!}
```

Python 3.8+ non-Annotated Example:
Tip: Prefer to use the Annotated version if possible.
```Python
{!> ../../docs_src/cookie_param_models/tutorial001.py!}
```

FastAPI will extract the data for each field from the cookies received in the request and provide the Pydantic model you defined.

## Check the Docs

You can see the defined cookies in the docs UI at /docs. 

Info: Browsers handle cookies in special ways and do not easily allow JavaScript to access them. In the API docs UI at /docs, you will see the documentation for cookies for your path operations. However, even if you fill the data and click "Execute," the cookies won't be sent due to JavaScript limitations, resulting in an error message.

## Forbid Extra Cookies

In some special use cases, you might want to restrict the cookies that you want to receive. You can use Pydantic's model configuration to forbid any extra fields:

Python 3.9+ Example:
```Python
{!> ../../docs_src/cookie_param_models/tutorial002_an_py39.py!}
```

Python 3.8+ Example:
```Python
{!> ../../docs_src/cookie_param_models/tutorial002_an.py!}
```

Python 3.8+ non-Annotated Example:
Tip: Prefer to use the Annotated version if possible.
```Python
{!> ../../docs_src/cookie_param_models/tutorial002.py!}
```

If a client tries to send extra cookies, they will receive an error response. For example, if the client sends a `santa_tracker` cookie with a value of `good-list-please`, the client will receive an error response indicating that the `santa_tracker` cookie is not allowed:

```json
{
    "detail": [
        {
            "type": "extra_forbidden",
            "loc": ["cookie", "santa_tracker"],
            "msg": "Extra inputs are not permitted",
            "input": "good-list-please"
        }
    ]
}
```

## Summary

You can use Pydantic models to declare cookies in FastAPI.
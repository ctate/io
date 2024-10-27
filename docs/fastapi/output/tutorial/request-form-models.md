# Form Models

You can use Pydantic models to declare form fields in FastAPI.

To use forms, first install `python-multipart`. Make sure you create a virtual environment, activate it, and then install it:

```
$ pip install python-multipart
```

This is supported since FastAPI version `0.113.0`.

## Pydantic Models for Forms

Declare a Pydantic model with the fields you want to receive as form fields, and then declare the parameter as `Form`:

### Python 3.9+

```Python
{!> ../../docs_src/request_form_models/tutorial001_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/request_form_models/tutorial001_an.py!}
```

### Python 3.8+ non-Annotated

Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/request_form_models/tutorial001.py!}
```

FastAPI will extract the data for each field from the form data in the request and provide the Pydantic model you defined.

## Check the Docs

You can verify it in the docs UI at `/docs`.

## Forbid Extra Form Fields

In some cases, you might want to restrict the form fields to only those declared in the Pydantic model and forbid any extra fields. This is supported since FastAPI version `0.114.0`.

You can use Pydantic's model configuration to forbid any extra fields:

### Python 3.9+

```Python
{!> ../../docs_src/request_form_models/tutorial002_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/request_form_models/tutorial002_an.py!}
```

### Python 3.8+ non-Annotated

Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/request_form_models/tutorial002.py!}
```

If a client tries to send extra data, they will receive an error response. For example, if the client sends:

- `username`: `Rick`
- `password`: `Portal Gun`
- `extra`: `Mr. Poopybutthole`

They will receive an error response indicating that the field `extra` is not allowed:

```json
{
    "detail": [
        {
            "type": "extra_forbidden",
            "loc": ["body", "extra"],
            "msg": "Extra inputs are not permitted",
            "input": "Mr. Poopybutthole"
        }
    ]
}
```

## Summary

You can use Pydantic models to declare form fields in FastAPI.
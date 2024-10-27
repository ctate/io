# Header Parameter Models

To manage related **header parameters**, create a **Pydantic model**. This allows for **reusability** and the ability to declare validations and metadata for all parameters simultaneously.

**Note:** This feature is supported since FastAPI version `0.115.0`.

## Header Parameters with a Pydantic Model

Declare the **header parameters** in a **Pydantic model**, then declare the parameter as `Header`:

### Python 3.10+

```Python
{!> ../../docs_src/header_param_models/tutorial001_an_py310.py!}
```

### Python 3.9+

```Python
{!> ../../docs_src/header_param_models/tutorial001_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/header_param_models/tutorial001_an.py!}
```

### Python 3.10+ non-Annotated

**Tip:** Prefer using the `Annotated` version if possible.

```Python
{!> ../../docs_src/header_param_models/tutorial001_py310.py!}
```

### Python 3.9+ non-Annotated

**Tip:** Prefer using the `Annotated` version if possible.

```Python
{!> ../../docs_src/header_param_models/tutorial001_py39.py!}
```

### Python 3.8+ non-Annotated

**Tip:** Prefer using the `Annotated` version if possible.

```Python
{!> ../../docs_src/header_param_models/tutorial001_py310.py!}
```

**FastAPI** will **extract** data for each field from the **headers** in the request and provide the defined Pydantic model.

## Check the Docs

Required headers can be viewed in the docs UI at `/docs`.

## Forbid Extra Headers

To restrict the headers received, use Pydantic's model configuration to `forbid` any `extra` fields:

### Python 3.10+

```Python
{!> ../../docs_src/header_param_models/tutorial002_an_py310.py!}
```

### Python 3.9+

```Python
{!> ../../docs_src/header_param_models/tutorial002_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/header_param_models/tutorial002_an.py!}
```

### Python 3.10+ non-Annotated

**Tip:** Prefer using the `Annotated` version if possible.

```Python
{!> ../../docs_src/header_param_models/tutorial002_py310.py!}
```

### Python 3.9+ non-Annotated

**Tip:** Prefer using the `Annotated` version if possible.

```Python
{!> ../../docs_src/header_param_models/tutorial002_py39.py!}
```

### Python 3.8+ non-Annotated

**Tip:** Prefer using the `Annotated` version if possible.

```Python
{!> ../../docs_src/header_param_models/tutorial002.py!}
```

If a client sends **extra headers**, they will receive an **error** response. For example, if a `tool` header with a value of `plumbus` is sent, the response will indicate that the header parameter `tool` is not allowed:

```json
{
    "detail": [
        {
            "type": "extra_forbidden",
            "loc": ["header", "tool"],
            "msg": "Extra inputs are not permitted",
            "input": "plumbus"
        }
    ]
}
```

## Summary

Use **Pydantic models** to declare **headers** in **FastAPI**.
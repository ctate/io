# Query Parameter Models

To manage related **query parameters**, create a **Pydantic model**. This allows for **reusability** and the ability to declare validations and metadata for all parameters simultaneously.

**Note:** This feature is supported since FastAPI version 0.115.0.

## Query Parameters with a Pydantic Model

Declare the **query parameters** in a **Pydantic model**, then use `Query` to declare the parameter.

### Python 3.10+

```Python
{!> ../../docs_src/query_param_models/tutorial001_an_py310.py!}
```

### Python 3.9+

```Python
{!> ../../docs_src/query_param_models/tutorial001_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/query_param_models/tutorial001_an.py!}
```

### Python 3.10+ non-Annotated

**Tip:** Prefer the `Annotated` version if possible.

```Python
{!> ../../docs_src/query_param_models/tutorial001_py310.py!}
```

### Python 3.9+ non-Annotated

**Tip:** Prefer the `Annotated` version if possible.

```Python
{!> ../../docs_src/query_param_models/tutorial001_py39.py!}
```

### Python 3.8+ non-Annotated

**Tip:** Prefer the `Annotated` version if possible.

```Python
{!> ../../docs_src/query_param_models/tutorial001_py310.py!}
```

**FastAPI** will extract data for each field from the **query parameters** in the request and provide the defined Pydantic model.

## Check the Docs

View the query parameters in the docs UI at `/docs`.

## Forbid Extra Query Parameters

To restrict the query parameters received, use Pydantic's model configuration to `forbid` any `extra` fields.

### Python 3.10+

```Python
{!> ../../docs_src/query_param_models/tutorial002_an_py310.py!}
```

### Python 3.9+

```Python
{!> ../../docs_src/query_param_models/tutorial002_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/query_param_models/tutorial002_an.py!}
```

### Python 3.10+ non-Annotated

**Tip:** Prefer the `Annotated` version if possible.

```Python
{!> ../../docs_src/query_param_models/tutorial002_py310.py!}
```

### Python 3.9+ non-Annotated

**Tip:** Prefer the `Annotated` version if possible.

```Python
{!> ../../docs_src/query_param_models/tutorial002_py39.py!}
```

### Python 3.8+ non-Annotated

**Tip:** Prefer the `Annotated` version if possible.

```Python
{!> ../../docs_src/query_param_models/tutorial002.py!}
```

If a client sends extra data in the **query parameters**, they will receive an **error** response. For example, if a client sends a `tool` query parameter with a value of `plumbus`:

```http
https://example.com/items/?limit=10&tool=plumbus
```

The response will indicate that the `tool` query parameter is not allowed:

```json
{
    "detail": [
        {
            "type": "extra_forbidden",
            "loc": ["query", "tool"],
            "msg": "Extra inputs are not permitted",
            "input": "plumbus"
        }
    ]
}
```

## Summary

Use **Pydantic models** to declare **query parameters** in **FastAPI**. 

**Tip:** Pydantic models can also be used to declare cookies and headers, which will be covered later in the tutorial.